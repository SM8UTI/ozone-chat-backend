"use client";

import { motion } from "framer-motion";
import { IndianRupee, Info } from "lucide-react";
import { enclosures } from "@/data/enclosures";
import { fittings } from "@/data/fittings";

interface BudgetEstimateProps {
  enclosureId: string;
  fittingIds: string[];
  bathroomSize?: string;
}

const tierRange: Record<string, string> = {
  budget: "₹8,000 – ₹18,000",
  "mid-range": "₹18,000 – ₹40,000",
  premium: "₹40,000 – ₹70,000",
  luxury: "₹70,000 – ₹1,50,000+",
};

const fittingTierRange: Record<string, string> = {
  budget: "₹500 – ₹2,000",
  "mid-range": "₹2,000 – ₹5,000",
  premium: "₹5,000 – ₹10,000",
  luxury: "₹8,000 – ₹15,000",
};

export const BudgetEstimate = ({
  enclosureId,
  fittingIds,
  bathroomSize,
}: BudgetEstimateProps) => {
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
      className="overflow-hidden rounded-xl border border-[var(--brand-border)] bg-white shadow-sm"
    >
      <div className="border-b border-[var(--brand-border)] bg-[var(--brand-bg-blue-gray)] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <IndianRupee className="h-4 w-4 text-[var(--brand-primary)]" />
          <h4 className="text-sm font-bold text-[var(--brand-primary)]">
            Budget Estimate
          </h4>
        </div>
        {bathroomSize && (
          <p className="mt-0.5 text-xs text-[var(--brand-text-secondary)]">
            For a {bathroomSize} bathroom
          </p>
        )}
      </div>

      <div className="px-4 py-3 space-y-2">
        {/* Enclosure */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--brand-text)]">{enclosure.name}</span>
          <span className="font-semibold text-[var(--brand-primary)]">
            {tierRange[enclosure.priceTier]}
          </span>
        </div>

        {/* Fittings */}
        {selectedFittings.map((fitting) => (
          <div
            key={fitting!.id}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-[var(--brand-text-secondary)]">
              {fitting!.name}
            </span>
            <span className="text-[var(--brand-text)]">
              {fittingTierRange[fitting!.tier]}
            </span>
          </div>
        ))}

        {/* Installation */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--brand-text-secondary)]">
            Installation (estimated)
          </span>
          <span className="text-[var(--brand-text)]">₹3,000 – ₹8,000</span>
        </div>

        <div className="my-2 border-t border-dashed border-[var(--brand-border)]" />

        <div className="flex items-center gap-1.5 rounded-lg bg-[var(--brand-bg-light)] px-3 py-2 text-xs text-[var(--brand-text-secondary)]">
          <Info className="h-3.5 w-3.5 shrink-0 text-[var(--brand-primary)]" />
          <span>
            These are approximate ranges. For exact pricing, book a free
            consultation with our team.
          </span>
        </div>
      </div>
    </motion.div>
  );
};
