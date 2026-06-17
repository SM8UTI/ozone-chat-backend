import { ChatShell } from "@/components/chat/ChatShell";

const SUGGESTED_STARTERS = [
  "I just got a quote for my 3BHK interiors",
  "Is 30L a fair price for a full home interior?",
  "Can you review this modular kitchen quotation?",
];

export default function HomeownerChatPage() {
  return (
    <ChatShell
      persona="homeowner"
      title="Quotation Advisor"
      suggestedStarters={SUGGESTED_STARTERS}
    />
  );
}
