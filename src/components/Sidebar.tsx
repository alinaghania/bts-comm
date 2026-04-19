'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BookOpen,
  Layers,
  PenLine,
  FileText,
  Bot,
  BarChart3,
  Menu,
  X,
  Sparkles,
  Clock,
  CircleHelp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import XPBar from './XPBar';

const mainNavItems = [
  { href: '/aujourdhui', label: 'Aujourd\'hui', icon: Home },
  { href: '/ecriture', label: 'Ecrire', icon: PenLine },
  { href: '/examens', label: 'Examen', icon: FileText },
  { href: '/cours', label: 'Cours', icon: BookOpen },
  { href: '/tuteur', label: 'Coline', icon: Bot },
];

const secondaryNavItems = [
  { href: '/stats', label: 'Stats', icon: BarChart3 },
  { href: '/bilan', label: 'Historique', icon: Clock },
  { href: '/quiz', label: 'Quiz', icon: CircleHelp },
  { href: '/flashcards', label: 'Flashcards', icon: Layers },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const renderNavItem = (item: { href: string; label: string; icon: typeof Home }, size: 'main' | 'secondary') => {
    const active = isActive(item.href);
    const Icon = item.icon;
    const isMain = size === 'main';

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => setMobileOpen(false)}
        className={`flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200 ${
          isMain ? 'px-4 py-3' : 'px-4 py-2.5'
        } ${
          active
            ? 'bg-primary/15 text-primary-light'
            : 'text-text-muted hover:bg-bg-hover hover:text-text'
        }`}
      >
        <Icon className={`${isMain ? 'w-5 h-5' : 'w-4 h-4'} ${active ? 'text-primary' : ''}`} />
        <span className={isMain ? '' : 'text-xs'}>{item.label}</span>
        {active && (
          <motion.div
            layoutId="nav-indicator"
            className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
          />
        )}
      </Link>
    );
  };

  const navContent = (
    <nav className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-text">BTS Comm</h1>
          <p className="text-xs text-text-muted">Revision intelligente</p>
        </div>
      </div>

      {/* Main nav items */}
      <div className="flex-1 px-3 py-4 space-y-1">
        {mainNavItems.map((item) => renderNavItem(item, 'main'))}

        {/* Separator */}
        <div className="my-4 mx-4 border-t border-white/5" />

        {/* Secondary nav items */}
        <div className="space-y-0.5">
          {secondaryNavItems.map((item) => renderNavItem(item, 'secondary'))}
        </div>
      </div>

      {/* XP Bar in footer */}
      <div className="px-4 pb-6">
        <XPBar level={7} xp={2450} xpToNext={3000} />
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-bg-card border-r border-white/5">
        {navContent}
      </aside>

      {/* Mobile hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-bg-card/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm">BTS Comm</span>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg hover:bg-bg-hover transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-bg-card border-r border-white/5"
            >
              {navContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
