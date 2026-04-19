// Azure Anthropic client - REST API calls
// The @anthropic-ai/sdk baseURL approach doesn't work well with Azure AI endpoints
// Using direct REST calls instead

const ENDPOINT = process.env.AZURE_ANTHROPIC_ENDPOINT || "";
const API_KEY = process.env.AZURE_ANTHROPIC_API_KEY || "";
const MODEL = process.env.AZURE_ANTHROPIC_MODEL || "claude-opus-4-6";

export interface Message {
  role: "user" | "assistant";
  content: string | Array<{ type: string; [key: string]: unknown }>;
}

export async function askTutor(
  messages: Message[],
  systemPrompt?: string
): Promise<string> {
  const url = `${ENDPOINT}v1/messages`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4096,
      system: systemPrompt || "Tu es Coline, tutrice experte du BTS Communication. Tu aides l'etudiante a comprendre les concepts, tu expliques les reponses, tu donnes des conseils personnalises. Tu es bienveillante mais exigeante. Tu parles en francais.",
      messages,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Azure Anthropic error:", res.status, errorText);
    throw new Error(`Azure API error: ${res.status}`);
  }

  const data = await res.json();
  const block = data.content?.[0];
  if (block?.type === "text") {
    return block.text;
  }
  return "";
}

// Streaming version for tutor API
export async function streamTutor(
  messages: Message[],
  systemPrompt?: string
): Promise<Response> {
  const url = `${ENDPOINT}v1/messages`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 2048,
      stream: true,
      system: systemPrompt || "Tu es Coline, tutrice experte du BTS Communication. Tu aides l'etudiante a comprendre les concepts, tu expliques les reponses, tu donnes des conseils personnalises. Tu es bienveillante mais exigeante. Tu parles en francais.",
      messages,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Azure Anthropic stream error:", res.status, errorText);
    throw new Error(`Azure API error: ${res.status}`);
  }

  return res;
}
