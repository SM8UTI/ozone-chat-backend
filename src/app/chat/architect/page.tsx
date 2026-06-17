import { ChatShell } from "@/components/chat/ChatShell";

const SUGGESTED_STARTERS = [
  "Review this civil work contractor quote",
  "Are these carpentry rates standard for Mumbai?",
  "Check this modular vendor quotation",
];

export default function ArchitectChatPage() {
  return (
    <ChatShell
      persona="architect"
      title="Designer Quote Assistant"
      suggestedStarters={SUGGESTED_STARTERS}
    />
  );
}
