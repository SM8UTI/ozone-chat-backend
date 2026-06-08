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
      "Compare Stealth vs Outliner series specs",
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

const EXPERIENCE_CENTRES = [
  {
    city: "Delhi",
    address: "Mehrauli-Gurgaon Road, Gadaipur, Sector-28, New Delhi",
  },
  {
    city: "Bengaluru",
    address: "100 Feet Rd, Defence Colony, Indiranagar",
  },
  {
    city: "Mohali",
    address: "Mohali City Center-2, Block F, SAS Nagar",
  },
  {
    city: "Jaipur",
    address: "New Aatish Market, Metro Pillar Number 46",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="relative flex flex-1 flex-col items-center justify-center bg-[var(--ozone-primary)] px-4 py-16 text-white md:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ozone-dark)] to-[var(--ozone-primary)]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://files.ozone.in/Images/logo.webp"
              alt="Ozone India"
              className="mx-auto h-10 brightness-0 invert md:h-12"
            />
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
            recommend the ideal Ozone shower enclosure, fittings, and
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

      {/* Experience Centres */}
      <section className="bg-[var(--ozone-bg-light)] px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-[var(--ozone-primary)]">
            Visit Our Experience Centres
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {EXPERIENCE_CENTRES.map((centre) => (
              <div
                key={centre.city}
                className="rounded-lg bg-white p-4 shadow-sm"
              >
                <div className="mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[var(--ozone-primary)]" />
                  <h3 className="font-semibold text-[var(--ozone-primary)]">
                    {centre.city}
                  </h3>
                </div>
                <p className="text-sm text-[var(--ozone-text-secondary)]">
                  {centre.address}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--ozone-primary)] px-4 py-8 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://files.ozone.in/Images/logo.webp"
              alt="Ozone India"
              className="h-6 brightness-0 invert"
            />
            <span className="text-sm text-white/70">
              India&apos;s Leading Architectural Hardware Manufacturer
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/70">
            <a
              href="tel:+919310012300"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
              aria-label="Call Ozone customer care"
            >
              <Phone className="h-3.5 w-3.5" />
              +91-9310012300
            </a>
            <a
              href="https://www.ozone.in"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              ozone.in
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
