import type { Fitting } from "@/types";

export const fittings: Fitting[] = [
  // ─── Hinges ─────────────────────────────────────────────────────────
  {
    id: "premium-shower-hinges",
    name: "Premium Shower Hinges",
    category: "hinges",
    tier: "premium",
    compatibleWith: ["eliza", "alura", "eliza-sl", "lumina-33"],
    colors: [
      "Polished Stainless Steel",
      "Black Matt",
      "Brushed Gold",
      "Gun Grey",
    ],
    description:
      "Top-tier shower hinges designed for frameless glass enclosures. Precision-engineered from SS 304 stainless steel with a self-closing mechanism and adjustable tension. Available in multiple premium finishes to match any bathroom aesthetic. Supports 8mm and 10mm toughened glass panels.",
    stamperUrl: "https://www.stamper.in/shower-fittings",
  },
  {
    id: "edge-series-hinges",
    name: "Shower Hinges - Edge Series",
    category: "hinges",
    tier: "mid-range",
    compatibleWith: ["all"],
    colors: ["Polished Stainless Steel", "Black Matt", "CP"],
    description:
      "Modern-profile shower hinges from the Edge Series, offering a sleek squared-off design that complements contemporary bathroom styles. Built with durable SS 304 construction, these mid-range hinges deliver reliable performance with adjustable closing speed and 90°/180° opening angles.",
    stamperUrl: "https://www.stamper.in/shower-fittings",
  },
  {
    id: "standard-shower-hinges",
    name: "Standard Shower Hinges",
    category: "hinges",
    tier: "budget",
    compatibleWith: ["all"],
    colors: ["Polished Stainless Steel", "CP"],
    description:
      "Budget-friendly shower hinges that don't compromise on essential quality. Suitable for all enclosure types with standard 90° and 180° opening options. Easy to install and maintain, these hinges are the practical choice for residential and commercial projects where cost-efficiency matters.",
    stamperUrl: "https://www.stamper.in/shower-fittings",
  },

  // ─── Connectors ─────────────────────────────────────────────────────
  {
    id: "glass-connectors",
    name: "Glass Connectors",
    category: "connectors",
    tier: "mid-range",
    compatibleWith: ["all"],
    colors: [
      "Polished Stainless Steel",
      "Black Matt",
      "Gun Grey",
      "Brushed Gold",
    ],
    description:
      "Versatile glass connectors for glass-to-glass and glass-to-wall joints at various angles (90°, 135°, 180°). Crafted from SS 304 stainless steel, these connectors provide secure structural bonding while maintaining a minimal visual profile. Essential hardware for multi-panel shower enclosure installations.",
    stamperUrl: "https://www.stamper.in/shower-fittings",
  },

  // ─── Handles ────────────────────────────────────────────────────────
  {
    id: "towel-bar-handles",
    name: "Towel Bars with Handles",
    category: "handles",
    tier: "mid-range",
    compatibleWith: ["all"],
    colors: ["Polished Stainless Steel", "Black Matt", "Brushed Gold"],
    description:
      "Dual-purpose towel bar handles that serve as both a shower door handle and a convenient towel bar. Made from solid SS 304 stainless steel with a comfortable grip diameter. Available in lengths of 450mm and 600mm to suit different door widths. Adds functionality without additional hardware.",
    stamperUrl: "https://www.stamper.in/shower-fittings",
  },
  {
    id: "towel-bar-knobs",
    name: "Towel Bars with Knobs",
    category: "handles",
    tier: "mid-range",
    compatibleWith: ["all"],
    colors: ["Polished Stainless Steel", "Black Matt"],
    description:
      "Minimal knob-style handles paired with an integrated towel bar for a clean, streamlined look. The compact knob provides a comfortable grip while the attached towel bar adds everyday practicality. Ideal for homeowners who prefer a less prominent handle aesthetic.",
    stamperUrl: "https://www.stamper.in/shower-fittings",
  },
  {
    id: "door-knobs",
    name: "Door Knobs",
    category: "knobs",
    tier: "budget",
    compatibleWith: ["all"],
    colors: [
      "Polished Stainless Steel",
      "Black Matt",
      "CP",
      "Brushed Gold",
    ],
    description:
      "Standalone door knobs for a minimal, understated shower door appearance. Available in round and square profiles to match different design languages. Compact yet ergonomic, these knobs are perfect for frameless enclosures where you want the glass to be the hero element.",
    stamperUrl: "https://www.stamper.in/shower-fittings",
  },

  // ─── Support ────────────────────────────────────────────────────────
  {
    id: "knight-head-fittings",
    name: "Knight Head Fittings",
    category: "support",
    tier: "mid-range",
    compatibleWith: [
      "eliza",
      "alura",
      "eliza-sl",
      "lumina-33",
      "cascade",
      "zen",
      "eazy",
      "coral",
      "lumina-11",
      "lumina-22",
    ],
    colors: ["Polished Stainless Steel", "Black Matt", "Gun Grey"],
    description:
      "Top-mounted support fittings that provide critical overhead stability for glass panels in frameless and semi-framed enclosures. The knight head design connects the glass panel to the wall or ceiling at the top, preventing lateral movement and ensuring structural safety. Essential for tall glass panels and wide openings.",
    stamperUrl: "https://www.stamper.in/shower-fittings",
  },
  {
    id: "t-swing-fittings",
    name: "T Swing Shower Enclosure Fittings",
    category: "support",
    tier: "premium",
    compatibleWith: ["eliza", "aster", "grace", "ray"],
    colors: ["Polished Stainless Steel", "Black Matt"],
    description:
      "Specialized hardware designed specifically for T-Type shower enclosure configurations. These fittings enable the unique three-way glass junction required in T-shaped layouts, providing secure pivot points and structural integrity where three glass panels meet. Precision-engineered for smooth swing door operation in T-Type setups.",
    stamperUrl: "https://www.stamper.in/shower-fittings",
  },

  // ─── Sealing ────────────────────────────────────────────────────────
  {
    id: "threshold-profiles",
    name: "Threshold Profiles",
    category: "sealing",
    tier: "budget",
    compatibleWith: ["all"],
    colors: ["Polished Stainless Steel", "Black Matt", "Gun Grey"],
    description:
      "Bottom threshold profiles that create a clean separation between wet and dry areas in your bathroom. Installed at the base of the shower enclosure, they prevent water from flowing out while maintaining a low-profile step-over height. Available in standard lengths that can be cut to size during installation.",
    stamperUrl: "https://www.stamper.in/shower-fittings",
  },

  // ─── Accessories ────────────────────────────────────────────────────
  {
    id: "shower-shelves",
    name: "Shower Shelves",
    category: "accessories",
    tier: "mid-range",
    compatibleWith: ["all"],
    colors: ["Polished Stainless Steel", "Black Matt", "Gun Grey"],
    description:
      "Built-in shower shelves that mount directly onto the glass panel or wall, providing convenient storage for shampoo, soap, and toiletries within arm's reach. Made from corrosion-resistant SS 304 stainless steel with a load capacity suitable for everyday bathroom products. Available in single and double-tier options.",
    stamperUrl: "https://www.stamper.in/shower-utilities",
  },
  {
    id: "shower-seats",
    name: "Shower Seats",
    category: "accessories",
    tier: "premium",
    compatibleWith: ["all"],
    colors: ["Polished Stainless Steel", "Black Matt", "Teak Wood"],
    description:
      "Fold-down or fixed shower seating solutions that add comfort and accessibility to any shower enclosure. Wall-mounted with heavy-duty SS 304 brackets supporting up to 150kg, available in stainless steel or teak wood finishes. Ideal for elderly-friendly bathrooms, spa-inspired designs, or anyone who values shower comfort.",
    stamperUrl: "https://www.stamper.in/shower-utilities",
  },
];
