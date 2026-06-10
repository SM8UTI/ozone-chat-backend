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
      className="overflow-hidden rounded-xl border-2 border-[var(--ozone-primary)] bg-gradient-to-br from-[var(--ozone-bg-blue-gray)] to-white shadow-md"
    >
      <div className="px-4 py-4 space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-[var(--ozone-primary)]" />
          <h4 className="font-bold text-[var(--ozone-primary)]">
            {isArchitect
              ? "Schedule a Project Meeting"
              : 'Book a Free "O Wala" Consultation'}
          </h4>
        </div>

        <p className="text-sm text-[var(--ozone-text-secondary)]">
          {isArchitect
            ? "Connect with Ozone's project sales team for detailed pricing, lead times, and specification support."
            : "Get personalised expert advice, exact measurements, and pricing from Ozone's team — completely free."}
        </p>

        {productInterest && (
          <p className="text-xs text-[var(--ozone-text-secondary)]">
            Interest:{" "}
            <span className="font-medium text-[var(--ozone-text)]">
              {productInterest}
            </span>
          </p>
        )}

        <div className="flex flex-col gap-2 sm:flex-row">
          <a
            href="tel:+919310012300"
            className={cn(
              buttonVariants(),
              "flex-1 bg-[var(--ozone-primary)] text-white hover:bg-[var(--ozone-dark)]"
            )}
            aria-label="Call Ozone customer care"
            tabIndex={0}
          >
            <Phone className="mr-2 h-4 w-4" />
            Call +91-9310012300
          </a>
          <a
            href="https://wa.me/919310012300"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "flex-1 border-[var(--ozone-primary)] text-[var(--ozone-primary)] hover:bg-[var(--ozone-bg-blue-gray)]"
            )}
            aria-label="Contact via WhatsApp"
            tabIndex={0}
          >
            WhatsApp Us
          </a>
        </div>

        <p className="text-center text-xs text-[var(--ozone-text-secondary)]">
          Or email{" "}
          <a
            href="mailto:customercare@ozone.in"
            className="font-medium text-[var(--ozone-accent)] hover:underline"
          >
            customercare@ozone.in
          </a>
        </p>
      </div>
    </motion.div>
  );
};
