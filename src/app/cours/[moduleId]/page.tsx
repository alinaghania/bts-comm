'use client';

import { use, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, Circle, BookOpen, Brain, Bot, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import OpusHelper from '@/components/OpusHelper';
import DidYouKnow from '@/components/DidYouKnow';

const chapterFacts: Record<string, string> = {
  'ch1': 'Le modele de Shannon a ete concu pour les telecommunications, pas pour la communication humaine ! Il a fallu attendre Palo Alto pour une vision plus humaine.',
  'ch2': 'Roland Barthes a analyse une simple pub pour des pates Panzani et en a tire une theorie revolutionnaire sur l\'image. Comme quoi, tout peut etre un objet d\'etude !',
  'ch3': 'En 1938, la fausse emission radio "La Guerre des mondes" d\'Orson Welles a provoque une panique reelle. C\'est l\'un des premiers exemples de l\'impact des medias de masse.',
  'ch4': 'Le mot "rhetorique" vient du grec "rhetorike" qui signifie "art de bien parler". Les Grecs anciens l\'enseignaient dans toutes les ecoles !',
};

interface ModuleData {
  title: string;
  exam: string;
  chapters: {
    id: string;
    title: string;
    completed: boolean;
    content: string[];
    keyPoints: string[];
  }[];
}

const moduleData: Record<string, ModuleData> = {
  'cultures-com': {
    title: 'Cultures de la communication',
    exam: 'E1',
    chapters: [
      {
        id: 'ch1',
        title: 'Les theories de la communication',
        completed: true,
        content: [
          'La communication est un processus complexe qui a ete theorise par de nombreux chercheurs au fil du XXe siecle.',
          'Le modele de Shannon et Weaver (1949) est le premier modele mathematique de la communication. Il decompose le processus en : source, emetteur, canal, recepteur, destinataire. Ce modele introduit la notion de bruit, qui represente toute perturbation du signal.',
          'Le modele de Jakobson (1963) identifie 6 fonctions du langage liees aux 6 elements de la communication :',
          '- Fonction referentielle (contexte) : informer, decrire la realite',
          '- Fonction emotive (emetteur) : exprimer les sentiments de l\'emetteur',
          '- Fonction conative (recepteur) : agir sur le recepteur, le convaincre',
          '- Fonction phatique (canal) : maintenir le contact',
          '- Fonction metalinguistique (code) : parler du langage lui-meme',
          '- Fonction poetique (message) : attirer l\'attention sur la forme du message',
          'L\'Ecole de Palo Alto apporte une vision systemique. Selon Watzlawick, "on ne peut pas ne pas communiquer". La communication est un systeme circulaire, pas lineaire.',
        ],
        keyPoints: [
          'Shannon & Weaver : modele lineaire avec notion de bruit',
          'Jakobson : 6 fonctions du langage',
          'Palo Alto : communication systemique et circulaire',
          'Watzlawick : "On ne peut pas ne pas communiquer"',
        ],
      },
      {
        id: 'ch2',
        title: 'La semiotique et l\'analyse de l\'image',
        completed: true,
        content: [
          'La semiotique est la science des signes, fondee par Ferdinand de Saussure (linguistique) et Charles Sanders Peirce (semiotique generale).',
          'Selon Saussure, le signe est compose du signifiant (la forme, l\'expression) et du signifie (le concept, le contenu). Le lien entre les deux est arbitraire.',
          'Roland Barthes a applique la semiotique a l\'analyse de l\'image publicitaire. Dans son etude des "Mythologies" et de la rhetorique de l\'image (pub Panzani), il distingue :',
          '- Le message linguistique : texte, slogan, legende',
          '- Le message iconique code (denote) : ce qu\'on voit objectivement',
          '- Le message iconique non-code (connote) : les associations culturelles, symboliques',
          'Les signes visuels peuvent etre : iconiques (ressemblance), indiciels (lien causal) ou symboliques (convention).',
        ],
        keyPoints: [
          'Saussure : signifiant + signifie = signe',
          'Barthes : 3 niveaux de lecture de l\'image',
          'Denotation vs Connotation',
          'Icone, Indice, Symbole (Peirce)',
        ],
      },
      {
        id: 'ch3',
        title: 'Sociologie des medias',
        completed: false,
        content: [
          'Les medias jouent un role central dans la construction de l\'opinion publique et la diffusion de la culture.',
          'La theorie de l\'agenda-setting (McCombs & Shaw, 1972) montre que les medias ne disent pas aux gens ce qu\'ils doivent penser, mais ce a quoi ils doivent penser. Le choix des sujets couverts influence les preoccupations du public.',
          'La spirale du silence (Noelle-Neumann, 1974) explique que les individus qui percoivent leur opinion comme minoritaire tendent a se taire, renforant l\'opinion dominante.',
          'L\'ere numerique a transforme le paysage mediatique avec l\'emergence des reseaux sociaux, qui permettent a chaque individu de devenir emetteur (prosumer). Cela pose de nouvelles questions sur la desinformation, les bulles de filtre et la polarisation.',
        ],
        keyPoints: [
          'Agenda-setting : les medias orientent l\'attention publique',
          'Spirale du silence : l\'opinion minoritaire s\'autocensure',
          'Prosumer : consommateur + producteur de contenu',
          'Bulles de filtre et desinformation a l\'ere numerique',
        ],
      },
      {
        id: 'ch4',
        title: 'Communication et argumentation',
        completed: false,
        content: [
          'L\'argumentation est au coeur de la communication persuasive. Elle vise a convaincre (raison) ou persuader (emotion).',
          'Les types d\'arguments : argument d\'autorite, argument par analogie, argument par l\'exemple, argument par les consequences, argument de causalite.',
          'Les procedes rhetoriques : anaphore, metaphore, hyperbole, euphemisme, antithese, gradation.',
          'Aristote distinguait trois moyens de persuasion : l\'ethos (credibilite de l\'orateur), le pathos (emotion du public), le logos (logique du discours).',
        ],
        keyPoints: [
          'Convaincre (raison) vs Persuader (emotion)',
          'Ethos, Pathos, Logos',
          'Types d\'arguments : autorite, analogie, exemple, consequences',
          'Procedes rhetoriques : anaphore, metaphore, antithese...',
        ],
      },
      {
        id: 'ch5',
        title: 'Expression et culture generale',
        completed: false,
        content: [],
        keyPoints: [],
      },
      {
        id: 'ch6',
        title: 'Methodologie de la dissertation',
        completed: false,
        content: [],
        keyPoints: [],
      },
      {
        id: 'ch7',
        title: 'La synthese de documents',
        completed: false,
        content: [],
        keyPoints: [],
      },
      {
        id: 'ch8',
        title: 'Entrainement E1 complet',
        completed: false,
        content: [],
        keyPoints: [],
      },
    ],
  },
  'strategie-com': {
    title: 'Strategie de communication',
    exam: 'E4',
    chapters: [
      {
        id: 'ch1',
        title: 'Le diagnostic de communication',
        completed: true,
        content: [
          'Le diagnostic de communication est la premiere etape de toute strategie. Il permet d\'analyser la situation actuelle de l\'annonceur.',
          'L\'analyse SWOT est l\'outil principal :',
          '- Forces (Strengths) : avantages concurrentiels, ressources internes',
          '- Faiblesses (Weaknesses) : limites, points a ameliorer',
          '- Opportunites (Opportunities) : tendances favorables, marche',
          '- Menaces (Threats) : concurrence, evolution defavorable',
          'Le diagnostic inclut aussi l\'analyse de l\'image de marque actuelle, le mapping de positionnement, et l\'audit de communication (revue de toutes les actions passees).',
        ],
        keyPoints: [
          'SWOT : Forces, Faiblesses, Opportunites, Menaces',
          'Analyse interne + externe',
          'Audit de communication',
          'Mapping de positionnement',
        ],
      },
      {
        id: 'ch2',
        title: 'Objectifs et cibles de communication',
        completed: true,
        content: [
          'Les objectifs de communication se declinent en 3 niveaux (modele AIDA) :',
          '- Cognitif : faire connaitre (notoriete)',
          '- Affectif : faire aimer (image)',
          '- Conatif : faire agir (comportement)',
          'Les objectifs doivent etre SMART : Specifiques, Mesurables, Atteignables, Realistes, Temporels.',
          'Les cibles se definissent en :',
          '- Coeur de cible : segment prioritaire',
          '- Cible principale : ensemble des personnes visees',
          '- Cible secondaire : influenceurs, prescripteurs, leaders d\'opinion',
        ],
        keyPoints: [
          'Cognitif, Affectif, Conatif',
          'Objectifs SMART',
          'Coeur de cible, cible principale, cible secondaire',
          'Modele AIDA : Attention, Interet, Desir, Action',
        ],
      },
      {
        id: 'ch3', title: 'La strategie creative', completed: false, content: [], keyPoints: [],
      },
      {
        id: 'ch4', title: 'Le plan media', completed: false, content: [], keyPoints: [],
      },
      {
        id: 'ch5', title: 'Le budget de communication', completed: false, content: [], keyPoints: [],
      },
      {
        id: 'ch6', title: 'La communication digitale', completed: false, content: [], keyPoints: [],
      },
      {
        id: 'ch7', title: 'La communication de crise', completed: false, content: [], keyPoints: [],
      },
      {
        id: 'ch8', title: 'Etudes de cas E4', completed: false, content: [], keyPoints: [],
      },
      {
        id: 'ch9', title: 'Entrainement E4 complet', completed: false, content: [], keyPoints: [],
      },
    ],
  },
};

// Default module for any unmatched ID
const defaultModule: ModuleData = {
  title: 'Module en cours de creation',
  exam: 'E1',
  chapters: [
    {
      id: 'ch1',
      title: 'Introduction',
      completed: false,
      content: ['Le contenu de ce module est en cours de redaction. Revenez bientot !'],
      keyPoints: ['Ce module sera bientot disponible'],
    },
  ],
};

export default function ModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = use(params);
  const [openChapter, setOpenChapter] = useState<string | null>(null);
  const data = moduleData[moduleId] || defaultModule;

  const completedCount = data.chapters.filter((c) => c.completed).length;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      {/* Back + header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Link href="/cours" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Retour aux cours
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-lg">{data.exam}</span>
            <h1 className="text-2xl md:text-3xl font-bold mt-2">{data.title}</h1>
            <p className="text-text-muted mt-1">{completedCount}/{data.chapters.length} chapitres termines</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 bg-bg-hover rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / data.chapters.length) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          />
        </div>
      </motion.div>

      {/* Chapter list */}
      <div className="space-y-3">
        {data.chapters.map((chapter, i) => (
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <button
              onClick={() => setOpenChapter(openChapter === chapter.id ? null : chapter.id)}
              className="w-full text-left p-4 rounded-xl bg-bg-card border border-white/5 hover:border-white/10 transition-all"
            >
              <div className="flex items-center gap-3">
                {chapter.completed ? (
                  <div className="w-7 h-7 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-success" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-bg-hover flex items-center justify-center flex-shrink-0">
                    <Circle className="w-4 h-4 text-text-muted" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Chapitre {i + 1} : {chapter.title}</p>
                </div>
                {openChapter === chapter.id ? (
                  <ChevronUp className="w-4 h-4 text-text-muted flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-text-muted flex-shrink-0" />
                )}
              </div>
            </button>

            <AnimatePresence>
              {openChapter === chapter.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 bg-bg-card/50 border border-white/5 border-t-0 rounded-b-xl space-y-4">
                    {chapter.content.length > 0 ? (
                      <>
                        {chapter.content.map((para, j) => (
                          <p key={j} className={`text-sm leading-relaxed ${para.startsWith('- ') ? 'pl-4 text-text-muted' : 'text-text/90'}`}>
                            {para.startsWith('- ') && <span className="text-primary mr-2">&bull;</span>}
                            {para.startsWith('- ') ? para.slice(2) : para}
                          </p>
                        ))}

                        {/* DidYouKnow */}
                        {chapterFacts[chapter.id] && (
                          <DidYouKnow fact={chapterFacts[chapter.id]} />
                        )}

                        {/* Key points */}
                        {chapter.keyPoints.length > 0 && (
                          <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                            <p className="text-sm font-semibold flex items-center gap-2 mb-3">
                              <Lightbulb className="w-4 h-4 text-warning" /> Points cles
                            </p>
                            <ul className="space-y-2">
                              {chapter.keyPoints.map((point, k) => (
                                <li key={k} className="text-sm text-text-muted flex items-start gap-2">
                                  <span className="text-primary mt-0.5">&#10003;</span>
                                  <span className="flex-1">{point}</span>
                                  <OpusHelper
                                    context={`Concept du BTS Communication, module "${data.title}", chapitre "${chapter.title}" : ${point}. Explique ce point cle de maniere simple avec un exemple concret.`}
                                    type="concept"
                                    compact
                                  />
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Opus chapter helper */}
                        <div className="mt-4">
                          <OpusHelper
                            context={`Je suis en train d'etudier le chapitre "${chapter.title}" du module "${data.title}" (epreuve ${data.exam}) du BTS Communication. Les points cles sont : ${chapter.keyPoints.join(', ')}. Explique-moi ce chapitre de maniere simple avec des analogies.`}
                            type="concept"
                          />
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/5">
                          <Link
                            href="/quiz"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                          >
                            <Brain className="w-4 h-4" /> Tester mes connaissances
                          </Link>
                          <Link
                            href="/tuteur"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/10 text-secondary text-sm font-medium hover:bg-secondary/20 transition-colors"
                          >
                            <Bot className="w-4 h-4" /> Demander a l&apos;IA
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <BookOpen className="w-8 h-8 text-text-muted mx-auto mb-2" />
                        <p className="text-sm text-text-muted">Contenu a venir</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
