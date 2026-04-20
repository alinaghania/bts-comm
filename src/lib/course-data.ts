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
          { id: "f-sh5", front: "Donnez un exemple de bruit SEMANTIQUE dans une campagne de communication.", back: "Un message publicitaire avec un jeu de mots incompris par la cible. Ex : un slogan en anglais visant un public non anglophone, ou un terme technique dans une pub grand public.", difficulty: "hard", tags: ["shannon", "bruit", "application"] },
          { id: "f-sh6", front: "PIEGE EXAMEN : Shannon et Wiener, est-ce la meme chose ?", back: "NON ! Shannon & WEAVER (modele lineaire 1949). WIENER = fondateur de la cybernetique (1948), qui a introduit le concept de FEEDBACK. Ne pas confondre Weaver et Wiener !", difficulty: "hard", tags: ["shannon", "piege"] },
        ],
        quiz: [
          { id: "q-sh1", question: "Le modele de Shannon et Weaver est...", options: ["Circulaire avec feedback", "Lineaire et unidirectionnel", "Interactif et systemique", "Base sur les fonctions du langage"], correctIndex: 1, explanation: "Le modele de Shannon est LINEAIRE : le message va dans un seul sens, de l'emetteur au recepteur, sans retour (feedback). C'est sa limite principale.", difficulty: "easy", tags: ["shannon"] },
          { id: "q-sh2", question: "La notion de 'bruit' dans le modele de Shannon designe :", options: ["Le volume sonore du message", "La reaction du recepteur", "Toute perturbation qui altere le message", "Le contexte social"], correctIndex: 2, explanation: "Le bruit = toute perturbation du signal. Exemple : un gresillment telephonique (bruit technique), un terme mal compris (bruit semantique), une hierarchie qui deforme le message (bruit organisationnel).", difficulty: "easy", tags: ["shannon", "bruit"] },
          { id: "q-sh3", question: "Le modele de Shannon a ete cree pour :", options: ["Analyser la publicite", "Optimiser les telecommunications", "Etudier la propagande", "Comprendre la presse ecrite"], correctIndex: 1, explanation: "Shannon travaillait chez Bell Labs (telephone). Son modele mathematique visait a optimiser la transmission du signal telephonique. Il a ete transpose aux sciences humaines par la suite.", difficulty: "medium", tags: ["shannon", "histoire"] },
          { id: "q-sh4", question: "Un email professionnel mal compris a cause du jargon technique est un exemple de :", options: ["Bruit technique", "Bruit semantique", "Bruit organisationnel", "Absence de canal"], correctIndex: 1, explanation: "Bruit SEMANTIQUE = incomprehension du sens du message. Le jargon technique non maitrise par le recepteur deforme le sens. Bruit technique = probleme materiel. Bruit organisationnel = hierarchie qui filtre.", difficulty: "medium", tags: ["shannon", "bruit"] },
          { id: "q-sh5", question: "Quel modele a introduit le concept de FEEDBACK absent chez Shannon ?", options: ["Le modele de Lasswell", "Le modele de Jakobson", "Le modele de Wiener (cybernetique)", "Le modele de Peirce"], correctIndex: 2, explanation: "Norbert WIENER, fondateur de la cybernetique (1948), a introduit le feedback (boucle de retroaction). Shannon n'a PAS de feedback. Lasswell non plus. Jakobson parle de fonctions du langage, pas de feedback.", difficulty: "hard", tags: ["shannon", "wiener", "feedback"] },
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
          { id: "f-la4", front: "Appliquez le modele de Lasswell a une campagne Coca-Cola de Noel.", back: "QUI = Coca-Cola. DIT QUOI = message de partage/bonheur. PAR QUEL CANAL = TV, affichage, digital. A QUI = grand public/familles. AVEC QUEL EFFET = association Coca-Cola/Noel, achat.", difficulty: "hard", tags: ["lasswell", "application"] },
          { id: "f-la5", front: "PIEGE EXAMEN : Lasswell a-t-il introduit le feedback ?", back: "NON ! Le modele de Lasswell est LINEAIRE comme Shannon. Il n'y a PAS de feedback. Il ajoute la question de l'EFFET mais c'est different du feedback (retour du recepteur vers l'emetteur).", difficulty: "hard", tags: ["lasswell", "piege"] },
        ],
        quiz: [
          { id: "q-la1", question: "Quelle question le modele de Lasswell ajoute-t-il par rapport a Shannon ?", options: ["Comment ?", "Pourquoi ?", "Avec quel effet ?", "Dans quel contexte ?"], correctIndex: 2, explanation: "Lasswell ajoute 'With what effect ?' (Avec quel effet ?). C'est LA nouveaute : il s'interesse a l'IMPACT du message sur le recepteur, pas seulement a sa transmission.", difficulty: "easy", tags: ["lasswell"] },
          { id: "q-la2", question: "Le modele de Lasswell est particulierement utile pour analyser :", options: ["La communication interpersonnelle", "La communication de masse", "La communication non-verbale", "La communication interne"], correctIndex: 1, explanation: "Lasswell etait specialiste de la propagande. Son modele est adapte a la communication de MASSE car il analyse l'effet du message sur une audience.", difficulty: "medium", tags: ["lasswell"] },
          { id: "q-la3", question: "Dans le modele de Lasswell, 'Which channel' correspond a :", options: ["Le contenu du message", "Le media utilise pour transmettre", "L'audience visee", "L'effet produit"], correctIndex: 1, explanation: "'Which channel' = par quel CANAL/MEDIA le message est transmis. C'est le support de diffusion (TV, presse, radio, digital...). 'What' = contenu, 'Whom' = audience, 'What effect' = impact.", difficulty: "easy", tags: ["lasswell"] },
          { id: "q-la4", question: "La principale limite partagee par Shannon ET Lasswell est :", options: ["L'absence de la notion de bruit", "L'absence de feedback", "L'absence de canal", "L'absence d'emetteur"], correctIndex: 1, explanation: "Les DEUX modeles sont LINEAIRES : pas de feedback (retour du recepteur). C'est Wiener (cybernetique) puis Palo Alto qui introduiront l'interactivite.", difficulty: "medium", tags: ["lasswell", "shannon", "comparaison"] },
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
          { id: "f-ja6", front: "PIEGE EXAMEN : Quelle difference entre fonction EMOTIVE et CONATIVE ?", back: "EMOTIVE = centree sur l'EMETTEUR (il exprime SES sentiments). CONATIVE = centree sur le RECEPTEUR (on veut le faire agir). Confusion frequente ! 'Je suis triste' = emotive. 'Achete !' = conative.", difficulty: "hard", tags: ["jakobson", "piege"] },
          { id: "f-ja7", front: "Analysez le slogan 'Parce que vous le valez bien' (L'Oreal) avec Jakobson", back: "CONATIVE ('vous' = s'adresse au recepteur), EMOTIVE (estime de soi, valorisation), POETIQUE (rythme, formule memorable). La fonction REFERENTIELLE est quasi absente (pas d'info produit).", difficulty: "hard", tags: ["jakobson", "analyse"] },
        ],
        quiz: [
          { id: "q-ja1", question: "La fonction PHATIQUE selon Jakobson sert a :", options: ["Informer objectivement", "Exprimer ses emotions", "Maintenir le contact", "Expliquer un mot"], correctIndex: 2, explanation: "Phatique = maintenir le CONTACT. 'Allo ?', 'Tu m'ecoutes ?'. Elle est liee au CANAL. C'est different de la fonction conative (agir sur l'autre) ou metalinguistique (expliquer le langage).", difficulty: "easy", tags: ["jakobson"] },
          { id: "q-ja2", question: "Le slogan publicitaire releve principalement de la fonction :", options: ["Referentielle", "Poetique", "Phatique", "Metalinguistique"], correctIndex: 1, explanation: "Le slogan attire l'attention sur la FORME du message (rimes, jeux de mots, rythme) = fonction POETIQUE. Mais il combine souvent conative (inciter a acheter) et emotive (creer une connexion).", difficulty: "medium", tags: ["jakobson", "pub"] },
          { id: "q-ja3", question: "'Que signifie le mot paradigme ?' releve de la fonction :", options: ["Referentielle", "Emotive", "Metalinguistique", "Conative"], correctIndex: 2, explanation: "Metalinguistique = parler DU langage. On utilise le langage pour definir/expliquer un mot du langage. C'est different de la fonction referentielle qui decrit le monde exterieur.", difficulty: "medium", tags: ["jakobson"] },
          { id: "q-ja4", question: "Combien de fonctions du langage Jakobson identifie-t-il ?", options: ["4", "5", "6", "7"], correctIndex: 2, explanation: "Jakobson identifie 6 fonctions, chacune liee a un element : referentielle (contexte), emotive (emetteur), conative (recepteur), phatique (canal), metalinguistique (code), poetique (message).", difficulty: "easy", tags: ["jakobson"] },
          { id: "q-ja5", question: "'Comme je suis heureux !' releve de la fonction :", options: ["Conative", "Emotive", "Referentielle", "Poetique"], correctIndex: 1, explanation: "EMOTIVE = expression des sentiments de l'EMETTEUR. 'Comme je suis heureux' exprime un etat emotionnel. CONATIVE serait 'Sois heureux !' (agir sur l'autre).", difficulty: "easy", tags: ["jakobson"] },
          { id: "q-ja6", question: "Dans une pub TV, le numero vert '0 800 XXX' affiche en fin de spot releve de :", options: ["La fonction referentielle", "La fonction conative", "La fonction phatique", "La fonction metalinguistique"], correctIndex: 1, explanation: "Fonction CONATIVE : le numero vert incite le recepteur a AGIR (appeler). C'est une invitation a l'action concrete. La phatique serait simplement etablir le contact sans demande d'action.", difficulty: "hard", tags: ["jakobson", "application"] },
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
          { id: "f-pa5", front: "Qu'est-ce que la metacommunication selon Palo Alto ?", back: "La communication SUR la communication. Toute communication a 2 niveaux : le CONTENU (ce qu'on dit) et la RELATION (comment on le dit, le rapport entre les interlocuteurs). Le ton, le contexte, la relation definissent le sens.", difficulty: "hard", tags: ["palo-alto", "metacommunication"] },
          { id: "f-pa6", front: "Citez les 4 zones de la proxemique de Hall avec leurs distances.", back: "1. INTIME (0-45cm) : couple, ami proche. 2. PERSONNELLE (45cm-1m20) : conversation amicale. 3. SOCIALE (1m20-3m60) : relations professionnelles. 4. PUBLIQUE (>3m60) : conference, discours.", difficulty: "medium", tags: ["palo-alto", "proxemique"] },
        ],
        quiz: [
          { id: "q-pa1", question: "Qui a enonce 'On ne peut pas ne pas communiquer' ?", options: ["Jakobson", "Shannon", "Watzlawick", "Barthes"], correctIndex: 2, explanation: "C'est Paul WATZLAWICK, de l'Ecole de Palo Alto. Cet axiome signifie que tout comportement (y compris le silence) est une forme de communication.", difficulty: "easy", tags: ["palo-alto"] },
          { id: "q-pa2", question: "L'approche de l'Ecole de Palo Alto est :", options: ["Lineaire", "Mathematique", "Systemique et interactionniste", "Semiologique"], correctIndex: 2, explanation: "Palo Alto propose une approche SYSTEMIQUE (tout est interconnecte) et INTERACTIONNISTE (les acteurs s'influencent mutuellement). C'est le contraire des modeles lineaires de Shannon et Lasswell.", difficulty: "easy", tags: ["palo-alto"] },
          { id: "q-pa3", question: "La proxemique designe :", options: ["L'etude des gestes", "La gestion de l'espace dans la communication", "L'analyse du langage", "L'etude des medias"], correctIndex: 1, explanation: "Proxemique = gestion de l'ESPACE (Edward T. Hall). La kinesique = etude des GESTES. Les deux font partie de la communication non-verbale.", difficulty: "medium", tags: ["palo-alto", "proxemique"] },
          { id: "q-pa4", question: "La zone 'sociale' en proxemique correspond a :", options: ["0 a 45 cm", "45 cm a 1m20", "1m20 a 3m60", "Plus de 3m60"], correctIndex: 2, explanation: "Zone sociale = 1m20 a 3m60 (relations professionnelles). Intime = 0-45cm. Personnelle = 45cm-1m20. Publique = >3m60.", difficulty: "medium", tags: ["palo-alto", "proxemique"] },
          { id: "q-pa5", question: "Selon Palo Alto, un PDG qui croise les bras pendant une reunion :", options: ["Ne communique pas car il ne parle pas", "Communique malgre lui (posture fermee)", "Fait de la metacommunication", "Utilise la fonction phatique"], correctIndex: 1, explanation: "'On ne peut pas NE PAS communiquer'. Les bras croises communiquent une posture FERMEE, de la distance ou du desaccord. C'est de la communication non-verbale (kinesique).", difficulty: "hard", tags: ["palo-alto", "application"] },
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
          { id: "f-sa4", front: "Quelle difference entre LANGUE et PAROLE chez Saussure ?", back: "LANGUE = systeme collectif, regles partagees par une communaute (le francais). PAROLE = usage INDIVIDUEL de la langue (ce que JE dis). La langue est sociale, la parole est personnelle.", difficulty: "medium", tags: ["saussure", "langue-parole"] },
          { id: "f-sa5", front: "PIEGE EXAMEN : Saussure = semiologie ou semiotique ?", back: "Saussure parle de SEMIOLOGIE (tradition europeenne). Peirce parle de SEMIOTIQUE (tradition americaine). Les deux termes designent la science des signes. A l'examen, les deux sont acceptes.", difficulty: "hard", tags: ["saussure", "piege"] },
          { id: "f-sa6", front: "Appliquez signifiant/signifie au logo Apple.", back: "SIGNIFIANT = la pomme croquee (forme visuelle). SIGNIFIE = innovation, design, technologie premium. Le lien est ARBITRAIRE (une pomme n'evoque pas naturellement la technologie) mais il est devenu CONVENTIONNEL.", difficulty: "hard", tags: ["saussure", "application"] },
        ],
        quiz: [
          { id: "q-sa1", question: "Le signifiant designe :", options: ["Le concept, l'idee", "La forme materielle du signe", "Le contexte de communication", "L'intention de l'emetteur"], correctIndex: 1, explanation: "Signifiant = FORME materielle (son, image, mot ecrit). Signifie = CONCEPT, idee. Exemple : le mot ecrit 'chat' est le signifiant, l'idee du chat est le signifie.", difficulty: "easy", tags: ["saussure"] },
          { id: "q-sa2", question: "Le lien entre signifiant et signifie est :", options: ["Naturel et universel", "Motive par la ressemblance", "Arbitraire et conventionnel", "Logique et rationnel"], correctIndex: 2, explanation: "Le lien est ARBITRAIRE : il n'y a aucune raison naturelle pour que le son 'arbre' designe un arbre. C'est une CONVENTION sociale (la preuve : 'tree' en anglais).", difficulty: "medium", tags: ["saussure"] },
          { id: "q-sa3", question: "Chez Saussure, la LANGUE designe :", options: ["L'usage individuel du langage", "Le systeme collectif de regles partagees", "Les gestes et mimiques", "Le contexte de communication"], correctIndex: 1, explanation: "LANGUE = systeme COLLECTIF, ensemble de regles partagees par une communaute linguistique. La PAROLE = usage INDIVIDUEL. Saussure etudie la langue, pas la parole.", difficulty: "medium", tags: ["saussure"] },
          { id: "q-sa4", question: "L'axe SYNTAGMATIQUE chez Saussure est :", options: ["Vertical (choix entre mots)", "Horizontal (combinaison des mots)", "Temporel (evolution du langage)", "Spatial (organisation dans l'espace)"], correctIndex: 1, explanation: "Syntagme = axe HORIZONTAL, combinaison des mots dans la chaine parlee. Paradigme = axe VERTICAL, choix entre mots substituables. 'Le chat mange' = syntagme. Chat/chien/oiseau = paradigme.", difficulty: "hard", tags: ["saussure"] },
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
          { id: "f-ba5", front: "Qu'est-ce que la fonction d'ANCRAGE du texte selon Barthes ?", back: "Le texte GUIDE la lecture de l'image en fixant le sens parmi les multiples connotations possibles. Le slogan dit au lecteur COMMENT interpreter l'image. Sans texte, l'image est polysemique.", difficulty: "hard", tags: ["barthes", "ancrage"] },
          { id: "f-ba6", front: "Comment Barthes analyse-t-il les mythes dans la publicite ?", back: "Dans 'Mythologies' (1957), Barthes montre que la pub cree des MYTHES : des significations culturelles naturalisees. Ex : la Citroen DS = deesse de la modernite. Le steak-frites = identite francaise.", difficulty: "hard", tags: ["barthes", "mythologies"] },
        ],
        quiz: [
          { id: "q-ba1", question: "Roland Barthes identifie dans l'image publicitaire :", options: ["2 niveaux de lecture", "3 niveaux de lecture", "4 niveaux de lecture", "5 niveaux de lecture"], correctIndex: 1, explanation: "3 messages : linguistique (texte), iconique code/connote (significations culturelles), iconique non-code/denote (description objective). C'est la base de l'analyse semiologique de l'image.", difficulty: "easy", tags: ["barthes"] },
          { id: "q-ba2", question: "La CONNOTATION en semiologie designe :", options: ["La description objective de l'image", "Les significations culturelles et symboliques", "Le texte accompagnant l'image", "La couleur dominante"], correctIndex: 1, explanation: "Connotation = significations CULTURELLES et symboliques. C'est ce que l'image SUGGERE au-dela de ce qu'elle montre. La denotation, elle, est la description OBJECTIVE.", difficulty: "medium", tags: ["barthes"] },
          { id: "q-ba3", question: "Dans la pub Panzani, les couleurs vert-blanc-rouge connotent :", options: ["La fraicheur des legumes", "L'italianite (drapeau italien)", "La marque Panzani", "Le prix bas"], correctIndex: 1, explanation: "Les couleurs vert-blanc-rouge = drapeau italien = CONNOTATION de l'italianite. C'est un message iconique CODE, pas denote (on ne voit pas litteralement un drapeau).", difficulty: "medium", tags: ["barthes", "panzani"] },
          { id: "q-ba4", question: "La fonction d'ANCRAGE du texte publicitaire consiste a :", options: ["Repeter le message visuel", "Guider l'interpretation de l'image", "Donner le prix du produit", "Identifier la marque"], correctIndex: 1, explanation: "ANCRAGE = le texte fixe le sens de l'image parmi ses multiples interpretations possibles. Il GUIDE la lecture. Sans ancrage, l'image reste polysemique (plusieurs sens possibles).", difficulty: "hard", tags: ["barthes"] },
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
          { id: "f-pe4", front: "Un emoji souriant est-il une icone ou un symbole ?", back: "C'est une ICONE car il RESSEMBLE a un visage souriant (lien de ressemblance). Mais il tend vers le SYMBOLE car sa signification est aussi conventionnelle. Un signe peut combiner plusieurs categories !", difficulty: "hard", tags: ["peirce", "application"] },
          { id: "f-pe5", front: "PIEGE EXAMEN : Saussure vs Peirce, quelle difference fondamentale ?", back: "Saussure : signe = signifiant + signifie (2 elements, relation BINAIRE). Peirce : signe = representamen + objet + interpretant (3 elements, relation TRIADIQUE). Peirce ajoute l'INTERPRETANT (l'effet du signe sur celui qui le recoit).", difficulty: "hard", tags: ["peirce", "saussure", "piege"] },
        ],
        quiz: [
          { id: "q-pe1", question: "Selon Peirce, une photo est un :", options: ["Symbole", "Indice", "Icone", "Signe arbitraire"], correctIndex: 2, explanation: "Une photo est une ICONE car elle RESSEMBLE a ce qu'elle represente. L'icone se definit par la ressemblance avec le referent.", difficulty: "easy", tags: ["peirce"] },
          { id: "q-pe2", question: "Le drapeau d'un pays est un :", options: ["Icone", "Indice", "Symbole", "Icone et indice"], correctIndex: 2, explanation: "Le drapeau est un SYMBOLE : le lien entre le tissu colore et le pays est CONVENTIONNEL. Il faut apprendre que le bleu-blanc-rouge = France. Ce n'est ni une ressemblance ni un lien causal.", difficulty: "easy", tags: ["peirce"] },
          { id: "q-pe3", question: "Des gouttes de condensation sur une bouteille dans une pub sont :", options: ["Une icone de fraicheur", "Un indice de fraicheur", "Un symbole de fraicheur", "Une metaphore de fraicheur"], correctIndex: 1, explanation: "INDICE : les gouttes sont une CONSEQUENCE naturelle du froid (lien causal). Elles indiquent que la bouteille est froide/fraiche. Ce n'est pas une convention mais un lien physique.", difficulty: "hard", tags: ["peirce", "application"] },
          { id: "q-pe4", question: "La classification de Peirce repose sur :", options: ["Le lien signifiant/signifie", "Le rapport du signe au referent", "Les fonctions du langage", "Le contexte social"], correctIndex: 1, explanation: "Peirce classe les signes selon leur RAPPORT AU REFERENT (ce qu'ils representent) : ressemblance (icone), causalite (indice), convention (symbole).", difficulty: "medium", tags: ["peirce"] },
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
          { id: "f-rh6", front: "Qu'est-ce qu'un CHIASME ? Donnez un exemple.", back: "Structure en miroir AB-BA. 'Il faut manger pour vivre et non vivre pour manger' (Moliere). En pub : 'La vie est belle, belle est la vie'. Cree un effet de boucle memorable.", difficulty: "hard", tags: ["rhetorique", "chiasme"] },
          { id: "f-rh7", front: "Qu'est-ce que la PERSONNIFICATION en publicite ?", back: "Attribuer des qualites HUMAINES a un objet ou une marque. 'Votre voiture vous comprend', 'M&M's qui parlent'. Cree de l'empathie et de la proximite avec le produit.", difficulty: "easy", tags: ["rhetorique", "personnification"] },
          { id: "f-rh8", front: "PIEGE EXAMEN : Quelle difference entre antithese et oxymore ?", back: "ANTITHESE : 2 idees opposees dans 2 expressions SEPAREES ('petit prix, grand plaisir'). OXYMORE : 2 termes contraires dans UNE SEULE expression ('un luxe accessible'). L'oxymore est plus compact et plus paradoxal.", difficulty: "hard", tags: ["rhetorique", "piege"] },
          { id: "f-rh9", front: "Qu'est-ce que l'EUPHEMISME ? Exemple en communication ?", back: "Attenuation d'une realite desagreable. 'Plan de sauvegarde de l'emploi' au lieu de 'licenciements massifs'. 'Il nous a quittes' au lieu de 'il est mort'. Tres utilise en communication de crise.", difficulty: "medium", tags: ["rhetorique", "euphemisme"] },
          { id: "f-rh10", front: "Qu'est-ce que la LITOTE ? Exemple celebre ?", back: "Dire MOINS pour suggerer PLUS. 'Va, je ne te hais point' (Corneille) = je t'aime passionnement. En pub : 'Ce n'est pas mauvais' = c'est excellent. Effet d'understatement.", difficulty: "medium", tags: ["rhetorique", "litote"] },
          { id: "f-rh11", front: "Qu'est-ce que l'ALLEGORIE en publicite ?", back: "Representation d'une idee abstraite par une image concrete. Le Bibendum Michelin = securite/fiabilite. Le lion Peugeot = puissance. La Marianne = la Republique francaise.", difficulty: "medium", tags: ["rhetorique", "allegorie"] },
          { id: "f-rh12", front: "Qui est Jacques DURAND et quel est son apport ?", back: "Publicitaire francais qui a systematise l'analyse des figures de rhetorique dans la publicite (1970). Il montre que TOUTE pub utilise des figures de style, et que la transgression rhetorique procure du plaisir au recepteur.", difficulty: "hard", tags: ["rhetorique", "durand"] },
        ],
        quiz: [
          { id: "q-rh1", question: "'Red Bull te donne des ailes' est :", options: ["Une comparaison", "Une metaphore", "Une hyperbole", "Une metonymie"], correctIndex: 1, explanation: "C'est une METAPHORE : comparaison IMPLICITE (pas de 'comme'). L'energie est assimilee a des ailes. Si c'etait 'L'energie, c'est comme des ailes', ce serait une comparaison.", difficulty: "easy", tags: ["rhetorique"] },
          { id: "q-rh2", question: "'Petit prix, grand plaisir' est :", options: ["Un oxymore", "Une antithese", "Un chiasme", "Une anaphore"], correctIndex: 1, explanation: "C'est une ANTITHESE : opposition de 2 idees (petit vs grand). Un oxymore serait 'un grand petit prix' (contradiction dans la meme expression). Le chiasme serait 'Petit prix, plaisir grand'.", difficulty: "medium", tags: ["rhetorique"] },
          { id: "q-rh3", question: "'Boire un verre' est un exemple de :", options: ["Metaphore", "Synecdoque", "Metonymie", "Comparaison"], correctIndex: 2, explanation: "METONYMIE : on remplace le contenu (la boisson) par le contenant (le verre). C'est un lien d'association. La synecdoque serait la PARTIE pour le tout.", difficulty: "hard", tags: ["rhetorique"] },
          { id: "q-rh4", question: "L'accumulation est une figure de :", options: ["Analogie", "Opposition", "Amplification", "Substitution"], correctIndex: 2, explanation: "L'accumulation (enumeration d'elements) est une figure d'AMPLIFICATION, comme l'hyperbole et la gradation. Elle sert a renforcer l'effet du message.", difficulty: "medium", tags: ["rhetorique"] },
          { id: "q-rh5", question: "'Un luxe accessible' est :", options: ["Une antithese", "Un oxymore", "Une litote", "Une metaphore"], correctIndex: 1, explanation: "OXYMORE : 'luxe' (cher, exclusif) + 'accessible' (abordable) = 2 termes contradictoires dans UNE expression. L'antithese opposerait les termes dans 2 expressions separees.", difficulty: "medium", tags: ["rhetorique"] },
          { id: "q-rh6", question: "'Il faut manger pour vivre et non vivre pour manger' est :", options: ["Une anaphore", "Un chiasme", "Une gradation", "Un oxymore"], correctIndex: 1, explanation: "CHIASME : structure en miroir AB-BA. Manger/vivre -> vivre/manger. Les mots s'inversent pour creer un effet de symetrie et de reflexion.", difficulty: "hard", tags: ["rhetorique"] },
          { id: "q-rh7", question: "La synecdoque se distingue de la metonymie car :", options: ["Elle utilise 'comme'", "C'est la partie pour le tout", "C'est une exageration", "C'est une opposition"], correctIndex: 1, explanation: "SYNECDOQUE = la PARTIE pour le tout ('les voiles' pour 'les bateaux'). METONYMIE = remplacement par un element ASSOCIE mais pas une partie ('boire un verre' = contenant pour contenu).", difficulty: "hard", tags: ["rhetorique"] },
          { id: "q-rh8", question: "'Plan de sauvegarde de l'emploi' pour 'licenciements' est :", options: ["Une litote", "Un euphemisme", "Une hyperbole", "Une antithese"], correctIndex: 1, explanation: "EUPHEMISME : attenuation d'une realite desagreable. On adoucit le terme 'licenciements' par une formulation neutre. La litote dit MOINS pour suggerer PLUS, l'euphemisme ADOUCIT la realite.", difficulty: "medium", tags: ["rhetorique"] },
          { id: "q-rh9", question: "Selon Jacques Durand, la publicite utilise les figures de style pour :", options: ["Respecter les regles grammaticales", "Procurer du plaisir par la transgression", "Informer objectivement le consommateur", "Se conformer a la loi"], correctIndex: 1, explanation: "Durand montre que les figures de style publicitaires TRANSGRESSENT les normes (un taureau qui vole, une voiture qui parle) et cette transgression procure du PLAISIR au recepteur.", difficulty: "hard", tags: ["rhetorique", "durand"] },
          { id: "q-rh10", question: "Le Bibendum Michelin est un exemple de :", options: ["Metaphore", "Allegorie", "Synecdoque", "Litote"], correctIndex: 1, explanation: "ALLEGORIE : representation d'une idee abstraite (securite, fiabilite) par un personnage concret (le bonhomme en pneus). C'est plus qu'une metaphore car c'est un systeme complet de representation.", difficulty: "hard", tags: ["rhetorique"] },
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
          { id: "f-ar4", front: "Qu'est-ce que le LOGOS en argumentation ?", back: "La dimension LOGIQUE du discours : raisonnements, preuves, statistiques, demonstrations. En pub : '9 dentistes sur 10 recommandent...', 'Prouve cliniquement'. Le logos s'adresse a la RAISON.", difficulty: "medium", tags: ["argumentation", "logos"] },
          { id: "f-ar5", front: "Qu'est-ce que le KAIROS en rhetorique ?", back: "Le moment OPPORTUN pour communiquer. Choisir le bon moment, le bon contexte pour que le message ait un impact maximal. En com : lancer une campagne solaires en juin, pas en decembre.", difficulty: "hard", tags: ["argumentation", "kairos"] },
          { id: "f-ar6", front: "Qu'est-ce qu'un ARGUMENT D'AUTORITE ? Exemple en pub ?", back: "Invoquer une source credible pour appuyer son propos. En pub : 'Recommande par l'Association des dermatologues', 'Elu produit de l'annee'. Attention : c'est parfois un argument FALLACIEUX si l'autorite n'est pas competente.", difficulty: "hard", tags: ["argumentation", "autorite"] },
          { id: "f-ar7", front: "Qu'est-ce qu'un SOPHISME ? Exemple en publicite ?", back: "Un raisonnement qui SEMBLE logique mais est FALLACIEUX. Exemple : 'Tout le monde l'achete, donc c'est le meilleur' (argument ad populum). Ou : 'Avant/apres' truque. Le sophisme manipule le logos.", difficulty: "hard", tags: ["argumentation", "sophisme"] },
          { id: "f-ar8", front: "PIEGE EXAMEN : Convaincre vs Persuader, lequel est le plus efficace en pub ?", back: "La PERSUASION (pathos) est souvent plus efficace en pub car les decisions d'achat sont largement EMOTIONNELLES. Mais les meilleures campagnes combinent les deux : emotion + raison. Nike = pathos (depassement de soi) + logos (performance technique).", difficulty: "hard", tags: ["argumentation", "piege"] },
        ],
        quiz: [
          { id: "q-ar1", question: "L'ETHOS chez Aristote correspond a :", options: ["L'emotion du public", "La logique du discours", "La credibilite de l'orateur", "Le contexte social"], correctIndex: 2, explanation: "Ethos = CREDIBILITE de l'orateur. Pathos = EMOTION du public. Logos = LOGIQUE du discours. Les 3 sont complementaires pour persuader.", difficulty: "easy", tags: ["argumentation"] },
          { id: "q-ar2", question: "Un temoignage client emouvant dans une pub releve du :", options: ["Logos", "Ethos", "Pathos", "Kairos"], correctIndex: 2, explanation: "PATHOS = susciter l'EMOTION. Un temoignage emouvant joue sur l'empathie du public. Si c'etait des statistiques de satisfaction, ce serait du logos.", difficulty: "medium", tags: ["argumentation"] },
          { id: "q-ar3", question: "'9 dentistes sur 10 recommandent ce dentifrice' releve de :", options: ["L'ethos uniquement", "Le pathos", "Le logos + ethos", "La fonction phatique"], correctIndex: 2, explanation: "LOGOS (chiffre '9 sur 10' = argument statistique) + ETHOS (dentistes = autorite medicale credible). C'est un argument d'autorite appuye par un chiffre.", difficulty: "medium", tags: ["argumentation"] },
          { id: "q-ar4", question: "Le KAIROS designe :", options: ["La credibilite de l'orateur", "L'emotion du public", "Le moment opportun", "La preuve logique"], correctIndex: 2, explanation: "KAIROS = le moment OPPORTUN, le bon timing. En communication : choisir le moment ideal pour diffuser un message (saisonnalite, actualite, contexte).", difficulty: "hard", tags: ["argumentation"] },
          { id: "q-ar5", question: "Un argument AD HOMINEM consiste a :", options: ["S'adresser a l'homme de la rue", "Attaquer la personne plutot que ses idees", "Utiliser un temoignage", "Faire appel aux emotions"], correctIndex: 1, explanation: "AD HOMINEM = attaquer la PERSONNE (son caractere, son passe) au lieu de ses ARGUMENTS. C'est un argument FALLACIEUX. Exemple : 'Vous ne pouvez pas parler d'ecologie, vous prenez l'avion'.", difficulty: "hard", tags: ["argumentation", "sophisme"] },
          { id: "q-ar6", question: "Une campagne Dove montrant des 'vraies femmes' joue sur :", options: ["Le logos (preuves scientifiques)", "L'ethos (expertise cosmetique)", "Le pathos (identification, emotion)", "Le kairos (timing saisonnier)"], correctIndex: 2, explanation: "PATHOS : Dove joue sur l'IDENTIFICATION emotionnelle. Les 'vraies femmes' suscitent empathie et reconnaissance. C'est aussi de l'ethos (Dove = marque authentique), mais le pathos domine.", difficulty: "medium", tags: ["argumentation", "application"] },
        ],
      },
    ],
  },
  // =========================================
  // E1 - NOUVEAUX MODULES
  // =========================================
  {
    id: "medias-enjeux",
    title: "Medias et enjeux societaux",
    exam: "e1",
    chapters: [
      {
        id: "histoire-medias",
        title: "Histoire des medias",
        content: `La PRESSE ECRITE : Gutenberg invente l'imprimerie (1454), Theophraste Renaudot lance La Gazette (1631, 1er journal francais). Au XIXe siecle : presse de masse (Le Petit Journal, 1863, 1 sou). Loi sur la liberte de la presse : 29 juillet 1881.

La RADIO : premieres emissions dans les annees 1920-30. Pendant la 2e Guerre mondiale, la radio est un outil de propagande ET de resistance (Radio Londres : 'Les Francais parlent aux Francais'). Liberalisation des ondes en 1981 (radios libres sous Mitterrand).

La TELEVISION : 1ere emission francaise en 1935. Expansion dans les annees 1950-60. Couleur en 1967. Privatisation de TF1 en 1987. TNT en 2005. Aujourd'hui : convergence TV/streaming (Netflix, Disney+).

INTERNET et RESEAUX SOCIAUX : Web 1.0 (annees 1990, sites statiques). Web 2.0 (2004+, contenu genere par les utilisateurs : blogs, Wikipedia, YouTube). Reseaux sociaux : Facebook (2004), Twitter (2006), Instagram (2010), TikTok (2016). On parle aujourd'hui de Web 3.0 (decentralisation, IA).`,
        keyPoints: [
          "Presse : Gutenberg (1454) -> Renaudot (1631) -> presse de masse (XIXe) -> loi 1881",
          "Radio : annees 30 -> propagande WWII -> radios libres 1981",
          "TV : 1935 -> couleur 1967 -> TF1 privatisee 1987 -> TNT 2005 -> streaming",
          "Internet : Web 1.0 (1990s) -> Web 2.0 (2004) -> RS -> Web 3.0",
        ],
        didYouKnow: "La loi du 29 juillet 1881 sur la liberte de la presse est toujours en vigueur ! Elle garantit la liberte d'expression mais fixe aussi des limites : diffamation, injure, provocation a la haine.",
        flashcards: [
          { id: "f-me1", front: "Qui a lance le premier journal francais et quand ?", back: "Theophraste RENAUDOT a lance La Gazette en 1631. C'est le premier journal periodique francais. Gutenberg avait invente l'imprimerie en 1454, rendant l'information reproductible.", difficulty: "medium", tags: ["medias", "histoire"] },
          { id: "f-me2", front: "Quelle loi fondamentale regit la presse en France ?", back: "La loi du 29 juillet 1881 sur la LIBERTE DE LA PRESSE. Elle garantit la liberte d'expression tout en fixant des limites (diffamation, injure, incitation a la haine).", difficulty: "medium", tags: ["medias", "loi"] },
          { id: "f-me3", front: "Quand la TV couleur est-elle arrivee en France ?", back: "En 1967. TF1 a ete privatisee en 1987. La TNT (Television Numerique Terrestre) a ete lancee en 2005, multipliant les chaines gratuites.", difficulty: "easy", tags: ["medias", "television"] },
          { id: "f-me4", front: "Qu'est-ce que le Web 2.0 et quand a-t-il emerge ?", back: "Le Web 2.0 (a partir de 2004) = contenu genere par les UTILISATEURS (blogs, Wikipedia, YouTube, reseaux sociaux). Le Web 1.0 etait statique (sites vitrines). Le Web 2.0 est PARTICIPATIF et INTERACTIF.", difficulty: "medium", tags: ["medias", "digital"] },
          { id: "f-me5", front: "Que sont les 'radios libres' et quand apparaissent-elles ?", back: "Les radios libres apparaissent en 1981 avec la liberalisation des ondes sous Mitterrand. Avant, l'Etat avait le monopole de la radiodiffusion. NRJ, Fun Radio, Skyrock sont nees a cette epoque.", difficulty: "hard", tags: ["medias", "radio"] },
        ],
        quiz: [
          { id: "q-me1", question: "La Gazette de Renaudot date de :", options: ["1454", "1631", "1789", "1881"], correctIndex: 1, explanation: "La Gazette = 1631 (1er journal francais). 1454 = Gutenberg (imprimerie). 1789 = Revolution. 1881 = loi sur la liberte de la presse.", difficulty: "easy", tags: ["medias"] },
          { id: "q-me2", question: "Le Web 2.0 se caracterise par :", options: ["Des sites statiques", "Le contenu genere par les utilisateurs", "La decentralisation blockchain", "L'intelligence artificielle"], correctIndex: 1, explanation: "Web 2.0 = contenu cree par les UTILISATEURS (UGC). Web 1.0 = sites statiques. Web 3.0 = decentralisation/IA. Le Web 2.0 a cree les reseaux sociaux, blogs, wikis.", difficulty: "easy", tags: ["medias", "digital"] },
          { id: "q-me3", question: "La liberalisation des ondes radio en France date de :", options: ["1967", "1974", "1981", "1987"], correctIndex: 2, explanation: "1981 : Mitterrand liberalise les ondes = naissance des radios libres. 1967 = TV couleur. 1987 = privatisation TF1. 1974 = eclatement de l'ORTF.", difficulty: "medium", tags: ["medias", "radio"] },
          { id: "q-me4", question: "TF1 a ete privatisee en :", options: ["1975", "1981", "1987", "1995"], correctIndex: 2, explanation: "TF1 est privatisee en 1987 sous le gouvernement Chirac (cohabitation). Elle devient la premiere chaine privee en France, rachetee par le groupe Bouygues.", difficulty: "medium", tags: ["medias", "television"] },
        ],
      },
      {
        id: "role-medias-societe",
        title: "Role des medias dans la societe",
        content: `Les medias jouent un role fondamental dans les societes democratiques. Plusieurs theories analysent leur influence :

AGENDA-SETTING (McCombs & Shaw, 1972) : les medias ne disent pas aux gens QUOI penser, mais A QUOI penser. Ils fixent l'ORDRE DU JOUR : les sujets couverts deviennent les sujets importants pour le public.

SPIRALE DU SILENCE (Noelle-Neumann, 1974) : les individus qui pensent etre en minorite ont tendance a se taire, par peur de l'isolement social. Les medias renforcent ce phenomene en donnant l'impression qu'une opinion est dominante.

GATEKEEPING (Kurt Lewin, 1947) : les journalistes sont des 'gardiens de porte' qui selectionnent quelles informations passent et lesquelles sont filtrees. Ils controlent l'acces a l'information.

4e POUVOIR : les medias sont consideres comme le 4e pouvoir (apres legislatif, executif, judiciaire). Ils exercent un contrepouvoir en informant les citoyens et en controlant les gouvernants.

PLURALISME : la diversite des medias est essentielle a la democratie. Le CSA (devenu ARCOM en 2022) veille au pluralisme des opinions dans les medias audiovisuels.`,
        keyPoints: [
          "Agenda-setting (McCombs & Shaw) : les medias fixent l'ordre du jour",
          "Spirale du silence (Noelle-Neumann) : la majorite percue fait taire les minorites",
          "Gatekeeping : les journalistes filtrent l'information",
          "4e pouvoir : contrepouvoir democratique",
          "Pluralisme : diversite des medias = sante democratique",
        ],
        flashcards: [
          { id: "f-me6", front: "Qu'est-ce que l'AGENDA-SETTING ? Qui l'a theorise ?", back: "McCombs & Shaw (1972) : les medias ne disent pas QUOI penser mais A QUOI penser. Ils fixent l'ORDRE DU JOUR en choisissant quels sujets couvrir. Les sujets mediatises deviennent 'importants' pour le public.", difficulty: "medium", tags: ["medias", "theories"] },
          { id: "f-me7", front: "Qu'est-ce que la SPIRALE DU SILENCE ?", back: "Theorie de Noelle-Neumann (1974) : les individus qui pensent etre MINORITAIRES se taisent par peur de l'isolement social. Les medias amplifient le phenomene en donnant l'impression qu'une opinion domine.", difficulty: "hard", tags: ["medias", "theories"] },
          { id: "f-me8", front: "Qu'est-ce que le GATEKEEPING ?", back: "Theorie de Kurt Lewin (1947) : les journalistes/redacteurs sont des 'gardiens de porte' (gatekeepers) qui SELECTIONNENT quelles informations sont publiees et lesquelles sont filtrees. Ils controlent l'agenda mediatique.", difficulty: "medium", tags: ["medias", "gatekeeping"] },
          { id: "f-me9", front: "Pourquoi dit-on que les medias sont le '4e pouvoir' ?", back: "Apres les 3 pouvoirs (legislatif, executif, judiciaire), les medias exercent un CONTREPOUVOIR en informant les citoyens et en controlant l'action des gouvernants. Ils sont essentiels a la democratie.", difficulty: "easy", tags: ["medias", "democratie"] },
          { id: "f-me10", front: "Qu'est-ce que l'ARCOM et quel est son role ?", back: "L'ARCOM (Autorite de regulation de la communication audiovisuelle et numerique) remplace le CSA depuis 2022. Elle veille au PLURALISME des opinions, a la protection des mineurs, et regule l'audiovisuel et le numerique.", difficulty: "medium", tags: ["medias", "regulation"] },
        ],
        quiz: [
          { id: "q-me5", question: "L'agenda-setting signifie que les medias :", options: ["Disent aux gens quoi penser", "Fixent les sujets dont on parle", "Controlent le gouvernement", "Creent de la desinformation"], correctIndex: 1, explanation: "Agenda-setting (McCombs & Shaw) : les medias fixent l'ORDRE DU JOUR. Ils ne disent pas QUOI penser, mais A QUOI penser. Les sujets mediatises deviennent prioritaires dans l'opinion publique.", difficulty: "medium", tags: ["medias"] },
          { id: "q-me6", question: "La spirale du silence decrit :", options: ["Le silence radio en temps de crise", "Le fait que les minorites se taisent", "L'absence de medias dans certains pays", "Le silence entre deux emissions"], correctIndex: 1, explanation: "Noelle-Neumann : les individus qui se percoivent MINORITAIRES se taisent par peur de l'isolement social. La spirale s'amplifie : moins on entend une opinion, plus elle semble minoritaire.", difficulty: "hard", tags: ["medias"] },
          { id: "q-me7", question: "L'ARCOM a remplace le CSA en :", options: ["2018", "2020", "2022", "2024"], correctIndex: 2, explanation: "L'ARCOM (fusion CSA + Hadopi) a ete creee en 2022. Elle regule l'audiovisuel ET le numerique (plateformes, reseaux sociaux). Le CSA n'existait plus depuis.", difficulty: "medium", tags: ["medias", "regulation"] },
        ],
      },
      {
        id: "enjeux-numeriques",
        title: "Enjeux numeriques contemporains",
        content: `Le numerique a bouleverse la communication et souleve des enjeux majeurs :

FAKE NEWS et DESINFORMATION : fausses informations diffusees intentionnellement pour manipuler. Les RS accelerent leur propagation virale. Fact-checking (AFP, Le Monde Decodeurs) comme reponse.

INFOBESITE : surcharge informationnelle. Un individu est expose a 3000-5000 messages publicitaires par jour. L'attention devient une ressource rare (economie de l'attention).

BULLES DE FILTRE (Eli Pariser, 2011) : les algorithmes des plateformes nous enferment dans des bulles ou on ne voit que du contenu qui confirme nos opinions. Cela polarise le debat public.

GAFAM (Google, Apple, Facebook/Meta, Amazon, Microsoft) : concentration du pouvoir numerique. Ils controlent les donnees, les algorithmes, la publicite en ligne. Enjeux de souverainete numerique.

ECONOMIE DE L'ATTENTION : l'attention humaine est limitee et devient la ressource la plus convoitee. Les plateformes utilisent le 'design persuasif' (notifications, scroll infini, likes) pour capter et retenir l'attention.`,
        keyPoints: [
          "Fake news : desinformation virale, fact-checking comme reponse",
          "Infobesite : 3000-5000 messages pub/jour, attention rare",
          "Bulles de filtre (Pariser) : algorithmes qui enferment dans ses opinions",
          "GAFAM : concentration du pouvoir numerique",
          "Economie de l'attention : design persuasif, scroll infini, notifications",
        ],
        flashcards: [
          { id: "f-me11", front: "Qu'est-ce qu'une BULLE DE FILTRE ? Qui a theorise ce concept ?", back: "Eli PARISER (2011) : les algorithmes des plateformes nous montrent uniquement du contenu qui correspond a nos preferences/opinions. On est 'enferme' dans une bulle qui confirme ce qu'on pense deja.", difficulty: "medium", tags: ["numerique", "algorithmes"] },
          { id: "f-me12", front: "Qu'est-ce que l'ECONOMIE DE L'ATTENTION ?", back: "L'attention humaine est LIMITEE et devient la ressource la plus convoitee par les medias et plateformes. Le design persuasif (notifications, scroll infini, likes, autoplay) vise a CAPTER et RETENIR l'attention le plus longtemps possible.", difficulty: "medium", tags: ["numerique", "attention"] },
          { id: "f-me13", front: "Que signifie GAFAM et pourquoi c'est un enjeu ?", back: "Google, Apple, Facebook (Meta), Amazon, Microsoft. Ces 5 geants controlent une part enorme des donnees, de la pub en ligne et des algorithmes. Enjeux : monopole, donnees personnelles, souverainete numerique, fiscalite.", difficulty: "easy", tags: ["numerique", "gafam"] },
          { id: "f-me14", front: "Combien de messages publicitaires un individu recoit-il par jour ?", back: "Entre 3000 et 5000 messages publicitaires par jour. C'est l'INFOBESITE (surcharge informationnelle). Consequence : banner blindness (on ne voit plus les pubs), attention fragmentee.", difficulty: "easy", tags: ["numerique", "infobesite"] },
        ],
        quiz: [
          { id: "q-me8", question: "Les bulles de filtre ont ete theorisees par :", options: ["McCombs & Shaw", "Noelle-Neumann", "Eli Pariser", "Kurt Lewin"], correctIndex: 2, explanation: "Eli PARISER a publie 'The Filter Bubble' en 2011. Il montre que les algorithmes des plateformes nous enferment dans des bulles qui confirment nos opinions existantes.", difficulty: "easy", tags: ["numerique"] },
          { id: "q-me9", question: "L'economie de l'attention repose sur le constat que :", options: ["L'argent manque dans les medias", "L'attention humaine est une ressource limitee", "Les consommateurs sont trop attentifs", "La publicite est inefficace"], correctIndex: 1, explanation: "L'attention humaine est LIMITEE et RARE face a la surabondance d'informations. Les plateformes se battent pour capter cette attention (scroll infini, notifications, autoplay).", difficulty: "medium", tags: ["numerique"] },
        ],
      },
      {
        id: "rse-communication-responsable",
        title: "RSE et communication responsable",
        content: `La RSE (Responsabilite Societale des Entreprises) a un impact croissant sur la communication :

GREENWASHING : faire croire qu'on est ecologique sans l'etre reellement. Utiliser du vert, des feuilles, des termes vagues ('naturel', 'eco-friendly') sans preuves. L'ARPP (Autorite de Regulation Professionnelle de la Publicite) sanctionne les abus.

SOCIAL WASHING : pretendre des engagements sociaux (diversite, egalite) sans actions concretes. Ex : marque qui affiche un logo arc-en-ciel en juin (Pride) sans politique interne inclusive.

PURPOSE WASHING : se donner une 'raison d'etre' marketing sans coherence avec les pratiques reelles. Le consommateur est de plus en plus mefiant.

LOI CLIMAT ET RESILIENCE (2021) : interdit certaines publicites pour les energies fossiles. Obligation de mentions ('En avoir vraiment besoin ? #LaPubliciteNousInfluence'). Renforce la regulation du greenwashing.

COMMUNICATION RESPONSABLE : charte de l'UDA (Union des Annonceurs), referentiel ISO 26000, labels (B Corp, RSE). Tendance : transparence, preuves, engagement sincere.`,
        keyPoints: [
          "Greenwashing : fausse communication ecologique",
          "Social washing / Purpose washing : engagements de facade",
          "Loi Climat 2021 : interdit certaines pubs energies fossiles",
          "ARPP : autoregulation de la publicite",
          "Communication responsable : transparence, preuves, sincerite",
        ],
        flashcards: [
          { id: "f-me15", front: "Qu'est-ce que le GREENWASHING ? Donnez un exemple.", back: "Faire croire qu'une marque/produit est ECOLOGIQUE sans fondement reel. Exemples : utiliser du vert et des feuilles sur un produit polluant, dire 'naturel' sans certification. L'ARPP et la loi Climat luttent contre.", difficulty: "easy", tags: ["rse", "greenwashing"] },
          { id: "f-me16", front: "Qu'est-ce que le SOCIAL WASHING ?", back: "Pretendre des engagements SOCIAUX (diversite, inclusion, egalite) sans actions concretes. Ex : logo arc-en-ciel en juin sans politique interne inclusive, pub feministe d'une marque avec ecart salarial H/F.", difficulty: "medium", tags: ["rse", "social-washing"] },
          { id: "f-me17", front: "Quel est le role de l'ARPP ?", back: "L'Autorite de Regulation Professionnelle de la Publicite : organisme d'AUTOREGULATION de la pub en France. Elle verifie la conformite des pubs avant diffusion et peut recommander le retrait de publicites trompeuses.", difficulty: "medium", tags: ["rse", "regulation"] },
          { id: "f-me18", front: "Que prevoit la loi Climat et Resilience (2021) en matiere de pub ?", back: "Interdit la pub pour les energies fossiles. Impose des mentions obligatoires. Renforce la lutte contre le greenwashing. Oblige les annonceurs a prouver leurs allegations environnementales.", difficulty: "hard", tags: ["rse", "loi-climat"] },
          { id: "f-me19", front: "Qu'est-ce que le PURPOSE WASHING ?", back: "Se donner une 'raison d'etre' (purpose) marketing sans coherence avec les pratiques reelles. Ex : une marque de fast-fashion qui se dit 'engagee pour la planete'. Le consommateur detecte de plus en plus l'incoherence.", difficulty: "hard", tags: ["rse", "purpose-washing"] },
        ],
        quiz: [
          { id: "q-me10", question: "Le greenwashing consiste a :", options: ["Laver les produits verts", "Faire croire qu'on est ecologique sans l'etre", "Investir dans le developpement durable", "Avoir une certification bio"], correctIndex: 1, explanation: "Greenwashing = communication TROMPEUSE sur les qualites ecologiques d'un produit/marque. Utiliser du vert, des feuilles, dire 'naturel' sans preuve. L'ARPP et la loi Climat le combattent.", difficulty: "easy", tags: ["rse"] },
          { id: "q-me11", question: "L'ARPP est :", options: ["Un media d'Etat", "L'autorite d'autoregulation de la publicite", "Le regulateur de l'audiovisuel", "Un syndicat de journalistes"], correctIndex: 1, explanation: "ARPP = Autorite de Regulation Professionnelle de la Publicite. C'est un organisme d'AUTOREGULATION (pas une autorite d'Etat). Elle verifie la conformite ethique des publicites.", difficulty: "medium", tags: ["rse", "regulation"] },
          { id: "q-me12", question: "La loi Climat et Resilience date de :", options: ["2018", "2019", "2021", "2023"], correctIndex: 2, explanation: "Loi Climat et Resilience = 2021. Elle interdit les pubs pour energies fossiles, renforce la lutte contre le greenwashing, et impose des mentions dans certaines publicites.", difficulty: "medium", tags: ["rse", "loi"] },
        ],
      },
    ],
  },
  {
    id: "methodologie-e1",
    title: "Methodologie E1",
    exam: "e1",
    chapters: [
      {
        id: "format-officiel-e1",
        title: "Format officiel E1 2026",
        content: `L'epreuve E1 'Cultures de la communication' est un examen ecrit de 4 heures, coefficient 3.

Le sujet est compose d'un CORPUS de documents (4 a 6 documents : textes, images, publicites, articles) autour d'un theme lie aux thematiques officielles.

STRUCTURE DE L'EPREUVE (3 questions) :
- Question 1 (environ 8 points) : REPERER les positions des auteurs du corpus. Identifier theses, nuances, oppositions. Reformuler. Relier a la communication.
- Question 2 (environ 6 points) : ANALYSER une campagne/document visuel. Procedes semiologiques, rhetoriques, visuels. Cible, positionnement, message.
- Question 3 (environ 6 points) : CONCEVOIR et REDIGER un message de communication. Brief, cible, contraintes. Justifier chaque choix.

Les 20 points sont repartis entre les 3 questions. L'orthographe et la qualite de l'expression ecrite comptent.`,
        keyPoints: [
          "4 heures, coefficient 3, 20 points",
          "Corpus de 4 a 6 documents",
          "Q1 (~8pts) : reperer les positions du corpus",
          "Q2 (~6pts) : analyser une campagne/visuel",
          "Q3 (~6pts) : concevoir et rediger un message justifie",
        ],
        flashcards: [
          { id: "f-mt1", front: "Quelle est la duree et le coefficient de l'epreuve E1 ?", back: "4 heures, coefficient 3. C'est l'epreuve de 'Cultures de la communication'. Elle porte sur un corpus de documents lies aux thematiques officielles.", difficulty: "easy", tags: ["methodologie", "e1"] },
          { id: "f-mt2", front: "Combien de questions comporte l'epreuve E1 et quels sont leurs enjeux ?", back: "3 questions : Q1 = REPERER les positions du corpus (~8pts). Q2 = ANALYSER une campagne (~6pts). Q3 = CONCEVOIR un message justifie (~6pts).", difficulty: "easy", tags: ["methodologie", "e1"] },
          { id: "f-mt3", front: "Quel type de documents compose le corpus E1 ?", back: "4 a 6 documents varies : textes (articles, essais, extraits d'ouvrages), images (affiches, publicites, photos de presse), campagnes de communication. Tous lies au theme officiel.", difficulty: "medium", tags: ["methodologie", "corpus"] },
          { id: "f-mt4", front: "PIEGE EXAMEN : Quelle est l'erreur la plus frequente a la Q1 ?", back: "PARAPHRASER au lieu de REFORMULER et ANALYSER. Il faut identifier la THESE de chaque document, montrer les NUANCES et OPPOSITIONS entre les textes, et faire le LIEN avec la communication.", difficulty: "hard", tags: ["methodologie", "piege"] },
        ],
        quiz: [
          { id: "q-mt1", question: "L'epreuve E1 dure :", options: ["2 heures", "3 heures", "4 heures", "5 heures"], correctIndex: 2, explanation: "E1 = 4 heures, coefficient 3. C'est l'epreuve la plus longue du BTS Communication. Elle comporte 3 questions sur un corpus de documents.", difficulty: "easy", tags: ["methodologie"] },
          { id: "q-mt2", question: "La Question 1 de l'E1 consiste a :", options: ["Rediger une publicite", "Analyser une image", "Reperer les positions des auteurs du corpus", "Construire un plan de communication"], correctIndex: 2, explanation: "Q1 = REPERER et REFORMULER les positions des auteurs. Il faut identifier theses, nuances, oppositions et relier a la communication. C'est la question la plus dotee (~8 points).", difficulty: "easy", tags: ["methodologie"] },
          { id: "q-mt3", question: "La Question 3 de l'E1 demande de :", options: ["Resumer le corpus", "Concevoir et rediger un message de communication justifie", "Faire un SWOT", "Analyser une figure de style"], correctIndex: 1, explanation: "Q3 = CONCEVOIR et REDIGER un message (slogan, affiche, post RS...) en repondant a un brief. Il faut JUSTIFIER chaque choix (cible, ton, canal, procedes).", difficulty: "medium", tags: ["methodologie"] },
        ],
      },
      {
        id: "methode-q1",
        title: "Question 1 : Reperer les positions du corpus",
        content: `La Q1 (~8 points) est la plus importante. Il faut montrer qu'on comprend les enjeux du corpus.

METHODE PAS A PAS :
1. LIRE le corpus entier une premiere fois pour identifier le THEME global
2. Pour CHAQUE document, identifier :
   - La THESE principale (position de l'auteur)
   - Les ARGUMENTS avances
   - Le POINT DE VUE : pour, contre, nuance
3. REGROUPER les documents par position : ceux qui convergent, ceux qui s'opposent, ceux qui nuancent
4. REDIGER une synthese organisee :
   - Introduction : presenter le theme et les documents
   - Developpement : confronter les positions (accords, desaccords, nuances)
   - Ouverture : lien avec la communication professionnelle

ERREURS A EVITER :
- Traiter les documents UN par UN (il faut les CONFRONTER)
- Paraphraser sans analyser
- Oublier de faire le lien avec la COMMUNICATION
- Ne pas citer les documents (utiliser "doc 1", "doc 2"...)`,
        keyPoints: [
          "Identifier la these de CHAQUE document",
          "CONFRONTER les positions (pas traiter un par un)",
          "Regrouper : convergences, oppositions, nuances",
          "Toujours faire le lien avec la COMMUNICATION",
        ],
        flashcards: [
          { id: "f-mt5", front: "Quelle est la methode pour repondre a la Q1 de l'E1 ?", back: "1. Identifier la THESE de chaque document. 2. Reperer arguments et points de vue. 3. CONFRONTER les positions (convergences/oppositions/nuances). 4. Rediger une synthese avec lien a la communication.", difficulty: "medium", tags: ["methodologie", "q1"] },
          { id: "f-mt6", front: "Quelle est l'erreur N 1 a eviter a la Q1 ?", back: "Traiter les documents UN PAR UN au lieu de les CONFRONTER. Le jury veut voir une synthese croisee : 'Doc 1 et Doc 3 convergent sur X, tandis que Doc 2 nuance en montrant Y'.", difficulty: "hard", tags: ["methodologie", "q1", "piege"] },
          { id: "f-mt7", front: "Comment faire le lien avec la communication a la Q1 ?", back: "Toujours relier les positions des auteurs aux ENJEUX de la communication : comment ces debats impactent-ils les pratiques des communicants ? Quels choix strategiques en decoulent ?", difficulty: "hard", tags: ["methodologie", "q1"] },
        ],
        quiz: [
          { id: "q-mt4", question: "A la Q1, il faut traiter les documents :", options: ["Un par un dans l'ordre", "En les confrontant entre eux", "Seulement les textes, pas les images", "En les resumant chacun"], correctIndex: 1, explanation: "Il faut CONFRONTER les documents : montrer les convergences, les oppositions et les nuances entre les differents auteurs. Le traitement un par un est sanctionne.", difficulty: "easy", tags: ["methodologie"] },
          { id: "q-mt5", question: "Le lien avec la communication a la Q1 signifie :", options: ["Citer des theories de Shannon", "Montrer comment le debat impacte les pratiques de communication", "Analyser les figures de style", "Rediger un message publicitaire"], correctIndex: 1, explanation: "Le lien avec la communication = montrer en quoi les positions du corpus eclairent les PRATIQUES des communicants, les choix strategiques, les enjeux professionnels.", difficulty: "medium", tags: ["methodologie"] },
        ],
      },
      {
        id: "methode-q2",
        title: "Question 2 : Analyser une campagne",
        content: `La Q2 (~6 points) demande d'analyser un document visuel ou une campagne de communication du corpus.

GRILLE D'ANALYSE COMPLETE :

1. CONTEXTE : annonceur, marque, produit, date, support de diffusion
2. PROCEDES VISUELS :
   - Composition : cadrage, plans, lignes directrices, point de fuite
   - Couleurs : dominantes, symbolique (rouge = passion, vert = nature, noir = luxe)
   - Typographie : police (serif = classique, sans-serif = moderne), taille, graisse
   - Photographie/illustration : type d'image, eclairage, mise en scene
3. PROCEDES REDACTIONNELS :
   - Slogan/accroche : message principal, ton
   - Figures de style : metaphore, hyperbole, antithese...
   - Registre de langue : soutenu, courant, familier
4. ANALYSE SEMIOLOGIQUE :
   - Denotation/connotation (Barthes)
   - Type de signes (Peirce)
   - References culturelles, intertextualite
5. STRATEGIE :
   - Cible visee (qui ?)
   - Positionnement (quelle image ?)
   - Objectif (connaitre/aimer/agir)
   - Message cle et benefice consommateur`,
        keyPoints: [
          "Contexte : annonceur, produit, support",
          "Procedes visuels : composition, couleurs, typo",
          "Procedes redactionnels : slogan, figures de style, registre",
          "Semiologie : denotation/connotation, signes",
          "Strategie : cible, positionnement, objectif, message",
        ],
        flashcards: [
          { id: "f-mt8", front: "Quels sont les 5 axes d'analyse d'une campagne pour la Q2 ?", back: "1. CONTEXTE (annonceur, produit). 2. PROCEDES VISUELS (couleurs, typo, composition). 3. PROCEDES REDACTIONNELS (slogan, figures). 4. SEMIOLOGIE (denotation/connotation). 5. STRATEGIE (cible, objectif).", difficulty: "medium", tags: ["methodologie", "q2"] },
          { id: "f-mt9", front: "Quelle symbolique des couleurs utiliser dans l'analyse Q2 ?", back: "Rouge = passion/urgence. Vert = nature/sante. Bleu = confiance/technologie. Noir = luxe/elegance. Blanc = purete. Or = prestige. Rose = feminite. Violet = creativite/mystere.", difficulty: "medium", tags: ["methodologie", "couleurs"] },
          { id: "f-mt10", front: "Comment structurer sa reponse a la Q2 ?", back: "1. Presentation du document (contexte). 2. Description DENOTEE (ce qu'on voit objectivement). 3. Analyse CONNOTEE (ce que ca suggere). 4. Procedes rhetoriques utilises. 5. Synthese strategique (cible, objectif, positionnement).", difficulty: "hard", tags: ["methodologie", "q2"] },
        ],
        quiz: [
          { id: "q-mt6", question: "L'analyse denotee d'une affiche publicitaire consiste a :", options: ["Interpreter les symboles", "Decrire objectivement ce qu'on voit", "Identifier la cible", "Analyser les figures de style"], correctIndex: 1, explanation: "DENOTATION = description OBJECTIVE et LITTERALE. 'On voit une femme en robe blanche dans un champ de ble.' La connotation viendra apres : purete, nature, liberte...", difficulty: "easy", tags: ["methodologie"] },
          { id: "q-mt7", question: "Une police serif (avec empattements) connote :", options: ["La modernite et la technologie", "Le classicisme et la tradition", "La rebellion et la jeunesse", "L'ecologie et la nature"], correctIndex: 1, explanation: "Serif (Times, Garamond) = CLASSICISME, tradition, serieux, luxe. Sans-serif (Helvetica, Arial) = modernite, simplicite. Script = elegance. Display = creativite.", difficulty: "medium", tags: ["methodologie", "typo"] },
          { id: "q-mt8", question: "Dans l'analyse strategique d'une campagne, il faut identifier :", options: ["Uniquement les couleurs", "La cible, le positionnement et l'objectif", "Le budget media", "Le nom du graphiste"], correctIndex: 1, explanation: "L'analyse strategique identifie : la CIBLE (a qui s'adresse-t-on ?), le POSITIONNEMENT (quelle image ?), l'OBJECTIF (connaitre/aimer/agir) et le MESSAGE CLE.", difficulty: "easy", tags: ["methodologie"] },
        ],
      },
      {
        id: "methode-q3",
        title: "Question 3 : Concevoir et rediger un message justifie",
        content: `La Q3 (~6 points) demande de CREER un message de communication en repondant a un brief precis.

METHODE PAS A PAS :
1. LIRE LE BRIEF attentivement : identifier la cible, l'objectif, les contraintes (format, ton, canal)
2. CHOISIR le format : slogan, accroche, post RS, communique, affiche...
3. DEFINIR le ton : humoristique, emotionnel, informatif, decale, provocant...
4. REDIGER le message en utilisant des procedes rhetoriques identifies
5. JUSTIFIER chaque choix dans un paragraphe d'argumentation :
   - Pourquoi CE format ? (adapte a la cible et au canal)
   - Pourquoi CE ton ? (coherent avec le positionnement)
   - Pourquoi CETTE figure de style ? (effet recherche sur la cible)
   - Pourquoi CE vocabulaire ? (registre adapte a la cible)

ATTENTION : la JUSTIFICATION vaut autant que la creation elle-meme ! Un message moyen bien justifie obtient plus de points qu'un message brillant sans justification.

GESTION DU TEMPS :
- Q1 : 1h30 (la plus dotee en points)
- Q2 : 1h15
- Q3 : 1h
- Relecture : 15 min`,
        keyPoints: [
          "Lire le brief : cible + objectif + contraintes",
          "Choisir format, ton, procedes rhetoriques",
          "JUSTIFIER chaque choix (vaut autant que la creation)",
          "Gestion du temps : 1h30 / 1h15 / 1h / 15min relecture",
        ],
        flashcards: [
          { id: "f-mt11", front: "Quelle est la cle pour reussir la Q3 de l'E1 ?", back: "La JUSTIFICATION ! Chaque choix creatif doit etre ARGUMENTE : pourquoi ce format, ce ton, cette figure de style, ce vocabulaire ? Un message moyen bien justifie > un message brillant non justifie.", difficulty: "medium", tags: ["methodologie", "q3"] },
          { id: "f-mt12", front: "Comment gerer le temps sur 4h a l'E1 ?", back: "Q1 = 1h30 (~8pts, la plus dotee). Q2 = 1h15. Q3 = 1h. Relecture = 15 min. Commencer par la question ou on est le plus a l'aise. Ne JAMAIS sauter la relecture.", difficulty: "easy", tags: ["methodologie", "temps"] },
          { id: "f-mt13", front: "Quels elements du brief faut-il absolument identifier a la Q3 ?", back: "1. La CIBLE (a qui on s'adresse). 2. L'OBJECTIF (connaitre/aimer/agir). 3. Les CONTRAINTES (format, canal, budget, ton impose). 4. Le CONTEXTE (theme, annonceur, problematique).", difficulty: "medium", tags: ["methodologie", "q3"] },
          { id: "f-mt14", front: "PIEGE EXAMEN : A la Q3, faut-il faire un brouillon ?", back: "OUI, absolument ! Ecrire directement au propre est risque. Le brouillon permet de tester plusieurs idees, de structurer la justification, et d'eviter les ratures au propre. Le jury apprecie une copie propre.", difficulty: "easy", tags: ["methodologie", "q3"] },
        ],
        quiz: [
          { id: "q-mt9", question: "A la Q3, la justification des choix creatifs :", options: ["Est facultative", "Vaut autant que la creation elle-meme", "Ne concerne que le slogan", "Doit etre orale"], correctIndex: 1, explanation: "La JUSTIFICATION est ESSENTIELLE et vaut autant que la creation. Il faut expliquer POURQUOI chaque choix a ete fait : format, ton, figures, vocabulaire, canal.", difficulty: "easy", tags: ["methodologie"] },
          { id: "q-mt10", question: "La repartition du temps recommandee pour l'E1 est :", options: ["1h/1h/1h/1h", "1h30/1h15/1h/15min relecture", "2h/1h/1h/0min", "45min/45min/45min/1h45"], correctIndex: 1, explanation: "Q1 = 1h30 (plus de points). Q2 = 1h15. Q3 = 1h. Relecture = 15 min. Ne jamais sacrifier la relecture !", difficulty: "medium", tags: ["methodologie"] },
        ],
      },
    ],
  },
  {
    id: "thematiques-2026",
    title: "Thematiques 2026",
    exam: "e1",
    chapters: [
      {
        id: "a-table",
        title: "A table ! Formes et enjeux du repas",
        content: `Le repas est un fait social total (Marcel Mauss) : il engage des dimensions culturelles, economiques, symboliques et communicationnelles.

LE REPAS COMME FAIT SOCIAL :
- Roland BARTHES, Mythologies (1957) : le steak-frites comme mythe francais, signe d'identite nationale. L'alimentation est un systeme de SIGNES.
- Annie ERNAUX : le repas familial comme marqueur de classe sociale. La nourriture revele l'appartenance sociale.
- Claude LEVI-STRAUSS : le triangle culinaire (cru/cuit/pourri). La cuisine est un langage universel.
- Pierre BOURDIEU, La Distinction : les gouts alimentaires sont lies a la position sociale (opposition 'nourriture bourgeoise' vs 'nourriture populaire').

COMMUNICATION ALIMENTAIRE :
- FOOD PORN : mise en scene esthetisee de la nourriture sur les RS (Instagram, TikTok). Le plat devient un objet visuel avant d'etre gustatif.
- Labels et certifications : Bio, AOP, Label Rouge, commerce equitable. Ils communiquent la qualite et rassurent le consommateur.
- Marketing sensoriel : couleurs, textures, odeurs, sons (croustillant) utilises dans la pub alimentaire pour stimuler l'appetit.
- Storytelling alimentaire : recettes de grand-mere, terroir, savoir-faire artisanal. Creer une histoire autour du produit.

PARADOXES :
- Malbouffe vs Healthy : la societe oscille entre junk food (McDonald's, Uber Eats) et tendances saines (vegan, superaliments, detox).
- 'Manger Bouger' vs pub junk food : les mentions sanitaires obligatoires contredisent les messages publicitaires.
- Abondance vs gaspillage : 10 millions de tonnes de nourriture gaspillees en France/an vs insecurite alimentaire.

CAMPAGNES REMARQUABLES :
- INTERMARCHE 'Fruits et legumes moches' (2014) : valoriser les produits 'hors calibre'. Enorme succes viral.
- DANONE : communication autour de la sante et du microbiote ('Activia').
- McDONALD'S image : transformation d'image via salades, bois, label 'bleu blanc coeur', transparence sur les approvisionnements.
- YUKA (appli) : a bouleverse la communication alimentaire en donnant au consommateur l'info nutritionnelle en direct.`,
        keyPoints: [
          "Le repas = fait social total (Mauss) + systeme de signes (Barthes)",
          "Food porn, labels, marketing sensoriel, storytelling",
          "Paradoxe malbouffe/healthy, Manger Bouger vs pub",
          "Campagnes : Intermarche moches, Danone, McDonald's image, Yuka",
        ],
        didYouKnow: "La campagne 'Fruits et legumes moches' d'Intermarche (2014) a genere 2,3 milliards d'impressions media et fait baisser le gaspillage alimentaire en magasin de 24% en 2 jours !",
        flashcards: [
          { id: "f-th1", front: "Comment Barthes analyse-t-il l'alimentation dans Mythologies ?", back: "Barthes analyse le steak-frites comme un MYTHE francais, un signe d'identite nationale. L'alimentation est un systeme de SIGNES culturels. Manger n'est jamais un acte 'neutre', c'est un acte de COMMUNICATION.", difficulty: "medium", tags: ["thematiques", "table", "barthes"] },
          { id: "f-th2", front: "Qu'est-ce que le FOOD PORN ?", back: "La mise en scene ESTHETISEE de la nourriture sur les reseaux sociaux. Le plat devient un objet VISUEL, photographie et partage. Tres present sur Instagram et TikTok. C'est de la communication plus que de la gastronomie.", difficulty: "easy", tags: ["thematiques", "table", "foodporn"] },
          { id: "f-th3", front: "Quelle campagne a valorise les 'fruits et legumes moches' ?", back: "INTERMARCHE (2014) : campagne virale valorisant les produits hors calibre. 2,3 milliards d'impressions. Message : ces fruits sont aussi bons, moins chers, et on evite le gaspillage. Enorme succes de RP.", difficulty: "easy", tags: ["thematiques", "table", "campagne"] },
          { id: "f-th4", front: "Quel est le paradoxe entre 'Manger Bouger' et la publicite alimentaire ?", back: "Les mentions sanitaires ('Manger 5 fruits et legumes') obligatoires depuis 2007 CONTREDISENT souvent le message publicitaire (hamburger geant, bonbons). Le consommateur recoit des injonctions contradictoires.", difficulty: "medium", tags: ["thematiques", "table", "paradoxe"] },
          { id: "f-th5", front: "Qu'est-ce que le marketing SENSORIEL en alimentation ?", back: "Utiliser les 5 sens pour communiquer : couleurs vives (vue), textures (toucher), odeurs de boulangerie (odorat), croustillant amplifie (ouie), degustations (gout). Le packaging joue aussi un role sensoriel.", difficulty: "medium", tags: ["thematiques", "table", "marketing"] },
          { id: "f-th6", front: "Comment McDonald's a-t-il transforme son image en France ?", back: "Passage du rouge/jaune au VERT (eco-responsable). Salades, bois naturel dans les restaurants, sourcing local ('Bleu Blanc Coeur'), transparence sur les ingredients. Strategie de REPOSITIONNEMENT d'image.", difficulty: "hard", tags: ["thematiques", "table", "campagne"] },
          { id: "f-th7", front: "Qu'est-ce que La Distinction de BOURDIEU et son lien avec l'alimentation ?", back: "Bourdieu montre que les GOUTS alimentaires revelent la POSITION SOCIALE. La 'nourriture bourgeoise' (raffinee, legere) s'oppose a la 'nourriture populaire' (consistante, abondante). Manger est un acte de distinction sociale.", difficulty: "hard", tags: ["thematiques", "table", "bourdieu"] },
        ],
        quiz: [
          { id: "q-th1", question: "Dans Mythologies, Barthes analyse le steak-frites comme :", options: ["Un simple plat populaire", "Un mythe et un signe d'identite nationale", "Une invention marketing", "Un symbole de malbouffe"], correctIndex: 1, explanation: "Barthes analyse le steak-frites comme un MYTHE francais : un signe culturel qui connote la virilite, la francite, le populaire. L'alimentation est un systeme de signes.", difficulty: "medium", tags: ["thematiques", "table"] },
          { id: "q-th2", question: "La campagne 'Fruits et legumes moches' est une campagne de :", options: ["Danone", "Carrefour", "Intermarche", "Lidl"], correctIndex: 2, explanation: "INTERMARCHE (2014). Campagne virale qui a valorise les fruits/legumes hors calibre pour lutter contre le gaspillage alimentaire. Grand Prix Effie.", difficulty: "easy", tags: ["thematiques", "table"] },
          { id: "q-th3", question: "L'application Yuka a bouleverse la communication alimentaire car :", options: ["Elle cree des publicites", "Elle donne au consommateur l'info nutritionnelle en direct", "Elle livre des repas", "Elle est geree par l'Etat"], correctIndex: 1, explanation: "Yuka a DEMOCRATISE l'information nutritionnelle : le consommateur scanne le produit et obtient un score. Cela force les marques a plus de TRANSPARENCE et a reformuler leurs produits.", difficulty: "medium", tags: ["thematiques", "table"] },
          { id: "q-th4", question: "Le food porn designe :", options: ["La nourriture aphrodisiaque", "La mise en scene esthetisee de la nourriture sur les RS", "La publicite mensongere alimentaire", "Les photos dans les menus de restaurant"], correctIndex: 1, explanation: "Food porn = mise en scene ESTHETISEE et photogenique de la nourriture, principalement sur Instagram et TikTok. Le plat est photographie pour etre PARTAGE, pas seulement mange.", difficulty: "easy", tags: ["thematiques", "table"] },
          { id: "q-th5", question: "Les mentions 'Manger Bouger' dans les pubs alimentaires sont obligatoires depuis :", options: ["2001", "2004", "2007", "2010"], correctIndex: 2, explanation: "Depuis 2007, les publicites alimentaires doivent comporter des mentions sanitaires ('Manger 5 fruits et legumes par jour', 'Pour votre sante, evitez de manger trop gras, trop sucre, trop sale').", difficulty: "hard", tags: ["thematiques", "table"] },
        ],
      },
      {
        id: "la-rue",
        title: "La rue",
        content: `La rue est un espace de communication multiforme : affichage, street marketing, art urbain, manifestations, signalisation.

LA RUE COMME ESPACE DE COMMUNICATION :
- Guillaume APOLLINAIRE, 'Zone' (1913) : le poete se promene dans Paris et decrit la ville comme un texte a lire. Les enseignes, affiches, panneaux sont de la 'poesie visuelle'.
- Georges PEREC, 'Tentative d'epuisement d'un lieu parisien' (1975) : Perec s'assoit Place Saint-Sulpice et decrit TOUT ce qu'il voit. La rue est saturee de signes.
- Michel DE CERTEAU, 'L'invention du quotidien' : le passant est un 'pratiquant de la ville', il cree son propre parcours. La rue est un espace de PRATIQUES, pas seulement de circulation.

STREET MARKETING ET GUERILLA MARKETING :
- Street marketing : actions de communication dans la RUE pour creer la surprise et le buzz. Distribution de flyers, animations, installations.
- Guerilla marketing (Jay Conrad Levinson) : actions a faible budget mais a FORT IMPACT creatif. Effet de surprise, detournement de l'espace urbain.
- Exemples : Netflix Squid Game aux Champs-Elysees (poupee geante), Volkswagen Piano Stairs (escalier-piano), Coca-Cola Happiness Machine.

ART URBAIN ET COMMUNICATION :
- BANKSY : artiste urbain qui utilise le graffiti comme outil de communication politique et sociale. Ses oeuvres sont des MESSAGES visuels lisibles par tous.
- Le street art pose la question : art ou vandalisme ? Aujourd'hui recupere par les marques et les villes.

ENJEUX :
- Pollution visuelle : surabondance d'affichage, enseignes lumineuses, ecrans publicitaires.
- Villes sans pub : Grenoble (2014, 1ere grande ville francaise a supprimer la pub dans l'espace public), Sao Paulo (2007, 'Cidade Limpa').
- JCDecaux : leader mondial du mobilier urbain publicitaire (Velib', abribus, colonnes Morris).`,
        keyPoints: [
          "La rue = espace de signes (Apollinaire, Perec, de Certeau)",
          "Street marketing / guerilla marketing : surprise, buzz, faible budget",
          "Art urbain : Banksy = communication politique par le graffiti",
          "Pollution visuelle vs villes sans pub (Grenoble, Sao Paulo)",
          "JCDecaux : leader du mobilier urbain publicitaire",
        ],
        didYouKnow: "En 2007, Sao Paulo (Bresil) a vote la 'Cidade Limpa' (Ville Propre) : interdiction TOTALE de la publicite exterieure ! 15 000 panneaux ont ete retires. Grenoble a fait pareil en 2014 en France.",
        flashcards: [
          { id: "f-th8", front: "Comment Apollinaire decrit-il la rue dans 'Zone' ?", back: "Apollinaire (1913) decrit les rues de Paris comme un TEXTE a lire : enseignes, affiches, panneaux sont de la 'poesie visuelle'. La ville est un espace SEMIOLOGIQUE ou les signes se superposent.", difficulty: "medium", tags: ["thematiques", "rue", "apollinaire"] },
          { id: "f-th9", front: "Qu'est-ce que le GUERILLA MARKETING ?", back: "Technique de communication a FAIBLE BUDGET mais a FORT IMPACT creatif (Jay Conrad Levinson). Principe : surprendre le public dans l'espace urbain en detournant les elements quotidiens. Ex : escalier-piano Volkswagen.", difficulty: "medium", tags: ["thematiques", "rue", "guerilla"] },
          { id: "f-th10", front: "Pourquoi Banksy est-il un 'communicant' ?", back: "Banksy utilise le graffiti comme outil de communication POLITIQUE et SOCIALE. Ses oeuvres sont des MESSAGES visuels accessibles a tous dans l'espace public. Il communique sans budget media, par le buzz et la viralite.", difficulty: "medium", tags: ["thematiques", "rue", "banksy"] },
          { id: "f-th11", front: "Qu'est-ce que la 'Cidade Limpa' de Sao Paulo ?", back: "En 2007, Sao Paulo a INTERDIT TOTALEMENT la publicite exterieure (panneaux, enseignes, affiches). 15 000 panneaux retires. Grenoble a suivi en 2014 en France. Debat : liberte commerciale vs pollution visuelle.", difficulty: "hard", tags: ["thematiques", "rue", "sans-pub"] },
          { id: "f-th12", front: "Qu'est-ce que JCDecaux et pourquoi c'est important pour la com ?", back: "JCDecaux = leader mondial du MOBILIER URBAIN publicitaire. Abribus, colonnes Morris, Velib, panneaux numeriques. Modele economique : fournir du mobilier urbain GRATUIT aux villes en echange des espaces publicitaires.", difficulty: "medium", tags: ["thematiques", "rue", "jcdecaux"] },
          { id: "f-th13", front: "Comment Perec observe-t-il la rue dans 'Tentative d'epuisement' ?", back: "Perec (1975) s'assoit Place Saint-Sulpice et note TOUT ce qu'il voit pendant 3 jours : bus, passants, enseignes, pigeons. Il revele la SATURATION de signes dans l'espace urbain et l'ordinaire qu'on ne voit plus.", difficulty: "hard", tags: ["thematiques", "rue", "perec"] },
          { id: "f-th14", front: "Donnez un exemple de street marketing reussi.", back: "Netflix SQUID GAME aux Champs-Elysees (2021) : installation d'une poupee geante de la serie. Enorme buzz sur les RS, milliers de photos partagees. Cout faible vs impact mediatique enorme = pur guerilla marketing.", difficulty: "easy", tags: ["thematiques", "rue", "campagne"] },
        ],
        quiz: [
          { id: "q-th6", question: "La guerilla marketing se caracterise par :", options: ["Un budget eleve et des spots TV", "Un faible budget et un fort impact creatif", "Des campagnes uniquement digitales", "Des publicites dans la presse"], correctIndex: 1, explanation: "Guerilla marketing = FAIBLE BUDGET + FORT IMPACT. Principe : surprendre, detourner, creer du buzz. Theorise par Jay Conrad Levinson. Oppose au marketing traditionnel couteux.", difficulty: "easy", tags: ["thematiques", "rue"] },
          { id: "q-th7", question: "Grenoble est connue en communication pour :", options: ["Avoir accueilli les JO", "Etre la premiere grande ville francaise sans pub", "Avoir invente l'abribus JCDecaux", "Avoir lance le street art en France"], correctIndex: 1, explanation: "Grenoble (2014) = 1ere grande ville francaise a SUPPRIMER la publicite dans l'espace public, remplacee par des arbres et des oeuvres d'art. Suivant l'exemple de Sao Paulo (2007).", difficulty: "medium", tags: ["thematiques", "rue"] },
          { id: "q-th8", question: "Banksy utilise principalement comme support de communication :", options: ["La television", "Les reseaux sociaux", "Les murs de l'espace public", "La presse ecrite"], correctIndex: 2, explanation: "Banksy communique via le GRAFFITI sur les murs. L'espace public est son 'media'. Ses oeuvres sont ensuite relayees sur les RS, mais le support PREMIER est le mur urbain.", difficulty: "easy", tags: ["thematiques", "rue"] },
          { id: "q-th9", question: "L'installation Netflix Squid Game sur les Champs-Elysees est un exemple de :", options: ["Publicite televisee", "Street marketing / guerilla marketing", "Sponsoring sportif", "Publicite native"], correctIndex: 1, explanation: "Installation physique dans l'espace public (poupee geante) = STREET MARKETING. Faible cout vs impact enorme sur les RS = GUERILLA MARKETING. L'objectif : buzz viral.", difficulty: "easy", tags: ["thematiques", "rue"] },
          { id: "q-th10", question: "Michel de Certeau voit le passant comme :", options: ["Un consommateur passif", "Un 'pratiquant de la ville' qui cree son parcours", "Un vandal potentiel", "Un obstacle a la communication"], correctIndex: 1, explanation: "De Certeau (L'invention du quotidien) : le passant n'est pas passif, il PRATIQUE la ville, cree ses propres itineraires, invente son usage de l'espace. Il est ACTEUR, pas simple recepteur.", difficulty: "hard", tags: ["thematiques", "rue"] },
        ],
      },
      {
        id: "exces-communication",
        title: "Trop, c'est trop ? L'exces dans la communication",
        content: `L'exces est omnipresent dans la communication contemporaine : surproduction, surconsommation, saturation mediatique.

L'EXCES DANS LA CULTURE :
- RABELAIS (Gargantua, XVIe siecle) : l'exces comme principe de vie. Les festins pantagrueliques symbolisent la joie de vivre et la liberte. L'exces peut etre POSITIF (celebration, abondance).
- F. Scott FITZGERALD (Gatsby le Magnifique, 1925) : l'exces comme ILLUSION. Les fetes somptueuses de Gatsby cachent un vide interieur. L'exces revele la vanite du reve americain.
- MONTAIGNE (Essais) : 'La mesure de toutes choses' - la temperance, le juste milieu. L'exces est une forme de desequilibre.
- Guy DEBORD (La Societe du Spectacle, 1967) : la societe de consommation transforme tout en SPECTACLE. L'exces d'images et de representations aliène l'individu.

L'EXCES EN COMMUNICATION :
- HYPERBOLE PUBLICITAIRE : 'le meilleur', 'extraordinaire', 'revolutionnaire'. La pub vit d'exces rhetorique.
- SATURATION MEDIATIQUE : 3000-5000 messages pub/jour. Banner blindness : le consommateur ne voit plus les pubs.
- FAST FASHION : Shein, Zara, H&M produisent des milliers de references/semaine. Communication basee sur l'urgence ('derniere chance', 'vite !').
- BLACK FRIDAY : paroxysme de l'exces consummeriste. Campagnes agressives de promotion.
- OBSOLESCENCE PROGRAMMEE : produire pour remplacer. Exemple : Apple accuse de ralentir les anciens iPhone.

CONTRE-MOUVEMENTS :
- MINIMALISME : 'less is more'. Design epure, slow fashion, desencombrement. Marie Kondo.
- DECROISSANCE : ralentir la production et la consommation. Mouvement ecologique et social.
- PATAGONIA 'Don't Buy This Jacket' (2011) : campagne mythique qui encourage a NE PAS acheter. Paradoxe genial : la marque gagne en credibilite et en ventes.
- LUSH supprime ses reseaux sociaux (2021) : la marque quitte Instagram/Facebook pour protester contre les algorithmes nocifs. Communication ANTI-exces numerique.
- VEJA : sneakers ethiques, pas de publicite, transparence totale sur les couts. Anti-modele Nike.`,
        keyPoints: [
          "Exces positif (Rabelais) vs exces comme illusion (Fitzgerald) vs mesure (Montaigne)",
          "Debord : societe du spectacle, aliénation par les images",
          "Saturation mediatique, fast fashion, Black Friday, obsolescence",
          "Contre-mouvements : minimalisme, decroissance, Patagonia, Lush, Veja",
          "Patagonia 'Don't Buy This Jacket' = campagne anti-exces mythique",
        ],
        didYouKnow: "En 2022, Patagonia a transfere la propriete de l'entreprise a un fonds dedie a la lutte contre le changement climatique. Le fondateur Yvon Chouinard a declare : 'La Terre est notre seul actionnaire'. Du purpose marketing au purpose REEL.",
        flashcards: [
          { id: "f-th15", front: "Comment Rabelais voit-il l'exces ?", back: "POSITIVEMENT : dans Gargantua, les festins pantagrueliques celebrent la joie de vivre, l'abondance, la liberte. L'exces rabelaisien est une CELEBRATION de la vie, pas une critique.", difficulty: "medium", tags: ["thematiques", "exces", "rabelais"] },
          { id: "f-th16", front: "Comment Fitzgerald critique-t-il l'exces dans Gatsby ?", back: "Dans Gatsby le Magnifique (1925), les fetes extravagantes de Gatsby cachent un VIDE interieur et une quete illusoire. L'exces revele la VANITE du reve americain. L'abondance materielle masque la misere emotionnelle.", difficulty: "medium", tags: ["thematiques", "exces", "fitzgerald"] },
          { id: "f-th17", front: "Qu'est-ce que la campagne Patagonia 'Don't Buy This Jacket' ?", back: "Campagne de 2011 ou Patagonia publie une pub dans le NY Times encourageant a NE PAS acheter leur veste. Objectif : denoncer la surconsommation. PARADOXE : cela a RENFORCE la credibilite de la marque et augmente les ventes !", difficulty: "easy", tags: ["thematiques", "exces", "patagonia"] },
          { id: "f-th18", front: "Pourquoi Lush a-t-il quitte les reseaux sociaux ?", back: "En 2021, Lush a supprime ses comptes Instagram, Facebook et TikTok pour protester contre les ALGORITHMES nocifs et l'impact sur la sante mentale. Acte de communication ANTI-exces numerique. Message : les RS sont devenus toxiques.", difficulty: "medium", tags: ["thematiques", "exces", "lush"] },
          { id: "f-th19", front: "Qu'est-ce que la Societe du Spectacle selon Guy DEBORD ?", back: "Debord (1967) : dans la societe de consommation, tout devient SPECTACLE. Les images et representations remplacent le vecu reel. L'exces d'images aliène les individus. Tres pertinent pour analyser la saturation mediatique actuelle.", difficulty: "hard", tags: ["thematiques", "exces", "debord"] },
          { id: "f-th20", front: "Qu'est-ce que le 'banner blindness' et quel lien avec l'exces ?", back: "Le banner blindness = le fait de ne plus VOIR les publicites en ligne (bannieres). Consequence directe de la SATURATION mediatique : trop de pub tue la pub. Le consommateur developpe une cecite selective face a l'exces.", difficulty: "medium", tags: ["thematiques", "exces", "digital"] },
          { id: "f-th21", front: "En quoi Veja est-il un modele ANTI-exces ?", back: "Veja = sneakers ethiques francaises. ZERO publicite, transparence totale sur les couts de production, materiaux ecologiques. Anti-modele de Nike/Adidas. Le bouche-a-oreille remplace le marketing de masse. La sobriete comme valeur.", difficulty: "medium", tags: ["thematiques", "exces", "veja"] },
          { id: "f-th22", front: "Qu'est-ce que Montaigne dit de l'exces ?", back: "Montaigne prone la TEMPERANCE et le JUSTE MILIEU dans ses Essais. 'La mesure est la maitresse forme'. L'exces est un desequilibre. Position a opposer a Rabelais (exces positif) pour montrer la nuance du debat.", difficulty: "hard", tags: ["thematiques", "exces", "montaigne"] },
        ],
        quiz: [
          { id: "q-th11", question: "La campagne 'Don't Buy This Jacket' est de :", options: ["Nike", "Patagonia", "Lush", "Veja"], correctIndex: 1, explanation: "PATAGONIA (2011). Pub dans le NY Times invitant a NE PAS acheter. Objectif : denoncer la surconsommation. Effet paradoxal : credibilite renforcee et ventes en hausse.", difficulty: "easy", tags: ["thematiques", "exces"] },
          { id: "q-th12", question: "La Societe du Spectacle a ete ecrite par :", options: ["Roland Barthes", "Guy Debord", "Pierre Bourdieu", "Michel de Certeau"], correctIndex: 1, explanation: "Guy DEBORD (1967). Critique de la societe de consommation ou tout devient spectacle et representation. L'exces d'images aliène. Fondateur du mouvement situationniste.", difficulty: "medium", tags: ["thematiques", "exces"] },
          { id: "q-th13", question: "L'exces chez Rabelais est percu comme :", options: ["Un peche capital", "Une celebration joyeuse de la vie", "Une critique de la societe", "Un signe de decadence"], correctIndex: 1, explanation: "Rabelais voit l'exces POSITIVEMENT : les festins de Gargantua celebrent la joie de vivre, la liberte, l'abondance. C'est l'inverse de Fitzgerald (exces = vide) ou Montaigne (mesure = vertu).", difficulty: "medium", tags: ["thematiques", "exces"] },
          { id: "q-th14", question: "Lush a quitte les reseaux sociaux pour protester contre :", options: ["Le prix de la publicite", "Les algorithmes nocifs et l'impact sur la sante mentale", "La concurrence deloyale", "Les faux avis"], correctIndex: 1, explanation: "Lush (2021) denonce les ALGORITHMES des plateformes qui impactent la sante mentale, surtout des jeunes. Acte militant anti-exces numerique, coherent avec les valeurs ethiques de la marque.", difficulty: "easy", tags: ["thematiques", "exces"] },
          { id: "q-th15", question: "Le banner blindness est une consequence de :", options: ["La mauvaise qualite des ecrans", "La saturation publicitaire", "Le manque de publicites", "La reglementation RGPD"], correctIndex: 1, explanation: "Banner blindness = cecite aux bannieres publicitaires. Consequence directe de la SATURATION : expose a 3000-5000 messages pub/jour, le consommateur ne voit plus les pubs. L'exces de pub tue la pub.", difficulty: "medium", tags: ["thematiques", "exces"] },
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

Outils de veille : alertes Google, flux RSS, curation (Feedly, Scoop.it), reseaux sociaux, newsletters specialisees, benchmark concurrentiel.

Processus de veille : 1. Definir les besoins 2. Identifier les sources 3. Collecter l'info 4. Analyser et trier 5. Diffuser aux decideurs 6. Evaluer et ajuster.`,
        keyPoints: [
          "Veille = surveillance organisee et continue de l'environnement",
          "6 types : strategique, concurrentielle, commerciale, techno, creative, juridique",
          "Outils : alertes Google, RSS, curation, benchmark",
          "Processus : besoins -> sources -> collecte -> analyse -> diffusion -> evaluation",
        ],
        flashcards: [
          { id: "f-ve1", front: "Qu'est-ce que la veille operationnelle ?", back: "Demarche ORGANISEE et CONTINUE de surveillance de l'environnement pour anticiper les evolutions et aider a la prise de decision.", difficulty: "easy", tags: ["veille"] },
          { id: "f-ve2", front: "Citez les 6 types de veille", back: "1. Strategique 2. Concurrentielle 3. Commerciale 4. Technologique 5. Creative 6. Juridique", difficulty: "medium", tags: ["veille", "types"] },
          { id: "f-ve3", front: "Citez 4 outils de veille", back: "Alertes Google, flux RSS, outils de curation (Feedly, Scoop.it), benchmark concurrentiel, newsletters specialisees, monitoring reseaux sociaux.", difficulty: "medium", tags: ["veille", "outils"] },
          { id: "f-ve4", front: "Quelles sont les 6 etapes du processus de veille ?", back: "1. Definir les BESOINS. 2. Identifier les SOURCES. 3. COLLECTER l'information. 4. ANALYSER et trier. 5. DIFFUSER aux decideurs. 6. EVALUER et ajuster.", difficulty: "medium", tags: ["veille", "processus"] },
          { id: "f-ve5", front: "Quelle difference entre veille CREATIVE et veille CONCURRENTIELLE ?", back: "Veille CREATIVE = tendances graphiques, nouvelles formes de communication, inspiration (Behance, Pinterest, FWA). Veille CONCURRENTIELLE = surveiller les CONCURRENTS directs (offres, prix, campagnes, positionnement).", difficulty: "medium", tags: ["veille", "types"] },
          { id: "f-ve6", front: "Qu'est-ce qu'un BENCHMARK en veille ?", back: "Analyse comparative des pratiques des concurrents ou des acteurs de reference. On etudie ce que font les autres pour identifier les meilleures pratiques et s'en inspirer. C'est un outil de veille concurrentielle.", difficulty: "easy", tags: ["veille", "benchmark"] },
          { id: "f-ve7", front: "Pourquoi la veille JURIDIQUE est-elle essentielle en communication ?", back: "Le droit de la communication evolue constamment : RGPD, droit a l'image, publicite reglementee (alcool, sante), loi Climat... Un communicant qui ignore la loi risque des SANCTIONS pour l'annonceur.", difficulty: "hard", tags: ["veille", "juridique"] },
          { id: "f-ve8", front: "Qu'est-ce qu'un flux RSS et a quoi ca sert en veille ?", back: "RSS (Really Simple Syndication) = format qui permet de recevoir automatiquement les mises a jour de sites web. Avec un lecteur RSS (Feedly), on centralise toutes ses sources de veille en un seul endroit.", difficulty: "medium", tags: ["veille", "outils"] },
        ],
        quiz: [
          { id: "q-ve1", question: "La veille concurrentielle consiste a :", options: ["Surveiller la legislation", "Surveiller les concurrents", "Surveiller les tendances creatives", "Surveiller les innovations technologiques"], correctIndex: 1, explanation: "Veille CONCURRENTIELLE = surveiller les concurrents (offres, prix, campagnes, positionnement). La veille juridique = legislation. La veille creative = tendances.", difficulty: "easy", tags: ["veille"] },
          { id: "q-ve2", question: "Feedly est un outil de :", options: ["Creation graphique", "Curation de contenu / veille", "Gestion de projet", "Emailing"], correctIndex: 1, explanation: "Feedly est un lecteur de flux RSS, outil de CURATION et de VEILLE. Il permet de centraliser les sources d'information et de suivre les publications de nombreux sites.", difficulty: "easy", tags: ["veille", "outils"] },
          { id: "q-ve3", question: "La premiere etape du processus de veille est :", options: ["Collecter l'information", "Definir les besoins", "Identifier les sources", "Diffuser l'information"], correctIndex: 1, explanation: "Toujours commencer par definir les BESOINS : que veut-on savoir ? Pour qui ? Pourquoi ? Ensuite seulement on identifie les sources, collecte, analyse, diffuse et evalue.", difficulty: "medium", tags: ["veille"] },
          { id: "q-ve4", question: "Un benchmark est :", options: ["Un outil de creation graphique", "Une analyse comparative des concurrents", "Un logiciel de gestion de projet", "Un type de publicite"], correctIndex: 1, explanation: "BENCHMARK = analyse COMPARATIVE des pratiques des concurrents ou acteurs de reference. On etudie ce que font les autres pour s'inspirer des meilleures pratiques.", difficulty: "easy", tags: ["veille"] },
          { id: "q-ve5", question: "La veille creative est utile pour :", options: ["Surveiller les prix des concurrents", "S'inspirer des tendances graphiques et creatives", "Suivre l'evolution du droit", "Analyser les donnees financieres"], correctIndex: 1, explanation: "Veille CREATIVE = suivre les tendances graphiques, les nouvelles formes de communication, les campagnes inspirantes. Sources : Behance, Awwwards, Pinterest, FWA, Cannes Lions.", difficulty: "easy", tags: ["veille"] },
          { id: "q-ve6", question: "La veille juridique en communication couvre notamment :", options: ["Uniquement le RGPD", "Le RGPD, le droit a l'image, la publicite reglementee", "Uniquement le droit d'auteur", "Les normes comptables"], correctIndex: 1, explanation: "La veille juridique couvre TOUT le droit de la communication : RGPD, droit a l'image, publicite reglementee (alcool, sante), propriete intellectuelle, loi Climat...", difficulty: "medium", tags: ["veille"] },
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

Methodologie : d'abord analyser l'interne (forces/faiblesses), puis l'externe (opportunites/menaces), puis CROISER les resultats pour degager des axes strategiques.

SWOT CROISE : Forces x Opportunites = actions offensives. Faiblesses x Menaces = actions defensives. Forces x Menaces = actions de protection. Faiblesses x Opportunites = actions de reorientation.`,
        keyPoints: [
          "SWOT = Forces, Faiblesses (interne) + Opportunites, Menaces (externe)",
          "Sert a etablir le diagnostic de communication",
          "Croiser interne/externe pour degager des axes strategiques",
          "SWOT croise : 4 types d'actions strategiques",
        ],
        didYouKnow: "Le SWOT a ete developpe dans les annees 1960 a Stanford. A l'examen du BTS, le SWOT est demande dans presque TOUS les sujets E5. C'est LA competence indispensable !",
        flashcards: [
          { id: "f-sw1", front: "Que signifie SWOT ?", back: "Strengths (Forces), Weaknesses (Faiblesses), Opportunities (Opportunites), Threats (Menaces). En francais : FFOM.", difficulty: "easy", tags: ["swot", "diagnostic"] },
          { id: "f-sw2", front: "Quels elements du SWOT sont INTERNES a l'organisation ?", back: "Les FORCES et les FAIBLESSES. L'interne = ce qui depend de l'organisation (ressources, competences, image). L'externe (opportunites/menaces) = l'environnement.", difficulty: "medium", tags: ["swot"] },
          { id: "f-sw3", front: "A quoi sert le SWOT dans une strategie de communication ?", back: "A etablir un DIAGNOSTIC : identifier les forces a exploiter, les faiblesses a corriger, les opportunites a saisir et les menaces a anticiper. Il oriente la strategie.", difficulty: "medium", tags: ["swot", "strategie"] },
          { id: "f-sw4", front: "Qu'est-ce que le SWOT CROISE ?", back: "Croiser les 4 quadrants pour degager des actions : Forces x Opportunites = OFFENSIF. Faiblesses x Menaces = DEFENSIF. Forces x Menaces = PROTECTION. Faiblesses x Opportunites = REORIENTATION.", difficulty: "hard", tags: ["swot", "croise"] },
          { id: "f-sw5", front: "PIEGE EXAMEN : Comment distinguer une opportunite d'une force ?", back: "FORCE = interne, depend de l'organisation (ex : equipe competente, notoriete). OPPORTUNITE = externe, ne depend PAS de l'organisation (ex : marche en croissance, nouvelle reglementation favorable). La confusion est frequente !", difficulty: "hard", tags: ["swot", "piege"] },
          { id: "f-sw6", front: "Donnez un exemple de SWOT pour une marque de cosmetiques bio.", back: "Forces : ingredients naturels, image eco-responsable. Faiblesses : prix eleve, faible notoriete. Opportunites : marche bio en croissance, sensibilite ecologique. Menaces : greenwashing des grandes marques, concurrence accrue.", difficulty: "medium", tags: ["swot", "application"] },
          { id: "f-sw7", front: "Le SWOT est-il suffisant pour un diagnostic complet ?", back: "NON. Le SWOT est souvent complete par le PESTEL (macro-environnement), l'analyse de la concurrence, et l'analyse du positionnement. Le SWOT synthetise mais ne suffit pas seul.", difficulty: "hard", tags: ["swot", "limites"] },
          { id: "f-sw8", front: "Dans un SWOT croise, que faire quand une FAIBLESSE rencontre une MENACE ?", back: "Action DEFENSIVE : il faut se proteger ou se retirer. C'est la situation la plus dangereuse. Ex : faible presence digitale (faiblesse) + concurrents tres actifs en ligne (menace) = urgence de digitalisation.", difficulty: "hard", tags: ["swot", "croise"] },
        ],
        quiz: [
          { id: "q-sw1", question: "Dans le SWOT, les 'Opportunites' sont :", options: ["Internes a l'entreprise", "Externes (environnement)", "Des objectifs a atteindre", "Des budgets disponibles"], correctIndex: 1, explanation: "Opportunites et Menaces = EXTERNE (environnement). Forces et Faiblesses = INTERNE (organisation). Les opportunites sont des tendances favorables de l'environnement.", difficulty: "easy", tags: ["swot"] },
          { id: "q-sw2", question: "Le SWOT permet de :", options: ["Calculer un budget media", "Creer un slogan", "Etablir un diagnostic strategique", "Mesurer l'audience"], correctIndex: 2, explanation: "Le SWOT est un outil de DIAGNOSTIC STRATEGIQUE. Il croise l'analyse interne (forces/faiblesses) et externe (opportunites/menaces) pour orienter la strategie.", difficulty: "easy", tags: ["swot"] },
          { id: "q-sw3", question: "Une equipe de communication tres creative est une :", options: ["Opportunite", "Force", "Menace externe", "Faiblesse corrigee"], correctIndex: 1, explanation: "C'est une FORCE (interne). L'equipe fait partie de l'organisation. Les opportunites sont EXTERNES (marche, tendances). Ne pas confondre force et opportunite a l'examen !", difficulty: "medium", tags: ["swot"] },
          { id: "q-sw4", question: "Un marche en forte croissance est une :", options: ["Force de l'entreprise", "Faiblesse de l'entreprise", "Opportunite externe", "Competence interne"], correctIndex: 2, explanation: "Un marche en croissance = OPPORTUNITE (externe). L'entreprise ne controle pas la croissance du marche, c'est un facteur d'environnement. Force = interne, Opportunite = externe.", difficulty: "medium", tags: ["swot"] },
          { id: "q-sw5", question: "Le SWOT croise permet de :", options: ["Calculer le ROI", "Degager 4 types d'actions strategiques", "Mesurer la notoriete", "Creer un plan media"], correctIndex: 1, explanation: "SWOT croise = 4 actions : Forces x Opportunites = offensif, Forces x Menaces = protection, Faiblesses x Opportunites = reorientation, Faiblesses x Menaces = defensif.", difficulty: "hard", tags: ["swot"] },
          { id: "q-sw6", question: "Le SWOT seul est-il suffisant pour un diagnostic complet ?", options: ["Oui, c'est l'outil complet", "Non, il faut aussi le PESTEL et l'analyse concurrentielle", "Oui, si on le fait bien", "Non, il faut seulement le PESTEL"], correctIndex: 1, explanation: "Le SWOT est un outil de SYNTHESE. Il doit etre alimente par d'autres analyses : PESTEL (macro-environnement), analyse concurrentielle, etude de marche, audit d'image...", difficulty: "medium", tags: ["swot"] },
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

PESTEL et SWOT sont complementaires : PESTEL alimente la partie EXTERNE du SWOT (opportunites et menaces).

Exemple : le facteur Ecologique ('Loi Climat 2021') est une MENACE pour les pollueurs et une OPPORTUNITE pour les marques vertes.`,
        keyPoints: [
          "PESTEL = Politique, Economique, Socioculturel, Technologique, Ecologique, Legal",
          "Analyse le MACRO-ENVIRONNEMENT (facteurs externes)",
          "Complementaire du SWOT : alimente les opportunites et menaces",
        ],
        flashcards: [
          { id: "f-ps1", front: "Que signifie PESTEL ?", back: "Politique, Economique, Socioculturel, Technologique, Ecologique, Legal. C'est un outil d'analyse du MACRO-ENVIRONNEMENT.", difficulty: "easy", tags: ["pestel"] },
          { id: "f-ps2", front: "Comment PESTEL et SWOT sont-ils lies ?", back: "PESTEL alimente la partie EXTERNE du SWOT. Les facteurs PESTEL permettent d'identifier les OPPORTUNITES et les MENACES du SWOT.", difficulty: "hard", tags: ["pestel", "swot"] },
          { id: "f-ps3", front: "Donnez un exemple de facteur SOCIOCULTUREL impactant la communication.", back: "La montee de la sensibilite ecologique chez les 18-35 ans. Impact : les marques doivent integrer des messages eco-responsables. Autre exemple : le vieillissement de la population modifie les cibles prioritaires.", difficulty: "medium", tags: ["pestel", "application"] },
          { id: "f-ps4", front: "Donnez un exemple de facteur TECHNOLOGIQUE en communication.", back: "L'essor de l'IA generative (ChatGPT, Midjourney) transforme la creation de contenu. Autre exemple : le metavers, la realite augmentee, le social commerce sur TikTok. La techno cree des opportunites ET des menaces.", difficulty: "medium", tags: ["pestel", "technologie"] },
          { id: "f-ps5", front: "PIEGE EXAMEN : Quelle difference entre le E (Economique) et le E (Ecologique) du PESTEL ?", back: "ECONOMIQUE = facteurs financiers (inflation, pouvoir d'achat, croissance). ECOLOGIQUE = facteurs environnementaux (pollution, loi Climat, RSE). Ce sont 2 E DIFFERENTS ! Ne pas les confondre a l'examen.", difficulty: "hard", tags: ["pestel", "piege"] },
          { id: "f-ps6", front: "Donnez un exemple de facteur LEGAL recent impactant la communication.", back: "Le RGPD (2018) : oblige a obtenir le consentement pour la collecte de donnees. Impact : fin des cookies tiers, modification du ciblage publicitaire, nouvelles mentions legales sur les sites web.", difficulty: "medium", tags: ["pestel", "legal"] },
        ],
        quiz: [
          { id: "q-ps1", question: "Le 'S' de PESTEL designe :", options: ["Strategique", "Socioculturel", "Scientifique", "Securitaire"], correctIndex: 1, explanation: "S = SOCIOCULTUREL : tendances societales, modes de vie, valeurs, demographie. C'est different de T (Technologique) et de E (Ecologique).", difficulty: "easy", tags: ["pestel"] },
          { id: "q-ps2", question: "Le PESTEL analyse :", options: ["L'environnement interne de l'entreprise", "Le macro-environnement externe", "Les concurrents directs", "Le budget media"], correctIndex: 1, explanation: "PESTEL = analyse du MACRO-ENVIRONNEMENT (facteurs externes). Il ne concerne PAS l'interne de l'entreprise (c'est le SWOT qui distingue interne/externe).", difficulty: "easy", tags: ["pestel"] },
          { id: "q-ps3", question: "Le RGPD est un facteur :", options: ["Politique", "Economique", "Technologique", "Legal"], correctIndex: 3, explanation: "Le RGPD est un REGLEMENT (facteur LEGAL). Meme s'il impacte la technologie, c'est d'abord un texte de LOI. Legal = lois, normes, reglements.", difficulty: "medium", tags: ["pestel"] },
          { id: "q-ps4", question: "L'inflation qui reduit le pouvoir d'achat est un facteur :", options: ["Politique", "Economique", "Socioculturel", "Legal"], correctIndex: 1, explanation: "Inflation/pouvoir d'achat = facteur ECONOMIQUE. Politique = gouvernement/elections. Socioculturel = modes de vie/valeurs. Legal = lois.", difficulty: "easy", tags: ["pestel"] },
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

Types de positionnement :
- Par les ATTRIBUTS du produit : qualite, performance (ex : Dyson = technologie aspirateur)
- Par le PRIX : premium (Apple), milieu de gamme, low cost (Ryanair)
- Par l'USAGE : occasion d'utilisation (ex : Apericube = aperitif)
- Par la CIBLE : profil d'utilisateur (ex : Axe = jeunes hommes)
- Par la CONCURRENCE : se positionner contre un rival (ex : Pepsi vs Coca)
- Par les VALEURS : engagement, style de vie (ex : Patagonia = ecologie)

Exemple : Apple = innovation + design premium + simplicite.`,
        keyPoints: [
          "Place de la marque dans l'esprit du consommateur vs concurrence",
          "4 qualites : credible, specifique, attractif, durable",
          "6 types : attributs, prix, usage, cible, concurrence, valeurs",
        ],
        flashcards: [
          { id: "f-po1", front: "Qu'est-ce que le positionnement en communication ?", back: "La PLACE qu'occupe une marque/produit dans l'ESPRIT DU CONSOMMATEUR par rapport a la concurrence. 4 qualites : credible, specifique, attractif, durable.", difficulty: "easy", tags: ["positionnement"] },
          { id: "f-po2", front: "Citez les 4 qualites d'un bon positionnement", back: "1. CREDIBLE (atouts reels) 2. SPECIFIQUE (distinct de la concurrence) 3. ATTRACTIF (repond aux attentes) 4. DURABLE (tient dans le temps)", difficulty: "medium", tags: ["positionnement"] },
          { id: "f-po3", front: "Citez les 6 types de positionnement avec des exemples.", back: "1. ATTRIBUTS (Dyson = techno). 2. PRIX (Ryanair = low cost). 3. USAGE (Apericube = aperitif). 4. CIBLE (Axe = jeunes hommes). 5. CONCURRENCE (Pepsi vs Coca). 6. VALEURS (Patagonia = ecologie).", difficulty: "medium", tags: ["positionnement", "types"] },
          { id: "f-po4", front: "Quel est le positionnement de Lidl ? Comment a-t-il evolue ?", back: "Initialement : PRIX BAS (hard discount). Evolution : 'le vrai prix des bonnes choses' = prix bas + QUALITE. Lidl a repositionne son image sans abandonner son atout prix. Exemple de repositionnement reussi.", difficulty: "hard", tags: ["positionnement", "application"] },
          { id: "f-po5", front: "PIEGE EXAMEN : Positionnement et image de marque, c'est la meme chose ?", back: "NON ! Le POSITIONNEMENT = ce que la marque VEUT etre dans l'esprit du consommateur (voulu). L'IMAGE DE MARQUE = ce que le consommateur PERCOIT reellement (percu). L'objectif est que les deux coincident.", difficulty: "hard", tags: ["positionnement", "piege"] },
          { id: "f-po6", front: "Qu'est-ce qu'un mapping de positionnement ?", back: "Un graphique a 2 axes qui place les marques concurrentes selon 2 criteres (ex : prix/qualite, classique/moderne). Il visualise la position de chaque marque et identifie les espaces VACANTS (opportunites de positionnement).", difficulty: "medium", tags: ["positionnement", "mapping"] },
        ],
        quiz: [
          { id: "q-po1", question: "Un positionnement doit etre :", options: ["Vague pour toucher tout le monde", "Credible, specifique, attractif, durable", "Change tous les 6 mois", "Identique a celui du leader"], correctIndex: 1, explanation: "Les 4 qualites : CREDIBLE (vrais atouts), SPECIFIQUE (different des concurrents), ATTRACTIF (repond a un besoin), DURABLE (coherent dans le temps).", difficulty: "easy", tags: ["positionnement"] },
          { id: "q-po2", question: "Ryanair a un positionnement par :", options: ["Les attributs produit", "Le prix (low cost)", "Les valeurs ecologiques", "La cible premium"], correctIndex: 1, explanation: "Ryanair = positionnement par le PRIX (low cost). Tout est oriente vers le prix bas : pas de service, pas de bagages inclus, pas de confort. Le prix EST le positionnement.", difficulty: "easy", tags: ["positionnement"] },
          { id: "q-po3", question: "Un mapping de positionnement sert a :", options: ["Calculer le budget", "Visualiser la position des marques sur 2 criteres", "Mesurer la notoriete", "Creer un slogan"], correctIndex: 1, explanation: "Le mapping = graphique a 2 axes qui place les concurrents. Il permet de VISUALISER le positionnement relatif et d'identifier les espaces vacants (opportunites).", difficulty: "medium", tags: ["positionnement"] },
          { id: "q-po4", question: "Le positionnement VOULU et l'image de marque PERCUE :", options: ["Sont toujours identiques", "Peuvent differer", "N'ont aucun lien", "Sont fixes par la loi"], correctIndex: 1, explanation: "Le positionnement = ce que la marque VEUT etre. L'image = ce que le public PERCOIT. Ils peuvent DIFFERER si la communication est inefficace ou incoherente.", difficulty: "medium", tags: ["positionnement"] },
          { id: "q-po5", question: "Patagonia a un positionnement par :", options: ["Le prix", "Les attributs techniques", "Les valeurs ecologiques", "La concurrence"], correctIndex: 2, explanation: "Patagonia = positionnement par les VALEURS (ecologie, durabilite, anti-surconsommation). Ce n'est pas le prix (ils sont chers) ni la technique (bien que les produits soient techniques).", difficulty: "medium", tags: ["positionnement"] },
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

Les objectifs doivent etre SMART : Specifiques, Mesurables, Atteignables, Realistes, Temporellement definis.

NOTORIETE ASSISTEE vs SPONTANEE :
- Assistee : 'Connaissez-vous la marque X ?' (on cite la marque)
- Spontanee : 'Citez des marques de...' (le consommateur cite de memoire)
- Top of mind : la premiere marque citee spontanement`,
        keyPoints: [
          "Cognitif = connaitre / Affectif = aimer / Conatif = agir",
          "Ne pas confondre objectif de communication et objectif commercial",
          "Objectifs SMART : Specifiques, Mesurables, Atteignables, Realistes, Temporels",
          "Notoriete assistee vs spontanee vs top of mind",
        ],
        flashcards: [
          { id: "f-ob1", front: "Quels sont les 3 types d'objectifs de communication ?", back: "COGNITIF (faire connaitre = notoriete), AFFECTIF (faire aimer = image), CONATIF (faire agir = comportement). Sequence : connaitre -> aimer -> agir.", difficulty: "easy", tags: ["objectifs"] },
          { id: "f-ob2", front: "Que signifie SMART pour un objectif ?", back: "Specifique, Mesurable, Atteignable (Achievable), Realiste, Temporellement defini. Exemple : 'Augmenter la notoriete assistee de 20% en 6 mois'.", difficulty: "medium", tags: ["objectifs", "smart"] },
          { id: "f-ob3", front: "Quelle difference entre objectif de communication et objectif commercial ?", back: "Commercial = ventes/CA (ex: +10% de ventes). Communication = notoriete/image/comportement (ex: +30% de notoriete aupres des 18-25 ans). La communication CONTRIBUE a l'objectif commercial.", difficulty: "hard", tags: ["objectifs"] },
          { id: "f-ob4", front: "Quelle difference entre notoriete ASSISTEE et SPONTANEE ?", back: "ASSISTEE : on cite la marque et on demande si on la connait ('Connaissez-vous X ?'). SPONTANEE : le consommateur cite de memoire ('Citez des marques de...'). TOP OF MIND : la 1ere marque citee spontanement.", difficulty: "medium", tags: ["objectifs", "notoriete"] },
          { id: "f-ob5", front: "Donnez un exemple d'objectif SMART en communication.", back: "'Augmenter la notoriete assistee de la marque de 35% a 55% aupres des femmes 25-45 ans en Ile-de-France, en 6 mois.' Specifique + Mesurable + Atteignable + Realiste + Temporel.", difficulty: "medium", tags: ["objectifs", "smart"] },
          { id: "f-ob6", front: "PIEGE EXAMEN : 'Augmenter le chiffre d'affaires de 15%' est quel type d'objectif ?", back: "C'est un objectif COMMERCIAL, pas un objectif de communication ! A l'examen, il faut formuler des objectifs de COMMUNICATION : notoriete, image, comportement. Le CA est un objectif business.", difficulty: "hard", tags: ["objectifs", "piege"] },
        ],
        quiz: [
          { id: "q-ob1", question: "L'objectif CONATIF vise a :", options: ["Faire connaitre", "Faire aimer", "Faire agir", "Faire reflechir"], correctIndex: 2, explanation: "Conatif = faire AGIR (comportement). Cognitif = faire connaitre (notoriete). Affectif = faire aimer (image). La sequence est : connaitre -> aimer -> agir.", difficulty: "easy", tags: ["objectifs"] },
          { id: "q-ob2", question: "'Augmenter les ventes de 10%' est un objectif :", options: ["De communication cognitif", "De communication conatif", "Commercial", "De communication affectif"], correctIndex: 2, explanation: "C'est un objectif COMMERCIAL (ventes/CA). Un objectif de communication serait : 'Augmenter la notoriete de 30%' ou 'Generer 5000 visites sur le site'.", difficulty: "medium", tags: ["objectifs"] },
          { id: "q-ob3", question: "La notoriete 'top of mind' designe :", options: ["La notoriete totale", "La premiere marque citee spontanement", "La notoriete assistee", "Le taux de satisfaction"], correctIndex: 1, explanation: "Top of mind = la PREMIERE marque citee spontanement quand on demande 'Citez une marque de...'. C'est le niveau le plus eleve de notoriete. Coca-Cola est souvent top of mind pour les sodas.", difficulty: "medium", tags: ["objectifs", "notoriete"] },
          { id: "q-ob4", question: "Un objectif SMART doit etre :", options: ["Simple, Majeur, Ambitieux, Rapide, Total", "Specifique, Mesurable, Atteignable, Realiste, Temporel", "Strategique, Marketing, Analytique, Rentable, Technique", "Social, Media, Artistique, Raisonnable, Tendance"], correctIndex: 1, explanation: "SMART = Specifique, Mesurable, Atteignable (Achievable), Realiste, Temporellement defini. Un objectif non-SMART est vague et impossible a evaluer.", difficulty: "easy", tags: ["objectifs"] },
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

B2C = grand public / B2B = professionnels

PERSONA : profil fictif detaille d'un client type. Inclut nom, age, profession, habitudes, frustrations, motivations, medias consommes. Outil pour humaniser la cible.`,
        keyPoints: [
          "Cible principale > Coeur de cible > Cible secondaire (relais)",
          "Criteres : sociodemographiques, psychographiques, comportementaux",
          "B2C (grand public) vs B2B (professionnels)",
          "Persona : profil fictif detaille du client type",
        ],
        flashcards: [
          { id: "f-ci1", front: "Quelle difference entre cible principale et coeur de cible ?", back: "Cible principale = public global vise. Coeur de cible = segment PRIORITAIRE au sein de la cible principale, sur lequel l'effort de communication est CONCENTRE.", difficulty: "medium", tags: ["cibles"] },
          { id: "f-ci2", front: "Qu'est-ce que la cible secondaire ?", back: "Les RELAIS D'INFLUENCE : journalistes, influenceurs, prescripteurs, leaders d'opinion. Ils ne sont pas les destinataires finaux mais amplifient le message aupres de la cible principale.", difficulty: "medium", tags: ["cibles"] },
          { id: "f-ci3", front: "Quels sont les 3 types de criteres de segmentation ?", back: "1. SOCIODEMOGRAPHIQUES (age, sexe, CSP, revenus, lieu). 2. PSYCHOGRAPHIQUES (valeurs, modes de vie, centres d'interet). 3. COMPORTEMENTAUX (frequence d'achat, fidelite, sensibilite prix).", difficulty: "medium", tags: ["cibles", "segmentation"] },
          { id: "f-ci4", front: "Qu'est-ce qu'un PERSONA en communication ?", back: "Profil FICTIF detaille d'un client type : nom, age, profession, habitudes de consommation, frustrations, motivations, medias consommes. Sert a HUMANISER la cible et orienter les choix creatifs.", difficulty: "easy", tags: ["cibles", "persona"] },
          { id: "f-ci5", front: "Quelle difference entre B2C et B2B en communication ?", back: "B2C = Business to CONSUMER (grand public). Ton emotionnel, medias de masse. B2B = Business to BUSINESS (professionnels). Ton expert, medias specialises, salons, LinkedIn.", difficulty: "easy", tags: ["cibles", "b2b-b2c"] },
          { id: "f-ci6", front: "Qu'est-ce qu'un prescripteur ? Exemple ?", back: "Personne qui RECOMMANDE un produit sans l'acheter elle-meme. Ex : un medecin prescrit des medicaments, un prof recommande des livres, un influenceur recommande des produits. C'est une cible SECONDAIRE.", difficulty: "medium", tags: ["cibles", "prescripteur"] },
        ],
        quiz: [
          { id: "q-ci1", question: "Le coeur de cible designe :", options: ["Tous les consommateurs", "Le segment prioritaire", "Les medias", "Les concurrents"], correctIndex: 1, explanation: "Coeur de cible = segment PRIORITAIRE au sein de la cible principale. C'est le groupe sur lequel on concentre les efforts de communication.", difficulty: "easy", tags: ["cibles"] },
          { id: "q-ci2", question: "Un persona est :", options: ["Un vrai client", "Un profil fictif detaille du client type", "Le directeur de la communication", "Un influenceur"], correctIndex: 1, explanation: "Le PERSONA est un profil FICTIF mais detaille (nom, age, habitudes, motivations). Il humanise la cible et guide les choix creatifs. Ce n'est PAS un vrai client.", difficulty: "easy", tags: ["cibles"] },
          { id: "q-ci3", question: "Les criteres psychographiques incluent :", options: ["Age et sexe", "Valeurs et modes de vie", "Frequence d'achat", "Revenus et CSP"], correctIndex: 1, explanation: "PSYCHOGRAPHIQUES = valeurs, modes de vie, centres d'interet, personnalite. Sociodemographiques = age, sexe, CSP. Comportementaux = frequence d'achat, fidelite.", difficulty: "medium", tags: ["cibles"] },
          { id: "q-ci4", question: "En communication B2B, le ton est generalement :", options: ["Emotionnel et ludique", "Expert et professionnel", "Provocant et decale", "Familier et humoristique"], correctIndex: 1, explanation: "B2B = communication entre professionnels. Le ton est EXPERT, factuel, oriente ROI. Les canaux : LinkedIn, salons pro, presse specialisee. Le B2C est plus emotionnel.", difficulty: "easy", tags: ["cibles"] },
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
Gerer une situation exceptionnelle qui menace l'image/reputation. Necessite : cellule de crise, porte-parole unique, transparence, reactivite.
Exemple : Findus (crise viande de cheval 2013), Volkswagen (Dieselgate 2015), Lactalis (lait contamine 2017).`,
        keyPoints: [
          "Institutionnelle = image de l'entreprise / Commerciale = produits et ventes",
          "Interne : descendante, ascendante, horizontale",
          "Communication de crise : cellule de crise, transparence, reactivite",
        ],
        flashcards: [
          { id: "f-tc1", front: "Quelle difference entre communication institutionnelle et commerciale ?", back: "INSTITUTIONNELLE = promouvoir l'IMAGE de l'entreprise (valeurs, mission). COMMERCIALE = promouvoir les PRODUITS/MARQUE (stimuler les ventes).", difficulty: "easy", tags: ["types-com"] },
          { id: "f-tc2", front: "Quelles sont les 3 directions de la communication interne ?", back: "DESCENDANTE (direction -> salaries), ASCENDANTE (salaries -> direction), HORIZONTALE (entre services/collegues au meme niveau).", difficulty: "medium", tags: ["types-com", "interne"] },
          { id: "f-tc3", front: "Quels sont les principes cles de la communication de crise ?", back: "Cellule de crise, porte-parole UNIQUE, TRANSPARENCE, REACTIVITE, maitrise de l'information, plan de communication de crise prepare en amont.", difficulty: "medium", tags: ["types-com", "crise"] },
          { id: "f-tc4", front: "Qu'est-ce que le MECENAT et en quoi differe-t-il du SPONSORING ?", back: "MECENAT = soutien financier SANS contrepartie directe (deduction fiscale). Communication institutionnelle. SPONSORING = soutien avec contrepartie de visibilite (logo, mentions). Communication commerciale.", difficulty: "hard", tags: ["types-com", "mecenat"] },
          { id: "f-tc5", front: "Citez 3 crises de communication celebres et leurs marques.", back: "1. FINDUS (2013) : viande de cheval dans les lasagnes. 2. VOLKSWAGEN Dieselgate (2015) : trucage des emissions. 3. LACTALIS (2017) : lait infantile contamine a la salmonelle. Chacune a necessite une com de crise.", difficulty: "medium", tags: ["types-com", "crise"] },
          { id: "f-tc6", front: "Qu'est-ce que la communication GLOBALE ?", back: "Approche qui INTEGRE toutes les formes de communication (institutionnelle, commerciale, interne, externe) en un ensemble COHERENT. Un seul message, une seule image, sur tous les supports. Synonyme : communication 360.", difficulty: "medium", tags: ["types-com", "globale"] },
        ],
        quiz: [
          { id: "q-tc1", question: "La communication corporate vise a promouvoir :", options: ["Un produit specifique", "L'image globale de l'entreprise", "Les prix promotionnels", "Le recrutement"], correctIndex: 1, explanation: "Communication CORPORATE = institutionnelle = promouvoir l'IMAGE de l'entreprise dans son ensemble (valeurs, mission, identite). Pas un produit en particulier.", difficulty: "easy", tags: ["types-com"] },
          { id: "q-tc2", question: "La communication ascendante va :", options: ["De la direction vers les salaries", "Des salaries vers la direction", "Entre les services", "De l'entreprise vers les medias"], correctIndex: 1, explanation: "ASCENDANTE = des salaries vers la direction (boite a idees, enquetes, entretiens). Descendante = direction vers salaries. Horizontale = entre collegues/services.", difficulty: "easy", tags: ["types-com"] },
          { id: "q-tc3", question: "En communication de crise, le porte-parole doit etre :", options: ["Chaque employe peut parler", "Un porte-parole UNIQUE", "Le community manager", "Le DRH exclusivement"], correctIndex: 1, explanation: "Un porte-parole UNIQUE pour eviter les messages contradictoires. C'est un principe fondamental de la communication de crise : un seul discours, une seule voix.", difficulty: "medium", tags: ["types-com", "crise"] },
          { id: "q-tc4", question: "Le mecenat se distingue du sponsoring par :", options: ["Un budget plus eleve", "L'absence de contrepartie directe de visibilite", "Le fait qu'il est illegal", "Le fait qu'il concerne uniquement le sport"], correctIndex: 1, explanation: "MECENAT = soutien SANS contrepartie directe (avantage fiscal). SPONSORING = soutien AVEC contrepartie de visibilite (logo, mentions). Le mecenat est de la communication institutionnelle.", difficulty: "hard", tags: ["types-com"] },
          { id: "q-tc5", question: "Le Dieselgate est une crise de communication de :", options: ["Renault", "Volkswagen", "Toyota", "Tesla"], correctIndex: 1, explanation: "VOLKSWAGEN (2015) : la marque a truque les tests d'emissions de ses moteurs diesel. Enorme scandale mondial, perte de confiance, amendes massives. Cas d'ecole en communication de crise.", difficulty: "easy", tags: ["types-com", "crise"] },
          { id: "q-tc6", question: "La communication 360 designe :", options: ["La communication sur les reseaux sociaux", "L'integration coherente de toutes les formes de communication", "La communication interne uniquement", "La publicite TV"], correctIndex: 1, explanation: "Communication 360 = communication GLOBALE qui integre tous les canaux et toutes les formes (institutionnelle, commerciale, digitale, interne) en un ensemble COHERENT.", difficulty: "medium", tags: ["types-com"] },
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

Tendance actuelle : le digital est devenu le 1er media en termes d'investissements publicitaires en France. La frontiere media/hors-media s'estompe avec le digital.

GRP (Gross Rating Point) = indicateur d'audience media. GRP = couverture (%) x repetition moyenne. Plus le GRP est eleve, plus la campagne a de l'impact.`,
        keyPoints: [
          "Medias : TV, presse, radio, affichage, cinema, digital",
          "Hors-medias : RP, evenementiel, marketing direct, promo, digital",
          "Le digital est devenu le 1er media publicitaire",
          "GRP = couverture x repetition",
        ],
        flashcards: [
          { id: "f-mm1", front: "Citez les 6 grands medias", back: "Television, Presse ecrite, Radio, Affichage, Cinema, Digital (internet). On les appelle aussi 'above the line'.", difficulty: "easy", tags: ["medias"] },
          { id: "f-mm2", front: "Citez 5 moyens hors-medias", back: "Relations presse/RP, Evenementiel (salons, sponsoring), Marketing direct (mailing, e-mailing), Promotion des ventes (jeux, bons), Communication digitale (RS, SEO).", difficulty: "medium", tags: ["hors-medias"] },
          { id: "f-mm3", front: "Quel est le 1er media publicitaire en France aujourd'hui ?", back: "Le DIGITAL (internet). Il a depasse la television en termes d'investissements publicitaires grace au ciblage precis, la mesurabilite et l'interactivite.", difficulty: "medium", tags: ["medias", "digital"] },
          { id: "f-mm4", front: "Qu'est-ce que le GRP et comment se calcule-t-il ?", back: "GRP (Gross Rating Point) = COUVERTURE (% de la cible touchee) x REPETITION moyenne. C'est l'indicateur d'efficacite media. Ex : 50% de couverture x 4 repetitions = 200 GRP.", difficulty: "hard", tags: ["medias", "grp"] },
          { id: "f-mm5", front: "Quelle difference entre SEO et SEA ?", back: "SEO = Search Engine OPTIMIZATION (referencement NATUREL, gratuit, long terme). SEA = Search Engine ADVERTISING (publicite payante, resultats immediats, Google Ads). Les deux sont complementaires.", difficulty: "medium", tags: ["medias", "digital"] },
          { id: "f-mm6", front: "Quels sont les avantages et limites de la TELEVISION comme media ?", back: "Avantages : FORT IMPACT, large audience, prestige, audio+video. Limites : COUT eleve, ciblage imparfait, zapping, fragmentation de l'audience (streaming).", difficulty: "medium", tags: ["medias", "television"] },
          { id: "f-mm7", front: "Qu'est-ce que le EARNED MEDIA, OWNED MEDIA, PAID MEDIA ?", back: "PAID = media achete (pub TV, Google Ads, sponsoring). OWNED = media detenu (site web, RS de la marque, newsletter). EARNED = media gagne (RP, bouche-a-oreille, partages, avis). Le trio POEM.", difficulty: "hard", tags: ["medias", "poem"] },
          { id: "f-mm8", front: "Qu'est-ce que le content marketing ?", back: "Strategie qui consiste a creer et diffuser du CONTENU de valeur (articles, videos, podcasts, infographies) pour attirer et fidéliser une audience, plutot que de la publicite directe. Ex : Red Bull Media House.", difficulty: "medium", tags: ["medias", "content"] },
        ],
        quiz: [
          { id: "q-mm1", question: "Le sponsoring fait partie des moyens :", options: ["Medias", "Hors-medias", "Digitaux uniquement", "Audiovisuels"], correctIndex: 1, explanation: "Le sponsoring fait partie de l'EVENEMENTIEL, qui est un moyen HORS-MEDIAS (below the line). Les medias = TV, presse, radio, affichage, cinema, digital.", difficulty: "easy", tags: ["medias"] },
          { id: "q-mm2", question: "Le GRP se calcule par :", options: ["Budget / nombre de contacts", "Couverture x repetition", "Audience / cout", "Clics / impressions"], correctIndex: 1, explanation: "GRP = COUVERTURE (% cible touchee) x REPETITION (nombre moyen d'expositions). C'est l'indicateur de pression publicitaire media.", difficulty: "medium", tags: ["medias", "grp"] },
          { id: "q-mm3", question: "Le SEO designe :", options: ["La publicite payante en ligne", "Le referencement naturel", "Les reseaux sociaux", "L'email marketing"], correctIndex: 1, explanation: "SEO = referencement NATUREL (optimiser son site pour apparaitre dans les resultats de recherche sans payer). SEA = publicite payante (Google Ads).", difficulty: "easy", tags: ["medias", "digital"] },
          { id: "q-mm4", question: "Le modele POEM classe les medias en :", options: ["Public, Online, Email, Mobile", "Paid, Owned, Earned Media", "Print, Outdoor, Electronic, Mobile", "Plan, Objectif, Execution, Mesure"], correctIndex: 1, explanation: "POEM = Paid (achete), Owned (detenu), Earned (gagne). Cette classification depasse la distinction media/hors-media et integre le digital.", difficulty: "hard", tags: ["medias"] },
          { id: "q-mm5", question: "Red Bull Media House est un exemple de :", options: ["Publicite televisee", "Content marketing", "Sponsoring sportif", "Marketing direct"], correctIndex: 1, explanation: "Red Bull produit du CONTENU (videos extreme, magazine, evenements) qui attire une audience. C'est du CONTENT MARKETING : creer de la valeur pour la cible, pas de la pub directe.", difficulty: "medium", tags: ["medias"] },
          { id: "q-mm6", question: "Le principal avantage du digital par rapport a la TV est :", options: ["Le prestige", "La qualite d'image", "Le ciblage precis et la mesurabilite", "Le son"], correctIndex: 2, explanation: "Le digital permet un CIBLAGE PRECIS (age, interets, comportement) et une MESURABILITE en temps reel (clics, conversions, ROI). La TV a plus de prestige mais moins de precision.", difficulty: "easy", tags: ["medias"] },
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
- TON : style de communication (humoristique, serieux, decale, emotionnel)

STAR STRATEGY (Jacques Seguela) : alternative a la copy strategy classique.
- PHYSIQUE du produit (ses caracteristiques)
- CARACTERE de la marque (sa personnalite)
- STYLE d'expression (son ton, sa facon de parler)`,
        keyPoints: [
          "11 etapes de la reco : problematique -> diagnostic -> positionnement -> objectifs -> cibles -> message -> creation -> moyens -> budget -> planning -> KPIs",
          "Copy strategy : promesse, preuve, benefice consommateur, ton",
          "Star strategy (Seguela) : physique, caractere, style",
        ],
        flashcards: [
          { id: "f-re1", front: "Quels sont les 4 elements de la copy strategy ?", back: "1. PROMESSE (benefice principal) 2. PREUVE (justification) 3. BENEFICE CONSOMMATEUR (avantage percu) 4. TON (style : humoristique, serieux, emotionnel...)", difficulty: "easy", tags: ["copy-strategy"] },
          { id: "f-re2", front: "Citez les etapes principales d'une recommandation strategique", back: "Problematique, Diagnostic (SWOT), Positionnement, Objectifs, Cibles, Message/axe, Strategie creative (copy strategy), Moyens media/hors-media, Budget, Planning, KPIs.", difficulty: "medium", tags: ["reco"] },
          { id: "f-re3", front: "Qu'est-ce que la 'promesse' dans la copy strategy ?", back: "Le BENEFICE PRINCIPAL propose au consommateur. C'est l'argument central du message publicitaire. Exemple : 'Des cheveux 3x plus forts' (promesse de L'Oreal Elvive).", difficulty: "medium", tags: ["copy-strategy", "promesse"] },
          { id: "f-re4", front: "Qu'est-ce que la STAR STRATEGY de Jacques Seguela ?", back: "Alternative a la copy strategy. 3 elements : PHYSIQUE du produit (caracteristiques), CARACTERE de la marque (personnalite), STYLE d'expression (ton). Seguela traite la marque comme une STAR (une personne).", difficulty: "hard", tags: ["star-strategy", "seguela"] },
          { id: "f-re5", front: "Quelle difference entre PROMESSE et BENEFICE CONSOMMATEUR ?", back: "PROMESSE = ce que le produit FAIT ('des cheveux 3x plus forts'). BENEFICE CONSOMMATEUR = ce que le consommateur GAGNE ('vous avez confiance en vous'). Le benefice est l'avantage PERCU, c'est plus emotionnel.", difficulty: "hard", tags: ["copy-strategy"] },
          { id: "f-re6", front: "Qu'est-ce qu'un AXE DE COMMUNICATION ?", back: "L'IDEE CENTRALE qui guide toute la strategie creative. C'est le fil conducteur du message. Ex : axe = 'la confiance en soi' pour une marque de cosmetiques. Tous les messages declineront cet axe.", difficulty: "medium", tags: ["reco", "axe"] },
          { id: "f-re7", front: "Pourquoi la reco commence-t-elle par la REFORMULATION de la problematique ?", back: "Pour montrer au client qu'on a COMPRIS son besoin et pour cadrer la reflexion. La reformulation peut recadrer le brief si le vrai probleme differe de ce que le client pense. C'est un signe de professionnalisme.", difficulty: "medium", tags: ["reco"] },
          { id: "f-re8", front: "Citez 5 types de TON utilisables en communication.", back: "1. HUMORISTIQUE (decale, drole). 2. EMOTIONNEL (touchant, pathos). 3. INFORMATIF (factuel, didactique). 4. PROVOCANT (choquant, transgressif). 5. PREMIUM (luxueux, exclusif). Le ton doit etre coherent avec la cible et le positionnement.", difficulty: "medium", tags: ["copy-strategy", "ton"] },
        ],
        quiz: [
          { id: "q-re1", question: "La 'preuve' dans la copy strategy sert a :", options: ["Definir la cible", "Justifier la promesse", "Choisir les medias", "Calculer le budget"], correctIndex: 1, explanation: "La PREUVE justifie la promesse. Exemples : 'Teste cliniquement' (preuve scientifique), 'N 1 des ventes' (preuve sociale), 'Depuis 1850' (preuve d'expertise).", difficulty: "easy", tags: ["copy-strategy"] },
          { id: "q-re2", question: "La star strategy a ete creee par :", options: ["David Ogilvy", "Jacques Seguela", "Roland Barthes", "Philip Kotler"], correctIndex: 1, explanation: "Jacques SEGUELA, publicitaire francais (RSCG/Havas), a cree la star strategy. Il traite la marque comme une personne (star) avec un physique, un caractere et un style.", difficulty: "medium", tags: ["star-strategy"] },
          { id: "q-re3", question: "La premiere etape d'une reco strategique est :", options: ["Choisir les medias", "Reformuler la problematique", "Calculer le budget", "Creer le slogan"], correctIndex: 1, explanation: "On commence par REFORMULER la problematique du client. Cela montre qu'on a compris le besoin et permet de cadrer toute la reflexion strategique.", difficulty: "easy", tags: ["reco"] },
          { id: "q-re4", question: "L'axe de communication est :", options: ["Le budget alloue", "L'idee centrale qui guide la strategie creative", "Le media principal", "Le logo de la marque"], correctIndex: 1, explanation: "L'AXE = idee centrale, fil conducteur. Tous les messages, sur tous les supports, declineront cet axe. Ex : 'la confiance' pour Dove, 'le depassement de soi' pour Nike.", difficulty: "medium", tags: ["reco"] },
          { id: "q-re5", question: "Les KPIs dans une reco servent a :", options: ["Calculer le salaire de l'equipe", "Mesurer l'efficacite de la campagne", "Choisir les couleurs du logo", "Definir la cible"], correctIndex: 1, explanation: "KPIs (Key Performance Indicators) = indicateurs de mesure de la performance. Reach, engagement, CTR, conversions, notoriete. Ils permettent de mesurer si les objectifs sont atteints.", difficulty: "easy", tags: ["reco", "kpi"] },
          { id: "q-re6", question: "La copy strategy et la star strategy sont :", options: ["Identiques", "Deux approches differentes de la strategie creative", "Reservees au B2B", "Des outils de veille"], correctIndex: 1, explanation: "Deux APPROCHES DIFFERENTES. Copy strategy = promesse/preuve/benefice/ton (rationnelle). Star strategy = physique/caractere/style (emotionnelle, la marque = une personne).", difficulty: "hard", tags: ["copy-strategy", "star-strategy"] },
        ],
      },
    ],
  },
  // =========================================
  // E5 - NOUVEAUX MODULES
  // =========================================
  {
    id: "plan-budget",
    title: "Plan de communication, budget, planning",
    exam: "e5",
    chapters: [
      {
        id: "plan-com",
        title: "Construire un plan de communication",
        content: `Le plan de communication est le document operationnel qui detaille les actions de communication prevues.

STRUCTURE TYPE :
1. OBJECTIFS de communication (rappel : cognitif, affectif, conatif + SMART)
2. CIBLES (principale, coeur, secondaire)
3. MESSAGE CLE et axe de communication
4. STRATEGIE DES MOYENS : choix media/hors-media justifie
5. ACTIONS DETAILLEES : pour chaque action, decrire le support, le message, le canal, le planning, le budget
6. BUDGET PREVISIONNEL : repartition par poste et par action
7. RETROPLANNING : calendrier de mise en oeuvre avec jalons
8. KPIs : indicateurs de mesure pour chaque action

Le plan de communication est la TRADUCTION OPERATIONNELLE de la recommandation strategique.`,
        keyPoints: [
          "Plan de com = traduction operationnelle de la reco",
          "8 elements : objectifs, cibles, message, moyens, actions, budget, planning, KPIs",
          "Chaque action est detaillee : support, message, canal, planning, budget",
        ],
        flashcards: [
          { id: "f-pb1", front: "Qu'est-ce qu'un plan de communication ?", back: "Document OPERATIONNEL qui detaille les actions de communication prevues. C'est la traduction concrete de la recommandation strategique : qui fait quoi, quand, comment, avec quel budget.", difficulty: "easy", tags: ["plan-com"] },
          { id: "f-pb2", front: "Quelle difference entre recommandation strategique et plan de communication ?", back: "La RECO = la strategie (pourquoi, pour qui, quel message). Le PLAN = l'operationnel (quelles actions concretes, quand, combien). La reco est la reflexion, le plan est l'execution.", difficulty: "medium", tags: ["plan-com", "reco"] },
          { id: "f-pb3", front: "Quels sont les 8 elements d'un plan de communication ?", back: "1. Objectifs 2. Cibles 3. Message cle 4. Strategie des moyens 5. Actions detaillees 6. Budget 7. Retroplanning 8. KPIs. Chaque element decoule du precedent.", difficulty: "medium", tags: ["plan-com"] },
        ],
        quiz: [
          { id: "q-pb1", question: "Le plan de communication est :", options: ["Un document strategique", "La traduction operationnelle de la reco", "Un bilan post-campagne", "Un outil de veille"], correctIndex: 1, explanation: "Le plan de com traduit la strategie en ACTIONS CONCRETES. Il detaille chaque action : support, message, canal, planning, budget. C'est le document operationnel.", difficulty: "easy", tags: ["plan-com"] },
          { id: "q-pb2", question: "Chaque action du plan doit preciser :", options: ["Uniquement le budget", "Le support, le message, le canal, le planning et le budget", "Uniquement la date", "Uniquement la cible"], correctIndex: 1, explanation: "Chaque action est detaillee : QUOI (support), QUEL MESSAGE, PAR QUEL CANAL, QUAND (planning), COMBIEN (budget). C'est le niveau de detail operationnel attendu.", difficulty: "medium", tags: ["plan-com"] },
        ],
      },
      {
        id: "budget-previsionnel",
        title: "Budget previsionnel",
        content: `Le budget de communication repartit les ressources financieres entre les differentes actions.

POSTES DE DEPENSES :
- CREATION : honoraires agence, direction artistique, concepteurs-redacteurs, photographes
- PRODUCTION : impression (print), tournage/montage (video), developpement web
- ACHAT D'ESPACE : espaces publicitaires (TV, presse, affichage, digital)
- HONORAIRES AGENCE : frais de conseil, gestion de projet (15-20% du budget en moyenne)
- FRAIS TECHNIQUES : logiciels, hebergement, outils digitaux

REPARTITION MEDIA / HORS-MEDIA :
- Historiquement : 60% media / 40% hors-media
- Tendance actuelle : le digital brouille les frontieres. Le hors-media (dont digital) depasse souvent le media.

ROI (Return On Investment) = (Gains - Couts) / Couts x 100
Permet de mesurer la rentabilite d'une action de communication.

METHODES DE FIXATION DU BUDGET :
- % du CA (souvent 2-5% pour les PME, 10-20% pour le luxe)
- Alignement concurrentiel (depenser autant que les concurrents)
- Objectifs/moyens (definir les objectifs puis estimer les couts)
- Budget disponible (on utilise ce qu'on a)`,
        keyPoints: [
          "Postes : creation, production, achat espace, honoraires agence",
          "ROI = (Gains - Couts) / Couts x 100",
          "Methodes de fixation : % CA, alignement, objectifs, budget disponible",
        ],
        flashcards: [
          { id: "f-pb4", front: "Quels sont les principaux postes de depenses d'un budget de communication ?", back: "1. CREATION (honoraires, DA, CR). 2. PRODUCTION (impression, tournage, dev web). 3. ACHAT D'ESPACE (espaces pub). 4. HONORAIRES AGENCE (conseil, 15-20%). 5. FRAIS TECHNIQUES (outils, logiciels).", difficulty: "medium", tags: ["budget"] },
          { id: "f-pb5", front: "Comment calcule-t-on le ROI ?", back: "ROI = (GAINS - COUTS) / COUTS x 100. Ex : campagne qui coute 10 000 EUR et genere 30 000 EUR de ventes = (30 000 - 10 000) / 10 000 x 100 = 200% de ROI.", difficulty: "medium", tags: ["budget", "roi"] },
          { id: "f-pb6", front: "Quelles sont les 4 methodes de fixation du budget de communication ?", back: "1. % du CA (2-5% PME, 10-20% luxe). 2. Alignement CONCURRENTIEL. 3. OBJECTIFS/MOYENS (budget en fonction des objectifs). 4. Budget DISPONIBLE (on fait avec ce qu'on a).", difficulty: "hard", tags: ["budget", "methodes"] },
          { id: "f-pb7", front: "Quel pourcentage du CA les entreprises consacrent-elles a la communication ?", back: "En moyenne 2-5% du CA pour les PME. Jusqu'a 10-20% pour le luxe et les startups. Ce ratio varie enormement selon le secteur, la taille de l'entreprise et la phase de vie du produit.", difficulty: "medium", tags: ["budget"] },
        ],
        quiz: [
          { id: "q-pb3", question: "Le ROI se calcule par :", options: ["Gains x Couts", "(Gains - Couts) / Couts x 100", "Budget / audience", "Clics / impressions"], correctIndex: 1, explanation: "ROI = (Gains - Couts) / Couts x 100. C'est le retour sur investissement exprime en pourcentage. Un ROI de 200% signifie qu'on a gagne 2 EUR pour chaque euro investi.", difficulty: "medium", tags: ["budget"] },
          { id: "q-pb4", question: "Les honoraires agence representent en moyenne :", options: ["1-5% du budget", "15-20% du budget", "50% du budget", "80% du budget"], correctIndex: 1, explanation: "Les honoraires d'agence representent generalement 15-20% du budget total de la campagne. Ils couvrent le conseil, la strategie, la gestion de projet et la coordination.", difficulty: "medium", tags: ["budget"] },
          { id: "q-pb5", question: "La methode 'objectifs/moyens' pour fixer le budget consiste a :", options: ["Depenser autant que les concurrents", "Definir les objectifs puis estimer les couts necessaires", "Utiliser un pourcentage fixe du CA", "Depenser le budget disponible"], correctIndex: 1, explanation: "Methode objectifs/moyens : on definit d'abord les OBJECTIFS, puis on estime les MOYENS (et donc le budget) necessaires pour les atteindre. C'est la methode la plus rationnelle.", difficulty: "hard", tags: ["budget"] },
        ],
      },
      {
        id: "retroplanning-kpis",
        title: "Retroplanning et KPIs",
        content: `LE RETROPLANNING :
Un retroplanning se construit A REBOURS, depuis la date de livraison finale vers la date de debut.

Methode :
1. Fixer la date de LANCEMENT (deadline finale)
2. Identifier toutes les ETAPES necessaires
3. Estimer la DUREE de chaque etape
4. Placer les etapes en remontant dans le temps
5. Identifier les JALONS (milestones) : points de validation
6. Verifier la faisabilite et ajuster

Outils : diagramme de Gantt, tableur, Trello, Asana, Monday.

LES KPIs (Key Performance Indicators) :
- REACH (portee) : nombre de personnes touchees
- IMPRESSIONS : nombre de fois ou le contenu est affiche
- ENGAGEMENT : likes, commentaires, partages, clics
- CTR (Click-Through Rate) : clics / impressions x 100
- TAUX DE CONVERSION : actions realisees / visites x 100
- NOTORIETE : assistee, spontanee, top of mind (via sondages)
- COUT PAR CLIC (CPC) : budget / nombre de clics
- COUT PAR MILLE (CPM) : cout pour 1000 impressions

BILAN POST-CAMPAGNE : comparer les KPIs obtenus aux objectifs fixes. Identifier les succes et les axes d'amelioration.`,
        keyPoints: [
          "Retroplanning = construction a rebours depuis la deadline",
          "Jalons = points de validation",
          "KPIs : reach, impressions, engagement, CTR, conversion, notoriete, CPC, CPM",
          "Bilan post-campagne : comparer resultats vs objectifs",
        ],
        flashcards: [
          { id: "f-pb8", front: "Qu'est-ce qu'un RETROPLANNING et comment le construire ?", back: "Planning construit A REBOURS depuis la date finale. 1. Fixer la deadline. 2. Lister les etapes. 3. Estimer les durees. 4. Placer en remontant. 5. Identifier les jalons. C'est le planning standard en communication.", difficulty: "easy", tags: ["planning"] },
          { id: "f-pb9", front: "Qu'est-ce que le CTR et comment le calcule-t-on ?", back: "CTR = Click-Through Rate = CLICS / IMPRESSIONS x 100. C'est le taux de clic. Un CTR de 2% signifie que 2 personnes sur 100 qui voient la pub cliquent dessus. Bon CTR digital = 1-3%.", difficulty: "medium", tags: ["kpi", "ctr"] },
          { id: "f-pb10", front: "Quelle difference entre REACH et IMPRESSIONS ?", back: "REACH (portee) = nombre de PERSONNES uniques touchees. IMPRESSIONS = nombre de FOIS ou le contenu est affiche (une personne peut voir 3 fois = 1 reach, 3 impressions). Impressions >= Reach toujours.", difficulty: "medium", tags: ["kpi"] },
          { id: "f-pb11", front: "Qu'est-ce qu'un JALON (milestone) dans un retroplanning ?", back: "Point de VALIDATION obligatoire avant de passer a l'etape suivante. Ex : validation du BAT (Bon A Tirer) par le client, accord sur la maquette, validation du script video. Les jalons structurent le projet.", difficulty: "easy", tags: ["planning", "jalon"] },
        ],
        quiz: [
          { id: "q-pb6", question: "Le retroplanning se construit :", options: ["Du debut vers la fin", "A rebours, de la deadline vers le debut", "Au hasard", "Par ordre alphabetique"], correctIndex: 1, explanation: "Le retroplanning se construit A REBOURS : on part de la date de lancement et on remonte dans le temps. Cela permet de s'assurer que toutes les etapes sont realisables dans les delais.", difficulty: "easy", tags: ["planning"] },
          { id: "q-pb7", question: "Le CTR se calcule par :", options: ["Impressions / clics", "Clics / impressions x 100", "Reach / budget", "Likes / abonnes"], correctIndex: 1, explanation: "CTR = CLICS / IMPRESSIONS x 100. C'est le pourcentage de personnes qui cliquent apres avoir vu le contenu. Un bon CTR en digital se situe entre 1% et 3%.", difficulty: "medium", tags: ["kpi"] },
          { id: "q-pb8", question: "Le reach designe :", options: ["Le nombre total d'impressions", "Le nombre de personnes uniques touchees", "Le budget de la campagne", "Le nombre de partages"], correctIndex: 1, explanation: "REACH = nombre de personnes UNIQUES touchees. C'est different des impressions (nombre total d'affichages). 1 personne qui voit 3 fois = 1 reach, 3 impressions.", difficulty: "easy", tags: ["kpi"] },
        ],
      },
    ],
  },
  {
    id: "droit-communication",
    title: "Droit de la communication",
    exam: "e5",
    chapters: [
      {
        id: "rgpd",
        title: "RGPD",
        content: `Le RGPD (Reglement General sur la Protection des Donnees) est entre en vigueur le 25 mai 2018 dans toute l'UE.

7 PRINCIPES :
1. LICEITE : traitement lawful (consentement, contrat, interet legitime...)
2. LIMITATION DES FINALITES : collecte pour une finalite precise et explicite
3. MINIMISATION : ne collecter que les donnees NECESSAIRES
4. EXACTITUDE : donnees a jour et exactes
5. LIMITATION DE CONSERVATION : ne pas garder les donnees plus longtemps que necessaire
6. INTEGRITE ET CONFIDENTIALITE : securiser les donnees
7. RESPONSABILITE (accountability) : prouver qu'on respecte le reglement

DROITS DES PERSONNES :
- Droit d'ACCES : savoir quelles donnees sont collectees
- Droit de RECTIFICATION : corriger des donnees inexactes
- Droit a l'EFFACEMENT ('droit a l'oubli')
- Droit a la PORTABILITE : recuperer ses donnees dans un format lisible
- Droit d'OPPOSITION : refuser le traitement de ses donnees

DPO (Data Protection Officer) : responsable de la protection des donnees au sein de l'organisation. Obligatoire pour les organismes publics et les grandes entreprises.

SANCTIONS : jusqu'a 20 millions d'euros ou 4% du CA MONDIAL annuel (le montant le plus eleve). La CNIL est l'autorite de controle en France.`,
        keyPoints: [
          "RGPD : 25 mai 2018, 7 principes, droits des personnes",
          "Sanctions : jusqu'a 4% du CA mondial",
          "DPO : responsable protection des donnees",
          "CNIL : autorite de controle en France",
        ],
        flashcards: [
          { id: "f-dr1", front: "Quand le RGPD est-il entre en vigueur ?", back: "Le 25 mai 2018, dans toute l'Union Europeenne. C'est le reglement le plus strict au monde en matiere de protection des donnees personnelles.", difficulty: "easy", tags: ["rgpd", "droit"] },
          { id: "f-dr2", front: "Quels sont les principaux droits des personnes selon le RGPD ?", back: "Droit d'ACCES, de RECTIFICATION, a l'EFFACEMENT (oubli), a la PORTABILITE, d'OPPOSITION. Toute personne peut exercer ces droits aupres de l'organisme qui detient ses donnees.", difficulty: "medium", tags: ["rgpd", "droits"] },
          { id: "f-dr3", front: "Quelles sont les sanctions maximales du RGPD ?", back: "Jusqu'a 20 millions d'euros ou 4% du CA MONDIAL annuel (le montant le plus eleve). Exemple : Meta a ete sanctionne de 1,2 milliard d'euros en 2023 par la CNIL irlandaise.", difficulty: "medium", tags: ["rgpd", "sanctions"] },
          { id: "f-dr4", front: "Qu'est-ce que le DPO et quand est-il obligatoire ?", back: "DPO (Data Protection Officer) = responsable de la protection des donnees. Obligatoire pour les organismes PUBLICS, les entreprises traitant des donnees a grande echelle, et celles traitant des donnees sensibles.", difficulty: "hard", tags: ["rgpd", "dpo"] },
          { id: "f-dr5", front: "Que signifie le principe de MINIMISATION des donnees ?", back: "Ne collecter que les donnees STRICTEMENT NECESSAIRES a la finalite declaree. Si un formulaire demande le numero de telephone pour une newsletter email, c'est une violation du principe de minimisation.", difficulty: "medium", tags: ["rgpd", "principes"] },
        ],
        quiz: [
          { id: "q-dr1", question: "Le RGPD est entre en vigueur en :", options: ["2016", "2018", "2020", "2022"], correctIndex: 1, explanation: "Le RGPD est entre en vigueur le 25 mai 2018. Il avait ete adopte en 2016 avec un delai de 2 ans pour la mise en conformite.", difficulty: "easy", tags: ["rgpd"] },
          { id: "q-dr2", question: "La sanction maximale du RGPD est :", options: ["1 million d'euros", "10 millions d'euros", "4% du CA mondial ou 20M EUR", "Pas de sanction prevue"], correctIndex: 2, explanation: "Sanctions max = 20 millions EUR ou 4% du CA MONDIAL annuel (le plus eleve). C'est dissuasif meme pour les GAFAM.", difficulty: "medium", tags: ["rgpd"] },
          { id: "q-dr3", question: "La CNIL est :", options: ["Un media", "L'autorite de controle du RGPD en France", "Un syndicat de journalistes", "Un tribunal"], correctIndex: 1, explanation: "CNIL = Commission Nationale de l'Informatique et des Libertes. C'est l'autorite de controle du RGPD en France. Elle peut sanctionner les violations.", difficulty: "easy", tags: ["rgpd", "cnil"] },
          { id: "q-dr4", question: "Le droit a la portabilite permet :", options: ["De supprimer ses donnees", "De recuperer ses donnees dans un format lisible", "De refuser les cookies", "De changer de fournisseur internet"], correctIndex: 1, explanation: "Portabilite = recuperer ses donnees dans un format LISIBLE et structure pour les transferer a un autre service. Ex : recuperer toutes ses photos Facebook.", difficulty: "medium", tags: ["rgpd"] },
        ],
      },
      {
        id: "droit-image",
        title: "Droit a l'image",
        content: `Le droit a l'image est un droit de la PERSONNALITE (article 9 du Code civil).

PRINCIPES :
- Toute personne a un droit exclusif sur son IMAGE
- La diffusion de l'image d'une personne necessite son AUTORISATION ECRITE prealable
- L'autorisation doit preciser : le support, la duree, le territoire, la finalite
- L'autorisation peut etre RETIREE a tout moment

CAS PARTICULIERS :
- LIEUX PUBLICS : droit de photographier les foules, mais pas de cadrer une personne identifiable sans son accord
- MINEURS : autorisation des DEUX parents (ou du tuteur legal) obligatoire
- PERSONNALITES PUBLIQUES : droit a l'image reste, mais tolerance plus grande dans l'exercice de leurs fonctions publiques
- SALARIES : l'employeur doit obtenir l'autorisation pour utiliser la photo d'un salarie

SANCTIONS : le non-respect du droit a l'image peut entrainer des dommages-interets et la cessation de la diffusion. Jusqu'a 1 an d'emprisonnement et 45 000 EUR d'amende (art. 226-1 Code penal).`,
        keyPoints: [
          "Autorisation ECRITE prealable obligatoire",
          "Preciser : support, duree, territoire, finalite",
          "Mineurs : autorisation des DEUX parents",
          "Sanctions : dommages-interets, jusqu'a 45 000 EUR d'amende",
        ],
        flashcards: [
          { id: "f-dr6", front: "Quelles mentions doit contenir une autorisation de droit a l'image ?", back: "Le SUPPORT (affiche, site web, RS...), la DUREE (1 an, illimitee...), le TERRITOIRE (France, monde...), la FINALITE (campagne pub, usage interne...). Sans ces mentions, l'autorisation est incomplete.", difficulty: "medium", tags: ["droit-image"] },
          { id: "f-dr7", front: "Pour un mineur, qui doit signer l'autorisation de droit a l'image ?", back: "Les DEUX parents (ou le tuteur legal). L'autorisation d'un seul parent est insuffisante. C'est une obligation renforcee pour proteger les mineurs.", difficulty: "medium", tags: ["droit-image", "mineurs"] },
          { id: "f-dr8", front: "Peut-on photographier des passants dans la rue pour une campagne ?", back: "NON si les personnes sont IDENTIFIABLES. On peut photographier une FOULE en plan large, mais on ne peut pas cadrer une personne reconnaissable sans son AUTORISATION ECRITE. Meme dans un lieu public.", difficulty: "hard", tags: ["droit-image"] },
        ],
        quiz: [
          { id: "q-dr5", question: "L'autorisation de droit a l'image doit etre :", options: ["Orale suffit", "Ecrite et precisant support, duree, territoire, finalite", "Tacite (pas besoin de demander)", "Signee par un notaire"], correctIndex: 1, explanation: "L'autorisation doit etre ECRITE et preciser le support, la duree, le territoire et la finalite d'utilisation. Une autorisation orale n'est pas suffisante juridiquement.", difficulty: "easy", tags: ["droit-image"] },
          { id: "q-dr6", question: "Pour photographier un enfant pour une campagne, il faut :", options: ["L'accord de l'enfant suffit", "L'accord d'un seul parent", "L'accord des DEUX parents", "Aucun accord si lieu public"], correctIndex: 2, explanation: "Les DEUX parents doivent signer l'autorisation pour un mineur. C'est une protection renforcee. L'accord de l'enfant seul n'a aucune valeur juridique.", difficulty: "medium", tags: ["droit-image"] },
          { id: "q-dr7", question: "Les sanctions pour violation du droit a l'image peuvent aller jusqu'a :", options: ["500 EUR d'amende", "10 000 EUR d'amende", "45 000 EUR d'amende et 1 an de prison", "Aucune sanction"], correctIndex: 2, explanation: "Jusqu'a 45 000 EUR d'amende et 1 an d'emprisonnement (art. 226-1 Code penal), plus des dommages-interets civils et la cessation de la diffusion.", difficulty: "hard", tags: ["droit-image"] },
        ],
      },
      {
        id: "propriete-intellectuelle",
        title: "Propriete intellectuelle",
        content: `La propriete intellectuelle protege les CREATIONS de l'esprit.

DROIT D'AUTEUR :
- Protection AUTOMATIQUE des la creation (pas besoin de depot)
- 2 types de droits :
  * DROIT MORAL : inalienable, imprescriptible. Droit au nom, au respect de l'oeuvre, de divulgation
  * DROIT PATRIMONIAL : droit de reproduction et de representation. Cessible, dure 70 ans POST-MORTEM
- Concerne : textes, photos, illustrations, videos, musiques, logiciels, sites web

DROIT DES MARQUES :
- Depot a l'INPI (Institut National de la Propriete Industrielle)
- Classes de Nice : 45 categories de produits/services
- Protection pour 10 ans RENOUVELABLE indefiniment
- Contrefacon : utiliser une marque deposee sans autorisation

CREATIVE COMMONS : licences alternatives qui permettent aux auteurs de definir les conditions de reutilisation de leurs oeuvres (usage non commercial, partage dans les memes conditions, avec attribution...).`,
        keyPoints: [
          "Droit d'auteur : automatique, moral (inalienable) + patrimonial (70 ans post-mortem)",
          "Marques : depot INPI, classes Nice, 10 ans renouvelable",
          "Contrefacon : utilisation non autorisee d'une marque/oeuvre",
          "Creative Commons : licences alternatives de partage",
        ],
        flashcards: [
          { id: "f-dr9", front: "Quelle difference entre droit MORAL et droit PATRIMONIAL en droit d'auteur ?", back: "MORAL = inalienable, imprescriptible (droit au nom, respect de l'oeuvre). PATRIMONIAL = cessible, dure 70 ans post-mortem (droit de reproduction et representation). On peut vendre le patrimonial, JAMAIS le moral.", difficulty: "medium", tags: ["propriete-intellectuelle"] },
          { id: "f-dr10", front: "Faut-il deposer une oeuvre pour etre protege par le droit d'auteur ?", back: "NON ! Le droit d'auteur est AUTOMATIQUE des la creation. Pas besoin de depot ni de copyright. En France, l'oeuvre est protegee des qu'elle est originale et fixee sur un support.", difficulty: "medium", tags: ["propriete-intellectuelle"] },
          { id: "f-dr11", front: "Comment proteger une MARQUE en France ?", back: "Par un depot a l'INPI (Institut National de la Propriete Industrielle). On choisit les CLASSES de Nice (45 categories). La protection dure 10 ANS, renouvelable indefiniment.", difficulty: "medium", tags: ["propriete-intellectuelle", "marque"] },
          { id: "f-dr12", front: "Que sont les licences Creative Commons ?", back: "Des licences ALTERNATIVES au droit d'auteur classique. L'auteur choisit les conditions de reutilisation : attribution (BY), non commercial (NC), partage identique (SA), pas de modification (ND). Utile pour le content marketing.", difficulty: "hard", tags: ["propriete-intellectuelle", "creative-commons"] },
        ],
        quiz: [
          { id: "q-dr8", question: "Le droit d'auteur en France est :", options: ["Automatique des la creation", "Soumis a un depot obligatoire", "Reserve aux artistes professionnels", "Valable 20 ans"], correctIndex: 0, explanation: "Le droit d'auteur est AUTOMATIQUE : l'oeuvre est protegee des sa creation, sans aucun depot. Il faut simplement qu'elle soit originale et fixee sur un support.", difficulty: "easy", tags: ["propriete-intellectuelle"] },
          { id: "q-dr9", question: "Le droit patrimonial d'auteur dure :", options: ["20 ans apres la creation", "50 ans post-mortem", "70 ans post-mortem", "Eternellement"], correctIndex: 2, explanation: "Le droit PATRIMONIAL dure 70 ans apres la mort de l'auteur. Apres, l'oeuvre tombe dans le domaine public. Le droit MORAL, lui, est imprescriptible.", difficulty: "medium", tags: ["propriete-intellectuelle"] },
          { id: "q-dr10", question: "Le depot de marque se fait aupres de :", options: ["La CNIL", "L'INPI", "L'ARCOM", "L'ARPP"], correctIndex: 1, explanation: "INPI = Institut National de la Propriete Industrielle. C'est l'organisme ou l'on depose les marques, brevets et dessins/modeles en France.", difficulty: "easy", tags: ["propriete-intellectuelle"] },
        ],
      },
      {
        id: "pub-reglementee",
        title: "Publicite reglementee",
        content: `Certains secteurs font l'objet d'une reglementation specifique en matiere de publicite :

ALCOOL - LOI EVIN (1991) :
- Publicite limitee a l'indication de l'origine, composition, degre, mode de consommation
- INTERDITE a la TV, au cinema, dans les publications jeunesse
- Mention obligatoire : 'L'abus d'alcool est dangereux pour la sante'
- Pas d'association avec le sport, la jeunesse, la seduction
- Internet autorise depuis 2009 (sous conditions)

TABAC :
- Publicite TOTALEMENT INTERDITE depuis la loi Evin (1991)
- Paquets neutres obligatoires depuis 2017
- Seule la prevention est autorisee

SANTE :
- Mentions sanitaires obligatoires ('Manger 5 fruits et legumes par jour')
- Les medicaments : publicite autorisee uniquement pour les medicaments sans ordonnance
- Cosmetiques : ne peuvent pas revendiquer des proprietes medicales

PUBLICITE COMPARATIVE (art. L121-8 Code de la consommation) :
- Autorisee en France depuis 1992, sous conditions strictes
- Doit comparer des produits/services OBJECTIVEMENT comparables
- Ne doit pas etre TROMPEUSE ou DENIGRANTE
- Doit porter sur des caracteristiques essentielles, pertinentes, verifiables

PUBLICITE MENSONGERE (art. L121-2) :
- Sanctionnee penalement : jusqu'a 2 ans de prison et 300 000 EUR d'amende
- Publicite contenant des allegations fausses ou de nature a induire en erreur`,
        keyPoints: [
          "Loi Evin (1991) : alcool et tabac",
          "Tabac : pub totalement interdite, paquets neutres depuis 2017",
          "Pub comparative : autorisee mais sous conditions strictes",
          "Pub mensongere : jusqu'a 2 ans de prison et 300 000 EUR d'amende",
        ],
        flashcards: [
          { id: "f-dr13", front: "Que prevoit la loi EVIN pour la publicite de l'ALCOOL ?", back: "Pub limitee aux caracteristiques du produit (origine, degre). INTERDITE a la TV, cinema, jeunesse. Pas d'association sport/jeunesse/seduction. Mention obligatoire sur les dangers de l'alcool. Internet autorise depuis 2009.", difficulty: "medium", tags: ["pub-reglementee", "evin"] },
          { id: "f-dr14", front: "La publicite pour le TABAC est-elle autorisee en France ?", back: "NON, elle est TOTALEMENT INTERDITE depuis la loi Evin (1991). De plus, les paquets neutres sont obligatoires depuis 2017. Seules les campagnes de PREVENTION sont autorisees.", difficulty: "easy", tags: ["pub-reglementee", "tabac"] },
          { id: "f-dr15", front: "Quelles sont les conditions de la publicite COMPARATIVE ?", back: "Autorisee depuis 1992 mais : doit comparer des produits OBJECTIVEMENT comparables, ne doit pas etre TROMPEUSE ni DENIGRANTE, doit porter sur des caracteristiques verifiables. Ex : comparaison de prix entre enseignes.", difficulty: "hard", tags: ["pub-reglementee", "comparative"] },
        ],
        quiz: [
          { id: "q-dr11", question: "La loi Evin (1991) concerne :", options: ["Le tabac uniquement", "L'alcool uniquement", "L'alcool ET le tabac", "Les medicaments"], correctIndex: 2, explanation: "La loi EVIN (1991) reglemente la publicite pour l'ALCOOL (restrictions) ET le TABAC (interdiction totale). C'est LA loi de reference en matiere de publicite reglementee.", difficulty: "easy", tags: ["pub-reglementee"] },
          { id: "q-dr12", question: "La publicite comparative en France est :", options: ["Totalement interdite", "Autorisee sans conditions", "Autorisee sous conditions strictes", "Reservee aux produits alimentaires"], correctIndex: 2, explanation: "La pub comparative est AUTORISEE depuis 1992 mais sous CONDITIONS : produits comparables, pas de denigrement, pas de tromperie, caracteristiques verifiables.", difficulty: "medium", tags: ["pub-reglementee"] },
          { id: "q-dr13", question: "Les sanctions pour publicite mensongere peuvent aller jusqu'a :", options: ["500 EUR d'amende", "10 000 EUR d'amende", "2 ans de prison et 300 000 EUR d'amende", "Aucune sanction penale"], correctIndex: 2, explanation: "Pub mensongere = delit penal : jusqu'a 2 ans de prison et 300 000 EUR d'amende. C'est tres severe car la tromperie du consommateur est consideree comme grave.", difficulty: "hard", tags: ["pub-reglementee"] },
        ],
      },
    ],
  },
  // =========================================
  // E6 - PORTFOLIO ORAL
  // =========================================
  {
    id: "portfolio-construction",
    title: "Construire son portfolio",
    exam: "e6",
    chapters: [
      {
        id: "portfolio-contenu",
        title: "Contenu et structure du portfolio",
        content: `Le portfolio numerique est le dossier professionnel presente a l'oral E6. Il regroupe TOUTES les productions realisees pendant la formation.

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
- Digital : posts RS, newsletters, bannieres web, sites
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
          { id: "f-pf1", front: "Quels sont les elements obligatoires du portfolio E6 ?", back: "Attestations de stages, TABLEAU SYNOPTIQUE (productions/annonceurs/supports), 3 FICHES DESCRIPTIVES de situations pro, et toutes les PRODUCTIONS realisees.", difficulty: "easy", tags: ["portfolio", "contenu"] },
          { id: "f-pf2", front: "Combien de fiches descriptives faut-il pour l'oral E6 ?", back: "3 fiches descriptives de situations professionnelles EMBLEMATIQUES. Au moins 1 doit etre basee sur une experience de STAGE (demande reelle d'un annonceur).", difficulty: "easy", tags: ["portfolio", "fiches"] },
          { id: "f-pf3", front: "Quels types de productions doit contenir le portfolio ?", back: "DIVERSITE obligatoire : Print (affiches, flyers), Digital (posts RS, site), Audiovisuel (videos, spots), Evenementiel, RP (communiques de presse). Pas que du print !", difficulty: "medium", tags: ["portfolio", "productions"] },
          { id: "f-pf4", front: "Qu'est-ce que le tableau synoptique du portfolio ?", back: "Un TABLEAU RECAPITULATIF de toutes les productions : nom du projet, annonceur, type de support, competences mobilisees. Il permet au jury d'avoir une vue d'ensemble de votre parcours.", difficulty: "medium", tags: ["portfolio", "synoptique"] },
          { id: "f-pf5", front: "Pourquoi la diversite des supports est-elle importante dans le portfolio ?", back: "Le jury evalue la POLYVALENCE. Un portfolio uniquement print = candidat limite. Il faut montrer des competences en print, digital, audiovisuel. Cela prouve qu'on maitrise le BLOC 2 dans sa totalite.", difficulty: "medium", tags: ["portfolio", "diversite"] },
          { id: "f-pf6", front: "PIEGE EXAMEN : Peut-on presenter uniquement des travaux scolaires dans le portfolio ?", back: "NON, au moins 1 fiche doit porter sur une experience de STAGE (demande reelle d'un annonceur). Le jury veut voir que vous savez repondre a une VRAIE demande professionnelle, pas seulement des exercices.", difficulty: "hard", tags: ["portfolio", "piege"] },
        ],
        quiz: [
          { id: "q-pf1", question: "Combien de fiches descriptives sont requises pour l'oral E6 ?", options: ["1", "2", "3", "5"], correctIndex: 2, explanation: "3 fiches descriptives de situations professionnelles. Elles doivent couvrir la totalite des activites du bloc 2, et au moins 1 doit venir d'un STAGE.", difficulty: "easy", tags: ["portfolio"] },
          { id: "q-pf2", question: "Le tableau synoptique est :", options: ["Un planning de projet", "Un recapitulatif de toutes les productions", "Un budget previsionnel", "Un CV detaille"], correctIndex: 1, explanation: "Le tableau synoptique = RECAPITULATIF de toutes les productions realisees pendant la formation (nom, annonceur, support, competences). Vue d'ensemble pour le jury.", difficulty: "easy", tags: ["portfolio"] },
          { id: "q-pf3", question: "Le portfolio doit contenir :", options: ["Uniquement des travaux print", "Une diversite de supports (print, digital, audiovisuel)", "Uniquement des travaux de stage", "Uniquement des travaux scolaires"], correctIndex: 1, explanation: "DIVERSITE obligatoire : print + digital + audiovisuel + evenementiel + RP. Le jury evalue la polyvalence et la maitrise complete du bloc 2.", difficulty: "easy", tags: ["portfolio"] },
          { id: "q-pf4", question: "Au moins combien de fiches doivent porter sur une experience de stage ?", options: ["0", "1", "2", "3"], correctIndex: 1, explanation: "Au moins 1 fiche sur 3 doit porter sur une experience de STAGE (demande reelle d'un annonceur). Les 2 autres peuvent etre des projets scolaires ou associatifs.", difficulty: "medium", tags: ["portfolio"] },
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
        content: `DEROULEMENT DE L'ORAL E6 (40 minutes total) :

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
          { id: "f-or1", front: "Quelle est la duree totale de l'oral E6 ?", back: "40 minutes : Situation A (evaluation continue) + Situation B (oral final de 20 min max : 5 min presentation + 15 min echange avec le jury).", difficulty: "easy", tags: ["oral", "format"] },
          { id: "f-or2", front: "Quelle posture adopter a l'oral E6 ?", back: "Se positionner en PROFESSIONNEL, pas en etudiant. Adopter une posture de presentation CLIENT. Justifier chaque choix creatif avec des arguments professionnels.", difficulty: "medium", tags: ["oral", "posture"] },
          { id: "f-or3", front: "Quels sont les criteres d'evaluation de l'oral E6 ?", back: "Maitrise des competences bloc 2, capacite a EXPLICITER et JUSTIFIER ses choix, comprehension du cadre professionnel, DIVERSITE et qualite des productions, coherence du parcours.", difficulty: "medium", tags: ["oral", "evaluation"] },
          { id: "f-or4", front: "Comment repondre a 'Pourquoi cette couleur/typo/composition ?'", back: "Toujours JUSTIFIER par : 1. La CIBLE (adapte a ses attentes). 2. Le POSITIONNEMENT (coherent avec l'image). 3. La SEMIOLOGIE (symbolique des couleurs/formes). 4. Les REFERENCES (benchmark, tendances). Ne jamais dire 'parce que c'est joli'.", difficulty: "hard", tags: ["oral", "justification"] },
          { id: "f-or5", front: "Comment repondre a 'Qu'auriez-vous fait differemment ?'", back: "Montrer de l'AUTO-CRITIQUE constructive. Identifier 1-2 points d'amelioration PRECIS (pas 'tout refaire'). Expliquer POURQUOI et CE QUE vous feriez autrement. Cela montre la maturite professionnelle.", difficulty: "medium", tags: ["oral", "piege"] },
          { id: "f-or6", front: "Combien de fois faut-il repeter son oral avant le jour J ?", back: "Au minimum 3-5 fois CHRONOMETRE. Repeter devant un miroir, puis devant des proches, puis en conditions reelles. Verifier : timing (5 min), fluidite, regard, gestion des transitions.", difficulty: "easy", tags: ["oral", "preparation"] },
          { id: "f-or7", front: "Quel materiel apporter le jour de l'oral E6 ?", back: "ORDINATEUR avec le portfolio en PDF, classeur PHYSIQUE avec les productions, cle USB de secours, chargeur, fiches aide-memoire (autorisees ou non selon les centres). Arriver 30 min en avance.", difficulty: "easy", tags: ["oral", "materiel"] },
          { id: "f-or8", front: "PIEGE EXAMEN : Que faire si le jury pose une question sur une production qu'on maitrise mal ?", back: "NE PAS mentir ni inventer. Reconnaitre honnetement les limites ('sur ce point, j'aurais pu aller plus loin'). Rediriger vers ce qu'on MAITRISE. Le jury respecte l'honnetete et l'auto-critique plus que le bluff.", difficulty: "hard", tags: ["oral", "piege"] },
        ],
        quiz: [
          { id: "q-or1", question: "A l'oral E6, il faut se positionner en :", options: ["Etudiant qui apprend", "Professionnel de la communication", "Artiste creatif", "Spectateur critique"], correctIndex: 1, explanation: "Il faut se positionner en PROFESSIONNEL. Le jury evalue votre capacite a vous inserer dans le milieu professionnel. Adoptez une posture de presentation client.", difficulty: "easy", tags: ["oral"] },
          { id: "q-or2", question: "La presentation du parcours dure :", options: ["2 minutes", "5 minutes", "10 minutes", "20 minutes"], correctIndex: 1, explanation: "5 minutes pour la presentation initiale du parcours de professionnalisation, puis 15 minutes d'echange avec le jury. Il faut etre SYNTHETIQUE et pertinent.", difficulty: "easy", tags: ["oral"] },
          { id: "q-or3", question: "Face a la question 'Pourquoi cette couleur ?', il faut :", options: ["Repondre 'parce que c'est joli'", "Justifier par la cible, le positionnement et la semiologie", "Dire qu'on ne sait pas", "Changer de sujet"], correctIndex: 1, explanation: "Toute reponse doit etre JUSTIFIEE professionnellement : coherence avec la cible, le positionnement, la symbolique des couleurs. 'C'est joli' n'est PAS un argument professionnel.", difficulty: "medium", tags: ["oral"] },
          { id: "q-or4", question: "Face a 'Qu'auriez-vous fait differemment ?', il faut :", options: ["Dire que tout est parfait", "Montrer de l'auto-critique constructive", "Critiquer severement son travail", "Accuser le client"], correctIndex: 1, explanation: "AUTO-CRITIQUE CONSTRUCTIVE : identifier des points d'amelioration precis, expliquer pourquoi et ce qu'on ferait autrement. Ni trop positif ('tout est parfait') ni trop negatif.", difficulty: "medium", tags: ["oral"] },
          { id: "q-or5", question: "La grille d'evaluation de l'oral E6 inclut :", options: ["Uniquement la qualite graphique", "La maitrise des competences, la justification, la diversite, la coherence", "Uniquement l'expression orale", "Uniquement les productions de stage"], correctIndex: 1, explanation: "La grille est COMPLETE : maitrise des competences bloc 2, capacite a justifier, comprehension pro, diversite/qualite des productions, coherence du parcours, expression orale.", difficulty: "medium", tags: ["oral"] },
          { id: "q-or6", question: "Si on ne connait pas la reponse a une question du jury, il faut :", options: ["Inventer une reponse", "Reconnaitre honnetement et rediriger", "Rester silencieux", "Accuser le jury de poser des questions pieges"], correctIndex: 1, explanation: "HONNETETE + REDIRECTION : 'Sur ce point, j'aurais pu approfondir, mais ce que j'ai developpe sur [sujet maitrise] montre que...'. Le jury respecte l'honnetete plus que le bluff.", difficulty: "hard", tags: ["oral"] },
        ],
      },
    ],
  },
  // =========================================
  // E6 - NOUVEAUX MODULES
  // =========================================
  {
    id: "fiches-descriptives",
    title: "Rediger ses 3 fiches descriptives",
    exam: "e6",
    chapters: [
      {
        id: "structure-fiche",
        title: "Structure d'une fiche descriptive",
        content: `Chaque fiche descriptive de situation professionnelle suit une structure precise :

1. CONTEXTE DE L'ORGANISATION :
   - Nom, secteur d'activite, taille, positionnement
   - Problematique de communication identifiee
   - Votre role dans l'organisation (stagiaire, etudiant en projet)

2. PROBLEMATIQUE :
   - Quel etait le BESOIN de l'annonceur/client ?
   - Quel probleme de communication fallait-il resoudre ?
   - Formuler sous forme de question : "Comment... ?"

3. OBJECTIFS :
   - Objectifs de communication (cognitif, affectif, conatif)
   - Objectifs operationnels (livrables, delais)

4. CIBLES :
   - Cible principale, coeur de cible, cible secondaire

5. MOYENS MIS EN OEUVRE :
   - Strategie adoptee, choix des supports, outils utilises
   - Budget (si applicable)

6. PRODUCTIONS REALISEES :
   - Liste detaillee des livrables (avec visuels dans le portfolio)
   - Logiciels utilises (Photoshop, Illustrator, InDesign, Canva, Premiere...)

7. RESULTATS :
   - KPIs obtenus (si mesurables)
   - Retours du client/tuteur
   - Objectifs atteints ou non (et pourquoi)

8. BILAN PERSONNEL :
   - Ce que vous avez appris
   - Competences developpees
   - Ce que vous feriez differemment`,
        keyPoints: [
          "8 sections : contexte, problematique, objectifs, cibles, moyens, productions, resultats, bilan",
          "La problematique doit etre formulee en question ('Comment... ?')",
          "Le bilan personnel est ESSENTIEL (auto-critique)",
          "Chaque production doit etre visible dans le portfolio",
        ],
        flashcards: [
          { id: "f-fd1", front: "Quelles sont les 8 sections d'une fiche descriptive ?", back: "1. Contexte de l'organisation. 2. Problematique. 3. Objectifs. 4. Cibles. 5. Moyens mis en oeuvre. 6. Productions realisees. 7. Resultats. 8. Bilan personnel.", difficulty: "medium", tags: ["fiches", "structure"] },
          { id: "f-fd2", front: "Comment formuler la problematique d'une fiche ?", back: "Sous forme de QUESTION : 'Comment augmenter la notoriete de X aupres des Y ?' ou 'Comment repositionner la marque Z ?' La problematique doit etre claire et centree sur un enjeu de COMMUNICATION.", difficulty: "medium", tags: ["fiches", "problematique"] },
          { id: "f-fd3", front: "Pourquoi le bilan personnel est-il important dans la fiche ?", back: "Le jury veut voir votre capacite d'AUTO-CRITIQUE et de PROGRESSION. Le bilan montre que vous savez analyser votre travail, identifier vos forces et vos axes d'amelioration. C'est un marqueur de MATURITE professionnelle.", difficulty: "medium", tags: ["fiches", "bilan"] },
          { id: "f-fd4", front: "PIEGE EXAMEN : Quelle est l'erreur la plus frequente dans les fiches descriptives ?", back: "Etre trop DESCRIPTIF et pas assez ANALYTIQUE. 'J'ai fait une affiche' (descriptif) vs 'J'ai choisi ce format car la cible est locale et l'affiche permet un impact visuel immediat' (analytique). Le POURQUOI compte plus que le QUOI.", difficulty: "hard", tags: ["fiches", "piege"] },
        ],
        quiz: [
          { id: "q-fd1", question: "La problematique d'une fiche doit etre formulee :", options: ["En une phrase affirmative", "Sous forme de question", "En un seul mot", "En anglais"], correctIndex: 1, explanation: "La problematique = QUESTION de communication. 'Comment augmenter la notoriete de X ?' C'est le point de depart qui justifie toutes les actions realisees.", difficulty: "easy", tags: ["fiches"] },
          { id: "q-fd2", question: "Le bilan personnel d'une fiche doit contenir :", options: ["Uniquement les points positifs", "Les competences developpees et ce qu'on ferait differemment", "Le resume du stage", "Les notes obtenues"], correctIndex: 1, explanation: "Le bilan = apprentissages + competences developpees + auto-critique (ce qu'on ameliorerait). Le jury veut voir la capacite de reflexion, pas juste l'auto-satisfaction.", difficulty: "medium", tags: ["fiches"] },
          { id: "q-fd3", question: "L'erreur la plus courante dans les fiches est :", options: ["Trop d'analyse", "Trop de description, pas assez d'analyse", "Trop de bilan personnel", "Trop de references theoriques"], correctIndex: 1, explanation: "Erreur N 1 : DECRIRE ce qu'on a fait sans ANALYSER pourquoi. Il faut justifier chaque choix : pourquoi ce format, cette couleur, ce canal, cette cible.", difficulty: "easy", tags: ["fiches"] },
        ],
      },
      {
        id: "choisir-situations",
        title: "Choisir ses 3 situations",
        content: `Le choix des 3 situations professionnelles est STRATEGIQUE. Il faut montrer polyvalence et progression.

CRITERES DE CHOIX :
1. DIVERSITE DES SUPPORTS : au moins 1 print, 1 digital, 1 autre (audiovisuel, RP, evenementiel). Pas 3 affiches !
2. AU MOINS 1 EN STAGE : obligatoire, montrer une demande reelle d'un annonceur
3. COUVRIR LE BLOC 2 : les 3 fiches ensemble doivent couvrir toutes les competences du bloc 2 (conception, realisation, evaluation)
4. MONTRER UNE PROGRESSION : de la situation la plus simple a la plus complexe

EXEMPLES DE BONNES COMBINAISONS :
- Fiche 1 : Creation d'une charte graphique pour un client (stage) = print + identite visuelle
- Fiche 2 : Campagne digitale (projet scolaire) = RS, bannières, newsletter = digital
- Fiche 3 : Organisation d'un evenement + couverture video (stage) = evenementiel + audiovisuel

PIEGES A EVITER :
- 3 fiches sur le meme type de support (3 affiches, 3 logos)
- Aucune fiche de stage
- Des fiches qui ne montrent pas VOS competences (si le tuteur a tout fait)
- Oublier de montrer la phase d'EVALUATION (resultats, KPIs)`,
        keyPoints: [
          "Diversite obligatoire : print + digital + autre",
          "Au moins 1 fiche de STAGE",
          "Couvrir toutes les competences du bloc 2",
          "Montrer une progression dans la complexite",
        ],
        flashcards: [
          { id: "f-fd5", front: "Comment choisir les 3 situations de ses fiches descriptives ?", back: "1. DIVERSITE des supports (print + digital + autre). 2. Au moins 1 en STAGE. 3. COUVRIR le bloc 2 complet. 4. Montrer une PROGRESSION (simple -> complexe). Pas 3 affiches !", difficulty: "medium", tags: ["fiches", "choix"] },
          { id: "f-fd6", front: "Donnez un exemple de bonne combinaison de 3 fiches.", back: "Fiche 1 : charte graphique client (stage, print). Fiche 2 : campagne RS (projet scolaire, digital). Fiche 3 : evenement + video (stage, evenementiel/audiovisuel). = Diversite, stage, progression.", difficulty: "medium", tags: ["fiches", "exemples"] },
        ],
        quiz: [
          { id: "q-fd4", question: "La combinaison '3 affiches' pour les 3 fiches est :", options: ["Parfaite", "A eviter car pas de diversite", "Recommandee par le jury", "Obligatoire"], correctIndex: 1, explanation: "A EVITER : pas de diversite de supports. Les 3 fiches doivent couvrir des supports DIFFERENTS (print + digital + autre). Le jury evalue la POLYVALENCE.", difficulty: "easy", tags: ["fiches"] },
          { id: "q-fd5", question: "Au minimum, combien de fiches doivent porter sur un stage ?", options: ["0", "1", "2", "3"], correctIndex: 1, explanation: "Au moins 1 fiche doit porter sur une situation de STAGE (demande reelle d'un annonceur). Cela prouve la capacite a repondre a un besoin professionnel reel.", difficulty: "easy", tags: ["fiches"] },
        ],
      },
      {
        id: "exemples-fiche",
        title: "Exemples commentes et erreurs courantes",
        content: `MODELE DE BONNE FICHE (annotations) :

CONTEXTE : "Boulangerie artisanale 'Au Pain Dore', 3 salaries, quartier X. Presente depuis 20 ans mais en perte de clientele face a une chaine concurrente. Mon role : stagiaire en communication, 8 semaines."
-> BIEN : contexte precis, probleme identifie, role clair.

PROBLEMATIQUE : "Comment repositionner une boulangerie artisanale face a la concurrence des chaines, en valorisant son savoir-faire et sa proximite ?"
-> BIEN : question claire, enjeu de communication, mots cles (repositionner, savoir-faire, proximite).

OBJECTIFS : "Cognitif : augmenter la notoriete locale de 30% en 3 mois. Affectif : creer une image chaleureuse et artisanale. Conatif : augmenter la frequentation de 15%."
-> BIEN : objectifs SMART, 3 niveaux, chiffres.

ERREURS COURANTES :
1. PAS DE PROBLEMATIQUE : "J'ai fait un stage et j'ai cree des affiches" (pas de questionnement)
2. TROP DESCRIPTIF : liste d'actions sans justification (pourquoi CE format ? CETTE couleur ?)
3. PAS DE BILAN : "C'etait bien" (pas d'analyse, pas d'auto-critique)
4. OUBLI DES RESULTATS : pas de KPIs, pas de retour client
5. FICHE QUI NE MONTRE PAS VOS COMPETENCES : "Mon tuteur a decide et j'ai execute"`,
        keyPoints: [
          "Contexte precis avec probleme identifie",
          "Problematique formulee en question avec mots cles",
          "Objectifs SMART a 3 niveaux",
          "Eviter : paraphrase, pas de bilan, pas de KPIs, competences invisibles",
        ],
        flashcards: [
          { id: "f-fd7", front: "Qu'est-ce qui fait une BONNE problematique de fiche ?", back: "Une QUESTION claire qui identifie un enjeu de COMMUNICATION. Ex : 'Comment repositionner une boulangerie artisanale face aux chaines en valorisant son savoir-faire ?' Mots cles : comment, repositionner, valoriser.", difficulty: "medium", tags: ["fiches", "problematique"] },
          { id: "f-fd8", front: "Comment formuler de bons objectifs dans une fiche ?", back: "3 niveaux SMART : COGNITIF ('augmenter la notoriete de 30% en 3 mois'), AFFECTIF ('creer une image chaleureuse'), CONATIF ('augmenter la frequentation de 15%'). Toujours chiffrer si possible.", difficulty: "hard", tags: ["fiches", "objectifs"] },
        ],
        quiz: [
          { id: "q-fd6", question: "'J'ai fait un stage et j'ai cree des affiches' est :", options: ["Une bonne problematique", "Insuffisant car il n'y a pas de questionnement", "Parfait pour l'oral", "A developper uniquement si le jury le demande"], correctIndex: 1, explanation: "Pas de problematique = pas de reflexion. Il faut poser une QUESTION : POURQUOI cette affiche ? Pour QUI ? Quel PROBLEME resout-elle ? La fiche doit montrer une demarche, pas une liste d'actions.", difficulty: "easy", tags: ["fiches"] },
        ],
      },
    ],
  },
  {
    id: "grille-evaluation-e6",
    title: "Grille d'evaluation & criteres E6",
    exam: "e6",
    chapters: [
      {
        id: "criteres-officiels",
        title: "Les criteres officiels d'evaluation",
        content: `Le jury de l'oral E6 evalue selon une grille officielle comportant 6 criteres principaux :

1. MAITRISE DES COMPETENCES DU BLOC 2 :
   - Conception de productions : maquettes, prototypes, declinaisons
   - Realisation technique : maitrise des logiciels (Adobe Suite, Canva...), qualite d'execution
   - Respect des contraintes : brief, charte, budget, delais

2. CAPACITE A EXPLICITER ET JUSTIFIER :
   - Expliquer POURQUOI chaque choix a ete fait
   - Utiliser un vocabulaire professionnel (pas de 'c'est joli')
   - Faire des liens avec les connaissances theoriques (semiologie, rhetorique)

3. COMPREHENSION DU CADRE PROFESSIONNEL :
   - Connaitre les metiers de la communication
   - Comprendre la relation annonceur/agence
   - Maitriser le processus de production (du brief au BAT)

4. DIVERSITE ET QUALITE DES PRODUCTIONS :
   - Variete des supports (print, digital, audiovisuel)
   - Qualite technique et esthetique
   - Coherence avec la problematique

5. COHERENCE DU PARCOURS DE PROFESSIONNALISATION :
   - Les 3 fiches forment un ensemble logique
   - Progression visible dans les competences
   - Stages en coherence avec le projet professionnel

6. QUALITE DE L'EXPRESSION ORALE :
   - Clarte, fluidite, articulation
   - Regard, posture, gestion du stress
   - Gestion du temps (5 min de presentation)`,
        keyPoints: [
          "6 criteres : competences, justification, cadre pro, diversite, coherence, expression",
          "La JUSTIFICATION est evaluee autant que la qualite technique",
          "La diversite des supports est un critere explicite",
          "L'expression orale compte (regard, posture, clarte)",
        ],
        flashcards: [
          { id: "f-ge1", front: "Quels sont les 6 criteres d'evaluation de l'oral E6 ?", back: "1. Maitrise competences bloc 2. 2. Capacite a expliciter/justifier. 3. Comprehension du cadre pro. 4. Diversite/qualite des productions. 5. Coherence du parcours. 6. Qualite expression orale.", difficulty: "medium", tags: ["evaluation", "criteres"] },
          { id: "f-ge2", front: "Que signifie 'expliciter et justifier' pour le jury ?", back: "Expliquer POURQUOI chaque choix creatif a ete fait : choix de couleur (symbolique), de typo (cible), de format (contraintes), de ton (positionnement). Utiliser un vocabulaire PROFESSIONNEL, pas 'c'est joli'.", difficulty: "medium", tags: ["evaluation", "justification"] },
          { id: "f-ge3", front: "Pourquoi la COHERENCE du parcours est-elle evaluee ?", back: "Le jury veut voir que les 3 fiches forment un ensemble LOGIQUE, avec une progression. Stages en coherence avec le projet pro. Pas 3 situations decousues sans fil conducteur.", difficulty: "medium", tags: ["evaluation", "coherence"] },
          { id: "f-ge4", front: "Qu'est-ce que la 'comprehension du cadre professionnel' pour le jury ?", back: "Connaitre les METIERS de la com (DA, CR, chef de projet), la relation annonceur/agence, le processus de production (brief -> maquette -> BAT -> impression). Montrer qu'on comprend comment fonctionne le milieu.", difficulty: "hard", tags: ["evaluation", "cadre-pro"] },
        ],
        quiz: [
          { id: "q-ge1", question: "Combien de criteres d'evaluation comporte la grille de l'oral E6 ?", options: ["3", "4", "6", "10"], correctIndex: 2, explanation: "6 criteres : competences bloc 2, justification, cadre pro, diversite/qualite, coherence parcours, expression orale. Chaque critere est note.", difficulty: "easy", tags: ["evaluation"] },
          { id: "q-ge2", question: "La capacite a justifier ses choix est :", options: ["Secondaire", "Aussi importante que la qualite technique", "Non evaluee", "Reservee aux oraux de rattrapage"], correctIndex: 1, explanation: "La JUSTIFICATION est evaluee au meme niveau que la qualite technique. Un beau travail non justifie obtient moins de points qu'un travail correct bien justifie.", difficulty: "medium", tags: ["evaluation"] },
        ],
      },
      {
        id: "maximiser-criteres",
        title: "Maximiser chaque critere",
        content: `Pour chaque critere, voici ce que le jury attend et les pieges a eviter :

MAITRISE DES COMPETENCES :
- Ce que le jury attend : des productions de qualite professionnelle, pas 'scolaires'
- Piege : montrer des travaux non finis ou de mauvaise qualite technique
- Formulation gagnante : "J'ai concu cette maquette en respectant le brief client et la charte graphique existante"

JUSTIFICATION :
- Ce que le jury attend : un vocabulaire precis (semiologie, rhetorique, marketing)
- Piege : dire 'j'aime bien cette couleur' au lieu de 'le bleu connote la confiance et correspond au positionnement premium'
- Formulation gagnante : "J'ai choisi cette metaphore visuelle car elle permet a la cible de s'identifier..."

CADRE PROFESSIONNEL :
- Ce que le jury attend : comprendre les metiers, les process, les enjeux business
- Piege : parler comme un etudiant ('mon prof m'a demande')
- Formulation gagnante : "Le brief annonceur specifiait..." / "En concertation avec le DA..."

DIVERSITE :
- Ce que le jury attend : print + digital + autre
- Piege : tout en print, ou tout fait sur Canva
- Formulation gagnante : "Mon portfolio couvre des productions print, digitales et audiovisuelles"

COHERENCE :
- Ce que le jury attend : un fil conducteur, une progression
- Piege : 3 fiches sans lien entre elles
- Formulation gagnante : "Mon parcours montre une progression de la realisation technique vers la conception strategique"

EXPRESSION ORALE :
- Ce que le jury attend : clarte, regard, posture professionnelle
- Piege : lire ses notes, tourner le dos au jury, depasser le temps
- Formulation gagnante : parler NATURELLEMENT, avec des notes aide-memoire (pas un texte lu)`,
        keyPoints: [
          "Pour chaque critere : ce qu'attend le jury, les pieges, les formulations gagnantes",
          "Vocabulaire professionnel obligatoire",
          "Ne jamais dire 'c'est joli' mais justifier par la semiologie/strategie",
          "Parler comme un pro, pas comme un etudiant",
        ],
        flashcards: [
          { id: "f-ge5", front: "Quelle formulation utiliser pour justifier un choix de couleur ?", back: "JAMAIS 'j'aime cette couleur'. TOUJOURS : 'Le bleu connote la confiance et correspond au positionnement premium de la marque. Il est aussi en coherence avec la charte graphique et les attentes de la cible.'", difficulty: "medium", tags: ["evaluation", "formulation"] },
          { id: "f-ge6", front: "Quelle formulation pour parler du client/annonceur ?", back: "Dire 'l'ANNONCEUR' ou 'le CLIENT', pas 'mon prof' ou 'on m'a demande'. Formulation pro : 'Le brief annonceur specifiait...', 'En concertation avec le DA...', 'Le client souhaitait...'", difficulty: "medium", tags: ["evaluation", "formulation"] },
          { id: "f-ge7", front: "Comment montrer une PROGRESSION dans ses 3 fiches ?", back: "Organiser les fiches de la plus SIMPLE a la plus COMPLEXE. Ex : Fiche 1 (realisation technique simple) -> Fiche 2 (conception + realisation) -> Fiche 3 (strategie + conception + realisation). Montrer l'evolution.", difficulty: "hard", tags: ["evaluation", "progression"] },
          { id: "f-ge8", front: "Quels logiciels mentionner pour impressionner le jury ?", back: "Suite Adobe (Photoshop, Illustrator, InDesign, Premiere Pro) montre un niveau pro. Mentionner aussi : Figma (UI/UX), WordPress (web), Mailchimp (newsletter). Canva est acceptable mais ne suffit pas seul.", difficulty: "medium", tags: ["evaluation", "logiciels"] },
        ],
        quiz: [
          { id: "q-ge3", question: "'J'ai choisi le bleu parce que c'est joli' est :", options: ["Une bonne justification", "Une justification insuffisante pour le jury", "Acceptable si dit avec conviction", "Parfait pour l'oral"], correctIndex: 1, explanation: "INSUFFISANT. Il faut une justification PROFESSIONNELLE : 'Le bleu connote la confiance, correspond au positionnement premium et s'inscrit dans la charte graphique du client.'", difficulty: "easy", tags: ["evaluation"] },
          { id: "q-ge4", question: "Pour parler du contexte a l'oral, il vaut mieux dire :", options: ["'Mon prof m'a demande de faire une affiche'", "'L'annonceur souhaitait une communication locale pour augmenter sa notoriete'", "'On m'a donne un truc a faire'", "'J'avais envie de creer quelque chose'"], correctIndex: 1, explanation: "Vocabulaire PROFESSIONNEL : annonceur, brief, strategie, notoriete. Pas de langage scolaire ('mon prof', 'on m'a demande'). Se positionner en professionnel.", difficulty: "easy", tags: ["evaluation"] },
          { id: "q-ge5", question: "Les 3 fiches doivent idealement montrer :", options: ["3 fois la meme competence", "Une progression de la plus simple a la plus complexe", "3 situations identiques", "Uniquement des echecs pour montrer l'auto-critique"], correctIndex: 1, explanation: "PROGRESSION : fiche 1 (simple) -> fiche 2 (intermediaire) -> fiche 3 (complexe). Cela montre l'evolution de vos competences pendant la formation.", difficulty: "medium", tags: ["evaluation"] },
        ],
      },
      {
        id: "questions-jury",
        title: "Questions frequentes du jury",
        content: `Le jury pose des questions pour tester votre reflexion et votre maturite professionnelle. Voici les plus frequentes et comment y repondre :

"POURQUOI CE CHOIX DE COULEUR/TYPO/COMPOSITION ?"
-> Repondre avec la SEMIOLOGIE : symbolique des couleurs, connotations, coherence avec la cible et le positionnement. Citer Barthes si pertinent.

"QU'AURIEZ-VOUS FAIT DIFFEREMMENT ?"
-> AUTO-CRITIQUE constructive. Identifier 1-2 points precis. "Avec du recul, j'aurais integre une strategie digitale complementaire pour toucher la cible secondaire."

"QUEL EST LE ROI DE CETTE ACTION ?"
-> Si vous avez des chiffres : les donner (reach, engagement, taux de conversion). Si non : expliquer COMMENT vous l'auriez mesure et pourquoi la mesure n'a pas ete possible.

"COMMENT AVEZ-VOUS GERE LES CONTRAINTES ?"
-> Montrer votre capacite d'ADAPTATION. Contraintes de temps, de budget, techniques. "Le budget limite m'a pousse a privilegier les RS organiques plutot que la publicite payante."

"QUEL EST VOTRE PROJET PROFESSIONNEL ?"
-> Montrer la COHERENCE avec votre parcours et vos fiches. Etre precis : "Je souhaite travailler en agence comme chef de projet junior, avant d'evoluer vers la direction artistique."

"DECRIVEZ VOTRE PROCESSUS CREATIF"
-> Brief -> recherche/veille -> brainstorming -> moodboard -> maquettes -> retours client -> realisation finale -> evaluation. Montrer une methode structuree.`,
        keyPoints: [
          "Justifier par la semiologie, pas par le gout personnel",
          "Auto-critique = maturite professionnelle",
          "Toujours avoir des chiffres ou expliquer comment on mesurerait",
          "Montrer adaptation face aux contraintes",
          "Projet pro coherent avec le parcours",
        ],
        flashcards: [
          { id: "f-ge9", front: "Comment repondre a 'Quel est le ROI de cette action ?' si on n'a pas de chiffres ?", back: "Dire HONNEMENT qu'on n'a pas pu mesurer, puis expliquer COMMENT on l'aurait fait : 'J'aurais mesure le reach, l'engagement et les conversions via les analytics. Le manque de recul temporel n'a pas permis cette mesure.'", difficulty: "hard", tags: ["jury", "roi"] },
          { id: "f-ge10", front: "Comment repondre a 'Comment avez-vous gere les contraintes ?'", back: "Montrer l'ADAPTATION : 'Le budget etait de 500 EUR, j'ai donc privilegie les RS organiques (0 EUR) et un partenariat local plutot que de l'achat d'espace. La contrainte m'a pousse a etre plus creatif.'", difficulty: "medium", tags: ["jury", "contraintes"] },
        ],
        quiz: [
          { id: "q-ge6", question: "Si le jury demande le ROI et qu'on n'a pas de chiffres, il faut :", options: ["Inventer des chiffres", "Dire qu'on ne sait pas", "Expliquer comment on aurait mesure", "Changer de sujet"], correctIndex: 2, explanation: "Expliquer la METHODE de mesure : quels KPIs, quels outils, pourquoi la mesure n'a pas ete possible. Le jury evalue la methode, pas seulement les resultats.", difficulty: "medium", tags: ["jury"] },
          { id: "q-ge7", question: "Face a 'Decrivez votre processus creatif', il faut :", options: ["Dire 'je fais au feeling'", "Decrire une methode structuree (brief -> veille -> maquette -> retours -> final)", "Parler uniquement du logiciel utilise", "Dire qu'on n'a pas de processus"], correctIndex: 1, explanation: "Le jury veut voir une METHODE : brief -> recherche/veille -> brainstorming -> moodboard -> maquettes -> retours client -> realisation finale -> evaluation. Structure = professionnalisme.", difficulty: "easy", tags: ["jury"] },
        ],
      },
      {
        id: "gestion-stress",
        title: "Gestion du stress et posture le jour J",
        content: `PREPARATION PHYSIQUE ET MENTALE :

RESPIRATION : technique 4-7-8 avant de rentrer dans la salle. Inspirer 4 secondes, retenir 7 secondes, expirer 8 secondes. Repeter 3 fois. Calme le systeme nerveux.

PREPARATION MENTALE : la veille, repeter UNE DERNIERE FOIS son oral puis ARRETER. Ne pas reviser le matin meme. Visualiser l'oral qui se passe bien (technique de visualisation positive).

BODY LANGUAGE :
- POSTURE : debout, droit(e), epaules ouvertes. Pas les bras croises (fermeture).
- REGARD : regarder CHAQUE membre du jury, pas juste un seul. Ne pas fixer ses notes.
- MAINS : gestes ouverts, naturels. Pas de stylo a tripoter, pas les mains dans les poches.
- SOURIRE : naturel, pas force. Le sourire met le jury dans de bonnes dispositions.

VOIX :
- VOLUME : parler ASSEZ FORT pour que le jury entende sans effort
- DEBIT : ni trop rapide (stress) ni trop lent (ennuyeux). Faire des PAUSES.
- ARTICULATION : prononcer clairement, surtout les termes techniques.

GESTION DU TEMPS :
- 5 min de presentation : CHRONOMETRER lors des repetitions
- Si le jury vous interrompt : c'est normal, repondez calmement et reprenez
- Avoir un plan B si le materiel technique ne fonctionne pas (cle USB, version papier)

LE JOUR J :
- Arriver 30 min en avance
- Tenue professionnelle (pas d'exces, pas de decontraction)
- Verifier le materiel (ordi charge, portfolio accessible)
- Prendre de l'eau (la voix peut secher avec le stress)`,
        keyPoints: [
          "Respiration 4-7-8 pour calmer le stress",
          "Body language : posture ouverte, regard distribue, sourire",
          "Voix : volume adapte, debit maitrise, pauses",
          "Preparation : chronometrer, plan B, arriver en avance",
        ],
        flashcards: [
          { id: "f-ge11", front: "Quelle technique de respiration utiliser avant l'oral ?", back: "Technique 4-7-8 : Inspirer 4 sec, retenir 7 sec, expirer 8 sec. Repeter 3 fois. Calme le systeme nerveux et reduit le stress. A faire AVANT d'entrer dans la salle.", difficulty: "easy", tags: ["stress", "respiration"] },
          { id: "f-ge12", front: "Quels sont les 3 elements cles du body language a l'oral ?", back: "1. POSTURE ouverte (epaules, bras). 2. REGARD distribue sur TOUS les membres du jury. 3. GESTES naturels et ouverts. Eviter : bras croises, mains dans les poches, regard fuyant.", difficulty: "medium", tags: ["stress", "body-language"] },
          { id: "f-ge13", front: "Combien de temps avant faut-il arriver le jour de l'oral ?", back: "30 MINUTES en avance. Pour : se poser, verifier le materiel (ordi charge, portfolio), aller aux toilettes, faire les exercices de respiration, relire ses notes une derniere fois.", difficulty: "easy", tags: ["stress", "preparation"] },
          { id: "f-ge14", front: "Que faire si le materiel technique ne fonctionne pas ?", back: "Avoir un PLAN B : cle USB avec le portfolio en PDF, version PAPIER imprimee des productions principales. Ne pas paniquer : le jury evalue votre capacite d'ADAPTATION. Continuer l'oral normalement.", difficulty: "medium", tags: ["stress", "plan-b"] },
        ],
        quiz: [
          { id: "q-ge8", question: "La technique de respiration 4-7-8 consiste a :", options: ["Inspirer 4 fois, retenir 7 fois, expirer 8 fois", "Inspirer 4 sec, retenir 7 sec, expirer 8 sec", "Compter jusqu'a 478", "Respirer profondement 4 fois"], correctIndex: 1, explanation: "4-7-8 : Inspirer 4 SECONDES, retenir 7 SECONDES, expirer 8 SECONDES. Repeter 3 fois. Technique prouvee pour calmer le systeme nerveux et reduire l'anxiete.", difficulty: "easy", tags: ["stress"] },
          { id: "q-ge9", question: "A l'oral, le regard doit etre :", options: ["Fixe sur ses notes", "Distribue sur chaque membre du jury", "Fixe sur un seul membre", "Dirige vers le plafond"], correctIndex: 1, explanation: "DISTRIBUER le regard sur TOUS les membres du jury, pas juste un. Cela montre l'aisance, inclut tout le jury et evite de sembler fuyant ou fixe.", difficulty: "easy", tags: ["stress"] },
          { id: "q-ge10", question: "Si le jury interrompt votre presentation, il faut :", options: ["S'enerver et demander de finir", "Repondre calmement et reprendre", "Arreter completement la presentation", "Ignorer la question"], correctIndex: 1, explanation: "Les interruptions sont NORMALES. Repondre calmement, puis reprendre ou votre en etiez. Montrer de la SOUPLESSE et de l'ADAPTABILITE. C'est un signe de maturite.", difficulty: "medium", tags: ["stress"] },
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
