"use client";

import { motion } from "framer-motion";
import { FileDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CatalogDownloadProps {
  catalogType: "shower-enclosures" | "complete-shower-solutions" | "glass-fittings";
}

const catalogInfo: Record<string, { title: string; url: string }> = {
  "shower-enclosures": {
    title: "Shower Enclosures Catalog with MRP",
    url: "#",
  },
  "complete-shower-solutions": {
    title: "Complete Shower Solutions Catalog",
    url: "#",
  },
  "glass-fittings": {
    title: "Glass Fittings Catalog with MRP",
    url: "#",
  },
};

export const CatalogDownload = ({ catalogType }: CatalogDownloadProps) => {
  const catalog = catalogInfo[catalogType];
  if (!catalog) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-center gap-3 rounded-xl border border-[var(--brand-border)] bg-white p-3 shadow-sm"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-bg-blue-gray)]">
        <FileDown className="h-5 w-5 text-[var(--brand-primary)]" />
      </div>
      <div className="min-w-0 flex-1">
        <h5 className="text-sm font-semibold text-[var(--brand-text)]">
          {catalog.title}
        </h5>
        <p className="text-xs text-[var(--brand-text-secondary)]">
          PDF Document
        </p>
      </div>
      <a
        href={catalog.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          buttonVariants({ size: "sm" }),
          "bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-dark)]"
        )}
        aria-label={`Download ${catalog.title}`}
        tabIndex={0}
      >
        Download
      </a>
    </motion.div>
  );
};
