import { ChatShell } from "@/components/chat/ChatShell";

const SUGGESTED_STARTERS = [
  "Review my 2BHK interior quotation",
  "How can I justify these premium plywood costs?",
  "Help me structure this civil and plumbing quote",
];

export default function DealerChatPage() {
  return (
    <ChatShell
      persona="dealer"
      title="Contractor Quote Assistant"
      suggestedStarters={SUGGESTED_STARTERS}
    />
  );
}
