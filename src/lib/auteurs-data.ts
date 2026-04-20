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
  {
    auteur: "Dominique Wolton",
    idee_centrale:
      "Informer n'est pas communiquer : l'information est un message transmis, la communication suppose une relation et une negociation avec l'autre.",
    citation_courte:
      "Informer, c'est le message. Communiquer, c'est la relation.",
    quand_utiliser:
      "Distinguer information et communication, critiquer l'infobesite, analyser les limites du digital, reflexion sur le dialogue.",
    phrase_modele:
      "Comme le rappelle Wolton, cette campagne ne se contente pas d'informer : elle cherche a creer une relation avec le public en suscitant le dialogue sur les reseaux sociaux.",
    exam: "e1",
    tags: ["information", "communication", "relation", "dialogue", "digital"],
  },
  {
    auteur: "Jurgen Habermas",
    idee_centrale:
      "L'espace public est le lieu ou les citoyens debattent rationnellement des affaires communes. La communication doit viser l'entente, pas la manipulation.",
    citation_courte:
      "L'espace public est le lieu de la discussion rationnelle et critique.",
    quand_utiliser:
      "Analyser le role des medias dans la democratie, critiquer la propagande ou la manipulation publicitaire, reflexion sur les reseaux sociaux comme espace public.",
    phrase_modele:
      "En s'appuyant sur Habermas, on peut questionner la transformation de l'espace public par les reseaux sociaux : le debat rationnel y est-il encore possible face aux algorithmes et a la desinformation ?",
    exam: "e1",
    tags: ["espace-public", "democratie", "debat", "medias", "manipulation"],
  },
  {
    auteur: "Naomi Klein",
    idee_centrale:
      "No Logo : les grandes marques investissent l'espace public et la culture pour vendre non plus des produits mais des modes de vie. Le branding colonise l'identite.",
    citation_courte:
      "Les grandes marques ne vendent plus des produits, elles vendent un mode de vie.",
    quand_utiliser:
      "Critique du branding, de la publicite envahissante, de la mondialisation, du greenwashing, de la surconsommation.",
    phrase_modele:
      "Comme l'analyse Naomi Klein dans No Logo, cette marque ne vend pas un vetement mais une identite : le consommateur achete un mode de vie plus qu'un produit.",
    exam: "e1",
    tags: ["branding", "consommation", "mondialisation", "critique", "marque"],
  },
  {
    auteur: "Guy Debord",
    idee_centrale:
      "La societe du spectacle : les rapports sociaux sont mediatises par des images. Le vecu est remplace par la representation. La publicite participe de cette spectacularisation du reel.",
    citation_courte:
      "Tout ce qui etait directement vecu s'est eloigne dans une representation.",
    quand_utiliser:
      "Critiquer la mise en scene publicitaire, l'image de marque, les reseaux sociaux comme spectacle, la societe de l'image.",
    phrase_modele:
      "Debord dirait que cette campagne Instagram illustre la societe du spectacle : l'experience reelle du produit est remplacee par sa mise en scene visuelle.",
    exam: "e1",
    tags: ["spectacle", "image", "representation", "critique", "medias"],
  },
  {
    auteur: "Erving Goffman",
    idee_centrale:
      "La mise en scene de la vie quotidienne : chaque individu est un acteur qui gere son image (face) dans les interactions sociales. La communication est un theatre.",
    citation_courte:
      "La vie sociale est un theatre ou chacun joue un role.",
    quand_utiliser:
      "Analyser le personal branding, la communication sur les reseaux sociaux, l'image de marque, la gestion de l'e-reputation, la communication de crise.",
    phrase_modele:
      "Selon Goffman, le community manager met en scene la 'face' de la marque sur les reseaux sociaux, gerant l'impression donnee au public comme un acteur sur scene.",
    exam: "e5",
    tags: ["theatre", "face", "interaction", "image", "personal-branding"],
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
