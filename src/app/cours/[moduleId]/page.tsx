'use client';

import { use, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, Circle, BookOpen, Brain, Bot, ChevronDown, ChevronUp, Lightbulb, CircleCheck } from 'lucide-react';
import Link from 'next/link';
import ColineHelper from '@/components/ColineHelper';
import DidYouKnow from '@/components/DidYouKnow';
import { getModuleById } from '@/lib/course-data';

export default function ModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = use(params);
  const [openChapter, setOpenChapter] = useState<string | null>(null);

  const mod = getModuleById(moduleId);

  if (!mod) {
    return (
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <Link href="/cours" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Retour aux cours
        </Link>
        <div className="text-center py-16">
          <BookOpen className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <h1 className="text-xl font-bold">Module en cours de creation</h1>
          <p className="text-sm text-text-muted mt-2">Ce module sera bientot disponible. En attendant, explore les autres cours !</p>
          <Link href="/cours" className="inline-block mt-6 px-6 py-3 rounded-xl bg-primary text-white text-sm font-medium">
            Voir les cours disponibles
          </Link>
        </div>
      </div>
    );
  }

  const examLabel = mod.exam === 'e1' ? 'E1' : mod.exam === 'e5' ? 'E5' : 'E6';

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Link href="/cours" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Retour aux cours
        </Link>
        <div>
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-lg">{examLabel}</span>
          <h1 className="text-2xl md:text-3xl font-bold mt-2">{mod.title}</h1>
          <p className="text-text-muted mt-1">{mod.chapters.length} chapitre{mod.chapters.length > 1 ? 's' : ''}</p>
        </div>
      </motion.div>

      <div className="space-y-3">
        {mod.chapters.map((chapter, i) => (
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
                <div className="w-7 h-7 rounded-full bg-bg-hover flex items-center justify-center flex-shrink-0">
                  {openChapter === chapter.id ? (
                    <CircleCheck className="w-4 h-4 text-primary" />
                  ) : (
                    <Circle className="w-4 h-4 text-text-muted" />
                  )}
                </div>
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
                    {/* Course content */}
                    <div className="text-sm leading-relaxed whitespace-pre-wrap text-text/90">
                      {chapter.content}
                    </div>

                    {/* Did you know */}
                    {chapter.didYouKnow && (
                      <DidYouKnow fact={chapter.didYouKnow} />
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
                              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="flex-1">{point}</span>
                              <ColineHelper
                                context={`Concept du BTS Communication, module "${mod.title}", chapitre "${chapter.title}" : ${point}. Explique ce point cle de maniere simple avec un exemple concret.`}
                                type="concept"
                                compact
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Flashcards count */}
                    {chapter.flashcards.length > 0 && (
                      <div className="p-3 rounded-lg bg-bg-hover/50 text-xs text-text-muted">
                        {chapter.flashcards.length} flashcards disponibles pour ce chapitre
                      </div>
                    )}

                    {/* Coline helper */}
                    <div className="mt-4">
                      <ColineHelper
                        context={`Je suis en train d'etudier le chapitre "${chapter.title}" du module "${mod.title}" (epreuve ${examLabel}) du BTS Communication. Les points cles sont : ${chapter.keyPoints.join(', ')}. Explique-moi ce chapitre de maniere simple avec des analogies.`}
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
                        <Bot className="w-4 h-4" /> Demander a Coline
                      </Link>
                    </div>
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
