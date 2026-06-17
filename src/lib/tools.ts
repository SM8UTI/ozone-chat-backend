import { z } from "zod";
import { tool } from "ai";

export const chatTools = {
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
};
