"use client";

import { motion } from "framer-motion";
import { Home, Ruler, Store } from "lucide-react";
import Link from "next/link";

interface PersonaCardProps {
  persona: "homeowner" | "architect" | "dealer";
  title: string;
  subtitle: string;
  description: string;
  starters: string[];
  href: string;
  icon: "home" | "ruler" | "store";
  delay?: number;
}

const icons = {
  home: Home,
  ruler: Ruler,
  store: Store,
};

export const PersonaCard = ({
  title,
  subtitle,
  description,
  starters,
  href,
  icon,
  delay = 0,
}: PersonaCardProps) => {
  const Icon = icons[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        href={href}
        className="group block rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[var(--ozone-accent)] focus:ring-offset-2"
        tabIndex={0}
        aria-label={`Start chat as ${title}`}
      >
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--ozone-bg-blue-gray)]">
          <Icon className="h-7 w-7 text-[var(--ozone-primary)]" />
        </div>

        <p className="mb-1 text-sm font-medium uppercase tracking-wider text-[var(--ozone-text-secondary)]">
          {subtitle}
        </p>
        <h3 className="mb-3 text-2xl font-bold text-[var(--ozone-primary)]">
          {title}
        </h3>
        <p className="mb-6 text-[var(--ozone-text-secondary)] leading-relaxed">
          {description}
        </p>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ozone-text-secondary)]">
            Try asking
          </p>
          {starters.map((starter) => (
            <p
              key={starter}
              className="rounded-lg border border-[var(--ozone-border)] px-3 py-2 text-sm text-[var(--ozone-text)] transition-colors group-hover:border-[var(--ozone-primary)] group-hover:bg-[var(--ozone-bg-blue-gray)]"
            >
              &ldquo;{starter}&rdquo;
            </p>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[var(--ozone-primary)] transition-all group-hover:gap-3">
          Start conversation
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
};
