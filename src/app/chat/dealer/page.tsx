import { ChatShell } from "@/components/chat/ChatShell";

const SUGGESTED_STARTERS = [
  "A customer walked in looking for a shower partition",
  "Customer wants to replace their old shower enclosure",
  "Help me recommend a premium shower for a large bathroom",
  "Customer has a reference image from a hotel bathroom",
];

export default function DealerChatPage() {
  return (
    <ChatShell
      persona="dealer"
      title="Dealer Sales Assistant"
      suggestedStarters={SUGGESTED_STARTERS}
    />
  );
}
