import React from 'react';
import { Sparkles, Film, Palette, Download, Wand2, Sliders } from 'lucide-react';

interface TopNavProps {
  mode: 'auto' | 'manual';
  onSelectMode: (mode: 'auto' | 'manual') => void;
  onOpenPrompt: () => void;
  onOpenTemplates: () => void;
  onOpenExport: () => void;
  currentProjectTitle: string;
}

export const TopNav: React.FC<TopNavProps> = ({
  mode,
  onSelectMode,
  onOpenPrompt,
  onOpenTemplates,
  onOpenExport,
  currentProjectTitle,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <a href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 shadow-md">
            <Film className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span>ToonCraft AI</span>
        </a>
        <span className="hidden sm:inline-block text-slate-600 text-sm">/</span>
        <span className="hidden sm:inline-block text-xs text-slate-400 font-medium truncate max-w-xs">
          {mode === 'auto' ? 'Studio Automatique IA' : currentProjectTitle}
        </span>
      </div>

      {/* Zone 2: 4 clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <button
          onClick={() => onSelectMode('auto')}
          className={`flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
            mode === 'auto' ? 'text-amber-400 font-bold' : 'hover:text-white'
          }`}
        >
          <Wand2 className="w-4 h-4" />
          <span>Générateur Automatique (Vidéo IA)</span>
        </button>

        <button
          onClick={() => onSelectMode('manual')}
          className={`flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
            mode === 'manual' ? 'text-amber-400 font-bold' : 'hover:text-white'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Éditeur & Timeline</span>
        </button>

        <button
          onClick={onOpenTemplates}
          className="flex items-center gap-2 hover:text-white transition-colors whitespace-nowrap shrink-0"
        >
          <Palette className="w-4 h-4 text-slate-400" />
          <span>Personnages & Décors</span>
        </button>

        <button
          onClick={onOpenExport}
          className="flex items-center gap-2 hover:text-white transition-colors whitespace-nowrap shrink-0"
        >
          <Download className="w-4 h-4 text-slate-400" />
          <span>Exporter Vidéo</span>
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenPrompt}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-sm hover:shadow-amber-400/20 whitespace-nowrap shrink-0 active:scale-95"
        >
          <Sparkles className="w-4 h-4" />
          <span>Générer avec l'IA</span>
        </button>
      </div>
    </header>
  );
};
