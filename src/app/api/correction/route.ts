import { type NextRequest } from "next/server";

const ENDPOINT = process.env.AZURE_ANTHROPIC_ENDPOINT || "";
const API_KEY = process.env.AZURE_ANTHROPIC_API_KEY || "";
const MODEL = process.env.AZURE_ANTHROPIC_MODEL || "claude-opus-4-6";

const GRILLES: Record<string, { criteres: { critere: string; maxPoints: number }[]; description: string }> = {
  E1: {
    description: "Cultures de la communication (4h, coef 3)",
    criteres: [
      { critere: "Comprehension du texte", maxPoints: 4 },
      { critere: "Qualite de l'argumentation", maxPoints: 4 },
      { critere: "Analyse des procedes de la campagne", maxPoints: 6 },
      { critere: "Production creative", maxPoints: 6 },
    ],
  },
  E1_PARTIE1: {
    description: "Cultures de la communication - Partie 1 : Analyse de texte (4h, coef 3)",
    criteres: [
      { critere: "Comprehension du texte", maxPoints: 4 },
      { critere: "Qualite de l'argumentation", maxPoints: 4 },
      { critere: "Analyse des procedes de la campagne", maxPoints: 6 },
      { critere: "Production creative", maxPoints: 6 },
    ],
  },
  E1_PARTIE2: {
    description: "Cultures de la communication - Partie 2 : Production (4h, coef 3)",
    criteres: [
      { critere: "Comprehension du texte", maxPoints: 4 },
      { critere: "Qualite de l'argumentation", maxPoints: 4 },
      { critere: "Analyse des procedes de la campagne", maxPoints: 6 },
      { critere: "Production creative", maxPoints: 6 },
    ],
  },
  E4: {
    description: "Strategie de communication (4h, coef 5)",
    criteres: [
      { critere: "Diagnostic de communication", maxPoints: 5 },
      { critere: "Definition objectifs et cibles", maxPoints: 4 },
      { critere: "Recommandation strategique", maxPoints: 6 },
      { critere: "Plan de communication et budget", maxPoints: 5 },
    ],
  },
};

function buildSystemPrompt(examType: string): string {
  const grille = GRILLES[examType] || GRILLES["E1"];
  const grilleText = grille.criteres
    .map((c) => `- ${c.critere}: /${c.maxPoints} points`)
    .join("\n");

  return `Tu es un correcteur expert du BTS Communication, examinateur depuis 15 ans. Tu corriges cette copie selon la grille d'evaluation officielle de l'epreuve ${grille.description}.

Grille d'evaluation :
${grilleText}

Tu dois:
1. Lire attentivement la copie (photo)
2. Evaluer chaque critere de la grille et attribuer une note
3. Identifier les points forts
4. Identifier les points faibles avec des exemples precis tires de la copie
5. Donner des conseils CONCRETS pour s'ameliorer
6. Suggerer des reformulations pour les passages faibles
7. Proposer 2-3 mini-exercices cibles sur les lacunes identifiees

Sois exigeant mais bienveillant. L'objectif est d'aider l'etudiant a progresser.

Reponds UNIQUEMENT en JSON valide (sans markdown, sans backticks) avec cette structure :
{
  "note": number,
  "grille": [{ "critere": string, "maxPoints": number, "note": number, "commentaire": string }],
  "pointsForts": [string],
  "pointsFaibles": [{ "probleme": string, "exemple": string, "conseil": string }],
  "structureAnalysis": string,
  "suggestedExercises": [{ "type": string, "title": string, "description": string, "difficulty": "easy" | "medium" | "hard" }],
  "overallFeedback": string
}`;
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return Response.json({ error: "userId requis" }, { status: 401 });
    }

    const body = await request.json();
    const { images, examType } = body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return Response.json(
        { error: "Au moins une image est requise" },
        { status: 400 }
      );
    }

    if (!examType) {
      return Response.json(
        { error: "Le type d'epreuve est requis" },
        { status: 400 }
      );
    }

    const systemPrompt = buildSystemPrompt(examType);

    // Build content array with all images + text prompt
    const content: Array<{ type: string; source?: { type: string; media_type: string; data: string }; text?: string }> = [];

    for (let i = 0; i < images.length; i++) {
      content.push({
        type: "image",
        source: {
          type: "base64",
          media_type: "image/jpeg",
          data: images[i],
        },
      });
    }

    content.push({
      type: "text",
      text: `Voici ma copie d'examen (${images.length} page${images.length > 1 ? "s" : ""}). Corrige-la selon la grille officielle de l'epreuve ${examType}. Reponds uniquement en JSON valide.`,
    });

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
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: "user", content }],
      }),
    });

    if (!azureRes.ok) {
      const errorText = await azureRes.text();
      console.error("Azure correction error:", azureRes.status, errorText);
      return Response.json({ error: `Erreur API: ${azureRes.status}` }, { status: 502 });
    }

    const response = await azureRes.json();
    const textBlock = response.content?.find((block: { type: string }) => block.type === "text");
    if (!textBlock) {
      return Response.json({ error: "Reponse invalide du modele" }, { status: 500 });
    }

    // Parse JSON from response
    let correctionData;
    try {
      let jsonText = textBlock.text.trim();
      if (jsonText.startsWith("```")) {
        jsonText = jsonText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
      }
      correctionData = JSON.parse(jsonText);
    } catch {
      correctionData = {
        note: 0,
        grille: [],
        pointsForts: [],
        pointsFaibles: [],
        structureAnalysis: "",
        suggestedExercises: [],
        overallFeedback: textBlock.text,
        parseError: true,
      };
    }

    return Response.json(correctionData);
  } catch (error) {
    console.error("POST /api/correction error:", error);
    return Response.json(
      { error: "Erreur serveur lors de la correction" },
      { status: 500 }
    );
  }
}
