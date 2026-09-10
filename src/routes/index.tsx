import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { CodeBlock } from "@/components/CodeBlock";
import { askQuestion } from "@/lib/ask.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PyQuery — Personal Python Answer Engine" },
      {
        name: "description",
        content:
          "Ask Python questions in plain English and get instant answers from a curated Python knowledge base. No sign-up, works on any device.",
      },
      { property: "og:title", content: "PyQuery — Personal Python Answer Engine" },
      {
        property: "og:description",
        content:
          "Ask Python questions in plain English and get instant answers from a curated Python knowledge base. No sign-up required.",
      },
    ],
  }),
  component: ChatPage,
});

type Message =
  | { id: string; role: "user"; text: string }
  | {
      id: string;
      role: "bot";
      text: string;
      topic?: string | undefined;
      code?: string | undefined;
      confidence?: number | undefined;
      chips?: string[] | undefined;
      error?: boolean | undefined;
    };

const STARTER_CHIPS = [
  "What is a list?",
  "How do functions work?",
  "Explain a dictionary",
];

const SAMPLE_QUESTIONS = [
  "How do I handle exceptions?",
  "List vs tuple?",
  "What is a list comprehension?",
  "How do I read a file?",
  "What is __init__ and self?",
  "How do imports work?",
];

const welcome = (): Message => ({
  id: "welcome",
  role: "bot",
  text: "Hi! I'm PyQuery. Ask me anything about Python — variables, loops, OOP, files, and more. Here are a few to start:",
  chips: STARTER_CHIPS,
});

function ChatPage() {
  const ask = useServerFn(askQuestion);
  const [messages, setMessages] = useState<Message[]>([welcome()]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, pending]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [pending]);

  async function send(question: string) {
    const text = question.trim();
    if (!text || pending) return;
    setInput("");
    setPending(true);
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", text },
    ]);

    try {
      const res = await ask({ data: { question: text } });
      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          role: "bot",
          text: res.answer,
          topic: res.topic,
          code: res.code,
          confidence: res.matched ? res.confidence : undefined,
          chips: res.matched ? undefined : res.suggestions,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: "bot",
          text: "I couldn't reach the answer service just now. Check your connection and try asking again.",
          error: true,
        },
      ]);
    } finally {
      setPending(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <header className="bg-surface">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <span className="size-3 rounded-full bg-brand" />
              <span className="size-3 rounded-full bg-accent-warm" />
              <span className="size-3 rounded-full bg-faint" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold leading-none">PyQuery</h1>
              <p className="mt-1 text-xs text-subtle">Your personal Python answer engine</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-faint">
              No sign-up needed
            </span>
            <span className="size-2 rounded-full bg-online" />
          </div>
        </div>
      </header>
      <div className="dotted-rule h-px" />

      <main className="flex flex-1 items-center justify-center p-4">
        <div className="flex h-[72vh] max-h-[760px] min-h-[520px] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
          <div className="flex items-center justify-between border-b border-line-soft px-5 py-3">
            <span className="text-xs font-medium text-subtle">Conversation</span>
            <button
              type="button"
              onClick={() => setMessages([welcome()])}
              className="text-xs font-medium text-faint transition-colors hover:text-brand"
            >
              Clear chat
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
            {messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="msg-enter flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-brand px-4 py-3">
                    <p className="text-sm text-primary-foreground">{m.text}</p>
                  </div>
                </div>
              ) : (
                <div key={m.id} className="msg-enter flex items-start gap-3">
                  {m.id !== "welcome" && (
                    <div className="flex shrink-0 flex-col items-center gap-1 pt-1">
                      <span className="size-2.5 rounded-full bg-brand" />
                      <span className="size-2.5 rounded-full bg-accent-warm" />
                    </div>
                  )}
                  <div className="max-w-[80%] rounded-2xl rounded-tl-sm border border-line-soft bg-line-soft/60 px-4 py-3">
                    {(m.topic || typeof m.confidence === "number") && (
                      <div className="mb-2 flex items-center gap-3">
                        {m.topic && (
                          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand">
                            {m.topic}
                          </span>
                        )}
                        {typeof m.confidence === "number" && (
                          <span className="text-[10px] font-medium text-faint">
                            {Math.round(m.confidence * 100)}% match
                          </span>
                        )}
                      </div>
                    )}
                    <p
                      className={`text-sm leading-relaxed ${m.error ? "text-destructive" : "text-body"}`}
                    >
                      {m.text}
                    </p>
                    {m.code && <CodeBlock code={m.code} />}
                    {m.chips && m.chips.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {m.chips.map((chip) => (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => void send(chip)}
                            className="rounded-full border border-line bg-surface px-3 py-1.5 text-[11px] font-medium text-body transition-colors hover:border-brand hover:text-brand"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ),
            )}

            {pending && (
              <div className="msg-enter flex items-start gap-3">
                <div className="flex shrink-0 flex-col items-center gap-1 pt-1">
                  <span className="size-2.5 rounded-full bg-brand" />
                  <span className="size-2.5 rounded-full bg-accent-warm" />
                </div>
                <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm border border-line-soft bg-line-soft/60 px-4 py-3.5">
                  <span className="dot-pulse size-1.5 rounded-full bg-faint" />
                  <span
                    className="dot-pulse size-1.5 rounded-full bg-faint"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <span
                    className="dot-pulse size-1.5 rounded-full bg-faint"
                    style={{ animationDelay: "0.3s" }}
                  />
                  <span className="ml-1 text-xs text-subtle">searching the knowledge base…</span>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-line-soft p-3">
            <div className="mb-2 flex flex-wrap gap-2 px-1">
              {SAMPLE_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => void send(q)}
                  className="rounded-full border border-line bg-surface px-3 py-1.5 text-[11px] font-medium text-body transition-colors hover:border-brand hover:text-brand"
                >
                  {q}
                </button>
              ))}
            </div>
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 rounded-xl border border-line bg-line-soft px-3 py-2 transition-colors focus-within:border-brand"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Ask a Python question…"
                aria-label="Ask a Python question"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-faint"
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-hover disabled:opacity-40"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
