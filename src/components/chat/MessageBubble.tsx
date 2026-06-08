"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import type { ReactNode } from "react";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  children?: ReactNode;
}

export const MessageBubble = ({ role, content, children }: MessageBubbleProps) => {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex items-start gap-3 px-4 py-2 ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      {/* Avatar */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser
            ? "bg-[var(--ozone-bg-blue-gray)]"
            : "bg-[var(--ozone-primary)]"
        }`}
      >
        {isUser ? (
          <User className="h-4 w-4 text-[var(--ozone-primary)]" />
        ) : (
          <span className="text-xs font-bold text-white">O</span>
        )}
      </div>

      {/* Content */}
      <div
        className={`max-w-[80%] space-y-3 ${isUser ? "items-end" : "items-start"}`}
      >
        {content && (
          <div
            className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              isUser
                ? "rounded-tr-sm bg-[var(--ozone-primary)] text-white"
                : "rounded-tl-sm border border-[var(--ozone-border)] bg-white text-[var(--ozone-text)] shadow-sm"
            }`}
          >
            <div className="whitespace-pre-wrap">{content}</div>
          </div>
        )}
        {children}
      </div>
    </motion.div>
  );
};
