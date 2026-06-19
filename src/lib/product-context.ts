import { enclosures } from "@/data/enclosures";
import { fittings } from "@/data/fittings";

export function buildProductContext(): string {
  const enclosureContext = enclosures
    .map(
      (e) =>
        `- ${e.name} (ID: "${e.id}"): ${e.frameType} ${e.doorMechanism}, ${e.material}. Colors: ${e.colors.join(", ")}. Layouts: ${e.layouts.join(", ")}. Price tier: ${e.priceTier}. Ideal for: ${e.idealFor.join(", ")}. Features: ${e.features.join("; ")}. ${e.description}`
    )
    .join("\n");

  const fittingsContext = fittings
    .map(
      (f) =>
        `- ${f.name} (ID: "${f.id}", category: ${f.category}): ${f.description}. Colors: ${f.colors.join(", ")}. Price tier: ${f.tier}.`
    )
    .join("\n");

  return `
## STAMPER SHOWER ENCLOSURE CATALOG (use these exact IDs when calling tools)

### Enclosure Systems:
${enclosureContext}

### Fittings & Accessories:
${fittingsContext}
`;
}
