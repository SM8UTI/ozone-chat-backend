"use client";

import { SendHorizontal } from "lucide-react";
import { useRef, type FormEvent, type KeyboardEvent } from "react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
  placeholder?: string;
}

export const ChatInput = ({
  value,
  onChange,
  onSubmit,
  isLoading,
  placeholder = "Type your message...",
}: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isLoading) {
        onSubmit(e as unknown as FormEvent);
      }
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
  };

  return (
    <form
      onSubmit={onSubmit}
      className="border-t border-[var(--ozone-border)] bg-white px-4 py-3"
    >
      <div className="mx-auto flex max-w-3xl items-end gap-3">
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              handleInput();
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            disabled={isLoading}
            className="w-full resize-none rounded-xl border border-[var(--ozone-border)] bg-[var(--ozone-bg-light)] px-4 py-3 text-sm text-[var(--ozone-text)] placeholder:text-[var(--ozone-text-secondary)] focus:border-[var(--ozone-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--ozone-primary)] disabled:opacity-50"
            aria-label="Chat message input"
          />
        </div>
        <button
          type="submit"
          disabled={!value.trim() || isLoading}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--ozone-primary)] text-white transition-all hover:bg-[var(--ozone-dark)] disabled:opacity-40 disabled:hover:bg-[var(--ozone-primary)]"
          aria-label="Send message"
          tabIndex={0}
        >
          <SendHorizontal className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};
