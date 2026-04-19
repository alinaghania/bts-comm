'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, Loader2, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTutor } from '@/lib/hooks';

interface ChatMsg {
  role: 'user' | 'assistant';
  content: string;
}

const PAGE_HINTS: Record<string, string> = {
  '/cours': 'Besoin d\'aide ?',
  '/quiz': 'Je peux expliquer',
  '/examens': 'Des conseils ?',
  '/ecriture': 'Je corrige',
  '/aujourdhui': 'Ton plan du jour',
};

const PAGE_CONTEXTS: Record<string, string> = {
  '/cours': 'course_help',
  '/quiz': 'quiz_explanation',
  '/examens': 'exam_advice',
  '/ecriture': 'writing_correction',
  '/aujourdhui': 'daily_plan',
  '/tuteur': 'general',
  '/flashcards': 'flashcard_help',
  '/stats': 'stats_analysis',
  '/analyse': 'analysis',
  '/bilan': 'daily_report',
};

const PAGE_TIPS: Record<string, string> = {
  '/cours': 'N\'hesite pas a reformuler les concepts avec tes propres mots pour mieux les retenir.',
  '/quiz': 'Prends le temps de lire chaque option avant de repondre. Les pieges sont souvent dans les details.',
  '/examens': 'En conditions d\'examen, commence par analyser le sujet 5 minutes avant d\'ecrire.',
  '/ecriture': 'Structure ta copie en 3 parties claires. L\'introduction doit accrocher le correcteur.',
  '/aujourdhui': 'Suis le plan etape par etape, sans sauter d\'exercice. La regularite paie.',
  '/flashcards': 'Revise tes flashcards tous les jours, meme 5 minutes. La repetition espacee est la cle.',
  '/stats': 'Concentre-toi sur tes competences les plus faibles, c\'est la que tu gagnes le plus de points.',
};

export default function ColineDock() {
  const pathname = usePathname();
  const { sendMessage, loading: tutorLoading } = useTutor();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const [notificationCount, setNotificationCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Hide on onboarding / root page if it's the onboarding
  const isOnboarding = pathname === '/';

  // Get contextual hint text
  const hintText = PAGE_HINTS[pathname] || '';
  const tipText = PAGE_TIPS[pathname] || PAGE_TIPS['/aujourdhui'];
  const contextMode = PAGE_CONTEXTS[pathname] || 'general';

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setNotificationCount(0);
    }
  }, [open]);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || tutorLoading) return;

    const userMsg: ChatMsg = { role: 'user', content: trimmed };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');

    const response = await sendMessage(
      newMessages.map((m) => ({ role: m.role, content: m.content })),
      contextMode
    );

    if (response) {
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    }
  }, [input, messages, sendMessage, tutorLoading, contextMode]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isOnboarding) return null;

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-40 group"
      >
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/25 transition-transform group-hover:scale-105 active:scale-95">
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="bot"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Bot className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notification badge */}
          {notificationCount > 0 && !open && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-danger flex items-center justify-center"
            >
              <span className="text-[10px] font-bold text-white">{notificationCount}</span>
            </motion.div>
          )}
        </div>

        {/* Contextual hint */}
        {hintText && !open && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-2 right-16 whitespace-nowrap px-3 py-1.5 rounded-xl bg-bg-card/95 backdrop-blur-sm border border-white/10 shadow-lg"
          >
            <p className="text-xs font-medium text-text-muted">{hintText}</p>
          </motion.div>
        )}
      </motion.button>

      {/* Side panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.8 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 w-full sm:w-80 bg-bg-card/95 backdrop-blur-xl border-l border-white/5 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold">Coline</p>
                  <p className="text-xs text-text-muted truncate">
                    Je suis la pour t'accompagner
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg hover:bg-bg-hover transition-colors shrink-0"
                >
                  <X className="w-4 h-4 text-text-muted" />
                </button>
              </div>

              {/* Conseil du moment */}
              {tipText && messages.length === 0 && (
                <div className="px-5 py-4 border-b border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                      Conseil du moment
                    </p>
                  </div>
                  <p className="text-sm text-text/80 leading-relaxed">{tipText}</p>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-3">
                      <Bot className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-sm text-text-muted">
                      Pose-moi une question ou demande-moi de l'aide
                    </p>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                        <Bot className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-primary/20 text-text rounded-tr-sm'
                          : 'bg-white/5 border border-white/5 rounded-tl-sm'
                      }`}
                    >
                      {msg.content.split('\n').map((line, j) => {
                        if (line === '') return <br key={j} />;
                        if (line.startsWith('- ')) {
                          return (
                            <p key={j} className="pl-2 my-0.5">
                              <span className="text-primary mr-1.5">&bull;</span>
                              {line.slice(2)}
                            </p>
                          );
                        }
                        return <p key={j} className="my-0.5">{line}</p>;
                      })}
                    </div>
                  </motion.div>
                ))}

                {tutorLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-2.5"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="px-3.5 py-2.5 rounded-2xl bg-white/5 border border-white/5 rounded-tl-sm">
                      <div className="flex items-center gap-2 text-text-muted">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span className="text-xs">Coline reflechit...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="px-4 py-3 border-t border-white/5">
                <div className="flex items-center gap-2 bg-bg-hover/60 rounded-xl px-3 py-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Pose une question..."
                    className="flex-1 bg-transparent text-sm text-text placeholder:text-text-muted/50 outline-none"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || tutorLoading}
                    className="p-1.5 rounded-lg bg-primary/20 hover:bg-primary/30 disabled:opacity-30 disabled:hover:bg-primary/20 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-primary" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
