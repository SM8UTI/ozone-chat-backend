"use client";

import { motion } from "framer-motion";

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export const SuggestionChips = ({
  suggestions,
  onSelect,
}: SuggestionChipsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-wrap gap-2 px-4 py-2"
    >
      {suggestions.map((suggestion, i) => (
        <motion.button
          key={suggestion}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: i * 0.05 }}
          onClick={() => onSelect(suggestion)}
          className="rounded-full border border-[var(--brand-primary)] px-4 py-2 text-sm text-[var(--brand-primary)] transition-all hover:bg-[var(--brand-primary)] hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] focus:ring-offset-1"
          tabIndex={0}
          aria-label={`Send: ${suggestion}`}
        >
          {suggestion}
        </motion.button>
      ))}
    </motion.div>
  );
};
