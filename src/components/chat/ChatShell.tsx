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
import { EnclosureCard } from "@/components/tools/EnclosureCard";
import { FittingCard } from "@/components/tools/FittingCard";
import { CompleteSolution } from "@/components/tools/CompleteSolution";
import { ComparisonTable } from "@/components/tools/ComparisonTable";
import { BudgetEstimate } from "@/components/tools/BudgetEstimate";
import { ConsultationCTA } from "@/components/tools/ConsultationCTA";
import { CatalogDownload } from "@/components/tools/CatalogDownload";
import type { Persona } from "@/types";

interface ChatShellProps {
  persona: Persona;
  title: string;
  suggestedStarters: string[];
}

interface ToolPart {
  type: string;
  state?: string;
  input?: Record<string, unknown>;
  toolName?: string;
}

function ToolRenderer({ part, persona }: { part: ToolPart; persona: Persona }) {
  const { type, state, input, toolName: dynamicToolName } = part;

  if (state && state !== "output-available") return null;

  const resolvedName = dynamicToolName ?? type.replace("tool-", "");
  const args = (input ?? {}) as Record<string, unknown>;

  switch (resolvedName) {
    case "show_enclosures": {
      const enclosureIds = args.enclosureIds as string[] | undefined;
      if (!enclosureIds?.length) return null;
      return (
        <div className="space-y-2">
          {enclosureIds.map((id) => (
            <EnclosureCard key={id} enclosureId={id} />
          ))}
        </div>
      );
    }
    case "show_fittings": {
      const fittingIds = args.fittingIds as string[] | undefined;
      if (!fittingIds?.length) return null;
      return (
        <div className="space-y-2">
          {fittingIds.map((id) => (
            <FittingCard key={id} fittingId={id} />
          ))}
        </div>
      );
    }
    case "show_complete_solution":
      if (!args.enclosureId) return null;
      return (
        <CompleteSolution
          enclosureId={args.enclosureId as string}
          fittingIds={args.fittingIds as string[]}
          notes={args.notes as string | undefined}
        />
      );
    case "compare_products": {
      const ids = args.enclosureIds as string[] | undefined;
      if (!ids?.length) return null;
      return <ComparisonTable enclosureIds={ids} />;
    }
    case "budget_estimate":
      if (!args.enclosureId) return null;
      return (
        <BudgetEstimate
          enclosureId={args.enclosureId as string}
          fittingIds={args.fittingIds as string[]}
          bathroomSize={args.bathroomSize as string | undefined}
        />
      );
    case "book_consultation":
      return (
        <ConsultationCTA
          productInterest={args.productInterest as string | undefined}
          persona={(args.persona as Persona) ?? persona}
        />
      );
    case "download_catalog":
      if (!args.catalogType) return null;
      return (
        <CatalogDownload
          catalogType={
            args.catalogType as
              | "shower-enclosures"
              | "complete-shower-solutions"
              | "glass-fittings"
          }
        />
      );
    default:
      return null;
  }
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
    <div className="flex h-screen flex-col bg-[var(--ozone-bg-light)]">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-[var(--ozone-border)] bg-[var(--ozone-primary)] px-4 py-3 text-white">
        <Link
          href="/"
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/10"
          aria-label="Back to home"
          tabIndex={0}
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://files.ozone.in/Images/logo.webp"
            alt="Ozone"
            className="h-6 brightness-0 invert"
          />
          <div>
            <h1 className="text-sm font-semibold leading-tight">{title}</h1>
            <p className="text-xs text-white/70">Powered by Ozone India</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-4">
        <div className="mx-auto max-w-3xl">
          {!hasMessages && (
            <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--ozone-primary)]">
                <span className="text-2xl font-bold text-white">O</span>
              </div>
              <h2 className="mb-2 text-xl font-bold text-[var(--ozone-primary)]">
                {title}
              </h2>
              <p className="mb-8 max-w-md text-sm text-[var(--ozone-text-secondary)]">
                {persona === "homeowner"
                  ? "I'll help you find the perfect glass shower enclosure for your bathroom. Tell me about your space, and I'll guide you to the best option."
                  : persona === "dealer"
                    ? "I'll help you qualify your customer and recommend the right Ozone product. Tell me about the walk-in, and I'll guide you through the discovery."
                    : "I'll help you specify the right shower systems for your project. Share your requirements, and I'll provide detailed product recommendations."}
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

            const toolParts = message.parts.filter(
              (p) => p.type === "dynamic-tool" || p.type.startsWith("tool-")
            );

            return (
              <MessageBubble
                key={message.id}
                role={message.role as "user" | "assistant"}
                content={textParts}
              >
                {toolParts.map((tp, i) => (
                  <ToolRenderer
                    key={`${message.id}-tool-${i}`}
                    part={tp as ToolPart}
                    persona={persona}
                  />
                ))}
              </MessageBubble>
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
            ? "Tell me about your bathroom..."
            : persona === "dealer"
              ? "Tell me about the customer..."
              : "Describe your project requirements..."
        }
      />
    </div>
  );
};
