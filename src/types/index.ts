// Chat / AI types
export type Persona = "nanee-user" | "internal_team";

export type AnswerType =
  | "open_ended_question"
  | "multiple_choice_question"
  | "summary"
  | "recommendation";

export interface Question {
  text: string;
  options: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  toolInvocations?: ToolInvocation[];
}

export interface ToolInvocation {
  toolCallId: string;
  toolName: string;
  args: Record<string, unknown>;
  result?: unknown;
}

export interface Enclosure {
  id: string;
  name: string;
  [key: string]: any;
}

export interface Fitting {
  id: string;
  name: string;
  [key: string]: any;
}
