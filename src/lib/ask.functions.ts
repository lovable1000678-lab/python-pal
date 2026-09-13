import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { findAnswer } from "./nlp";

export type AskResponse = {
  receipt?: string | undefined;
  matched: boolean;
  answer: string;
  topic?: string | undefined;
  code?: string | undefined;
  confidence: number;
  suggestions: string[];
};

const FALLBACK =
  "I couldn't find a confident match in my Python knowledge base, so I'd rather not guess. I cover beginner to intermediate topics: basics, variables, data types, lists, tuples, dictionaries, sets, conditionals, loops, functions, OOP, modules and imports, exceptions, file handling, comprehensions, and common errors. Try rephrasing, or pick one of these:";

export const askQuestion = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z.object({ question: z.string().min(1).max(500) }).parse(data),
  )
  .handler(async ({ data }): Promise<AskResponse> => {
    const { learnedWeights, issueReceipt } = await import('./feedback.server');
    const weights = await learnedWeights(data.question).catch(() => []);
    const result = findAnswer(data.question, weights);
    let receipt: string | undefined;
    try { receipt = issueReceipt(data.question, result.entry?.id ?? '__fallback__'); } catch { /* Answers remain available when feedback is unavailable. */ }

    if (!result.matched || !result.entry) {
      const weak = result.confidence < 0.12;
      return {
        receipt,
        matched: false,
        answer: FALLBACK,
        confidence: result.confidence,
        suggestions: weak
          ? [
              "What is a list comprehension?",
              "How do I handle exceptions?",
              "What is __init__ and self?",
            ]
          : result.suggestions,
      };
    }

    return {
      receipt,
      matched: true,
      answer: result.entry.answer,
      topic: result.entry.topic,
      code: result.entry.code,
      confidence: result.confidence,
      suggestions: result.suggestions,
    };
  });
