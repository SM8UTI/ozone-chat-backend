import { ChatShell } from "@/components/chat/ChatShell";

const SUGGESTED_STARTERS = [
  "I'm specifying showers for a 50-unit residential project",
  "Need frameless options for a luxury villa bathroom",
  "Compare Stealth vs Outliner series specs",
  "What finishes are available across all series?",
];

export default function ArchitectChatPage() {
  return (
    <ChatShell
      persona="architect"
      title="Product Consultant"
      suggestedStarters={SUGGESTED_STARTERS}
    />
  );
}
