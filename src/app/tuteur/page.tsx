'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Bot, Sparkles } from 'lucide-react';
import ChatMessage from '@/components/ChatMessage';
import PageGuide from '@/components/PageGuide';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const suggestedPrompts = [
  'Explique-moi les 6 fonctions de Jakobson',
  'Quels sont mes points faibles ?',
  'Fais-moi un exercice sur le SWOT',
  'Aide-moi pour la dissertation E1',
  'Quelle est la difference entre convaincre et persuader ?',
  'Resume le modele de Shannon et Weaver',
];

export default function TuteurPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Salut ! Je suis **Coline**, je suis la pour t'accompagner dans tes revisions du BTS Communication.

Je peux t'aider a :
- Comprendre des concepts difficiles
- Faire des exercices pratiques
- Analyser tes points faibles
- Preparer tes epreuves E1, E5 et E6

Qu'est-ce que tu veux travailler aujourd'hui ?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { role: 'user', content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      // Build conversation history (skip the initial system greeting)
      const apiMessages = updatedMessages
        .filter((m) => !(m.role === 'assistant' && updatedMessages.indexOf(m) === 0))
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': localStorage.getItem('bts-user-id') || '',
        },
        body: JSON.stringify({
          messages: apiMessages,
          context: 'default',
        }),
      });

      if (res.ok && res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let result = '';

        // Add a placeholder assistant message that we update progressively
        setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
        setIsTyping(false);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          result += decoder.decode(value, { stream: true });
          const streamedResult = result;
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: 'assistant', content: streamedResult };
            return copy;
          });
        }
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: "Desole, je n'ai pas pu repondre. Reessaie dans un instant !" },
        ]);
        setIsTyping(false);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Desole, une erreur s'est produite. Reessaie !" },
      ]);
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] lg:h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 md:px-8 py-4 border-b border-white/5"
      >
        <div className="flex items-center gap-3 max-w-3xl mx-auto">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold">Coline</h1>
            <p className="text-xs text-text-muted">Je suis la pour t'accompagner</p>
          </div>
          <div className="ml-auto flex items-center gap-1 text-xs text-success">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            En ligne
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg, i) => (
            <ChatMessage key={i} role={msg.role} content={msg.content} />
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-bg-card border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 rounded-full bg-text-muted"
                  />
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 rounded-full bg-text-muted"
                  />
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 rounded-full bg-text-muted"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Suggested prompts (only show if only 1 message) */}
          {messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2"
            >
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-left p-3 rounded-xl bg-bg-card border border-white/5 hover:border-primary/30 transition-all text-sm text-text-muted hover:text-text flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  {prompt}
                </button>
              ))}
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="px-4 md:px-8 py-4 border-t border-white/5">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pose ta question..."
            className="flex-1 bg-bg-card border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 placeholder:text-text-muted transition-colors"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!input.trim()}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white disabled:opacity-30 transition-opacity"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </form>
      </div>

      <PageGuide page="tuteur" />
    </div>
  );
}
