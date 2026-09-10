import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { findAnswer } from "./nlp";

export type AskResponse = {
  matched: boolean;
  answer: string;
  topic?: string;
  code?: string;
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
    const result = findAnswer(data.question);

    if (!result.matched || !result.entry) {
      return {
        matched: false,
        answer: FALLBACK,
        confidence: result.confidence,
        suggestions: result.suggestions,
      };
    }

    return {
      matched: true,
      answer: result.entry.answer,
      topic: result.entry.topic,
      code: result.entry.code,
      confidence: result.confidence,
      suggestions: result.suggestions,
    };
  });
