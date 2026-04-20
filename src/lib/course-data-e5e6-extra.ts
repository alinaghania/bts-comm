// E5/E6 Extra Modules - Plan/Budget, Droit, Fiches descriptives, Grille evaluation
// To be merged into course-data.ts later

import type { Module } from "./course-data";

export const E5E6_EXTRA_MODULES: Module[] = [
  // =========================================
  // MODULE 1: PLAN DE COMMUNICATION, BUDGET, PLANNING (E5)
  // =========================================
  {
    id: "plan-budget",
    title: "Plan de communication, budget, planning",
    exam: "e5",
    chapters: [
      {
        id: "plan-communication",
        title: "Construire un plan de communication",
        content: `Un plan de communication est le document strategique qui structure l'ensemble des actions de communication d'une organisation sur une periode donnee. Il traduit la strategie en actions concretes et mesurables.

Structure type d'un plan de communication :

1. OBJECTIFS : Que veut-on atteindre ? (notoriete, image, trafic, conversion...)
   - Objectifs cognitifs : faire connaitre
   - Objectifs affectifs : faire aimer
   - Objectifs conatifs : faire agir

2. CIBLES : A qui s'adresse-t-on ?
   - Cible principale (coeur de cible)
   - Cible secondaire (prescripteurs, influenceurs)
   - Cible tertiaire (parties prenantes)

3. MESSAGE : Que dit-on ?
   - Promesse : le benefice principal
   - Preuve : ce qui rend la promesse credible
   - Ton : le style de communication (institutionnel, decale, emotionnel...)

4. MOYENS : Quels canaux et supports ?
   - Media : TV, radio, presse, affichage, digital
   - Hors-media : RP, evenementiel, sponsoring, marketing direct, PLV

5. ACTIONS : Quelles operations concretes ?
   - Chaque action est detaillee avec son objectif specifique, sa cible, son budget, son calendrier

6. PLANNING : Quand ?
   - Retroplanning des actions
   - Saisonnalite, temps forts

7. BUDGET : Combien ?
   - Repartition par action et par poste de depenses

8. EVALUATION : Comment mesurer les resultats ?
   - KPIs definis en amont pour chaque objectif

Coherence strategie / plan operationnel :
Le plan operationnel doit etre la traduction fidele de la strategie. Chaque action doit pouvoir etre reliee a un objectif strategique. Si la strategie vise a rajeunir l'image de marque, toutes les actions doivent aller dans ce sens (choix des medias, ton, visuels...).

Exemples concrets :
- Lancement produit : teasing sur les reseaux sociaux (J-15), RP avec envoi de communiques (J-10), evenement de lancement (Jour J), campagne digitale (J+1 a J+30), bilan (J+45)
- Evenement : save the date (M-3), invitations (M-1), relances (S-1), couverture live (Jour J), retombees presse et reseaux (J+7)
- Campagne annuelle : decoupe en temps forts (rentree, fetes, soldes, ete), avec des actions specifiques pour chaque periode`,
        keyPoints: [
          "Un plan de communication suit 8 etapes : objectifs, cibles, message, moyens, actions, planning, budget, evaluation",
          "Les objectifs se declinent en cognitifs (connaitre), affectifs (aimer) et conatifs (agir)",
          "Le plan operationnel doit etre la traduction fidele de la strategie",
          "Chaque action doit etre reliee a un objectif strategique mesurable",
        ],
        flashcards: [
          {
            id: "plan-comm-fc1",
            front: "Quelles sont les 8 etapes d'un plan de communication ?",
            back: "Objectifs -> Cibles -> Message -> Moyens -> Actions -> Planning -> Budget -> Evaluation",
            difficulty: "medium",
            tags: ["plan-communication", "e5"],
          },
          {
            id: "plan-comm-fc2",
            front: "Quels sont les 3 types d'objectifs de communication ?",
            back: "Cognitifs (faire connaitre), affectifs (faire aimer), conatifs (faire agir) - modele AIDA simplifie",
            difficulty: "easy",
            tags: ["plan-communication", "objectifs", "e5"],
          },
          {
            id: "plan-comm-fc3",
            front: "Quelle est la difference entre cible principale et cible secondaire ?",
            back: "La cible principale (coeur de cible) est le destinataire direct du message. La cible secondaire regroupe les prescripteurs et influenceurs qui peuvent relayer le message.",
            difficulty: "medium",
            tags: ["plan-communication", "cibles", "e5"],
          },
          {
            id: "plan-comm-fc4",
            front: "Qu'est-ce que la coherence entre strategie et plan operationnel ?",
            back: "Chaque action du plan operationnel doit pouvoir etre reliee a un objectif strategique. Ex : si la strategie vise a rajeunir l'image, les actions doivent utiliser des canaux, tons et visuels adaptes a une cible jeune.",
            difficulty: "hard",
            tags: ["plan-communication", "strategie", "e5"],
          },
        ],
        quiz: [
          {
            id: "plan-comm-q1",
            question:
              "Dans un plan de communication, quel element vient juste apres la definition des objectifs ?",
            options: ["Le budget", "Les cibles", "Le planning", "Les moyens"],
            correctIndex: 1,
            explanation:
              "Apres avoir defini les objectifs (que veut-on atteindre ?), on identifie les cibles (a qui s'adresse-t-on ?), car le message et les moyens en decouleront.",
            difficulty: "easy",
            tags: ["plan-communication", "e5"],
          },
          {
            id: "plan-comm-q2",
            question:
              "Un objectif 'conatif' en communication vise a :",
            options: [
              "Faire connaitre la marque",
              "Ameliorer l'image de marque",
              "Faire agir le consommateur",
              "Fideliser les clients existants",
            ],
            correctIndex: 2,
            explanation:
              "Conatif = faire agir. Cognitif = faire connaitre. Affectif = faire aimer. L'objectif conatif vise a declencher un comportement (achat, inscription, visite...).",
            difficulty: "medium",
            tags: ["plan-communication", "objectifs", "e5"],
          },
          {
            id: "plan-comm-q3",
            question:
              "Lors d'un lancement produit, a quel moment realise-t-on generalement le bilan de la campagne ?",
            options: [
              "Le jour du lancement",
              "Une semaine avant le lancement",
              "Environ 45 jours apres le lancement",
              "6 mois apres le lancement",
            ],
            correctIndex: 2,
            explanation:
              "Le bilan se fait generalement 30 a 45 jours apres le lancement, le temps de collecter les donnees de retombees medias, ventes, trafic web, engagement social, etc.",
            difficulty: "medium",
            tags: ["plan-communication", "e5"],
          },
        ],
      },
      {
        id: "budget-previsionnel",
        title: "Budget previsionnel",
        content: `Le budget de communication est l'enveloppe financiere allouee a l'ensemble des actions de communication. Sa construction rigoureuse est essentielle pour optimiser les investissements.

Les grands postes de depenses :

1. CREATION :
   - Direction artistique (DA) : conception visuelle, maquettes, chartes
   - Redaction / copywriting : accroches, textes, scripts
   - Photographie : shooting, retouche, droits
   - Video : tournage, montage, post-production
   - Webdesign : maquettes, integration

2. PRODUCTION :
   - Impression : flyers, affiches, brochures, PLV (offset vs numerique selon quantites)
   - Tournage : equipe technique, location, figurants, materiel
   - Developpement web : site, landing page, application

3. ACHAT D'ESPACE :
   - TV : cout d'un spot 30s en prime time (plusieurs dizaines de milliers d'euros)
   - Presse : encart presse (varie selon diffusion et format)
   - Digital : Google Ads (CPC), Meta Ads (CPM/CPC), display, native ads
   - Affichage : 4x3, mobilier urbain, transport (JCDecaux, Clear Channel)
   - Radio : spots radio (moins cher que la TV, bonne repetition)

4. HONORAIRES AGENCE :
   - Commission : 15% historiquement sur les achats media (en baisse)
   - Forfait / fee : remuneration fixe mensuelle ou par projet
   - Success fee : remuneration liee aux resultats (rare)

Repartition media / hors-media :
- En France, la tendance est a l'augmentation de la part du digital (environ 55% des investissements publicitaires)
- Le hors-media (RP, evenementiel, marketing direct) represente une part importante mais moins mesuree

Methodes de fixation du budget :
1. Pourcentage du CA : generalement 3 a 10% selon le secteur (grande conso = 5-10%, B2B = 2-5%)
2. Alignement sur la concurrence : s'aligner sur les investissements des concurrents directs (part de voix)
3. Objectifs / moyens : definir les objectifs puis estimer le budget necessaire pour les atteindre (methode la plus rationnelle mais la plus complexe)`,
        keyPoints: [
          "Les 4 postes de depenses : creation, production, achat d'espace, honoraires agence",
          "L'achat d'espace media est generalement le poste le plus important",
          "Le digital represente environ 55% des investissements publicitaires en France",
          "3 methodes de fixation : % du CA, alignement concurrence, objectifs/moyens",
        ],
        flashcards: [
          {
            id: "budget-fc1",
            front: "Quels sont les 4 grands postes de depenses d'un budget de communication ?",
            back: "1) Creation (DA, redaction, photo) 2) Production (impression, tournage) 3) Achat d'espace (TV, presse, digital, affichage) 4) Honoraires agence (commission, forfait)",
            difficulty: "medium",
            tags: ["budget", "e5"],
          },
          {
            id: "budget-fc2",
            front: "Quelles sont les 3 methodes de fixation du budget de communication ?",
            back: "1) Pourcentage du CA (3 a 10% selon secteur) 2) Alignement sur la concurrence (part de voix) 3) Objectifs/moyens (la plus rationnelle : on definit les objectifs puis on estime le budget necessaire)",
            difficulty: "medium",
            tags: ["budget", "e5"],
          },
          {
            id: "budget-fc3",
            front: "Quelle est la difference entre la remuneration par commission et par forfait pour une agence ?",
            back: "Commission : pourcentage (historiquement 15%) preleve sur les achats media. Forfait (fee) : remuneration fixe mensuelle ou par projet, independante du volume d'achats media.",
            difficulty: "hard",
            tags: ["budget", "agence", "e5"],
          },
          {
            id: "budget-fc4",
            front: "Quel media represente la plus grande part des investissements publicitaires en France ?",
            back: "Le digital, avec environ 55% des investissements publicitaires. Il a depasse la TV et la presse grace a sa capacite de ciblage et de mesure.",
            difficulty: "easy",
            tags: ["budget", "media", "e5"],
          },
        ],
        quiz: [
          {
            id: "budget-q1",
            question:
              "Pour une entreprise de grande consommation, quel pourcentage du CA est generalement alloue a la communication ?",
            options: ["1 a 2%", "3 a 5%", "5 a 10%", "15 a 20%"],
            correctIndex: 2,
            explanation:
              "En grande consommation, le budget communication represente generalement 5 a 10% du CA, car la concurrence est forte et la notoriete est cle. En B2B, c'est plutot 2 a 5%.",
            difficulty: "medium",
            tags: ["budget", "e5"],
          },
          {
            id: "budget-q2",
            question:
              "La methode de fixation du budget la plus rationnelle est :",
            options: [
              "Le pourcentage du CA",
              "L'alignement sur la concurrence",
              "La methode objectifs/moyens",
              "Le budget historique",
            ],
            correctIndex: 2,
            explanation:
              "La methode objectifs/moyens est la plus rationnelle car elle part des objectifs a atteindre pour estimer le budget necessaire, plutot que d'appliquer un ratio arbitraire.",
            difficulty: "medium",
            tags: ["budget", "e5"],
          },
          {
            id: "budget-q3",
            question:
              "Quel poste de depenses distingue principalement le media du hors-media ?",
            options: [
              "La creation",
              "L'achat d'espace",
              "Les honoraires agence",
              "La production",
            ],
            correctIndex: 1,
            explanation:
              "L'achat d'espace (TV, presse, radio, affichage, digital) est la composante specifique aux medias. Le hors-media (RP, evenementiel, marketing direct) n'implique pas d'achat d'espace publicitaire.",
            difficulty: "easy",
            tags: ["budget", "e5"],
          },
        ],
      },
      {
        id: "retroplanning",
        title: "Retroplanning",
        content: `Le retroplanning est un outil de gestion de projet qui consiste a planifier les etapes en partant de la date de livraison/lancement et en remontant dans le temps. C'est l'outil indispensable du chef de projet en communication.

Comment construire un retroplanning :

1. Fixer la date de lancement / livraison (date butoir non negociable)
2. Lister toutes les etapes necessaires
3. Estimer la duree de chaque etape
4. Placer les etapes en remontant dans le temps
5. Identifier les dependances (quelles etapes doivent etre finies avant d'en commencer d'autres)
6. Ajouter des marges de securite

Les jalons cles d'un projet de communication :

- BRIEF CLIENT (J-60 a J-45) : reception du brief, reformulation, questionnement
- BRIEF CREATIF (J-45 a J-40) : traduction du brief client en brief creatif pour l'equipe
- PHASE DE CREATION (J-40 a J-25) : recherches, moodboards, maquettes, propositions creatives
- PRESENTATION CLIENT / VALIDATION (J-25 a J-20) : presentation des pistes, allers-retours, validation
- PRODUCTION (J-20 a J-10) : exe, impression, tournage, developpement, integration
- CONTROLE QUALITE (J-10 a J-7) : BAT (Bon A Tirer), relecture, tests
- LIVRAISON (J-7 a J-3) : livraison des supports, mise en ligne, installation
- LANCEMENT (Jour J) : diffusion, evenement, mise en service

Outil Gantt simplifie :
Le diagramme de Gantt represente visuellement les taches sur un axe temporel sous forme de barres horizontales. Chaque barre represente une tache avec sa date de debut et de fin. Les dependances sont representees par des fleches entre les barres. Aujourd'hui, on utilise des outils comme Trello, Asana, Monday, Notion, ou meme Excel/Google Sheets.

Marge de securite et gestion des imprevus :
- Toujours prevoir 10 a 20% de marge sur la duree totale
- Les imprevus les plus frequents : retard de validation client, modifications de derniere minute, problemes techniques, absence d'un membre de l'equipe
- Solution : identifier les taches critiques (celles qui ne peuvent pas etre decalees sans retarder tout le projet) et leur accorder plus de marge
- Avoir un "plan B" pour les etapes les plus risquees`,
        keyPoints: [
          "Le retroplanning part de la date de lancement et remonte dans le temps",
          "Les jalons cles vont du brief client (J-60) au lancement (Jour J)",
          "Le BAT (Bon A Tirer) est l'etape de validation finale avant production",
          "Toujours prevoir 10 a 20% de marge de securite sur la duree totale",
        ],
        flashcards: [
          {
            id: "retro-fc1",
            front: "Qu'est-ce qu'un retroplanning et comment le construit-on ?",
            back: "Un retroplanning est un planning construit a rebours : on part de la date de lancement (Jour J) et on remonte dans le temps pour placer chaque etape. Cela permet de fixer les deadlines intermediaires de facon realiste.",
            difficulty: "easy",
            tags: ["retroplanning", "e5"],
          },
          {
            id: "retro-fc2",
            front: "Que signifie BAT et a quelle etape du retroplanning se situe-t-il ?",
            back: "BAT = Bon A Tirer. C'est la validation finale avant lancement de la production (impression, mise en ligne...). Il se situe en phase de controle qualite, generalement entre J-10 et J-7 avant le lancement.",
            difficulty: "medium",
            tags: ["retroplanning", "production", "e5"],
          },
          {
            id: "retro-fc3",
            front: "Quelle marge de securite prevoir dans un retroplanning et pourquoi ?",
            back: "10 a 20% de marge sur la duree totale. Les imprevus frequents : retard de validation client, modifications de derniere minute, problemes techniques. Il faut identifier les taches critiques et leur accorder plus de marge.",
            difficulty: "medium",
            tags: ["retroplanning", "gestion-projet", "e5"],
          },
        ],
        quiz: [
          {
            id: "retro-q1",
            question:
              "Par quelle etape commence-t-on la construction d'un retroplanning ?",
            options: [
              "Par le brief client",
              "Par la phase de creation",
              "Par la date de lancement",
              "Par l'estimation du budget",
            ],
            correctIndex: 2,
            explanation:
              "Le retroplanning se construit a rebours : on fixe d'abord la date de lancement (Jour J), puis on remonte dans le temps pour placer chaque etape.",
            difficulty: "easy",
            tags: ["retroplanning", "e5"],
          },
          {
            id: "retro-q2",
            question:
              "Qu'est-ce qu'une tache critique dans un retroplanning ?",
            options: [
              "Une tache tres couteuse",
              "Une tache qui ne peut pas etre decalee sans retarder tout le projet",
              "Une tache confiee au directeur de creation",
              "Une tache qui necessite une validation client",
            ],
            correctIndex: 1,
            explanation:
              "Une tache critique est une tache dont le retard entraine automatiquement un retard du projet entier. Elle se situe sur le 'chemin critique' du projet.",
            difficulty: "medium",
            tags: ["retroplanning", "gestion-projet", "e5"],
          },
          {
            id: "retro-q3",
            question:
              "Quel outil visuel represente les taches sous forme de barres horizontales sur un axe temporel ?",
            options: [
              "Le mind map",
              "Le SWOT",
              "Le diagramme de Gantt",
              "Le PERT",
            ],
            correctIndex: 2,
            explanation:
              "Le diagramme de Gantt represente chaque tache sous forme de barre horizontale sur un axe temporel, avec les dependances entre taches. Outils : Trello, Asana, Monday, Notion, Excel.",
            difficulty: "easy",
            tags: ["retroplanning", "outils", "e5"],
          },
        ],
      },
      {
        id: "kpis-indicateurs",
        title: "KPIs et indicateurs de mesure",
        content: `Les KPIs (Key Performance Indicators) sont les indicateurs cles de performance qui permettent de mesurer l'efficacite des actions de communication. Ils doivent etre definis AVANT le lancement de la campagne.

Indicateurs quantitatifs :

- REACH (portee) : nombre de personnes uniques touchees par le message
- IMPRESSIONS : nombre total d'affichages du message (une personne peut le voir plusieurs fois)
- GRP (Gross Rating Point) : indicateur de pression publicitaire = couverture (%) x repetition moyenne. Un GRP de 300 signifie par exemple 75% de la cible touchee 4 fois en moyenne.
- CPM (Cout Pour Mille) : cout pour 1000 impressions. Permet de comparer l'efficacite de differents supports.
- CTR (Click-Through Rate) : taux de clic = (nombre de clics / nombre d'impressions) x 100. Un bon CTR en display est autour de 0,1 a 0,3%.
- TAUX DE CONVERSION : pourcentage de personnes ayant realise l'action souhaitee (achat, inscription, telechargement) parmi celles exposees au message.
- ROI (Return On Investment) : retour sur investissement = (gains generes - cout de la campagne) / cout de la campagne x 100. Un ROI de 200% signifie que chaque euro investi a rapporte 2 euros.

Indicateurs qualitatifs :

- NOTORIETE ASSISTEE : pourcentage de personnes qui reconnaissent la marque quand on leur cite ("Connaissez-vous la marque X ?")
- NOTORIETE SPONTANEE : pourcentage de personnes qui citent la marque spontanement ("Quelles marques de [categorie] connaissez-vous ?")
- TOP OF MIND : premiere marque citee spontanement
- IMAGE PERCUE : attributs associes a la marque (moderne, fiable, premium...) mesures par sondage
- SATISFACTION : enquetes de satisfaction, NPS (Net Promoter Score), avis clients

Bilan post-campagne :

Methodologie :
1. Collecter les donnees quantitatives (analytics, rapports media)
2. Collecter les donnees qualitatives (sondages, retours clients)
3. Comparer aux objectifs initiaux (ecarts positifs et negatifs)
4. Analyser les facteurs de succes et les axes d'amelioration
5. Formuler des recommandations pour les prochaines campagnes

Reporting client :
- Document synthetique (10-15 slides max)
- Rappel des objectifs et du dispositif
- Resultats chiffres vs objectifs
- Enseignements cles
- Recommandations`,
        keyPoints: [
          "Les KPIs doivent etre definis AVANT le lancement de la campagne",
          "GRP = couverture x repetition moyenne (indicateur de pression publicitaire)",
          "ROI = (gains - couts) / couts x 100",
          "Le bilan post-campagne compare les resultats aux objectifs initiaux et formule des recommandations",
        ],
        flashcards: [
          {
            id: "kpi-fc1",
            front: "Quelle est la difference entre reach et impressions ?",
            back: "Le reach (portee) = nombre de personnes UNIQUES touchees. Les impressions = nombre TOTAL d'affichages (une personne peut voir le message plusieurs fois). Exemple : 1000 de reach et 3000 impressions = en moyenne, chaque personne a vu le message 3 fois.",
            difficulty: "medium",
            tags: ["kpi", "digital", "e5"],
          },
          {
            id: "kpi-fc2",
            front: "Comment calcule-t-on le GRP et que mesure-t-il ?",
            back: "GRP (Gross Rating Point) = couverture (%) x repetition moyenne. Il mesure la pression publicitaire. Ex : 75% de la cible touchee en moyenne 4 fois = 300 GRP.",
            difficulty: "hard",
            tags: ["kpi", "media", "e5"],
          },
          {
            id: "kpi-fc3",
            front: "Quelle est la difference entre notoriete assistee et notoriete spontanee ?",
            back: "Assistee : on cite la marque et on demande si elle est connue ('Connaissez-vous X ?'). Spontanee : on demande quelles marques sont connues dans une categorie sans les citer. Le 'top of mind' est la premiere marque citee spontanement.",
            difficulty: "medium",
            tags: ["kpi", "notoriete", "e5"],
          },
          {
            id: "kpi-fc4",
            front: "Comment calcule-t-on le ROI d'une campagne de communication ?",
            back: "ROI = (gains generes - cout de la campagne) / cout de la campagne x 100. Un ROI de 200% signifie que chaque euro investi a rapporte 2 euros de benefice net.",
            difficulty: "medium",
            tags: ["kpi", "roi", "e5"],
          },
        ],
        quiz: [
          {
            id: "kpi-q1",
            question:
              "Un GRP de 400 peut correspondre a :",
            options: [
              "100% de la cible touchee 4 fois en moyenne",
              "40% de la cible touchee 100 fois",
              "400 personnes touchees une fois",
              "Un budget de 400 000 euros",
            ],
            correctIndex: 0,
            explanation:
              "GRP = couverture x repetition. 400 GRP = par exemple 100% x 4, ou 80% x 5, ou 50% x 8. C'est un indicateur de pression publicitaire, pas de budget ni de nombre de personnes.",
            difficulty: "hard",
            tags: ["kpi", "grp", "e5"],
          },
          {
            id: "kpi-q2",
            question:
              "Quel KPI mesure le cout pour toucher 1000 personnes ?",
            options: ["Le GRP", "Le CTR", "Le CPM", "Le ROI"],
            correctIndex: 2,
            explanation:
              "Le CPM (Cout Pour Mille) mesure le cout pour 1000 impressions. Il permet de comparer l'efficacite economique de differents supports publicitaires.",
            difficulty: "easy",
            tags: ["kpi", "cpm", "e5"],
          },
          {
            id: "kpi-q3",
            question:
              "Dans un bilan post-campagne, quelle etape vient apres la collecte des donnees ?",
            options: [
              "Lancer une nouvelle campagne",
              "Comparer les resultats aux objectifs initiaux",
              "Augmenter le budget",
              "Changer d'agence",
            ],
            correctIndex: 1,
            explanation:
              "Apres la collecte des donnees (quantitatives et qualitatives), on compare aux objectifs initiaux pour mesurer les ecarts, puis on analyse les facteurs de succes et on formule des recommandations.",
            difficulty: "easy",
            tags: ["kpi", "bilan", "e5"],
          },
        ],
      },
    ],
  },

  // =========================================
  // MODULE 2: DROIT DE LA COMMUNICATION (E5)
  // =========================================
  {
    id: "droit-communication",
    title: "Droit de la communication",
    exam: "e5",
    chapters: [
      {
        id: "rgpd",
        title: "RGPD",
        content: `Le RGPD (Reglement General sur la Protection des Donnees) est un reglement europeen entre en vigueur le 25 mai 2018. Il encadre le traitement des donnees personnelles sur le territoire de l'Union europeenne.

Les 7 principes fondamentaux du RGPD :

1. LICEITE, LOYAUTE, TRANSPARENCE : les donnees doivent etre traitees de maniere licite (base legale), loyale (pas de collecte cachee) et transparente (information claire de la personne).

2. LIMITATION DES FINALITES : les donnees sont collectees pour des finalites determinees, explicites et legitimes. On ne peut pas les reutiliser pour un autre objectif sans consentement.

3. MINIMISATION DES DONNEES : ne collecter que les donnees strictement necessaires a la finalite poursuivie. Ex : pas besoin de la date de naissance pour envoyer une newsletter.

4. EXACTITUDE : les donnees doivent etre exactes et tenues a jour. Les donnees inexactes doivent etre rectifiees ou supprimees.

5. LIMITATION DE CONSERVATION : les donnees ne peuvent etre conservees au-dela de la duree necessaire a la finalite. Ex : donnees de prospection = 3 ans sans activite.

6. INTEGRITE ET CONFIDENTIALITE : les donnees doivent etre protegees contre le traitement non autorise, la perte ou la destruction (mesures techniques et organisationnelles).

7. RESPONSABILITE (accountability) : le responsable du traitement doit etre en mesure de demontrer qu'il respecte le RGPD (registre des traitements, analyses d'impact...).

Droits des personnes :

- ACCES : toute personne peut demander a savoir si ses donnees sont traitees et obtenir une copie
- RECTIFICATION : droit de faire corriger des donnees inexactes
- EFFACEMENT ("droit a l'oubli") : droit de faire supprimer ses donnees dans certains cas
- PORTABILITE : droit de recevoir ses donnees dans un format structure et de les transmettre a un autre responsable
- OPPOSITION : droit de s'opposer au traitement de ses donnees (notamment pour la prospection commerciale)
- LIMITATION DU TRAITEMENT : droit de demander le gel temporaire du traitement de ses donnees

DPO (Data Protection Officer) :
Le DPO est le delegue a la protection des donnees. Il est obligatoire pour les organismes publics et les entreprises traitant des donnees a grande echelle. Son role : informer, conseiller, controler la conformite, cooperer avec la CNIL.

Sanctions :
Les sanctions peuvent atteindre 20 millions d'euros ou 4% du chiffre d'affaires annuel mondial (le montant le plus eleve des deux etant retenu).

Consentement :
Le consentement doit etre libre, specifique, eclaire et univoque. Le opt-in (action positive de la personne) est requis pour la prospection par email (sauf B2B avec interet legitime). Le opt-out (cases pre-cochees, consentement presume) est interdit. Les cases pre-cochees sont interdites depuis le RGPD.`,
        keyPoints: [
          "Le RGPD repose sur 7 principes : liceite, limitation des finalites, minimisation, exactitude, limitation de conservation, integrite, responsabilite",
          "6 droits des personnes : acces, rectification, effacement, portabilite, opposition, limitation",
          "Sanctions : jusqu'a 20M euros ou 4% du CA mondial (le plus eleve)",
          "Le consentement doit etre opt-in (action positive), les cases pre-cochees sont interdites",
        ],
        flashcards: [
          {
            id: "rgpd-fc1",
            front: "Quels sont les 7 principes fondamentaux du RGPD ?",
            back: "1) Liceite/loyaute/transparence 2) Limitation des finalites 3) Minimisation des donnees 4) Exactitude 5) Limitation de conservation 6) Integrite/confidentialite 7) Responsabilite (accountability)",
            difficulty: "hard",
            tags: ["rgpd", "droit", "e5"],
          },
          {
            id: "rgpd-fc2",
            front: "Quelle est la sanction maximale prevue par le RGPD ?",
            back: "20 millions d'euros ou 4% du chiffre d'affaires annuel mondial, le montant le plus eleve des deux etant retenu.",
            difficulty: "medium",
            tags: ["rgpd", "sanctions", "e5"],
          },
          {
            id: "rgpd-fc3",
            front: "Qu'est-ce que le droit a la portabilite des donnees ?",
            back: "Le droit de recevoir ses donnees personnelles dans un format structure, couramment utilise et lisible par machine, et de les transmettre a un autre responsable de traitement sans que le premier puisse s'y opposer.",
            difficulty: "hard",
            tags: ["rgpd", "droits", "e5"],
          },
          {
            id: "rgpd-fc4",
            front: "Quelle est la difference entre opt-in et opt-out ?",
            back: "Opt-in : la personne doit effectuer une action positive pour donner son consentement (cocher une case). Opt-out : le consentement est presume, la personne doit agir pour s'y opposer (decocher). Le RGPD impose le opt-in ; les cases pre-cochees (opt-out) sont interdites.",
            difficulty: "medium",
            tags: ["rgpd", "consentement", "e5"],
          },
          {
            id: "rgpd-fc5",
            front: "Quel est le role du DPO (Data Protection Officer) ?",
            back: "Le DPO est le delegue a la protection des donnees. Il informe et conseille l'organisme, controle la conformite au RGPD, coopere avec la CNIL. Il est obligatoire pour les organismes publics et les entreprises traitant des donnees a grande echelle.",
            difficulty: "medium",
            tags: ["rgpd", "dpo", "e5"],
          },
        ],
        quiz: [
          {
            id: "rgpd-q1",
            question:
              "Depuis quand le RGPD est-il en vigueur ?",
            options: [
              "1er janvier 2016",
              "25 mai 2018",
              "1er janvier 2020",
              "25 mai 2020",
            ],
            correctIndex: 1,
            explanation:
              "Le RGPD est entre en application le 25 mai 2018, apres une periode de transition de 2 ans depuis son adoption en avril 2016.",
            difficulty: "easy",
            tags: ["rgpd", "e5"],
          },
          {
            id: "rgpd-q2",
            question:
              "Le principe de 'minimisation des donnees' signifie :",
            options: [
              "Reduire la taille des fichiers de donnees",
              "Ne collecter que les donnees strictement necessaires a la finalite",
              "Anonymiser toutes les donnees collectees",
              "Limiter le nombre d'employes ayant acces aux donnees",
            ],
            correctIndex: 1,
            explanation:
              "La minimisation des donnees impose de ne collecter que les donnees strictement necessaires a la finalite poursuivie. Ex : pas besoin de la date de naissance pour une newsletter.",
            difficulty: "medium",
            tags: ["rgpd", "principes", "e5"],
          },
          {
            id: "rgpd-q3",
            question:
              "Dans quel cas le DPO est-il obligatoire ?",
            options: [
              "Pour toutes les entreprises",
              "Uniquement pour les entreprises de plus de 250 salaries",
              "Pour les organismes publics et les entreprises traitant des donnees a grande echelle",
              "Uniquement pour les entreprises du secteur digital",
            ],
            correctIndex: 2,
            explanation:
              "Le DPO est obligatoire pour les organismes publics, les entreprises dont l'activite de base implique un suivi systematique a grande echelle, ou le traitement a grande echelle de donnees sensibles.",
            difficulty: "medium",
            tags: ["rgpd", "dpo", "e5"],
          },
          {
            id: "rgpd-q4",
            question:
              "Une case pre-cochee pour le consentement est :",
            options: [
              "Autorisee si clairement visible",
              "Autorisee en B2B uniquement",
              "Interdite par le RGPD",
              "Autorisee avec mention legale",
            ],
            correctIndex: 2,
            explanation:
              "Le RGPD interdit les cases pre-cochees car le consentement doit resulter d'une action positive et univoque de la personne (opt-in). Une case pre-cochee est considere comme du opt-out.",
            difficulty: "easy",
            tags: ["rgpd", "consentement", "e5"],
          },
        ],
      },
      {
        id: "droit-image",
        title: "Droit a l'image",
        content: `Le droit a l'image est un droit fondamental qui permet a toute personne de s'opposer a la captation et a la diffusion de son image sans son consentement. Il est lie au droit au respect de la vie privee (article 9 du Code civil).

Principes :
- Toute personne a un droit exclusif sur son image
- Toute reproduction ou diffusion de l'image d'une personne necessite son autorisation prealable
- Ce droit s'applique independamment du lieu (public ou prive) et du support (papier, web, video...)

L'autorisation :
- ECRITE obligatoirement (une autorisation orale n'a pas de valeur juridique suffisante)
- Doit preciser : le CONTEXTE (campagne pub, article de presse, site web...), la DUREE d'utilisation, le ou les SUPPORTS concernes, le TERRITOIRE geographique
- Une autorisation pour un magazine ne vaut pas pour un site web
- L'autorisation est revocable a tout moment (mais peut donner lieu a des dommages-interets si contrat)

Cas particuliers :

- LIEU PUBLIC : le droit a l'information peut primer sur le droit a l'image si la personne n'est pas individualisee (photo de foule). Mais si une personne est clairement identifiable et constitue le sujet principal de la photo, son autorisation est necessaire.

- MINEURS : l'autorisation des DEUX parents (ou du representant legal) est obligatoire. L'autorisation du mineur lui-meme est aussi requise s'il est en age de discernement.

- PERSONNAGES PUBLICS : leur image peut etre utilisee dans le cadre de leur fonction publique (homme politique en exercice, artiste en spectacle) mais PAS dans un cadre commercial sans autorisation, ni dans le cadre de leur vie privee.

Sanctions :
Article 226-1 du Code penal : le fait de porter atteinte a l'intimite de la vie privee d'autrui en fixant, enregistrant ou transmettant l'image d'une personne se trouvant dans un lieu prive sans son consentement est puni d'1 an d'emprisonnement et 45 000 euros d'amende.`,
        keyPoints: [
          "L'autorisation doit etre ecrite et preciser le contexte, la duree, le support et le territoire",
          "Pour les mineurs : autorisation des deux parents obligatoire",
          "Les personnages publics : image libre dans leur fonction, mais pas en usage commercial ou vie privee",
          "Sanctions : 1 an de prison et 45 000 euros d'amende (art. 226-1 Code penal)",
        ],
        flashcards: [
          {
            id: "image-fc1",
            front: "Que doit preciser une autorisation de droit a l'image ?",
            back: "Elle doit etre ECRITE et preciser : 1) Le contexte (campagne pub, site web...) 2) La duree d'utilisation 3) Le(s) support(s) concerne(s) 4) Le territoire geographique. Une autorisation pour un support ne vaut pas pour un autre.",
            difficulty: "medium",
            tags: ["droit-image", "e5"],
          },
          {
            id: "image-fc2",
            front: "Quelles sont les regles du droit a l'image pour les mineurs ?",
            back: "L'autorisation des DEUX parents (ou representant legal) est obligatoire. Si le mineur est en age de discernement, son autorisation est egalement requise.",
            difficulty: "medium",
            tags: ["droit-image", "mineurs", "e5"],
          },
          {
            id: "image-fc3",
            front: "Un photographe prend une photo d'une foule dans un lieu public. A-t-il besoin d'autorisations ?",
            back: "Non, si aucune personne n'est individualisee ou clairement identifiable comme sujet principal de la photo. Le droit a l'information prime. Mais si une personne est clairement identifiable et constitue le sujet principal, son autorisation est necessaire.",
            difficulty: "hard",
            tags: ["droit-image", "lieu-public", "e5"],
          },
          {
            id: "image-fc4",
            front: "Quelles sanctions encourt-on pour atteinte au droit a l'image ?",
            back: "Article 226-1 du Code penal : 1 an d'emprisonnement et 45 000 euros d'amende pour captation/diffusion de l'image d'une personne sans son consentement.",
            difficulty: "easy",
            tags: ["droit-image", "sanctions", "e5"],
          },
        ],
        quiz: [
          {
            id: "image-q1",
            question:
              "Pour utiliser l'image d'un mineur dans une campagne publicitaire, il faut :",
            options: [
              "L'autorisation d'un seul parent",
              "L'autorisation des deux parents",
              "Uniquement l'autorisation du mineur",
              "Aucune autorisation si c'est dans un lieu public",
            ],
            correctIndex: 1,
            explanation:
              "L'autorisation des DEUX parents (ou du representant legal) est obligatoire pour l'utilisation de l'image d'un mineur, quel que soit le contexte.",
            difficulty: "easy",
            tags: ["droit-image", "mineurs", "e5"],
          },
          {
            id: "image-q2",
            question:
              "Une autorisation de droit a l'image est valable :",
            options: [
              "A vie, une fois signee",
              "Uniquement pour le contexte, la duree et le support precises",
              "Pour tous les supports du meme annonceur",
              "5 ans a compter de la signature",
            ],
            correctIndex: 1,
            explanation:
              "L'autorisation est strictement limitee au contexte, a la duree, au support et au territoire precises dans le document. Une autorisation pour un magazine ne vaut pas pour un site web.",
            difficulty: "medium",
            tags: ["droit-image", "e5"],
          },
          {
            id: "image-q3",
            question:
              "L'image d'un homme politique peut etre utilisee sans autorisation :",
            options: [
              "Dans n'importe quel contexte",
              "Dans le cadre de sa vie privee",
              "Dans le cadre de sa fonction publique (information)",
              "Dans une campagne publicitaire commerciale",
            ],
            correctIndex: 2,
            explanation:
              "L'image d'un personnage public peut etre utilisee dans le cadre de sa fonction publique (droit a l'information), mais PAS dans un cadre commercial ni dans sa vie privee sans autorisation.",
            difficulty: "medium",
            tags: ["droit-image", "personnages-publics", "e5"],
          },
        ],
      },
      {
        id: "propriete-intellectuelle",
        title: "Propriete intellectuelle",
        content: `La propriete intellectuelle regroupe le droit d'auteur et la propriete industrielle (marques, brevets, dessins et modeles). En communication, ce sont des notions essentielles pour proteger les creations et eviter la contrefacon.

Droit d'auteur :

- AUTOMATIQUE des la creation de l'oeuvre, sans besoin de depot ni de formalite
- Condition : l'oeuvre doit etre originale (empreinte de la personnalite de l'auteur)
- Couvre : textes, photos, illustrations, musiques, videos, logiciels, sites web...

Deux composantes :
1. DROIT MORAL : inalienable (ne peut pas etre cede), perpetuel (ne s'eteint jamais), imprescriptible. Comprend : droit de paternite (etre cite comme auteur), droit au respect de l'oeuvre (pas de modification sans accord), droit de divulgation, droit de retrait.
2. DROIT PATRIMONIAL : cessible (peut etre vendu/cede), dure 70 ans apres la mort de l'auteur (post-mortem). Comprend : droit de reproduction, droit de representation, droit de suite (oeuvres d'art).

Marques :

- Depot aupres de l'INPI (Institut National de la Propriete Industrielle)
- Classification de Nice : 45 classes de produits et services (ex : classe 25 = vetements, classe 35 = publicite)
- Protection pour 10 ans, renouvelable indefiniment
- La marque doit etre distinctive, licite, disponible
- Types : nominative, figurative, semi-figurative, sonore, 3D

Contrefacon :
- Reproduction ou imitation non autorisee d'une oeuvre protegee, d'une marque, d'un brevet
- Sanctions penales : jusqu'a 3 ans d'emprisonnement et 300 000 euros d'amende
- Sanctions civiles : dommages-interets, saisie des contrefacons

Creative Commons :
Les licences Creative Commons permettent aux auteurs de partager leurs oeuvres en definissant les conditions d'utilisation. 6 licences basees sur 4 conditions :
- BY (Attribution) : citer l'auteur
- SA (Share Alike / Partage identique) : partager sous la meme licence
- ND (No Derivatives / Pas de modification)
- NC (Non Commercial / Pas d'utilisation commerciale)

Les 6 combinaisons : CC BY, CC BY-SA, CC BY-ND, CC BY-NC, CC BY-NC-SA, CC BY-NC-ND
La plus permissive : CC BY. La plus restrictive : CC BY-NC-ND.`,
        keyPoints: [
          "Le droit d'auteur est automatique des la creation, pas besoin de depot",
          "Droit moral = inalienable et perpetuel / Droit patrimonial = cessible et 70 ans post-mortem",
          "Marques : depot INPI, 45 classes de Nice, protection 10 ans renouvelable",
          "Contrefacon : jusqu'a 3 ans de prison et 300 000 euros d'amende",
        ],
        flashcards: [
          {
            id: "pi-fc1",
            front: "Quelle est la difference entre droit moral et droit patrimonial en droit d'auteur ?",
            back: "Droit moral : inalienable, perpetuel, imprescriptible (droit de paternite, respect de l'oeuvre). Droit patrimonial : cessible, dure 70 ans post-mortem (droit de reproduction, representation).",
            difficulty: "hard",
            tags: ["propriete-intellectuelle", "droit-auteur", "e5"],
          },
          {
            id: "pi-fc2",
            front: "Comment protege-t-on une marque en France ?",
            back: "Par un depot aupres de l'INPI (Institut National de la Propriete Industrielle), en choisissant les classes de Nice (45 classes). Protection pour 10 ans, renouvelable indefiniment. La marque doit etre distinctive, licite et disponible.",
            difficulty: "medium",
            tags: ["propriete-intellectuelle", "marques", "e5"],
          },
          {
            id: "pi-fc3",
            front: "Quelles sont les 6 licences Creative Commons ?",
            back: "CC BY, CC BY-SA, CC BY-ND, CC BY-NC, CC BY-NC-SA, CC BY-NC-ND. Basees sur 4 conditions : BY (attribution), SA (partage identique), ND (pas de modification), NC (pas d'usage commercial). La plus permissive : CC BY. La plus restrictive : CC BY-NC-ND.",
            difficulty: "hard",
            tags: ["propriete-intellectuelle", "creative-commons", "e5"],
          },
          {
            id: "pi-fc4",
            front: "Faut-il deposer une oeuvre pour beneficier du droit d'auteur ?",
            back: "Non. Le droit d'auteur est AUTOMATIQUE des la creation de l'oeuvre, sans aucune formalite de depot. La seule condition est que l'oeuvre soit originale (empreinte de la personnalite de l'auteur).",
            difficulty: "easy",
            tags: ["propriete-intellectuelle", "droit-auteur", "e5"],
          },
        ],
        quiz: [
          {
            id: "pi-q1",
            question:
              "Le droit patrimonial d'un auteur dure :",
            options: [
              "Toute la vie de l'auteur",
              "50 ans apres la mort de l'auteur",
              "70 ans apres la mort de l'auteur",
              "Il est perpetuel",
            ],
            correctIndex: 2,
            explanation:
              "Le droit patrimonial dure 70 ans apres la mort de l'auteur (post-mortem). Apres cette periode, l'oeuvre tombe dans le domaine public. Le droit moral, lui, est perpetuel.",
            difficulty: "medium",
            tags: ["propriete-intellectuelle", "droit-auteur", "e5"],
          },
          {
            id: "pi-q2",
            question:
              "La protection d'une marque deposee a l'INPI dure :",
            options: [
              "5 ans renouvelable",
              "10 ans renouvelable",
              "20 ans non renouvelable",
              "70 ans",
            ],
            correctIndex: 1,
            explanation:
              "La protection d'une marque deposee a l'INPI dure 10 ans a compter de la date de depot, renouvelable indefiniment par periodes de 10 ans.",
            difficulty: "easy",
            tags: ["propriete-intellectuelle", "marques", "e5"],
          },
          {
            id: "pi-q3",
            question:
              "Quelle licence Creative Commons permet la modification mais pas l'usage commercial ?",
            options: [
              "CC BY-ND",
              "CC BY-NC",
              "CC BY-SA",
              "CC BY-NC-ND",
            ],
            correctIndex: 1,
            explanation:
              "CC BY-NC (Attribution - Non Commercial) permet la modification et le partage, a condition de citer l'auteur et de ne pas en faire un usage commercial. CC BY-ND interdit la modification. CC BY-NC-ND interdit les deux.",
            difficulty: "hard",
            tags: ["propriete-intellectuelle", "creative-commons", "e5"],
          },
        ],
      },
      {
        id: "publicite-reglementee",
        title: "Publicite reglementee",
        content: `Certains secteurs font l'objet d'une reglementation stricte en matiere de publicite. En tant que professionnel de la communication, il est indispensable de connaitre ces regles pour eviter les sanctions.

Alcool - Loi Evin (10 janvier 1991) :

- INTERDICTION de la publicite a la TV et au cinema
- INTERDICTION d'associer l'alcool au sport, a la jeunesse, a la conduite automobile
- MENTIONS OBLIGATOIRES : "L'abus d'alcool est dangereux pour la sante. A consommer avec moderation."
- Supports autorises : presse ecrite (sauf publications jeunesse), affichage, radio (tranches horaires specifiques), internet (avec bandeau de prevention)
- Le message doit se limiter aux caracteristiques objectives du produit (origine, composition, mode de fabrication)
- Depuis 2016 : la loi Evin a ete assouplie pour distinguer publicite et information oenologique

Tabac - Interdiction totale :

- La loi Evin interdit TOUTE publicite directe ou indirecte en faveur du tabac
- Cela inclut : le parrainage, le mecenat, les evenements, les produits derives
- Paquet neutre obligatoire depuis 2017
- Interdiction de fumer dans les lieux publics fermes

Sante :

- Publicite pour les medicaments : tres encadree, soumise a autorisation de l'ANSM
- Mentions obligatoires pour les produits alimentaires : "Pour votre sante, mangez au moins 5 fruits et legumes par jour", "Manger Bouger", etc.
- Publicite pour les complements alimentaires : ne doit pas revendiquer de proprietes therapeutiques
- Publicite pour les dispositifs medicaux : mentions obligatoires

Publicite comparative :

La publicite comparative est autorisee en France depuis 1992, mais sous conditions strictes :
- OBJECTIVE : comparaison portant sur des caracteristiques essentielles, pertinentes, verifiables
- LOYALE : pas de denigrement du concurrent
- VERIFIABLE : le consommateur doit pouvoir verifier les elements compares
- NON TROMPEUSE : pas de confusion possible entre l'annonceur et le concurrent
- Ne doit pas tirer indument profit de la notoriete du concurrent

Publicite mensongere / pratiques commerciales trompeuses :

- Interdite par le Code de la consommation (articles L121-1 et suivants)
- Definition : publicite comportant des allegations, indications ou presentations fausses ou de nature a induire en erreur
- Sanctions penales : 2 ans d'emprisonnement et 300 000 euros d'amende (pouvant etre porte a 50% des depenses de publicite)
- Le juge peut aussi ordonner la publication du jugement et une campagne corrective`,
        keyPoints: [
          "Loi Evin (1991) : pas de pub TV/cinema pour l'alcool, mentions obligatoires, pas d'association sport/jeunesse",
          "Tabac : interdiction TOTALE de toute publicite directe ou indirecte",
          "Publicite comparative : autorisee si objective, loyale, verifiable et non trompeuse",
          "Publicite mensongere : 2 ans de prison et 300 000 euros d'amende",
        ],
        flashcards: [
          {
            id: "pub-fc1",
            front: "Que prevoit la loi Evin pour la publicite de l'alcool ?",
            back: "Interdiction de la pub TV et cinema. Interdiction d'associer alcool au sport/jeunesse/conduite. Mentions obligatoires ('A consommer avec moderation'). Le message doit se limiter aux caracteristiques objectives du produit.",
            difficulty: "medium",
            tags: ["publicite-reglementee", "loi-evin", "e5"],
          },
          {
            id: "pub-fc2",
            front: "Quelles sont les conditions pour qu'une publicite comparative soit legale ?",
            back: "Elle doit etre : 1) Objective (caracteristiques essentielles et pertinentes) 2) Verifiable (le consommateur peut verifier) 3) Loyale (pas de denigrement) 4) Non trompeuse (pas de confusion possible). Elle ne doit pas tirer profit de la notoriete du concurrent.",
            difficulty: "hard",
            tags: ["publicite-reglementee", "comparative", "e5"],
          },
          {
            id: "pub-fc3",
            front: "Quelles sont les sanctions pour publicite mensongere ?",
            back: "2 ans d'emprisonnement et 300 000 euros d'amende (pouvant etre porte a 50% des depenses de publicite). Le juge peut aussi ordonner la publication du jugement et une campagne corrective.",
            difficulty: "medium",
            tags: ["publicite-reglementee", "sanctions", "e5"],
          },
          {
            id: "pub-fc4",
            front: "Quelle est la regle pour la publicite du tabac en France ?",
            back: "Interdiction TOTALE de toute publicite directe ou indirecte pour le tabac (loi Evin). Cela inclut le parrainage, le mecenat, les evenements et les produits derives. Paquet neutre obligatoire depuis 2017.",
            difficulty: "easy",
            tags: ["publicite-reglementee", "tabac", "e5"],
          },
        ],
        quiz: [
          {
            id: "pub-q1",
            question:
              "Sur quel media la publicite pour l'alcool est-elle interdite par la loi Evin ?",
            options: [
              "La presse ecrite",
              "L'affichage",
              "La television et le cinema",
              "Internet",
            ],
            correctIndex: 2,
            explanation:
              "La loi Evin interdit la publicite pour l'alcool a la television et au cinema. Elle est autorisee en presse ecrite (hors jeunesse), affichage, radio (certaines tranches) et internet (avec bandeau).",
            difficulty: "easy",
            tags: ["publicite-reglementee", "loi-evin", "e5"],
          },
          {
            id: "pub-q2",
            question:
              "La publicite comparative est autorisee en France depuis :",
            options: ["1981", "1986", "1992", "2000"],
            correctIndex: 2,
            explanation:
              "La publicite comparative est autorisee en France depuis 1992, sous conditions strictes : objective, loyale, verifiable et non trompeuse.",
            difficulty: "medium",
            tags: ["publicite-reglementee", "comparative", "e5"],
          },
          {
            id: "pub-q3",
            question:
              "Quelle mention est obligatoire pour les publicites de produits alimentaires ?",
            options: [
              "\"Consultez votre medecin\"",
              "\"Pour votre sante, mangez au moins 5 fruits et legumes par jour\"",
              "\"Produit certifie bio\"",
              "\"Sans OGM\"",
            ],
            correctIndex: 1,
            explanation:
              "Les publicites pour les produits alimentaires doivent comporter des mentions sanitaires comme 'Pour votre sante, mangez au moins 5 fruits et legumes par jour' ou renvoyer vers le site mangerbouger.fr.",
            difficulty: "easy",
            tags: ["publicite-reglementee", "sante", "e5"],
          },
          {
            id: "pub-q4",
            question:
              "Une publicite comparative qui denigre un concurrent est :",
            options: [
              "Autorisee si les faits sont vrais",
              "Autorisee si le concurrent est clairement identifie",
              "Interdite car elle viole la condition de loyaute",
              "Autorisee si l'annonceur est leader du marche",
            ],
            correctIndex: 2,
            explanation:
              "La publicite comparative ne doit pas etre denigrante. Le denigrement viole la condition de loyaute, meme si les faits avances sont exacts. La comparaison doit rester objective et factuelle.",
            difficulty: "medium",
            tags: ["publicite-reglementee", "comparative", "e5"],
          },
        ],
      },
    ],
  },

  // =========================================
  // MODULE 3: FICHES DESCRIPTIVES (E6)
  // =========================================
  {
    id: "fiches-descriptives",
    title: "Rediger ses 3 fiches descriptives",
    exam: "e6",
    chapters: [
      {
        id: "structure-fiche",
        title: "Structure d'une fiche descriptive",
        content: `La fiche descriptive est le document central de l'epreuve E6. Vous devez en presenter 3, chacune decrivant une situation de communication professionnelle dans laquelle vous avez ete implique(e). C'est votre vitrine professionnelle devant le jury.

Les rubriques obligatoires :

1. CONTEXTE DE L'ORGANISATION :
   - Presentation de l'entreprise/organisation (secteur, taille, positionnement, concurrence)
   - Problematique generale de communication de l'organisation

2. PROBLEMATIQUE DE COMMUNICATION :
   - Le probleme ou l'enjeu specifique qui a motive l'action de communication
   - Formulee sous forme de question : "Comment [objectif] aupres de [cible] dans [contexte] ?"

3. OBJECTIFS :
   - Objectif principal et objectifs secondaires
   - Objectifs SMART (Specifiques, Mesurables, Atteignables, Realistes, Temporellement definis)

4. CIBLES :
   - Cible principale et cible(s) secondaire(s)
   - Caracteristiques socio-demographiques et psychographiques

5. STRATEGIE ET MOYENS :
   - Choix strategiques (positionnement, axe de communication, ton)
   - Moyens deployes (media, hors-media, digital)
   - Justification de chaque choix

6. PRODUCTIONS REALISEES :
   - Description precise de ce que VOUS avez produit (pas l'equipe, VOUS)
   - Visuels, textes, maquettes, supports... avec explications des choix creatifs

7. RESULTATS OBTENUS :
   - Indicateurs quantitatifs (reach, engagement, ventes, trafic...)
   - Indicateurs qualitatifs (retours clients, satisfaction)
   - Meme des resultats estimes sont mieux que pas de resultats du tout

8. BILAN PERSONNEL :
   - Ce que vous avez appris
   - Ce qui a bien fonctionne et pourquoi
   - Ce que vous feriez differemment avec du recul
   - Competences developpees

La difference entre decrire et analyser (piege n'1 des candidats) :
- DECRIRE : "J'ai cree un flyer au format A5 avec une photo du produit et le logo de l'entreprise" = INSUFFISANT
- ANALYSER : "J'ai choisi le format A5 car il est pratique a distribuer lors d'un evenement. La photo met en avant le benefice principal du produit. Le logo est positionne en haut a droite selon les conventions de lecture occidentale, pour garantir la memorisation de la marque." = ATTENDU PAR LE JURY

Longueur recommandee : 2 a 3 pages maximum par fiche. Le jury apprecie la concision et la clarte. Mieux vaut une fiche de 2 pages bien structuree et analytique qu'une fiche de 5 pages purement descriptive.`,
        keyPoints: [
          "8 rubriques obligatoires : contexte, problematique, objectifs, cibles, strategie, productions, resultats, bilan",
          "Piege n'1 : decrire au lieu d'analyser - le jury attend des justifications, pas des descriptions",
          "Longueur recommandee : 2 a 3 pages maximum par fiche",
          "Toujours formuler la problematique sous forme de question",
        ],
        flashcards: [
          {
            id: "fiche-fc1",
            front: "Quelles sont les 8 rubriques obligatoires d'une fiche descriptive E6 ?",
            back: "1) Contexte de l'organisation 2) Problematique de communication 3) Objectifs 4) Cibles 5) Strategie/moyens 6) Productions realisees 7) Resultats obtenus 8) Bilan personnel",
            difficulty: "medium",
            tags: ["fiches-descriptives", "e6"],
          },
          {
            id: "fiche-fc2",
            front: "Quelle est la difference entre decrire et analyser dans une fiche E6 ?",
            back: "Decrire = dire CE QUE l'on a fait ('j'ai cree un flyer A5'). Analyser = expliquer POURQUOI on a fait ce choix ('j'ai choisi le format A5 car il est pratique a distribuer lors d'un evenement'). Le jury attend de l'analyse, pas de la description.",
            difficulty: "hard",
            tags: ["fiches-descriptives", "analyse", "e6"],
          },
          {
            id: "fiche-fc3",
            front: "Comment formuler une problematique de communication ?",
            back: "Sous forme de question : 'Comment [objectif] aupres de [cible] dans [contexte] ?' Ex : 'Comment augmenter la notoriete de la marque X aupres des 18-25 ans dans un contexte de budget reduit ?'",
            difficulty: "medium",
            tags: ["fiches-descriptives", "problematique", "e6"],
          },
          {
            id: "fiche-fc4",
            front: "Quelle longueur est recommandee pour une fiche descriptive E6 ?",
            back: "2 a 3 pages maximum par fiche. Le jury apprecie la concision et la clarte. Mieux vaut 2 pages bien structurees et analytiques que 5 pages purement descriptives.",
            difficulty: "easy",
            tags: ["fiches-descriptives", "e6"],
          },
        ],
        quiz: [
          {
            id: "fiche-q1",
            question:
              "Quel est le piege n'1 des candidats dans les fiches descriptives ?",
            options: [
              "Ecrire trop de pages",
              "Decrire au lieu d'analyser",
              "Oublier de mettre des images",
              "Utiliser un vocabulaire trop technique",
            ],
            correctIndex: 1,
            explanation:
              "Le piege n'1 est de rester dans la description ('j'ai fait X puis Y') au lieu d'analyser et justifier ses choix ('j'ai choisi X PARCE QUE...'). Le jury veut comprendre votre raisonnement professionnel.",
            difficulty: "easy",
            tags: ["fiches-descriptives", "e6"],
          },
          {
            id: "fiche-q2",
            question:
              "Quelle rubrique manque souvent et penalise les candidats ?",
            options: [
              "Le contexte de l'organisation",
              "Les objectifs",
              "Le bilan personnel",
              "Les cibles",
            ],
            correctIndex: 2,
            explanation:
              "Le bilan personnel est souvent oublie ou baclé. Il est pourtant essentiel : le jury veut voir votre capacite d'auto-critique constructive, ce que vous avez appris, et ce que vous feriez differemment.",
            difficulty: "medium",
            tags: ["fiches-descriptives", "bilan", "e6"],
          },
          {
            id: "fiche-q3",
            question:
              "Des objectifs 'SMART' doivent etre :",
            options: [
              "Simples, Modernes, Adaptes, Rapides, Tendance",
              "Specifiques, Mesurables, Atteignables, Realistes, Temporellement definis",
              "Strategiques, Marketing, Analytiques, Raisonnables, Techniques",
              "Sociaux, Mediatiques, Ambitieux, Rigoureux, Transversaux",
            ],
            correctIndex: 1,
            explanation:
              "SMART = Specifiques, Mesurables, Atteignables, Realistes, Temporellement definis. Ex : 'Augmenter le trafic web de 20% en 3 mois' est SMART. 'Ameliorer la visibilite' ne l'est pas.",
            difficulty: "easy",
            tags: ["fiches-descriptives", "objectifs", "e6"],
          },
        ],
      },
      {
        id: "choisir-situations",
        title: "Choisir ses 3 situations emblematiques",
        content: `Le choix de vos 3 situations de communication est strategique. Ce n'est pas anodin : le jury evaluera la diversite, la pertinence et la coherence de votre parcours a travers ces 3 fiches.

Critere de diversite :

Vos 3 fiches doivent couvrir des domaines differents de la communication :
- Au moins 1 fiche en PRINT (affiche, flyer, brochure, PLV, packaging...)
- Au moins 1 fiche en DIGITAL (site web, reseaux sociaux, newsletter, campagne digitale...)
- Au moins 1 fiche dans un AUTRE domaine (evenementiel, audiovisuel, relations presse, identite visuelle, signalétique...)

Cette diversite montre au jury que vous maitrisez plusieurs facettes du metier.

Au moins 1 fiche en stage :

C'est quasi obligatoire : au moins 1 fiche doit correspondre a une mission realisee en stage, c'est-a-dire une demande reelle d'un annonceur/client. Cela prouve :
- Votre capacite a travailler dans un cadre professionnel reel
- Votre comprehension des contraintes (budget, delais, brief client)
- Votre adaptabilite a un environnement de travail

Les 2 autres fiches peuvent etre issues de projets scolaires, mais presentees comme des simulations professionnelles (jamais comme des "devoirs").

Montrer sa polyvalence :

Evitez a tout prix 3 fiches qui se ressemblent. Exemples de MAUVAIS choix :
- 3 fiches sur des publications Instagram (meme si elles sont pour des clients differents)
- 3 fiches en print pur (affiche, flyer, brochure)
- 3 fiches avec le meme type d'objectif (notoriete x3)

Exemples de BON equilibre :
- Fiche 1 : Creation d'une identite visuelle pour un commerce local (print + branding)
- Fiche 2 : Campagne social media pour le lancement d'un produit (digital)
- Fiche 3 : Organisation d'un evenement de communication interne (evenementiel)

Montrer la progression :

Classez vos fiches de la plus ancienne a la plus recente pour montrer votre progression. Le jury doit percevoir une evolution dans :
- La complexite des missions
- L'autonomie dans la prise de decision
- La maturite de l'analyse
- La qualite des productions`,
        keyPoints: [
          "Couvrir 3 domaines differents : print + digital + autre (evenementiel, audiovisuel, RP...)",
          "Au moins 1 fiche doit correspondre a une mission reelle en stage",
          "Eviter 3 fiches identiques : montrer sa polyvalence",
          "Classer les fiches de la plus ancienne a la plus recente pour montrer la progression",
        ],
        flashcards: [
          {
            id: "choix-fc1",
            front: "Quels domaines doivent couvrir les 3 fiches descriptives E6 ?",
            back: "Au moins 1 fiche print (affiche, flyer, brochure...), 1 fiche digital (site web, reseaux sociaux, newsletter...) et 1 fiche dans un autre domaine (evenementiel, audiovisuel, RP, identite visuelle...). L'objectif est de montrer la polyvalence.",
            difficulty: "medium",
            tags: ["fiches-descriptives", "choix", "e6"],
          },
          {
            id: "choix-fc2",
            front: "Pourquoi au moins 1 fiche doit-elle correspondre a un stage ?",
            back: "Cela prouve la capacite a travailler dans un cadre professionnel reel, a comprendre les contraintes (budget, delais, brief client) et a s'adapter a un environnement de travail. C'est quasi obligatoire pour l'epreuve.",
            difficulty: "easy",
            tags: ["fiches-descriptives", "stage", "e6"],
          },
          {
            id: "choix-fc3",
            front: "Comment montrer sa progression a travers les 3 fiches E6 ?",
            back: "Classer les fiches de la plus ancienne a la plus recente. Le jury doit voir une evolution dans la complexite des missions, l'autonomie, la maturite de l'analyse et la qualite des productions.",
            difficulty: "medium",
            tags: ["fiches-descriptives", "progression", "e6"],
          },
        ],
        quiz: [
          {
            id: "choix-q1",
            question:
              "Quel est un MAUVAIS choix de 3 fiches descriptives ?",
            options: [
              "1 identite visuelle + 1 campagne social media + 1 evenement",
              "3 publications Instagram pour 3 clients differents",
              "1 affiche + 1 site web + 1 video promotionnelle",
              "1 mission de stage + 1 projet scolaire + 1 mission freelance",
            ],
            correctIndex: 1,
            explanation:
              "3 publications Instagram, meme pour des clients differents, ne montrent pas de diversite de competences. Le jury veut voir que vous maitrisez differents domaines : print, digital, evenementiel, audiovisuel, etc.",
            difficulty: "easy",
            tags: ["fiches-descriptives", "choix", "e6"],
          },
          {
            id: "choix-q2",
            question:
              "Combien de fiches minimum doivent correspondre a un stage ?",
            options: ["Aucune", "1", "2", "3"],
            correctIndex: 1,
            explanation:
              "Au moins 1 fiche doit correspondre a une mission reelle en stage (demande d'un annonceur). Les autres peuvent etre issues de projets scolaires, presentees comme des simulations professionnelles.",
            difficulty: "easy",
            tags: ["fiches-descriptives", "stage", "e6"],
          },
        ],
      },
      {
        id: "erreurs-conseils",
        title: "Erreurs frequentes et conseils",
        content: `Voici les erreurs les plus frequentes commises par les candidats dans leurs fiches descriptives, et les conseils pour les eviter.

Erreur n'1 : Trop descriptif

MAUVAIS : "J'ai realise un flyer au format A5 avec Photoshop. J'ai mis une photo du produit, le logo, et les informations pratiques. Puis je l'ai imprime en 500 exemplaires."

BON : "J'ai choisi le format A5 PARCE QUE ce format est ideal pour une distribution en main propre lors de l'evenement. J'ai opte pour une mise en page epuree PARCE QUE la cible (CSP+ 35-50 ans) attend un positionnement premium. La photo du produit en gros plan met en avant le benefice principal identifie dans le brief : la naturalite des ingredients."

La cle : chaque choix creatif doit etre JUSTIFIE par le brief, la cible, le positionnement ou les contraintes.

Erreur n'2 : Oublier le bilan personnel

Le bilan personnel est OBLIGATOIRE et souvent baclé. Le jury veut voir :
- Une auto-critique CONSTRUCTIVE (pas d'auto-flagellation, pas de "tout etait parfait")
- Ce que vous avez appris concretement
- Ce que vous feriez differemment avec du recul et POURQUOI
- Les competences developpees (techniques, relationnelles, organisationnelles)

Erreur n'3 : Oublier les resultats

Meme si vous n'avez pas de donnees precises, donnez des estimations :
- "Le flyer a ete distribue a 500 personnes lors de l'evenement qui a reuni 200 visiteurs"
- "La publication Instagram a genere 150 likes et 23 commentaires, soit un taux d'engagement de 4,2%"
- "Le client a valide la proposition sans modification, ce qui temoigne de la pertinence de la recommandation"
Des resultats estimes valent mieux que pas de resultats du tout.

Erreur n'4 : Ne pas justifier ses choix creatifs

Pour CHAQUE choix, vous devez pouvoir repondre a "pourquoi ?" :
- Pourquoi cette couleur ? (psychologie des couleurs, charte graphique, cible)
- Pourquoi cette typographie ? (lisibilite, ton, coherence avec le positionnement)
- Pourquoi ce format ? (contraintes de diffusion, budget, cible)
- Pourquoi ce canal ? (habitudes media de la cible, budget, objectifs)

Modele de bonne fiche annote :
1. Introduction accrocheuse : contexte et enjeu en 2-3 lignes
2. Problematique formulee en question
3. Analyse strategique : objectifs SMART + cibles detaillees
4. Choix creatifs JUSTIFIES avec references au brief
5. Productions presentees avec analyse (pas juste montrees)
6. Resultats chiffres ou estimes
7. Bilan personnel sincere et constructif`,
        keyPoints: [
          "Chaque choix creatif doit etre justifie par le brief, la cible, le positionnement ou les contraintes",
          "Le bilan personnel doit etre une auto-critique constructive, pas 'tout etait parfait'",
          "Des resultats estimes valent mieux que pas de resultats du tout",
          "Pour chaque choix creatif, pouvoir repondre a 'pourquoi ?' (couleur, typo, format, canal)",
        ],
        flashcards: [
          {
            id: "erreur-fc1",
            front: "Quelle est l'erreur n'1 des candidats dans les fiches E6 ?",
            back: "Etre trop descriptif ('j'ai fait X puis Y') au lieu d'analyser et justifier ses choix ('j'ai choisi X PARCE QUE la cible..., le brief..., le positionnement...'). Chaque choix creatif doit etre relie a une raison strategique.",
            difficulty: "easy",
            tags: ["fiches-descriptives", "erreurs", "e6"],
          },
          {
            id: "erreur-fc2",
            front: "Comment rediger un bon bilan personnel dans une fiche E6 ?",
            back: "Auto-critique CONSTRUCTIVE : ce qui a fonctionne et pourquoi, ce que vous feriez differemment avec du recul et pourquoi, les competences developpees. NE PAS dire 'tout etait parfait' ni se flageller.",
            difficulty: "medium",
            tags: ["fiches-descriptives", "bilan", "e6"],
          },
          {
            id: "erreur-fc3",
            front: "Que faire quand on n'a pas de resultats chiffres precis ?",
            back: "Donner des estimations : nombre de distributions, taux d'engagement estime, retour client positif, validation sans modification... Des resultats estimes valent toujours mieux que pas de resultats du tout.",
            difficulty: "medium",
            tags: ["fiches-descriptives", "resultats", "e6"],
          },
        ],
        quiz: [
          {
            id: "erreur-q1",
            question:
              "Laquelle de ces phrases est la plus analytique ?",
            options: [
              "J'ai cree un visuel avec Photoshop",
              "J'ai choisi un fond bleu car il evoque la confiance, en coherence avec le positionnement de la marque",
              "J'ai utilise la typographie Helvetica en corps 12",
              "J'ai imprime le flyer en 500 exemplaires sur papier glace",
            ],
            correctIndex: 1,
            explanation:
              "Seule la proposition B justifie un choix creatif (le bleu) par une raison strategique (confiance + positionnement). Les autres sont purement descriptives.",
            difficulty: "easy",
            tags: ["fiches-descriptives", "analyse", "e6"],
          },
          {
            id: "erreur-q2",
            question:
              "Quel bilan personnel est le plus apprecie par le jury ?",
            options: [
              "\"Tout s'est tres bien passe, je suis satisfait du resultat\"",
              "\"C'etait catastrophique, rien n'a fonctionne\"",
              "\"Si c'etait a refaire, j'integrerais les reseaux sociaux plus tot dans le dispositif car j'ai constate que la cible y etait tres active\"",
              "\"Mon professeur m'a dit que c'etait bien\"",
            ],
            correctIndex: 2,
            explanation:
              "La reponse C montre une auto-critique constructive : un point d'amelioration identifie, justifie par une observation concrete, avec une solution proposee. C'est exactement ce que le jury attend.",
            difficulty: "medium",
            tags: ["fiches-descriptives", "bilan", "e6"],
          },
        ],
      },
    ],
  },

  // =========================================
  // MODULE 4: GRILLE D'EVALUATION & CRITERES (E6)
  // =========================================
  {
    id: "grille-evaluation-e6",
    title: "Grille d'evaluation & criteres",
    exam: "e6",
    chapters: [
      {
        id: "criteres-officiels",
        title: "Les 6 criteres officiels",
        content: `L'epreuve E6 est evaluee selon 6 criteres officiels. Connaitre ces criteres, c'est comprendre ce que le jury attend et adapter sa presentation en consequence.

1. MAITRISE DES COMPETENCES DU BLOC 2 :
Le jury verifie que vous maitrisez les competences du bloc 2 du referentiel : concevoir des supports de communication, realiser des productions, deployer une strategie de communication.
- Ce que le jury attend : des preuves concretes de vos competences a travers vos productions
- Bonne reponse : "J'ai realise la charte graphique en definissant les codes couleur, les typographies et les regles d'utilisation, que j'ai documentees dans un guide de 15 pages"
- Mauvaise reponse : "J'ai aide a faire la charte graphique"

2. CAPACITE A EXPLICITER ET JUSTIFIER SES CHOIX CREATIFS :
C'est le critere le plus important. Le jury veut comprendre POURQUOI vous avez fait tel ou tel choix.
- Ce que le jury attend : une argumentation structuree reliant chaque choix au brief, a la cible, au positionnement
- Bonne reponse : "J'ai choisi la typographie Playfair Display car son style serif classique renforce le positionnement premium de la marque, tout en restant lisible sur support digital"
- Mauvaise reponse : "J'ai choisi cette typographie parce que je la trouvais jolie"

3. COMPREHENSION DU CADRE PROFESSIONNEL :
Le jury evalue votre connaissance du monde professionnel de la communication.
- Ce que le jury attend : vocabulaire professionnel, comprehension des enjeux business, connaissance des acteurs
- Bonne reponse : "Le brief annonceur precisait un budget de 5000 euros et un delai de 3 semaines, ce qui a oriente nos choix vers du digital plutot que du print"
- Mauvaise reponse : "Le prof nous a donne un exercice a faire"

4. DIVERSITE ET QUALITE DES PRODUCTIONS :
Le jury evalue la variete de vos productions et leur qualite d'execution.
- Ce que le jury attend : des productions variees (print, digital, video, evenementiel...) et de qualite professionnelle
- Bonne reponse : montrer des productions soignees avec une execution propre, meme si simples
- Mauvaise reponse : beaucoup de productions mais bacles, ou 3 productions tres similaires

5. COHERENCE DU PARCOURS DE PROFESSIONNALISATION :
Le jury evalue la logique et la progression de votre parcours.
- Ce que le jury attend : une evolution visible entre les 3 fiches, des choix de stage coherents avec votre projet
- Bonne reponse : "Mon premier stage en agence m'a permis de decouvrir le processus creatif, ce qui m'a motive a approfondir le digital en deuxieme annee"
- Mauvaise reponse : aucun lien entre les experiences, impression de parcours subi

6. QUALITE DE L'EXPRESSION ORALE :
Le jury evalue votre capacite a communiquer oralement de maniere professionnelle.
- Ce que le jury attend : articulation claire, vocabulaire professionnel, assurance, capacite a structurer son discours
- Bonne reponse : discours structure, voix posee, regard vers le jury, vocabulaire adapte
- Mauvaise reponse : lecture de notes, voix monotone, tics de langage, vocabulaire pauvre`,
        keyPoints: [
          "6 criteres : competences bloc 2, justification des choix, cadre pro, diversite/qualite, coherence parcours, expression orale",
          "Le critere le plus important : la capacite a expliciter et justifier ses choix creatifs",
          "Chaque choix doit etre argumente (pas 'je trouvais ca joli' mais 'parce que la cible / le brief / le positionnement')",
          "Le jury veut voir une progression et une coherence dans le parcours",
        ],
        flashcards: [
          {
            id: "critere-fc1",
            front: "Quels sont les 6 criteres officiels d'evaluation de l'epreuve E6 ?",
            back: "1) Maitrise des competences du bloc 2 2) Capacite a expliciter/justifier ses choix creatifs 3) Comprehension du cadre professionnel 4) Diversite et qualite des productions 5) Coherence du parcours de professionnalisation 6) Qualite de l'expression orale",
            difficulty: "hard",
            tags: ["grille-evaluation", "criteres", "e6"],
          },
          {
            id: "critere-fc2",
            front: "Quel est le critere le plus important de l'epreuve E6 ?",
            back: "La capacite a expliciter et justifier ses choix creatifs. Le jury veut comprendre POURQUOI vous avez fait tel choix, avec une argumentation reliee au brief, a la cible et au positionnement. Jamais 'parce que c'est joli'.",
            difficulty: "medium",
            tags: ["grille-evaluation", "criteres", "e6"],
          },
          {
            id: "critere-fc3",
            front: "Que signifie 'coherence du parcours de professionnalisation' pour le jury ?",
            back: "Le jury veut voir une evolution visible entre les 3 fiches, des choix de stage coherents avec le projet professionnel, et une logique dans la progression (de missions simples vers des missions complexes).",
            difficulty: "medium",
            tags: ["grille-evaluation", "parcours", "e6"],
          },
          {
            id: "critere-fc4",
            front: "Quelle est la difference entre une bonne et une mauvaise justification de choix creatif ?",
            back: "MAUVAIS : 'J'ai choisi cette typo parce que je la trouvais jolie'. BON : 'J'ai choisi Playfair Display car son style serif classique renforce le positionnement premium de la marque, tout en restant lisible sur digital.' Toujours relier au brief, a la cible, au positionnement.",
            difficulty: "easy",
            tags: ["grille-evaluation", "choix-creatifs", "e6"],
          },
          {
            id: "critere-fc5",
            front: "Comment montrer la 'maitrise des competences du bloc 2' au jury ?",
            back: "En donnant des preuves concretes : 'J'ai realise la charte graphique en definissant les codes couleur, typographies et regles d'utilisation, documentees dans un guide de 15 pages.' PAS : 'J'ai aide a faire la charte graphique.'",
            difficulty: "medium",
            tags: ["grille-evaluation", "competences", "e6"],
          },
          {
            id: "critere-fc6",
            front: "Que verifie le jury avec le critere 'comprehension du cadre professionnel' ?",
            back: "Il verifie que vous connaissez le monde professionnel de la communication : vocabulaire adapte (brief, recommandation, positionnement), comprehension des enjeux business (budget, delais, ROI), connaissance des acteurs (annonceur, agence, prestataires).",
            difficulty: "medium",
            tags: ["grille-evaluation", "cadre-pro", "e6"],
          },
        ],
        quiz: [
          {
            id: "critere-q1",
            question:
              "Quel critere est le plus valorise par le jury en E6 ?",
            options: [
              "La qualite graphique des productions",
              "La capacite a expliciter et justifier ses choix creatifs",
              "Le nombre de productions realisees",
              "La maitrise des logiciels Adobe",
            ],
            correctIndex: 1,
            explanation:
              "Le jury valorise avant tout la capacite du candidat a EXPLIQUER et JUSTIFIER ses choix. Ce n'est pas un concours de graphisme, mais une epreuve de communication strategique.",
            difficulty: "easy",
            tags: ["grille-evaluation", "e6"],
          },
          {
            id: "critere-q2",
            question:
              "Quelle phrase illustre le mieux la comprehension du cadre professionnel ?",
            options: [
              "Mon prof m'a demande de realiser une affiche",
              "Le brief annonceur precisait un budget de 5000 euros et un delai de 3 semaines",
              "C'etait un exercice scolaire interessant",
              "J'ai fait ca pour avoir une bonne note",
            ],
            correctIndex: 1,
            explanation:
              "Seule la reponse B utilise le vocabulaire professionnel (brief, annonceur, budget, delai) et montre une comprehension des contraintes reelles du metier.",
            difficulty: "easy",
            tags: ["grille-evaluation", "cadre-pro", "e6"],
          },
          {
            id: "critere-q3",
            question:
              "Pour montrer la coherence du parcours, il faut :",
            options: [
              "Presenter 3 fiches dans le meme domaine",
              "Montrer une evolution et une progression entre les 3 fiches",
              "Avoir fait 3 stages dans la meme entreprise",
              "Presenter uniquement des missions de stage",
            ],
            correctIndex: 1,
            explanation:
              "La coherence du parcours se montre par une evolution visible : de missions simples vers des missions complexes, avec une diversite de domaines et une logique de progression.",
            difficulty: "medium",
            tags: ["grille-evaluation", "parcours", "e6"],
          },
          {
            id: "critere-q4",
            question:
              "Laquelle de ces productions serait la plus penalisante pour le critere 'diversite' ?",
            options: [
              "1 affiche + 1 site web + 1 video",
              "1 logo + 1 campagne Instagram + 1 evenement",
              "3 posts Instagram pour 3 clients differents",
              "1 brochure + 1 newsletter + 1 communique de presse",
            ],
            correctIndex: 2,
            explanation:
              "3 posts Instagram, meme pour des clients differents, ne montrent aucune diversite de supports ni de competences. Le jury veut voir que vous maitrisez differents formats et canaux.",
            difficulty: "easy",
            tags: ["grille-evaluation", "diversite", "e6"],
          },
        ],
      },
      {
        id: "questions-jury",
        title: "Questions frequentes du jury et comment repondre",
        content: `Pendant l'echange avec le jury (environ 15-20 minutes), certaines questions reviennent tres frequemment. Voici comment y repondre de maniere professionnelle et convaincante.

"Pourquoi avez-vous choisi cette couleur/typo/format ?"
Methode : TOUJOURS relier au brief, a la cible et au positionnement.
- "J'ai choisi le vert car il evoque la naturalite et l'ecologie, en coherence avec le positionnement 'bio' de la marque. De plus, les etudes montrent que le vert inspire la confiance chez notre cible principale (femmes 30-45 ans soucieuses de leur sante)."
- JAMAIS : "Je trouvais que ca allait bien" ou "C'etait ma couleur preferee"

"Qu'auriez-vous fait differemment avec du recul ?"
Methode : montrer l'auto-critique CONSTRUCTIVE, pas dire "rien".
- "Avec du recul, j'aurais integre les reseaux sociaux des le depart du dispositif plutot qu'en phase 2, car j'ai constate que notre cible y etait tres active. J'aurais egalement prevu un A/B test sur les visuels pour optimiser le taux de clic."
- JAMAIS : "Rien, j'etais satisfait" (manque de recul) ou "Tout etait nul" (auto-flagellation)

"Quel est le ROI de cette action ?"
Methode : donner des indicateurs meme estimes.
- "Le taux d'engagement sur la campagne Instagram etait de 4,2%, soit 2 points au-dessus de la moyenne du secteur. En termes de conversion, nous avons genere 45 leads qualifies pour un investissement de 800 euros, soit un cout par lead de 17,78 euros."
- Si pas de chiffres precis : "Nous n'avons pas pu mesurer le ROI direct, mais le client a renouvele sa confiance pour une deuxieme campagne, ce qui est un indicateur positif."

"Comment avez-vous gere les contraintes (budget, temps, client) ?"
Methode : montrer la resolution de problemes.
- "Le budget etait limite a 500 euros, ce qui excluait le print. J'ai donc propose une strategie 100% digitale avec du contenu organique sur Instagram et une micro-campagne sponsorisee de 200 euros ciblee sur notre zone de chalandise."
- JAMAIS : "On n'avait pas de budget donc on n'a pas pu faire grand-chose"

"Quelle est la difference entre votre approche et celle d'un concurrent ?"
Methode : montrer votre connaissance du positionnement et de la concurrence.
- "Notre concurrent principal communique sur le prix bas avec des visuels tres promotionnels. Nous avons choisi de nous differencier par un positionnement premium et une communication axee sur la qualite et l'expertise, ce qui correspond mieux aux attentes de notre coeur de cible."`,
        keyPoints: [
          "Toujours relier ses choix creatifs au brief, a la cible et au positionnement",
          "Montrer l'auto-critique constructive : identifier des axes d'amelioration concrets",
          "Donner des indicateurs meme estimes pour le ROI",
          "Montrer la resolution de problemes face aux contraintes",
        ],
        flashcards: [
          {
            id: "jury-fc1",
            front: "Comment repondre a 'Pourquoi avez-vous choisi cette couleur/typo ?' devant le jury ?",
            back: "TOUJOURS relier au brief, a la cible et au positionnement. Ex : 'Le vert evoque la naturalite, en coherence avec le positionnement bio de la marque et les attentes de notre cible.' JAMAIS : 'Je trouvais ca joli' ou 'C'etait ma couleur preferee.'",
            difficulty: "medium",
            tags: ["jury", "choix-creatifs", "e6"],
          },
          {
            id: "jury-fc2",
            front: "Comment repondre a 'Qu'auriez-vous fait differemment ?' devant le jury ?",
            back: "Auto-critique CONSTRUCTIVE : identifier un point d'amelioration, justifier par une observation, proposer une solution. Ex : 'J'aurais integre les RS plus tot car la cible y etait active.' JAMAIS : 'Rien' (manque de recul) ou 'Tout etait nul' (auto-flagellation).",
            difficulty: "medium",
            tags: ["jury", "auto-critique", "e6"],
          },
          {
            id: "jury-fc3",
            front: "Comment parler de ROI quand on n'a pas de chiffres precis ?",
            back: "Donner des indicateurs estimes ou indirects : taux d'engagement, nombre de leads, validation client, renouvellement de confiance. Ex : 'Nous n'avons pas mesure le ROI direct, mais le client a renouvele pour une 2e campagne, indicateur positif.'",
            difficulty: "hard",
            tags: ["jury", "roi", "e6"],
          },
          {
            id: "jury-fc4",
            front: "Comment montrer sa capacite a gerer les contraintes devant le jury ?",
            back: "Presenter la contrainte comme un defi et montrer la solution : 'Budget de 500 euros, donc j'ai propose une strategie 100% digitale avec contenu organique + micro-campagne de 200 euros ciblee.' PAS : 'On n'avait pas de budget donc on n'a pas pu faire grand-chose.'",
            difficulty: "medium",
            tags: ["jury", "contraintes", "e6"],
          },
          {
            id: "jury-fc5",
            front: "Comment repondre a une question sur le positionnement concurrentiel ?",
            back: "Montrer sa connaissance du marche : decrire l'approche du concurrent, puis expliquer en quoi la votre est differente et POURQUOI. Ex : 'Le concurrent communique sur le prix, nous nous differencions par le positionnement premium, plus adapte a notre coeur de cible.'",
            difficulty: "hard",
            tags: ["jury", "positionnement", "e6"],
          },
        ],
        quiz: [
          {
            id: "jury-q1",
            question:
              "Face a la question 'Pourquoi cette couleur ?', la meilleure reponse est :",
            options: [
              "C'est ma couleur preferee",
              "Le client l'a imposee",
              "Le bleu evoque la confiance, en coherence avec le positionnement de la marque financiere",
              "C'etait la tendance du moment",
            ],
            correctIndex: 2,
            explanation:
              "La reponse C est la seule qui relie le choix de couleur a une strategie (positionnement) et a un effet psychologique (confiance). C'est ce que le jury attend : une justification professionnelle.",
            difficulty: "easy",
            tags: ["jury", "e6"],
          },
          {
            id: "jury-q2",
            question:
              "Face a 'Qu'auriez-vous fait differemment ?', la pire reponse est :",
            options: [
              "J'aurais alloue plus de budget au digital",
              "Rien, tout etait parfait",
              "J'aurais commence les RP plus tot",
              "J'aurais fait un A/B test sur les visuels",
            ],
            correctIndex: 1,
            explanation:
              "'Rien, tout etait parfait' montre un manque total de recul critique. Le jury attend une auto-critique constructive, pas de l'autosatisfaction. Meme les meilleurs projets ont des axes d'amelioration.",
            difficulty: "easy",
            tags: ["jury", "auto-critique", "e6"],
          },
          {
            id: "jury-q3",
            question:
              "Comment presenter une contrainte de budget au jury ?",
            options: [
              "Se plaindre du manque de moyens",
              "Dire qu'on n'a pas pu faire grand-chose",
              "Presenter la contrainte comme un defi et montrer comment on l'a transformee en solution creative",
              "Ignorer la question et parler d'autre chose",
            ],
            correctIndex: 2,
            explanation:
              "Une contrainte est une occasion de montrer sa creativite et sa capacite a resoudre des problemes. Le jury veut voir comment vous transformez les obstacles en opportunites.",
            difficulty: "medium",
            tags: ["jury", "contraintes", "e6"],
          },
          {
            id: "jury-q4",
            question:
              "Face a une question que vous ne savez pas, la meilleure attitude est :",
            options: [
              "Inventer une reponse",
              "Reconnaitre que vous ne savez pas et expliquer comment vous chercheriez la reponse",
              "Changer de sujet",
              "Demander au jury de repeter la question pour gagner du temps",
            ],
            correctIndex: 1,
            explanation:
              "L'honnetete est valorisee. Dire 'Je ne connais pas ce point precis, mais je me renseignerais en consultant [source]' montre une posture professionnelle mature.",
            difficulty: "medium",
            tags: ["jury", "attitude", "e6"],
          },
        ],
      },
      {
        id: "posture-professionnelle",
        title: "Posture professionnelle vs etudiante",
        content: `Le jour de l'epreuve E6, le jury evalue votre capacite a vous presenter comme un PROFESSIONNEL de la communication, pas comme un etudiant. Cette posture se travaille dans le vocabulaire, l'attitude et la presentation.

Le vocabulaire : ce qu'il faut dire et ne pas dire

NE JAMAIS DIRE : "On m'a demande de faire..."
DIRE : "J'ai propose..." / "J'ai choisi..." / "J'ai recommande..."
Pourquoi : "On m'a demande" vous place en executant passif. "J'ai propose" montre votre initiative et votre expertise.

NE JAMAIS DIRE : "C'est un exercice scolaire" / "C'est un devoir"
DIRE : "C'est un cas reel" / "C'est une simulation professionnelle" / "C'est une mise en situation"
Pourquoi : le jury veut evaluer un futur professionnel, pas un etudiant qui fait ses devoirs.

NE JAMAIS DIRE : "Le prof" / "Le cours" / "La note"
DIRE : "Le tuteur" / "La formation" / "L'evaluation"
Pourquoi : le vocabulaire scolaire casse l'illusion professionnelle.

Vocabulaire professionnel a maitriser :
- Brief (pas "consignes")
- Recommandation (pas "proposition")
- Positionnement (pas "l'idee")
- Cible (pas "les gens")
- KPIs (pas "les resultats")
- Benchmark (pas "j'ai regarde les concurrents")
- Identite visuelle (pas "le logo et les couleurs")
- Charte graphique (pas "les regles du design")
- Ligne editoriale (pas "ce qu'on publie")
- Planning de diffusion (pas "quand on poste")

Dress code et presentation le jour J :
- Tenue professionnelle (comme un entretien d'embauche en agence de communication)
- Sobre mais soignee : pas besoin de costume, mais eviter le trop decontracte
- Coherence avec le metier : un communicant peut se permettre une touche creative, mais pas l'exces
- Apporter ses productions (portfolio imprime proprement, cle USB de secours, tablette)
- Arriver 15 minutes en avance minimum`,
        keyPoints: [
          "Remplacer 'on m'a demande' par 'j'ai propose/choisi/recommande'",
          "Ne jamais parler d'exercice scolaire : toujours 'cas reel' ou 'simulation professionnelle'",
          "Maitriser le vocabulaire professionnel : brief, recommandation, positionnement, cible, KPIs",
          "Tenue professionnelle et portfolio imprime le jour J",
        ],
        flashcards: [
          {
            id: "posture-fc1",
            front: "Pourquoi ne faut-il jamais dire 'on m'a demande de faire' devant le jury ?",
            back: "Parce que cela vous place en executant passif. Il faut dire 'j'ai propose' / 'j'ai choisi' / 'j'ai recommande' pour montrer votre initiative, votre expertise et votre posture de professionnel autonome.",
            difficulty: "easy",
            tags: ["posture", "vocabulaire", "e6"],
          },
          {
            id: "posture-fc2",
            front: "Quels mots scolaires faut-il remplacer par des termes professionnels ?",
            back: "'Consignes' -> 'Brief'. 'Proposition' -> 'Recommandation'. 'L'idee' -> 'Positionnement'. 'Les gens' -> 'La cible'. 'Les resultats' -> 'Les KPIs'. 'Le prof' -> 'Le tuteur'. 'Le devoir' -> 'La simulation professionnelle'.",
            difficulty: "medium",
            tags: ["posture", "vocabulaire", "e6"],
          },
          {
            id: "posture-fc3",
            front: "Comment se presenter physiquement le jour de l'epreuve E6 ?",
            back: "Tenue professionnelle (comme un entretien en agence) : sobre mais soignee, touche creative permise mais pas d'exces. Apporter un portfolio imprime, cle USB de secours, arriver 15 min en avance.",
            difficulty: "easy",
            tags: ["posture", "presentation", "e6"],
          },
        ],
        quiz: [
          {
            id: "posture-q1",
            question:
              "Quelle formulation est la plus professionnelle ?",
            options: [
              "Le prof nous a demande de faire une affiche pour un exercice",
              "J'ai recommande la creation d'une affiche dans le cadre d'une simulation de brief annonceur",
              "On a du faire un devoir sur une affiche",
              "Il fallait faire une affiche pour le cours de com",
            ],
            correctIndex: 1,
            explanation:
              "La reponse B utilise le vocabulaire professionnel ('recommande', 'simulation de brief annonceur') et montre une posture active. Les autres reponses sont trop scolaires.",
            difficulty: "easy",
            tags: ["posture", "vocabulaire", "e6"],
          },
          {
            id: "posture-q2",
            question:
              "Le terme professionnel pour 'les gens qui vont voir notre pub' est :",
            options: [
              "Les spectateurs",
              "Le public",
              "La cible",
              "Les consommateurs",
            ],
            correctIndex: 2,
            explanation:
              "'La cible' est le terme professionnel en communication. On peut preciser : coeur de cible, cible principale, cible secondaire. 'Les gens' ou 'le public' sont trop vagues pour un professionnel.",
            difficulty: "easy",
            tags: ["posture", "vocabulaire", "e6"],
          },
          {
            id: "posture-q3",
            question:
              "Quelle est la bonne attitude quand le jury vous demande de justifier un choix que vous avez subi (impose par le client) ?",
            options: [
              "Dire 'le client l'a impose, je n'avais pas le choix'",
              "Mentir et pretendre que c'etait votre idee",
              "Expliquer la demande du client, puis montrer comment vous l'avez integree dans la strategie de facon coherente",
              "Critiquer le choix du client devant le jury",
            ],
            correctIndex: 2,
            explanation:
              "La posture professionnelle consiste a integrer la demande du client dans la strategie : 'Le client souhaitait du rouge, j'ai integre cette couleur en l'associant a la passion et l'energie, en coherence avec le positionnement dynamique de la marque.'",
            difficulty: "hard",
            tags: ["posture", "client", "e6"],
          },
        ],
      },
      {
        id: "gestion-stress-oral",
        title: "Gestion du stress et de l'oral",
        content: `La gestion du stress est un enjeu majeur le jour de l'epreuve. Meme les candidats les mieux prepares peuvent etre destabilises. Voici des techniques concretes pour rester performant.

Techniques de respiration :

La COHERENCE CARDIAQUE 5-5-5 :
- Inspirer 5 secondes par le nez
- Expirer 5 secondes par la bouche
- Repeter pendant 5 minutes
- A faire AVANT l'epreuve (dans la salle d'attente, pas devant le jury)
- Effet : reduction du cortisol (hormone du stress), ralentissement du rythme cardiaque, meilleure concentration
- L'effet dure environ 4 heures apres la seance

Preparation mentale :

- VISUALISER LA REUSSITE : imaginer le deroulement ideal de l'epreuve (entree dans la salle, presentation fluide, reponses pertinentes, jury qui hoche la tete)
- NE PAS visualiser l'echec (le cerveau ne distingue pas le reel de l'imagine : visualiser l'echec augmente le stress)
- Repeter mentalement les premieres phrases de son pitch (les plus critiques car elles donnent la premiere impression)
- Se rappeler ses points forts et ses reussites passees

Body language :

- REGARD : utiliser le triangle du visage du jury (yeux - nez). Regarder chaque membre du jury a tour de role, pas uniquement celui qui pose la question.
- POSTURE : droite mais pas rigide. Pieds a plat au sol, epaules relachees, leger penche en avant (montre l'engagement).
- MAINS : visibles sur la table ou avec des gestes ouverts. Pas dans les poches, pas croisees (signe de fermeture), pas en train de tripoter un stylo.
- SOURIRE : professionnel et naturel. Un sourire leger montre la confiance et la sympathie.

Voix :

- ARTICULER : ouvrir la bouche, prononcer chaque syllabe. Le stress tend a faire parler vite et mal articuler.
- VARIER LE RYTHME : alterner phrases courtes et phrases longues. Ne pas parler en continu.
- NE PAS PARLER TROP VITE : le stress accelere le debit. Consciemment ralentir.
- LES PAUSES SONT UNE FORCE : une pause apres un point important donne du poids au message et montre l'assurance. Silence ≠ gêne, silence = maitrise.

Timer mental :

L'epreuve E6 dure environ 40 minutes :
- 5 MINUTES : pitch de presentation (repeter au moins 10 fois avant le jour J). Presenter votre parcours et vos 3 fiches de maniere synthetique.
- 15 MINUTES : echange avec le jury sur vos choix creatifs et votre parcours. Reponses de 1 a 2 minutes maximum par question (pas de monologues).
- 20 MINUTES : approfondissement sur les fiches. Le jury choisit 1 ou 2 fiches a approfondir.

Conseil ultime : le jury est bienveillant. Il ne cherche pas a vous pieger mais a evaluer votre potentiel de futur professionnel. Montrez votre passion pour la communication.`,
        keyPoints: [
          "Coherence cardiaque 5-5-5 avant l'epreuve : inspirer 5s, expirer 5s, pendant 5 min",
          "Visualiser la reussite, jamais l'echec (le cerveau ne distingue pas le reel de l'imagine)",
          "Body language : regard triangle, posture droite, mains visibles, sourire professionnel",
          "Timer : 5 min pitch (repeter 10 fois avant), 15 min echange (reponses 1-2 min max), 20 min fiches",
        ],
        flashcards: [
          {
            id: "stress-fc1",
            front: "Qu'est-ce que la coherence cardiaque 5-5-5 ?",
            back: "Technique de respiration : inspirer 5 secondes, expirer 5 secondes, pendant 5 minutes. A faire avant l'epreuve. Effet : reduction du cortisol, ralentissement cardiaque, meilleure concentration. L'effet dure environ 4 heures.",
            difficulty: "easy",
            tags: ["stress", "respiration", "e6"],
          },
          {
            id: "stress-fc2",
            front: "Pourquoi les pauses a l'oral sont-elles une force ?",
            back: "Une pause apres un point important donne du poids au message et montre l'assurance. Silence = maitrise, pas gene. De plus, les pauses permettent au jury d'assimiler l'information et montrent que vous ne debitez pas un texte appris.",
            difficulty: "medium",
            tags: ["stress", "oral", "e6"],
          },
          {
            id: "stress-fc3",
            front: "Comment decomposer les 40 minutes de l'epreuve E6 ?",
            back: "5 min : pitch de presentation (parcours + 3 fiches, repeter 10 fois avant). 15 min : echange avec le jury (reponses de 1-2 min max). 20 min : approfondissement sur 1-2 fiches choisies par le jury.",
            difficulty: "medium",
            tags: ["stress", "timing", "e6"],
          },
          {
            id: "stress-fc4",
            front: "Quelles sont les regles du body language devant le jury ?",
            back: "Regard : triangle du visage (yeux-nez), regarder chaque membre a tour de role. Posture : droite, pieds a plat, epaules relachees. Mains : visibles, gestes ouverts (pas dans les poches ni croisees). Sourire : professionnel et naturel.",
            difficulty: "medium",
            tags: ["stress", "body-language", "e6"],
          },
        ],
        quiz: [
          {
            id: "stress-q1",
            question:
              "Quand faut-il pratiquer la coherence cardiaque 5-5-5 ?",
            options: [
              "Pendant la presentation devant le jury",
              "La veille au soir uniquement",
              "Avant l'epreuve, dans la salle d'attente",
              "Apres l'epreuve pour se detendre",
            ],
            correctIndex: 2,
            explanation:
              "La coherence cardiaque se pratique AVANT l'epreuve (salle d'attente). L'effet dure environ 4 heures. La pratiquer pendant l'epreuve serait visible et inapproprie.",
            difficulty: "easy",
            tags: ["stress", "respiration", "e6"],
          },
          {
            id: "stress-q2",
            question:
              "Quelle duree est recommandee pour le pitch initial en E6 ?",
            options: [
              "2 minutes",
              "5 minutes",
              "10 minutes",
              "15 minutes",
            ],
            correctIndex: 1,
            explanation:
              "Le pitch initial dure environ 5 minutes. C'est le moment de presenter votre parcours et vos 3 fiches de maniere synthetique. Il doit etre repete au moins 10 fois avant le jour J.",
            difficulty: "easy",
            tags: ["stress", "timing", "e6"],
          },
          {
            id: "stress-q3",
            question:
              "Quelle est la meilleure technique de regard devant un jury de 2-3 personnes ?",
            options: [
              "Fixer uniquement la personne qui pose la question",
              "Regarder ses notes en permanence",
              "Regarder chaque membre du jury a tour de role",
              "Fixer un point au-dessus des tetes du jury",
            ],
            correctIndex: 2,
            explanation:
              "Il faut regarder chaque membre du jury a tour de role pour les inclure tous dans l'echange. Fixer une seule personne exclut les autres ; regarder ses notes montre un manque de preparation.",
            difficulty: "medium",
            tags: ["stress", "body-language", "e6"],
          },
        ],
      },
    ],
  },
];
