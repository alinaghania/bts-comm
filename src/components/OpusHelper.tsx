'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, X, Bot, Loader2 } from 'lucide-react';

interface OpusHelperProps {
  context: string;
  type?: 'question' | 'concept' | 'exam_tip';
  compact?: boolean;
}

export default function OpusHelper({ context, type = 'concept', compact = false }: OpusHelperProps) {
  const [open, setOpen] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const getExplanation = async () => {
    if (explanation) { setOpen(true); return; }
    setOpen(true);
    setLoading(true);
    try {
      const systemPrompts: Record<string, string> = {
        question: "Tu es Opus, un tuteur bienveillant. L'etudiant n'a pas compris une question de quiz. Explique pourquoi la bonne reponse est correcte et pourquoi les autres sont fausses. Utilise des ANALOGIES simples de la vie quotidienne. Sois concis (max 150 mots). Parle en francais.",
        concept: "Tu es Opus, un tuteur bienveillant. Explique ce concept de maniere ULTRA SIMPLE avec une analogie de la vie quotidienne. Ajoute un 'Le savais-tu ?' fun a la fin. Max 120 mots. Parle en francais.",
        exam_tip: "Tu es Opus, un tuteur expert du BTS Communication. Donne un conseil pratique et concret pour cette epreuve. Sois direct et actionnable. Max 100 mots. Parle en francais."
      };

      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': localStorage.getItem('bts-user-id') || '' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: context }],
          context: type === 'question' ? 'quiz_explanation' : type === 'exam_tip' ? 'exam_advice' : 'course_help',
          systemOverride: systemPrompts[type]
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
            setExplanation(result);
          }
        }
        if (!result) {
          const text = await res.text();
          setExplanation(text);
        }
      } else {
        setExplanation("Oups, je n'ai pas pu me connecter. Reessaie !");
      }
    } catch {
      setExplanation("Oups, je n'ai pas pu me connecter. Reessaie !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={getExplanation}
        className={`inline-flex items-center gap-1.5 transition-all ${
          compact
            ? 'p-1.5 rounded-lg hover:bg-primary/10'
            : 'px-3 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-medium'
        }`}
        title="Demander a Opus"
      >
        <Lightbulb className={compact ? 'w-4 h-4 text-primary' : 'w-3.5 h-3.5'} />
        {!compact && <span>Opus explique</span>}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-bg-card border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Opus</p>
                    <p className="text-xs text-text-muted">Ton tuteur IA</p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-bg-hover">
                  <X className="w-4 h-4 text-text-muted" />
                </button>
              </div>

              <div className="text-sm leading-relaxed text-text/90 min-h-[60px]">
                {loading && !explanation ? (
                  <div className="flex items-center gap-2 text-text-muted">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Opus reflechit...</span>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap">{explanation}</div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
