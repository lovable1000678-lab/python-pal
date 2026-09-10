import { knowledgeBase, type KbEntry } from "./knowledge-base";
import { expandTokens } from "./synonyms";

const STOPWORDS = new Set([
  "a","an","the","is","are","was","were","be","been","being","do","does","did","doing",
  "i","you","he","she","it","we","they","me","my","your","our","their","this","that",
  "these","those","of","in","on","at","to","for","with","about","as","by","from","into",
  "and","or","but","if","then","than","so","not","no","can","could","should","would",
  "will","shall","may","might","must","have","has","had","get","got","use","using",
  "please","tell","explain","what","whats","which","who","whom","when","where","why",
  "how","there","here","some","any","all","up","out","between","difference","work",
  "works","mean","means","python","py","question","help",
]);

// Very small suffix stemmer: enough to fold plurals and common verb forms.
function stem(word: string): string {
  let w = word;
  if (w.length > 4 && w.endsWith("ing")) w = w.slice(0, -3);
  else if (w.length > 4 && w.endsWith("ies")) w = `${w.slice(0, -3)}y`;
  else if (w.length > 4 && w.endsWith("ers")) w = w.slice(0, -1);
  else if (w.length > 3 && w.endsWith("es")) w = w.slice(0, -2);
  else if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss")) w = w.slice(0, -1);
  else if (w.length > 4 && w.endsWith("ed")) w = w.slice(0, -2);
  return w;
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9_+\-*/=<>.\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((t) => !STOPWORDS.has(t))
    .map(stem)
    .filter((t) => t.length > 1);
}

type Doc = { entry: KbEntry; tf: Map<string, number>; tokens: string[] };

function entryText(entry: KbEntry): string {
  return [
    entry.questions.join(" "),
    entry.questions.join(" "), // questions weighted twice
    entry.topic,
    (entry.keywords ?? []).join(" "),
    (entry.keywords ?? []).join(" "),
    entry.answer,
  ].join(" ");
}

const docs: Doc[] = knowledgeBase.map((entry) => {
  const tokens = tokenize(entryText(entry));
  const tf = new Map<string, number>();
  for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
  return { entry, tf, tokens };
});

const df = new Map<string, number>();
for (const doc of docs) {
  for (const term of new Set(doc.tokens)) df.set(term, (df.get(term) ?? 0) + 1);
}
const N = docs.length;
const idf = (term: string) => Math.log((N + 1) / ((df.get(term) ?? 0) + 1)) + 1;

function vector(tf: Map<string, number>): Map<string, number> {
  const v = new Map<string, number>();
  for (const [term, count] of tf) {
    v.set(term, (1 + Math.log(count)) * idf(term));
  }
  return v;
}

const docVectors = docs.map((doc) => {
  const v = vector(doc.tf);
  let norm = 0;
  for (const value of v.values()) norm += value * value;
  return { doc, v, norm: Math.sqrt(norm) || 1 };
});

function cosine(
  query: Map<string, number>,
  queryNorm: number,
  target: Map<string, number>,
  targetNorm: number,
): number {
  let dot = 0;
  for (const [term, value] of query) {
    const other = target.get(term);
    if (other) dot += value * other;
  }
  return dot / (queryNorm * targetNorm);
}

/** Word-overlap ratio against the closest stored phrasing of a question. */
function bestPhraseOverlap(queryTokens: string[], entry: KbEntry): number {
  if (queryTokens.length === 0) return 0;
  const qs = new Set(queryTokens);
  let best = 0;
  for (const q of entry.questions) {
    const t = new Set(tokenize(q));
    if (t.size === 0) continue;
    let shared = 0;
    for (const term of t) if (qs.has(term)) shared += 1;
    best = Math.max(best, shared / Math.max(t.size, qs.size));
  }
  return best;
}

/** Character trigrams — gives typo tolerance ("dictionry", "funtion"). */
function trigrams(text: string): Set<string> {
  const s = ` ${text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()} `;
  const out = new Set<string>();
  for (let i = 0; i < s.length - 2; i += 1) out.add(s.slice(i, i + 3));
  return out;
}

const docTrigrams = docs.map((doc) =>
  trigrams([doc.entry.questions.join(" "), doc.entry.topic, (doc.entry.keywords ?? []).join(" ")].join(" ")),
);

function trigramSimilarity(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let shared = 0;
  for (const g of a) if (b.has(g)) shared += 1;
  return shared / a.size;
}

/** Vocabulary of every term the knowledge base actually uses. */
const vocabulary = [...df.keys()];
const vocabTrigrams = new Map(vocabulary.map((term) => [term, trigrams(term)]));

/** Snap a misspelled word onto the closest known term ("dictionry" -> "dictionary"). */
function correctToken(token: string): string {
  if (df.has(token) || token.length < 4) return token;
  const tg = trigrams(token);
  let best = token;
  let bestScore = 0.55;
  for (const term of vocabulary) {
    if (Math.abs(term.length - token.length) > 3) continue;
    const score = trigramSimilarity(tg, vocabTrigrams.get(term)!);
    if (score > bestScore) {
      bestScore = score;
      best = term;
    }
  }
  return best;
}

export type MatchResult = {
  matched: boolean;
  confidence: number;
  entry?: KbEntry;
  suggestions: string[];
};

export const CONFIDENCE_THRESHOLD = 0.2;

export function findAnswer(question: string): MatchResult {
  const rawTokens = tokenize(question).map(correctToken);
  // Understand everyday phrasing by expanding to knowledge-base vocabulary.
  const queryTokens = expandTokens(rawTokens);
  const qtf = new Map<string, number>();
  for (const t of queryTokens) qtf.set(t, (qtf.get(t) ?? 0) + 1);
  const qv = vector(qtf);
  let qnorm = 0;
  for (const value of qv.values()) qnorm += value * value;
  qnorm = Math.sqrt(qnorm) || 1;

  const qgrams = trigrams(question);

  const scored = docVectors
    .map(({ doc, v, norm }, i) => {
      const sim = queryTokens.length ? cosine(qv, qnorm, v, norm) : 0;
      const overlap = Math.max(
        bestPhraseOverlap(rawTokens, doc.entry),
        bestPhraseOverlap(queryTokens, doc.entry),
      );
      const fuzzy = trigramSimilarity(qgrams, docTrigrams[i] ?? new Set());
      // Blend corpus similarity, direct phrasing overlap, and typo tolerance.
      const score = 0.55 * sim + 0.3 * overlap + 0.15 * fuzzy;
      return { entry: doc.entry, score };
    })
    .sort((a, b) => b.score - a.score);

  const top = scored[0];
  const confidence = top ? Math.min(0.99, Math.round(top.score * 100) / 100) : 0;

  if (!top || confidence < CONFIDENCE_THRESHOLD) {
    return {
      matched: false,
      confidence,
      suggestions: scored
        .slice(0, 3)
        .map((s) => s.entry.questions[0])
        .filter((q): q is string => Boolean(q)),
    };
  }

  return {
    matched: true,
    confidence,
    entry: top.entry,
    suggestions: scored
      .slice(1, 3)
      .filter((s) => s.score > 0.12)
      .map((s) => s.entry.questions[0])
      .filter((q): q is string => Boolean(q)),
  };
}
