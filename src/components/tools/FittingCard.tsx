"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Wrench } from "lucide-react";
import { fittings } from "@/data/fittings";

interface FittingCardProps {
  fittingId: string;
}

const categoryLabel: Record<string, string> = {
  hinges: "Hinges",
  connectors: "Connectors",
  handles: "Handles",
  knobs: "Knobs",
  support: "Support Fittings",
  sealing: "Sealing",
  accessories: "Accessories",
};

export const FittingCard = ({ fittingId }: FittingCardProps) => {
  const fitting = fittings.find((f) => f.id === fittingId);
  if (!fitting) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-start gap-3 rounded-lg border border-[var(--brand-border)] bg-white p-3 shadow-sm"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-bg-blue-gray)]">
        <Wrench className="h-4 w-4 text-[var(--brand-primary)]" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h5 className="text-sm font-semibold text-[var(--brand-text)]">
            {fitting.name}
          </h5>
          <Badge variant="outline" className="text-[10px]">
            {categoryLabel[fitting.category]}
          </Badge>
        </div>
        <p className="mt-0.5 text-xs text-[var(--brand-text-secondary)] leading-relaxed">
          {fitting.description}
        </p>
        {fitting.colors.length > 0 && (
          <p className="mt-1 text-[10px] text-[var(--brand-text-secondary)]">
            Finishes: {fitting.colors.join(", ")}
          </p>
        )}
      </div>
    </motion.div>
  );
};
