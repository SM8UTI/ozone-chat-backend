"use client";

import { motion } from "framer-motion";
import { Calendar, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Persona } from "@/types";

interface ConsultationCTAProps {
  productInterest?: string;
  persona: Persona;
}

export const ConsultationCTA = ({
  productInterest,
  persona,
}: ConsultationCTAProps) => {
  const isArchitect = persona === "architect";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-xl border-2 border-[var(--brand-primary)] bg-gradient-to-br from-[var(--brand-bg-blue-gray)] to-white shadow-md"
    >
      <div className="px-4 py-4 space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-[var(--brand-primary)]" />
          <h4 className="font-bold text-[var(--brand-primary)]">
            {isArchitect
              ? "Schedule a Project Meeting"
              : "Book a Free Consultation"}
          </h4>
        </div>

        <p className="text-sm text-[var(--brand-text-secondary)]">
          {isArchitect
            ? "Connect with our project sales team for detailed pricing, lead times, and specification support."
            : "Get personalised expert advice, exact measurements, and pricing from our team — completely free."}
        </p>

        {productInterest && (
          <p className="text-xs text-[var(--brand-text-secondary)]">
            Interest:{" "}
            <span className="font-medium text-[var(--brand-text)]">
              {productInterest}
            </span>
          </p>
        )}

        <div className="flex flex-col gap-2 sm:flex-row">
          <a
            href="tel:+918896897898"
            className={cn(
              buttonVariants(),
              "flex-1 bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-dark)]"
            )}
            aria-label="Call customer care"
            tabIndex={0}
          >
            <Phone className="mr-2 h-4 w-4" />
            Call +91-8896897898
          </a>
          <a
            href="https://wa.me/918896897898"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "flex-1 border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-bg-blue-gray)]"
            )}
            aria-label="Contact via WhatsApp"
            tabIndex={0}
          >
            WhatsApp Us
          </a>
        </div>

        <p className="text-center text-xs text-[var(--brand-text-secondary)]">
          Or email{" "}
          <a
            href="mailto:support@smartshower.ai"
            className="font-medium text-[var(--brand-accent)] hover:underline"
          >
            support@smartshower.ai
          </a>
        </p>
      </div>
    </motion.div>
  );
};
