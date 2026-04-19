'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Bot, Sparkles } from 'lucide-react';
import ChatMessage from '@/components/ChatMessage';

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

const aiResponses: Record<string, string> = {
  'Explique-moi les 6 fonctions de Jakobson': `**Les 6 fonctions du langage de Jakobson**

Roman Jakobson a identifie 6 fonctions du langage, chacune liee a un element de la communication :

- **Referentielle** (contexte) : informer, decrire la realite objective
- **Emotive/expressive** (emetteur) : exprimer les sentiments, l'attitude de l'emetteur
- **Conative** (recepteur) : agir sur le destinataire (ordre, priere, question)
- **Phatique** (canal) : etablir, maintenir ou rompre le contact ("Allo ?", "Tu m'ecoutes ?")
- **Metalinguistique** (code) : parler du langage lui-meme ("Que signifie ce mot ?")
- **Poetique** (message) : attirer l'attention sur la forme du message (jeux de mots, rimes)

En publicite, on retrouve souvent la fonction conative (pousser a l'achat), la fonction poetique (slogan memorable) et la fonction emotive (creer une connexion emotionnelle).`,

  'Quels sont mes points faibles ?': `D'apres tes resultats, voici une analyse de tes points faibles :

- **Sociologie des medias** : tu as 45% de reussite sur ce module. Je te recommande de revoir les theories d'agenda-setting et de la spirale du silence.
- **Budget de communication** : seulement 20% de progression. C'est un sujet technique mais important pour E4.
- **Production audiovisuelle** : 25% de progression. Revois les etapes de production et les formats.

**Mon conseil :** Concentre-toi sur 1 point faible par semaine. Commence par la sociologie des medias car c'est fondamental pour E1.`,

  'Fais-moi un exercice sur le SWOT': `**Exercice pratique : Analyse SWOT**

Voici le cas : Une boulangerie artisanale "Le Pain Dore" veut developper sa communication.

**Contexte :**
- Boulangerie familiale depuis 30 ans dans un quartier residentiel
- Produits bio et locaux, pain au levain
- Pas de presence sur les reseaux sociaux
- Un concurrent (chaine) vient d'ouvrir a 200m
- Le quartier accueille de nouveaux habitants (jeunes actifs)

**Travail demande :**
Realise l'analyse SWOT complete de cette boulangerie.

Quand tu auras fini, dis-moi et je te donnerai la correction !`,
};

export default function TuteurPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Salut ! Je suis **Opus**, ton tuteur IA pour le BTS Communication.

Je peux t'aider a :
- Comprendre des concepts difficiles
- Faire des exercices pratiques
- Analyser tes points faibles
- Preparer tes epreuves E1, E4 et E5

Qu'est-ce que tu veux travailler aujourd'hui ?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = aiResponses[text] || `Bonne question ! Voici ce que je peux te dire sur "${text}" :

C'est un sujet important pour le BTS Communication. Pour bien le maitriser, je te recommande de :
- Revoir le cours correspondant dans la section "Cours"
- Faire les flashcards associees
- S'entrainer avec des quiz

N'hesite pas a me poser des questions plus precises pour que je puisse t'aider au mieux !`;

      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1500);
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
            <h1 className="font-bold">Opus</h1>
            <p className="text-xs text-text-muted">Tuteur IA - BTS Communication</p>
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
    </div>
  );
}
