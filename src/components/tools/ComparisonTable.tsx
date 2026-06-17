"use client";

import { motion } from "framer-motion";
import { enclosures } from "@/data/enclosures";

interface ComparisonTableProps {
  enclosureIds: string[];
}

const frameTypeLabel: Record<string, string> = {
  frameless: "Frameless",
  "semi-framed": "Semi-Framed",
  framed: "Framed",
};

const doorLabel: Record<string, string> = {
  swing: "Swing",
  sliding: "Sliding",
  "slide-fold": "Slide & Fold",
};

export const ComparisonTable = ({ enclosureIds }: ComparisonTableProps) => {
  const items = enclosureIds
    .map((id) => enclosures.find((e) => e.id === id))
    .filter(Boolean);

  if (items.length < 2) return null;

  const rows = [
    { label: "Frame Type", getValue: (e: (typeof items)[0]) => frameTypeLabel[e!.frameType] },
    { label: "Door Type", getValue: (e: (typeof items)[0]) => doorLabel[e!.doorMechanism] },
    { label: "Material", getValue: (e: (typeof items)[0]) => e!.material },
    { label: "Finishes", getValue: (e: (typeof items)[0]) => e!.colors.join(", ") },
    { label: "Layouts", getValue: (e: (typeof items)[0]) => e!.layouts.length.toString() + " configurations" },
    { label: "Price Tier", getValue: (e: (typeof items)[0]) => e!.priceTier.charAt(0).toUpperCase() + e!.priceTier.slice(1) },
    { label: "Space Needs", getValue: (e: (typeof items)[0]) => e!.spaceRequirement === "space-saving" ? "Space-saving" : e!.spaceRequirement === "needs-clearance" ? "Needs clearance" : "Flexible" },
    { label: "Maintenance", getValue: (e: (typeof items)[0]) => e!.maintenanceLevel === "easy" ? "Easy" : "Moderate" },
    { label: "Ideal For", getValue: (e: (typeof items)[0]) => e!.idealFor.slice(0, 2).join(", ") },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-xl border border-[var(--brand-border)] bg-white shadow-sm"
    >
      <div className="border-b border-[var(--brand-border)] bg-[var(--brand-bg-blue-gray)] px-4 py-2.5">
        <h4 className="text-sm font-bold text-[var(--brand-primary)]">
          Product Comparison
        </h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[var(--brand-border)]">
              <th className="px-3 py-2 text-left font-medium text-[var(--brand-text-secondary)]">
                Feature
              </th>
              {items.map((item) => (
                <th
                  key={item!.id}
                  className="px-3 py-2 text-left font-bold text-[var(--brand-primary)]"
                >
                  {item!.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.label}
                className={
                  i % 2 === 0
                    ? "bg-white"
                    : "bg-[var(--brand-bg-light)]"
                }
              >
                <td className="px-3 py-2 font-medium text-[var(--brand-text-secondary)]">
                  {row.label}
                </td>
                {items.map((item) => (
                  <td
                    key={item!.id}
                    className="px-3 py-2 text-[var(--brand-text)]"
                  >
                    {row.getValue(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
