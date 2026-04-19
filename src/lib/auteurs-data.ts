// BTS Communication - Auteurs et references theoriques

export interface Auteur {
  auteur: string;
  idee_centrale: string;
  citation_courte: string;
  quand_utiliser: string;
  phrase_modele: string;
  exam: "e1" | "e5" | "e6";
  tags: string[];
}

export const AUTEURS: Auteur[] = [
  {
    auteur: "Roland Barthes",
    idee_centrale:
      "La semiologie : tout message visuel ou textuel est un systeme de signes a decoder (denotation vs connotation).",
    citation_courte:
      "L'image est polysemique, elle implique une chaine flottante de signifies.",
    quand_utiliser:
      "Analyse d'une affiche, d'un visuel publicitaire, d'un logo. Des qu'on doit decoder les signes d'une campagne.",
    phrase_modele:
      "Comme le montre Barthes dans Rhetorique de l'image, cette publicite joue sur la connotation pour associer le produit a un imaginaire de liberte.",
    exam: "e1",
    tags: ["semiologie", "image", "connotation", "denotation", "publicite"],
  },
  {
    auteur: "Roman Jakobson",
    idee_centrale:
      "Les 6 fonctions du langage : emotive, conative, referentielle, phatique, metalinguistique, poetique.",
    citation_courte:
      "Chaque message met l'accent sur l'un des facteurs de la communication.",
    quand_utiliser:
      "Analyser le ton et la visee d'un message publicitaire. Identifier la fonction dominante d'un slogan ou d'un texte.",
    phrase_modele:
      "Selon le schema de Jakobson, ce slogan privilegue la fonction conative en interpellant directement le consommateur par l'imperatif.",
    exam: "e1",
    tags: ["fonctions", "langage", "message", "slogan", "linguistique"],
  },
  {
    auteur: "Paul Watzlawick",
    idee_centrale:
      "On ne peut pas ne pas communiquer. Toute interaction est communication, meme le silence.",
    citation_courte: "On ne peut pas ne pas communiquer.",
    quand_utiliser:
      "Communication de crise, analyse des interactions, communication non verbale, posture d'une marque.",
    phrase_modele:
      "Comme l'affirme Watzlawick, le silence d'une marque face a une polemique est deja une forme de communication interpretee par le public.",
    exam: "e1",
    tags: [
      "interaction",
      "communication",
      "non-verbal",
      "crise",
      "silence",
    ],
  },
  {
    auteur: "Ferdinand de Saussure",
    idee_centrale:
      "Le signe linguistique est compose d'un signifiant (forme) et d'un signifie (concept). Le lien est arbitraire.",
    citation_courte:
      "Le signe linguistique unit non une chose et un nom, mais un concept et une image acoustique.",
    quand_utiliser:
      "Analyse de noms de marque, de slogans, de jeux de mots publicitaires. Quand on etudie le choix des mots.",
    phrase_modele:
      "En s'appuyant sur Saussure, on peut analyser le nom de marque comme un signifiant dont le signifie est construit par l'univers publicitaire.",
    exam: "e1",
    tags: ["signifiant", "signifie", "signe", "linguistique", "marque"],
  },
  {
    auteur: "Jean Baudrillard",
    idee_centrale:
      "La societe de consommation repose sur des signes plus que sur des besoins reels. L'objet est devenu signe.",
    citation_courte:
      "On ne consomme jamais l'objet en soi, on manipule toujours les objets comme signes.",
    quand_utiliser:
      "Critiquer la surconsommation, analyser le branding, le luxe, la consommation comme acte social.",
    phrase_modele:
      "Baudrillard nous rappelle que cette campagne ne vend pas un produit mais un signe social : celui de l'appartenance a une elite.",
    exam: "e1",
    tags: ["consommation", "signe", "societe", "luxe", "branding"],
  },
  {
    auteur: "Pierre Bourdieu",
    idee_centrale:
      "Le capital culturel et symbolique determine les pratiques de consommation et la distinction sociale.",
    citation_courte:
      "Les gouts sont le produit de conditions sociales de production.",
    quand_utiliser:
      "Analyse du ciblage, de la segmentation, des strategies de positionnement haut/bas de gamme, de la distinction.",
    phrase_modele:
      "Selon Bourdieu, cette strategie de communication cible un public dote d'un capital culturel eleve, en jouant sur des references artistiques.",
    exam: "e5",
    tags: ["distinction", "capital", "ciblage", "sociologie", "culture"],
  },
  {
    auteur: "Gilles Lipovetsky",
    idee_centrale:
      "L'hypermodernite et l'hyperconsommation : l'individu contemporain est guide par le plaisir, l'experience et l'emotion.",
    citation_courte:
      "Nous sommes entres dans l'ere de l'hyperconsommation emotionnelle.",
    quand_utiliser:
      "Analyser le marketing experientiel, la personnalisation, les tendances de consommation actuelles.",
    phrase_modele:
      "Comme le theorise Lipovetsky, cette marque mise sur l'hyperconsommation emotionnelle en proposant une experience sensorielle unique.",
    exam: "e5",
    tags: ["hyperconsommation", "experience", "emotion", "modernite", "tendance"],
  },
  {
    auteur: "Marshall McLuhan",
    idee_centrale:
      "Le medium est le message : le support de communication influence autant que le contenu lui-meme.",
    citation_courte: "The medium is the message.",
    quand_utiliser:
      "Choix des supports de communication, media planning, impact du digital, comparaison print vs digital.",
    phrase_modele:
      "En reprenant la formule de McLuhan, on comprend que le choix d'Instagram comme support n'est pas neutre : il vehicule a lui seul des valeurs de modernite et de proximite.",
    exam: "e5",
    tags: ["medium", "support", "digital", "media", "canal"],
  },
  {
    auteur: "Harold Lasswell",
    idee_centrale:
      "Le modele des 5W : Qui dit Quoi, par Quel canal, a Qui, avec Quel effet ?",
    citation_courte:
      "Who says What in Which channel to Whom with What effect?",
    quand_utiliser:
      "Structurer l'analyse de toute action de communication. Presenter un plan de communication de maniere methodique.",
    phrase_modele:
      "En appliquant le modele de Lasswell a cette campagne : l'annonceur (Qui) adresse un message de reassurance (Quoi) via les reseaux sociaux (Canal) aux millennials (A qui) pour renforcer la fidelite (Effet).",
    exam: "e5",
    tags: ["modele", "5W", "analyse", "methodologie", "plan"],
  },
  {
    auteur: "Claude Shannon",
    idee_centrale:
      "Le modele emetteur-recepteur avec le concept de bruit qui perturbe la transmission du message.",
    citation_courte:
      "L'information est une mesure de la liberte de choix dans la selection d'un message.",
    quand_utiliser:
      "Identifier les freins a la communication, les parasites, le bruit mediatique, la saturation publicitaire.",
    phrase_modele:
      "Le modele de Shannon permet d'identifier le bruit publicitaire comme principal frein a l'efficacite de cette campagne en periode de fetes.",
    exam: "e1",
    tags: ["emetteur", "recepteur", "bruit", "transmission", "modele"],
  },
  {
    auteur: "Jacques Durand",
    idee_centrale:
      "Les figures de rhetorique en publicite : metaphore, metonymie, hyperbole, antithese sont les outils du publicitaire.",
    citation_courte:
      "La rhetorique publicitaire emprunte a la rhetorique classique ses figures de style.",
    quand_utiliser:
      "Analyser les figures de style dans une publicite, un slogan, un visuel. Identifier les procedes creatifs.",
    phrase_modele:
      "En suivant la grille de Durand, cette publicite repose sur une metaphore visuelle qui associe le produit a la nature pour evoquer la purete.",
    exam: "e1",
    tags: ["rhetorique", "figures", "metaphore", "publicite", "creatif"],
  },
  {
    auteur: "Edward T. Hall",
    idee_centrale:
      "La proxemique et la communication interculturelle : la distance physique et les codes culturels impactent la communication.",
    citation_courte:
      "La culture est communication et la communication est culture.",
    quand_utiliser:
      "Communication internationale, adaptation culturelle des campagnes, marketing interculturel, non-verbal.",
    phrase_modele:
      "Comme le souligne Hall, adapter cette campagne au marche japonais necessite de repenser les codes visuels et la proxemique des personnages.",
    exam: "e5",
    tags: [
      "interculturel",
      "proxemique",
      "culture",
      "international",
      "adaptation",
    ],
  },
];

/**
 * Retourne l'auteur du jour base sur le jour de l'annee.
 * Cycle a travers les 12 auteurs de maniere deterministe.
 */
export function getAuteurDuJour(date?: Date): Auteur {
  const d = date || new Date();
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const index = dayOfYear % AUTEURS.length;
  return AUTEURS[index];
}

/**
 * Retourne l'auteur du jour suivant (preview).
 */
export function getAuteurDeDemain(date?: Date): Auteur {
  const d = date || new Date();
  const tomorrow = new Date(d);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return getAuteurDuJour(tomorrow);
}

/**
 * Retourne les auteurs filtres par epreuve.
 */
export function getAuteursByExam(exam: "e1" | "e5" | "e6"): Auteur[] {
  return AUTEURS.filter((a) => a.exam === exam);
}

/**
 * Recherche d'auteurs par tag.
 */
export function getAuteursByTag(tag: string): Auteur[] {
  return AUTEURS.filter((a) =>
    a.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
  );
}
