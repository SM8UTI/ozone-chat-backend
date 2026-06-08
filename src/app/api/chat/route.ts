import { streamText, convertToModelMessages, stepCountIs, type UIMessage } from "ai";
import { openrouter } from "@/lib/model";
import { chatTools } from "@/lib/tools";
import { buildProductContext } from "@/lib/product-context";
import { homeownerSystemPrompt, architectSystemPrompt, dealerSystemPrompt } from "@/data/prompts";
import type { Persona } from "@/types";

export async function POST(req: Request) {
  const { messages, persona } = (await req.json()) as {
    messages: UIMessage[];
    persona: Persona;
  };

  const systemPrompt =
    persona === "architect"
      ? architectSystemPrompt
      : persona === "dealer"
        ? dealerSystemPrompt
        : homeownerSystemPrompt;

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: openrouter("deepseek/deepseek-chat"),
    system: `${systemPrompt}\n\n${buildProductContext()}`,
    messages: modelMessages,
    tools: chatTools,
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}
