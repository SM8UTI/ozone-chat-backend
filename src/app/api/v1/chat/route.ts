import { generateText, stepCountIs } from "ai";
import { NextResponse } from "next/server";
import { openrouter } from "@/lib/model";
import { chatTools } from "@/lib/tools";
import { buildProductContext } from "@/lib/product-context";
import { homeownerSystemPrompt, architectSystemPrompt, dealerSystemPrompt, internalTeamSystemPrompt } from "@/data/prompts";
import { enclosures } from "@/data/enclosures";
import { fittings } from "@/data/fittings";
import type { AnswerType, Enclosure, Fitting, Persona, Question } from "@/types";

const RECOMMENDATION_TOOLS = new Set([
  "show_enclosures",
  "show_fittings",
  "show_complete_solution",
  "compare_products",
  "budget_estimate",
]);

function inferAnswerType(reply: string, toolNames: string[]): AnswerType {
  if (toolNames.some((t) => RECOMMENDATION_TOOLS.has(t))) {
    return "recommendation";
  }

  const lines = reply.split("\n").filter((l) => l.trim());
  const hasNumberedOptions = lines.some((l) => /^\s*[\d]+[.)]\s/.test(l));
  const hasBulletOptions = lines.filter((l) => /^\s*[-•*]\s+\*?\*?.+\*?\*?\s*[:—–-]/.test(l)).length >= 2;
  const endsWithQuestion = /\?\s*$/.test(reply.trim());

  if ((hasNumberedOptions || hasBulletOptions) && endsWithQuestion) {
    return "multiple_choice_question";
  }
  if (endsWithQuestion) {
    return "open_ended_question";
  }
  return "summary";
}

interface ClassifyOutput {
  answerType?: AnswerType;
  questionText?: string;
  questionOptions?: string[];
  conversationSummary?: string;
}

function buildQuestion(classifyOutput: ClassifyOutput | undefined): Question | undefined {
  if (!classifyOutput?.questionText) return undefined;
  return {
    text: classifyOutput.questionText,
    options: classifyOutput.questionOptions ?? [],
  };
}

function buildRecommendations(
  toolResults: { tool: string; input: Record<string, unknown>; result: unknown }[]
): (Enclosure | Fitting)[] {
  const recommendations: (Enclosure | Fitting)[] = [];
  const seenIds = new Set<string>();

  for (const tr of toolResults) {
    if (tr.tool === "show_enclosures" || tr.tool === "compare_products") {
      const ids = (tr.input as { enclosureIds: string[] }).enclosureIds;
      for (const id of ids) {
        if (seenIds.has(id)) continue;
        const enclosure = enclosures.find((e) => e.id === id);
        if (enclosure) {
          recommendations.push(enclosure);
          seenIds.add(id);
        }
      }
    }

    if (tr.tool === "show_fittings") {
      const ids = (tr.input as { fittingIds: string[] }).fittingIds;
      for (const id of ids) {
        if (seenIds.has(id)) continue;
        const fitting = fittings.find((f) => f.id === id);
        if (fitting) {
          recommendations.push(fitting);
          seenIds.add(id);
        }
      }
    }

    if (tr.tool === "show_complete_solution") {
      const input = tr.input as { enclosureId: string; fittingIds: string[] };
      if (!seenIds.has(input.enclosureId)) {
        const enclosure = enclosures.find((e) => e.id === input.enclosureId);
        if (enclosure) {
          recommendations.push(enclosure);
          seenIds.add(input.enclosureId);
        }
      }
      for (const id of input.fittingIds) {
        if (seenIds.has(id)) continue;
        const fitting = fittings.find((f) => f.id === id);
        if (fitting) {
          recommendations.push(fitting);
          seenIds.add(id);
        }
      }
    }

    if (tr.tool === "budget_estimate") {
      const input = tr.input as { enclosureId: string; fittingIds: string[] };
      if (!seenIds.has(input.enclosureId)) {
        const enclosure = enclosures.find((e) => e.id === input.enclosureId);
        if (enclosure) {
          recommendations.push(enclosure);
          seenIds.add(input.enclosureId);
        }
      }
      for (const id of input.fittingIds) {
        if (seenIds.has(id)) continue;
        const fitting = fittings.find((f) => f.id === id);
        if (fitting) {
          recommendations.push(fitting);
          seenIds.add(id);
        }
      }
    }
  }

  return recommendations;
}

interface ContentPart {
  type: "text" | "image" | "file";
  text?: string;
  image?: string;
  file?: { filename: string; data: string };
}

interface ChatRequestMessage {
  role: "user" | "assistant";
  content: string | ContentPart[];
}

interface ChatRequest {
  messages: ChatRequestMessage[];
  persona: Persona;
}

type AIContentPart =
  | { type: "text"; text: string }
  | { type: "image"; image: string }
  | { type: "file"; data: string; mediaType: string; filename?: string };

function toAIContent(content: string | ContentPart[]): string | AIContentPart[] {
  if (typeof content === "string") return content;

  return content.map((part): AIContentPart => {
    switch (part.type) {
      case "image":
        return { type: "image", image: part.image! };
      case "file":
        return {
          type: "file",
          data: part.file!.data,
          mediaType: "application/pdf",
          filename: part.file!.filename,
        };
      default:
        return { type: "text", text: part.text ?? "" };
    }
  });
}

function hasMultimodalContent(messages: ChatRequestMessage[]): boolean {
  return messages.some(
    (m) =>
      Array.isArray(m.content) &&
      m.content.some((p) => p.type === "image" || p.type === "file")
  );
}

// const TEXT_MODEL = "deepseek/deepseek-v3.2";
const TEXT_MODEL = "openai/gpt-chat-latest";
const VISION_MODEL = "google/gemini-2.5-flash";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatRequest;

    if (!body.messages?.length) {
      return NextResponse.json(
        { error: "messages array is required and must not be empty" },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!body.persona || !["homeowner", "architect", "dealer", "internal_team"].includes(body.persona)) {
      return NextResponse.json(
        { error: 'persona is required and must be "homeowner", "architect", "dealer", or "internal_team"' },
        { status: 400, headers: corsHeaders }
      );
    }

    const { messages, persona } = body;

    const systemPrompt =
      persona === "architect"
        ? architectSystemPrompt
        : persona === "dealer"
          ? dealerSystemPrompt
          : persona === "internal_team"
            ? internalTeamSystemPrompt
            : homeownerSystemPrompt;

    const modelId = hasMultimodalContent(messages) ? VISION_MODEL : TEXT_MODEL;

    const result = await generateText({
      model: openrouter(modelId),
      system: `${systemPrompt}\n\n${buildProductContext()}`,
      messages: messages.map((m) =>
        m.role === "user"
          ? { role: "user" as const, content: toAIContent(m.content) }
          : { role: "assistant" as const, content: typeof m.content === "string" ? m.content : "" }
      ),
      tools: chatTools,
      stopWhen: stepCountIs(5),
    });

    const allToolResults = result.steps.flatMap((step) => step.toolResults);

    const classifyResult = allToolResults.find(
      (tr) => tr.toolName === "classify_response"
    );

    const toolResults = allToolResults
      .filter((tr) => tr.toolName !== "classify_response")
      .map((tr) => ({
        tool: tr.toolName,
        input: tr.input as Record<string, unknown>,
        result: tr.output,
      }));

    const classifyOutput = classifyResult?.output as ClassifyOutput | undefined;

    const answerType: AnswerType =
      classifyOutput?.answerType ??
      inferAnswerType(result.text, toolResults.map((tr) => tr.tool));

    const response: Record<string, unknown> = {
      reply: result.text,
      answerType,
      model: modelId,
      toolResults,
      usage: {
        inputTokens: result.totalUsage.inputTokens,
        outputTokens: result.totalUsage.outputTokens,
        totalTokens: result.totalUsage.totalTokens,
      },
    };

    if (answerType === "open_ended_question" || answerType === "multiple_choice_question") {
      const question = buildQuestion(classifyOutput);
      if (question) {
        response.question = question;
      }
    }

    const recommendations = buildRecommendations(toolResults);
    if (recommendations.length > 0) {
      response.recommendations = recommendations;
    }

    if (classifyOutput?.conversationSummary) {
      response.summary = classifyOutput.conversationSummary;
    }

    return NextResponse.json(response, { headers: corsHeaders });
  } catch (error) {
    console.error("[/api/v1/chat] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
