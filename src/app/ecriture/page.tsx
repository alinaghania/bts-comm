'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PenLine, Search, FileText, RotateCcw, ChevronRight, ArrowLeft, Clock, Bot, Loader2 } from 'lucide-react';
import PageGuide from '@/components/PageGuide';

type Mode = 'select' | 'reperage' | 'analyse' | 'redaction';
type SubStep = 'consigne' | 'work' | 'correction';

const CORPUS_EXERCISES = [
  {
    id: 'corpus-1',
    title: 'La communication a l\'ere du numerique',
    text: `La communication numerique a profondement modifie les rapports entre les marques et leurs publics. Desormais, chaque consommateur peut devenir emetteur, commentateur, voire prescripteur. Les reseaux sociaux ont inverse le rapport de force : la marque ne controle plus son image, elle la negocie en permanence avec ses communautes.

Cependant, cette horizontalite apparente masque de nouvelles formes de controle. Les algorithmes decident de la visibilite des messages. Le ciblage publicitaire, de plus en plus precis grace aux donnees personnelles, souleve des questions ethiques majeures. Comme le souligne Dominique Wolton, "communiquer, ce n'est pas la meme chose qu'informer" : la profusion d'informations ne garantit ni la comprehension ni le dialogue.

Par ailleurs, certaines marques ont su transformer cette contrainte en opportunite. La strategie de Burger King sur Twitter, fondee sur l'humour et la provocation, montre qu'une communication authentique et reactive peut creer un lien plus fort que n'importe quelle campagne traditionnelle.`,
    expected: {
      these: 'Le numerique a inverse le rapport de force entre marques et consommateurs',
      nuance: 'Cette horizontalite masque de nouvelles formes de controle (algorithmes, ciblage)',
      opposition: 'Profusion d\'information vs comprehension et dialogue (Wolton)',
      motscles: 'horizontalite, controle, algorithmes, authentique, reactive',
      lien_comm: 'Passage d\'une communication verticale (marque -> public) a une communication horizontale et negociee',
    },
  },
  {
    id: 'corpus-2',
    title: 'L\'exces dans la publicite',
    text: `La publicite contemporaine cultive l'exces comme strategie. L'hyperbole est devenue la figure reine du discours publicitaire : "le meilleur", "l'unique", "le plus puissant". Cette surenchere verbale et visuelle repond a une logique de saturation mediatique — dans un environnement ou le consommateur est expose a plusieurs milliers de messages par jour, seul l'exces semble encore capable de capter l'attention.

Pourtant, cette course a l'exageration produit ses propres limites. Le phenomene de "banner blindness" montre que les consommateurs developpent des mecanismes d'evitement face a la publicite excessive. Plus troublant encore, l'exces peut se retourner contre l'annonceur : le greenwashing, forme d'exces dans la promesse environnementale, a suscite une defiance durable chez les consommateurs les plus informes.

A l'inverse, des marques comme Patagonia ont fait de la sobriete leur positionnement : "N'achetez pas cette veste" reste l'une des campagnes les plus memorables de la decennie, precisement parce qu'elle prenait le contre-pied de l'exces ambiant.`,
    expected: {
      these: 'La publicite utilise l\'exces (hyperbole) pour capter l\'attention dans un environnement sature',
      nuance: 'L\'exces produit ses propres limites : evitement (banner blindness), defiance (greenwashing)',
      opposition: 'Exces vs sobriete — Patagonia prend le contre-pied avec succes',
      motscles: 'hyperbole, saturation, exces, sobriete, greenwashing, banner blindness',
      lien_comm: 'La strategie de communication oscille entre surenchere et authenticite — la sobriete peut etre plus efficace que l\'exces',
    },
  },
  {
    id: 'corpus-3',
    title: 'L\'alimentation et la communication — A table !',
    text: `Le repas est bien plus qu'un acte nutritionnel : c'est un fait social total, comme l'a montre la sociologie de l'alimentation. La table est un lieu de partage, de rituel, d'identite culturelle. Roland Barthes, dans ses Mythologies, analysait deja le "steak-frites" comme un signe de la francite.

Aujourd'hui, la communication alimentaire est omnipresente. Les marques rivalisent d'imaginaires : terroir, authenticite, bien-etre, plaisir. Le "food porn" sur Instagram a transforme le repas en spectacle visuel. Les etiquettes "bio", "local", "sans gluten" sont devenues des arguments marketing autant que des garanties sanitaires.

Pourtant, cette profusion communicationnelle masque des paradoxes. D'un cote, les campagnes de sante publique ("Manger Bouger") alertent sur la malbouffe. De l'autre, la publicite alimentaire cible massivement les enfants avec des produits ultratransformes. Annie Ernaux, dans ses recits, montre comment l'alimentation revele les clivages sociaux.`,
    expected: {
      these: 'Le repas est un fait social total, un lieu d\'identite culturelle et de partage',
      nuance: 'La communication alimentaire oscille entre authenticite et marketing (bio, food porn)',
      opposition: 'Campagnes sante publique vs publicite alimentaire ciblant les enfants',
      motscles: 'terroir, authenticite, spectacle, paradoxe, clivages sociaux',
      lien_comm: 'L\'alimentation est un terrain de communication ou s\'affrontent sante publique et interets commerciaux',
    },
  },
  {
    id: 'corpus-4',
    title: 'La rue comme espace de communication — La rue',
    text: `La rue n'est pas un simple lieu de passage : c'est un espace de communication a ciel ouvert. Affiches publicitaires, enseignes lumineuses, street art, tracts, manifestations — la rue est saturee de messages. Guillaume Apollinaire, dans "Zone", decrivait deja les rues de Paris comme un poeme visuel ou se melent panneaux, devantures et passants.

Le street marketing a formalise cette intuition : la rue est un media. Flash mobs, guerilla marketing, installations ephemeres transforment l'espace public en terrain d'expression pour les marques. La campagne "Piano Stairs" de Volkswagen a transforme un escalier de metro en piano geant pour promouvoir le mouvement.

Cependant, cette appropriation commerciale de l'espace public souleve des questions. Georges Perec, dans Tentative d'epuisement d'un lieu parisien, montrait la richesse du quotidien urbain non mediatise. L'affichage sauvage, les publicites intrusives provoquent un sentiment de pollution visuelle. Certaines villes, comme Grenoble, ont choisi de supprimer la publicite de l'espace public.`,
    expected: {
      these: 'La rue est un espace de communication sature de messages',
      nuance: 'Le street marketing exploite la rue comme media creatif',
      opposition: 'Appropriation commerciale vs droit a un espace public non mediatise (Perec, Grenoble)',
      motscles: 'espace public, street marketing, pollution visuelle, media, quotidien',
      lien_comm: 'La rue est un media a part entiere, mais son exploitation commerciale questionne les limites de la communication',
    },
  },
  {
    id: 'corpus-5',
    title: 'L\'exces dans la societe de consommation',
    text: `Rabelais faisait deja de l'exces un moteur litteraire : Gargantua engloutit, accumule, deborde. Aujourd'hui, l'exces est devenu le mode operatoire de la societe de consommation. Surconsommation, fast fashion, obsolescence programmee : le "trop" est systemique.

La communication amplifie cette logique : promotions permanentes (-50%, "Black Friday"), hyperboles publicitaires ("le meilleur", "l'ultime"), saturation mediatique. Montaigne, dans ses Essais, preconisait pourtant la mesure : "la mesure est la juste proportion des choses."

Face a cet exces, des contre-mouvements emergent. La communication responsable (RSE), le minimalisme, la "decroissance" proposent un autre recit. Fitzgerald, dans Gatsby le Magnifique, montrait deja que l'exces de richesse mene a la vacuite. Certaines marques comme Patagonia ou Veja ont fait de la sobriete un argument commercial paradoxal : consommer moins, mais mieux.`,
    expected: {
      these: 'L\'exces est le mode operatoire de la societe de consommation, amplifie par la communication',
      nuance: 'Des contre-mouvements (RSE, minimalisme) proposent un autre modele',
      opposition: 'Exces / surconsommation vs mesure / sobriete (Montaigne, Patagonia)',
      motscles: 'surconsommation, hyperbole, saturation, sobriete, RSE, mesure',
      lien_comm: 'La communication oscille entre amplification de l\'exces et promotion de la sobriete',
    },
  },
  {
    id: 'corpus-6',
    title: 'Les reseaux sociaux et l\'identite',
    text: `Les reseaux sociaux ont transforme la construction identitaire. Chaque profil est une mise en scene de soi : photos selectionnees, bio travaillee, contenus partages. Erving Goffman parlait de "presentation de soi" dans les interactions sociales — les reseaux sociaux ont numerise cette theatralisation.

Cette construction identitaire numerique pose des questions majeures. Les filtres Instagram, les retouches, les "vies parfaites" alimentent une comparaison sociale permanente. La campagne "Reverse Selfie" de Dove (2021) a mis en lumiere l'impact de ces representations sur l'estime de soi des adolescentes.

Pourtant, les reseaux sociaux offrent aussi des espaces d'expression liberateurs. Les communautes en ligne permettent a des individus marginalises de trouver une voix. Le mouvement #MeToo est ne sur Twitter. Guy Debord aurait vu dans les reseaux sociaux l'aboutissement de la "societe du spectacle", mais aussi, peut-etre, un outil de contre-spectacle.`,
    expected: {
      these: 'Les reseaux sociaux transforment la construction identitaire en theatralisation numerique de soi',
      nuance: 'Les reseaux offrent aussi des espaces d\'expression liberateurs (#MeToo)',
      opposition: 'Mise en scene / comparaison sociale vs liberation de la parole',
      motscles: 'identite, mise en scene, filtres, comparaison, expression, spectacle',
      lien_comm: 'Les reseaux sociaux sont un outil de communication identitaire qui peut aliener ou liberer',
    },
  },
  {
    id: 'corpus-7',
    title: 'L\'image de la femme dans la publicite',
    text: `La representation de la femme dans la publicite a longtemps ete un miroir deformant des normes sociales. Femme-objet, mere parfaite, seductrice : les stereotypes feminins ont structure le discours publicitaire pendant des decennies. Jean Baudrillard notait que la publicite vend des signes plus que des produits — et le corps feminin a ete l'un des signes les plus exploites.

Un tournant s'est opere dans les annees 2000. La campagne "Real Beauty" de Dove (2004) a introduit des corps "reels" dans la publicite. Always a lance "#LikeAGirl" pour deconstruire le stereotyppe. Ces campagnes s'inscrivent dans le "femvertising" : l'utilisation du feminisme comme argument marketing.

Cependant, le femvertising suscite des critiques. Peut-on concilier engagement feministe et logique marchande ? Naomi Klein, dans No Logo, rappelle que les marques recuperent les mouvements sociaux pour vendre. Le risque du "purpose washing" — afficher des valeurs sans les incarner — est reel.`,
    expected: {
      these: 'La publicite a longtemps exploite des stereotypes feminins comme signes commerciaux',
      nuance: 'Le femvertising tente de deconstruire ces stereotypes (Dove, Always)',
      opposition: 'Engagement feministe vs recuperation marchande (purpose washing)',
      motscles: 'stereotypes, femvertising, corps, signes, purpose washing, engagement',
      lien_comm: 'La communication evolue entre reproduction des stereotypes et tentative de les deconstruire, avec un risque de recuperation',
    },
  },
  {
    id: 'corpus-8',
    title: 'La communication de crise',
    text: `La communication de crise est l'epreuve de verite pour toute organisation. Quand l'imprevue frappe — scandale, accident, bad buzz — la reaction communicationnelle determine l'avenir de la marque. Patrick Lagadec, specialiste des crises, rappelle que "la crise est un accelerateur de tendances preexistantes."

Deux strategies s'opposent. La strategie du "mea culpa" (reconnaitre, s'excuser, agir) a fait ses preuves : Johnson & Johnson, lors de l'affaire Tylenol (1982), a rappele 31 millions de flacons et reconquis la confiance. A l'inverse, la strategie du deni ou du silence aggrave generalement la situation : BP lors de la maree noire Deepwater Horizon (2010) a vu son image devastee par une communication maladroite.

A l'ere des reseaux sociaux, la crise se propage en temps reel. Un tweet malheureux peut devenir viral en minutes. Watzlawick nous rappelle qu'"on ne peut pas ne pas communiquer" : le silence d'une marque en crise est deja un message, souvent interprete comme un aveu de culpabilite.`,
    expected: {
      these: 'La communication de crise determine l\'avenir d\'une organisation face a l\'imprevue',
      nuance: 'Deux strategies s\'opposent : mea culpa vs deni, avec des resultats tres differents',
      opposition: 'Transparence et action (Johnson & Johnson) vs deni et maladresse (BP)',
      motscles: 'crise, mea culpa, deni, reseaux sociaux, silence, temps reel',
      lien_comm: 'La communication de crise illustre l\'axiome de Watzlawick : ne pas communiquer, c\'est deja communiquer',
    },
  },
];

const CAMPAGNE_EXERCISES = [
  {
    id: 'campagne-1',
    title: 'Dove — "Real Beauty" (2004-present)',
    brief: 'Dove lance "Real Beauty" : des femmes ordinaires, non retouchees, remplacent les mannequins dans les publicites.',
    analyse_attendue: `Positionnement : beaute inclusive, anti-standards irealistes.
Procedes visuels : photos non retouchees, femmes de morphologies/ages/ethnies differentes, fond neutre (authenticite).
Procedes redactionnels : "Vous etes plus belles que vous ne le croyez" — fonction emotive (Jakobson), adresse directe au recepteur (conative).
References : Baudrillard (on consomme des signes — ici Dove vend le signe de l'authenticite), Lipovetsky (l'individu hypermoderne en quete d'authenticite).
Cible : femmes 25-55 ans, lassees des standards de beaute irealistes.
Efficacite : campagne devenue un cas d'ecole, +700% de ventes en 10 ans.`,
  },
  {
    id: 'campagne-2',
    title: 'Apple — "Think Different" (1997)',
    brief: 'Apple en crise lance "Think Different" : portraits de genies (Einstein, Gandhi, Lennon) avec le slogan "Think Different".',
    analyse_attendue: `Positionnement : marque rebelle, creatrice, pour ceux qui pensent autrement.
Procedes visuels : portraits N&B iconiques, logo Apple en couleur (seul element colore = la marque).
Procedes redactionnels : "Think Different" — injonction (fonction conative), tournure grammaticalement incorrecte volontaire (Different au lieu de Differently) pour marquer la transgression.
Figures de rhetorique : anaphore dans le manifeste ("Here's to the crazy ones"), accumulation, hyperbole.
References : McLuhan (le medium est le message — le format pub deviant un manifeste), Bourdieu (distinction culturelle — Apple cible les "different thinkers").
Cible : createurs, artistes, early adopters, CSP+.
Efficacite : relance d'Apple, construction d'une marque-culture.`,
  },
  {
    id: 'campagne-3',
    title: 'Burger King — "Whopper Detour" (2018)',
    brief: 'Burger King propose son Whopper a 1 centime... a condition de le commander via l\'app depuis un McDonald\'s (geolocalisation).',
    analyse_attendue: `Positionnement : challenger irreverencieux, roi du troll marketing.
Procedes visuels : application mobile, carte interactive montrant les McDonald's, visuels minimalistes avec le prix "1 cent".
Procedes redactionnels : provocation directe du concurrent, humour, defi au consommateur. Fonction conative (Jakobson) : "Allez chez McDo... pour commander chez nous."
Figures de rhetorique : paradoxe (aller chez le concurrent pour acheter), ironie, antithese (McDo vs BK).
References : Baudrillard (detournement des signes — le lieu McDo devient un point de vente BK), McLuhan (l'app mobile est le message).
Cible : millennials et Gen Z, digital natives, amateurs d'humour et de defis.
Efficacite : 1,5 million de telechargements de l'app en 9 jours, campagne la plus primee de 2019 (Cannes Lions Grand Prix).`,
  },
  {
    id: 'campagne-4',
    title: 'Patagonia — "Don\'t Buy This Jacket" (2011)',
    brief: 'Le Black Friday 2011, Patagonia publie une pleine page dans le New York Times avec sa veste R2 et le titre "Don\'t Buy This Jacket".',
    analyse_attendue: `Positionnement : marque responsable, anti-consommation, engagement environnemental sincere.
Procedes visuels : visuel sobre, photo du produit sur fond blanc, mise en page editoriale (pas publicitaire), rappelle un article de presse.
Procedes redactionnels : injonction negative paradoxale ("N'achetez pas"), ton informatif et pedagogique (empreinte carbone detaillee du produit). Fonction referentielle (Jakobson) dominante.
Figures de rhetorique : paradoxe (une marque qui dit de ne pas acheter), litote (dire moins pour signifier plus — "si vous n'en avez pas besoin").
References : Baudrillard (subversion de la societe de consommation), Klein (critique du branding retournee en argument de marque).
Cible : consommateurs eco-conscients, CSP+, outdoor enthusiasts, 30-55 ans.
Efficacite : +30% de ventes l'annee suivante. Le paradoxe a renforce la credibilite et la desirabilite de la marque.`,
  },
  {
    id: 'campagne-5',
    title: 'Benetton — Campagnes choc (Toscani, 1989-2000)',
    brief: 'Oliviero Toscani, directeur artistique de Benetton, cree des campagnes montrant des photos-choc (malades du SIDA, condamnes a mort, nouveau-ne) sans lien direct avec le produit.',
    analyse_attendue: `Positionnement : marque engagee, provocatrice, qui utilise la pub comme tribune sociale.
Procedes visuels : photos-choc de photojournalisme (pas de mise en scene publicitaire), absence du produit, seul le logo "United Colors of Benetton" apparait. Rupture totale avec les codes publicitaires classiques.
Procedes redactionnels : absence quasi totale de texte — l'image parle seule. Le logo fait office de signature. Fonction poetique dominante (le message EST la forme).
Figures de rhetorique : provocation, choc, transgression des codes publicitaires, metonymie (une image = un combat).
References : Barthes (l'image est polysemique — ces photos generent des interpretations multiples), Debord (detournement du spectacle publicitaire pour montrer le reel).
Cible : jeunes adultes urbains, sensibles aux causes sociales, 18-35 ans.
Efficacite : notoriete mondiale, mais aussi boycotts et polemiques. La marque a brouille la frontiere entre publicite et art/journalisme.`,
  },
  {
    id: 'campagne-6',
    title: 'Dove — "Reverse Selfie" (2021)',
    brief: 'Dove montre une adolescente qui se "defait" de ses retouches (filtres, maquillage, modifications) en remontant le temps, revelant son vrai visage.',
    analyse_attendue: `Positionnement : beaute authentique, protection de l'estime de soi des jeunes.
Procedes visuels : video en reverse (le processus de retouche est "deroule"), progression du visage modifie vers le visage reel, eclairage naturel final vs artificiel au debut.
Procedes redactionnels : slogan "The pressure of social media is hurting our kids". Ton grave, engageant. Fonction emotive (Jakobson) : empathie parentale. Fonction conative : appel a la discussion parents-enfants.
Figures de rhetorique : analepse visuelle (retour en arriere), antithese (faux vs vrai), gradation inversee (du plus retouche au plus naturel).
References : Goffman (mise en scene de soi poussee a l'extreme par les filtres), Debord (le selfie retouche comme spectacle du soi).
Cible : parents d'adolescentes 10-17 ans, cible secondaire : les adolescentes elles-memes.
Efficacite : 6 milliards d'impressions, prise de conscience sur l'impact des filtres. Prolonge la strategie "Real Beauty" de 2004.`,
  },
  {
    id: 'campagne-7',
    title: 'SNCF — "Vos vies sont nos voyages" (2011)',
    brief: 'La SNCF lance une campagne TV et affichage montrant des moments de vie (retrouvailles, rencontres, departs) lies au voyage en train.',
    analyse_attendue: `Positionnement : le train comme lien humain, pas seulement un transport. Marque-emotion.
Procedes visuels : scenes de vie authentiques filmees en gare et dans les trains, esthetique cinema (grain, lumiere naturelle), montage emotionnel avec ralentis.
Procedes redactionnels : baseline "Vos vies sont nos voyages" — chiasme qui inverse la relation marque/client. Fonction emotive dominante (emotion, nostalgie). Voix-off intime.
Figures de rhetorique : chiasme ("vos vies / nos voyages"), metonymie (le train = les moments de vie), synecdoque (un trajet = une vie).
References : Lipovetsky (hyperconsommation emotionnelle — on vend de l'experience, pas un billet), McLuhan (le train comme medium de lien social).
Cible : grand public, familles, couples, jeunes actifs. Coeur de cible : 25-45 ans.
Efficacite : campagne primee, renovation de l'image SNCF au-dela du transport fonctionnel.`,
  },
  {
    id: 'campagne-8',
    title: 'Always — "#LikeAGirl" (2014)',
    brief: 'Always demande a des adultes et des enfants de mimer "courir comme une fille", "lancer comme une fille". Les adultes caricaturent, les enfants font de leur mieux.',
    analyse_attendue: `Positionnement : empowerment feminin, deconstruction des stereotypes de genre.
Procedes visuels : format documentaire, camera a l'epaule, casting non professionnel. Contraste entre les reponses des adultes (caricaturales) et des enfants (authentiques).
Procedes redactionnels : question simple repetee "What does it mean to do something like a girl?". Hashtag #LikeAGirl transforme une insulte en fierierte. Fonction conative : appel a changer les perceptions.
Figures de rhetorique : antithese (adultes vs enfants), antanaclase ("like a girl" change de sens au cours du film), repetition/anaphore.
References : Bourdieu (reproduction des stereotypes de genre par l'education), Goffman (roles sociaux joues inconsciemment).
Cible : femmes 15-35 ans, cible secondaire : parents, educateurs.
Efficacite : 90 millions de vues, Super Bowl 2015, augmentation de 50% de l'intention d'achat. Transforme une marque hygiene en marque militante.`,
  },
];

const REDACTION_EXERCISES = [
  {
    id: 'redaction-1',
    title: 'Post Instagram pour un restaurant bio',
    brief: `Annonceur : "La Table Verte", restaurant bio et local a Paris (15e).
Cible : urbains 25-40 ans, sensibles a l'alimentation responsable.
Objectif : promouvoir le nouveau menu de saison (printemps 2026).
Contrainte : 1 post Instagram (visuel + texte de 150 mots max).
Ton : chaleureux, authentique, un peu poetique.`,
    criteres: [
      'Adequation avec la cible (urbains eco-conscients)',
      'Ton chaleureux et authentique (pas corporate)',
      'Mise en valeur du menu de saison',
      'Appel a l\'action clair',
      'Format adapte a Instagram (hashtags, structure)',
    ],
  },
  {
    id: 'redaction-2',
    title: 'Communique de presse — Lancement produit',
    brief: `Annonceur : "Lumea", marque de cosmetiques naturels.
Evenement : lancement de "Lumea Solaire", une creme solaire 100% minerale, biodegradable.
Cible du CP : journalistes beaute/lifestyle.
Informations cles : SPF 50, sans nanoparticules, packaging en plastique oceanique recycle, disponible en pharmacie des juin 2026, prix 24,90 euros.
Ton : professionnel, factuel, avec un angle RSE.`,
    criteres: [
      'Structure classique du CP (titre, chapeau, corps, boilerplate)',
      'Informations cles presentes (produit, prix, distribution, date)',
      'Angle RSE mis en valeur sans greenwashing',
      'Ton adapte aux journalistes (factuel, pas publicitaire)',
      'Citation du dirigeant integree',
    ],
  },
  {
    id: 'redaction-3',
    title: 'Affiche pour un festival de musique eco-responsable',
    brief: `Annonceur : "Les Echos Verts", festival de musique en plein air dans le Vercors.
Cible : jeunes 18-30 ans, sensibles a l'ecologie et a la musique independante.
Objectif : promouvoir la 3e edition (juillet 2026). 5000 places.
Contrainte : 1 affiche (titre + accroche + infos pratiques + ton).
Particularites : zero dechet, gobelets consignes, scene solaire, artistes locaux.
Ton : festif, engageant, un brin militant.`,
    criteres: [
      'Accroche percutante et coherente avec le positionnement eco',
      'Informations pratiques presentes (dates, lieu, prix, site)',
      'Ton festif mais engageant (pas culpabilisant)',
      'Coherence visuelle suggeree (description de l\'univers graphique)',
      'Differenciation par rapport aux festivals classiques',
    ],
  },
  {
    id: 'redaction-4',
    title: 'Newsletter interne — Annonce politique RSE',
    brief: `Annonceur : "Nexia Group", entreprise de conseil (350 salaries).
Cible : les collaborateurs de l'entreprise.
Objectif : annoncer la nouvelle politique RSE (teletravail 3j/semaine, compensation carbone, mecenat de competences 2j/an).
Contrainte : 1 newsletter interne (300 mots max), objet de mail inclus.
Ton : professionnel mais chaleureux, federateur.`,
    criteres: [
      'Objet de mail incitatif (pas generique)',
      'Structure claire : annonce, details, appel a l\'engagement',
      'Ton adapte a la communication interne (ni trop corporate, ni trop familier)',
      'Les 3 mesures RSE clairement presentees',
      'Valorisation des collaborateurs dans la demarche',
    ],
  },
  {
    id: 'redaction-5',
    title: 'Story Instagram — Marque de vetements ethiques',
    brief: `Annonceur : "NUDA", marque de vetements ethiques (coton bio, fabrication Portugal).
Cible : femmes 22-35 ans, urbaines, sensibles a la mode responsable.
Objectif : lancement de la collection ete 2026 "Solstice".
Contrainte : 3 stories Instagram (texte de chaque slide + description visuelle).
Ton : poetique, lumineux, authentique.`,
    criteres: [
      'Narration coherente sur 3 slides (debut, milieu, fin)',
      'Texte adapte au format Story (court, percutant)',
      'Description visuelle evocatrice',
      'Mise en valeur des engagements ethiques sans greenwashing',
      'Call-to-action final (swipe up, lien, etc.)',
    ],
  },
  {
    id: 'redaction-6',
    title: 'Spot radio (30 sec) — Collecte alimentaire',
    brief: `Annonceur : Banque Alimentaire, operation "Grandes Collectes" novembre 2026.
Cible : grand public, menageres 35-65 ans, dans les supermarches.
Objectif : recruter des benevoles et inciter aux dons alimentaires.
Contrainte : script radio de 30 secondes (environ 75 mots), avec indication des sons/musiques.
Ton : chaleureux, mobilisateur, concret.`,
    criteres: [
      'Respect du format 30 sec (75 mots environ)',
      'Indication des sons/musiques/ambiances',
      'Message clair et concret (dates, lieux, action demandee)',
      'Ton chaleureux sans etre larmoyant',
      'Appel a l\'action precis (quand, ou, comment aider)',
    ],
  },
  {
    id: 'redaction-7',
    title: 'Page "A propos" — Site e-commerce bio',
    brief: `Annonceur : "Racines", epicerie en ligne bio et locale (Ile-de-France).
Cible : familles urbaines 30-50 ans, CSP+, soucieuses de l'alimentation.
Objectif : creer la page "Notre histoire" du site web.
Contrainte : 200 mots, structure narrative (qui, pourquoi, comment, valeurs).
Ton : sincere, storytelling personnel, engageant.`,
    criteres: [
      'Storytelling personnel et authentique (pas generique)',
      'Presentation des fondateurs et de leur motivation',
      'Valeurs clairement exprimees (bio, local, qualite)',
      'Structure narrative engageante (pas une liste)',
      'Coherence avec le positionnement premium/authentique',
    ],
  },
  {
    id: 'redaction-8',
    title: 'Tweet de crise — Greenwashing',
    brief: `Annonceur : "FreshWear", marque de fast fashion accusee de greenwashing apres le lancement d'une collection "eco".
Contexte : un influenceur a revele que la collection "eco" utilise seulement 5% de coton recycle. Le hashtag #FreshWearMent trending.
Cible : communaute Twitter/X, journalistes, consommateurs defiants.
Contrainte : 1 tweet (280 caracteres) + 1 thread de 3 tweets (reponse complete).
Ton : humble, transparent, factuel. PAS de langue de bois.`,
    criteres: [
      'Tweet principal percutant et honnete (pas de langue de bois)',
      'Thread structure : reconnaissance, explication, engagement concret',
      'Ton adapte a la crise (humilite, pas de defensif)',
      'Engagements concrets et verifiables (pas de promesses vagues)',
      'Respect du format Twitter (280 car/tweet)',
    ],
  },
];

export default function EcriturePage() {
  const [mode, setMode] = useState<Mode>('select');
  const [subStep, setSubStep] = useState<SubStep>('consigne');
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [correction, setCorrection] = useState('');
  const [loadingCorrection, setLoadingCorrection] = useState(false);

  const requestCorrection = async (prompt: string) => {
    setLoadingCorrection(true);
    setSubStep('correction');
    try {
      const userId = localStorage.getItem('bts-user-id') || '';
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
          context: 'course_help',
        }),
      });
      if (res.ok) {
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let result = '';
        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            result += decoder.decode(value, { stream: true });
            setCorrection(result);
          }
        }
        if (!result) setCorrection(await res.text());
      } else {
        setCorrection('Erreur de connexion. Verifie que l\'API Azure est configuree.');
      }
    } catch {
      setCorrection('Erreur de connexion.');
    } finally {
      setLoadingCorrection(false);
    }
  };

  const handleSubmitReperage = () => {
    const ex = CORPUS_EXERCISES[exerciseIdx];
    const prompt = `L'etudiante devait reperer les positions dans ce corpus :

"${ex.text}"

Voici sa reponse :
"${userAnswer}"

Voici ce qui etait attendu :
- These : ${ex.expected.these}
- Nuance : ${ex.expected.nuance}
- Opposition : ${ex.expected.opposition}
- Mots-cles : ${ex.expected.motscles}
- Lien avec la communication : ${ex.expected.lien_comm}

Corrige sa reponse point par point. Pour chaque element :
- "Bien vu" si correct
- "Incomplet" si partiellement correct (dis ce qui manque)
- "Hors sujet" si incorrect
- "Non identifie" si absent

Termine par un modele de bonne reponse en 5 lignes. Sois exigeante mais bienveillante.`;
    requestCorrection(prompt);
  };

  const handleSubmitAnalyse = () => {
    const ex = CAMPAGNE_EXERCISES[exerciseIdx % CAMPAGNE_EXERCISES.length];
    const prompt = `L'etudiante devait analyser cette campagne :
"${ex.title}" — ${ex.brief}

Voici sa reponse :
"${userAnswer}"

Voici une analyse de reference :
${ex.analyse_attendue}

Corrige sa reponse. Indique :
1. Ce qui est bien identifie
2. Ce qui manque (procedes visuels ? redactionnels ? references ? cible ?)
3. Ce qui est imprecis ou hors sujet
4. Un modele de bonne analyse en 6 lignes

Sois precise. Cite des elements de sa copie.`;
    requestCorrection(prompt);
  };

  const handleSubmitRedaction = () => {
    const ex = REDACTION_EXERCISES[exerciseIdx % REDACTION_EXERCISES.length];
    const prompt = `L'etudiante devait rediger un message de communication a partir de ce brief :
${ex.brief}

Criteres d'evaluation :
${ex.criteres.map((c, i) => `${i + 1}. ${c}`).join('\n')}

Voici sa production :
"${userAnswer}"

Evalue chaque critere sur 5. Ne dis JAMAIS "c'est bien mais tu peux approfondir". Dis :
- "tu as decrit au lieu de proposer"
- "ton ton est trop scolaire"
- "ta justification manque de reference au brief"
- "ton message ne s'adresse pas a la cible definie"

Donne un exemple de message modele a la fin.`;
    requestCorrection(prompt);
  };

  const reset = () => {
    setSubStep('consigne');
    setUserAnswer('');
    setCorrection('');
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        {mode !== 'select' && (
          <button onClick={() => { setMode('select'); reset(); }} className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text mb-4">
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>
        )}
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <PenLine className="w-7 h-7 text-primary" />
          Laboratoire d&apos;ecriture E1
        </h1>
        <p className="text-text-muted mt-1">3 modes pour progresser : reperer, analyser, rediger</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {mode === 'select' && (
          <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-4">
            {[
              { id: 'reperage' as Mode, icon: Search, title: 'Mode Reperage', desc: 'Identifie les positions dans un corpus (these, nuance, opposition)', time: '10-15 min', color: 'from-primary to-purple-700' },
              { id: 'analyse' as Mode, icon: FileText, title: 'Mode Analyse de campagne', desc: 'Decrypte les procedes d\'une campagne pub reelle', time: '15-20 min', color: 'from-secondary to-blue-700' },
              { id: 'redaction' as Mode, icon: PenLine, title: 'Mode Redaction', desc: 'Concois et redige un message a partir d\'un brief', time: '15-25 min', color: 'from-emerald-500 to-teal-700' },
            ].map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.button
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => { setMode(m.id); reset(); setExerciseIdx(Math.floor(Math.random() * 8)); }}
                  className="p-6 rounded-2xl bg-bg-card border border-white/5 hover:border-primary/30 transition-all text-left group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{m.title}</h3>
                      <p className="text-sm text-text-muted mt-1">{m.desc}</p>
                      <div className="flex items-center gap-1 mt-3 text-xs text-text-muted">
                        <Clock className="w-3 h-3" /> {m.time}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors mt-1" />
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}

        {mode === 'reperage' && (
          <motion.div key="reperage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
              <h2 className="font-semibold mb-4">Corpus : {CORPUS_EXERCISES[exerciseIdx]?.title}</h2>
              <div className="bg-bg-hover/50 rounded-xl p-5 text-sm leading-relaxed whitespace-pre-wrap">
                {CORPUS_EXERCISES[exerciseIdx]?.text}
              </div>
            </div>

            {subStep === 'consigne' && (
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 space-y-3">
                <h3 className="font-semibold text-primary">Consigne</h3>
                <p className="text-sm">Identifie dans ce corpus :</p>
                <ul className="text-sm space-y-1 text-text-muted">
                  <li>1. La these principale</li>
                  <li>2. La nuance apportee</li>
                  <li>3. L&apos;opposition ou le contre-argument</li>
                  <li>4. Les mots-cles recurrents</li>
                  <li>5. Le lien avec la communication</li>
                </ul>
                <button onClick={() => setSubStep('work')} className="mt-4 px-6 py-3 rounded-xl bg-primary text-white font-medium text-sm flex items-center gap-2">
                  Commencer <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {subStep === 'work' && (
              <div className="space-y-4">
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="These principale : ...&#10;Nuance : ...&#10;Opposition : ...&#10;Mots-cles : ...&#10;Lien avec la communication : ..."
                  className="w-full h-56 bg-bg-card border border-white/10 rounded-xl p-4 text-sm resize-none focus:outline-none focus:border-primary/50"
                />
                <button
                  onClick={handleSubmitReperage}
                  disabled={userAnswer.length < 30}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm disabled:opacity-30"
                >
                  Envoyer a Coline pour correction
                </button>
              </div>
            )}

            {subStep === 'correction' && (
              <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Bot className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Correction de Coline</h3>
                  {loadingCorrection && <Loader2 className="w-4 h-4 animate-spin text-text-muted" />}
                </div>
                <div className="text-sm leading-relaxed whitespace-pre-wrap">{correction}</div>
                <div className="flex gap-3 mt-6">
                  <button onClick={reset} className="flex-1 py-3 rounded-xl bg-bg-hover text-sm font-medium flex items-center justify-center gap-2">
                    <RotateCcw className="w-4 h-4" /> Recommencer
                  </button>
                  <button onClick={() => { reset(); setExerciseIdx((exerciseIdx + 1) % CORPUS_EXERCISES.length); }} className="flex-1 py-3 rounded-xl bg-primary/10 text-primary text-sm font-medium flex items-center justify-center gap-2">
                    Exercice suivant <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {mode === 'analyse' && (
          <motion.div key="analyse" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
              <h2 className="font-semibold mb-2">{CAMPAGNE_EXERCISES[exerciseIdx % CAMPAGNE_EXERCISES.length]?.title}</h2>
              <p className="text-sm text-text-muted">{CAMPAGNE_EXERCISES[exerciseIdx % CAMPAGNE_EXERCISES.length]?.brief}</p>
            </div>

            {subStep === 'consigne' && (
              <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-6 space-y-3">
                <h3 className="font-semibold text-secondary">Consigne</h3>
                <p className="text-sm">Analyse cette campagne en identifiant :</p>
                <ul className="text-sm space-y-1 text-text-muted">
                  <li>1. Le positionnement de la marque</li>
                  <li>2. Les procedes visuels</li>
                  <li>3. Les procedes redactionnels (figures de style, ton)</li>
                  <li>4. Les references culturelles mobilisees</li>
                  <li>5. La cible et comment elle est interpellee</li>
                  <li>6. L&apos;efficacite globale</li>
                </ul>
                <button onClick={() => setSubStep('work')} className="mt-4 px-6 py-3 rounded-xl bg-secondary text-white font-medium text-sm flex items-center gap-2">
                  Commencer <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {subStep === 'work' && (
              <div className="space-y-4">
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Positionnement : ...&#10;Procedes visuels : ...&#10;Procedes redactionnels : ...&#10;References culturelles : ...&#10;Cible : ...&#10;Efficacite : ..."
                  className="w-full h-64 bg-bg-card border border-white/10 rounded-xl p-4 text-sm resize-none focus:outline-none focus:border-secondary/50"
                />
                <button
                  onClick={handleSubmitAnalyse}
                  disabled={userAnswer.length < 50}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-secondary to-blue-700 text-white font-medium text-sm disabled:opacity-30"
                >
                  Envoyer a Coline pour correction
                </button>
              </div>
            )}

            {subStep === 'correction' && (
              <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Bot className="w-5 h-5 text-secondary" />
                  <h3 className="font-semibold">Correction de Coline</h3>
                  {loadingCorrection && <Loader2 className="w-4 h-4 animate-spin text-text-muted" />}
                </div>
                <div className="text-sm leading-relaxed whitespace-pre-wrap">{correction}</div>
                <div className="flex gap-3 mt-6">
                  <button onClick={reset} className="flex-1 py-3 rounded-xl bg-bg-hover text-sm font-medium flex items-center justify-center gap-2">
                    <RotateCcw className="w-4 h-4" /> Recommencer
                  </button>
                  <button onClick={() => { reset(); setExerciseIdx(exerciseIdx + 1); }} className="flex-1 py-3 rounded-xl bg-secondary/10 text-secondary text-sm font-medium flex items-center justify-center gap-2">
                    Exercice suivant <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {mode === 'redaction' && (
          <motion.div key="redaction" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
              <h2 className="font-semibold mb-2">{REDACTION_EXERCISES[exerciseIdx % REDACTION_EXERCISES.length]?.title}</h2>
              <div className="text-sm text-text-muted whitespace-pre-wrap mt-3">
                {REDACTION_EXERCISES[exerciseIdx % REDACTION_EXERCISES.length]?.brief}
              </div>
            </div>

            {subStep === 'consigne' && (
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 space-y-3">
                <h3 className="font-semibold text-emerald-400">Consigne</h3>
                <p className="text-sm">Redige le message de communication demande dans le brief. Tu seras evaluee sur :</p>
                <ul className="text-sm space-y-1 text-text-muted">
                  {REDACTION_EXERCISES[exerciseIdx % REDACTION_EXERCISES.length]?.criteres.map((c, i) => (
                    <li key={i}>{i + 1}. {c}</li>
                  ))}
                </ul>
                <button onClick={() => setSubStep('work')} className="mt-4 px-6 py-3 rounded-xl bg-emerald-500 text-white font-medium text-sm flex items-center gap-2">
                  Commencer <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {subStep === 'work' && (
              <div className="space-y-4">
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Redige ton message ici..."
                  className="w-full h-72 bg-bg-card border border-white/10 rounded-xl p-4 text-sm resize-none focus:outline-none focus:border-emerald-500/50"
                />
                <button
                  onClick={handleSubmitRedaction}
                  disabled={userAnswer.length < 50}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-700 text-white font-medium text-sm disabled:opacity-30"
                >
                  Envoyer a Coline pour correction
                </button>
              </div>
            )}

            {subStep === 'correction' && (
              <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Bot className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-semibold">Correction de Coline</h3>
                  {loadingCorrection && <Loader2 className="w-4 h-4 animate-spin text-text-muted" />}
                </div>
                <div className="text-sm leading-relaxed whitespace-pre-wrap">{correction}</div>
                <div className="flex gap-3 mt-6">
                  <button onClick={reset} className="flex-1 py-3 rounded-xl bg-bg-hover text-sm font-medium flex items-center justify-center gap-2">
                    <RotateCcw className="w-4 h-4" /> Recommencer
                  </button>
                  <button onClick={() => { reset(); setExerciseIdx(exerciseIdx + 1); }} className="flex-1 py-3 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm font-medium flex items-center justify-center gap-2">
                    Exercice suivant <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <PageGuide page="ecriture" />
    </div>
  );
}
