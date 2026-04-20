// BTS Communication - E1 Extra Modules
// Médias et enjeux sociétaux, Méthodologie E1, Thématiques 2026

import type { Module } from "./course-data";

export const E1_EXTRA_MODULES: Module[] = [
  // =========================================
  // MODULE 1 : MÉDIAS ET ENJEUX SOCIÉTAUX
  // =========================================
  {
    id: "medias-enjeux",
    title: "Medias et enjeux societaux",
    exam: "e1",
    chapters: [
      // --- Chapitre A : Histoire des médias ---
      {
        id: "histoire-medias",
        title: "Histoire des medias",
        content: `L'histoire des medias est une succession de revolutions technologiques qui ont transforme la circulation de l'information et la communication.

IMPRIMERIE ET PRESSE ECRITE :
- 1450 : Gutenberg invente l'imprimerie a caracteres mobiles. C'est la premiere revolution mediatique : le savoir n'est plus reserve aux clercs.
- 1631 : Theophraste Renaudot fonde La Gazette, premier journal francais. Il beneficie du soutien de Richelieu. La presse devient un instrument de pouvoir.
- XIXe siecle : naissance de la presse de masse. Loi sur la liberte de la presse (1881). Emile de Girardin invente la presse bon marche financee par la publicite (La Presse, 1836).

RADIO :
- Annees 1920-1930 : la radio se democratise. Elle devient le premier media de masse instantane.
- Pendant la Seconde Guerre mondiale, la radio est un outil de propagande (Radio Paris sous l'Occupation) ET de resistance (Radio Londres : "Les Francais parlent aux Francais").
- Apres-guerre : age d'or de la radio avec les grandes stations generalistes (RTL, Europe 1, France Inter).

TELEVISION :
- 1950s : debut de la television en France (1ere chaine ORTF).
- 1967 : passage a la couleur.
- 1980s-1990s : privatisation (TF1 en 1987), multiplication des chaines (Canal+, M6).
- 2005 : lancement de la TNT (Television Numerique Terrestre) qui democratise l'offre.
- 2010s : essor du streaming (Netflix arrive en France en 2014) qui bouleverse les usages.

INTERNET ET NUMERIQUE :
- 1990s : naissance du World Wide Web (Tim Berners-Lee, 1991). Internet grand public.
- 2000s : Web 2.0 — l'internaute devient acteur (blogs, forums, Wikipedia). User Generated Content.
- 2004-2010 : explosion des reseaux sociaux (Facebook 2004, Twitter 2006, Instagram 2010).
- 2010s-2020s : smartphones, algorithmes, intelligence artificielle, TikTok (2016).

TIMELINE DES GRANDES DATES :
1450 Gutenberg | 1631 La Gazette | 1836 La Presse (Girardin) | 1881 Loi liberte de la presse | 1930s Radio de masse | 1950s TV en France | 1967 TV couleur | 1987 Privatisation TF1 | 1991 World Wide Web | 2004 Facebook | 2005 TNT | 2006 Twitter | 2010 Instagram | 2014 Netflix France | 2016 TikTok.`,
        keyPoints: [
          "1450 : Gutenberg invente l'imprimerie — premiere revolution mediatique",
          "1631 : Renaudot fonde La Gazette, premier journal francais",
          "1881 : Loi sur la liberte de la presse en France",
          "Radio (1930s) = premier media de masse instantane, outil de propagande et de resistance",
          "TV : ORTF (1950s), couleur (1967), privatisation TF1 (1987), TNT (2005), streaming (2014)",
          "Internet : Web (1991), Web 2.0 (2000s), reseaux sociaux (2004+), smartphones et algorithmes",
        ],
        didYouKnow:
          "Emile de Girardin a invente le modele economique de la presse moderne en 1836 : baisser le prix du journal et se financer par la publicite. C'est le meme modele que Facebook et Google utilisent aujourd'hui !",
        flashcards: [
          {
            id: "f-hm1",
            front: "Qui a fonde La Gazette en 1631, et pourquoi est-ce important ?",
            back: "Theophraste RENAUDOT, avec le soutien de Richelieu. C'est le premier journal francais. La presse devient un instrument de pouvoir politique.",
            difficulty: "easy",
            tags: ["histoire-medias", "presse"],
          },
          {
            id: "f-hm2",
            front:
              "Quel est le role de la radio pendant la Seconde Guerre mondiale ?",
            back: "Double role : outil de PROPAGANDE (Radio Paris sous l'Occupation allemande) et de RESISTANCE (Radio Londres : 'Les Francais parlent aux Francais'). La radio prouve sa puissance comme media de masse.",
            difficulty: "medium",
            tags: ["histoire-medias", "radio"],
          },
          {
            id: "f-hm3",
            front: "Qu'est-ce que le Web 2.0 et quand emerge-t-il ?",
            back: "Le Web 2.0 (annees 2000s) designe le passage d'un web statique (consultation) a un web PARTICIPATIF ou l'internaute devient acteur : blogs, forums, Wikipedia, reseaux sociaux, User Generated Content.",
            difficulty: "medium",
            tags: ["histoire-medias", "numerique"],
          },
          {
            id: "f-hm4",
            front:
              "Quelle innovation Emile de Girardin introduit-il en 1836 ?",
            back: "Il cree La Presse, journal BON MARCHE finance par la PUBLICITE. C'est l'invention du modele economique mediatique moderne : audience gratuite ou peu chere, revenus publicitaires. Meme modele que Google/Facebook.",
            difficulty: "hard",
            tags: ["histoire-medias", "presse", "economie"],
          },
          {
            id: "f-hm5",
            front:
              "Citez 3 dates cles de la television en France et leur signification.",
            back: "1950s : debut TV (ORTF). 1967 : passage a la couleur. 1987 : privatisation de TF1. On peut ajouter 2005 (TNT) et 2014 (Netflix en France = debut du streaming).",
            difficulty: "medium",
            tags: ["histoire-medias", "television"],
          },
        ],
        quiz: [
          {
            id: "q-hm1",
            question: "La Gazette, premier journal francais, a ete fondee par :",
            options: [
              "Emile de Girardin",
              "Theophraste Renaudot",
              "Gutenberg",
              "Denis Diderot",
            ],
            correctIndex: 1,
            explanation:
              "Theophraste RENAUDOT fonde La Gazette en 1631 avec le soutien de Richelieu. Girardin, lui, cree La Presse en 1836 (presse bon marche + pub).",
            difficulty: "easy",
            tags: ["histoire-medias"],
          },
          {
            id: "q-hm2",
            question: "La TNT (Television Numerique Terrestre) est lancee en France en :",
            options: ["1997", "2001", "2005", "2010"],
            correctIndex: 2,
            explanation:
              "La TNT est lancee en 2005. Elle permet de multiplier les chaines gratuites et de democratiser l'offre televisuelle en France.",
            difficulty: "medium",
            tags: ["histoire-medias", "television"],
          },
          {
            id: "q-hm3",
            question:
              "Le Web 2.0 se caracterise par :",
            options: [
              "Un internet reserve aux entreprises",
              "La consultation passive de pages statiques",
              "La participation active des internautes (blogs, reseaux sociaux, UGC)",
              "La disparition des medias traditionnels",
            ],
            correctIndex: 2,
            explanation:
              "Le Web 2.0 = web PARTICIPATIF. L'internaute passe de spectateur a acteur : il cree du contenu (User Generated Content), commente, partage. C'est la base des reseaux sociaux.",
            difficulty: "easy",
            tags: ["histoire-medias", "numerique"],
          },
          {
            id: "q-hm4",
            question:
              "Quel media a joue un role majeur a la fois de propagande et de resistance pendant la Seconde Guerre mondiale ?",
            options: [
              "La presse ecrite",
              "La television",
              "La radio",
              "Le cinema",
            ],
            correctIndex: 2,
            explanation:
              "La RADIO : Radio Paris diffusait la propagande de l'Occupation, tandis que Radio Londres permettait a la Resistance de communiquer ('Les Francais parlent aux Francais').",
            difficulty: "medium",
            tags: ["histoire-medias", "radio"],
          },
        ],
      },

      // --- Chapitre B : Rôle des médias dans la société ---
      {
        id: "role-medias-societe",
        title: "Role des medias dans la societe",
        content: `Les medias jouent un role fondamental dans la societe democratique. Plusieurs theories eclairent leur influence sur l'opinion publique et le debat.

AGENDA-SETTING (McCombs & Shaw, 1972) :
Les medias ne disent pas aux gens QUOI penser, mais A QUOI penser. En choisissant de couvrir certains sujets plutot que d'autres, les medias fixent l'AGENDA du debat public. Ce qui n'est pas mediatise n'existe pas dans l'espace public.
Exemple : si les JT parlent de l'insecurite pendant 3 semaines, l'insecurite devient la "preoccupation numero 1 des Francais" dans les sondages — meme si les statistiques n'ont pas change.

SPIRALE DU SILENCE (Elisabeth Noelle-Neumann, 1974) :
Les individus qui pensent que leur opinion est minoritaire ont tendance a se TAIRE pour eviter l'isolement social. Les medias amplifient ce phenomene en donnant l'impression qu'une opinion est dominante. Resultat : les opinions perçues comme majoritaires s'expriment de plus en plus, les autres se taisent → spirale.

GATEKEEPING (Kurt Lewin, 1947) :
Les journalistes et redacteurs en chef sont des "gardiens" (gatekeepers) qui FILTRENT l'information. Ils decidient quels evenements deviennent des "nouvelles" et lesquels sont ignores. Ce pouvoir de selection est enorme : il determine ce qui entre dans l'espace public.

4e POUVOIR :
La presse est souvent qualifiee de "4e pouvoir" (apres legislatif, executif, judiciaire). Son role : CONTREBALANCER les pouvoirs en place par le controle, l'investigation, la denonciation. Exemples : affaire du Watergate (Washington Post), Panama Papers.
Limites : concentration des medias (Bollore, Bouygues), dependance aux annonceurs, pressions politiques.

PLURALISME MEDIATIQUE :
Principe democratique fondamental : la DIVERSITE des sources d'information garantit un debat equilibre. Le CSA (devenu ARCOM en 2022) veille au pluralisme dans l'audiovisuel. Menaces : concentration des medias, uniformisation de l'information, deserts mediatiques locaux.`,
        keyPoints: [
          "Agenda-setting (McCombs & Shaw 1972) : les medias disent A QUOI penser, pas QUOI penser",
          "Spirale du silence (Noelle-Neumann 1974) : les opinions minoritaires se taisent par peur de l'isolement",
          "Gatekeeping (Lewin 1947) : les journalistes filtrent ce qui devient 'information'",
          "4e pouvoir : la presse comme contre-pouvoir democratique",
          "Pluralisme mediatique : diversite des sources = sante democratique",
        ],
        didYouKnow:
          "L'affaire du Watergate (1972) est l'exemple le plus celebre du '4e pouvoir' : deux journalistes du Washington Post ont fait tomber le president Nixon en revelant un scandale d'espionnage politique !",
        flashcards: [
          {
            id: "f-rm1",
            front:
              "Qu'est-ce que l'agenda-setting ? Qui a theorise ce concept ?",
            back: "Theorie de McCOMBS & SHAW (1972). Les medias ne disent pas QUOI penser mais A QUOI penser. En selectionnant les sujets, ils fixent l'agenda du debat public.",
            difficulty: "easy",
            tags: ["medias-societe", "agenda-setting"],
          },
          {
            id: "f-rm2",
            front:
              "Expliquez la spirale du silence de Noelle-Neumann.",
            back: "Les individus qui pensent avoir une opinion MINORITAIRE se TAISENT par peur de l'isolement social. Les medias amplifient le phenomene en donnant l'impression qu'une opinion est dominante. Les opinions minoritaires disparaissent progressivement du debat.",
            difficulty: "medium",
            tags: ["medias-societe", "spirale-silence"],
          },
          {
            id: "f-rm3",
            front: "Qu'est-ce que le gatekeeping en journalisme ?",
            back: "Concept de Kurt LEWIN (1947). Les journalistes/redacteurs en chef sont des 'gardiens' (gatekeepers) qui FILTRENT l'information. Ils decidient quels evenements deviennent des nouvelles. Ce pouvoir de selection determine l'espace public.",
            difficulty: "medium",
            tags: ["medias-societe", "gatekeeping"],
          },
          {
            id: "f-rm4",
            front:
              "Pourquoi dit-on que la presse est le '4e pouvoir' ?",
            back: "Apres le legislatif, l'executif et le judiciaire, la presse est vue comme un CONTRE-POUVOIR democratique : elle controle, investigue, denonce. Exemples : Watergate (Washington Post), Panama Papers.",
            difficulty: "easy",
            tags: ["medias-societe", "4e-pouvoir"],
          },
          {
            id: "f-rm5",
            front:
              "Qu'est-ce que le pluralisme mediatique et qui le surveille en France ?",
            back: "Le pluralisme = DIVERSITE des sources d'information, garantie d'un debat democratique equilibre. L'ARCOM (ex-CSA, depuis 2022) veille au pluralisme dans l'audiovisuel. Menaces : concentration des medias, deserts mediatiques.",
            difficulty: "medium",
            tags: ["medias-societe", "pluralisme"],
          },
        ],
        quiz: [
          {
            id: "q-rm1",
            question:
              "Selon la theorie de l'agenda-setting, les medias :",
            options: [
              "Disent aux gens quoi penser",
              "Disent aux gens a quoi penser",
              "N'ont aucune influence sur l'opinion",
              "Refletent fidelement la realite",
            ],
            correctIndex: 1,
            explanation:
              "McCombs & Shaw (1972) : les medias ne disent pas QUOI penser mais A QUOI penser. En selectionnant les sujets couverts, ils fixent l'agenda du debat public.",
            difficulty: "easy",
            tags: ["medias-societe", "agenda-setting"],
          },
          {
            id: "q-rm2",
            question:
              "La spirale du silence (Noelle-Neumann) explique :",
            options: [
              "La censure gouvernementale",
              "Le silence radio entre deux editions",
              "L'auto-censure des opinions perçues comme minoritaires",
              "Le secret des sources journalistiques",
            ],
            correctIndex: 2,
            explanation:
              "La spirale du silence = les gens qui pensent avoir une opinion MINORITAIRE se TAISENT par peur de l'isolement. Les medias amplifient ce phenomene en rendant certaines opinions plus visibles.",
            difficulty: "medium",
            tags: ["medias-societe", "spirale-silence"],
          },
          {
            id: "q-rm3",
            question:
              "Le 'gatekeeping' designe :",
            options: [
              "La protection des donnees personnelles",
              "Le filtrage de l'information par les journalistes",
              "La censure par les gouvernements",
              "Le blocage des fake news par les algorithmes",
            ],
            correctIndex: 1,
            explanation:
              "Gatekeeping (Lewin, 1947) = les journalistes sont des 'gardiens' qui FILTRENT l'information. Ils decidient ce qui devient une 'nouvelle' et ce qui est ignore.",
            difficulty: "medium",
            tags: ["medias-societe", "gatekeeping"],
          },
          {
            id: "q-rm4",
            question: "L'ARCOM (ex-CSA) veille notamment au :",
            options: [
              "Financement de la publicite",
              "Pluralisme mediatique dans l'audiovisuel",
              "Droit d'auteur sur internet",
              "Recrutement des journalistes",
            ],
            correctIndex: 1,
            explanation:
              "L'ARCOM (Autorite de regulation de la communication audiovisuelle et numerique, ex-CSA depuis 2022) veille au PLURALISME des opinions dans l'audiovisuel, principe democratique fondamental.",
            difficulty: "medium",
            tags: ["medias-societe", "pluralisme"],
          },
        ],
      },

      // --- Chapitre C : Enjeux numériques ---
      {
        id: "enjeux-numeriques",
        title: "Enjeux numeriques",
        content: `Le numerique a bouleverse l'ecosysteme mediatique et pose des defis majeurs pour la communication et la democratie.

FAKE NEWS ET DESINFORMATION :
Les fake news sont des informations FAUSSES diffusees intentionnellement pour tromper. La desinformation est plus large : manipulation deliberee de l'information a des fins politiques, economiques ou ideologiques.
Mecanismes : les fake news se propagent 6x plus vite que les vraies infos (etude MIT 2018) car elles sont plus "surprenantes" et suscitent des emotions fortes. Elles exploitent les biais cognitifs (biais de confirmation, effet de verite illusoire).
Reponses : fact-checking (AFP Factuel, Les Decodeurs), education aux medias, loi contre la manipulation de l'information (2018).

INFOBESITE :
Surcharge informationnelle liee a la multiplication des sources et des canaux. Un individu est expose a 5 000 a 10 000 messages publicitaires par jour. Consequences : difficulte a trier, fatigue informationnelle, superficialite du traitement, desengagement.

BULLES DE FILTRE (Eli Pariser, 2011) :
Les algorithmes personnalisent les contenus en fonction de nos preferences passees. Resultat : chaque utilisateur vit dans une "bulle" ou il ne voit que des informations qui CONFIRMENT ses opinions. L'utilisateur n'est plus expose a la contradiction → renforcement des opinions, polarisation du debat.

ALGORITHMES ET ECONOMIE DE L'ATTENTION :
Les plateformes (Facebook, TikTok, YouTube) utilisent des algorithmes conçus pour MAXIMISER le temps passe sur la plateforme. Logique : capter l'attention = vendre de la publicite. Consequences : contenus sensationnels privilegies, course au clic (clickbait), degradation de la qualite informationnelle.

GAFAM (Google, Apple, Facebook/Meta, Amazon, Microsoft) :
Les GAFAM concentrent une part dominante de l'economie numerique. Ils controlent les infrastructures (cloud, stores), les donnees personnelles, et les canaux de distribution de l'information. Questions : position dominante, fiscalite, vie privee (RGPD en Europe 2018), dependance des medias aux plateformes.`,
        keyPoints: [
          "Fake news : infos fausses qui se propagent 6x plus vite que les vraies (MIT 2018)",
          "Infobesite : surcharge informationnelle, 5000 a 10000 messages pub/jour",
          "Bulles de filtre (Eli Pariser 2011) : algorithmes = confirmation des opinions existantes",
          "Economie de l'attention : capter l'attention pour vendre de la publicite",
          "GAFAM : concentration du pouvoir numerique, enjeux de vie privee (RGPD 2018)",
        ],
        didYouKnow:
          "Selon une etude du MIT (2018), une fake news a 70% de chances en plus d'etre retweetee qu'une vraie information. La raison ? Elle est plus 'surprenante' et suscite des emotions plus fortes (indignation, peur).",
        flashcards: [
          {
            id: "f-en1",
            front:
              "Qu'est-ce qu'une bulle de filtre ? Qui a theorise ce concept ?",
            back: "Concept d'Eli PARISER (2011). Les algorithmes personnalisent les contenus selon nos preferences : on ne voit que ce qui CONFIRME nos opinions. On vit dans une 'bulle' informationnelle sans exposition a la contradiction.",
            difficulty: "easy",
            tags: ["enjeux-numeriques", "bulle-filtre"],
          },
          {
            id: "f-en2",
            front: "Qu'est-ce que l'economie de l'attention ?",
            back: "Modele economique des plateformes numeriques : CAPTER l'attention des utilisateurs (temps passe) pour la MONETISER via la publicite. Les algorithmes privilegient les contenus sensationnels/addictifs pour maximiser l'engagement.",
            difficulty: "medium",
            tags: ["enjeux-numeriques", "attention"],
          },
          {
            id: "f-en3",
            front:
              "Pourquoi les fake news se propagent-elles plus vite que les vraies infos ?",
            back: "Etude MIT (2018) : les fake news se propagent 6x plus vite car elles sont plus SURPRENANTES et suscitent des EMOTIONS fortes (indignation, peur). Elles exploitent les biais cognitifs (biais de confirmation, effet de verite illusoire).",
            difficulty: "medium",
            tags: ["enjeux-numeriques", "fake-news"],
          },
          {
            id: "f-en4",
            front: "Que signifie GAFAM et quel est l'enjeu principal ?",
            back: "Google, Apple, Facebook (Meta), Amazon, Microsoft. Enjeux : CONCENTRATION du pouvoir numerique (donnees, infrastructure, distribution de l'info), questions de vie privee (RGPD 2018), fiscalite, position dominante.",
            difficulty: "easy",
            tags: ["enjeux-numeriques", "gafam"],
          },
          {
            id: "f-en5",
            front: "Qu'est-ce que l'infobesite ?",
            back: "Surcharge informationnelle liee a la multiplication des sources. Un individu est expose a 5000-10000 messages publicitaires/jour. Consequences : fatigue, superficialite du traitement, difficulte a trier le vrai du faux, desengagement.",
            difficulty: "easy",
            tags: ["enjeux-numeriques", "infobesite"],
          },
        ],
        quiz: [
          {
            id: "q-en1",
            question: "Le concept de 'bulle de filtre' a ete theorise par :",
            options: [
              "Mark Zuckerberg",
              "Eli Pariser",
              "Tim Berners-Lee",
              "Marshall McLuhan",
            ],
            correctIndex: 1,
            explanation:
              "Eli PARISER theorise les bulles de filtre en 2011. Les algorithmes personnalisent les contenus et enferment l'utilisateur dans une bulle ou il ne voit que des infos confirmant ses opinions.",
            difficulty: "easy",
            tags: ["enjeux-numeriques", "bulle-filtre"],
          },
          {
            id: "q-en2",
            question:
              "L'economie de l'attention repose sur :",
            options: [
              "La vente de produits physiques",
              "La captation du temps d'attention pour le monetiser en publicite",
              "Le financement par les abonnements uniquement",
              "La vente de donnees aux gouvernements",
            ],
            correctIndex: 1,
            explanation:
              "L'economie de l'attention = capter le TEMPS et l'ATTENTION des utilisateurs pour le monetiser via la publicite. C'est le modele de Facebook, TikTok, YouTube.",
            difficulty: "medium",
            tags: ["enjeux-numeriques", "attention"],
          },
          {
            id: "q-en3",
            question:
              "Selon l'etude du MIT (2018), les fake news se propagent :",
            options: [
              "Moins vite que les vraies informations",
              "A la meme vitesse que les vraies informations",
              "6 fois plus vite que les vraies informations",
              "Uniquement sur les reseaux sociaux",
            ],
            correctIndex: 2,
            explanation:
              "L'etude du MIT (2018) montre que les fake news se propagent 6x plus vite car elles sont plus surprenantes et suscitent des emotions fortes (indignation, peur).",
            difficulty: "medium",
            tags: ["enjeux-numeriques", "fake-news"],
          },
          {
            id: "q-en4",
            question: "Le RGPD (2018) concerne principalement :",
            options: [
              "La regulation des fake news",
              "La protection des donnees personnelles",
              "La taxation des GAFAM",
              "Le pluralisme mediatique",
            ],
            correctIndex: 1,
            explanation:
              "Le RGPD (Reglement General sur la Protection des Donnees, 2018) est un reglement europeen qui protege les DONNEES PERSONNELLES des citoyens. Il impose le consentement, le droit a l'oubli, la transparence.",
            difficulty: "easy",
            tags: ["enjeux-numeriques", "rgpd"],
          },
        ],
      },

      // --- Chapitre D : RSE et communication responsable ---
      {
        id: "rse-communication-responsable",
        title: "RSE et communication responsable",
        content: `La Responsabilite Societale des Entreprises (RSE) est devenue incontournable en communication. Mais les derives sont nombreuses.

GREENWASHING :
Pratique consistant a donner une IMAGE ECOLOGIQUE trompeuse a un produit, un service ou une entreprise. L'entreprise communique sur ses engagements verts sans que ses pratiques reelles ne suivent.
Exemples : TotalEnergies qui se rebaptise et met du vert dans son logo tout en restant le 1er emetteur de CO2 du CAC 40. H&M "Conscious Collection" alors que la fast fashion est un desastre ecologique. Volkswagen "Dieselgate" (2015) : publicite "Clean Diesel" alors que les moteurs etaient truques.

SOCIAL WASHING :
Meme logique que le greenwashing mais sur le plan SOCIAL. L'entreprise affiche des valeurs d'inclusion, de diversite ou de bien-etre au travail sans actions concretes.
Exemple : entreprises qui affichent le drapeau LGBT en juin (Pride) mais n'ont aucune politique interne de diversite.

PURPOSE WASHING :
L'entreprise se donne une "raison d'etre" (purpose) societal grandiose dans sa communication alors que son modele economique contredit cette mission.
Exemple : une marque de fast food qui communique sur la nutrition saine.

LOI CLIMAT ET RESILIENCE (2021) :
Loi francaise qui encadre les allegation environnementales. Il est desormais INTERDIT de pretendre qu'un produit est "neutre en carbone" sans preuves. Les publicites pour les energies fossiles sont encadrees. Les sanctions sont renforcees.

ARPP (Autorite de Regulation Professionnelle de la Publicite) :
Organisme d'AUTOREGULATION de la profession publicitaire en France. L'ARPP verifie les publicites AVANT diffusion et emet des avis. Elle a publie des recommandations sur le "Developpement durable" pour encadrer les allegation ecologiques.

CHARTE COMMUNICATION RESPONSABLE :
Engagement volontaire des entreprises et agences a pratiquer une communication ETHIQUE : ne pas induire en erreur, ne pas exploiter les peurs, respecter l'environnement dans les messages ET dans la production (eco-conception des supports, evenements responsables).`,
        keyPoints: [
          "Greenwashing : image ecologique trompeuse (ex. TotalEnergies, H&M Conscious, Dieselgate VW)",
          "Social washing : fausse vitrine d'inclusion/diversite sans actions reelles",
          "Purpose washing : raison d'etre societal affichee mais contredite par le modele economique",
          "Loi Climat et Resilience (2021) : interdit 'neutre en carbone' sans preuves",
          "ARPP : autoregulation de la publicite, recommandations developpement durable",
        ],
        didYouKnow:
          "Le scandale du 'Dieselgate' (2015) est l'un des pires cas de greenwashing : Volkswagen avait installe un logiciel truqueur dans 11 millions de vehicules diesel pour fausser les tests antipollution, tout en faisant de la pub pour son 'Clean Diesel' !",
        flashcards: [
          {
            id: "f-rse1",
            front:
              "Qu'est-ce que le greenwashing ? Donnez un exemple concret.",
            back: "Communication ecologique TROMPEUSE : l'entreprise se donne une image verte sans pratiques reelles. Exemple : Volkswagen 'Dieselgate' (2015) — pub 'Clean Diesel' alors que les moteurs etaient truques pour fausser les tests antipollution.",
            difficulty: "easy",
            tags: ["rse", "greenwashing"],
          },
          {
            id: "f-rse2",
            front:
              "Quelle difference entre greenwashing, social washing et purpose washing ?",
            back: "GREENWASHING = fausse image ecologique. SOCIAL WASHING = fausse vitrine d'inclusion/diversite. PURPOSE WASHING = fausse raison d'etre societale. Point commun : un decalage entre la communication et les pratiques reelles.",
            difficulty: "medium",
            tags: ["rse", "washing"],
          },
          {
            id: "f-rse3",
            front:
              "Que prevoit la loi Climat et Resilience (2021) pour la publicite ?",
            back: "Interdit de pretendre qu'un produit est 'neutre en carbone' sans PREUVES. Encadre les publicites pour les energies fossiles. Renforce les sanctions contre les allegation environnementales trompeuses.",
            difficulty: "medium",
            tags: ["rse", "loi-climat"],
          },
          {
            id: "f-rse4",
            front: "Quel est le role de l'ARPP ?",
            back: "L'Autorite de Regulation Professionnelle de la Publicite est l'organisme d'AUTOREGULATION de la pub en France. Elle verifie les publicites avant diffusion et emet des recommandations (notamment sur le developpement durable).",
            difficulty: "medium",
            tags: ["rse", "arpp"],
          },
          {
            id: "f-rse5",
            front:
              "Qu'est-ce qu'une charte de communication responsable ?",
            back: "Engagement VOLONTAIRE des entreprises/agences a communiquer de maniere ETHIQUE : pas d'allegation trompeuses, pas d'exploitation des peurs, respect de l'environnement dans les messages ET la production (eco-conception, evenements responsables).",
            difficulty: "easy",
            tags: ["rse", "charte"],
          },
        ],
        quiz: [
          {
            id: "q-rse1",
            question: "Le greenwashing consiste a :",
            options: [
              "Recycler les supports de communication",
              "Donner une image ecologique trompeuse",
              "Utiliser du papier recycle pour les brochures",
              "Communiquer sur de vraies actions environnementales",
            ],
            correctIndex: 1,
            explanation:
              "Greenwashing = donner une IMAGE ecologique trompeuse. L'entreprise communique 'vert' sans pratiques reelles. Ce n'est PAS communiquer sur de vraies actions (ca, c'est de la communication responsable).",
            difficulty: "easy",
            tags: ["rse", "greenwashing"],
          },
          {
            id: "q-rse2",
            question:
              "Le 'Dieselgate' de Volkswagen (2015) est un exemple de :",
            options: [
              "Social washing",
              "Purpose washing",
              "Greenwashing",
              "Communication responsable",
            ],
            correctIndex: 2,
            explanation:
              "Le Dieselgate = GREENWASHING : VW faisait de la pub pour son 'Clean Diesel' alors que les moteurs etaient truques pour fausser les tests antipollution. C'est un decalage entre communication verte et pratique reelle.",
            difficulty: "easy",
            tags: ["rse", "greenwashing"],
          },
          {
            id: "q-rse3",
            question:
              "La loi Climat et Resilience (2021) interdit notamment :",
            options: [
              "Toute publicite pour des produits alimentaires",
              "Les allegation 'neutre en carbone' sans preuves",
              "L'utilisation du vert dans les publicites",
              "La publicite sur les reseaux sociaux",
            ],
            correctIndex: 1,
            explanation:
              "La loi Climat et Resilience (2021) interdit de pretendre qu'un produit est 'neutre en carbone' sans PREUVES scientifiques. Elle encadre aussi les pubs pour les energies fossiles.",
            difficulty: "medium",
            tags: ["rse", "loi-climat"],
          },
          {
            id: "q-rse4",
            question: "L'ARPP est :",
            options: [
              "Un organisme gouvernemental de censure",
              "Un tribunal specialise en publicite",
              "Un organisme d'autoregulation professionnelle de la publicite",
              "Une association de consommateurs",
            ],
            correctIndex: 2,
            explanation:
              "L'ARPP (Autorite de Regulation Professionnelle de la Publicite) est un organisme d'AUTOREGULATION (pas gouvernemental). La profession publicitaire se regule elle-meme via l'ARPP.",
            difficulty: "medium",
            tags: ["rse", "arpp"],
          },
        ],
      },
    ],
  },

  // =========================================
  // MODULE 2 : MÉTHODOLOGIE E1
  // =========================================
  {
    id: "methodologie-e1",
    title: "Methodologie E1",
    exam: "e1",
    chapters: [
      // --- Chapitre A : Format officiel E1 2026 ---
      {
        id: "format-officiel-e1-2026",
        title: "Format officiel E1 2026",
        content: `L'epreuve E1 "Cultures de la communication" est une epreuve ECRITE de 4 heures, coefficient 3.

STRUCTURE DE L'EPREUVE :
- Duree : 4 heures
- Coefficient : 3
- Aucun document personnel autorise (seul le sujet contient un corpus de documents)
- 3 questions basees sur un corpus de documents (textes, images, campagnes)

REPARTITION DES POINTS :
- Partie 1 (Question 1) : 8 points — Reperer et identifier les positions des auteurs du corpus
- Partie 2 (Questions 2 et 3) : 12 points — Analyse d'une campagne (Q2) + Conception d'un message (Q3)

LE CORPUS :
Le sujet fournit un corpus de 4 a 6 documents lies a un THEME (en 2026 : "A table !", "La rue", "Trop, c'est trop ?"). Les documents peuvent etre : articles de presse, extraits d'ouvrages, campagnes publicitaires, visuels, infographies.

ATTENDUS :
- Culture generale solide (auteurs, references, exemples)
- Maitrise des concepts de communication (semiologie, rhetorique, theories)
- Capacite d'analyse critique
- Qualite de l'expression ecrite (orthographe, syntaxe, vocabulaire precis)
- Argumentation structuree`,
        keyPoints: [
          "Epreuve ecrite de 4h, coefficient 3",
          "3 questions, aucun document personnel autorise",
          "Partie 1 (Q1) : 8 points — positions des auteurs du corpus",
          "Partie 2 (Q2 + Q3) : 12 points — analyse campagne + conception message",
          "Corpus de 4 a 6 documents lies au theme de l'annee",
        ],
        didYouKnow:
          "Le coefficient 3 fait de l'E1 l'une des epreuves les plus importantes du BTS Communication. Une bonne note en E1 peut compenser des faiblesses dans d'autres matieres !",
        flashcards: [
          {
            id: "f-fe1",
            front: "Quelle est la duree et le coefficient de l'epreuve E1 ?",
            back: "Duree : 4 HEURES. Coefficient : 3. C'est une epreuve ecrite sans document personnel autorise.",
            difficulty: "easy",
            tags: ["methodologie-e1", "format"],
          },
          {
            id: "f-fe2",
            front:
              "Comment sont repartis les points de l'epreuve E1 ?",
            back: "Partie 1 (Question 1) : 8 points (reperer les positions du corpus). Partie 2 (Questions 2 + 3) : 12 points (analyse campagne + conception message). Total : 20 points.",
            difficulty: "easy",
            tags: ["methodologie-e1", "format"],
          },
          {
            id: "f-fe3",
            front: "Combien de questions comporte l'epreuve E1 et quels sont leurs objets ?",
            back: "3 questions : Q1 = reperer les positions des auteurs du corpus (8pts). Q2 = analyser une campagne de communication (partie des 12pts). Q3 = concevoir et rediger un message justifie (partie des 12pts).",
            difficulty: "medium",
            tags: ["methodologie-e1", "format"],
          },
          {
            id: "f-fe4",
            front:
              "Qu'est-ce que le corpus de l'epreuve E1 ?",
            back: "Ensemble de 4 a 6 documents fournis avec le sujet : articles de presse, extraits d'ouvrages, campagnes pub, visuels, infographies. Tous lies au THEME de l'annee. C'est la base de travail pour les 3 questions.",
            difficulty: "easy",
            tags: ["methodologie-e1", "corpus"],
          },
        ],
        quiz: [
          {
            id: "q-fe1",
            question: "L'epreuve E1 du BTS Communication dure :",
            options: ["2 heures", "3 heures", "4 heures", "5 heures"],
            correctIndex: 2,
            explanation:
              "L'epreuve E1 dure 4 HEURES, coefficient 3. C'est une epreuve ecrite, sans document personnel autorise.",
            difficulty: "easy",
            tags: ["methodologie-e1"],
          },
          {
            id: "q-fe2",
            question:
              "La Question 1 de l'E1 vaut :",
            options: ["4 points", "6 points", "8 points", "10 points"],
            correctIndex: 2,
            explanation:
              "La Q1 (reperer les positions du corpus) = 8 points (Partie 1). Les Q2 et Q3 se partagent les 12 points restants (Partie 2).",
            difficulty: "easy",
            tags: ["methodologie-e1"],
          },
          {
            id: "q-fe3",
            question: "Lors de l'epreuve E1, le candidat peut utiliser :",
            options: [
              "Ses fiches de revision",
              "Un dictionnaire",
              "Uniquement le sujet et le corpus fournis",
              "Un telephone en mode avion",
            ],
            correctIndex: 2,
            explanation:
              "AUCUN document personnel autorise. Le candidat ne dispose que du sujet (avec son corpus de documents) et de ses feuilles de brouillon/copie.",
            difficulty: "easy",
            tags: ["methodologie-e1"],
          },
        ],
      },

      // --- Chapitre B : Question 1 ---
      {
        id: "question-1-positions-corpus",
        title: "Question 1 : Reperer les positions du corpus",
        content: `La Question 1 vaut 8 points. Elle demande d'identifier et confronter les positions des auteurs/documents du corpus.

METHODE PAS-A-PAS :

1. PREMIERE LECTURE (survol) :
Lire l'ensemble du corpus une premiere fois pour identifier le THEME general et le lien entre les documents.

2. DEUXIEME LECTURE (analytique) :
Pour chaque document, SURLIGNER :
- La THESE principale (quelle est la position de l'auteur ?)
- Les NUANCES (l'auteur tempere-t-il sa position ?)
- Les OPPOSITIONS (sur quels points les documents se contredisent-ils ?)

3. REFORMULER les positions :
Pour chaque document, reformuler en UNE PHRASE la position de l'auteur. Ne pas paraphraser : reformuler avec ses propres mots.

4. CONFRONTER les positions :
Identifier les points de convergence et de divergence entre les documents. Organiser un plan thematique (pas document par document !).

5. RELIER A LA COMMUNICATION :
Montrer en quoi ces positions eclairent des enjeux de communication (campagnes, strategies, evolution des pratiques).

STRUCTURE DE LA REPONSE :
- Introduction : presenter le theme du corpus et les documents (1-2 phrases)
- Developpement : organiser par AXES thematiques (pas document par document), confronter les positions
- Conclusion : synthese des tensions/complementarites + ouverture communication

ERREURS A EVITER :
- Faire un resume document par document (il faut CROISER les documents)
- Oublier de citer les documents (references precises : "doc 1, l. 15")
- Ne pas reformuler (paraphraser = copier, reformuler = comprendre)
- Oublier le lien avec la communication`,
        keyPoints: [
          "Q1 = 8 points : identifier et confronter les positions du corpus",
          "Methode : 2 lectures, surligner these/nuances/oppositions, reformuler, confronter",
          "Organiser par AXES thematiques, pas document par document",
          "Toujours citer les documents avec references precises",
          "Relier les positions aux enjeux de communication",
        ],
        flashcards: [
          {
            id: "f-q1a",
            front:
              "Quelle est l'erreur n°1 a la Question 1 de l'E1 ?",
            back: "Faire un RESUME document par document au lieu de CROISER les documents par axes thematiques. Le correcteur attend une confrontation des positions, pas un resume de chaque texte.",
            difficulty: "easy",
            tags: ["methodologie-e1", "question-1"],
          },
          {
            id: "f-q1b",
            front:
              "Que faut-il surligner lors de la 2e lecture du corpus ?",
            back: "Trois elements : la THESE principale de chaque auteur, les NUANCES (tempere-t-il sa position ?), les OPPOSITIONS entre documents. C'est la base pour construire la confrontation.",
            difficulty: "medium",
            tags: ["methodologie-e1", "question-1"],
          },
          {
            id: "f-q1c",
            front:
              "Comment structurer sa reponse a la Q1 ?",
            back: "Introduction (theme + presentation documents), Developpement par AXES THEMATIQUES (pas document par document, on croise !), Conclusion (synthese des tensions + ouverture communication).",
            difficulty: "medium",
            tags: ["methodologie-e1", "question-1"],
          },
          {
            id: "f-q1d",
            front:
              "Pourquoi faut-il 'relier a la communication' dans la Q1 ?",
            back: "C'est un BTS COMMUNICATION : le correcteur attend que vous montriez en quoi les positions du corpus eclairent des enjeux de communication (campagnes, strategies, pratiques professionnelles).",
            difficulty: "hard",
            tags: ["methodologie-e1", "question-1"],
          },
        ],
        quiz: [
          {
            id: "q-q1a",
            question:
              "A la Q1 de l'E1, il faut organiser sa reponse :",
            options: [
              "Document par document dans l'ordre du corpus",
              "Par axes thematiques en croisant les documents",
              "Par ordre chronologique des auteurs",
              "En citant uniquement le document le plus important",
            ],
            correctIndex: 1,
            explanation:
              "Il faut organiser par AXES THEMATIQUES en croisant les documents. L'erreur classique est de faire un resume document par document. Le correcteur attend une CONFRONTATION.",
            difficulty: "easy",
            tags: ["methodologie-e1", "question-1"],
          },
          {
            id: "q-q1b",
            question:
              "Reformuler la position d'un auteur, c'est :",
            options: [
              "Copier sa phrase exacte entre guillemets",
              "Resumer le document en entier",
              "Exprimer son idee avec ses propres mots",
              "Donner son avis personnel sur sa position",
            ],
            correctIndex: 2,
            explanation:
              "Reformuler = exprimer l'idee de l'auteur avec SES PROPRES MOTS. Ce n'est pas paraphraser (recopier avec des synonymes) ni resumer (trop long). C'est prouver qu'on a COMPRIS.",
            difficulty: "medium",
            tags: ["methodologie-e1", "question-1"],
          },
          {
            id: "q-q1c",
            question: "La Q1 vaut :",
            options: ["4 points", "6 points", "8 points", "12 points"],
            correctIndex: 2,
            explanation:
              "La Q1 = 8 points (Partie 1). C'est un gros morceau. Les 12 points restants sont repartis entre Q2 et Q3 (Partie 2).",
            difficulty: "easy",
            tags: ["methodologie-e1", "question-1"],
          },
        ],
      },

      // --- Chapitre C : Question 2 ---
      {
        id: "question-2-analyser-campagne",
        title: "Question 2 : Analyser une campagne",
        content: `La Question 2 fait partie de la Partie 2 (12 points avec la Q3). Elle demande d'analyser une campagne ou un document de communication.

GRILLE D'ANALYSE COMPLETE :

1. POSITIONNEMENT :
- Quel est le positionnement de la marque/organisation ?
- Quelle image veut-elle projeter ? Haut de gamme, accessible, engagee, innovante ?

2. PROCEDES VISUELS :
- Composition de l'image (plans, lignes directrices, equilibre)
- Couleurs (symbolique : rouge = passion/urgence, vert = nature, bleu = confiance)
- Typographie (serif = tradition, sans-serif = modernite)
- Photographie vs illustration. Cadrage, angle de prise de vue.

3. PROCEDES REDACTIONNELS :
- Slogan/accroche : quel type ? (interrogatif, imperatif, jeu de mots)
- Ton : informatif, humoristique, injonctif, emotionnel, provoquant
- Registre de langue : soutenu, courant, familier

4. FIGURES DE STYLE :
Identifier les figures (metaphore, hyperbole, antithese, anaphore...) et expliquer leur EFFET sur le recepteur.

5. CIBLE :
A qui s'adresse cette campagne ? Age, CSP, valeurs, mode de vie. Quels indices dans le visuel et le texte ?

6. REFERENCES CULTURELLES :
La campagne fait-elle reference a des oeuvres, des mouvements artistiques, des evenements ? (intertextualite)

7. EFFICACITE :
La campagne atteint-elle son objectif ? Points forts et limites.

EXEMPLES DE BONNES ANALYSES :
- Dove "Real Beauty" : positionnement inclusif, procede photo (femmes "normales" vs mannequins), figure : antithese beaute normee/beaute reelle, cible femmes 25-50 ans, reference au body positive.
- Nike "Just Do It" : positionnement depassement de soi, slogan imperatif (fonction conative Jakobson), noir & blanc dramatique, metaphore du combat interieur, cible large mais aspirationnelle.`,
        keyPoints: [
          "7 axes d'analyse : positionnement, visuels, redactionnels, figures de style, cible, references culturelles, efficacite",
          "Toujours expliquer l'EFFET de chaque procede sur le recepteur",
          "Identifier la cible (age, CSP, valeurs) a partir des indices visuels et textuels",
          "Mobiliser les outils theoriques (semiologie Barthes, fonctions Jakobson, rhetorique)",
          "Conclure sur l'efficacite globale : la campagne atteint-elle son objectif ?",
        ],
        flashcards: [
          {
            id: "f-q2a",
            front:
              "Quels sont les 7 axes de la grille d'analyse d'une campagne ?",
            back: "1. Positionnement 2. Procedes visuels 3. Procedes redactionnels 4. Figures de style 5. Cible 6. References culturelles 7. Efficacite. Toujours expliquer l'EFFET de chaque procede.",
            difficulty: "easy",
            tags: ["methodologie-e1", "question-2"],
          },
          {
            id: "f-q2b",
            front:
              "Pourquoi l'analyse de la CIBLE est-elle essentielle dans l'analyse d'une campagne ?",
            back: "La cible determine TOUS les choix de communication : ton, visuel, canal, references culturelles. Identifier la cible (age, CSP, valeurs) permet de comprendre et justifier chaque procede utilise.",
            difficulty: "medium",
            tags: ["methodologie-e1", "question-2"],
          },
          {
            id: "f-q2c",
            front:
              "Comment la campagne Dove 'Real Beauty' peut-elle etre analysee ?",
            back: "Positionnement inclusif. Procede photo : femmes 'normales' vs mannequins. Figure : ANTITHESE beaute normee / beaute reelle. Cible : femmes 25-50 ans. Reference : mouvement body positive. Efficacite : forte identification de la cible.",
            difficulty: "hard",
            tags: ["methodologie-e1", "question-2", "dove"],
          },
          {
            id: "f-q2d",
            front: "Quels outils theoriques mobiliser pour analyser une campagne ?",
            back: "Semiologie de BARTHES (denotation/connotation, 3 messages de l'image). Fonctions de JAKOBSON (conative, poetique...). Figures de RHETORIQUE. Ethos/Pathos/Logos d'ARISTOTE. Peirce (icone/indice/symbole).",
            difficulty: "medium",
            tags: ["methodologie-e1", "question-2"],
          },
        ],
        quiz: [
          {
            id: "q-q2a",
            question:
              "Lors de l'analyse d'une campagne, la symbolique des couleurs releve de :",
            options: [
              "L'analyse du positionnement",
              "L'analyse des procedes visuels",
              "L'analyse des figures de style",
              "L'analyse de la cible",
            ],
            correctIndex: 1,
            explanation:
              "La symbolique des couleurs fait partie des PROCEDES VISUELS (composition, couleurs, typo, cadrage). Rouge = passion, vert = nature, bleu = confiance, noir = luxe...",
            difficulty: "easy",
            tags: ["methodologie-e1", "question-2"],
          },
          {
            id: "q-q2b",
            question: "Le slogan 'Just Do It' de Nike releve de la fonction :",
            options: [
              "Referentielle (information)",
              "Conative (incitation a agir)",
              "Phatique (maintien du contact)",
              "Metalinguistique (explication du langage)",
            ],
            correctIndex: 1,
            explanation:
              "'Just Do It' = IMPERATIF = fonction CONATIVE (Jakobson). La pub vise a faire AGIR le recepteur. L'imperatif est le marqueur typique de la fonction conative.",
            difficulty: "medium",
            tags: ["methodologie-e1", "question-2", "jakobson"],
          },
          {
            id: "q-q2c",
            question:
              "L'analyse de l'efficacite d'une campagne doit :",
            options: [
              "Toujours conclure que la campagne est reussie",
              "Donner un avis personnel sans justification",
              "Evaluer si la campagne atteint son objectif, avec points forts et limites",
              "Se limiter a une description du visuel",
            ],
            correctIndex: 2,
            explanation:
              "L'efficacite = evaluation ARGUMENTEE. La campagne atteint-elle son objectif ? Quels points forts ? Quelles limites ? Pas de jugement gratuit, mais une analyse fondee sur les procedes identifies.",
            difficulty: "medium",
            tags: ["methodologie-e1", "question-2"],
          },
        ],
      },

      // --- Chapitre D : Question 3 ---
      {
        id: "question-3-concevoir-message",
        title: "Question 3 : Concevoir et rediger un message justifie",
        content: `La Question 3 fait partie de la Partie 2 (12 points avec la Q2). Elle demande de CONCEVOIR un message de communication et de JUSTIFIER chaque choix.

METHODE PAS-A-PAS :

1. LIRE LE BRIEF :
Le sujet donne un contexte/brief : une organisation, un objectif, une cible, des contraintes. Lire ATTENTIVEMENT et souligner chaque element.

2. IDENTIFIER LES ELEMENTS CLES :
- CIBLE : a qui s'adresse le message ? (age, CSP, valeurs, attentes)
- OBJECTIF : informer ? sensibiliser ? inciter a agir ? fideliser ?
- CONTRAINTES : format impose, budget, charte graphique, cadre legal

3. CHOISIR LE FORMAT, LE TON ET LE CANAL :
- Format : affiche, post RS, communique de presse, spot radio, newsletter...
- Ton : informatif, humoristique, emotionnel, engagé, solennel...
- Canal : presse, TV, affichage, reseaux sociaux, evenementiel...
Chaque choix doit etre COHERENT avec la cible et l'objectif.

4. REDIGER LE MESSAGE :
- Accroche percutante (attirer l'attention)
- Corps du message clair et structure
- Call-to-action si pertinent
- Utiliser des procedes rhetoriques adaptes

5. JUSTIFIER CHAQUE CHOIX :
C'est LA partie essentielle. Pour chaque element (format, ton, canal, accroche, procede), expliquer POURQUOI ce choix en lien avec la cible, l'objectif et les contraintes.

EXEMPLES DE BONS MESSAGES :
Brief : "Sensibiliser les 18-25 ans au gaspillage alimentaire"
→ Format : story Instagram (format vertical, ephemere)
→ Ton : humoristique et decale (adapte aux 18-25)
→ Accroche : "Ta banane a des taches ? Elle est PARFAITE." (antithese norme esthetique/realite)
→ Justification : Instagram = plateforme favorite des 18-25, story = format natif, humour = meilleur taux d'engagement chez les jeunes.

ERREURS A EVITER :
- Ne pas justifier ses choix (c'est le coeur de la notation !)
- Proposer un message deconnecte de la cible
- Oublier les contraintes du brief
- Manquer de creativite (le correcteur attend de l'originalite)`,
        keyPoints: [
          "Lire le brief attentivement : cible + objectif + contraintes",
          "Choisir format/ton/canal en coherence avec cible et objectif",
          "Rediger : accroche percutante + corps clair + call-to-action",
          "JUSTIFIER chaque choix = coeur de la notation",
          "Erreurs : pas de justification, message deconnecte de la cible, oubli des contraintes",
        ],
        flashcards: [
          {
            id: "f-q3a",
            front:
              "Quel est le piege n°1 de la Question 3 ?",
            back: "Ne pas JUSTIFIER ses choix. Proposer un message ne suffit pas : il faut expliquer POURQUOI ce format, ce ton, ce canal, cette accroche, en lien avec la cible, l'objectif et les contraintes du brief.",
            difficulty: "easy",
            tags: ["methodologie-e1", "question-3"],
          },
          {
            id: "f-q3b",
            front:
              "Quels 3 elements cles faut-il identifier dans le brief de la Q3 ?",
            back: "1. La CIBLE (a qui ?). 2. L'OBJECTIF (informer, sensibiliser, inciter, fideliser ?). 3. Les CONTRAINTES (format, budget, cadre legal, charte). Tout le message decoule de ces 3 elements.",
            difficulty: "easy",
            tags: ["methodologie-e1", "question-3"],
          },
          {
            id: "f-q3c",
            front:
              "Comment choisir le bon canal de communication pour un message ?",
            back: "Le canal doit etre COHERENT avec la cible : Instagram/TikTok pour les 18-25, LinkedIn pour les pros, presse locale pour les seniors, affichage pour le grand public. Justifier en citant les usages mediatiques de la cible.",
            difficulty: "medium",
            tags: ["methodologie-e1", "question-3"],
          },
          {
            id: "f-q3d",
            front:
              "Qu'est-ce qu'un bon call-to-action dans un message de communication ?",
            back: "Un call-to-action = incitation CLAIRE a agir. Il doit etre concret ('Telechargez l'appli', 'Rendez-vous le 15 juin', 'Scannez le QR code') et adapte au canal et a la cible. Pas vague ('En savoir plus').",
            difficulty: "medium",
            tags: ["methodologie-e1", "question-3"],
          },
        ],
        quiz: [
          {
            id: "q-q3a",
            question:
              "A la Q3, la justification des choix :",
            options: [
              "Est facultative si le message est creatif",
              "Est le coeur de la notation",
              "Doit etre faite uniquement a l'oral",
              "Ne concerne que le choix du canal",
            ],
            correctIndex: 1,
            explanation:
              "La justification est LE COEUR de la notation. Chaque choix (format, ton, canal, accroche, procede) doit etre justifie en lien avec la cible, l'objectif et les contraintes.",
            difficulty: "easy",
            tags: ["methodologie-e1", "question-3"],
          },
          {
            id: "q-q3b",
            question:
              "Pour sensibiliser les 18-25 ans, quel canal est le plus pertinent ?",
            options: [
              "La presse quotidienne nationale",
              "L'affichage en abribus",
              "Instagram ou TikTok",
              "La radio generaliste",
            ],
            correctIndex: 2,
            explanation:
              "Instagram et TikTok sont les plateformes les plus utilisees par les 18-25 ans. Le choix du canal doit toujours etre justifie par les usages REELS de la cible.",
            difficulty: "easy",
            tags: ["methodologie-e1", "question-3"],
          },
          {
            id: "q-q3c",
            question:
              "Les 3 elements cles a identifier dans le brief de la Q3 sont :",
            options: [
              "Budget, planning, equipe",
              "Cible, objectif, contraintes",
              "Slogan, visuel, logo",
              "Emetteur, recepteur, canal",
            ],
            correctIndex: 1,
            explanation:
              "CIBLE (a qui ?), OBJECTIF (pour quoi ?) et CONTRAINTES (cadre). Ce sont les 3 piliers du brief. Tout le message (format, ton, canal, contenu) en decoule.",
            difficulty: "easy",
            tags: ["methodologie-e1", "question-3"],
          },
        ],
      },

      // --- Chapitre E : Gestion du temps 4h ---
      {
        id: "gestion-temps-4h",
        title: "Gestion du temps 4h",
        content: `4 heures, c'est a la fois long et court. Une mauvaise gestion du temps est la cause n°1 des copies incompletes.

REPARTITION RECOMMANDEE :

00:00 - 00:20 → LECTURE DU SUJET ET DU CORPUS (20 min)
- Lire le sujet en entier (questions + corpus)
- Premiere lecture rapide du corpus pour saisir le theme
- Deuxieme lecture en surlignant les elements cles
- Ne PAS commencer a ecrire avant d'avoir lu 2 fois

00:20 - 01:20 → QUESTION 1 (1 heure)
- 10 min de brouillon (plan thematique, positions des auteurs)
- 40 min de redaction
- 10 min de relecture de la Q1

01:20 - 02:40 → QUESTION 2 (1h20)
- 15 min de brouillon (grille d'analyse, plan)
- 50 min de redaction
- 15 min de relecture de la Q2
(La Q2 necessite plus de temps car l'analyse de campagne est dense)

02:40 - 03:40 → QUESTION 3 (1 heure)
- 15 min de brouillon (lecture brief, choix creatifs, justifications)
- 35 min de redaction
- 10 min de relecture de la Q3

03:40 - 04:00 → RELECTURE FINALE (20 min)
- Orthographe, syntaxe, accords
- Coherence de l'argumentation
- Ajout d'exemples ou de references manquantes
- Verification que toutes les parties sont traitees

PIEGES A EVITER :
- Passer trop de temps sur la Q1 (8 pts) au detriment des Q2-Q3 (12 pts)
- Ne pas faire de brouillon ("je gagne du temps" → en realite on perd en structure)
- Oublier la relecture finale (les fautes d'orthographe coutent cher)
- Baclier la Q3 par manque de temps (c'est la plus creative, elle marque les points)
- Ecrire de tres longs paragraphes sans structure claire`,
        keyPoints: [
          "Lecture corpus : 20 min (2 lectures, ne pas ecrire avant)",
          "Q1 : 1 heure (brouillon 10 min + redaction 40 min + relecture 10 min)",
          "Q2 : 1h20 (brouillon 15 min + redaction 50 min + relecture 15 min)",
          "Q3 : 1 heure (brouillon 15 min + redaction 35 min + relecture 10 min)",
          "Relecture finale : 20 min — orthographe, coherence, exemples manquants",
        ],
        flashcards: [
          {
            id: "f-gt1",
            front:
              "Quelle est la repartition recommandee du temps pour les 4h de l'E1 ?",
            back: "Lecture corpus 20 min → Q1 1h → Q2 1h20 → Q3 1h → Relecture 20 min. La Q2 a plus de temps car l'analyse de campagne est la plus dense.",
            difficulty: "easy",
            tags: ["methodologie-e1", "gestion-temps"],
          },
          {
            id: "f-gt2",
            front:
              "Pourquoi ne faut-il PAS passer trop de temps sur la Q1 ?",
            back: "La Q1 vaut 8 points mais les Q2+Q3 valent 12 points. Passer 2h sur la Q1 = baclier 12 points de Q2+Q3. Respecter 1h max pour la Q1.",
            difficulty: "medium",
            tags: ["methodologie-e1", "gestion-temps"],
          },
          {
            id: "f-gt3",
            front:
              "Pourquoi la relecture finale est-elle indispensable ?",
            back: "Les fautes d'orthographe/syntaxe COUTENT des points. 20 min de relecture permettent aussi de verifier la coherence de l'argumentation et d'ajouter des exemples ou references oubliees.",
            difficulty: "easy",
            tags: ["methodologie-e1", "gestion-temps"],
          },
        ],
        quiz: [
          {
            id: "q-gt1",
            question:
              "Combien de temps faut-il consacrer a la lecture du corpus ?",
            options: ["5 minutes", "10 minutes", "20 minutes", "30 minutes"],
            correctIndex: 2,
            explanation:
              "20 minutes de lecture (2 lectures). Il ne faut JAMAIS commencer a ecrire avant d'avoir lu le corpus 2 fois. La 1ere lecture = survol, la 2e = analyse et surlignage.",
            difficulty: "easy",
            tags: ["methodologie-e1", "gestion-temps"],
          },
          {
            id: "q-gt2",
            question:
              "Le piege principal de gestion du temps a l'E1 est :",
            options: [
              "Passer trop de temps sur la relecture",
              "Passer trop de temps sur la Q1 au detriment des Q2-Q3",
              "Ne pas lire le corpus",
              "Ecrire trop vite",
            ],
            correctIndex: 1,
            explanation:
              "La Q1 = 8 points, les Q2+Q3 = 12 points. Beaucoup de candidats passent 2h sur la Q1 et baclent les 12 points de la Partie 2. Il faut respecter 1h max pour la Q1.",
            difficulty: "medium",
            tags: ["methodologie-e1", "gestion-temps"],
          },
        ],
      },
    ],
  },

  // =========================================
  // MODULE 3 : THÉMATIQUES 2026
  // =========================================
  {
    id: "thematiques-2026",
    title: "Thematiques 2026",
    exam: "e1",
    chapters: [
      // --- Chapitre A : À table ! ---
      {
        id: "a-table-formes-enjeux-repas",
        title: "A table ! : formes et enjeux du repas",
        content: `Le repas est un fait social total. Il depasse la simple alimentation pour toucher a la culture, l'identite, la distinction sociale et la communication.

LE REPAS COMME FAIT SOCIAL :

Roland BARTHES (Mythologies, 1957) analyse le "steak-frites" comme un MYTHE francais : le steak saignant = virilite, energie, francite. L'alimentation est un systeme de SIGNES (approche semiologique). Chaque aliment porte des connotations culturelles.

Annie ERNAUX explore dans ses oeuvres autobiographiques le rapport entre alimentation et CLASSE SOCIALE. Les repas de son enfance ouvriere (conserves, plats simples) s'opposent aux repas bourgeois qu'elle decouvre plus tard. Manger = marqueur social.

Pierre BOURDIEU (La Distinction, 1979) montre que les gouts alimentaires sont des marqueurs de DISTINCTION SOCIALE. Les classes populaires privilegient la quantite et le nourrissant ; les classes superieures privilegient la presentation, la rarete, le raffinement. Le "bon gout" est une construction sociale.

COMMUNICATION ALIMENTAIRE :

Food porn Instagram : la mise en scene des repas sur les reseaux sociaux est devenue un phenomene majeur. Le plat est photographie, filtre, partage. La nourriture devient un CONTENU de communication, un signe de capital culturel.

Labels bio/local : multiplication des labels (AB, Label Rouge, AOC, AOP) comme outils de REASSURANCE et de differenciation. Le label est un signe semiologique qui porte des valeurs (sante, terroir, respect de l'environnement).

Marketing sensoriel : utilisation des 5 sens dans la communication alimentaire. Couleurs chaudes = appetence, sons de craquant = fraicheur, toucher du packaging = qualite perçue.

Packaging : le packaging alimentaire est un support de communication majeur. Il informe (ingredients, origine), seduit (design, couleurs), rassure (labels, claims) et positionne (premium vs discount).

PARADOXES :

Malbouffe vs healthy : coexistence de la malbouffe (fast food, ultra-transformes) et de la tendance healthy (superaliments, detox, clean eating). Paradoxe marketing : McDonald's vend des salades, Coca-Cola lance des versions "zero".

"Manger Bouger" vs pub junk food pour enfants : le gouvernement finance la campagne "Manger Bouger" (PNNS) mais les enfants sont bombardes de publicites pour des produits sucres/gras. Tension entre sante publique et liberte commerciale. La loi Gattaz (2004) impose le bandeau "Pour votre sante, evitez de manger trop gras, trop sucre, trop sale" sur les pubs alimentaires.

CAMPAGNES A CONNAITRE :

- Intermarche "Fruits et legumes moches" (2014) : lutte contre le gaspillage alimentaire en valorisant les fruits/legumes "imparfaits". Succes viral. Antithese norme esthetique/valeur nutritive.
- Burger King "transparence" : campagne montrant les burgers en decomposition pour prouver l'absence de conservateurs. Procede : le choc visuel comme preuve d'authenticite.
- Yuka : application qui note les produits alimentaires. Elle a force les industriels a reformuler leurs recettes. Exemple de communication par la transparence et l'empowerment du consommateur.

AUTEURS MOBILISABLES :
- Roland BARTHES : Mythologies (steak-frites = signe culturel), Rhetorique de l'image (Panzani)
- Annie ERNAUX : alimentation comme marqueur de classe
- Pierre BOURDIEU : La Distinction (gouts alimentaires = distinction sociale)
- Jean BAUDRILLARD : La Societe de consommation (l'aliment comme objet-signe, on consomme des signes plus que des produits)`,
        keyPoints: [
          "Barthes : le steak-frites comme mythe francais, l'aliment comme signe semiologique",
          "Bourdieu : les gouts alimentaires = distinction sociale (quantite vs raffinement)",
          "Ernaux : alimentation comme marqueur de classe sociale",
          "Food porn, labels bio, marketing sensoriel, packaging = outils de communication alimentaire",
          "Paradoxes : malbouffe vs healthy, 'Manger Bouger' vs pub junk food",
          "Campagnes : Intermarche 'Legumes moches', Burger King transparence, Yuka",
        ],
        didYouKnow:
          "La campagne 'Fruits et legumes moches' d'Intermarche (2014) a ete vue plus de 10 millions de fois en ligne et a augmente la frequentation des magasins de 24% ! Un fruit 'moche' vendu 30% moins cher a convaincu les consommateurs.",
        flashcards: [
          {
            id: "f-at1",
            front:
              "Comment Barthes analyse-t-il le steak-frites dans Mythologies ?",
            back: "Le steak-frites est un MYTHE francais : le steak saignant connote la virilite, l'energie, la francite. Pour Barthes, l'alimentation est un systeme de SIGNES — chaque aliment porte des connotations culturelles (approche semiologique).",
            difficulty: "medium",
            tags: ["thematiques-2026", "a-table", "barthes"],
          },
          {
            id: "f-at2",
            front:
              "Comment Bourdieu relie-t-il alimentation et distinction sociale ?",
            back: "Dans La Distinction (1979), Bourdieu montre que les gouts alimentaires sont des MARQUEURS SOCIAUX. Classes populaires = quantite, nourrissant. Classes superieures = presentation, rarete, raffinement. Le 'bon gout' est une construction sociale.",
            difficulty: "medium",
            tags: ["thematiques-2026", "a-table", "bourdieu"],
          },
          {
            id: "f-at3",
            front:
              "Qu'est-ce que le 'food porn' et quel est son enjeu communicationnel ?",
            back: "Mise en scene esthetisee des repas sur les reseaux sociaux (Instagram). La nourriture devient un CONTENU de communication et un signe de capital culturel. Enjeu : l'image du repas compte autant que le repas lui-meme.",
            difficulty: "easy",
            tags: ["thematiques-2026", "a-table", "reseaux-sociaux"],
          },
          {
            id: "f-at4",
            front:
              "Decrivez la campagne Intermarche 'Fruits et legumes moches'.",
            back: "Campagne 2014 valorisant les fruits/legumes IMPARFAITS vendus 30% moins cher pour lutter contre le gaspillage alimentaire. Procede : ANTITHESE norme esthetique / valeur nutritive. Succes viral (10M de vues).",
            difficulty: "easy",
            tags: ["thematiques-2026", "a-table", "campagne"],
          },
          {
            id: "f-at5",
            front:
              "Quel est le paradoxe 'Manger Bouger' vs pub junk food ?",
            back: "L'Etat finance 'Manger Bouger' (PNNS) pour la sante publique, mais les enfants sont bombardes de pubs pour produits sucres/gras. La loi impose un bandeau sanitaire mais ne supprime pas les pubs. Tension sante publique vs liberte commerciale.",
            difficulty: "medium",
            tags: ["thematiques-2026", "a-table", "paradoxe"],
          },
          {
            id: "f-at6",
            front: "Comment Annie Ernaux relie-t-elle alimentation et classe sociale ?",
            back: "Dans ses oeuvres autobiographiques, Ernaux decrit les repas de son enfance OUVRIERE (conserves, plats simples) en opposition aux repas BOURGEOIS decouverts plus tard. Manger est un MARQUEUR SOCIAL qui revele les inegalites de classe.",
            difficulty: "hard",
            tags: ["thematiques-2026", "a-table", "ernaux"],
          },
          {
            id: "f-at7",
            front: "Qu'est-ce que le marketing sensoriel en communication alimentaire ?",
            back: "Utilisation des 5 SENS pour communiquer : couleurs chaudes = appetence, sons de craquant = fraicheur, toucher du packaging = qualite perçue. Le marketing sensoriel cree une EXPERIENCE au-dela du message verbal.",
            difficulty: "medium",
            tags: ["thematiques-2026", "a-table", "marketing"],
          },
          {
            id: "f-at8",
            front:
              "Comment Baudrillard eclaire-t-il le theme 'A table !' ?",
            back: "Pour Baudrillard (La Societe de consommation), on ne consomme plus des PRODUITS mais des SIGNES. Un repas bio/local/instagrammable = consommation de signes (sante, ethique, statut social) plus que d'aliments.",
            difficulty: "hard",
            tags: ["thematiques-2026", "a-table", "baudrillard"],
          },
        ],
        quiz: [
          {
            id: "q-at1",
            question:
              "Pour Barthes, le steak-frites est :",
            options: [
              "Un simple plat populaire sans signification",
              "Un mythe francais connotant virilite et francite",
              "Un symbole de la mondialisation",
              "Un exemple de malbouffe",
            ],
            correctIndex: 1,
            explanation:
              "Dans Mythologies, Barthes analyse le steak-frites comme un MYTHE : le steak saignant connote la virilite, l'energie, la francite. L'alimentation est un systeme de SIGNES culturels.",
            difficulty: "medium",
            tags: ["thematiques-2026", "a-table", "barthes"],
          },
          {
            id: "q-at2",
            question:
              "La campagne 'Fruits et legumes moches' d'Intermarche utilise principalement :",
            options: [
              "L'hyperbole",
              "La metaphore",
              "L'antithese",
              "L'oxymore",
            ],
            correctIndex: 2,
            explanation:
              "ANTITHESE : opposition entre la norme esthetique (beau = bon) et la valeur nutritive reelle (moche mais parfait). La campagne renverse le prejuge pour lutter contre le gaspillage.",
            difficulty: "medium",
            tags: ["thematiques-2026", "a-table", "campagne"],
          },
          {
            id: "q-at3",
            question:
              "Selon Bourdieu, les gouts alimentaires sont :",
            options: [
              "Universels et naturels",
              "Determines uniquement par le prix",
              "Des marqueurs de distinction sociale",
              "Independants de la classe sociale",
            ],
            correctIndex: 2,
            explanation:
              "Bourdieu (La Distinction, 1979) : les gouts alimentaires sont des MARQUEURS de distinction sociale. Classes populaires = quantite. Classes superieures = raffinement. Le 'bon gout' est socialement construit.",
            difficulty: "medium",
            tags: ["thematiques-2026", "a-table", "bourdieu"],
          },
          {
            id: "q-at4",
            question:
              "L'application Yuka est un exemple de :",
            options: [
              "Greenwashing",
              "Communication par la transparence et l'empowerment du consommateur",
              "Publicite traditionnelle",
              "Communication institutionnelle",
            ],
            correctIndex: 1,
            explanation:
              "Yuka note les produits alimentaires de maniere transparente et donne le pouvoir (empowerment) au consommateur. Elle a force les industriels a reformuler leurs recettes = communication par la transparence.",
            difficulty: "easy",
            tags: ["thematiques-2026", "a-table", "yuka"],
          },
          {
            id: "q-at5",
            question: "Le 'food porn' sur Instagram est un exemple de :",
            options: [
              "Communication institutionnelle",
              "La nourriture comme contenu de communication et signe de capital culturel",
              "Publicite reglementee",
              "Communication interne d'entreprise",
            ],
            correctIndex: 1,
            explanation:
              "Le food porn = la nourriture devient un CONTENU de communication sur les RS. Le plat est photographie, filtre, partage. C'est un signe de capital culturel (Bourdieu) et un objet-signe (Baudrillard).",
            difficulty: "easy",
            tags: ["thematiques-2026", "a-table", "reseaux-sociaux"],
          },
          {
            id: "q-at6",
            question:
              "Quel auteur analyse l'alimentation comme marqueur de classe dans une oeuvre autobiographique ?",
            options: [
              "Roland Barthes",
              "Pierre Bourdieu",
              "Annie Ernaux",
              "Jean Baudrillard",
            ],
            correctIndex: 2,
            explanation:
              "Annie ERNAUX, dans ses oeuvres autobiographiques, decrit le contraste entre les repas ouvriers de son enfance et les repas bourgeois decouverts plus tard. L'alimentation revele les inegalites de classe.",
            difficulty: "medium",
            tags: ["thematiques-2026", "a-table", "ernaux"],
          },
        ],
      },

      // --- Chapitre B : La rue ---
      {
        id: "la-rue",
        title: "La rue",
        content: `La rue est bien plus qu'un espace de circulation : c'est un lieu de communication, d'expression, de spectacle et de pouvoir.

LA RUE COMME ESPACE DE COMMUNICATION :

Guillaume APOLLINAIRE ("Zone", Alcools, 1913) decrit la rue parisienne comme un poeme vivant : enseignes, affiches, tracts, cris des marchands. La rue est un TEXTE a dechiffrer, un espace sature de messages.

Georges PEREC (Tentative d'epuisement d'un lieu parisien, 1975) s'installe Place Saint-Sulpice et note TOUT ce qu'il voit pendant 3 jours. Il revele la richesse communicationnelle de l'ordinaire urbain : panneaux, enseignes, passages pietons, voitures, gestes.

Emile ZOLA, dans ses descriptions naturalistes, utilise la rue comme miroir de la societe : les boulevards haussmanniens, les grands magasins (Au Bonheur des Dames), la rue comme espace de SPECTACLE commercial.

STREET MARKETING ET GUERILLA :

Street marketing : actions de communication dans la RUE pour creer la surprise et le contact direct. Logique de proximite et d'experience.
- Flash mobs : rassemblements choreographies spontanes dans l'espace public (T-Mobile, gare de Liverpool Street)
- Installations ephemeres : objets geants, trompe-l'oeil, structures insolites dans la rue
- Ambient marketing : detournement du mobilier urbain (abribus, passages pietons, bancs) en support publicitaire

Avantages : fort impact, viralite sur les RS (les passants filment et partagent), cout potentiellement faible, memorabilite.
Limites : portee geographique limitee, autorisations necessaires, risque de rejet ("pollution visuelle").

ART URBAIN :

BANKSY : artiste de street art anonyme. Son travail est une forme de COMMUNICATION POLITIQUE : il critique le capitalisme, la guerre, la surveillance. Ses oeuvres deviennent virales sur les RS. Paradoxe : art anti-systeme qui finit vendu aux encheres pour des millions.

JR : photographe/artiste qui colle des portraits geants sur les murs des villes. Son projet "Women Are Heroes" donne une visibilite aux femmes invisibles. L'art urbain comme outil d'empowerment et de communication sociale.

Graffiti legal vs sauvage : le graffiti est un acte de communication qui pose la question de la legitimite. Certaines villes creent des murs d'expression legale (Berlin, Bristol). D'autres criminalisent toute forme de graffiti. Enjeu : qui a le droit de communiquer dans l'espace public ?

POLLUTION VISUELLE ET VILLES SANS PUB :

Grenoble (2014) : premiere grande ville europeenne a supprimer les panneaux publicitaires, remplaces par des arbres et des oeuvres d'art. Objectif : reconquerir l'espace public et reduire la pollution visuelle.
Sao Paulo (2007) : "Cidade Limpa" (Ville propre) — loi interdisant TOUTE publicite exterieure (15 000 panneaux retires). Resultat : revelation d'une architecture cachee, mais perte de reperes visuels.

Debat : la publicite dans la rue est-elle une information utile ou une pollution visuelle ? Liberte d'expression commerciale vs droit a un espace public apaise.

CAMPAGNES A CONNAITRE :

- Netflix Squid Game Champs-Elysees (2021) : une poupee geante de la serie installee sur les Champs. Street marketing viral, millions de photos partagees. L'espace public comme media.
- Volkswagen "Piano Stairs" (Stockholm) : un escalier de metro transforme en piano geant. Les gens prennent l'escalier au lieu de l'escalator. Nudge marketing par le jeu.
- Apple "Shot on iPhone" murals : photos d'utilisateurs affichees en grand format sur des murs de villes du monde entier. La rue comme galerie d'art et preuve sociale (UGC).

AUTEURS :
- APOLLINAIRE : la rue comme poeme, texte a dechiffrer (Zone)
- PEREC : l'ordinaire urbain revele la richesse communicationnelle (Tentative d'epuisement)
- DEBORD (La Societe du spectacle, 1967) : la ville est colonisee par le spectacle marchand. La "derive" situationniste = se perdre dans la ville pour echapper aux parcours imposes par le capitalisme.
- McLUHAN : "la ville est un medium" — l'espace urbain communique par sa structure meme (architecture, signalisation, flux).`,
        keyPoints: [
          "Apollinaire (Zone) : la rue comme poeme vivant, texte a dechiffrer",
          "Perec (Tentative d'epuisement) : reveler la richesse communicationnelle de l'ordinaire",
          "Street marketing : flash mobs, installations ephemeres, ambient marketing",
          "Banksy : street art comme communication politique anti-systeme",
          "Villes sans pub : Grenoble (2014), Sao Paulo (2007) — pollution visuelle vs espace apaise",
          "Campagnes : Netflix Squid Game, VW Piano Stairs, Apple Shot on iPhone murals",
          "Debord : la ville colonisee par le spectacle marchand, derive situationniste",
        ],
        didYouKnow:
          "Sao Paulo a retire 15 000 panneaux publicitaires en 2007 avec sa loi 'Cidade Limpa'. Les habitants ont alors redecouvert l'architecture de leur ville cachee sous les publicites depuis des decennies !",
        flashcards: [
          {
            id: "f-lr1",
            front:
              "Comment Apollinaire decrit-il la rue dans 'Zone' ?",
            back: "Dans 'Zone' (Alcools, 1913), Apollinaire decrit la rue parisienne comme un POEME VIVANT : enseignes, affiches, tracts, cris. La rue est un TEXTE a dechiffrer, un espace sature de messages de communication.",
            difficulty: "medium",
            tags: ["thematiques-2026", "la-rue", "apollinaire"],
          },
          {
            id: "f-lr2",
            front:
              "Qu'est-ce que la 'Tentative d'epuisement d'un lieu parisien' de Perec ?",
            back: "Perec (1975) s'installe Place Saint-Sulpice et note TOUT ce qu'il voit pendant 3 jours. Il revele la richesse communicationnelle de l'ORDINAIRE urbain : panneaux, enseignes, gestes, flux. L'infra-ordinaire comme matiere.",
            difficulty: "medium",
            tags: ["thematiques-2026", "la-rue", "perec"],
          },
          {
            id: "f-lr3",
            front:
              "Qu'est-ce que l'ambient marketing ? Donnez un exemple.",
            back: "Detournement du MOBILIER URBAIN en support publicitaire : un abribus transforme en aquarium, un passage pieton en frites McDonald's, un banc en barre de KitKat. L'espace public devient media de communication.",
            difficulty: "easy",
            tags: ["thematiques-2026", "la-rue", "street-marketing"],
          },
          {
            id: "f-lr4",
            front:
              "Pourquoi Banksy est-il pertinent pour le theme 'La rue' ?",
            back: "Banksy utilise le street art comme COMMUNICATION POLITIQUE : il critique le capitalisme, la guerre, la surveillance. Ses oeuvres sont virales sur les RS. Paradoxe : art anti-systeme vendu des millions aux encheres.",
            difficulty: "medium",
            tags: ["thematiques-2026", "la-rue", "banksy"],
          },
          {
            id: "f-lr5",
            front:
              "Que s'est-il passe a Grenoble en 2014 concernant la publicite ?",
            back: "Grenoble est devenue la premiere grande ville europeenne a SUPPRIMER les panneaux publicitaires, remplaces par des arbres et des oeuvres d'art. Objectif : reconquerir l'espace public et reduire la pollution visuelle.",
            difficulty: "easy",
            tags: ["thematiques-2026", "la-rue", "villes-sans-pub"],
          },
          {
            id: "f-lr6",
            front:
              "Qu'est-ce que la 'derive' situationniste chez Debord ?",
            back: "Guy DEBORD (La Societe du spectacle, 1967) propose la DERIVE : se perdre dans la ville pour echapper aux parcours IMPOSES par le capitalisme. La ville est colonisee par le spectacle marchand, la derive est un acte de resistance.",
            difficulty: "hard",
            tags: ["thematiques-2026", "la-rue", "debord"],
          },
          {
            id: "f-lr7",
            front:
              "Decrivez la campagne Netflix Squid Game sur les Champs-Elysees.",
            back: "En 2021, Netflix installe une poupee GEANTE de Squid Game sur les Champs-Elysees. Street marketing viral : millions de photos partagees sur les RS. L'espace public devient un MEDIA de communication a part entiere.",
            difficulty: "easy",
            tags: ["thematiques-2026", "la-rue", "campagne"],
          },
          {
            id: "f-lr8",
            front: "Que signifie 'la ville est un medium' selon McLuhan ?",
            back: "Pour McLUHAN, l'espace urbain COMMUNIQUE par sa structure meme : architecture, signalisation, flux, mobilier urbain. La ville n'est pas un simple decor, elle est un MEDIUM qui transmet des messages et organise les comportements.",
            difficulty: "hard",
            tags: ["thematiques-2026", "la-rue", "mcluhan"],
          },
        ],
        quiz: [
          {
            id: "q-lr1",
            question:
              "Dans 'Zone', Apollinaire decrit la rue comme :",
            options: [
              "Un espace vide et silencieux",
              "Un poeme vivant sature de messages",
              "Un lieu dangereux a eviter",
              "Un musee a ciel ouvert",
            ],
            correctIndex: 1,
            explanation:
              "Apollinaire (Zone, 1913) decrit la rue parisienne comme un POEME VIVANT : enseignes, affiches, tracts, cris. La rue est un texte a dechiffrer, sature de messages communicationnels.",
            difficulty: "medium",
            tags: ["thematiques-2026", "la-rue", "apollinaire"],
          },
          {
            id: "q-lr2",
            question:
              "Le 'Piano Stairs' de Volkswagen a Stockholm est un exemple de :",
            options: [
              "Greenwashing",
              "Nudge marketing",
              "Communication de crise",
              "Publicite comparative",
            ],
            correctIndex: 1,
            explanation:
              "Les Piano Stairs = NUDGE marketing : inciter un comportement (prendre l'escalier) par le JEU plutot que par la contrainte. Un escalier de metro transforme en piano geant = les gens montent les marches par plaisir.",
            difficulty: "medium",
            tags: ["thematiques-2026", "la-rue", "campagne"],
          },
          {
            id: "q-lr3",
            question:
              "Grenoble a supprime ses panneaux publicitaires en :",
            options: ["2007", "2010", "2014", "2018"],
            correctIndex: 2,
            explanation:
              "Grenoble, en 2014, est devenue la premiere grande ville europeenne a supprimer ses panneaux publicitaires, remplaces par des arbres et des oeuvres d'art. Sao Paulo l'avait fait en 2007.",
            difficulty: "easy",
            tags: ["thematiques-2026", "la-rue", "villes-sans-pub"],
          },
          {
            id: "q-lr4",
            question:
              "La 'derive' situationniste de Debord consiste a :",
            options: [
              "Suivre un itineraire publicitaire",
              "Se perdre dans la ville pour echapper aux parcours imposes",
              "Filmer les publicites urbaines",
              "Creer des graffitis politiques",
            ],
            correctIndex: 1,
            explanation:
              "La derive (Debord, La Societe du spectacle, 1967) = se perdre dans la ville pour ECHAPPER aux parcours imposes par le capitalisme et le spectacle marchand. Acte de resistance.",
            difficulty: "hard",
            tags: ["thematiques-2026", "la-rue", "debord"],
          },
          {
            id: "q-lr5",
            question:
              "L'ambient marketing consiste a :",
            options: [
              "Creer des publicites televisees",
              "Detourner le mobilier urbain en support publicitaire",
              "Envoyer des newsletters",
              "Organiser des conferences de presse",
            ],
            correctIndex: 1,
            explanation:
              "Ambient marketing = DETOURNER le mobilier urbain (abribus, bancs, passages pietons) en support publicitaire. L'espace public devient un media creatif et surprenant.",
            difficulty: "easy",
            tags: ["thematiques-2026", "la-rue", "street-marketing"],
          },
          {
            id: "q-lr6",
            question:
              "Les campagnes Apple 'Shot on iPhone' sur les murs des villes sont un exemple de :",
            options: [
              "Communication interne",
              "UGC (User Generated Content) + affichage urbain",
              "Relations presse",
              "Sponsoring sportif",
            ],
            correctIndex: 1,
            explanation:
              "Apple affiche des photos prises par des UTILISATEURS (UGC) sur des murs en grand format. La rue devient galerie d'art + preuve sociale : les vrais utilisateurs sont les meilleurs ambassadeurs.",
            difficulty: "medium",
            tags: ["thematiques-2026", "la-rue", "campagne"],
          },
        ],
      },

      // --- Chapitre C : Trop, c'est trop ? ---
      {
        id: "trop-cest-trop-exces-communication",
        title: "Trop, c'est trop ? L'exces dans la communication",
        content: `L'exces est au coeur de la communication contemporaine : hyperbole publicitaire, saturation mediatique, surconsommation. Mais des contre-mouvements emergent.

L'EXCES DANS LA CULTURE :

RABELAIS (Gargantua, 1534) : l'exces comme force vitale. Gargantua est un geant qui mange, boit, rit sans mesure. L'exces rabelaisien est JOYEUX, libertaire, subversif — il renverse les normes. En communication : la demesure peut etre un outil creatif (pubs absurdes, humour decale).

MONTAIGNE (Essais, 1580) : prône la MESURE, le juste milieu, la moderation. "Rien de trop" (citation des Anciens). Pour Montaigne, l'exces est le signe d'un desequilibre. En communication : plaidoyer pour la sobriete, l'authenticite, la qualite plutot que la quantite.

F. Scott FITZGERALD (Gatsby le Magnifique, 1925) : l'exces comme FACADE. Les fetes somptueuses de Gatsby cachent un vide interieur. Le luxe ostentatoire est un simulacre. En communication : les marques qui surjouent le luxe/la reussite masquent parfois un manque de substance.

L'HYPERBOLE PUBLICITAIRE :

"Le meilleur cafe du monde", "L'unique", "Le n°1", "Rien n'est impossible" — la publicite vit d'HYPERBOLE. L'exageration est son moteur.
Pourquoi ? L'hyperbole capte l'ATTENTION dans un environnement sature. Elle cree un ecart entre le reel et le promis qui seduit et fait rever.
Limites : a force d'exces, tout se banalise (banner blindness). Le consommateur devient sceptique. La promesse hyperbolique non tenue genere de la DECEPTION et de la defiance.

SATURATION MEDIATIQUE :

Banner blindness : les internautes ne "voient" plus les bannieres publicitaires (etude : 86% des internautes ignorent les bannieres). L'exces de pub a cree un phenomene d'aveuglement selectif.
Scroll infini : les plateformes (TikTok, Instagram Reels) proposent un flux ILLIMITE de contenus. L'exces de stimulation cree une fatigue attentionnelle.
Notification overload : les notifications incessantes (mails, RS, apps) saturent l'attention et generent du stress.

SURCONSOMMATION :

Fast fashion : renouvellement ultra-rapide des collections (Shein, Zara = 52 "saisons"/an). Exces de production, exces de dechets textiles. Communication : marketing de l'urgence ("Stock limite", "Offre flash").
Black Friday : symbole de l'exces consumériste. Files d'attente, bousculades, achats compulsifs. Communication basee sur l'URGENCE et la RARETE artificielle.
Obsolescence programmee : les produits sont conçus pour durer moins longtemps → rachat force. Communication : "nouveau modele" annuel (Apple).

CONTRE-MOUVEMENTS :

Minimalisme : "less is more". Mouvement qui prone la reduction des possessions et de la consommation. En communication : design epure, messages simples, espaces blancs.

Decroissance : courant qui remet en cause la CROISSANCE comme objectif. Consommer moins, produire moins, vivre mieux. Communication : anti-pub, boycotts, slow life.

Slow communication : ralentir le rythme de publication, privilegier la QUALITE a la quantite. Ne pas publier 3 posts/jour mais 1 post/semaine de qualite. Marques qui reduisent leur presence RS volontairement.

CAMPAGNES A CONNAITRE :

- Patagonia "Don't Buy This Jacket" (2011) : pleine page dans le New York Times pour le Black Friday. PARADOXE : une marque qui dit de NE PAS acheter son produit. Message : consommez moins, reparez, reutilisez. Antithese magistrale.
- Lush supprime ses reseaux sociaux (2021) : la marque de cosmetiques quitte Instagram, Facebook, TikTok. Raison : les algorithmes sont toxiques pour la sante mentale. Acte radical de slow communication.
- Veja : marque de baskets qui refuse la publicite. Zero pub, zero influenceurs payes. Le produit parle de lui-meme. Anti-modele dans un secteur (sneakers) domine par le marketing de l'exces.

AUTEURS MOBILISABLES :
- RABELAIS : l'exces joyeux et subversif (Gargantua)
- MONTAIGNE : la mesure, le juste milieu (Essais)
- FITZGERALD : l'exces comme facade et simulacre (Gatsby)
- BAUDRILLARD (La Societe de consommation) : la surconsommation comme systeme de signes, l'objet-signe
- LIPOVETSKY (L'Ere du vide, Le Bonheur paradoxal) : l'hyperconsommation et le bonheur paradoxal — on consomme plus mais on n'est pas plus heureux
- Naomi KLEIN (No Logo, 1999) : critique du branding excessif, de la colonisation de l'espace public par les marques`,
        keyPoints: [
          "Rabelais : l'exces joyeux et subversif. Montaigne : la mesure et le juste milieu. Fitzgerald : l'exces comme facade",
          "Hyperbole publicitaire : moteur de la pub mais banalisation (banner blindness) et defiance",
          "Saturation : banner blindness, scroll infini, notification overload",
          "Surconsommation : fast fashion, Black Friday, obsolescence programmee",
          "Contre-mouvements : minimalisme, decroissance, slow communication",
          "Campagnes : Patagonia 'Don't Buy This Jacket', Lush quitte les RS, Veja zero pub",
          "Auteurs : Rabelais, Montaigne, Fitzgerald, Baudrillard, Lipovetsky, Klein",
        ],
        didYouKnow:
          "Patagonia a vendu PLUS de vestes apres sa campagne 'Don't Buy This Jacket' ! Le paradoxe : en disant 'n'achetez pas', la marque a renforce son image ethique et attire des consommateurs responsables qui lui font confiance.",
        flashcards: [
          {
            id: "f-tt1",
            front:
              "Comment Rabelais incarne-t-il l'exces dans Gargantua ?",
            back: "Gargantua (1534) est un geant qui mange, boit, rit SANS MESURE. L'exces rabelaisien est JOYEUX, libertaire et subversif — il renverse les normes. En communication : la demesure comme outil creatif (humour absurde, provocation).",
            difficulty: "medium",
            tags: ["thematiques-2026", "trop-cest-trop", "rabelais"],
          },
          {
            id: "f-tt2",
            front:
              "Quelle est la position de Montaigne sur l'exces ?",
            back: "Montaigne (Essais, 1580) prone la MESURE et le juste milieu : 'Rien de trop'. L'exces est signe de desequilibre. En communication : plaidoyer pour la SOBRIETE, l'authenticite, la qualite plutot que la quantite.",
            difficulty: "medium",
            tags: ["thematiques-2026", "trop-cest-trop", "montaigne"],
          },
          {
            id: "f-tt3",
            front:
              "Decrivez la campagne Patagonia 'Don't Buy This Jacket'.",
            back: "Pleine page dans le NYT pour le Black Friday 2011. PARADOXE : une marque dit de NE PAS acheter son produit. Message : consommez moins, reparez, reutilisez. Figure : ANTITHESE pub classique vs anti-pub. Resultat paradoxal : plus de ventes grâce a la confiance.",
            difficulty: "easy",
            tags: ["thematiques-2026", "trop-cest-trop", "campagne"],
          },
          {
            id: "f-tt4",
            front: "Qu'est-ce que le banner blindness ?",
            back: "L'AVEUGLEMENT selectif des internautes face aux bannieres publicitaires : 86% les ignorent. C'est le resultat de l'EXCES de publicite en ligne. A force de saturation, le cerveau filtre automatiquement les messages publicitaires.",
            difficulty: "easy",
            tags: ["thematiques-2026", "trop-cest-trop", "saturation"],
          },
          {
            id: "f-tt5",
            front:
              "Pourquoi Lush a-t-il quitte les reseaux sociaux en 2021 ?",
            back: "Lush (cosmetiques) a quitte Instagram, Facebook et TikTok en 2021, jugeant les ALGORITHMES toxiques pour la sante mentale des utilisateurs. C'est un acte radical de SLOW COMMUNICATION : la marque refuse de participer a l'economie de l'attention.",
            difficulty: "medium",
            tags: ["thematiques-2026", "trop-cest-trop", "campagne"],
          },
          {
            id: "f-tt6",
            front:
              "Comment Fitzgerald traite-t-il l'exces dans Gatsby le Magnifique ?",
            back: "Les fetes somptueuses de Gatsby sont une FACADE : le luxe ostentatoire cache un vide interieur. L'exces est un SIMULACRE. En communication : les marques qui surjouent le luxe/la reussite masquent parfois un manque de substance reelle.",
            difficulty: "hard",
            tags: ["thematiques-2026", "trop-cest-trop", "fitzgerald"],
          },
          {
            id: "f-tt7",
            front:
              "Comment Lipovetsky analyse-t-il la surconsommation ?",
            back: "Lipovetsky (Le Bonheur paradoxal) decrit l'HYPERCONSOMMATION : on consomme plus mais on n'est pas plus heureux. Bonheur paradoxal = la consommation promet le bonheur mais genere frustration et insatisfaction permanente.",
            difficulty: "hard",
            tags: ["thematiques-2026", "trop-cest-trop", "lipovetsky"],
          },
          {
            id: "f-tt8",
            front:
              "Qu'est-ce que la slow communication ?",
            back: "Mouvement qui prone le RALENTISSEMENT : publier moins mais mieux, privilegier la qualite a la quantite. Exemples : Lush quitte les RS, Veja fait zero pub. Oppose a l'injonction 'publier 3 posts/jour' des strategies social media classiques.",
            difficulty: "easy",
            tags: ["thematiques-2026", "trop-cest-trop", "slow-communication"],
          },
        ],
        quiz: [
          {
            id: "q-tt1",
            question:
              "Chez Rabelais, l'exces est :",
            options: [
              "Condamne comme un peche",
              "Joyeux, libertaire et subversif",
              "Signe de decadence",
              "Un sujet secondaire",
            ],
            correctIndex: 1,
            explanation:
              "L'exces rabelaisien (Gargantua, 1534) est JOYEUX et SUBVERSIF. Le geant mange et boit sans mesure, renversant les normes. C'est un exces VITAL, liberateur — tres different de la condamnation morale.",
            difficulty: "medium",
            tags: ["thematiques-2026", "trop-cest-trop", "rabelais"],
          },
          {
            id: "q-tt2",
            question:
              "La campagne Patagonia 'Don't Buy This Jacket' repose sur :",
            options: [
              "L'hyperbole",
              "La metaphore",
              "Le paradoxe / l'antithese",
              "L'anaphore",
            ],
            correctIndex: 2,
            explanation:
              "C'est un PARADOXE : une marque qui dit de NE PAS acheter. ANTITHESE : pub classique ('achetez !') vs anti-pub ('n'achetez pas !'). Ce renversement cree la surprise et renforce la credibilite ethique.",
            difficulty: "medium",
            tags: ["thematiques-2026", "trop-cest-trop", "campagne"],
          },
          {
            id: "q-tt3",
            question:
              "Le banner blindness est :",
            options: [
              "Une technique publicitaire innovante",
              "L'aveuglement selectif des internautes face aux bannieres pub",
              "Une loi limitant la publicite en ligne",
              "Un format publicitaire premium",
            ],
            correctIndex: 1,
            explanation:
              "Banner blindness = AVEUGLEMENT SELECTIF : 86% des internautes ignorent les bannieres pub. C'est le resultat de l'exces de publicite en ligne — le cerveau filtre automatiquement.",
            difficulty: "easy",
            tags: ["thematiques-2026", "trop-cest-trop", "saturation"],
          },
          {
            id: "q-tt4",
            question:
              "Naomi Klein (No Logo) critique principalement :",
            options: [
              "La slow communication",
              "Le branding excessif et la colonisation de l'espace par les marques",
              "Le minimalisme en design",
              "La publicite a la radio",
            ],
            correctIndex: 1,
            explanation:
              "Naomi Klein (No Logo, 1999) critique le BRANDING EXCESSIF : les marques colonisent l'espace public, les ecoles, les vetements. Tout devient support de marque. C'est un exces de communication commerciale.",
            difficulty: "medium",
            tags: ["thematiques-2026", "trop-cest-trop", "klein"],
          },
          {
            id: "q-tt5",
            question:
              "Veja se distingue dans le secteur des sneakers par :",
            options: [
              "Des collaborations avec des influenceurs",
              "Un budget publicite record",
              "Zero publicite et zero influenceurs payes",
              "Du placement de produit dans les series TV",
            ],
            correctIndex: 2,
            explanation:
              "Veja fait ZERO pub, ZERO influenceurs payes. Le produit parle de lui-meme. C'est un anti-modele dans un secteur (sneakers) domine par le marketing de l'exces (Nike, Adidas).",
            difficulty: "easy",
            tags: ["thematiques-2026", "trop-cest-trop", "campagne"],
          },
          {
            id: "q-tt6",
            question:
              "Pour Lipovetsky, l'hyperconsommation produit :",
            options: [
              "Un bonheur durable et croissant",
              "Un bonheur paradoxal : on consomme plus mais on n'est pas plus heureux",
              "Une satisfaction totale des desirs",
              "Une egalite sociale parfaite",
            ],
            correctIndex: 1,
            explanation:
              "Lipovetsky (Le Bonheur paradoxal) : l'HYPERconsommation promet le bonheur mais genere frustration et insatisfaction permanente. On consomme PLUS mais on n'est PAS plus heureux = bonheur paradoxal.",
            difficulty: "hard",
            tags: ["thematiques-2026", "trop-cest-trop", "lipovetsky"],
          },
        ],
      },
    ],
  },
];
