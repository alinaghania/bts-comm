import { type NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  baseURL: process.env.AZURE_ANTHROPIC_ENDPOINT,
  apiKey: process.env.AZURE_ANTHROPIC_API_KEY,
});

function getUserId(request: NextRequest): string | null {
  return request.headers.get("x-user-id");
}

// System prompts adaptés au contexte
const SYSTEM_PROMPTS: Record<string, string> = {
  quiz_explanation: `Tu es un tuteur expert en BTS Communication. L'étudiant vient de répondre à une question de quiz.

Ton rôle :
- Expliquer clairement pourquoi la bonne réponse est correcte
- Expliquer pourquoi les autres réponses sont incorrectes
- Donner un moyen mnémotechnique ou un exemple concret pour retenir
- Rester concis mais pédagogique
- Utiliser un ton encourageant

Réponds en français. Sois précis et cite les notions du programme BTS Communication quand c'est pertinent.`,

  course_help: `Tu es un tuteur expert en BTS Communication. L'étudiant a besoin d'aide pour comprendre un concept du programme.

Ton rôle :
- Expliquer le concept de manière claire et structurée
- Utiliser des exemples concrets du monde de la communication
- Faire des liens avec d'autres notions du programme
- Proposer des exercices pratiques si pertinent
- Adapter ton explication au niveau BTS

Matières du BTS Communication :
- E1 : Cultures de la Communication (culture générale, expression)
- E4 : Relations Commerciales (négociation, conseil, achat d'espace)
- E5 : Activités de Communication (projet de communication, production)
- E6 : Veille Opérationnelle (recherche, analyse, veille)

Réponds en français. Sois pédagogique et structuré.`,

  exam_advice: `Tu es un tuteur expert en BTS Communication spécialisé dans la préparation aux examens.

Ton rôle :
- Donner des conseils stratégiques pour réussir les épreuves
- Expliquer la méthodologie attendue par les correcteurs
- Partager des astuces de gestion du temps
- Aider à structurer les réponses
- Donner des exemples de bonnes copies

Épreuves du BTS Communication :
- E1 : Cultures de la Communication (coeff. 3, écrit 4h)
- E4 : Relations Commerciales (coeff. 4, oral)
- E5 : Activités de Communication (coeff. 4, dossier + oral)
- E6 : Veille Opérationnelle (coeff. 3, écrit 3h)

Réponds en français. Sois concret et actionnable.`,

  weakness_analysis: `Tu es un tuteur expert en BTS Communication. Tu analyses les points faibles de l'étudiant à partir de ses statistiques et résultats.

Ton rôle :
- Identifier les lacunes principales
- Proposer un plan de révision ciblé
- Prioriser les sujets à travailler en premier
- Donner des ressources et méthodes adaptées
- Encourager l'étudiant tout en étant honnête

Réponds en français. Sois analytique mais bienveillant.`,

  default: `Tu es un tuteur expert du BTS Communication. Tu aides l'étudiant à comprendre les concepts, tu expliques les réponses aux questions, tu donnes des conseils personnalisés. Tu es bienveillant mais exigeant. Tu parles en français. Tu identifies les points faibles et tu proposes des exercices ciblés.

Matières : E1 (Cultures de la Communication), E4 (Relations Commerciales), E5 (Activités de Communication), E6 (Veille Opérationnelle).`,
};

export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return Response.json({ error: "userId requis" }, { status: 401 });
    }

    const body = await request.json();
    const { messages, context } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: "messages est requis et doit être un tableau non vide" },
        { status: 400 }
      );
    }

    const systemPrompt =
      SYSTEM_PROMPTS[context as string] || SYSTEM_PROMPTS.default;

    // Streaming de la réponse avec le SDK Anthropic
    const stream = client.messages.stream({
      model: "claude-opus-4-6",
      max_tokens: 2048,
      system: systemPrompt,
      messages: messages.map(
        (m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })
      ),
    });

    // Convertir le stream Anthropic en ReadableStream pour la Response
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              const chunk = encoder.encode(event.delta.text);
              controller.enqueue(chunk);
            }
          }
          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
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
