'use client';

import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Filter, Box, BarChart3, PartyPopper } from 'lucide-react';
import FlashCard from '@/components/FlashCard';
import ColineHelper from '@/components/ColineHelper';
import { useFlashcards } from '@/lib/hooks';
import PageGuide from '@/components/PageGuide';

const examFilters = ['Toutes', 'E1', 'E5', 'E6'];

export default function FlashcardsPage() {
  const [examFilter, setExamFilter] = useState<string>('Toutes');
  const activeExam = examFilter === 'Toutes' ? undefined : examFilter;
  const { dueToday, mastered, learning, flashcards, rateCard, refetch } = useFlashcards(activeExam);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewed, setReviewed] = useState(0);

  const currentCards = dueToday;
  const currentCard = currentCards[currentIndex];

  const handleRate = useCallback((quality: number) => {
    if (currentCard) {
      rateCard(currentCard.id, quality).then(() => refetch());
    }
    setReviewed((r) => r + 1);
    // Move to next card
    if (currentIndex < currentCards.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setCurrentIndex(0);
    }
  }, [currentIndex, currentCards.length, currentCard, rateCard, refetch]);

  // Leitner box visualization
  const boxes = [1, 2, 3, 4, 5];
  const cardsPerBox = boxes.map((box) => flashcards.filter((c) => c.box === box).length);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold">Flashcards</h1>
        <p className="text-text-muted mt-1">Revision espacee avec le systeme de Leitner</p>
      </motion.div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-bg-card border border-white/5 rounded-xl p-4 text-center"
        >
          <p className="text-2xl font-bold text-warning">{dueToday.length}</p>
          <p className="text-xs text-text-muted">A revoir</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-bg-card border border-white/5 rounded-xl p-4 text-center"
        >
          <p className="text-2xl font-bold text-success">{mastered.length}</p>
          <p className="text-xs text-text-muted">Maitrisees</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-bg-card border border-white/5 rounded-xl p-4 text-center"
        >
          <p className="text-2xl font-bold text-secondary">{learning.length}</p>
          <p className="text-xs text-text-muted">En cours</p>
        </motion.div>
      </div>

      {/* Leitner boxes */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-bg-card border border-white/5 rounded-2xl p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <Box className="w-4 h-4 text-text-muted" />
          <p className="text-sm font-semibold">Systeme de Leitner</p>
        </div>
        <div className="flex gap-2">
          {boxes.map((box, i) => {
            const maxCards = Math.max(...cardsPerBox, 1);
            const height = Math.max(20, (cardsPerBox[i] / maxCards) * 100);
            const colors = ['bg-danger', 'bg-warning', 'bg-yellow-400', 'bg-success', 'bg-primary'];
            return (
              <div key={box} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full h-24 flex items-end justify-center">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    className={`w-full rounded-t-lg ${colors[i]} opacity-60`}
                  />
                </div>
                <p className="text-xs font-medium">{cardsPerBox[i]}</p>
                <p className="text-xs text-text-muted">Boite {box}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Filter */}
      <div className="flex items-center gap-3">
        <Filter className="w-4 h-4 text-text-muted" />
        <div className="flex gap-2">
          {examFilters.map((f) => (
            <button
              key={f}
              onClick={() => { setExamFilter(f); setCurrentIndex(0); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                examFilter === f
                  ? 'bg-primary text-white'
                  : 'bg-bg-card text-text-muted hover:text-text'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <BarChart3 className="w-4 h-4 text-text-muted" />
        <div className="flex-1 h-2 bg-bg-hover rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-success rounded-full"
            style={{ width: `${currentCards.length > 0 ? (reviewed / currentCards.length) * 100 : 0}%` }}
          />
        </div>
        <span className="text-xs text-text-muted">{reviewed}/{currentCards.length}</span>
      </div>

      {/* Card */}
      {currentCard ? (
        <div className="space-y-4">
          <FlashCard
            question={currentCard.question}
            answer={currentCard.answer}
            exam={currentCard.exam}
            onRate={handleRate}
          />
          <div className="flex justify-center">
            <ColineHelper
              context={`Concept a expliquer pour un etudiant en BTS Communication :\nQuestion : ${currentCard.question}\nReponse : ${currentCard.answer}\nExplique ce concept avec une analogie simple et des exemples concrets du monde de la communication.`}
              type="concept"
            />
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="mb-4">
            <PartyPopper className="w-10 h-10 text-success mx-auto" />
          </div>
          <h2 className="text-xl font-bold">Bravo !</h2>
          <p className="text-text-muted mt-2">Toutes les cartes ont ete revisees pour aujourd&apos;hui</p>
        </motion.div>
      )}

      <PageGuide page="flashcards" />
    </div>
  );
}
