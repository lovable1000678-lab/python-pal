const KEYWORDS = new Set([
  "if","elif","else","for","while","in","not","and","or","def","return","class",
  "try","except","finally","raise","with","as","import","from","lambda","None",
  "True","False","is","pass","break","continue","print","yield","global","del",
]);

type Token = { text: string; kind: "kw" | "num" | "str" | "comment" | "plain" };

function tokenizeLine(line: string): Token[] {
  const hashAt = line.indexOf("#");
  let code = line;
  let comment = "";
  if (hashAt >= 0) {
    const before = line.slice(0, hashAt);
    const quotes = (before.match(/"/g) ?? []).length + (before.match(/'/g) ?? []).length;
    if (quotes % 2 === 0) {
      code = before;
      comment = line.slice(hashAt);
    }
  }

  const tokens: Token[] = [];
  const re = /("[^"]*"|'[^']*'|\b\d+(?:\.\d+)?\b|[A-Za-z_][A-Za-z0-9_]*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code)) !== null) {
    if (m.index > last) tokens.push({ text: code.slice(last, m.index), kind: "plain" });
    const value = m[0];
    if (value.startsWith('"') || value.startsWith("'")) tokens.push({ text: value, kind: "str" });
    else if (/^\d/.test(value)) tokens.push({ text: value, kind: "num" });
    else if (KEYWORDS.has(value)) tokens.push({ text: value, kind: "kw" });
    else tokens.push({ text: value, kind: "plain" });
    last = m.index + value.length;
  }
  if (last < code.length) tokens.push({ text: code.slice(last), kind: "plain" });
  if (comment) tokens.push({ text: comment, kind: "comment" });
  return tokens;
}

const classFor: Record<Token["kind"], string> = {
  kw: "text-brand",
  num: "text-accent-warm",
  str: "text-online",
  comment: "text-subtle",
  plain: "",
};

export function CodeBlock({ code }: { code: string }) {
  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-line">
      <div className="flex items-center gap-2 bg-ink px-3 py-2">
        <span className="size-2 rounded-full bg-accent-warm" />
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
          example
        </span>
      </div>
      <pre className="overflow-x-auto bg-line-soft px-3 py-2.5 font-mono text-xs leading-relaxed">
        <code>
          {code.split("\n").map((line, i) => (
            <span key={i}>
              {tokenizeLine(line).map((t, j) => (
                <span key={j} className={classFor[t.kind]}>
                  {t.text}
                </span>
              ))}
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
