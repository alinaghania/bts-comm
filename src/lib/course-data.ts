// BTS Communication - Course Data
// All content for E1, E5, E6 exams

export interface Module {
  id: string;
  title: string;
  exam: "e1" | "e5" | "e6";
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
  didYouKnow?: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
}

export const modules: Module[] = [
  // =========================================
  // E1 - CULTURES DE LA COMMUNICATION
  // =========================================
  {
    id: "theories-communication",
    title: "Theories de la communication",
    exam: "e1",
    chapters: [
      {
        id: "shannon-weaver",
        title: "Le modele de Shannon et Weaver (1949)",
        content: `Le modele de Shannon et Weaver est le premier modele mathematique de la communication. Il a ete concu dans le cadre des telecommunications (Bell Labs).

Schema lineaire : Source -> Emetteur -> Canal -> Recepteur -> Destinataire

Le message est code par l'emetteur, transmis via un canal, puis decode par le recepteur. La notion centrale est celle de BRUIT : toute perturbation qui altere le message pendant la transmission.

Types de bruit : technique (mauvaise connexion), semantique (mauvaise comprehension), organisationnel (hierarchie qui filtre).

Limites : modele lineaire et unidirectionnel. Le recepteur est passif. Pas de feedback. Ne prend pas en compte le contexte social.`,
        keyPoints: [
          "Premier modele mathematique de la communication (1949)",
          "Schema lineaire : source -> emetteur -> canal -> recepteur -> destinataire",
          "Introduction de la notion de BRUIT (perturbation du signal)",
          "Limite majeure : pas de feedback, recepteur passif",
        ],
        didYouKnow: "Shannon travaillait chez Bell Labs (telephone) ! Son modele n'etait pas fait pour la communication humaine mais pour optimiser les lignes telephoniques. Il a ete adapte ensuite aux sciences humaines.",
        flashcards: [
          { id: "f-sh1", front: "Quel est le schema du modele de Shannon et Weaver ?", back: "Source -> Emetteur -> Canal -> Recepteur -> Destinataire. C'est un schema LINEAIRE et unidirectionnel.", difficulty: "easy", tags: ["shannon", "modele"] },
          { id: "f-sh2", front: "Que represente le 'bruit' dans le modele de Shannon ?", back: "Toute perturbation qui altere le message pendant la transmission. Il peut etre technique (mauvaise connexion), semantique (incomprehension) ou organisationnel.", difficulty: "medium", tags: ["shannon", "bruit"] },
          { id: "f-sh3", front: "Quelle est la principale limite du modele de Shannon et Weaver ?", back: "C'est un modele lineaire : le recepteur est PASSIF, il n'y a pas de feedback (retour). Il ne prend pas en compte le contexte social de la communication.", difficulty: "medium", tags: ["shannon", "limites"] },
          { id: "f-sh4", front: "Dans quel contexte professionnel le modele de Shannon a-t-il ete cree ?", back: "Chez Bell Labs (compagnie de telephone) en 1949. Il etait destine a optimiser la transmission du signal telephonique, pas la communication humaine.", difficulty: "hard", tags: ["shannon", "histoire"] },
        ],
        quiz: [
          { id: "q-sh1", question: "Le modele de Shannon et Weaver est...", options: ["Circulaire avec feedback", "Lineaire et unidirectionnel", "Interactif et systemique", "Base sur les fonctions du langage"], correctIndex: 1, explanation: "Le modele de Shannon est LINEAIRE : le message va dans un seul sens, de l'emetteur au recepteur, sans retour (feedback). C'est sa limite principale.", difficulty: "easy", tags: ["shannon"] },
          { id: "q-sh2", question: "La notion de 'bruit' dans le modele de Shannon designe :", options: ["Le volume sonore du message", "La reaction du recepteur", "Toute perturbation qui altere le message", "Le contexte social"], correctIndex: 2, explanation: "Le bruit = toute perturbation du signal. Exemple : un gresllement telephonique (bruit technique), un terme mal compris (bruit semantique), une hierarchie qui deforme le message (bruit organisationnel).", difficulty: "easy", tags: ["shannon", "bruit"] },
          { id: "q-sh3", question: "Le modele de Shannon a ete cree pour :", options: ["Analyser la publicite", "Optimiser les telecommunications", "Etudier la propagande", "Comprendre la presse ecrite"], correctIndex: 1, explanation: "Shannon travaillait chez Bell Labs (telephone). Son modele mathematique visait a optimiser la transmission du signal telephonique. Il a ete transpose aux sciences humaines par la suite.", difficulty: "medium", tags: ["shannon", "histoire"] },
        ],
      },
      {
        id: "lasswell",
        title: "Le modele de Lasswell (1948)",
        content: `Harold Lasswell propose en 1948 un modele base sur 5 questions (les 5W) :

- QUI ? (Who) -> l'emetteur, la source du message
- DIT QUOI ? (What) -> le contenu du message
- PAR QUEL CANAL ? (Which channel) -> le medium utilise
- A QUI ? (To whom) -> le recepteur, l'audience
- AVEC QUEL EFFET ? (With what effect) -> l'impact du message

Ce modele depasse Shannon car il s'interesse a la FINALITE de la communication (l'effet produit). Il est particulierement utile pour analyser la communication de masse et la propagande.

Limites : toujours lineaire, pas de feedback. Presuppose que la communication a toujours un effet intentionnel. Ne prend pas en compte le contexte.`,
        keyPoints: [
          "5 questions : Qui ? Dit quoi ? Par quel canal ? A qui ? Avec quel effet ?",
          "Depasse Shannon : s'interesse a la finalite (l'effet du message)",
          "Utile pour analyser la communication de masse",
          "Limite : toujours lineaire, pas de feedback",
        ],
        didYouKnow: "Lasswell etait un specialiste de la propagande pendant la Seconde Guerre mondiale. Son modele a ete concu pour analyser l'efficacite de la propagande de guerre !",
        flashcards: [
          { id: "f-la1", front: "Quelles sont les 5 questions du modele de Lasswell ?", back: "QUI dit QUOI, par QUEL CANAL, A QUI, avec QUEL EFFET ? (Who says What, in Which channel, to Whom, with What effect)", difficulty: "easy", tags: ["lasswell", "5W"] },
          { id: "f-la2", front: "Quel est l'apport principal de Lasswell par rapport a Shannon ?", back: "Lasswell ajoute la notion d'EFFET : il s'interesse a la finalite de la communication, pas seulement a la transmission du signal.", difficulty: "medium", tags: ["lasswell", "comparaison"] },
          { id: "f-la3", front: "Pour analyser quel type de communication le modele de Lasswell est-il particulierement adapte ?", back: "La communication de MASSE et la propagande. Lasswell etait un specialiste de la propagande de guerre.", difficulty: "medium", tags: ["lasswell", "application"] },
        ],
        quiz: [
          { id: "q-la1", question: "Quelle question le modele de Lasswell ajoute-t-il par rapport a Shannon ?", options: ["Comment ?", "Pourquoi ?", "Avec quel effet ?", "Dans quel contexte ?"], correctIndex: 2, explanation: "Lasswell ajoute 'With what effect ?' (Avec quel effet ?). C'est LA nouveaute : il s'interesse a l'IMPACT du message sur le recepteur, pas seulement a sa transmission.", difficulty: "easy", tags: ["lasswell"] },
          { id: "q-la2", question: "Le modele de Lasswell est particulierement utile pour analyser :", options: ["La communication interpersonnelle", "La communication de masse", "La communication non-verbale", "La communication interne"], correctIndex: 1, explanation: "Lasswell etait specialiste de la propagande. Son modele est adapte a la communication de MASSE car il analyse l'effet du message sur une audience.", difficulty: "medium", tags: ["lasswell"] },
        ],
      },
      {
        id: "jakobson",
        title: "Les 6 fonctions du langage de Jakobson (1963)",
        content: `Roman Jakobson definit 6 fonctions du langage, chacune liee a un element de la communication :

1. REFERENTIELLE (contexte) : informer, decrire objectivement. "Il fait 25 degres."
2. EMOTIVE/EXPRESSIVE (emetteur) : exprimer les sentiments. "Comme je suis heureux !"
3. CONATIVE (recepteur) : agir sur le destinataire. "Achetez maintenant !" (imperatif)
4. PHATIQUE (canal) : etablir/maintenir le contact. "Allo ? Tu m'entends ?"
5. METALINGUISTIQUE (code) : parler du langage. "Que signifie 'paradigme' ?"
6. POETIQUE (message) : attirer l'attention sur la forme. Jeux de mots, rimes, slogans.

En publicite : la fonction CONATIVE domine (pousser a l'achat), la POETIQUE rend le slogan memorable, l'EMOTIVE cree une connexion.`,
        keyPoints: [
          "6 fonctions : referentielle, emotive, conative, phatique, metalinguistique, poetique",
          "Chaque fonction est liee a un element de la communication",
          "En pub : conative (achat) + poetique (slogan) + emotive (connexion)",
          "La fonction phatique = maintenir le contact (Allo ? Tu m'ecoutes ?)",
        ],
        didYouKnow: "Le slogan 'Just Do It' de Nike utilise 3 fonctions de Jakobson en 3 mots : conative (incitation a agir), poetique (rythme percutant) et emotive (motivation personnelle) !",
        flashcards: [
          { id: "f-ja1", front: "Quelles sont les 6 fonctions du langage selon Jakobson ?", back: "1. Referentielle (contexte) 2. Emotive (emetteur) 3. Conative (recepteur) 4. Phatique (canal) 5. Metalinguistique (code) 6. Poetique (message)", difficulty: "easy", tags: ["jakobson", "fonctions"] },
          { id: "f-ja2", front: "La fonction PHATIQUE sert a...", back: "Etablir, maintenir ou interrompre le CONTACT. Exemples : 'Allo ?', 'Tu m'ecoutes ?', 'Hein ?'. Elle est liee au CANAL de communication.", difficulty: "medium", tags: ["jakobson", "phatique"] },
          { id: "f-ja3", front: "Quelle fonction de Jakobson domine en publicite et pourquoi ?", back: "La fonction CONATIVE (centree sur le recepteur) car la pub vise a faire AGIR le consommateur. Elle s'accompagne de la fonction POETIQUE (forme memorable du slogan) et EMOTIVE (connexion emotionnelle).", difficulty: "hard", tags: ["jakobson", "publicite"] },
          { id: "f-ja4", front: "La fonction METALINGUISTIQUE concerne...", back: "Le fait de parler du LANGAGE lui-meme. Exemple : 'Que veut dire ce mot ?', 'Au sens propre du terme...'. Elle est centree sur le CODE.", difficulty: "medium", tags: ["jakobson", "metalinguistique"] },
          { id: "f-ja5", front: "Analysez 'Just Do It' avec les fonctions de Jakobson", back: "Conative (imperatif 'Do It' = incitation a agir), Poetique (3 mots percutants, rythme), Emotive (motivation personnelle, depassement de soi). 3 fonctions en 3 mots !", difficulty: "hard", tags: ["jakobson", "analyse"] },
        ],
        quiz: [
          { id: "q-ja1", question: "La fonction PHATIQUE selon Jakobson sert a :", options: ["Informer objectivement", "Exprimer ses emotions", "Maintenir le contact", "Expliquer un mot"], correctIndex: 2, explanation: "Phatique = maintenir le CONTACT. 'Allo ?', 'Tu m'ecoutes ?'. Elle est liee au CANAL. C'est different de la fonction conative (agir sur l'autre) ou metalinguistique (expliquer le langage).", difficulty: "easy", tags: ["jakobson"] },
          { id: "q-ja2", question: "Le slogan publicitaire releve principalement de la fonction :", options: ["Referentielle", "Poetique", "Phatique", "Metalinguistique"], correctIndex: 1, explanation: "Le slogan attire l'attention sur la FORME du message (rimes, jeux de mots, rythme) = fonction POETIQUE. Mais il combine souvent conative (inciter a acheter) et emotive (creer une connexion).", difficulty: "medium", tags: ["jakobson", "pub"] },
          { id: "q-ja3", question: "'Que signifie le mot paradigme ?' releve de la fonction :", options: ["Referentielle", "Emotive", "Metalinguistique", "Conative"], correctIndex: 2, explanation: "Metalinguistique = parler DU langage. On utilise le langage pour definir/expliquer un mot du langage. C'est different de la fonction referentielle qui decrit le monde exterieur.", difficulty: "medium", tags: ["jakobson"] },
          { id: "q-ja4", question: "Combien de fonctions du langage Jakobson identifie-t-il ?", options: ["4", "5", "6", "7"], correctIndex: 2, explanation: "Jakobson identifie 6 fonctions, chacune liee a un element : referentielle (contexte), emotive (emetteur), conative (recepteur), phatique (canal), metalinguistique (code), poetique (message).", difficulty: "easy", tags: ["jakobson"] },
        ],
      },
      {
        id: "palo-alto",
        title: "L'Ecole de Palo Alto",
        content: `L'Ecole de Palo Alto (Californie, annees 1950-60) regroupe des chercheurs comme Watzlawick, Bateson, Hall et Goffman. Leur approche est SYSTEMIQUE et INTERACTIONNISTE.

Axiome fondamental : "ON NE PEUT PAS NE PAS COMMUNIQUER" (Watzlawick). Meme le silence, l'immobilite sont des formes de communication.

Principes cles :
- Communication = activite sociale permanente (pas juste transmission d'info)
- Toute communication a un CONTENU et une RELATION (metacommunication)
- La communication non-verbale est centrale : kinesique (gestes, postures) et proxemique (gestion de l'espace)
- Approche systemique : on ne peut pas isoler un element de la communication, tout est interconnecte

Apport majeur : depasse les modeles lineaires (Shannon, Lasswell) en montrant que la communication est un SYSTEME interactif ou chaque acteur influence l'autre.`,
        keyPoints: [
          "'On ne peut pas ne pas communiquer' (Watzlawick)",
          "Approche systemique et interactionniste",
          "Toute communication a un contenu ET une relation",
          "Importance du non-verbal : kinesique (gestes) et proxemique (espace)",
        ],
        didYouKnow: "Palo Alto est une ville de Californie pres de Stanford. Le Mental Research Institute y a ete fonde en 1959. C'est aussi la ou Steve Jobs a grandi et ou se trouve le siege de nombreuses entreprises tech !",
        flashcards: [
          { id: "f-pa1", front: "Quel est l'axiome fondamental de l'Ecole de Palo Alto ?", back: "'ON NE PEUT PAS NE PAS COMMUNIQUER' (Watzlawick). Meme le silence est une forme de communication. Tout comportement est communication.", difficulty: "easy", tags: ["palo-alto", "axiome"] },
          { id: "f-pa2", front: "Qu'est-ce que la proxemique ?", back: "La gestion de l'ESPACE dans la communication (Edward T. Hall). 4 zones : intime (0-45cm), personnelle (45cm-1m20), sociale (1m20-3m60), publique (>3m60).", difficulty: "medium", tags: ["palo-alto", "proxemique"] },
          { id: "f-pa3", front: "Qu'est-ce que la kinesique ?", back: "L'etude de la communication par les GESTES, les postures et les mouvements du corps. Fait partie de la communication non-verbale etudiee par l'Ecole de Palo Alto.", difficulty: "medium", tags: ["palo-alto", "kinesique"] },
          { id: "f-pa4", front: "En quoi l'approche de Palo Alto differe-t-elle de Shannon ?", back: "Palo Alto a une approche SYSTEMIQUE et INTERACTIONNISTE : la communication est un processus circulaire ou chaque acteur influence l'autre. Shannon est LINEAIRE (emetteur -> recepteur passif).", difficulty: "hard", tags: ["palo-alto", "comparaison"] },
        ],
        quiz: [
          { id: "q-pa1", question: "Qui a enonce 'On ne peut pas ne pas communiquer' ?", options: ["Jakobson", "Shannon", "Watzlawick", "Barthes"], correctIndex: 2, explanation: "C'est Paul WATZLAWICK, de l'Ecole de Palo Alto. Cet axiome signifie que tout comportement (y compris le silence) est une forme de communication.", difficulty: "easy", tags: ["palo-alto"] },
          { id: "q-pa2", question: "L'approche de l'Ecole de Palo Alto est :", options: ["Lineaire", "Mathematique", "Systemique et interactionniste", "Semiologique"], correctIndex: 2, explanation: "Palo Alto propose une approche SYSTEMIQUE (tout est interconnecte) et INTERACTIONNISTE (les acteurs s'influencent mutuellement). C'est le contraire des modeles lineaires de Shannon et Lasswell.", difficulty: "easy", tags: ["palo-alto"] },
          { id: "q-pa3", question: "La proxemique designe :", options: ["L'etude des gestes", "La gestion de l'espace dans la communication", "L'analyse du langage", "L'etude des medias"], correctIndex: 1, explanation: "Proxemique = gestion de l'ESPACE (Edward T. Hall). La kinesique = etude des GESTES. Les deux font partie de la communication non-verbale.", difficulty: "medium", tags: ["palo-alto", "proxemique"] },
        ],
      },
    ],
  },
  {
    id: "semiologie",
    title: "Semiologie",
    exam: "e1",
    chapters: [
      {
        id: "saussure",
        title: "Ferdinand de Saussure - Le signe linguistique",
        content: `Saussure (1857-1913) est le fondateur de la semiologie (ou semiotique), la science qui etudie les SIGNES.

Le signe linguistique se compose de 2 faces indissociables :
- SIGNIFIANT : la forme materielle (son, image, mot ecrit)
- SIGNIFIE : le concept, l'idee associee

Exemple : le mot "arbre" (signifiant) evoque le concept d'arbre (signifie).

Leur lien est ARBITRAIRE : rien ne justifie que le son "arbre" designe un arbre. La preuve : en anglais c'est "tree", en espagnol "arbol".

Autres concepts de Saussure :
- Langue (systeme collectif) vs Parole (usage individuel)
- Syntagme (combinaison horizontale) vs Paradigme (choix vertical)`,
        keyPoints: [
          "Signe = Signifiant (forme) + Signifie (concept)",
          "Le lien signifiant/signifie est ARBITRAIRE",
          "Langue (systeme) vs Parole (usage individuel)",
          "Syntagme (combinaison) vs Paradigme (choix)",
        ],
        didYouKnow: "Le Cours de linguistique generale de Saussure a ete publie en 1916, 3 ans apres sa mort, par ses etudiants qui avaient pris des notes pendant ses cours ! Il n'a jamais ecrit le livre lui-meme.",
        flashcards: [
          { id: "f-sa1", front: "Quelles sont les 2 faces du signe linguistique selon Saussure ?", back: "SIGNIFIANT (forme materielle : son, image, ecriture) + SIGNIFIE (concept, idee). Les deux sont indissociables, comme les deux faces d'une feuille de papier.", difficulty: "easy", tags: ["saussure", "signe"] },
          { id: "f-sa2", front: "Pourquoi dit-on que le signe linguistique est ARBITRAIRE ?", back: "Rien ne justifie le lien entre le signifiant et le signifie. 'Arbre' se dit 'tree' en anglais, 'arbol' en espagnol : le son choisi est une convention sociale, pas un lien naturel.", difficulty: "medium", tags: ["saussure", "arbitraire"] },
          { id: "f-sa3", front: "Quelle difference entre syntagme et paradigme chez Saussure ?", back: "Syntagme = combinaison HORIZONTALE (ordre des mots dans la phrase). Paradigme = choix VERTICAL (ensemble des mots substituables a une meme place).", difficulty: "hard", tags: ["saussure", "syntagme"] },
        ],
        quiz: [
          { id: "q-sa1", question: "Le signifiant designe :", options: ["Le concept, l'idee", "La forme materielle du signe", "Le contexte de communication", "L'intention de l'emetteur"], correctIndex: 1, explanation: "Signifiant = FORME materielle (son, image, mot ecrit). Signifie = CONCEPT, idee. Exemple : le mot ecrit 'chat' est le signifiant, l'idee du chat est le signifie.", difficulty: "easy", tags: ["saussure"] },
          { id: "q-sa2", question: "Le lien entre signifiant et signifie est :", options: ["Naturel et universel", "Motive par la ressemblance", "Arbitraire et conventionnel", "Logique et rationnel"], correctIndex: 2, explanation: "Le lien est ARBITRAIRE : il n'y a aucune raison naturelle pour que le son 'arbre' designe un arbre. C'est une CONVENTION sociale (la preuve : 'tree' en anglais).", difficulty: "medium", tags: ["saussure"] },
        ],
      },
      {
        id: "barthes",
        title: "Roland Barthes - Rhetorique de l'image",
        content: `Dans 'Rhetorique de l'image' (1964), Barthes analyse une publicite Panzani et identifie 3 niveaux de message dans l'image publicitaire :

1. MESSAGE LINGUISTIQUE : le texte (marque, slogan, legende)
2. MESSAGE ICONIQUE CODE (CONNOTE) : les significations culturelles et symboliques. Ce que l'image SUGGERE (italianite, fraicheur, abondance...)
3. MESSAGE ICONIQUE NON-CODE (DENOTE) : la description litterale de ce qu'on voit (des pates, des tomates, un filet)

La DENOTATION = ce que l'image MONTRE objectivement
La CONNOTATION = ce que l'image SUGGERE culturellement

L'image publicitaire est toujours INTENTIONNELLE : chaque element est choisi pour communiquer un message precis. Barthes dit qu'elle est "emphatique" (elle exagere ses significations).`,
        keyPoints: [
          "3 messages : linguistique, iconique code (connote), iconique non-code (denote)",
          "Denotation = description objective / Connotation = interpretation culturelle",
          "L'image publicitaire est toujours INTENTIONNELLE",
          "Analyse fondatrice : la pub Panzani (1964)",
        ],
        didYouKnow: "Barthes a choisi la pub Panzani car elle etait 'emphatique' : les couleurs vert-blanc-rouge (drapeau italien), le filet de course (fraicheur du marche), les legumes frais a cote des pates... Tout etait code pour evoquer l'Italie !",
        flashcards: [
          { id: "f-ba1", front: "Quels sont les 3 niveaux de message dans l'image publicitaire selon Barthes ?", back: "1. Message LINGUISTIQUE (texte) 2. Message iconique CODE/CONNOTE (significations culturelles) 3. Message iconique NON-CODE/DENOTE (description litterale)", difficulty: "easy", tags: ["barthes", "image"] },
          { id: "f-ba2", front: "Quelle difference entre denotation et connotation ?", back: "DENOTATION = ce que l'image MONTRE objectivement (description litterale). CONNOTATION = ce que l'image SUGGERE culturellement (significations symboliques, valeurs).", difficulty: "medium", tags: ["barthes", "denotation"] },
          { id: "f-ba3", front: "Pourquoi Barthes dit-il que l'image publicitaire est 'emphatique' ?", back: "Parce qu'elle EXAGERE ses significations : chaque element est intentionnellement choisi pour communiquer un message precis. Rien n'est laisse au hasard dans une pub.", difficulty: "hard", tags: ["barthes", "emphatique"] },
          { id: "f-ba4", front: "Quelle publicite Barthes analyse-t-il dans 'Rhetorique de l'image' ?", back: "La publicite PANZANI (pates). Il y identifie l'italianite (couleurs vert-blanc-rouge), la fraicheur (legumes, filet de marche), l'abondance (composition debordante).", difficulty: "medium", tags: ["barthes", "panzani"] },
        ],
        quiz: [
          { id: "q-ba1", question: "Roland Barthes identifie dans l'image publicitaire :", options: ["2 niveaux de lecture", "3 niveaux de lecture", "4 niveaux de lecture", "5 niveaux de lecture"], correctIndex: 1, explanation: "3 messages : linguistique (texte), iconique code/connote (significations culturelles), iconique non-code/denote (description objective). C'est la base de l'analyse semiologique de l'image.", difficulty: "easy", tags: ["barthes"] },
          { id: "q-ba2", question: "La CONNOTATION en semiologie designe :", options: ["La description objective de l'image", "Les significations culturelles et symboliques", "Le texte accompagnant l'image", "La couleur dominante"], correctIndex: 1, explanation: "Connotation = significations CULTURELLES et symboliques. C'est ce que l'image SUGGERE au-dela de ce qu'elle montre. La denotation, elle, est la description OBJECTIVE.", difficulty: "medium", tags: ["barthes"] },
        ],
      },
      {
        id: "peirce",
        title: "Charles S. Peirce - Trichotomie du signe",
        content: `Peirce classe les signes en 3 categories selon leur rapport au referent (ce qu'ils representent) :

1. ICONE : ressemblance avec le referent. Exemple : une photo, un portrait, un plan de metro, un pictogramme.
2. INDICE : lien causal/naturel avec le referent. Exemple : la fumee (indice du feu), des empreintes (indice d'un passage), la fievre (indice de maladie).
3. SYMBOLE : lien conventionnel/arbitraire avec le referent. Exemple : le drapeau (symbole du pays), la colombe (symbole de paix), les mots du langage.

En publicite :
- Icones : photos du produit, images realistes
- Indices : gouttes d'eau (fraicheur), sourire (satisfaction)
- Symboles : logo de la marque, couleurs codees (vert = nature, rouge = passion)`,
        keyPoints: [
          "Icone = ressemblance (photo, pictogramme)",
          "Indice = lien causal (fumee = feu)",
          "Symbole = convention arbitraire (drapeau, colombe)",
          "En pub : photos (icones), gouttes d'eau (indices), logos (symboles)",
        ],
        flashcards: [
          { id: "f-pe1", front: "Quels sont les 3 types de signes selon Peirce ?", back: "ICONE (ressemblance), INDICE (lien causal/naturel), SYMBOLE (convention arbitraire). Exemple : photo = icone, fumee = indice du feu, drapeau = symbole du pays.", difficulty: "easy", tags: ["peirce", "signes"] },
          { id: "f-pe2", front: "Un logo de marque est-il une icone, un indice ou un symbole ?", back: "Un SYMBOLE : le lien entre le logo et la marque est conventionnel et arbitraire (il faut l'apprendre). Sauf si le logo ressemble au produit (alors c'est aussi une icone).", difficulty: "hard", tags: ["peirce", "application"] },
          { id: "f-pe3", front: "La fumee est un exemple de quel type de signe chez Peirce ?", back: "Un INDICE : il y a un lien CAUSAL entre la fumee et le feu. La fumee n'est pas une convention ni une ressemblance, c'est une CONSEQUENCE naturelle du feu.", difficulty: "medium", tags: ["peirce", "indice"] },
        ],
        quiz: [
          { id: "q-pe1", question: "Selon Peirce, une photo est un :", options: ["Symbole", "Indice", "Icone", "Signe arbitraire"], correctIndex: 2, explanation: "Une photo est une ICONE car elle RESSEMBLE a ce qu'elle represente. L'icone se definit par la ressemblance avec le referent.", difficulty: "easy", tags: ["peirce"] },
          { id: "q-pe2", question: "Le drapeau d'un pays est un :", options: ["Icone", "Indice", "Symbole", "Icone et indice"], correctIndex: 2, explanation: "Le drapeau est un SYMBOLE : le lien entre le tissu colore et le pays est CONVENTIONNEL. Il faut apprendre que le bleu-blanc-rouge = France. Ce n'est ni une ressemblance ni un lien causal.", difficulty: "easy", tags: ["peirce"] },
        ],
      },
    ],
  },
  {
    id: "rhetorique",
    title: "Rhetorique & figures de style",
    exam: "e1",
    chapters: [
      {
        id: "figures-style",
        title: "Les figures de style en publicite",
        content: `Les figures de style sont des procedes linguistiques ou visuels utilises en publicite pour capter l'attention, surprendre et persuader.

FIGURES D'ANALOGIE :
- METAPHORE : comparaison implicite. "Red Bull te donne des ailes" (l'energie = des ailes)
- COMPARAISON : comparaison explicite (avec "comme"). "Doux comme une caresse"
- PERSONNIFICATION : attribuer des qualites humaines a un objet. "Votre voiture vous sourit"

FIGURES D'OPPOSITION :
- ANTITHESE : opposition de 2 idees. "Petit prix, grand plaisir"
- OXYMORE : alliance de contraires. "Un silence assourdissant"

FIGURES D'AMPLIFICATION :
- HYPERBOLE : exageration. "Le meilleur cafe du monde"
- GRADATION : progression croissante. "Fort, plus fort, le plus fort"
- ACCUMULATION : enumeration. "Fraicheur, saveur, douceur, bonheur"

FIGURES DE SUBSTITUTION :
- METONYMIE : remplacer par un element associe. "Boire un verre" (le contenant pour le contenu)
- SYNECDOQUE : la partie pour le tout. "Les voiles au loin" (les voiles pour les bateaux)

FIGURES DE CONSTRUCTION :
- ANAPHORE : repetition en debut de phrase. "Parce que vous le valez bien"
- CHIASME : structure en miroir AB-BA. "Bonheur de vivre, vivre de bonheur"`,
        keyPoints: [
          "Analogie : metaphore, comparaison, personnification",
          "Opposition : antithese, oxymore",
          "Amplification : hyperbole, gradation, accumulation",
          "Substitution : metonymie, synecdoque",
          "Construction : anaphore, chiasme",
        ],
        didYouKnow: "Jacques Durand a montre que la publicite ADORE les figures de rhetorique car elles procurent du PLAISIR par la transgression. La pub nous fait accepter des absurdites (un taureau avec des ailes, une voiture qui vole) qu'on refuserait dans la vie reelle !",
        flashcards: [
          { id: "f-rh1", front: "Qu'est-ce qu'une METAPHORE ? Donnez un exemple publicitaire.", back: "Comparaison IMPLICITE (sans 'comme'). Exemple : 'Red Bull te donne des ailes' = l'energie est comparee implicitement a des ailes.", difficulty: "easy", tags: ["rhetorique", "metaphore"] },
          { id: "f-rh2", front: "Qu'est-ce qu'un OXYMORE ? Exemple ?", back: "Alliance de 2 termes CONTRAIRES dans une meme expression. Exemple : 'un silence assourdissant', 'une douce violence'. En pub : 'Un luxe accessible'.", difficulty: "medium", tags: ["rhetorique", "oxymore"] },
          { id: "f-rh3", front: "Quelle difference entre metonymie et synecdoque ?", back: "METONYMIE : remplacement par un element ASSOCIE (cause/effet, contenant/contenu). 'Boire un verre'. SYNECDOQUE : la PARTIE pour le tout. 'Les voiles au loin' (voiles = bateaux entiers).", difficulty: "hard", tags: ["rhetorique", "metonymie"] },
          { id: "f-rh4", front: "Qu'est-ce qu'une ANAPHORE ? Exemple pub ?", back: "Repetition d'un mot/groupe de mots en DEBUT de phrase/vers. Exemple : 'Parce que vous le valez bien' (L'Oreal) - le 'parce que' cree un rythme et martele le message.", difficulty: "medium", tags: ["rhetorique", "anaphore"] },
          { id: "f-rh5", front: "Qu'est-ce que l'HYPERBOLE ? Pourquoi la pub l'adore ?", back: "EXAGERATION pour frapper l'esprit. 'Le meilleur cafe du monde', 'Des kilometres de douceur'. La pub l'adore car elle dramatise les benefices du produit.", difficulty: "easy", tags: ["rhetorique", "hyperbole"] },
        ],
        quiz: [
          { id: "q-rh1", question: "'Red Bull te donne des ailes' est :", options: ["Une comparaison", "Une metaphore", "Une hyperbole", "Une metonymie"], correctIndex: 1, explanation: "C'est une METAPHORE : comparaison IMPLICITE (pas de 'comme'). L'energie est assimilee a des ailes. Si c'etait 'L'energie, c'est comme des ailes', ce serait une comparaison.", difficulty: "easy", tags: ["rhetorique"] },
          { id: "q-rh2", question: "'Petit prix, grand plaisir' est :", options: ["Un oxymore", "Une antithese", "Un chiasme", "Une anaphore"], correctIndex: 1, explanation: "C'est une ANTITHESE : opposition de 2 idees (petit vs grand). Un oxymore serait 'un grand petit prix' (contradiction dans la meme expression). Le chiasme serait 'Petit prix, plaisir grand'.", difficulty: "medium", tags: ["rhetorique"] },
          { id: "q-rh3", question: "'Boire un verre' est un exemple de :", options: ["Metaphore", "Synecdoque", "Metonymie", "Comparaison"], correctIndex: 2, explanation: "METONYMIE : on remplace le contenu (la boisson) par le contenant (le verre). C'est un lien d'association. La synecdoque serait la PARTIE pour le tout.", difficulty: "hard", tags: ["rhetorique"] },
          { id: "q-rh4", question: "L'accumulation est une figure de :", options: ["Analogie", "Opposition", "Amplification", "Substitution"], correctIndex: 2, explanation: "L'accumulation (enumeration d'elements) est une figure d'AMPLIFICATION, comme l'hyperbole et la gradation. Elle sert a renforcer l'effet du message.", difficulty: "medium", tags: ["rhetorique"] },
        ],
      },
    ],
  },
  {
    id: "argumentation",
    title: "Argumentation & persuasion",
    exam: "e1",
    chapters: [
      {
        id: "convaincre-persuader",
        title: "Convaincre vs persuader",
        content: `CONVAINCRE = s'adresser a la RAISON. Utiliser des arguments logiques, des faits, des statistiques, des demonstrations. L'objectif est de faire adherer par la reflexion.

PERSUADER = s'adresser aux EMOTIONS. Utiliser des sentiments, des images, des recits, des valeurs. L'objectif est d'obtenir l'adhesion par le plaisir ou l'emotion.

Les 3 moyens de persuasion d'Aristote :
- ETHOS : la credibilite de l'orateur (son autorite, son expertise, sa reputation)
- PATHOS : l'emotion suscitee chez l'auditoire (peur, joie, empathie, colere)
- LOGOS : la logique du discours (raisonnement, preuves, statistiques)

En publicite : on combine les 3. L'ethos (une star credible porte le produit), le pathos (histoire emouvante) et le logos (resultats prouves cliniquement).`,
        keyPoints: [
          "Convaincre = raison / Persuader = emotions",
          "Aristote : Ethos (credibilite), Pathos (emotion), Logos (logique)",
          "La pub combine les 3 pour maximiser l'impact",
        ],
        flashcards: [
          { id: "f-ar1", front: "Quelle difference entre convaincre et persuader ?", back: "CONVAINCRE = raison, logique, faits, demonstrations. PERSUADER = emotions, sentiments, images, recits. En pub, on combine les deux.", difficulty: "easy", tags: ["argumentation"] },
          { id: "f-ar2", front: "Quels sont les 3 moyens de persuasion d'Aristote ?", back: "ETHOS (credibilite de l'orateur), PATHOS (emotion du public), LOGOS (logique du discours). En pub : star credible (ethos), histoire emouvante (pathos), chiffres (logos).", difficulty: "medium", tags: ["argumentation", "aristote"] },
          { id: "f-ar3", front: "L'ETHOS selon Aristote, c'est...", back: "La CREDIBILITE de l'orateur : son autorite, son expertise, sa reputation morale. En pub : utiliser un medecin pour promouvoir un medicament, une star pour un parfum.", difficulty: "medium", tags: ["argumentation", "ethos"] },
        ],
        quiz: [
          { id: "q-ar1", question: "L'ETHOS chez Aristote correspond a :", options: ["L'emotion du public", "La logique du discours", "La credibilite de l'orateur", "Le contexte social"], correctIndex: 2, explanation: "Ethos = CREDIBILITE de l'orateur. Pathos = EMOTION du public. Logos = LOGIQUE du discours. Les 3 sont complementaires pour persuader.", difficulty: "easy", tags: ["argumentation"] },
          { id: "q-ar2", question: "Un temoignage client emouvant dans une pub releve du :", options: ["Logos", "Ethos", "Pathos", "Kairos"], correctIndex: 2, explanation: "PATHOS = susciter l'EMOTION. Un temoignage emouvant joue sur l'empathie du public. Si c'etait des statistiques de satisfaction, ce serait du logos.", difficulty: "medium", tags: ["argumentation"] },
        ],
      },
    ],
  },
  // =========================================
  // E5 - CONTRIBUTION A L'ELABORATION ET AU PILOTAGE DE LA STRATEGIE DE COMMUNICATION
  // =========================================
  {
    id: "veille-operationnelle",
    title: "Veille operationnelle & strategique",
    exam: "e5",
    chapters: [
      {
        id: "types-veille",
        title: "Les types de veille",
        content: `La veille est une demarche organisee et continue de surveillance de l'environnement pour anticiper les evolutions et prendre de meilleures decisions.

Types de veille :
- VEILLE STRATEGIQUE : surveillance globale de l'environnement (anticiper menaces et opportunites)
- VEILLE CONCURRENTIELLE : surveiller les concurrents (offres, prix, campagnes, positionnement)
- VEILLE COMMERCIALE : suivre les marches, les comportements consommateurs, les tendances d'achat
- VEILLE TECHNOLOGIQUE : innovations, nouveaux outils, evolutions numeriques
- VEILLE CREATIVE : tendances graphiques, nouvelles formes de communication, benchmarks creatifs
- VEILLE JURIDIQUE : evolutions legales (RGPD, droit a l'image, pub reglementee)

Outils de veille : alertes Google, flux RSS, curation (Feedly, Scoop.it), reseaux sociaux, newsletters specialisees, benchmark concurrentiel.`,
        keyPoints: [
          "Veille = surveillance organisee et continue de l'environnement",
          "6 types : strategique, concurrentielle, commerciale, techno, creative, juridique",
          "Outils : alertes Google, RSS, curation, benchmark",
        ],
        flashcards: [
          { id: "f-ve1", front: "Qu'est-ce que la veille operationnelle ?", back: "Demarche ORGANISEE et CONTINUE de surveillance de l'environnement pour anticiper les evolutions et aider a la prise de decision.", difficulty: "easy", tags: ["veille"] },
          { id: "f-ve2", front: "Citez les 6 types de veille", back: "1. Strategique 2. Concurrentielle 3. Commerciale 4. Technologique 5. Creative 6. Juridique", difficulty: "medium", tags: ["veille", "types"] },
          { id: "f-ve3", front: "Citez 4 outils de veille", back: "Alertes Google, flux RSS, outils de curation (Feedly, Scoop.it), benchmark concurrentiel, newsletters specialisees, monitoring reseaux sociaux.", difficulty: "medium", tags: ["veille", "outils"] },
        ],
        quiz: [
          { id: "q-ve1", question: "La veille concurrentielle consiste a :", options: ["Surveiller la legislation", "Surveiller les concurrents", "Surveiller les tendances creatives", "Surveiller les innovations technologiques"], correctIndex: 1, explanation: "Veille CONCURRENTIELLE = surveiller les concurrents (offres, prix, campagnes, positionnement). La veille juridique = legislation. La veille creative = tendances.", difficulty: "easy", tags: ["veille"] },
        ],
      },
    ],
  },
  {
    id: "diagnostic-strategique",
    title: "Diagnostic (SWOT, PESTEL)",
    exam: "e5",
    chapters: [
      {
        id: "swot",
        title: "L'analyse SWOT",
        content: `SWOT = Strengths, Weaknesses, Opportunities, Threats (FFOM en francais).

C'est un outil d'analyse strategique qui croise l'analyse INTERNE et EXTERNE :

INTERNE (ce qui depend de l'organisation) :
- FORCES (Strengths) : avantages competitifs, expertise, ressources
- FAIBLESSES (Weaknesses) : manques, limites, points a ameliorer

EXTERNE (l'environnement) :
- OPPORTUNITES (Opportunities) : tendances favorables, nouveaux marches, evolutions positives
- MENACES (Threats) : risques, concurrence, evolutions defavorables

Le SWOT sert a etablir un DIAGNOSTIC de communication : identifier la problematique et orienter la strategie.

Methodologie : d'abord analyser l'interne (forces/faiblesses), puis l'externe (opportunites/menaces), puis CROISER les resultats pour degager des axes strategiques.`,
        keyPoints: [
          "SWOT = Forces, Faiblesses (interne) + Opportunites, Menaces (externe)",
          "Sert a etablir le diagnostic de communication",
          "Croiser interne/externe pour degager des axes strategiques",
        ],
        didYouKnow: "Le SWOT a ete developpe dans les annees 1960 a Stanford. A l'examen du BTS, le SWOT est demande dans presque TOUS les sujets E5. C'est LA competence indispensable !",
        flashcards: [
          { id: "f-sw1", front: "Que signifie SWOT ?", back: "Strengths (Forces), Weaknesses (Faiblesses), Opportunities (Opportunites), Threats (Menaces). En francais : FFOM.", difficulty: "easy", tags: ["swot", "diagnostic"] },
          { id: "f-sw2", front: "Quels elements du SWOT sont INTERNES a l'organisation ?", back: "Les FORCES et les FAIBLESSES. L'interne = ce qui depend de l'organisation (ressources, competences, image). L'externe (opportunites/menaces) = l'environnement.", difficulty: "medium", tags: ["swot"] },
          { id: "f-sw3", front: "A quoi sert le SWOT dans une strategie de communication ?", back: "A etablir un DIAGNOSTIC : identifier les forces a exploiter, les faiblesses a corriger, les opportunites a saisir et les menaces a anticiper. Il oriente la strategie.", difficulty: "medium", tags: ["swot", "strategie"] },
        ],
        quiz: [
          { id: "q-sw1", question: "Dans le SWOT, les 'Opportunites' sont :", options: ["Internes a l'entreprise", "Externes (environnement)", "Des objectifs a atteindre", "Des budgets disponibles"], correctIndex: 1, explanation: "Opportunites et Menaces = EXTERNE (environnement). Forces et Faiblesses = INTERNE (organisation). Les opportunites sont des tendances favorables de l'environnement.", difficulty: "easy", tags: ["swot"] },
          { id: "q-sw2", question: "Le SWOT permet de :", options: ["Calculer un budget media", "Creer un slogan", "Etablir un diagnostic strategique", "Mesurer l'audience"], correctIndex: 2, explanation: "Le SWOT est un outil de DIAGNOSTIC STRATEGIQUE. Il croise l'analyse interne (forces/faiblesses) et externe (opportunites/menaces) pour orienter la strategie.", difficulty: "easy", tags: ["swot"] },
        ],
      },
      {
        id: "pestel",
        title: "L'analyse PESTEL",
        content: `PESTEL analyse le MACRO-ENVIRONNEMENT en 6 dimensions :

- P = POLITIQUE : stabilite politique, politique fiscale, subventions, reglementations gouvernementales
- E = ECONOMIQUE : croissance, inflation, pouvoir d'achat, taux de change, chomage
- S = SOCIOCULTUREL : tendances societales, modes de vie, valeurs, demographie
- T = TECHNOLOGIQUE : innovations, digital, IA, reseaux sociaux, e-commerce
- E = ECOLOGIQUE : environnement, RSE, developpement durable, reglementations vertes
- L = LEGAL : lois, normes, RGPD, droit de la pub, propriete intellectuelle

PESTEL et SWOT sont complementaires : PESTEL alimente la partie EXTERNE du SWOT (opportunites et menaces).`,
        keyPoints: [
          "PESTEL = Politique, Economique, Socioculturel, Technologique, Ecologique, Legal",
          "Analyse le MACRO-ENVIRONNEMENT (facteurs externes)",
          "Complementaire du SWOT : alimente les opportunites et menaces",
        ],
        flashcards: [
          { id: "f-ps1", front: "Que signifie PESTEL ?", back: "Politique, Economique, Socioculturel, Technologique, Ecologique, Legal. C'est un outil d'analyse du MACRO-ENVIRONNEMENT.", difficulty: "easy", tags: ["pestel"] },
          { id: "f-ps2", front: "Comment PESTEL et SWOT sont-ils lies ?", back: "PESTEL alimente la partie EXTERNE du SWOT. Les facteurs PESTEL permettent d'identifier les OPPORTUNITES et les MENACES du SWOT.", difficulty: "hard", tags: ["pestel", "swot"] },
        ],
        quiz: [
          { id: "q-ps1", question: "Le 'S' de PESTEL designe :", options: ["Strategique", "Socioculturel", "Scientifique", "Securitaire"], correctIndex: 1, explanation: "S = SOCIOCULTUREL : tendances societales, modes de vie, valeurs, demographie. C'est different de T (Technologique) et de E (Ecologique).", difficulty: "easy", tags: ["pestel"] },
        ],
      },
    ],
  },
  {
    id: "positionnement-cibles",
    title: "Positionnement, objectifs, cibles",
    exam: "e5",
    chapters: [
      {
        id: "positionnement",
        title: "Le positionnement",
        content: `Le positionnement est la PLACE qu'une marque/produit occupe dans l'esprit du consommateur par rapport a la concurrence.

4 qualites d'un bon positionnement :
1. CREDIBLE : repose sur des atouts reels
2. SPECIFIQUE : se distingue clairement des concurrents
3. ATTRACTIF : repond aux attentes des consommateurs
4. DURABLE : s'inscrit dans le temps

Exemple : Apple = innovation + design premium. Lidl = prix bas + qualite.`,
        keyPoints: [
          "Place de la marque dans l'esprit du consommateur vs concurrence",
          "4 qualites : credible, specifique, attractif, durable",
        ],
        flashcards: [
          { id: "f-po1", front: "Qu'est-ce que le positionnement en communication ?", back: "La PLACE qu'occupe une marque/produit dans l'ESPRIT DU CONSOMMATEUR par rapport a la concurrence. 4 qualites : credible, specifique, attractif, durable.", difficulty: "easy", tags: ["positionnement"] },
          { id: "f-po2", front: "Citez les 4 qualites d'un bon positionnement", back: "1. CREDIBLE (atouts reels) 2. SPECIFIQUE (distinct de la concurrence) 3. ATTRACTIF (repond aux attentes) 4. DURABLE (tient dans le temps)", difficulty: "medium", tags: ["positionnement"] },
        ],
        quiz: [
          { id: "q-po1", question: "Un positionnement doit etre :", options: ["Vague pour toucher tout le monde", "Credible, specifique, attractif, durable", "Change tous les 6 mois", "Identique a celui du leader"], correctIndex: 1, explanation: "Les 4 qualites : CREDIBLE (vrais atouts), SPECIFIQUE (different des concurrents), ATTRACTIF (repond a un besoin), DURABLE (coherent dans le temps).", difficulty: "easy", tags: ["positionnement"] },
        ],
      },
      {
        id: "objectifs-com",
        title: "Les objectifs de communication",
        content: `3 categories d'objectifs :

- COGNITIF : faire CONNAITRE (notoriete). Informer le public de l'existence du produit/marque.
- AFFECTIF : faire AIMER (image). Creer une attitude positive, une preference.
- CONATIF : faire AGIR (comportement). Pousser a l'achat, a l'inscription, a la visite.

Attention : ne PAS confondre objectif de communication et objectif commercial !
- Objectif commercial : augmenter les ventes de 10%
- Objectif de communication : accroitre la notoriete de 30% aupres des 18-25 ans

Les objectifs doivent etre SMART : Specifiques, Mesurables, Atteignables, Realistes, Temporellement definis.`,
        keyPoints: [
          "Cognitif = connaitre / Affectif = aimer / Conatif = agir",
          "Ne pas confondre objectif de communication et objectif commercial",
          "Objectifs SMART : Specifiques, Mesurables, Atteignables, Realistes, Temporels",
        ],
        flashcards: [
          { id: "f-ob1", front: "Quels sont les 3 types d'objectifs de communication ?", back: "COGNITIF (faire connaitre = notoriete), AFFECTIF (faire aimer = image), CONATIF (faire agir = comportement). Sequence : connaitre -> aimer -> agir.", difficulty: "easy", tags: ["objectifs"] },
          { id: "f-ob2", front: "Que signifie SMART pour un objectif ?", back: "Specifique, Mesurable, Atteignable (Achievable), Realiste, Temporellement defini. Exemple : 'Augmenter la notoriete assistee de 20% en 6 mois'.", difficulty: "medium", tags: ["objectifs", "smart"] },
          { id: "f-ob3", front: "Quelle difference entre objectif de communication et objectif commercial ?", back: "Commercial = ventes/CA (ex: +10% de ventes). Communication = notoriete/image/comportement (ex: +30% de notoriete aupres des 18-25 ans). La communication CONTRIBUE a l'objectif commercial.", difficulty: "hard", tags: ["objectifs"] },
        ],
        quiz: [
          { id: "q-ob1", question: "L'objectif CONATIF vise a :", options: ["Faire connaitre", "Faire aimer", "Faire agir", "Faire reflechir"], correctIndex: 2, explanation: "Conatif = faire AGIR (comportement). Cognitif = faire connaitre (notoriete). Affectif = faire aimer (image). La sequence est : connaitre -> aimer -> agir.", difficulty: "easy", tags: ["objectifs"] },
          { id: "q-ob2", question: "'Augmenter les ventes de 10%' est un objectif :", options: ["De communication cognitif", "De communication conatif", "Commercial", "De communication affectif"], correctIndex: 2, explanation: "C'est un objectif COMMERCIAL (ventes/CA). Un objectif de communication serait : 'Augmenter la notoriete de 30%' ou 'Generer 5000 visites sur le site'.", difficulty: "medium", tags: ["objectifs"] },
        ],
      },
      {
        id: "cibles",
        title: "Les cibles de communication",
        content: `Les cibles sont les publics vises par la strategie de communication :

- CIBLE PRINCIPALE : le public prioritaire que la communication doit atteindre
- COEUR DE CIBLE : le segment le plus important au sein de la cible principale (efforts concentres)
- CIBLE SECONDAIRE : les relais d'influence (journalistes, influenceurs, prescripteurs, leaders d'opinion)
- CIBLE INTERNE : les collaborateurs de l'entreprise

Criteres de segmentation :
- Sociodemographiques : age, sexe, CSP, revenus, localisation
- Psychographiques : valeurs, modes de vie, centres d'interet
- Comportementaux : frequence d'achat, fidelite, sensibilite au prix

B2C = grand public / B2B = professionnels`,
        keyPoints: [
          "Cible principale > Coeur de cible > Cible secondaire (relais)",
          "Criteres : sociodemographiques, psychographiques, comportementaux",
          "B2C (grand public) vs B2B (professionnels)",
        ],
        flashcards: [
          { id: "f-ci1", front: "Quelle difference entre cible principale et coeur de cible ?", back: "Cible principale = public global vise. Coeur de cible = segment PRIORITAIRE au sein de la cible principale, sur lequel l'effort de communication est CONCENTRE.", difficulty: "medium", tags: ["cibles"] },
          { id: "f-ci2", front: "Qu'est-ce que la cible secondaire ?", back: "Les RELAIS D'INFLUENCE : journalistes, influenceurs, prescripteurs, leaders d'opinion. Ils ne sont pas les destinataires finaux mais amplifient le message aupres de la cible principale.", difficulty: "medium", tags: ["cibles"] },
        ],
        quiz: [
          { id: "q-ci1", question: "Le coeur de cible designe :", options: ["Tous les consommateurs", "Le segment prioritaire", "Les medias", "Les concurrents"], correctIndex: 1, explanation: "Coeur de cible = segment PRIORITAIRE au sein de la cible principale. C'est le groupe sur lequel on concentre les efforts de communication.", difficulty: "easy", tags: ["cibles"] },
        ],
      },
    ],
  },
  {
    id: "types-communication",
    title: "Types de communication",
    exam: "e5",
    chapters: [
      {
        id: "com-institutionnelle-commerciale",
        title: "Communication institutionnelle et commerciale",
        content: `COMMUNICATION INSTITUTIONNELLE (CORPORATE) :
Promouvoir l'IMAGE de l'entreprise dans son ensemble (pas un produit). Vehiculer les valeurs, la mission, l'identite. Cibles : tous les publics (actionnaires, partenaires, grand public, salaries).
Exemples : rapport RSE, mecenat, campagne image.

COMMUNICATION COMMERCIALE :
Promouvoir les PRODUITS et la MARQUE. Objectif : stimuler les ventes, faire connaitre un produit, creer de la preference.
Exemples : publicite produit, promotion des ventes, marketing direct.

COMMUNICATION INTERNE :
Destinee aux COLLABORATEURS. 3 directions :
- Descendante (direction -> salaries) : notes, intranet, journal interne
- Ascendante (salaries -> direction) : boite a idees, enquetes
- Horizontale (entre services) : reunions, chat, plateformes collaboratives

COMMUNICATION DE CRISE :
Gerer une situation exceptionnelle qui menace l'image/reputation. Necessite : cellule de crise, porte-parole unique, transparence, reactivite.`,
        keyPoints: [
          "Institutionnelle = image de l'entreprise / Commerciale = produits et ventes",
          "Interne : descendante, ascendante, horizontale",
          "Communication de crise : cellule de crise, transparence, reactivite",
        ],
        flashcards: [
          { id: "f-tc1", front: "Quelle difference entre communication institutionnelle et commerciale ?", back: "INSTITUTIONNELLE = promouvoir l'IMAGE de l'entreprise (valeurs, mission). COMMERCIALE = promouvoir les PRODUITS/MARQUE (stimuler les ventes).", difficulty: "easy", tags: ["types-com"] },
          { id: "f-tc2", front: "Quelles sont les 3 directions de la communication interne ?", back: "DESCENDANTE (direction -> salaries), ASCENDANTE (salaries -> direction), HORIZONTALE (entre services/collegues au meme niveau).", difficulty: "medium", tags: ["types-com", "interne"] },
          { id: "f-tc3", front: "Quels sont les principes cles de la communication de crise ?", back: "Cellule de crise, porte-parole UNIQUE, TRANSPARENCE, REACTIVITE, maitrise de l'information, plan de communication de crise prepare en amont.", difficulty: "medium", tags: ["types-com", "crise"] },
        ],
        quiz: [
          { id: "q-tc1", question: "La communication corporate vise a promouvoir :", options: ["Un produit specifique", "L'image globale de l'entreprise", "Les prix promotionnels", "Le recrutement"], correctIndex: 1, explanation: "Communication CORPORATE = institutionnelle = promouvoir l'IMAGE de l'entreprise dans son ensemble (valeurs, mission, identite). Pas un produit en particulier.", difficulty: "easy", tags: ["types-com"] },
        ],
      },
    ],
  },
  {
    id: "moyens-medias",
    title: "Moyens medias & hors-medias",
    exam: "e5",
    chapters: [
      {
        id: "medias-hors-medias",
        title: "Medias et hors-medias",
        content: `MEDIAS (above the line) = communication via les grands medias :
- TELEVISION : fort impact, large audience, couteux
- PRESSE ECRITE : ciblage thematique, credibilite, en declin
- RADIO : proximite, repetition, faible cout
- AFFICHAGE : visibilite, impact local, message court
- CINEMA : captivite de l'audience, qualite image
- DIGITAL : ciblage precis, interactivite, mesurable, ROI

HORS-MEDIAS (below the line) = tous les autres moyens :
- RELATIONS PRESSE / RP : communiques, conferences, dossiers de presse
- EVENEMENTIEL : salons, foires, sponsoring, mecenat
- MARKETING DIRECT : mailing, e-mailing, SMS, phoning
- PROMOTION DES VENTES : bons de reduction, jeux-concours, echantillons
- COMMUNICATION DIGITALE : reseaux sociaux, SEO, SEA, content marketing, influence

Tendance actuelle : le digital est devenu le 1er media en termes d'investissements publicitaires en France.`,
        keyPoints: [
          "Medias : TV, presse, radio, affichage, cinema, digital",
          "Hors-medias : RP, evenementiel, marketing direct, promo, digital",
          "Le digital est devenu le 1er media publicitaire",
        ],
        flashcards: [
          { id: "f-mm1", front: "Citez les 6 grands medias", back: "Television, Presse ecrite, Radio, Affichage, Cinema, Digital (internet). On les appelle aussi 'above the line'.", difficulty: "easy", tags: ["medias"] },
          { id: "f-mm2", front: "Citez 5 moyens hors-medias", back: "Relations presse/RP, Evenementiel (salons, sponsoring), Marketing direct (mailing, e-mailing), Promotion des ventes (jeux, bons), Communication digitale (RS, SEO).", difficulty: "medium", tags: ["hors-medias"] },
          { id: "f-mm3", front: "Quel est le 1er media publicitaire en France aujourd'hui ?", back: "Le DIGITAL (internet). Il a depasse la television en termes d'investissements publicitaires grace au ciblage precis, la mesurabilite et l'interactivite.", difficulty: "medium", tags: ["medias", "digital"] },
        ],
        quiz: [
          { id: "q-mm1", question: "Le sponsoring fait partie des moyens :", options: ["Medias", "Hors-medias", "Digitaux uniquement", "Audiovisuels"], correctIndex: 1, explanation: "Le sponsoring fait partie de l'EVENEMENTIEL, qui est un moyen HORS-MEDIAS (below the line). Les medias = TV, presse, radio, affichage, cinema, digital.", difficulty: "easy", tags: ["medias"] },
        ],
      },
    ],
  },
  {
    id: "reco-strategique",
    title: "Recommandation strategique & copy strategy",
    exam: "e5",
    chapters: [
      {
        id: "reco",
        title: "La recommandation strategique",
        content: `La recommandation strategique ('reco') est le document remis au client qui presente la strategie de communication proposee.

Structure type :
1. REFORMULATION de la problematique
2. DIAGNOSTIC (SWOT/PESTEL)
3. POSITIONNEMENT propose
4. OBJECTIFS de communication (cognitif, affectif, conatif)
5. CIBLES definies (principale, coeur, secondaire)
6. MESSAGE CLE / axe de communication
7. STRATEGIE CREATIVE (copy strategy)
8. CHOIX DES MOYENS (media/hors-media)
9. BUDGET previsionnel
10. CALENDRIER / retroplanning
11. INDICATEURS de mesure (KPIs)

LA COPY STRATEGY :
- PROMESSE : benefice principal propose au consommateur
- PREUVE : justification de la promesse (resultats, ingredient, expertise)
- BENEFICE CONSOMMATEUR : avantage concret percu par le client
- TON : style de communication (humoristique, serieux, decale, emotionnel)`,
        keyPoints: [
          "11 etapes de la reco : problematique -> diagnostic -> positionnement -> objectifs -> cibles -> message -> creation -> moyens -> budget -> planning -> KPIs",
          "Copy strategy : promesse, preuve, benefice consommateur, ton",
        ],
        flashcards: [
          { id: "f-re1", front: "Quels sont les 4 elements de la copy strategy ?", back: "1. PROMESSE (benefice principal) 2. PREUVE (justification) 3. BENEFICE CONSOMMATEUR (avantage percu) 4. TON (style : humoristique, serieux, emotionnel...)", difficulty: "easy", tags: ["copy-strategy"] },
          { id: "f-re2", front: "Citez les etapes principales d'une recommandation strategique", back: "Problematique, Diagnostic (SWOT), Positionnement, Objectifs, Cibles, Message/axe, Strategie creative (copy strategy), Moyens media/hors-media, Budget, Planning, KPIs.", difficulty: "medium", tags: ["reco"] },
          { id: "f-re3", front: "Qu'est-ce que la 'promesse' dans la copy strategy ?", back: "Le BENEFICE PRINCIPAL propose au consommateur. C'est l'argument central du message publicitaire. Exemple : 'Des cheveux 3x plus forts' (promesse de L'Oreal Elvive).", difficulty: "medium", tags: ["copy-strategy", "promesse"] },
        ],
        quiz: [
          { id: "q-re1", question: "La 'preuve' dans la copy strategy sert a :", options: ["Definir la cible", "Justifier la promesse", "Choisir les medias", "Calculer le budget"], correctIndex: 1, explanation: "La PREUVE justifie la promesse. Exemples : 'Teste cliniquement' (preuve scientifique), 'N 1 des ventes' (preuve sociale), 'Depuis 1850' (preuve d'expertise).", difficulty: "easy", tags: ["copy-strategy"] },
        ],
      },
    ],
  },
  // =========================================
  // E5 - PORTFOLIO ORAL
  // =========================================
  {
    id: "portfolio-construction",
    title: "Construire son portfolio",
    exam: "e6",
    chapters: [
      {
        id: "portfolio-contenu",
        title: "Contenu et structure du portfolio",
        content: `Le portfolio numerique est le dossier professionnel presente a l'oral E5. Il regroupe TOUTES les productions realisees pendant la formation.

CONTENU OBLIGATOIRE :
- Attestations des 2 stages (ou certificats de travail)
- TABLEAU SYNOPTIQUE : resume des productions, annonceurs, types de supports
- 3 FICHES DESCRIPTIVES de situations professionnelles emblematiques
- L'ensemble des PRODUCTIONS realisees (print, audiovisuel, digital)

REGLES :
- Au moins 1 fiche doit decrire une realisation en STAGE (demande reelle)
- Les 3 fiches doivent couvrir la totalite des activites du bloc 2
- Le portfolio doit montrer une DIVERSITE de supports (pas que du print)
- Format : PDF interactif + classeur physique le jour J

TYPES DE PRODUCTIONS A INCLURE :
- Print : affiches, flyers, plaquettes, cartes de visite
- Digital : posts RS, newsletters, bannières web, sites
- Audiovisuel : videos, spots, podcasts
- Evenementiel : plans d'evenements, invitations
- RP : communiques de presse, dossiers de presse`,
        keyPoints: [
          "Obligatoire : attestations stages, tableau synoptique, 3 fiches descriptives, productions",
          "Au moins 1 fiche basee sur une experience de STAGE",
          "Diversite des supports : print, digital, audiovisuel",
          "Format : PDF interactif + classeur physique",
        ],
        flashcards: [
          { id: "f-pf1", front: "Quels sont les elements obligatoires du portfolio E5 ?", back: "Attestations de stages, TABLEAU SYNOPTIQUE (productions/annonceurs/supports), 3 FICHES DESCRIPTIVES de situations pro, et toutes les PRODUCTIONS realisees.", difficulty: "easy", tags: ["portfolio", "contenu"] },
          { id: "f-pf2", front: "Combien de fiches descriptives faut-il pour l'oral E5 ?", back: "3 fiches descriptives de situations professionnelles EMBLEMATIQUES. Au moins 1 doit etre basee sur une experience de STAGE (demande reelle d'un annonceur).", difficulty: "easy", tags: ["portfolio", "fiches"] },
          { id: "f-pf3", front: "Quels types de productions doit contenir le portfolio ?", back: "DIVERSITE obligatoire : Print (affiches, flyers), Digital (posts RS, site), Audiovisuel (videos, spots), Evenementiel, RP (communiques de presse). Pas que du print !", difficulty: "medium", tags: ["portfolio", "productions"] },
        ],
        quiz: [
          { id: "q-pf1", question: "Combien de fiches descriptives sont requises pour l'oral E5 ?", options: ["1", "2", "3", "5"], correctIndex: 2, explanation: "3 fiches descriptives de situations professionnelles. Elles doivent couvrir la totalite des activites du bloc 2, et au moins 1 doit venir d'un STAGE.", difficulty: "easy", tags: ["portfolio"] },
        ],
      },
    ],
  },
  {
    id: "oral-presentation",
    title: "Technique de presentation orale",
    exam: "e6",
    chapters: [
      {
        id: "deroulement-oral",
        title: "Deroulement et conseils pour l'oral",
        content: `DEROULEMENT DE L'ORAL E5 (40 minutes total) :

SITUATION B (20 min max) :
1. Presentation du parcours de professionnalisation (5 min)
   - Se presenter en PROFESSIONNEL (pas en etudiant)
   - Presenter ses competences bloc 2, ses productions principales
2. Echange avec le jury (15 min)
   - Questions sur le tableau synoptique, les choix creatifs
   - Le jury peut varier les parametres des situations

GRILLE D'EVALUATION (criteres officiels) :
- Maitrise des competences du bloc 2
- Capacite a EXPLICITER et JUSTIFIER ses choix creatifs
- Comprehension du cadre professionnel
- Diversite et qualite des productions
- Coherence du parcours de professionnalisation
- Qualite de l'expression orale

CONSEILS :
- Se positionner en PROFESSIONNEL, pas en etudiant
- Adopter une posture de presentation CLIENT
- Preparer des arguments pour justifier CHAQUE choix creatif
- Se munir de son ordinateur et du portfolio en PDF
- Repeter l'oral chronometre plusieurs fois
- Anticiper les questions pieges : "Pourquoi ce choix de couleur ?", "Qu'auriez-vous fait differemment ?"`,
        keyPoints: [
          "40 min total : 5 min presentation + 15 min echange + 20 min approfondissement",
          "Se positionner en PROFESSIONNEL, pas en etudiant",
          "Justifier CHAQUE choix creatif",
          "Criteres : competences, justification, qualite, diversite, coherence",
        ],
        didYouKnow: "Les jurys de BTS Communication adorent la question : 'Qu'auriez-vous fait differemment avec du recul ?' Cette question teste ta capacite d'auto-critique et de progression professionnelle. Prepare toujours une reponse !",
        flashcards: [
          { id: "f-or1", front: "Quelle est la duree totale de l'oral E5 ?", back: "40 minutes : Situation A (evaluation continue) + Situation B (oral final de 20 min max : 5 min presentation + 15 min echange avec le jury).", difficulty: "easy", tags: ["oral", "format"] },
          { id: "f-or2", front: "Quelle posture adopter a l'oral E5 ?", back: "Se positionner en PROFESSIONNEL, pas en etudiant. Adopter une posture de presentation CLIENT. Justifier chaque choix creatif avec des arguments professionnels.", difficulty: "medium", tags: ["oral", "posture"] },
          { id: "f-or3", front: "Quels sont les criteres d'evaluation de l'oral E5 ?", back: "Maitrise des competences bloc 2, capacite a EXPLICITER et JUSTIFIER ses choix, comprehension du cadre professionnel, DIVERSITE et qualite des productions, coherence du parcours.", difficulty: "medium", tags: ["oral", "evaluation"] },
        ],
        quiz: [
          { id: "q-or1", question: "A l'oral E5, il faut se positionner en :", options: ["Etudiant qui apprend", "Professionnel de la communication", "Artiste creatif", "Spectateur critique"], correctIndex: 1, explanation: "Il faut se positionner en PROFESSIONNEL. Le jury evalue votre capacite a vous inserer dans le milieu professionnel. Adoptez une posture de presentation client.", difficulty: "easy", tags: ["oral"] },
        ],
      },
    ],
  },
];

// Helper to get all flashcards
export function getAllFlashcards(): Flashcard[] {
  const cards: Flashcard[] = [];
  for (const mod of modules) {
    for (const ch of mod.chapters) {
      cards.push(...ch.flashcards);
    }
  }
  return cards;
}

// Helper to get all quiz questions
export function getAllQuizQuestions(): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  for (const mod of modules) {
    for (const ch of mod.chapters) {
      questions.push(...ch.quiz);
    }
  }
  return questions;
}

// Helper to get module by id
export function getModuleById(id: string): Module | undefined {
  return modules.find(m => m.id === id);
}

// Helper to get modules by exam
export function getModulesByExam(exam: "e1" | "e5" | "e6"): Module[] {
  return modules.filter(m => m.exam === exam);
}
