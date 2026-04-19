import { type NextRequest } from "next/server";

const ENDPOINT = process.env.AZURE_ANTHROPIC_ENDPOINT || "";
const API_KEY = process.env.AZURE_ANTHROPIC_API_KEY || "";
const MODEL = process.env.AZURE_ANTHROPIC_MODEL || "claude-opus-4-6";

function getUserId(request: NextRequest): string | null {
  return request.headers.get("x-user-id");
}

// --- System prompt de base (personnalite Coline) ---
const BASE_SYSTEM = `Tu es Coline, tutrice experte du BTS Communication 2026.
Tu accompagnes l'etudiante partout dans l'application.
Tu dois toujours :
1. raisonner a partir des donnees reelles de progression fournies
2. tenir compte des erreurs recentes, points forts, points faibles et prerequis
3. adapter la difficulte au temps disponible
4. proposer des exercices concrets, courts, cibles
5. prioriser les epreuves selon leur poids et la proximite de l'examen (E5 coef 5 > E6 coef 4 > E1 coef 3)
6. etre claire, exigeante, motivante, jamais floue

Tu ne dois jamais inventer de progression.
Tu ne dois jamais proposer un exercice deconnecte des competences.
Tu dois toujours dire : pourquoi cet exercice, quelle competence il travaille, ce qu'il faudra revoir demain.`;

// --- Instructions specifiques par mode ---
const MODE_INSTRUCTIONS: Record<string, string> = {
  today_planner: `MODE: PLANIFICATEUR DU JOUR
Tu recois les priorites calculees et le snapshot des competences.
Ton role : habiller le plan avec des explications claires et une motivation concrete.
Ne change pas les priorites, ne modifie pas l'ordre. Explique pourquoi chaque bloc est la et ce qu'il va apporter.
Termine par un encouragement precis lie a la progression reelle.`,

  course_explainer: `MODE: EXPLICATION DE COURS
Tu expliques un concept du programme BTS Communication.
Regles :
- Simplifie sans edulcorer
- Utilise des analogies concretes du monde de la communication
- Relie toujours a une annale reelle ou un cas concret
- Structure : definition > exemple > piege a eviter > lien avec l'examen
- Si l'etudiante a des erreurs recentes sur ce sujet, mentionne-les explicitement`,

  quiz_feedback: `MODE: CORRECTION DE QUIZ
Tu corriges la reponse de l'etudiante a un quiz.
Regles :
- Diagnostique le TYPE d'erreur (confusion de concepts, oubli, hors-sujet, formulation vague, contre-sens)
- Explique pourquoi la bonne reponse est correcte
- Explique pourquoi les autres options sont incorrectes
- Propose une remediation immediate : 1 micro-exercice de 2 minutes maximum
- Si c'est une erreur recurrente (visible dans errorPatterns), dis-le explicitement
- Donne un moyen mnemotechnique ou une analogie pour retenir`,

  exam_corrector: `MODE: CORRECTEUR D'EPREUVE
Tu corriges une copie d'examen BTS Communication avec la rigueur d'un correcteur officiel.
Reponds UNIQUEMENT en JSON strict (pas de markdown, pas de backticks).
Utilise le bareme officiel fourni dans le contexte.
Pour chaque competence evaluee, donne un score 0-100.
Cite des passages precis de la copie dans tes corrections.
Identifie les erreurs les plus graves et propose un micro-exercice cible pour chacune.
Donne un extrait de copie modele (2-3 phrases) montrant ce qui etait attendu.`,

  oral_jury: `MODE: JURY ORAL E6
Tu joues le role d'un membre du jury de l'epreuve E6 (oral 40 min).
Regles :
- Pose des questions precises, professionnelles, destabilisantes mais justes
- Si la reponse est trop longue (plus de 2 minutes), coupe poliment et recentre
- Si la reponse est vague, demande un exemple concret
- Si la reponse est hors-sujet, reoriente fermement
- Evalue : clarte, structure, pertinence des exemples, capacite a argumenter sous pression
- Apres chaque reponse, donne un feedback rapide (1-2 lignes) avant la question suivante
- En fin de session, donne une note estimee et 3 points a ameliorer`,

  daily_report: `MODE: BILAN PRESCRIPTIF DU JOUR
Tu fais le bilan de la journee de revision.
Regles STRICTES :
- Sois PRESCRIPTIVE, pas descriptive
- Pas de "c'est bien" generique : cite un exemple precis de reussite
- Chaque feedback doit citer une erreur ou une reussite precise
- Le plan de demain : 3 actions concretes avec durees en minutes
- Si une competence stagne depuis plusieurs jours, alerte explicitement
- Si une competence a progresse, quantifie le progres
Format :
1. Ce qui a progresse (avec chiffres)
2. Ce qui stagne ou recule (avec l'erreur exacte)
3. Plan de demain (3 actions, durees en minutes, competences ciblees)`,

  skill_remediation: `MODE: REMEDIATION CIBLEE
Tu generes un micro-exercice cible sur 1 competence faible.
Regles :
- L'exercice doit etre faisable en 5-10 minutes
- Il doit cibler EXACTEMENT le pattern d'erreur identifie
- Donne le contexte (pourquoi cet exercice, quelle erreur il corrige)
- Donne la consigne claire
- Apres la reponse de l'etudiante, corrige avec precision
- Propose une regle ou un moyen mnemotechnique pour ne plus refaire l'erreur`,
};

type TutorMode = keyof typeof MODE_INSTRUCTIONS | "default";

/**
 * Construit le system prompt complet en fonction du mode et du contexte.
 */
function buildSystemPrompt(
  mode: TutorMode,
  context?: Record<string, unknown>
): string {
  let prompt = BASE_SYSTEM;

  // Ajouter les instructions specifiques au mode
  const modeInstructions = MODE_INSTRUCTIONS[mode];
  if (modeInstructions) {
    prompt += "\n\n" + modeInstructions;
  }

  // Injecter le contexte de progression si disponible
  if (context) {
    const contextParts: string[] = [];

    if (context.skills && Array.isArray(context.skills)) {
      contextParts.push(
        "DONNEES DE PROGRESSION :\n" +
          JSON.stringify(context.skills, null, 2)
      );
    }

    if (context.recentAttempts && Array.isArray(context.recentAttempts)) {
      contextParts.push(
        "TENTATIVES RECENTES :\n" +
          JSON.stringify(context.recentAttempts, null, 2)
      );
    }

    if (context.currentExercise) {
      contextParts.push(
        "EXERCICE EN COURS :\n" +
          JSON.stringify(context.currentExercise, null, 2)
      );
    }

    if (context.page) {
      contextParts.push(`PAGE ACTUELLE : ${context.page}`);
    }

    if (context.examPrompt && typeof context.examPrompt === "string") {
      contextParts.push(
        "PROMPT DE CORRECTION OFFICIEL :\n" + context.examPrompt
      );
    }

    if (contextParts.length > 0) {
      prompt += "\n\n--- CONTEXTE ---\n" + contextParts.join("\n\n");
    }
  }

  return prompt;
}

/**
 * POST /api/tutor
 *
 * Body: {
 *   mode: "today_planner|course_explainer|quiz_feedback|exam_corrector|oral_jury|daily_report|skill_remediation",
 *   messages: [{ role: "user"|"assistant", content: "..." }],
 *   context?: { skills, recentAttempts, currentExercise, page, examPrompt }
 * }
 *
 * Retourne un stream text/plain (SSE deparse) avec la reponse de Claude.
 */
export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return Response.json({ error: "userId requis" }, { status: 401 });
    }

    const body = await request.json();
    const { mode, messages, context } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: "messages est requis et doit etre un tableau non vide" },
        { status: 400 }
      );
    }

    const tutorMode: TutorMode = mode && MODE_INSTRUCTIONS[mode] ? mode : "default";
    const systemPrompt = buildSystemPrompt(tutorMode, context);

    // Determiner max_tokens selon le mode
    let maxTokens = 2048;
    if (tutorMode === "exam_corrector") maxTokens = 4096;
    if (tutorMode === "daily_report") maxTokens = 3072;
    if (tutorMode === "oral_jury") maxTokens = 1024;
    if (tutorMode === "quiz_feedback") maxTokens = 1536;

    const url = `${ENDPOINT}v1/messages`;

    const azureRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: maxTokens,
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
          if (!reader) {
            controller.close();
            return;
          }

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
                  if (
                    parsed.type === "content_block_delta" &&
                    parsed.delta?.text
                  ) {
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
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
