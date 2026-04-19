'use client';

import { AlertTriangle } from 'lucide-react';

interface AIUnavailableProps {
  compact?: boolean;
}

export default function AIUnavailable({ compact }: AIUnavailableProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 text-warning text-xs p-2">
        <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
        <span>Coline est temporairement indisponible</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 py-8 px-4 text-center">
      <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
        <AlertTriangle className="w-6 h-6 text-warning" />
      </div>
      <div>
        <p className="font-medium text-sm">Coline est temporairement indisponible</p>
        <p className="text-xs text-text-muted mt-1">
          Verifie que la cle API Azure est a jour dans les parametres.
        </p>
      </div>
    </div>
  );
}
