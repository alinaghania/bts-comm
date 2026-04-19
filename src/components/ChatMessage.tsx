'use client';

import { motion } from 'motion/react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isAI = role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isAI ? '' : 'flex-row-reverse'}`}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isAI
            ? 'bg-gradient-to-br from-primary to-secondary'
            : 'bg-bg-hover'
        }`}
      >
        {isAI ? (
          <Bot className="w-4 h-4 text-white" />
        ) : (
          <User className="w-4 h-4 text-text-muted" />
        )}
      </div>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isAI
            ? 'bg-bg-card border border-white/5 rounded-tl-sm'
            : 'bg-primary/20 text-text rounded-tr-sm'
        }`}
      >
        {/* Simple markdown-like rendering */}
        {content.split('\n').map((line, i) => {
          if (line.startsWith('**') && line.endsWith('**')) {
            return <p key={i} className="font-bold my-1">{line.slice(2, -2)}</p>;
          }
          if (line.startsWith('- ')) {
            return (
              <p key={i} className="pl-3 my-0.5">
                <span className="text-primary mr-2">&bull;</span>
                {line.slice(2)}
              </p>
            );
          }
          if (line === '') return <br key={i} />;
          return <p key={i} className="my-0.5">{line}</p>;
        })}
      </div>
    </motion.div>
  );
}
