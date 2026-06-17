"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useRef, useEffect, useState, useMemo, type FormEvent } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { SuggestionChips } from "./SuggestionChips";
import { TypingIndicator } from "./TypingIndicator";

import type { Persona } from "@/types";

interface ChatShellProps {
  persona: Persona;
  title: string;
  suggestedStarters: string[];
}



export const ChatShell = ({
  persona,
  title,
  suggestedStarters,
}: ChatShellProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: { persona },
      }),
    [persona]
  );

  const { messages, sendMessage, status } = useChat({ transport });

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const msg = input;
    setInput("");
    sendMessage({ text: msg });
  };

  const handleSuggestionSelect = (suggestion: string) => {
    sendMessage({ text: suggestion });
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-screen flex-col bg-[var(--brand-bg-light)]">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-[var(--brand-border)] bg-[var(--brand-primary)] px-4 py-3 text-white">
        <Link
          href="/"
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/10"
          aria-label="Back to home"
          tabIndex={0}
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg">Stamper</span>
          <div>
            <h1 className="text-sm font-semibold leading-tight">{title}</h1>
            <p className="text-xs text-white/70">Powered by Quotation Advisor</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-4">
        <div className="mx-auto max-w-3xl">
          {!hasMessages && (
            <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-primary)]">
                <span className="text-2xl font-bold text-white">S</span>
              </div>
              <h2 className="mb-2 text-xl font-bold text-[var(--brand-primary)]">
                {title}
              </h2>
              <p className="mb-8 max-w-md text-sm text-[var(--brand-text-secondary)]">
                {persona === "homeowner"
                  ? "Upload your quotation, and I'll tell you where it's high and how to negotiate it."
                  : persona === "dealer"
                    ? "I'll help you justify your quote to the customer and structure it clearly."
                    : "I'll help you review your contractor quotes for competitive pricing."}
              </p>
              <SuggestionChips
                suggestions={suggestedStarters}
                onSelect={handleSuggestionSelect}
              />
            </div>
          )}

          {messages.map((message) => {
            const textParts = message.parts
              .filter(
                (p): p is { type: "text"; text: string } => p.type === "text"
              )
              .map((p) => p.text)
              .join("");

            return (
              <MessageBubble
                key={message.id}
                role={message.role as "user" | "assistant"}
                content={textParts}
              />
            );
          })}

          {isLoading &&
            (messages.length === 0 ||
              messages[messages.length - 1]?.role !== "assistant") && (
              <TypingIndicator />
            )}
        </div>
      </div>

      {/* Input */}
      <ChatInput
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        placeholder={
          persona === "homeowner"
            ? "Tell me about your quotation..."
            : persona === "dealer"
              ? "Tell me about the quote..."
              : "Describe your project's quotation..."
        }
      />
    </div>
  );
};
