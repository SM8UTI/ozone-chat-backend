"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Layers, Maximize2, Palette } from "lucide-react";
import { enclosures } from "@/data/enclosures";

interface EnclosureCardProps {
  enclosureId: string;
}

const frameTypeLabel: Record<string, string> = {
  frameless: "Frameless",
  "semi-framed": "Semi-Framed",
  framed: "Framed",
};

const doorLabel: Record<string, string> = {
  swing: "Swing Door",
  sliding: "Sliding Door",
  "slide-fold": "Slide & Fold",
};

const tierColor: Record<string, string> = {
  budget: "bg-green-100 text-green-800",
  "mid-range": "bg-blue-100 text-blue-800",
  premium: "bg-purple-100 text-purple-800",
  luxury: "bg-amber-100 text-amber-800",
};

export const EnclosureCard = ({ enclosureId }: EnclosureCardProps) => {
  const enclosure = enclosures.find((e) => e.id === enclosureId);
  if (!enclosure) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-xl border border-[var(--brand-border)] bg-white shadow-sm"
    >
      {/* Header */}
      <div className="border-b border-[var(--brand-border)] bg-[var(--brand-bg-blue-gray)] px-4 py-3">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-bold text-[var(--brand-primary)]">
            {enclosure.name}
          </h4>
          <Badge
            className={`${tierColor[enclosure.priceTier]} border-0 text-xs`}
          >
            {enclosure.priceTier.charAt(0).toUpperCase() +
              enclosure.priceTier.slice(1)}
          </Badge>
        </div>
        <div className="mt-1 flex gap-2">
          <Badge variant="outline" className="text-xs">
            {frameTypeLabel[enclosure.frameType]}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {doorLabel[enclosure.doorMechanism]}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {enclosure.material}
          </Badge>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-3 space-y-3">
        <p className="text-sm text-[var(--brand-text-secondary)] leading-relaxed">
          {enclosure.description}
        </p>

        {/* Key specs */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-[var(--brand-text-secondary)]">
            <Layers className="h-3.5 w-3.5 text-[var(--brand-primary)]" />
            <span>
              {enclosure.layouts
                .map((l) =>
                  l
                    .replace("linear-", "")
                    .replace("corner-", "")
                    .replace("-degree", "°")
                    .replace("t-type", "T-Type")
                    .replace("c-type", "C-Type")
                    .toUpperCase()
                )
                .join(", ")}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[var(--brand-text-secondary)]">
            <Palette className="h-3.5 w-3.5 text-[var(--brand-primary)]" />
            <span>{enclosure.colors.join(", ")}</span>
          </div>
          {enclosure.specifications["maxHeight"] && (
            <div className="flex items-center gap-1.5 text-[var(--brand-text-secondary)]">
              <Maximize2 className="h-3.5 w-3.5 text-[var(--brand-primary)]" />
              <span>Max height: {enclosure.specifications["maxHeight"]}</span>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5">
          {enclosure.features.slice(0, 4).map((feature) => (
            <span
              key={feature}
              className="rounded-md bg-[var(--brand-bg-light)] px-2 py-1 text-xs text-[var(--brand-text-secondary)]"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Ideal for */}
        <p className="text-xs text-[var(--brand-text-secondary)]">
          <span className="font-semibold text-[var(--brand-primary)]">
            Ideal for:
          </span>{" "}
          {enclosure.idealFor.join(" · ")}
        </p>
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--brand-border)] px-4 py-2.5">
        <a
          href={enclosure.productUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--brand-accent)] transition-colors hover:text-[var(--brand-primary)]"
          aria-label={`View ${enclosure.name}`}
          tabIndex={0}
        >
          View Details
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </motion.div>
  );
};
