"use client";

import { motion } from "framer-motion";
import { PersonaCard } from "@/components/landing/PersonaCard";
import { Droplets, MapPin, Phone } from "lucide-react";

const PERSONAS = [
  {
    persona: "homeowner" as const,
    title: "I'm a Homeowner",
    subtitle: "Personal bathroom project",
    description:
      "Get friendly, jargon-free advice on the perfect shower enclosure for your bathroom. I'll help you choose the right style, size, and budget.",
    starters: [
      "I'm renovating my bathroom and need a shower enclosure",
      "I have a small bathroom, what are my options?",
      "Help me pick a shower under 30K",
    ],
    href: "/chat/homeowner",
    icon: "home" as const,
  },
  {
    persona: "architect" as const,
    title: "I'm an Architect",
    subtitle: "Professional project specification",
    description:
      "Get spec-driven product recommendations with technical details, material specs, and project-level guidance for your designs.",
    starters: [
      "I'm specifying showers for a 50-unit residential project",
      "Need frameless options for a luxury villa bathroom",
      "Compare specifications and options",
    ],
    href: "/chat/architect",
    icon: "ruler" as const,
  },
  {
    persona: "dealer" as const,
    title: "I'm a Dealer",
    subtitle: "Customer qualification assistant",
    description:
      "Qualify walk-in customers quickly with guided discovery questions. Get product recommendations and talking points to close the sale.",
    starters: [
      "A customer walked in looking for a shower partition",
      "Customer wants to replace their old shower enclosure",
      "Help me recommend a premium shower for a large bathroom",
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
            <span className="text-3xl font-bold tracking-tight">SmartShower</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
              <Droplets className="h-4 w-4" />
              AI-Powered Shower Advisor
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 text-4xl font-bold leading-tight md:text-6xl"
          >
            Find Your Perfect
            <br />
            <span className="text-[#E6ECF2]">Glass Shower Enclosure</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-white/80"
          >
            Tell us about your space and preferences. Our AI advisor will
            recommend the ideal shower enclosure, fittings, and
            accessories — personalized just for you.
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
            <span className="text-lg font-bold">SmartShower</span>
            <span className="text-sm text-white/70">
              Your AI Bathroom Guide
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              Support
            </span>
            <span className="text-white/70">
              smartshower.ai
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
