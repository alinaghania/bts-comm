'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  Trash2,
  Tag,
  FileText,
  Loader2,
  X,
  Layers,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/lib/hooks';
import PageGuide from '@/components/PageGuide';

interface CustomCard {
  id: string;
  question: string;
  answer: string;
  exam: string;
  tags: string[];
  createdAt: string;
}

const examOptions = ['E1', 'E5', 'E6'];

export default function CustomFlashcardsPage() {
  const { userId } = useUser();
  const [cards, setCards] = useState<CustomCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [exam, setExam] = useState('E1');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const fetchCards = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await fetch('/api/flashcards/custom', {
        headers: { 'x-user-id': userId },
      });
      if (res.ok) {
        const data = await res.json();
        setCards(data.cards || []);
      }
    } catch (e) {
      console.error('Failed to fetch custom flashcards:', e);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !question.trim() || !answer.trim()) return;

    setSaving(true);
    try {
      const res = await fetch('/api/flashcards/custom', {
        method: 'POST',
        headers: {
          'x-user-id': userId,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, answer, exam, tags }),
      });

      if (res.ok) {
        setQuestion('');
        setAnswer('');
        setExam('E1');
        setTags([]);
        setShowForm(false);
        fetchCards();
      }
    } catch (e) {
      console.error('Failed to create flashcard:', e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (cardId: string) => {
    if (!userId) return;
    setDeleting(cardId);
    try {
      const res = await fetch('/api/flashcards/custom', {
        method: 'DELETE',
        headers: {
          'x-user-id': userId,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cardId }),
      });

      if (res.ok) {
        setCards(cards.filter((c) => c.id !== cardId));
      }
    } catch (e) {
      console.error('Failed to delete flashcard:', e);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Link
          href="/flashcards"
          className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Retour aux flashcards
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Flashcards personnalisees</h1>
            <p className="text-text-muted mt-1">Cree tes propres fiches de revision</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showForm ? 'Fermer' : 'Nouvelle carte'}
          </button>
        </div>
      </motion.div>

      {/* Formulaire de creation */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="bg-bg-card border border-white/5 rounded-2xl p-6 space-y-5 overflow-hidden"
          >
            <div>
              <label className="text-sm font-medium text-text-muted block mb-2">
                Question (recto)
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ex: Qu'est-ce que la fonction phatique selon Jakobson ?"
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-bg border border-white/10 text-sm text-text placeholder:text-text-muted/50 focus:outline-none focus:border-primary/50 resize-none"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-text-muted block mb-2">
                Reponse (verso)
              </label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Ex: La fonction phatique sert a etablir, maintenir ou interrompre le contact..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-bg border border-white/10 text-sm text-text placeholder:text-text-muted/50 focus:outline-none focus:border-primary/50 resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Epreuve */}
              <div>
                <label className="text-sm font-medium text-text-muted block mb-2">
                  <FileText className="w-3.5 h-3.5 inline mr-1.5" />
                  Epreuve
                </label>
                <div className="flex gap-2">
                  {examOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setExam(opt)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        exam === opt
                          ? 'bg-primary text-white'
                          : 'bg-bg border border-white/10 text-text-muted hover:text-text'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="text-sm font-medium text-text-muted block mb-2">
                  <Tag className="w-3.5 h-3.5 inline mr-1.5" />
                  Tags
                </label>
                <div className="flex gap-2">
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder="Ex: semiologie"
                    className="flex-1 px-3 py-2 rounded-lg bg-bg border border-white/10 text-sm text-text placeholder:text-text-muted/50 focus:outline-none focus:border-primary/50"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-3 py-2 rounded-lg bg-bg-hover text-sm text-text-muted hover:text-text transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tags list */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={saving || !question.trim() || !answer.trim()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Creer la flashcard
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Liste des flashcards */}
      {loading ? (
        <div className="space-y-3 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-bg-card rounded-xl" />
          ))}
        </div>
      ) : cards.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-text-muted">
            <Layers className="w-4 h-4" />
            <span className="text-sm font-medium">{cards.length} flashcard{cards.length > 1 ? 's' : ''} personnalisee{cards.length > 1 ? 's' : ''}</span>
          </div>

          <AnimatePresence>
            {cards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ delay: i * 0.03 }}
                className="bg-bg-card border border-white/5 rounded-xl p-4 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium mb-1">{card.question}</p>
                    <p className="text-xs text-text-muted line-clamp-2">{card.answer}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
                        {card.exam}
                      </span>
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-bg-hover text-text-muted text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="text-xs text-text-muted ml-auto">
                        {new Date(card.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(card.id)}
                    disabled={deleting === card.id}
                    className="p-2 rounded-lg text-text-muted hover:text-danger hover:bg-danger/10 transition-all opacity-0 group-hover:opacity-100"
                  >
                    {deleting === card.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Layers className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-lg font-semibold mb-2">Aucune flashcard personnalisee</h2>
          <p className="text-sm text-text-muted max-w-md mx-auto mb-6">
            Cree tes propres flashcards pour completer tes revisions. Elles seront integrees au systeme de repetition espacee.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
          >
            Creer ma premiere flashcard
          </button>
        </motion.div>
      )}

      <PageGuide page="flashcards-custom" />
    </div>
  );
}
