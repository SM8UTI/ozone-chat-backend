import { z } from "zod";
import { tool } from "ai";
import { enclosures } from "@/data/enclosures";
import { fittings } from "@/data/fittings";

export const chatTools = {
  show_enclosures: tool({
    description:
      "Show one or more shower enclosure product cards to the user. Use this when recommending specific shower enclosure series. Always use actual enclosure IDs from the catalog.",
    inputSchema: z.object({
      enclosureIds: z
        .array(z.string())
        .describe(
          "Array of enclosure IDs to show (e.g., ['eliza', 'cascade'])"
        ),
    }),
    execute: async ({ enclosureIds }) => {
      const found = enclosureIds.filter((id: string) =>
        enclosures.some((e) => e.id === id)
      );
      return { enclosureIds: found, count: found.length };
    },
  }),

  show_fittings: tool({
    description:
      "Show fitting/accessory cards to the user. Use when recommending specific hardware like hinges, handles, connectors, or accessories.",
    inputSchema: z.object({
      fittingIds: z
        .array(z.string())
        .describe(
          "Array of fitting IDs to show (e.g., ['premium-shower-hinges', 'towel-bar-handles'])"
        ),
    }),
    execute: async ({ fittingIds }) => {
      const found = fittingIds.filter((id: string) =>
        fittings.some((f) => f.id === id)
      );
      return { fittingIds: found, count: found.length };
    },
  }),

  show_complete_solution: tool({
    description:
      "Show a complete shower solution package including enclosure system and all recommended fittings/accessories. Use after the user has selected an enclosure and discussed component preferences.",
    inputSchema: z.object({
      enclosureId: z
        .string()
        .describe("The enclosure ID for the main shower system"),
      fittingIds: z
        .array(z.string())
        .describe("Array of fitting IDs included in the solution"),
      notes: z
        .string()
        .optional()
        .describe("Any additional notes about the solution"),
    }),
    execute: async ({ enclosureId, fittingIds, notes }) => {
      return { enclosureId, fittingIds, notes };
    },
  }),

  compare_products: tool({
    description:
      "Show a side-by-side comparison table of 2-3 shower enclosure series. Use when the user wants to compare options or is deciding between products.",
    inputSchema: z.object({
      enclosureIds: z
        .array(z.string())
        .min(2)
        .max(3)
        .describe("Array of 2-3 enclosure IDs to compare"),
    }),
    execute: async ({ enclosureIds }) => {
      const found = enclosureIds.filter((id: string) =>
        enclosures.some((e) => e.id === id)
      );
      return { enclosureIds: found, count: found.length };
    },
  }),

  budget_estimate: tool({
    description:
      "Show a budget estimate breakdown including enclosure cost range, fittings, and installation estimate. Use when the user asks about pricing or cost.",
    inputSchema: z.object({
      enclosureId: z.string().describe("The enclosure ID to estimate for"),
      fittingIds: z
        .array(z.string())
        .describe("Array of fitting IDs to include in estimate"),
      bathroomSize: z
        .string()
        .optional()
        .describe("Bathroom size description (e.g., '8x6 feet')"),
    }),
    execute: async ({ enclosureId, fittingIds, bathroomSize }) => {
      return { enclosureId, fittingIds, bathroomSize };
    },
  }),

  book_consultation: tool({
    description:
      "Show a consultation booking CTA with contact options. Use when the user wants to book a consultation, get exact pricing, or connect with Stamper's team.",
    inputSchema: z.object({
      productInterest: z
        .string()
        .optional()
        .describe("What product the user is interested in"),
      persona: z
        .enum(["homeowner", "architect", "dealer"])
        .describe("The user's persona"),
    }),
    execute: async ({ productInterest, persona }) => {
      return { productInterest, persona };
    },
  }),

  classify_response: tool({
    description:
      "Classify the type of your response. You MUST call this tool with every response. When your response asks the user a question, also include the question text and any options.",
    inputSchema: z.object({
      answerType: z
        .enum([
          "open_ended_question",
          "multiple_choice_question",
          "summary",
          "recommendation",
        ])
        .describe("The primary type of this response"),
      questionText: z
        .string()
        .optional()
        .describe(
          "The main question being asked. Required when answerType is open_ended_question or multiple_choice_question."
        ),
      questionOptions: z
        .array(z.string())
        .optional()
        .describe(
          "The list of options/choices presented to the user. Required when answerType is multiple_choice_question. Should be an empty array for open_ended_question."
        ),
      conversationSummary: z
        .string()
        .optional()
        .describe(
          "A brief 1-2 sentence summary of the entire conversation so far, including key user preferences, requirements, and decisions made. Always include this."
        ),
    }),
    execute: async ({ answerType, questionText, questionOptions, conversationSummary }) => {
      return { answerType, questionText, questionOptions, conversationSummary };
    },
  }),

  download_catalog: tool({
    description:
      "Show a catalog download link. Use when the user asks for a catalog, brochure, or spec sheet.",
    inputSchema: z.object({
      catalogType: z
        .enum([
          "shower-enclosures",
          "complete-shower-solutions",
          "glass-fittings",
        ])
        .describe("The type of catalog to show"),
    }),
    execute: async ({ catalogType }) => {
      return { catalogType };
    },
  }),
};
