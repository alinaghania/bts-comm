import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import ColineDock from '@/components/ColineDock';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'BTS Comm - Revision intelligente',
  description: 'Plateforme de revision pour le BTS Communication avec IA, flashcards et quiz',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full">
        <Sidebar />
        {/* Main content area - offset for sidebar on desktop, offset for topbar on mobile */}
        <main className="lg:pl-64 pt-14 lg:pt-0 min-h-screen">
          {children}
        </main>
        <ColineDock />
      </body>
    </html>
  );
}
