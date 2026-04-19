'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import ModuleCard from '@/components/ModuleCard';

const modules = [
  // E1 - Cultures de la communication
  { id: 'cultures-com', title: 'Cultures de la communication', exam: 'E1', progress: 75, chapters: 8 },
  { id: 'expression-ecrite', title: 'Expression ecrite', exam: 'E1', progress: 60, chapters: 6 },
  { id: 'sciences-humaines', title: 'Sciences humaines appliquees', exam: 'E1', progress: 45, chapters: 7 },
  { id: 'droit-com', title: 'Droit de la communication', exam: 'E1', progress: 30, chapters: 5 },
  { id: 'veille-operationnelle', title: 'Veille operationnelle', exam: 'E1', progress: 55, chapters: 4 },

  // E4 - Relations commerciales
  { id: 'strategie-com', title: 'Strategie de communication', exam: 'E4', progress: 50, chapters: 9 },
  { id: 'marketing', title: 'Marketing & etudes de marche', exam: 'E4', progress: 40, chapters: 6 },
  { id: 'media-planning', title: 'Media planning', exam: 'E4', progress: 35, chapters: 5 },
  { id: 'budget-com', title: 'Budget de communication', exam: 'E4', progress: 20, chapters: 4 },
  { id: 'relation-client', title: 'Relation client & negociation', exam: 'E4', progress: 0, chapters: 6, locked: true },

  // E5 - Activites de communication
  { id: 'production-com', title: 'Production de supports', exam: 'E5', progress: 45, chapters: 7 },
  { id: 'pao-web', title: 'PAO & Web design', exam: 'E5', progress: 35, chapters: 8 },
  { id: 'audiovisuel', title: 'Production audiovisuelle', exam: 'E5', progress: 25, chapters: 5 },
  { id: 'evenementiel', title: 'Communication evenementielle', exam: 'E5', progress: 15, chapters: 6 },
  { id: 'rp-com-crise', title: 'RP & communication de crise', exam: 'E5', progress: 0, chapters: 4, locked: true },
];

const tabs = [
  { id: 'all', label: 'Tous' },
  { id: 'E1', label: 'E1 - Cultures' },
  { id: 'E4', label: 'E4 - Relations' },
  { id: 'E5', label: 'E5 - Activites' },
];

export default function CoursPage() {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all' ? modules : modules.filter((m) => m.exam === activeTab);

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
              progress={mod.progress}
              chapters={mod.chapters}
              locked={'locked' in mod ? mod.locked : false}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
