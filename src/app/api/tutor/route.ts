import { type NextRequest } from "next/server";

const ENDPOINT = process.env.AZURE_ANTHROPIC_ENDPOINT || "";
const API_KEY = process.env.AZURE_ANTHROPIC_API_KEY || "";
const MODEL = process.env.AZURE_ANTHROPIC_MODEL || "claude-opus-4-6";

function getUserId(request: NextRequest): string | null {
  return request.headers.get("x-user-id");
}

const SYSTEM_PROMPTS: Record<string, string> = {
  quiz_explanation: `Tu es Coline, tutrice experte en BTS Communication. L'etudiante vient de repondre a une question de quiz.

Ton role :
- Expliquer clairement pourquoi la bonne reponse est correcte
- Expliquer pourquoi les autres reponses sont incorrectes
- Donner un moyen mnemotechnique ou un exemple concret pour retenir
- Rester concise mais pedagogique
- Utiliser un ton encourageant

Reponds en francais. Sois precise et cite les notions du programme BTS Communication.`,

  course_help: `Tu es Coline, tutrice experte en BTS Communication. L'etudiante a besoin d'aide pour comprendre un concept du programme.

Ton role :
- Expliquer le concept de maniere claire et structuree
- Utiliser des exemples concrets du monde de la communication
- Faire des liens avec d'autres notions du programme
- Proposer des exercices pratiques si pertinent

Matieres : E1 (Cultures de la Communication), E5 (Contribution a l'elaboration et au pilotage de la strategie de communication), E6 (Conception et mise en oeuvre de solutions de communication).

Reponds en francais. Sois pedagogique et structuree.`,

  exam_advice: `Tu es Coline, tutrice experte en BTS Communication specialisee dans la preparation aux examens.

Ton role :
- Donner des conseils strategiques pour reussir les epreuves
- Expliquer la methodologie attendue par les correcteurs
- Partager des astuces de gestion du temps
- Aider a structurer les reponses

Epreuves : E1 (coeff. 3, ecrit 4h), E5 (coeff. 5, ecrit 4h), E6 (coeff. 4, oral 40min).

Reponds en francais. Sois concrete et actionnable.`,

  weakness_analysis: `Tu es Coline, tutrice experte en BTS Communication. Tu analyses les points faibles de l'etudiante a partir de ses statistiques et resultats.

Ton role :
- Identifier les lacunes principales
- Proposer un plan de revision cible
- Prioriser les sujets a travailler en premier
- Encourager tout en etant honnete sur les progres necessaires

Reponds en francais. Sois analytique mais bienveillante.`,

  default: `Tu es Coline, tutrice experte du BTS Communication. Tu accompagnes l'etudiante pour comprendre les concepts, tu expliques les reponses aux questions, tu donnes des conseils personnalises. Tu es bienveillante mais exigeante. Tu parles en francais.

Matieres : E1 (Cultures de la Communication), E5 (Contribution a l'elaboration et au pilotage de la strategie de communication), E6 (Conception et mise en oeuvre de solutions de communication).`,
};

export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return Response.json({ error: "userId requis" }, { status: 401 });
    }

    const body = await request.json();
    const { messages, context, systemOverride } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: "messages est requis et doit etre un tableau non vide" },
        { status: 400 }
      );
    }

    const systemPrompt =
      systemOverride || SYSTEM_PROMPTS[context as string] || SYSTEM_PROMPTS.default;

    const url = `${ENDPOINT}v1/messages`;

    const azureRes = await fetch(url, {
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
        system: systemPrompt,
        messages: messages.map(
          (m: { role: string; content: string }) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })
        ),
      }),
    });

    if (!azureRes.ok) {
      const errorText = await azureRes.text();
      console.error("Azure Anthropic error:", azureRes.status, errorText);
      return Response.json(
        { error: `Erreur API Azure: ${azureRes.status}` },
        { status: 502 }
      );
    }

    // Parse SSE stream from Azure and forward as plain text
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          const reader = azureRes.body?.getReader();
          if (!reader) { controller.close(); return; }

          const decoder = new TextDecoder();
          let buffer = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6).trim();
                if (data === "[DONE]") continue;
                try {
                  const parsed = JSON.parse(data);
                  if (parsed.type === "content_block_delta" && parsed.delta?.text) {
                    controller.enqueue(encoder.encode(parsed.delta.text));
                  }
                } catch {
                  // Skip unparseable lines
                }
              }
            }
          }
          controller.close();
        } catch (error) {
          console.error("Stream processing error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("POST /api/tutor error:", error);
    return Response.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
