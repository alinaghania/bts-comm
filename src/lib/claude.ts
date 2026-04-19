import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  baseURL: process.env.AZURE_ANTHROPIC_ENDPOINT,
  apiKey: process.env.AZURE_ANTHROPIC_API_KEY,
});

const TUTOR_SYSTEM_PROMPT =
  "Tu es un tuteur expert du BTS Communication. Tu aides l'étudiant à comprendre les concepts, tu expliques les réponses aux questions, tu donnes des conseils personnalisés. Tu es bienveillant mais exigeant. Tu parles en français. Tu identifies les points faibles et tu proposes des exercices ciblés.";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function askTutor(
  messages: Message[],
  systemPrompt?: string
): Promise<string> {
  const response = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 4096,
    system: systemPrompt ?? TUTOR_SYSTEM_PROMPT,
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  });

  const block = response.content[0];
  if (block.type === "text") {
    return block.text;
  }
  return "";
}
