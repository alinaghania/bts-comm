'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, X, Bot } from 'lucide-react';

interface PageGuideProps {
  page: string;
}

const guides: Record<string, { title: string; content: string }> = {
  dashboard: {
    title: 'Dashboard',
    content:
      'C\'est ton tableau de bord. Tu vois ta progression, ton streak, tes XP et les raccourcis vers toutes les sections. C\'est ton point de depart pour chaque session de revision.',
  },
  cours: {
    title: 'Cours',
    content:
      'Explore les modules par epreuve (E1, E4, E5). Clique sur un module pour lire le cours, voir les points cles et valider chaque chapitre au fur et a mesure.',
  },
  flashcards: {
    title: 'Flashcards',
    content:
      'Clique pour reveler la reponse. Note ta difficulte (facile, moyen, difficile) pour que l\'algorithme de repetition espacee adapte la frequence de revision. Les cartes que tu maitrises apparaissent moins souvent.',
  },
  quiz: {
    title: 'Quiz',
    content:
      'Configure ton quiz (nombre de questions, mode entrelacement), reponds aux questions et Coline t\'explique chaque reponse. Gagne des XP a chaque bonne reponse.',
  },
  examens: {
    title: 'Examens',
    content:
      'Simule l\'examen en conditions reelles avec un chronometre. Tu peux aussi faire corriger ta copie par Coline. Pour l\'E5, un mode preparation oral est disponible avec checklist et grille d\'evaluation.',
  },
  analyse: {
    title: 'Analyse',
    content:
      'Coline analyse automatiquement tes forces, faiblesses et pieges recurrents. Tu obtiens un diagnostic personnalise et un plan d\'action prioritaire avec temps estime.',
  },
  bilan: {
    title: 'Bilan du jour',
    content:
      'Apres chaque session, Coline genere un compte-rendu avec tes stats du jour, ce qui a progresse, les points d\'attention et des suggestions concretes pour la prochaine session.',
  },
  tuteur: {
    title: 'Tuteur IA',
    content:
      'Pose n\'importe quelle question a Coline. Elle connait tout le programme BTS Communication. Tu peux lui demander des explications, des exercices, des fiches de revision ou de l\'aide pour tes epreuves.',
  },
  stats: {
    title: 'Statistiques',
    content:
      'Retrouve tes performances en graphiques : radar de competences, progression dans le temps, temps d\'etude hebdomadaire, points forts/faibles et prediction de note au BTS.',
  },
  'flashcards-custom': {
    title: 'Flashcards personnalisees',
    content:
      'Cree tes propres flashcards pour completer les fiches du programme. Elles sont integrees au systeme de repetition espacee et apparaissent dans tes revisions quotidiennes.',
  },
  'cours-module': {
    title: 'Module de cours',
    content:
      'Lis le contenu du chapitre, consulte les points cles et valide ta comprehension. Tu peux demander a Coline de t\'expliquer un concept ou de te faire un exercice.',
  },
};

export default function PageGuide({ page }: PageGuideProps) {
  const [open, setOpen] = useState(false);

  const guide = guides[page];
  if (!guide) return null;

  return (
    <>
      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-bg-card border border-white/10 shadow-lg flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 transition-colors"
        aria-label="Guide de la page"
      >
        <HelpCircle className="w-5 h-5" />
      </motion.button>

      {/* Popover */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-20 right-6 z-50 w-80 max-w-[calc(100vw-3rem)] bg-bg-card border border-white/10 rounded-2xl p-5 shadow-2xl"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <h3 className="text-sm font-bold">{guide.title}</h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-lg hover:bg-bg-hover transition-colors text-text-muted"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">{guide.content}</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
