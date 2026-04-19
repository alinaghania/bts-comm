// ============================================================================
// ANNALES DU BTS COMMUNICATION - DONNÉES RÉELLES
// Sources : crcm-tl.fr, heloo.fr, pedagogie.ac-lille.fr, aidexam.com,
//           pedagogie.ac-aix-marseille.fr, eco-gestion-hotellerie-lgt.dis.ac-guyane.fr
// ============================================================================

export interface Annale {
  id: string;
  year: number;
  exam: "e1" | "e5";
  title: string;
  theme: string;
  advertiser?: string;
  duration: number; // seconds
  coefficient: number;
  parts: AnnalePart[];
  correction?: AnnaleCorrection;
}

export interface AnnalePart {
  id: string;
  title: string;
  points: number;
  description: string;
  documents?: string[];
  questions: AnnaleQuestion[];
}

export interface AnnaleQuestion {
  id: string;
  question: string;
  points: number;
  type:
    | "analyse"
    | "dissertation"
    | "production"
    | "diagnostic"
    | "recommandation"
    | "budget"
    | "planning";
  guidance?: string;
  correction?: string;
}

export interface AnnaleCorrection {
  summary: string;
  keyPoints: string[];
  commonMistakes: string[];
  tips: string[];
}

// ============================================================================
// E1 - CULTURES DE LA COMMUNICATION
// ============================================================================

const e1_2018: Annale = {
  id: "e1-2018-le-breton-securite-routiere",
  year: 2018,
  exam: "e1",
  title: "Le Breton / Sécurité Routière",
  theme: "Le risque et les activités extrêmes dans la communication",
  advertiser: "Sécurité Routière d'Île-de-France (DRIEA)",
  duration: 14400, // 4h
  coefficient: 3,
  parts: [
    {
      id: "e1-2018-p1",
      title: "Partie 1 - Analyse de texte et dissertation",
      points: 8,
      description:
        "Texte de David Le Breton sur la motivation de la recherche du risque chez l'individu. Le Breton évoque le risque comme une opportunité de vivre à contre-courant, de se ressourcer, d'échapper à l'ennui en intensifiant le rapport à l'instant, et comme un chemin de traverse pour reprendre en main une existence livrée au doute ou à la monotonie.",
      documents: [
        "Texte de David Le Breton sur le risque et le memento mori",
      ],
      questions: [
        {
          id: "e1-2018-q1",
          question:
            "Qu'est-ce qui, selon David Le Breton, motive la recherche du risque chez l'individu ?",
          points: 4,
          type: "analyse",
          guidance:
            "Réponse structurée et argumentée, en s'appuyant sur le texte de Le Breton.",
          correction:
            "Selon David Le Breton, ce qui motive la recherche du risque chez un individu, c'est le désir de se sentir vivant, de fuir l'ennui. L'être humain cherche à fuir la monotonie de son existence passive et démontre un besoin d'évasion. Le Breton évoque le terme de « memento mori » (souviens-toi que tu mourras), exprimant que l'individu recherche un instant de vie intense qui lui rappelle que la vie a une fin, retrouvant ainsi une satisfaction à vivre. Les passionnés des activités à risque sont décrits comme des variations sur le thème du memento mori, un rappel de la précarité de l'existence qui est une leçon de bonheur.",
        },
        {
          id: "e1-2018-q2",
          question:
            "Les annonceurs ont-ils intérêt à mettre en scène des expériences extrêmes ou des activités à risques dans leurs campagnes de communication ?",
          points: 4,
          type: "dissertation",
          guidance:
            "Mini-dissertation argumentée avec exemples de campagnes précises, hors sujet présenté. Structure en thèse/antithèse/synthèse.",
          correction:
            "La mise en scène du risque et de l'extrême est un levier puissant pour capter l'attention et créer de l'émotion. Les marques de sport (Red Bull, GoPro) exploitent cette stratégie pour incarner des valeurs de dépassement. Cependant, cette approche comporte des limites : risque d'incitation à des comportements dangereux, rejet par certaines cibles, et tensions éthiques. La synthèse doit montrer que l'usage du risque en communication est pertinent quand il est cohérent avec le positionnement de la marque et maîtrisé dans son expression.",
        },
      ],
    },
    {
      id: "e1-2018-p2",
      title: "Partie 2 - Analyse de campagne et production",
      points: 12,
      description:
        "La Sécurité Routière d'Île-de-France organise la 7e Quinzaine régionale de la Sécurité Routière dédiée aux usagers vulnérables (piétons, cyclistes, deux-roues motorisés). Cette édition se focalise sur les piétons, avec l'objectif de sensibiliser aux dangers des imprudences piétonnes (plus de 4 500 victimes par an en Île-de-France). Le dispositif « Le Simulateur d'impact » est au centre de la campagne.",
      documents: [
        "Affiches de la campagne Sécurité Routière – usagers vulnérables",
        "Descriptif du dispositif « Le Simulateur d'impact »",
        "Données sur les accidents piétons en Île-de-France",
        "Page web de la Sécurité Routière dédiée aux 15-24 ans",
      ],
      questions: [
        {
          id: "e1-2018-q3",
          question:
            "Analysez les procédés visuels et rédactionnels utilisés dans la campagne de la Sécurité Routière pour sensibiliser les usagers vulnérables.",
          points: 4,
          type: "analyse",
          guidance:
            "Analyse détaillée des éléments visuels (composition, couleurs, typographie) et rédactionnels (ton, registre, figures de style) des affiches. Identifier la cible, l'objectif et les moyens de persuasion.",
          correction:
            "Le dispositif « Le simulateur d'impact » et les affiches placent la cible face au risque d'accident en utilisant le principe de la sensibilisation qui vise à changer le comportement du récepteur et touche directement au conatif (amène à l'action). Cette campagne est une communication de masse puisqu'elle vise une audience large et hétérogène, avec des catégories de personnes très différentes représentées sur les affiches.",
        },
        {
          id: "e1-2018-q4",
          question:
            "La Sécurité Routière possède une page dédiée aux 15-24 ans. À l'occasion de la Quinzaine régionale des usagers vulnérables, elle publie un article pour relayer la campagne auprès des jeunes. Rédigez cet article (300 mots maximum) qui présente l'originalité du dispositif « Le Simulateur d'impact » et sensibilise la cible jeune aux imprudences piétonnes.",
          points: 8,
          type: "production",
          guidance:
            "L'article doit être adapté à la cible 15-24 ans (ton, vocabulaire, références), présenter le dispositif de manière engageante, et sensibiliser sans moraliser. Intégrer des éléments visuels ou multimédia jugés nécessaires.",
        },
      ],
    },
  ],
  correction: {
    summary:
      "Le sujet 2018 interroge la place du risque dans la communication, entre fascination et responsabilité. Le texte de Le Breton permet d'explorer la dimension existentielle du risque, tandis que la campagne Sécurité Routière illustre une communication de prévention qui utilise le choc émotionnel pour sensibiliser.",
    keyPoints: [
      "Le memento mori comme motivation profonde de la recherche du risque selon Le Breton",
      "Le risque comme levier de communication : fascination, émotion, dépassement",
      "La distinction entre communication commerciale (valorisation du risque) et communication publique (prévention)",
      "Le dispositif immersif « Simulateur d'impact » comme exemple de communication expérientielle",
    ],
    commonMistakes: [
      "Ne pas distinguer le risque choisi (sports extrêmes) du risque subi (accidents)",
      "Oublier d'analyser les procédés visuels et se limiter au contenu",
      "Rédiger l'article avec un ton trop moralisateur pour la cible 15-24 ans",
      "Ne pas mobiliser d'exemples de campagnes en dehors du sujet pour la dissertation",
    ],
    tips: [
      "Penser à citer des marques comme Red Bull, GoPro, Nike pour illustrer la valorisation du risque",
      "Pour la production, adopter un ton journalistique adapté au web et aux jeunes",
      "Structurer la dissertation : avantages du risque en communication / limites et risques éthiques / conditions de pertinence",
    ],
  },
};

const e1_2019: Annale = {
  id: "e1-2019-tisseron-paraboot",
  year: 2019,
  exam: "e1",
  title: "Tisseron / Paraboot",
  theme: "Les objets, la technique et le symbolique dans la communication",
  advertiser: "Paraboot",
  duration: 14400,
  coefficient: 3,
  parts: [
    {
      id: "e1-2019-p1",
      title: "Partie 1 - Analyse de texte et dissertation",
      points: 8,
      description:
        "Texte de Serge Tisseron sur les objets et le symbolique. Le texte explore comment la mémoire d'une culture est transmise à travers ses objets familiers et ses réalisations technologiques autant que par ses récits, et que toute création d'un objet porte le désir d'incarner dans le monde des sensations, des émotions et des états du corps. Il s'agit de dépasser l'opposition entre « technique » et « symbolique ».",
      documents: ["Texte de Serge Tisseron sur les objets et le symbolique"],
      questions: [
        {
          id: "e1-2019-q1",
          question:
            "Comment Paraboot construit-elle un récit de marque (storytelling) sur son site internet (documents 1, 2 et 3) ? Répondez de façon structurée et argumentée en vous appuyant sur l'analyse des procédés mis en œuvre.",
          points: 4,
          type: "analyse",
          guidance:
            "Identifier les éléments de storytelling : mise en récit du savoir-faire, personnification de la marque, valorisation de l'héritage, utilisation de visuels authentiques.",
          correction:
            "Paraboot construit son storytelling autour de trois axes : l'ancrage historique (« chausseur depuis 1908 »), le savoir-faire artisanal (chaussures cousues main, sélection exigeante des cuirs) et le terroir (ateliers à Saint-Jean-de-Moirans en Isère). Le site utilise des visuels montrant les gestes des artisans, une typographie classique évoquant la tradition, et un vocabulaire sensoriel (toucher du cuir, solidité). Ce récit fait du produit l'incarnation physique de valeurs immatérielles : authenticité, durabilité, excellence française.",
        },
        {
          id: "e1-2019-q2",
          question:
            "« L'être humain ne symbolise pas seulement le monde avec des mots. Il le fait aussi à travers des gestes. » La communication de Paraboot vous semble-t-elle illustrer cette affirmation de Serge Tisseron ?",
          points: 4,
          type: "dissertation",
          guidance:
            "Relier la citation de Tisseron à la communication de Paraboot. Analyser comment les gestes artisanaux deviennent des symboles dans la communication de la marque.",
        },
      ],
    },
    {
      id: "e1-2019-p2",
      title: "Partie 2 - Analyse de campagne et production",
      points: 12,
      description:
        "Paraboot, chausseur depuis 1908, distribué sur plus de 800 points de vente à travers le monde. L'entreprise, dont les ateliers sont installés à Saint-Jean-de-Moirans en Isère, promeut sur son site un savoir-faire artisanal avec des chaussures cousues main et une sélection exigeante de cuirs. Afin de mettre en valeur son savoir-faire auprès des jeunes actifs urbains CSP+, Paraboot est présent sur Instagram.",
      documents: [
        "Document 1 : Pages du site internet Paraboot (présentation de la marque)",
        "Document 2 : Pages du site internet Paraboot (savoir-faire)",
        "Document 3 : Pages du site internet Paraboot (produits)",
        "Document 4 : Compte Instagram Paraboot",
      ],
      questions: [
        {
          id: "e1-2019-q3",
          question:
            "Les annonceurs ont-ils intérêt à mettre en avant les caractéristiques techniques des produits ? Vous répondrez de manière argumentée en vous appuyant sur l'analyse d'exemples précis à l'exclusion de celui présent dans le sujet.",
          points: 4,
          type: "dissertation",
          guidance:
            "Analyser l'opposition entre communication technique et communication émotionnelle/symbolique. Utiliser des exemples variés d'annonceurs.",
        },
        {
          id: "e1-2019-q4",
          question:
            "Paraboot invite un influenceur mode pour une visite en immersion pendant une journée dans l'usine Paraboot de Saint-Jean-de-Moirans, afin d'alimenter le compte Instagram en stories. Concevez deux stories proposées pendant cette journée, présentées sous forme de schéma légendé, en indiquant leurs éléments constitutifs (vidéos, photos, textes, effets et tout moyen propre à l'application). Justifiez l'ensemble de vos choix, en montrant comment vous reprenez certains procédés du site vitrine de la marque afin de maintenir une cohérence.",
          points: 8,
          type: "production",
          guidance:
            "Produire des schémas légendés de stories Instagram. Montrer la cohérence avec l'univers de marque Paraboot. Exploiter les codes d'Instagram (stickers, filtres, sondages, liens swipe-up).",
        },
      ],
    },
  ],
  correction: {
    summary:
      "Ce sujet explore la dimension symbolique des objets dans la communication, à travers le prisme de Paraboot. Le savoir-faire artisanal devient un récit de marque puissant qui transforme un produit technique (une chaussure) en objet culturel porteur de sens.",
    keyPoints: [
      "Le storytelling de marque repose sur trois piliers : histoire, savoir-faire, terroir",
      "La technique n'est pas opposée au symbolique : le geste artisanal est à la fois technique et porteur de sens",
      "Les influenceurs comme relais d'authenticité pour toucher les jeunes actifs CSP+",
      "La cohérence entre le site vitrine et les réseaux sociaux est essentielle",
    ],
    commonMistakes: [
      "Traiter la technique et le symbolique comme deux choses séparées alors que Tisseron montre leur complémentarité",
      "Proposer des stories déconnectées de l'univers de marque Paraboot",
      "Oublier de légendes les schémas des stories",
      "Ne pas exploiter les fonctionnalités spécifiques d'Instagram dans la production",
    ],
    tips: [
      "Penser à Apple, Dyson, Michelin comme exemples de marques qui valorisent la technique",
      "Montrer que le geste de l'artisan dans la story Instagram est à la fois documentaire et symbolique",
      "La cohérence visuelle (palette de couleurs, typographie) entre site et Instagram doit être explicite",
    ],
  },
};

const e1_2020: Annale = {
  id: "e1-2020-saint-maurice-play-doh",
  year: 2020,
  exam: "e1",
  title: "Thibault de Saint Maurice / Play-Doh",
  theme: "L'enfance et son idéalisation dans la communication",
  advertiser: "Play-Doh (Hasbro)",
  duration: 14400,
  coefficient: 3,
  parts: [
    {
      id: "e1-2020-p1",
      title: "Partie 1 - Analyse de texte et dissertation",
      points: 8,
      description:
        "Texte de Thibault de Saint Maurice sur le paradoxe de l'enfance. L'auteur explore l'opposition entre l'état vécu par l'enfant et son idéalisation à l'âge adulte : l'un rêve d'y retourner, l'autre veut en sortir. Il confronte la vision de Descartes (l'enfance comme temps de la dépendance, de l'ignorance et des opinions qui doivent être « surmontées » par la raison) à celle de Nietzsche (l'enfance comme état d'innocence, spontanéité, temps du jeu, contact plus juste avec le monde).",
      documents: [
        "Texte de Thibault de Saint Maurice sur le paradoxe de l'enfance",
      ],
      questions: [
        {
          id: "e1-2020-q1",
          question:
            "Quel est le paradoxe de l'enfance selon Thibault de Saint Maurice ?",
          points: 4,
          type: "analyse",
          guidance:
            "Identifier et expliquer le paradoxe entre la vision de l'enfant et celle de l'adulte. Mobiliser les références à Descartes et Nietzsche.",
          correction:
            "Selon l'auteur, le paradoxe de l'enfance tient à l'opposition entre l'état vécu par l'enfant et son idéalisation à l'âge adulte. L'adulte rêve de retourner en enfance tandis que l'enfant rêve d'en sortir. Descartes voit l'enfance comme un temps de dépendance et d'ignorance à dépasser par la raison. Nietzsche, au contraire, la définit comme un état d'innocence lié à la spontanéité, le temps du jeu, et d'un contact plus juste avec le monde. Ce paradoxe est au cœur des représentations culturelles et publicitaires de l'enfance.",
        },
        {
          id: "e1-2020-q2",
          question:
            "Les campagnes de communication ont-elles intérêt à ne donner qu'une vision idéalisée de l'enfance ?",
          points: 4,
          type: "dissertation",
          guidance:
            "Mini-dissertation argumentée avec des exemples de campagnes. Analyser les avantages et limites de l'idéalisation de l'enfance en publicité.",
          correction:
            "Les campagnes de communication ont intérêt à donner une vision idéalisée de l'enfance car elles choisissent un axe porteur qui s'inscrit dans des stéréotypes forts. L'idéalisation de l'enfant permet aux annonceurs de toucher une cible adulte en faisant appel à ses émotions et en mobilisant ses tendances à la nostalgie et à la régression. Cependant, cette vision exclusive présente des limites : elle peut exclure des réalités (enfance difficile, pauvreté), créer un décalage avec les consommateurs, et apparaître comme manipulatrice. Certaines campagnes contemporaines osent une représentation plus nuancée de l'enfance (UNICEF, associations caritatives).",
        },
      ],
    },
    {
      id: "e1-2020-p2",
      title: "Partie 2 - Analyse de campagne et production",
      points: 12,
      description:
        "Campagne Play-Doh (Hasbro) exploitant l'univers de l'enfance, la créativité et le jeu. Play-Doh utilise l'imaginaire enfantin pour promouvoir ses produits de pâte à modeler auprès des familles.",
      documents: [
        "Campagne publicitaire Play-Doh",
        "Visuels et posts sur les réseaux sociaux Play-Doh",
        "Données sur le marché du jouet et des activités créatives",
      ],
      questions: [
        {
          id: "e1-2020-q3",
          question:
            "Analysez les procédés visuels et rédactionnels utilisés par Play-Doh pour mettre en scène l'enfance dans sa communication.",
          points: 4,
          type: "analyse",
          guidance:
            "Identifier les choix de couleurs, de mise en scène, de ton, et les valeurs véhiculées. Relier à la vision idéalisée de l'enfance du texte.",
        },
        {
          id: "e1-2020-q4",
          question:
            "Concevez un support de communication pour Play-Doh destiné à promouvoir la créativité enfantine.",
          points: 8,
          type: "production",
          guidance:
            "Production créative cohérente avec l'univers Play-Doh, adaptée à la cible parents-enfants.",
        },
      ],
    },
  ],
  correction: {
    summary:
      "Le sujet 2020 explore l'idéalisation de l'enfance dans la communication publicitaire. Le texte philosophique de Saint Maurice permet de comprendre le paradoxe entre le vécu de l'enfant et la nostalgie de l'adulte, que la publicité exploite abondamment.",
    keyPoints: [
      "Le paradoxe enfance vécue vs enfance idéalisée est au cœur des stratégies publicitaires",
      "La nostalgie comme levier émotionnel puissant pour les marques ciblant les familles",
      "Descartes vs Nietzsche : deux visions de l'enfance mobilisables dans l'analyse",
      "La tendance actuelle à montrer une enfance plus réaliste (body positive, diversité) sans abandonner l'idéalisation",
    ],
    commonMistakes: [
      "Confondre le paradoxe de l'enfance avec une simple opposition enfant/adulte",
      "Ne pas mobiliser Descartes et Nietzsche dans l'analyse du texte",
      "Se limiter aux marques de jouets sans élargir aux autres secteurs utilisant l'enfance",
      "Oublier que la production doit cibler à la fois les parents et les enfants",
    ],
    tips: [
      "Exemples utiles : Kinder, Petit Bateau, Evian (bébés), UNICEF, campagnes anti-maltraitance",
      "La dissertation doit absolument nuancer l'idéalisation : montrer ses avantages ET ses limites",
      "Pour la production, penser au digital (réseaux sociaux, contenu interactif) adapté aux familles",
    ],
  },
};

const e1_2021: Annale = {
  id: "e1-2021-cohen-slip-francais",
  year: 2021,
  exam: "e1",
  title: "Albert Cohen / Le Slip Français",
  theme: "La représentation du corps dans la communication",
  advertiser: "Le Slip Français",
  duration: 14400,
  coefficient: 3,
  parts: [
    {
      id: "e1-2021-p1",
      title: "Partie 1 - Analyse de texte et dissertation",
      points: 8,
      description:
        "Texte d'Albert Cohen extrait de « Belle du Seigneur » : Ariane est chez elle et attend Solal. C'est leur premier rendez-vous amoureux. L'auteur s'est attaché à restituer le monologue intérieur d'Ariane, parfois au prix d'entorses à la syntaxe. Le texte explore la préparation du corps pour le regard de l'autre.",
      documents: [
        "Texte d'Albert Cohen, extrait de Belle du Seigneur (monologue intérieur d'Ariane)",
      ],
      questions: [
        {
          id: "e1-2021-q1",
          question:
            "Comment Albert Cohen montre-t-il, à travers le monologue intérieur d'Ariane, la place du corps dans la construction de l'image de soi ?",
          points: 4,
          type: "analyse",
          guidance:
            "Analyser les procédés littéraires (monologue intérieur, rythme, lexique du corps) et montrer comment le texte illustre la mise en scène de soi pour le regard d'autrui.",
          correction:
            "Cohen utilise le monologue intérieur pour plonger le lecteur dans les pensées d'Ariane qui se prépare pour Solal. Le flux de conscience, les phrases courtes et l'accumulation des détails corporels (vêtements, postures, gestes de beauté) montrent que le corps est à la fois un objet de travail et un support d'expression identitaire. La préparation physique d'Ariane est une mise en scène de soi destinée au regard de l'autre, préfigurant les mécanismes de la publicité moderne.",
        },
        {
          id: "e1-2021-q2",
          question:
            "La publicité a-t-elle intérêt à présenter une image idéalisée du corps ou à montrer des corps réels ?",
          points: 4,
          type: "dissertation",
          guidance:
            "Mini-dissertation avec exemples de campagnes. Analyser la tension entre idéalisation et authenticité dans la représentation du corps en publicité.",
          correction:
            "La publicité avait la réputation de présenter un monde merveilleux, dans lequel le consommateur vivait un bonheur absolu grâce au produit. Cette idéalisation s'étendait à la représentation du corps. Cependant, cette tendance est remise en question car ce décalage avec la réalité est critiqué et jugé néfaste pour l'estime de soi des consommateurs. Des marques comme Dove (« Real Beauty »), Le Slip Français ou Aerie ont fait le choix de montrer des corps réels, diversifiés, non retouchés. Cette approche body positive renforce l'authenticité et la proximité avec les consommateurs. Néanmoins, certains secteurs (luxe, parfum) continuent d'utiliser l'idéalisation avec succès.",
        },
      ],
    },
    {
      id: "e1-2021-p2",
      title: "Partie 2 - Analyse de campagne et production",
      points: 12,
      description:
        "Le Slip Français, entreprise créée en 2011, met en avant le « fabriqué en France » pour valoriser le savoir-faire français. Sa communication se déroule majoritairement via les réseaux sociaux, sur un ton décalé. Spécialisée dans les sous-vêtements, l'entreprise élargit sa gamme aux maillots de bain et prêt-à-porter. Les produits sont identifiés par des prénoms (Yann, Jean, Marius...). Pour l'été, elle lance une collection de maillots de bain recyclés et décomplexés avec le mot d'ordre : « la mode, c'est vous qui la faites ».",
      documents: [
        "Posts publiés sur la page Facebook du Slip Français",
        "Visuels de la campagne maillots de bain « décomplexés »",
        "Page du site e-commerce Le Slip Français",
        "Données sur la marque et son positionnement Made in France",
      ],
      questions: [
        {
          id: "e1-2021-q3",
          question:
            "Par quels procédés visuels et rédactionnels Le Slip Français parvient-il à concilier un positionnement « Made in France » premium et une communication décalée et inclusive sur les réseaux sociaux ?",
          points: 4,
          type: "analyse",
          guidance:
            "Analyser les choix de tonalité (humour, décalage), les visuels (diversité des corps, couleurs), et la cohérence entre le positionnement premium et l'accessibilité du ton.",
        },
        {
          id: "e1-2021-q4",
          question:
            "Concevez un post Facebook pour le lancement de la collection de maillots de bain recyclés et décomplexés du Slip Français, en respectant le ton et l'univers de la marque.",
          points: 8,
          type: "production",
          guidance:
            "Le post doit refléter l'ADN de la marque (humour, décalage, inclusivité, made in France) tout en mettant en avant la dimension éco-responsable (recyclé) et body positive (décomplexé). Inclure texte + visuel décrit.",
        },
      ],
    },
  ],
  correction: {
    summary:
      "Le sujet 2021 interroge la représentation du corps en communication, entre idéalisation et authenticité. Le texte de Cohen illustre la mise en scène de soi pour autrui, tandis que Le Slip Français incarne la tendance body positive et le « made in France » décalé.",
    keyPoints: [
      "Le monologue intérieur de Cohen comme miroir des mécanismes publicitaires",
      "La tension idéalisation/authenticité dans la représentation du corps",
      "Le body positive comme tendance de fond en communication (Dove, Aerie, Le Slip Français)",
      "Le ton décalé comme levier de différenciation et d'inclusivité",
      "Le Made in France comme argument de storytelling et de valorisation",
    ],
    commonMistakes: [
      "Ne pas faire le lien entre le texte littéraire et la problématique publicitaire",
      "Oublier la dimension éco-responsable (recyclé) dans la production",
      "Adopter un ton sérieux et institutionnel incompatible avec l'univers du Slip Français",
      "Ignorer la diversité des corps dans le visuel proposé",
    ],
    tips: [
      "Citer Dove « Real Beauty », Aerie, Desigual comme exemples de body positive en publicité",
      "Le texte de Cohen est riche en procédés littéraires : les identifier (accumulation, flux de conscience, lexique corporel)",
      "Pour la production, le ton doit être humoristique et inclusif, à l'image des posts réels du Slip Français",
    ],
  },
};

const e1_2022: Annale = {
  id: "e1-2022-ernaux-lexus",
  year: 2022,
  exam: "e1",
  title: "Annie Ernaux / Lexus",
  theme: "L'art et la distinction sociale dans la communication",
  advertiser: "Lexus",
  duration: 14400,
  coefficient: 3,
  parts: [
    {
      id: "e1-2022-p1",
      title: "Partie 1 - Analyse de texte et dissertation",
      points: 8,
      description:
        "Texte évoquant les théories de Pierre Bourdieu sur la distinction sociale par le goût et la culture. « Le goût classe et classe celui qui classe » : les logiques de légitimation des différences sociales par l'art. Le texte est en lien avec Annie Ernaux et son exploration des mécanismes de distinction sociale.",
      documents: [
        "Texte sur la distinction sociale, le goût et la culture (référence à Bourdieu et Ernaux)",
      ],
      questions: [
        {
          id: "e1-2022-q1",
          question:
            "En quoi le texte montre-t-il que l'art est un marqueur de distinction sociale ?",
          points: 4,
          type: "analyse",
          guidance:
            "Mobiliser les concepts de Bourdieu (capital culturel, habitus, distinction) et montrer comment le texte illustre les mécanismes de légitimation sociale par l'art.",
        },
        {
          id: "e1-2022-q2",
          question:
            "Dans les campagnes de communication actuelles, les annonceurs ont-ils intérêt à utiliser des références artistiques ?",
          points: 4,
          type: "dissertation",
          guidance:
            "Mini-dissertation avec exemples de campagnes utilisant l'art (hors sujet). Analyser les avantages (valorisation, distinction, légitimité culturelle) et les limites (élitisme, exclusion).",
          correction:
            "L'utilisation de références artistiques dans la communication permet de conférer au produit une aura de prestige et de légitimité culturelle. Des marques comme Louis Vuitton (collaborations avec Jeff Koons), Absolut Vodka (éditions artistes) ou BMW utilisent l'art pour se distinguer. Cependant, cette stratégie comporte des risques : instrumentalisation de l'art, perception élitiste, incompréhension par certaines cibles. La synthèse doit montrer que les références artistiques sont pertinentes quand elles sont cohérentes avec le positionnement de la marque et accessibles à la cible visée.",
        },
      ],
    },
    {
      id: "e1-2022-p2",
      title: "Partie 2 - Analyse de campagne et production",
      points: 12,
      description:
        "Lexus lance une campagne intitulée « L'art de se distinguer » conçue pour mettre en scène un nouveau Lexus dans une ville habitée par des chefs-d'œuvre de l'histoire de l'art. La campagne associe le véhicule à des œuvres d'art majeures pour illustrer sa signature « L'art de se distinguer ».",
      documents: [
        "Film publicitaire Lexus « L'art de se distinguer »",
        "Visuels de la campagne Lexus avec chefs-d'œuvre artistiques",
        "Données sur le positionnement premium de Lexus",
        "Informations sur le marché automobile premium",
      ],
      questions: [
        {
          id: "e1-2022-q3",
          question:
            "Par quels moyens la campagne Lexus transforme-t-elle l'achat du produit en une expérience de distinction liée à l'art ?",
          points: 4,
          type: "analyse",
          guidance:
            "Analyser les procédés visuels (mise en scène, cadrage, références artistiques), le message (signature, valeurs) et la stratégie de positionnement premium.",
        },
        {
          id: "e1-2022-q4",
          question:
            "Concevez un support de communication pour Lexus qui associe le véhicule à une expérience culturelle ou artistique.",
          points: 8,
          type: "production",
          guidance:
            "Production cohérente avec le positionnement premium et la signature « L'art de se distinguer ». Le support doit montrer la capacité à transposer les codes artistiques dans un univers automobile.",
        },
      ],
    },
  ],
  correction: {
    summary:
      "Le sujet 2022 explore l'utilisation de l'art comme outil de distinction sociale dans la communication, en s'appuyant sur les théories de Bourdieu et l'œuvre d'Ernaux. La campagne Lexus illustre comment une marque premium mobilise les références artistiques pour légitimer son positionnement haut de gamme.",
    keyPoints: [
      "Le concept de distinction sociale de Bourdieu appliqué à la communication publicitaire",
      "L'art comme capital culturel transférable à la marque",
      "La campagne Lexus comme exemple d'association produit-culture pour le positionnement premium",
      "La tension entre démocratisation de l'art et stratégie de distinction élitiste",
    ],
    commonMistakes: [
      "Ne pas mobiliser les concepts sociologiques de Bourdieu",
      "Se limiter à des exemples de marques de luxe dans la dissertation",
      "Produire un support trop classique sans réelle dimension artistique",
      "Confondre distinction sociale et simple prestige de marque",
    ],
    tips: [
      "Exemples de marques utilisant l'art : Louis Vuitton x Jeff Koons, Absolut Vodka, Uniqlo x MoMA, BMW Art Cars",
      "Évoquer aussi les contre-exemples : marques populaires qui utilisent le street art (Adidas, Nike)",
      "Pour la production, proposer un concept original (exposition éphémère, collaboration artiste, contenu immersif)",
    ],
  },
};

const e1_2023_metropole: Annale = {
  id: "e1-2023-galluzo-naturalia",
  year: 2023,
  exam: "e1",
  title: "Galluzo / Naturalia",
  theme: "La marque et la consommation responsable",
  advertiser: "Naturalia",
  duration: 14400,
  coefficient: 3,
  parts: [
    {
      id: "e1-2023-p1",
      title: "Partie 1 - Analyse de texte et dissertation",
      points: 8,
      description:
        "Texte de Galluzo sur la marque comme transfert de responsabilité : l'acheteur n'a plus pour rôle d'évaluer le produit a priori par un travail d'appréhension sensorielle, il va désormais acheter, essayer, puis se fixer et reconduire son achat. La marque fonctionne comme une garantie qui décharge le consommateur de l'effort de jugement.",
      documents: [
        "Texte de Galluzo sur la marque comme transfert de responsabilité",
      ],
      questions: [
        {
          id: "e1-2023-q1",
          question:
            "En quoi la marque constitue-t-elle, selon Galluzo, un transfert de responsabilité pour le consommateur ?",
          points: 4,
          type: "analyse",
          guidance:
            "Expliquer le mécanisme décrit par Galluzo : la marque remplace l'évaluation sensorielle directe du produit par la confiance. Le consommateur délègue son jugement à la marque.",
        },
        {
          id: "e1-2023-q2",
          question:
            "Dans un contexte de consommation responsable, les consommateurs font-ils toujours confiance aux marques pour orienter leurs choix ?",
          points: 4,
          type: "dissertation",
          guidance:
            "Analyser la confiance et la méfiance envers les marques, le greenwashing, le rôle des labels, la montée de la consommation engagée. Exemples précis hors sujet.",
        },
      ],
    },
    {
      id: "e1-2023-p2",
      title: "Partie 2 - Analyse de campagne et production",
      points: 12,
      description:
        "Naturalia, enseigne de distribution spécialisée dans les produits biologiques et naturels, développe une campagne de communication autour de la consommation responsable et de la confiance dans les produits bio.",
      documents: [
        "Campagne publicitaire Naturalia",
        "Visuels et supports de communication Naturalia",
        "Données sur le marché du bio en France",
        "Informations sur le positionnement de Naturalia",
      ],
      questions: [
        {
          id: "e1-2023-q3",
          question:
            "Comment Naturalia construit-elle la confiance du consommateur dans sa communication ?",
          points: 4,
          type: "analyse",
          guidance:
            "Analyser les procédés visuels (naturalité, transparence) et rédactionnels (promesses, engagements) utilisés par Naturalia pour inspirer confiance.",
        },
        {
          id: "e1-2023-q4",
          question:
            "Concevez un support de communication pour Naturalia qui renforce la confiance des consommateurs envers la marque et ses engagements bio.",
          points: 8,
          type: "production",
          guidance:
            "Le support doit incarner la transparence, l'authenticité et l'engagement environnemental de Naturalia. Adapté à la cible de consommateurs bio responsables.",
        },
      ],
    },
  ],
  correction: {
    summary:
      "Le sujet 2023 (Métropole) interroge le rôle de la marque comme système de confiance et de transfert de responsabilité, dans un contexte de consommation responsable et de méfiance croissante envers le greenwashing.",
    keyPoints: [
      "La marque comme substitut au jugement sensoriel direct du consommateur (Galluzo)",
      "La crise de confiance envers les marques dans le contexte du greenwashing",
      "Les labels et certifications comme outils de réassurance",
      "La transparence comme nouvelle exigence des consommateurs responsables",
    ],
    commonMistakes: [
      "Confondre marque et label de certification",
      "Ignorer le phénomène de greenwashing dans la dissertation",
      "Proposer une production trop générique sans ancrage dans les valeurs bio de Naturalia",
      "Ne pas évoquer la tension entre marque-confiance et marque-manipulation",
    ],
    tips: [
      "Exemples pertinents : Yuka (application de notation), Patagonia (transparence), Nutri-Score, labels AB/Ecocert",
      "Évoquer le concept de « désintermédiation » : le consommateur veut vérifier par lui-même",
      "Pour la production, la transparence peut se manifester par la traçabilité, les témoignages producteurs, les données vérifiables",
    ],
  },
};

const e1_2023_nc: Annale = {
  id: "e1-2023-nc-baudelaire-lacoste",
  year: 2023,
  exam: "e1",
  title: "Baudelaire / Lacoste (Nouvelle-Calédonie)",
  theme: "Le dandysme et la valorisation du consommateur par le produit",
  advertiser: "Lacoste",
  duration: 14400,
  coefficient: 3,
  parts: [
    {
      id: "e1-2023-nc-p1",
      title: "Partie 1 - Analyse de texte et dissertation",
      points: 8,
      description:
        "Texte de Charles Baudelaire sur le dandysme. Le texte explore la figure du dandy comme incarnation d'un idéal esthétique et social, mêlant élégance, distinction et rapport particulier au vêtement.",
      documents: [
        "Texte de Charles Baudelaire sur le dandy et le dandysme",
      ],
      questions: [
        {
          id: "e1-2023-nc-q1",
          question: "Qu'est-ce qu'un dandy selon Baudelaire ?",
          points: 4,
          type: "analyse",
          guidance:
            "Définir le dandy baudelairien : distinction, élégance, rapport à l'apparence, refus de la vulgarité, quête d'un idéal esthétique.",
        },
        {
          id: "e1-2023-nc-q2",
          question:
            "Dans les campagnes actuelles, est-il toujours pertinent pour les annonceurs d'associer la qualité du produit et la valorisation du consommateur ?",
          points: 4,
          type: "dissertation",
          guidance:
            "Analyser comment les marques associent le produit à une valorisation identitaire du consommateur. Exemples précis à l'exclusion du sujet.",
        },
      ],
    },
    {
      id: "e1-2023-nc-p2",
      title: "Partie 2 - Analyse de campagne et production",
      points: 12,
      description:
        "Lacoste lance la campagne « Timeless » (Intemporel) conçue par l'agence BETC. Un film de 30 secondes diffusé en digital met en scène René Lacoste, surnommé « Le crocodile », champion de tennis des années 1920, et la nouvelle égérie Novak Djokovic. René Lacoste est l'inventeur du polo à manches courtes et le créateur en 1933 de la marque.",
      documents: [
        "Film publicitaire Lacoste « Timeless » (30 secondes, digital)",
        "Visuels de la campagne avec René Lacoste et Novak Djokovic",
        "Histoire de la marque Lacoste et de René Lacoste",
        "Données sur le positionnement de Lacoste et le marché du sportswear premium",
      ],
      questions: [
        {
          id: "e1-2023-nc-q3",
          question:
            "Comment la campagne « Timeless » de Lacoste utilise-t-elle l'héritage de la marque pour construire un récit intemporel ?",
          points: 4,
          type: "analyse",
          guidance:
            "Analyser le storytelling : confrontation passé/présent, figure du fondateur, égérie contemporaine, notion d'intemporalité. Identifier les procédés visuels et narratifs du film.",
        },
        {
          id: "e1-2023-nc-q4",
          question:
            "Concevez un support de communication digital pour Lacoste qui valorise l'héritage de la marque tout en s'adressant à une cible jeune et connectée.",
          points: 8,
          type: "production",
          guidance:
            "Le support doit concilier héritage historique et modernité digitale. Cible : 18-35 ans connectés. Exploiter les codes des réseaux sociaux ou du digital.",
        },
      ],
    },
  ],
  correction: {
    summary:
      "Le sujet NC 2023 explore le dandysme baudelairien et son écho dans la communication contemporaine, à travers la campagne « Timeless » de Lacoste qui joue sur l'héritage historique et l'intemporalité pour valoriser le consommateur.",
    keyPoints: [
      "Le dandy baudelairien comme figure fondatrice de la valorisation de soi par le vêtement",
      "L'association produit-valorisation du consommateur comme mécanisme publicitaire fondamental",
      "Le storytelling d'héritage (heritage marketing) comme stratégie de différenciation premium",
      "La campagne « Timeless » comme exemple de pont entre passé et modernité",
    ],
    commonMistakes: [
      "Réduire le dandysme à la simple élégance vestimentaire",
      "Ne pas faire le lien entre Baudelaire et les mécanismes publicitaires contemporains",
      "Ignorer la dimension digitale dans la production",
      "Proposer un support qui ne s'adresse pas vraiment à une cible jeune",
    ],
    tips: [
      "Penser aux marques qui utilisent le heritage marketing : Hermès, Chanel, Levi's, Converse",
      "Le film « Timeless » joue sur le temps : l'analyser comme un récit cinématographique",
      "Pour la production digitale, exploiter les formats TikTok, Instagram Reels, filtres AR",
    ],
  },
};

// ============================================================================
// E5 - ACTIVITÉS DE COMMUNICATION
// ============================================================================

const e5_2018: Annale = {
  id: "e5-2018",
  year: 2018,
  exam: "e5",
  title: "Épreuve E5 - Activités de communication 2018",
  theme: "Cas pratique professionnel – étude de cas annonceur",
  duration: 14400,
  coefficient: 4,
  parts: [
    {
      id: "e5-2018-d1",
      title: "Dossier 1 - Analyse de la situation de communication",
      points: 20,
      description:
        "Le sujet comprend quatre dossiers pouvant être traités de façon indépendante. Cas réel simplifié et adapté pour les besoins de l'épreuve. L'étudiant est placé en situation professionnelle chez un annonceur ou en agence.",
      questions: [
        {
          id: "e5-2018-q1",
          question:
            "Réalisez un diagnostic de communication de l'annonceur en vous appuyant sur les documents fournis.",
          points: 5,
          type: "diagnostic",
          guidance:
            "Structurer le diagnostic : forces/faiblesses de la communication actuelle, opportunités/menaces de l'environnement. Utiliser le modèle SWOT.",
        },
        {
          id: "e5-2018-q2",
          question:
            "Identifiez les cibles de communication et justifiez la segmentation proposée.",
          points: 5,
          type: "analyse",
          guidance:
            "Distinguer cible principale, cible secondaire, cœur de cible. Caractériser chaque segment.",
        },
        {
          id: "e5-2018-q3",
          question:
            "Proposez un plan de communication en réponse à la problématique identifiée.",
          points: 5,
          type: "recommandation",
          guidance:
            "Définir les objectifs (cognitifs, affectifs, conatifs), les messages clés, les moyens de communication et le calendrier.",
        },
        {
          id: "e5-2018-q4",
          question:
            "Établissez le budget prévisionnel de la campagne proposée.",
          points: 5,
          type: "budget",
          guidance:
            "Chiffrer les différents postes de dépenses, justifier les choix budgétaires.",
        },
      ],
    },
  ],
  correction: {
    summary:
      "L'épreuve E5 2018 évalue la capacité à diagnostiquer une situation de communication, proposer un plan cohérent et le budgétiser. Le cas est tiré d'un annonceur réel.",
    keyPoints: [
      "Le diagnostic SWOT doit être précis et étayé par les documents",
      "Les cibles doivent être caractérisées avec des critères socio-démographiques et psychographiques",
      "Le plan de communication doit être réaliste et cohérent avec le diagnostic",
      "Le budget doit être détaillé par poste et justifié",
    ],
    commonMistakes: [
      "Diagnostic trop superficiel, non étayé par les documents",
      "Confusion entre objectifs de communication et objectifs marketing",
      "Plan de communication sans calendrier ni planning",
      "Budget non détaillé ou irréaliste",
    ],
    tips: [
      "Toujours rattacher le diagnostic aux documents annexes du sujet",
      "Distinguer les 3 niveaux d'objectifs : cognitif, affectif, conatif",
      "Le budget doit inclure les frais de création, de production et de diffusion",
    ],
  },
};

const e5_2019: Annale = {
  id: "e5-2019-privatesportshop",
  year: 2019,
  exam: "e5",
  title: "Private Sport Shop",
  theme: "Le sport féminin et la participation à un salon professionnel",
  advertiser: "Privatesportshop",
  duration: 14400,
  coefficient: 4,
  parts: [
    {
      id: "e5-2019-d1",
      title: "Dossier 1 - Diagnostic et veille",
      points: 5,
      description:
        "Le cas porte sur l'entreprise Privatesportshop, spécialisée dans la vente privée d'articles de sport. Le responsable s'interroge sur l'opportunité d'aborder le segment du sport féminin, marché en pleine croissance. Le sujet comprend quatre dossiers pouvant être traités de façon indépendante. 16 pages.",
      documents: [
        "Données sur le marché du sport féminin en France",
        "Présentation de Privatesportshop et de son positionnement",
        "Analyse de la concurrence (Intersport « Girl Power », ventes privées concurrentes)",
        "Informations sur le salon SISAF",
      ],
      questions: [
        {
          id: "e5-2019-q1",
          question:
            "Pourquoi le sport féminin est-il un segment porteur pour Privatesportshop ? Justifiez votre analyse à partir des documents.",
          points: 5,
          type: "diagnostic",
          guidance:
            "Analyser le marché du sport féminin (croissance, tendances), identifier les opportunités pour Privatesportshop, évaluer la concurrence.",
        },
      ],
    },
    {
      id: "e5-2019-d2",
      title: "Dossier 2 - Stratégie de communication",
      points: 5,
      description:
        "Privatesportshop envisage de participer au salon SISAF pour aborder le segment du sport féminin.",
      questions: [
        {
          id: "e5-2019-q2",
          question:
            "Justifiez l'intérêt pour Privatesportshop de participer au salon SISAF pour toucher la cible féminine.",
          points: 5,
          type: "recommandation",
          guidance:
            "Analyser les avantages d'une participation à un salon professionnel : visibilité, contacts B2B, rencontres cibles, crédibilité. Évaluer la pertinence du SISAF.",
        },
      ],
    },
    {
      id: "e5-2019-d3",
      title: "Dossier 3 - Plan de communication",
      points: 5,
      description:
        "Élaboration du plan de communication autour de la participation au salon.",
      questions: [
        {
          id: "e5-2019-q3",
          question:
            "Proposez un plan de communication pour accompagner la participation de Privatesportshop au salon SISAF.",
          points: 5,
          type: "planning",
          guidance:
            "Structurer le plan en trois phases : avant le salon (teasing, invitations), pendant le salon (stand, animations, relais digital), après le salon (follow-up, retombées). Inclure un rétroplanning.",
        },
      ],
    },
    {
      id: "e5-2019-d4",
      title: "Dossier 4 - Droit et budget",
      points: 5,
      description:
        "Questions de droit de la communication et de gestion budgétaire.",
      questions: [
        {
          id: "e5-2019-q4",
          question:
            "Identifiez les contraintes juridiques liées à la campagne de communication envisagée et établissez un budget prévisionnel.",
          points: 5,
          type: "budget",
          guidance:
            "Identifier les aspects juridiques (droit à l'image, RGPD, mentions légales). Chiffrer le budget de participation au salon et de la campagne associée.",
        },
      ],
    },
  ],
  correction: {
    summary:
      "L'épreuve E5 2019 porte sur Privatesportshop et l'opportunité d'investir le segment du sport féminin via la participation au salon SISAF. Le candidat doit démontrer sa capacité à analyser un marché, concevoir une stratégie événementielle et la budgétiser.",
    keyPoints: [
      "Le marché du sport féminin est en croissance : Intersport « Girl Power » est un indicateur",
      "La participation à un salon professionnel est un levier B2B et B2C",
      "Le plan de communication doit couvrir les trois phases : avant, pendant, après le salon",
      "Le budget doit inclure stand, logistique, supports de communication, animations",
    ],
    commonMistakes: [
      "Ne pas exploiter les données chiffrées sur le marché féminin",
      "Oublier la phase « après salon » dans le plan de communication",
      "Ignorer les aspects juridiques (droit à l'image sur le stand, RGPD)",
      "Budget incomplet : oublier les frais de personnel, de déplacement ou de logistique",
    ],
    tips: [
      "Structurer le diagnostic avec un SWOT clair",
      "Pour le salon, penser à l'expérience visiteur sur le stand",
      "Le digital doit être intégré comme relais du présentiel (live, stories, hashtag dédié)",
    ],
  },
};

const e5_2020: Annale = {
  id: "e5-2020-grand-raid-ilop",
  year: 2020,
  exam: "e5",
  title: "Grand Raid / Agence ILOP Sport (Nouvelle-Calédonie)",
  theme:
    "Communication événementielle sportive et stratégie digitale",
  advertiser: "Association du Grand Raid (La Réunion) / Agence ILOP Sport",
  duration: 14400,
  coefficient: 4,
  parts: [
    {
      id: "e5-2020-d1",
      title: "Dossier 1 - Communication digitale et réseaux sociaux",
      points: 7,
      description:
        "L'agence ILOP Sport, implantée à La Réunion, est l'agence conseil de l'association du Grand Raid depuis 2002. Elle conçoit et met en œuvre le plan de communication de la course. Le candidat est assistant(e) chef(fe) de projet junior au sein de l'agence ILOP Sport et doit préparer la communication de l'édition 2021. Le sujet comprend trois dossiers pouvant être traités de façon indépendante.",
      documents: [
        "Présentation de l'association du Grand Raid et de l'agence ILOP Sport",
        "Données sur la fréquentation des réseaux sociaux du Grand Raid",
        "Statistiques des capsules vidéo YouTube et Facebook",
        "Informations sur le budget de communication et les sponsors",
      ],
      questions: [
        {
          id: "e5-2020-q1",
          question:
            "Valorisez l'efficacité des capsules vidéo (nombre de visionnages) et proposez des axes d'optimisation pour la communication digitale de l'édition 2021.",
          points: 7,
          type: "recommandation",
          guidance:
            "Analyser les KPI des capsules vidéo (vues, engagement, partages). Proposer des améliorations : contenu, fréquence, formats, collaborations influenceurs, SEO YouTube. Les vidéos sont hébergées sur YouTube, diffusées sur le site du Grand Raid et publiées sur Facebook.",
        },
      ],
    },
    {
      id: "e5-2020-d2",
      title: "Dossier 2 - Relations presse et couverture médiatique",
      points: 7,
      description:
        "Préparer la communication de l'édition 2021 en obtenant une large couverture médiatique.",
      questions: [
        {
          id: "e5-2020-q2",
          question:
            "Réalisez une veille média qui aboutira à la constitution de la revue de presse de l'édition 2021 du Grand Raid. Proposez un plan media relations pour optimiser la couverture médiatique.",
          points: 7,
          type: "recommandation",
          guidance:
            "Identifier les médias cibles (presse sport, presse locale, médias digitaux). Définir les actions RP : communiqué de presse, conférence de presse, dossier de presse, accréditations journalistes. Organiser la veille.",
        },
      ],
    },
    {
      id: "e5-2020-d3",
      title: "Dossier 3 - Partenariats et sponsoring",
      points: 6,
      description:
        "ILOP Sport est chargée de la prospection et de la fidélisation du réseau de partenaires (sponsors), dont les apports financiers et en nature sont indispensables pour équilibrer le budget de la compétition.",
      questions: [
        {
          id: "e5-2020-q3",
          question:
            "Proposez une stratégie de fidélisation et de prospection des sponsors pour l'édition 2021 du Grand Raid.",
          points: 6,
          type: "recommandation",
          guidance:
            "Distinguer fidélisation des sponsors existants et prospection de nouveaux partenaires. Proposer des contreparties attractives, des outils de suivi de la relation sponsor, et un argumentaire de prospection.",
        },
      ],
    },
  ],
  correction: {
    summary:
      "L'épreuve E5 2020 (NC) place le candidat en agence de communication sportive à La Réunion. Il doit optimiser la communication digitale du Grand Raid, organiser les relations presse et fidéliser les sponsors.",
    keyPoints: [
      "Les capsules vidéo sont un outil clé de la communication du Grand Raid",
      "La couverture médiatique nécessite un plan RP structuré",
      "Le sponsoring est vital pour l'équilibre budgétaire de l'événement",
      "Le digital est central dans la stratégie de communication événementielle sportive",
    ],
    commonMistakes: [
      "Ne pas analyser les KPI avant de proposer des optimisations",
      "Oublier la dimension locale (médias réunionnais) dans le plan RP",
      "Proposer des contreparties sponsors génériques sans les adapter au contexte sportif",
      "Négliger le lien entre communication digitale et couverture médiatique",
    ],
    tips: [
      "Les KPI à analyser : vues, taux d'engagement, partages, commentaires, temps de visionnage",
      "Penser aux médias spécialisés trail/running (Trails Endurance Magazine, etc.)",
      "Les contreparties sponsors peuvent inclure : visibilité sur les supports, accès VIP, contenu co-brandé",
    ],
  },
};

const e5_2021: Annale = {
  id: "e5-2021-cdt-tarn",
  year: 2021,
  exam: "e5",
  title: "Comité Départemental du Tourisme du Tarn (CDT Tarn)",
  theme:
    "Communication touristique territoriale et développement digital",
  advertiser: "Comité Départemental du Tourisme du Tarn",
  duration: 14400,
  coefficient: 4,
  parts: [
    {
      id: "e5-2021-d1",
      title:
        "Dossier 1 - Diagnostic de communication et analyse du contexte",
      points: 7,
      description:
        "Le candidat est placé en situation d'assistant de communication au sein du Comité du tourisme du Tarn. Le sujet comprend trois dossiers pouvant être traités de façon indépendante. Contexte : avec près de 66%, le taux de départ des Français en vacances a été record en 2018, la hausse s'expliquant par un essor des courts-séjours.",
      documents: [
        "Données sur le tourisme dans le Tarn et en France",
        "Présentation du CDT Tarn et de ses missions",
        "Supports de communication existants du CDT Tarn",
        "Statistiques de fréquentation touristique",
        "Données sur l'essor des courts-séjours",
      ],
      questions: [
        {
          id: "e5-2021-q1",
          question:
            "Réalisez un diagnostic de la communication du CDT Tarn en identifiant les forces, faiblesses, opportunités et menaces.",
          points: 7,
          type: "diagnostic",
          guidance:
            "Structurer en SWOT. Analyser la communication existante (supports, canaux, messages) et le contexte touristique (croissance des courts-séjours, concurrence territoriale).",
        },
      ],
    },
    {
      id: "e5-2021-d2",
      title: "Dossier 2 - Stratégie digitale",
      points: 7,
      description:
        "Développer la présence digitale du CDT Tarn pour capter de nouvelles clientèles, notamment les amateurs de courts-séjours.",
      questions: [
        {
          id: "e5-2021-q2",
          question:
            "Proposez une stratégie de communication digitale pour le CDT Tarn visant à développer les courts-séjours dans le département.",
          points: 7,
          type: "recommandation",
          guidance:
            "Définir les objectifs digitaux, les cibles, les canaux (réseaux sociaux, site web, référencement), le contenu, et les indicateurs de performance.",
        },
      ],
    },
    {
      id: "e5-2021-d3",
      title: "Dossier 3 - Budget et pilotage",
      points: 6,
      description:
        "Chiffrer et planifier les actions de communication proposées.",
      questions: [
        {
          id: "e5-2021-q3",
          question:
            "Établissez le budget prévisionnel et le rétroplanning des actions de communication proposées pour le CDT Tarn.",
          points: 6,
          type: "budget",
          guidance:
            "Détailler le budget par action et par poste. Établir un rétroplanning sur 12 mois avec les temps forts touristiques.",
        },
      ],
    },
  ],
  correction: {
    summary:
      "L'épreuve E5 2021 porte sur le CDT Tarn et la promotion touristique territoriale. Le candidat doit diagnostiquer la communication existante, proposer une stratégie digitale pour capter les courts-séjours, et budgétiser ses propositions.",
    keyPoints: [
      "Le taux de départ record des Français (66%) est une opportunité",
      "Les courts-séjours sont le segment de croissance principal",
      "La communication digitale est essentielle pour toucher les voyageurs en ligne",
      "Le Tarn doit se différencier face à la concurrence des autres destinations",
    ],
    commonMistakes: [
      "Diagnostic trop vague sans données chiffrées",
      "Stratégie digitale générique non adaptée au tourisme territorial",
      "Oublier les temps forts touristiques (vacances scolaires, ponts) dans le rétroplanning",
      "Budget sans distinction entre investissement et fonctionnement",
    ],
    tips: [
      "Penser à la saisonnalité du tourisme dans le Tarn",
      "Le content marketing (blogs, vidéos, UGC) est pertinent pour le tourisme",
      "Benchmarker les communications de territoires concurrents (Lot, Aveyron, Gers)",
    ],
  },
};

const e5_2022: Annale = {
  id: "e5-2022-appcraft",
  year: 2022,
  exam: "e5",
  title: "AppCraft",
  theme:
    "Communication B2B, événementiel phygital et salon professionnel",
  advertiser: "AppCraft",
  duration: 14400,
  coefficient: 4,
  parts: [
    {
      id: "e5-2022-d1",
      title: "Dossier 1 - Diagnostic et positionnement",
      points: 7,
      description:
        "AppCraft est une entreprise spécialisée dans les solutions événementielles phygitales (mêlant physique et digital). Le sujet comprend 3 dossiers pouvant être traités de façon indépendante. 16 pages.",
      documents: [
        "Présentation d'AppCraft et de ses offres événementielles",
        "Données sur le marché de l'événementiel post-Covid",
        "Analyse de la concurrence",
        "Supports de communication existants d'AppCraft",
      ],
      questions: [
        {
          id: "e5-2022-q1",
          question:
            "Identifiez les points forts de l'entreprise AppCraft et de ses offres.",
          points: 3,
          type: "diagnostic",
          guidance:
            "Analyser les atouts différenciants d'AppCraft dans le marché de l'événementiel phygital.",
        },
        {
          id: "e5-2022-q2",
          question:
            "Caractérisez les cibles de communication de l'entreprise AppCraft.",
          points: 4,
          type: "analyse",
          guidance:
            "Identifier et décrire les différents segments de clientèle (entreprises, organisateurs d'événements, etc.). Distinguer cible B2B principale et cibles secondaires.",
        },
      ],
    },
    {
      id: "e5-2022-d2",
      title: "Dossier 2 - Salon professionnel et communication",
      points: 7,
      description:
        "AppCraft souhaite développer sa nouvelle offre phygitale et envisage de participer à un salon professionnel.",
      questions: [
        {
          id: "e5-2022-q3",
          question:
            "Justifiez l'intérêt pour AppCraft de participer à un salon professionnel pour accompagner le développement de sa nouvelle offre phygitale.",
          points: 3,
          type: "recommandation",
          guidance:
            "Argumenter sur les bénéfices d'un salon B2B : visibilité, démonstration produit, contacts qualifiés, veille concurrentielle, crédibilité sectorielle.",
        },
        {
          id: "e5-2022-q4",
          question:
            "Proposez un plan de communication pour la participation d'AppCraft au salon professionnel.",
          points: 4,
          type: "planning",
          guidance:
            "Structurer en 3 phases : avant le salon (invitations, teasing digital, communiqué), pendant (stand, animations, démonstrations live, relais réseaux sociaux), après (follow-up, bilan, relances commerciales).",
        },
      ],
    },
    {
      id: "e5-2022-d3",
      title: "Dossier 3 - Budget et aspects juridiques",
      points: 6,
      description:
        "Budgétiser la participation au salon et vérifier les aspects juridiques.",
      questions: [
        {
          id: "e5-2022-q5",
          question:
            "Établissez le budget prévisionnel de la participation au salon et identifiez les points de vigilance juridiques.",
          points: 6,
          type: "budget",
          guidance:
            "Budget : location stand, aménagement, supports, personnel, déplacements, animations. Juridique : RGPD (collecte de données sur le stand), droit à l'image, mentions obligatoires.",
        },
      ],
    },
  ],
  correction: {
    summary:
      "L'épreuve E5 2022 porte sur AppCraft, une entreprise d'événementiel phygital. Le candidat doit analyser l'offre, caractériser les cibles B2B, justifier la participation à un salon professionnel et planifier la communication associée.",
    keyPoints: [
      "Le phygital (fusion physique-digital) est une tendance post-Covid majeure dans l'événementiel",
      "La communication B2B a ses propres codes : argumentation rationnelle, ROI, témoignages clients",
      "Le salon professionnel reste un levier puissant pour la démonstration et le networking B2B",
      "Le plan de communication doit couvrir les 3 phases du salon",
    ],
    commonMistakes: [
      "Confondre communication B2B et B2C dans les propositions",
      "Ne pas exploiter la dimension « phygitale » comme différenciateur",
      "Oublier les aspects RGPD lors de la collecte de contacts sur le salon",
      "Budget incomplet (oublier les frais de déplacement et d'hébergement du personnel)",
    ],
    tips: [
      "Le phygital est le cœur de métier d'AppCraft : le stand doit en être une démonstration vivante",
      "En B2B, le contenu premium (livre blanc, étude de cas, webinar) est un levier clé",
      "Penser aux indicateurs de mesure : nombre de contacts, leads qualifiés, taux de conversion post-salon",
    ],
  },
};

const e5_2023: Annale = {
  id: "e5-2023-gautier",
  year: 2023,
  exam: "e5",
  title: "Gautier (Métropole)",
  theme:
    "Communication de marque d'ameublement, réseau de franchises et digital",
  advertiser: "Gautier",
  duration: 14400,
  coefficient: 4,
  parts: [
    {
      id: "e5-2023-d1",
      title: "Dossier 1 - Diagnostic et analyse",
      points: 7,
      description:
        "Gautier est une entreprise spécialisée dans l'ameublement. L'originalité et la qualité des meubles Gautier ont construit l'image de la marque. Son pôle innovation a été une grande force pour son développement et sa diversification. Gautier est le seul fabricant français qui dessine lui-même ses meubles et les distribue dans son propre réseau de 120 magasins franchisés, en France et à l'étranger. 15 pages, 3 dossiers indépendants.",
      documents: [
        "Présentation de l'entreprise Gautier et de son réseau de franchises",
        "Données sur le marché de l'ameublement en France",
        "Supports de communication existants de Gautier",
        "Données sur la concurrence (IKEA, Maisons du Monde, Conforama)",
      ],
      questions: [
        {
          id: "e5-2023-q1",
          question:
            "Réalisez un diagnostic de la communication de Gautier en identifiant ses forces et faiblesses dans un environnement concurrentiel dominé par des acteurs internationaux.",
          points: 7,
          type: "diagnostic",
          guidance:
            "SWOT : valoriser le Made in France, le design propre, le réseau de franchises comme forces. Identifier les faiblesses face à IKEA, Maisons du Monde. Opportunités : tendance Made in France, éco-responsabilité.",
        },
      ],
    },
    {
      id: "e5-2023-d2",
      title: "Dossier 2 - Stratégie de communication",
      points: 7,
      description:
        "Développer la notoriété de Gautier et moderniser son image pour toucher de nouvelles cibles.",
      questions: [
        {
          id: "e5-2023-q2",
          question:
            "Proposez une stratégie de communication pour renforcer l'image de marque de Gautier et développer sa notoriété auprès d'une cible plus jeune (25-40 ans).",
          points: 7,
          type: "recommandation",
          guidance:
            "Définir les objectifs, le positionnement, les messages clés, les cibles, les canaux (digital, influence, événementiel). Valoriser les différenciateurs : Made in France, design, innovation, réseau propre.",
        },
      ],
    },
    {
      id: "e5-2023-d3",
      title: "Dossier 3 - Plan d'action et budget",
      points: 6,
      description:
        "Planifier et budgétiser les actions de communication proposées.",
      questions: [
        {
          id: "e5-2023-q3",
          question:
            "Établissez le plan d'action détaillé et le budget prévisionnel de la stratégie de communication proposée pour Gautier.",
          points: 6,
          type: "budget",
          guidance:
            "Rétroplanning sur 12 mois, budget détaillé par action (digital, événementiel, RP, influence, supports print). Indicateurs de mesure pour chaque action.",
        },
      ],
    },
  ],
  correction: {
    summary:
      "L'épreuve E5 2023 (Métropole) porte sur Gautier, fabricant français de meubles avec son propre réseau de distribution. Le candidat doit diagnostiquer la communication dans un marché très concurrentiel et proposer une stratégie pour rajeunir l'image de marque.",
    keyPoints: [
      "Gautier a un positionnement unique : seul fabricant français dessinant et distribuant en propre",
      "Le Made in France est un atout différenciateur face à IKEA",
      "Le réseau de 120 franchises est à la fois une force (maillage) et un défi (cohérence de la communication)",
      "La cible 25-40 ans nécessite une stratégie digitale et d'influence",
    ],
    commonMistakes: [
      "Ignorer la spécificité du réseau de franchises dans la stratégie",
      "Proposer une stratégie uniquement digitale sans considérer le point de vente",
      "Ne pas différencier Gautier des concurrents dans les messages",
      "Oublier la dimension éco-responsable dans le positionnement",
    ],
    tips: [
      "Le showroom et l'expérience en magasin sont des atouts clés du réseau Gautier",
      "Penser à Instagram et Pinterest pour l'ameublement (visuels d'intérieur, inspiration déco)",
      "Les collaborations avec des décorateurs d'intérieur ou des influenceurs déco sont pertinentes",
    ],
  },
};

const e5_2023_nc: Annale = {
  id: "e5-2023-nc-forum",
  year: 2023,
  exam: "e5",
  title: "Forum (Nouvelle-Calédonie)",
  theme:
    "Communication culturelle, salle de spectacle et rajeunissement de la cible",
  advertiser: "Forum (salle de concert)",
  duration: 14400,
  coefficient: 4,
  parts: [
    {
      id: "e5-2023-nc-d1",
      title: "Dossier 1 - Diagnostic et opportunité",
      points: 7,
      description:
        "Forum est une salle de concert dont une nouvelle salle, Forum 2, est en construction. Deux fois plus grande que l'ancienne, elle doit permettre de diversifier la programmation musicale et d'attirer de nouveaux publics. Le bâtiment sera livré en avril 2023, premiers spectateurs attendus en septembre 2023. 3 dossiers indépendants.",
      documents: [
        "Présentation de Forum et du projet Forum 2",
        "Données sur le public actuel de Forum",
        "Analyse de la concurrence culturelle locale",
        "Étude sur les pratiques culturelles des 15-35 ans",
      ],
      questions: [
        {
          id: "e5-2023-nc-q1",
          question:
            "La directrice souhaite tirer profit du nouvel équipement Forum 2 pour élargir et moderniser la programmation musicale afin de séduire les jeunes de 15-35 ans. Réalisez un diagnostic de la situation.",
          points: 7,
          type: "diagnostic",
          guidance:
            "Analyser le public actuel vs la cible souhaitée (15-35 ans). Identifier les opportunités (nouvelle salle, capacité doublée) et les menaces (concurrence, habitudes culturelles des jeunes). SWOT structuré.",
        },
      ],
    },
    {
      id: "e5-2023-nc-d2",
      title:
        "Dossier 2 - Stratégie de communication pour le lancement de Forum 2",
      points: 7,
      description:
        "Concevoir la stratégie de communication pour le lancement de Forum 2 et l'acquisition de la cible jeune.",
      questions: [
        {
          id: "e5-2023-nc-q2",
          question:
            "Proposez une stratégie de communication pour le lancement de Forum 2 ciblant les 15-35 ans.",
          points: 7,
          type: "recommandation",
          guidance:
            "Définir les objectifs (notoriété, image, fréquentation), les messages, les canaux adaptés aux 15-35 ans (réseaux sociaux, influenceurs, événements). Proposer un concept de lancement attractif.",
        },
      ],
    },
    {
      id: "e5-2023-nc-d3",
      title: "Dossier 3 - Planning et budget",
      points: 6,
      description:
        "Planifier et chiffrer les actions de communication pour le lancement.",
      questions: [
        {
          id: "e5-2023-nc-q3",
          question:
            "Établissez le rétroplanning du lancement (avril à septembre 2023) et le budget prévisionnel des actions proposées.",
          points: 6,
          type: "planning",
          guidance:
            "Rétroplanning : teasing (avril-juin), révélation (juillet-août), lancement (septembre). Budget par action. Indicateurs de mesure.",
        },
      ],
    },
  ],
  correction: {
    summary:
      "L'épreuve E5 2023 (NC) porte sur le lancement d'une nouvelle salle de concert (Forum 2) avec l'objectif de rajeunir la cible vers les 15-35 ans. Le candidat doit concevoir une stratégie de communication de lancement culturel.",
    keyPoints: [
      "Le doublement de la capacité est une opportunité de repositionnement",
      "Les 15-35 ans ont des pratiques culturelles spécifiques (digital native, expérience, partage)",
      "Le lancement d'un nouvel équipement culturel est un événement à scénariser",
      "La communication culturelle a ses propres codes (programmation, ambiance, communauté)",
    ],
    commonMistakes: [
      "Ne pas adapter les canaux de communication aux 15-35 ans",
      "Oublier que la programmation musicale est le premier argument de communication",
      "Proposer un lancement sans phase de teasing",
      "Ignorer la dimension locale et communautaire de la salle de concert",
    ],
    tips: [
      "TikTok et Instagram sont essentiels pour toucher les 15-35 ans",
      "Le teasing peut s'appuyer sur des teasers musicaux, des visites chantier, du behind-the-scenes",
      "Un événement de lancement (soirée d'inauguration, concert gratuit) crée du buzz",
    ],
  },
};

const e5_2024: Annale = {
  id: "e5-2024-wurth",
  year: 2024,
  exam: "e5",
  title: "Würth",
  theme:
    "Communication industrielle B2B, mécénat culturel et engagement RSE",
  advertiser: "Würth",
  duration: 14400,
  coefficient: 4,
  parts: [
    {
      id: "e5-2024-d1",
      title: "Dossier 1 - Diagnostic et analyse stratégique",
      points: 7,
      description:
        "Le groupe Würth est un acteur majeur de la distribution de produits de fixation et de montage pour les professionnels. Particularité forte : le groupe possède une très importante collection de 18 000 œuvres d'art, principalement moderne et contemporain, ainsi que 14 musées en Europe. La collection est née dans les années 1970 de la volonté de Reinhold Würth, ancien dirigeant du groupe. L'engagement culturel et social fait partie intégrante de l'activité du groupe. 15 pages, 3 dossiers indépendants.",
      documents: [
        "Présentation du groupe Würth et de son activité industrielle",
        "Données sur la collection d'art Würth (18 000 œuvres, 14 musées)",
        "Informations sur la stratégie RSE et mécénat culturel de Würth",
        "Données sur le marché de la fixation professionnelle",
      ],
      questions: [
        {
          id: "e5-2024-q1",
          question:
            "Réalisez un diagnostic de la communication du groupe Würth en tenant compte de sa double identité : industrielle et culturelle.",
          points: 7,
          type: "diagnostic",
          guidance:
            "Analyser comment Würth concilie son activité industrielle B2B et son engagement culturel. Identifier les forces (collection unique, 14 musées) et les défis (cohérence entre industrie et culture).",
        },
      ],
    },
    {
      id: "e5-2024-d2",
      title: "Dossier 2 - Stratégie de communication",
      points: 7,
      description:
        "Valoriser l'engagement culturel de Würth dans sa communication pour renforcer son image de marque et se différencier.",
      questions: [
        {
          id: "e5-2024-q2",
          question:
            "Proposez une stratégie de communication qui valorise l'engagement culturel du groupe Würth tout en renforçant son image auprès de ses cibles professionnelles.",
          points: 7,
          type: "recommandation",
          guidance:
            "Articuler la communication B2B (produits, solutions techniques) avec la communication corporate (mécénat, culture, RSE). Proposer des actions qui créent des ponts entre les deux dimensions.",
        },
      ],
    },
    {
      id: "e5-2024-d3",
      title: "Dossier 3 - Plan d'action et budget",
      points: 6,
      description:
        "Planifier et budgétiser la stratégie de communication proposée.",
      questions: [
        {
          id: "e5-2024-q3",
          question:
            "Établissez le plan d'action et le budget prévisionnel de la stratégie de communication proposée pour Würth.",
          points: 6,
          type: "budget",
          guidance:
            "Détailler les actions par cible (professionnels, grand public, institutions culturelles). Chiffrer le budget et proposer un rétroplanning.",
        },
      ],
    },
  ],
  correction: {
    summary:
      "L'épreuve E5 2024 porte sur le groupe Würth, un cas original qui mêle industrie B2B et mécénat culturel. Le candidat doit montrer sa capacité à articuler deux dimensions apparemment opposées dans une stratégie de communication cohérente.",
    keyPoints: [
      "La collection de 18 000 œuvres et 14 musées est un différenciateur unique dans le B2B industriel",
      "Le mécénat culturel renforce l'image corporate et la RSE",
      "La communication B2B et la communication culturelle doivent être articulées, pas séparées",
      "L'engagement de Reinhold Würth illustre le lien entre vision entrepreneuriale et culture",
    ],
    commonMistakes: [
      "Traiter séparément la communication industrielle et culturelle sans les articuler",
      "Ignorer les cibles professionnelles dans la valorisation du mécénat",
      "Proposer une stratégie uniquement B2C alors que Würth est un acteur B2B",
      "Sous-estimer la puissance de la collection d'art comme outil de différenciation",
    ],
    tips: [
      "Le mécénat culturel est un levier de soft power B2B : invitations clients aux musées, événements culturels comme networking",
      "La RSE intègre le mécénat culturel : c'est un argument corporate fort",
      "Penser aux fondations d'entreprise comme modèle (Fondation Louis Vuitton, Fondation Cartier)",
    ],
  },
};

// ============================================================================
// EXPORT DE TOUTES LES ANNALES
// ============================================================================

export const annalesData: Annale[] = [
  // E1 - Cultures de la communication
  e1_2018,
  e1_2019,
  e1_2020,
  e1_2021,
  e1_2022,
  e1_2023_metropole,
  e1_2023_nc,
  // E5 - Activités de communication
  e5_2018,
  e5_2019,
  e5_2020,
  e5_2021,
  e5_2022,
  e5_2023,
  e5_2023_nc,
  e5_2024,
];

// ============================================================================
// FONCTIONS UTILITAIRES
// ============================================================================

export function getAnnalesByExam(exam: "e1" | "e5"): Annale[] {
  return annalesData.filter((a) => a.exam === exam);
}

export function getAnnalesByYear(year: number): Annale[] {
  return annalesData.filter((a) => a.year === year);
}

export function getAnnaleById(id: string): Annale | undefined {
  return annalesData.find((a) => a.id === id);
}

export function getAvailableYears(): number[] {
  return Array.from(new Set(annalesData.map((a) => a.year))).sort((a, b) => b - a);
}

export function getAnnalesCount(): { e1: number; e5: number; total: number } {
  const e1 = annalesData.filter((a) => a.exam === "e1").length;
  const e5 = annalesData.filter((a) => a.exam === "e5").length;
  return { e1, e5, total: e1 + e5 };
}

export function getAllQuestions(): AnnaleQuestion[] {
  return annalesData.flatMap((a) => a.parts.flatMap((p) => p.questions));
}

export function getQuestionsByType(
  type: AnnaleQuestion["type"]
): AnnaleQuestion[] {
  return getAllQuestions().filter((q) => q.type === type);
}
