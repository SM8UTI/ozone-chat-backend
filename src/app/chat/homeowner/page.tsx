import { ChatShell } from "@/components/chat/ChatShell";

const SUGGESTED_STARTERS = [
  "I'm renovating my bathroom and need a shower enclosure",
  "What's the difference between frameless and framed showers?",
  "I have a small bathroom, what are my options?",
  "Help me pick a shower under 30K",
];

export default function HomeownerChatPage() {
  return (
    <ChatShell
      persona="homeowner"
      title="Shower Advisor"
      suggestedStarters={SUGGESTED_STARTERS}
    />
  );
}
