'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import ModuleCard from '@/components/ModuleCard';
import { useProgress } from '@/lib/hooks';

const modules = [
  // E1 - Cultures de la communication
  { id: 'theories-com', title: 'Theories de la communication (Shannon, Lasswell, Jakobson, Palo Alto)', exam: 'E1', chapters: 6 },
  { id: 'semiologie', title: 'Semiologie (Saussure, Barthes, Peirce)', exam: 'E1', chapters: 5 },
  { id: 'rhetorique', title: 'Rhetorique & figures de style', exam: 'E1', chapters: 4 },
  { id: 'argumentation', title: 'Argumentation & persuasion', exam: 'E1', chapters: 4 },
  { id: 'medias-enjeux', title: 'Medias et enjeux societaux', exam: 'E1', chapters: 5 },
  { id: 'methodologie-e1', title: 'Methodologie E1 (analyse texte, dissertation, production creative)', exam: 'E1', chapters: 6 },
  { id: 'thematiques-2026', title: 'Thematiques 2026 ("A table", "La rue", "L\'exces")', exam: 'E1', chapters: 3 },

  // E4 - Strategie de communication
  { id: 'veille-operationnelle', title: 'Veille operationnelle & strategique', exam: 'E4', chapters: 4 },
  { id: 'diagnostic', title: 'Diagnostic (SWOT, PESTEL)', exam: 'E4', chapters: 5 },
  { id: 'positionnement', title: 'Positionnement, objectifs, cibles', exam: 'E4', chapters: 4 },
  { id: 'types-com', title: 'Types de communication (institutionnelle, commerciale, interne, crise)', exam: 'E4', chapters: 6 },
  { id: 'moyens-medias', title: 'Moyens medias & hors-medias', exam: 'E4', chapters: 5 },
  { id: 'recommandation', title: 'Recommandation strategique & copy strategy', exam: 'E4', chapters: 5 },
  { id: 'plan-com', title: 'Plan de communication, budget, planning', exam: 'E4', chapters: 4 },
  { id: 'droit-com', title: 'Droit de la communication', exam: 'E4', chapters: 5 },

  // E5 - Portfolio oral
  { id: 'portfolio-numerique', title: 'Construire son portfolio numerique', exam: 'E5', chapters: 4 },
  { id: 'fiches-descriptives', title: 'Rediger ses 3 fiches descriptives', exam: 'E5', chapters: 3 },
  { id: 'presentation-orale', title: 'Technique de presentation orale', exam: 'E5', chapters: 4 },
  { id: 'grille-evaluation', title: "Grille d'evaluation & criteres", exam: 'E5', chapters: 3 },
];

const tabs = [
  { id: 'all', label: 'Tous' },
  { id: 'E1', label: 'E1 - Cultures' },
  { id: 'E4', label: 'E4 - Strategie' },
  { id: 'E5', label: 'E5 - Portfolio' },
];

export default function CoursPage() {
  const [activeTab, setActiveTab] = useState('all');
  const { progress, loading } = useProgress();

  const filtered = activeTab === 'all' ? modules : modules.filter((m) => m.exam === activeTab);

  // Progress comes from DB via useProgress, mapped per exam
  const getModuleProgress = (exam: string): number => {
    if (loading) return 0;
    switch (exam) {
      case 'E1': return progress.e1Progress;
      case 'E4': return progress.e4Progress;
      case 'E5': return progress.e5Progress;
      default: return 0;
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold">Cours</h1>
        <p className="text-text-muted mt-1">Explore les modules par epreuve</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'bg-bg-card text-text-muted hover:text-text hover:bg-bg-hover'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Module grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((mod, i) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <ModuleCard
              id={mod.id}
              title={mod.title}
              exam={mod.exam}
              progress={getModuleProgress(mod.exam)}
              chapters={mod.chapters}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
