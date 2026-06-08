"use client";

import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { enclosures } from "@/data/enclosures";
import { fittings } from "@/data/fittings";

interface CompleteSolutionProps {
  enclosureId: string;
  fittingIds: string[];
  notes?: string;
}

export const CompleteSolution = ({
  enclosureId,
  fittingIds,
  notes,
}: CompleteSolutionProps) => {
  const enclosure = enclosures.find((e) => e.id === enclosureId);
  const selectedFittings = fittingIds
    .map((id) => fittings.find((f) => f.id === id))
    .filter(Boolean);

  if (!enclosure) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-xl border-2 border-[var(--ozone-primary)] bg-white shadow-md"
    >
      <div className="bg-[var(--ozone-primary)] px-4 py-3">
        <div className="flex items-center gap-2 text-white">
          <Package className="h-5 w-5" />
          <h4 className="font-bold">Your Complete Shower Solution</h4>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Enclosure System */}
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--ozone-text-secondary)]">
            Shower Enclosure System
          </p>
          <div className="flex items-center gap-2">
            <h5 className="text-lg font-bold text-[var(--ozone-primary)]">
              {enclosure.name}
            </h5>
            <Badge variant="outline" className="text-xs">
              {enclosure.frameType}
            </Badge>
          </div>
          <p className="mt-0.5 text-sm text-[var(--ozone-text-secondary)]">
            {enclosure.material} · {enclosure.doorMechanism} door ·{" "}
            {enclosure.colors.join(", ")}
          </p>
        </div>

        {/* Fittings */}
        {selectedFittings.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--ozone-text-secondary)]">
              Hardware & Accessories
            </p>
            <div className="space-y-1.5">
              {selectedFittings.map((fitting) => (
                <div
                  key={fitting!.id}
                  className="flex items-center justify-between rounded-lg bg-[var(--ozone-bg-light)] px-3 py-2 text-sm"
                >
                  <span className="text-[var(--ozone-text)]">
                    {fitting!.name}
                  </span>
                  <Badge variant="outline" className="text-[10px]">
                    {fitting!.category}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {notes && (
          <div className="rounded-lg border border-[var(--ozone-border)] bg-[var(--ozone-bg-blue-gray)] px-3 py-2 text-sm text-[var(--ozone-text)]">
            {notes}
          </div>
        )}
      </div>
    </motion.div>
  );
};
