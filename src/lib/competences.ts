// BTS Communication - Systeme de competences fines (18 competences)

export interface Competence {
  id: string;
  exam: "e1" | "e5" | "e6";
  label: string;
  description: string;
  weight: number;
}

export const COMPETENCES: Competence[] = [
  // --- E1 : Cultures de la communication (6 competences) ---
  {
    id: "e1-positions-corpus",
    exam: "e1",
    label: "Reperer les positions dans un corpus",
    description:
      "Identifier les documents du corpus, leur nature, leur source et leur date. Comprendre le lien entre les documents et le theme impose.",
    weight: 0.15,
  },
  {
    id: "e1-relier-corpus",
    exam: "e1",
    label: "Relier corpus et communication",
    description:
      "Faire le lien entre les documents du corpus et les enjeux de communication : cibles, objectifs, supports, strategies.",
    weight: 0.2,
  },
  {
    id: "e1-analyser-campagne",
    exam: "e1",
    label: "Analyser une campagne",
    description:
      "Decrypter une campagne de communication : annonceur, cible, message, ton, supports, moyens, coherence globale.",
    weight: 0.2,
  },
  {
    id: "e1-mobiliser-auteur",
    exam: "e1",
    label: "Mobiliser un auteur ou une reference",
    description:
      "Citer et utiliser a bon escient un auteur, un courant theorique ou une reference culturelle pour appuyer son analyse.",
    weight: 0.2,
  },
  {
    id: "e1-rediger-message",
    exam: "e1",
    label: "Rediger un message adapte",
    description:
      "Produire un ecrit structure, clair et adapte au contexte de communication demande (note, synthese, argumentaire).",
    weight: 0.15,
  },
  {
    id: "e1-justifier-choix",
    exam: "e1",
    label: "Justifier ses choix redactionnels",
    description:
      "Expliquer et defendre ses choix de ton, de registre, de structure et d'arguments dans la production ecrite.",
    weight: 0.1,
  },

  // --- E5 : Activite de communication (6 competences) ---
  {
    id: "e5-demande-annonceur",
    exam: "e5",
    label: "Comprendre la demande de l'annonceur",
    description:
      "Analyser le brief, identifier les attentes explicites et implicites de l'annonceur, reformuler la problematique.",
    weight: 0.15,
  },
  {
    id: "e5-diagnostic",
    exam: "e5",
    label: "Etablir un diagnostic",
    description:
      "Realiser un diagnostic de communication : analyse interne/externe, forces/faiblesses, opportunites/menaces (SWOT).",
    weight: 0.2,
  },
  {
    id: "e5-enjeux",
    exam: "e5",
    label: "Identifier les enjeux societaux, technologiques et juridiques",
    description:
      "Reperer les contraintes et opportunites liees au cadre legal, aux evolutions technologiques et aux tendances societales.",
    weight: 0.15,
  },
  {
    id: "e5-preconisation",
    exam: "e5",
    label: "Formuler une preconisation",
    description:
      "Proposer une strategie de communication coherente : positionnement, axes creatifs, message cle, ton.",
    weight: 0.2,
  },
  {
    id: "e5-plan-communication",
    exam: "e5",
    label: "Elaborer un plan de communication",
    description:
      "Construire un plan de communication structure : objectifs, cibles, actions, planning, supports, budget previsionnel.",
    weight: 0.2,
  },
  {
    id: "e5-moyens-indicateurs",
    exam: "e5",
    label: "Definir les moyens et indicateurs",
    description:
      "Choisir les moyens de communication adaptes et definir des indicateurs de performance (KPI) pour evaluer les actions.",
    weight: 0.1,
  },

  // --- E6 : Oral de soutenance (5 competences) ---
  {
    id: "e6-presenter-parcours",
    exam: "e6",
    label: "Presenter son parcours en 5 minutes",
    description:
      "Synthetiser son parcours de formation et ses experiences professionnelles de maniere claire, structuree et engageante.",
    weight: 0.2,
  },
  {
    id: "e6-justifier-creatifs",
    exam: "e6",
    label: "Justifier ses choix creatifs",
    description:
      "Expliquer et argumenter les choix creatifs realises dans les productions : visuels, ton, supports, ligne editoriale.",
    weight: 0.2,
  },
  {
    id: "e6-expliquer-production",
    exam: "e6",
    label: "Expliquer sa production",
    description:
      "Presenter le processus de creation, les etapes de realisation, les outils utilises et les ajustements effectues.",
    weight: 0.2,
  },
  {
    id: "e6-repondre-jury",
    exam: "e6",
    label: "Repondre au jury",
    description:
      "Comprendre les questions du jury, formuler des reponses precises et argumentees, gerer les objections.",
    weight: 0.25,
  },
  {
    id: "e6-defendre-fiche",
    exam: "e6",
    label: "Defendre sa fiche descriptive",
    description:
      "Presenter et defendre la fiche descriptive de l'action de communication : contexte, objectifs, moyens, resultats.",
    weight: 0.15,
  },
];

// --- Helpers ---

export function getCompetencesByExam(
  exam: "e1" | "e5" | "e6"
): Competence[] {
  return COMPETENCES.filter((c) => c.exam === exam);
}

export function getCompetenceById(id: string): Competence | undefined {
  return COMPETENCES.find((c) => c.id === id);
}

/**
 * Retourne le poids total d'une epreuve (devrait etre ~1.0 par epreuve).
 */
export function getExamTotalWeight(exam: "e1" | "e5" | "e6"): number {
  return getCompetencesByExam(exam).reduce((sum, c) => sum + c.weight, 0);
}

/**
 * Retourne toutes les competences triees par poids decroissant.
 */
export function getCompetencesSortedByWeight(): Competence[] {
  return [...COMPETENCES].sort((a, b) => b.weight - a.weight);
}
