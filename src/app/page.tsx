"use client";

import { motion } from "framer-motion";
import { PersonaCard } from "@/components/landing/PersonaCard";
import { FileText, MapPin, Phone } from "lucide-react";

const PERSONAS = [
  {
    persona: "homeowner" as const,
    title: "I'm a Homeowner",
    subtitle: "Personal interiors project",
    description:
      "Get an expert, independent review of your interior quotation. I'll tell you if the pricing is fair and give you the exact words to negotiate it down.",
    starters: [
      "I just got a quote for my 3BHK interiors",
      "Is 30L a fair price for a full home interior?",
      "Can you review this modular kitchen quotation?",
    ],
    href: "/chat/homeowner",
    icon: "home" as const,
  },
  {
    persona: "architect" as const,
    title: "I'm a Designer",
    subtitle: "Professional quotation review",
    description:
      "Check if your contractor quotes are competitive. Ensure your clients are getting fair market rates on materials and execution.",
    starters: [
      "Review this civil work contractor quote",
      "Are these carpentry rates standard for Mumbai?",
      "Check this modular vendor quotation",
    ],
    href: "/chat/architect",
    icon: "ruler" as const,
  },
  {
    persona: "dealer" as const,
    title: "I'm a Contractor",
    subtitle: "Quote structuring assistant",
    description:
      "Ensure your quotes are clear, competitive, and less likely to be negotiated down by clearly justifying premium materials.",
    starters: [
      "Review my 2BHK interior quotation",
      "How can I justify these premium plywood costs?",
      "Help me structure this civil and plumbing quote",
    ],
    href: "/chat/dealer",
    icon: "store" as const,
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="relative flex flex-1 flex-col items-center justify-center bg-[var(--brand-primary)] px-4 py-16 text-white md:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-dark)] to-[var(--brand-primary)]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="text-3xl font-bold tracking-tight">Stamper</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
              <FileText className="h-4 w-4" />
              AI-Powered Quotation Advisor
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 text-4xl font-bold leading-tight md:text-6xl"
          >
            Is Your Interiors Quote
            <br />
            <span className="text-[#E6ECF2]">Actually Fair?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-white/80"
          >
            Upload your interiors quotation. Our AI advisor will analyze
            every line item, tell you exactly where you're overpaying,
            and give you the script to negotiate it down.
          </motion.p>

          {/* Persona Cards */}
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {PERSONAS.map((persona, i) => (
              <PersonaCard key={persona.persona} {...persona} delay={0.4 + i * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--brand-primary)] px-4 py-8 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold">Stamper</span>
            <span className="text-sm text-white/70">
              Your Interior Quotation Expert
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              Support
            </span>
            <span className="text-white/70">
              stamperlabs@gmail.com
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
