import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Wand2,
  Zap,
  Wind,
  Flame,
  Info,
  Sliders,
} from 'lucide-react';
import { AnimationFrame, AnimationProject } from '../types/animation';

interface InspectorPanelProps {
  currentFrame: AnimationFrame;
  nextFrame?: AnimationFrame;
  project: AnimationProject;
  onUpdateFrameName: (name: string) => void;
  onInterpolateAI: (frameA: AnimationFrame, frameB: AnimationFrame) => Promise<void>;
  onGenerateFxAI: (fxType: string) => Promise<void>;
  onSelectColor: (color: string) => void;
}

export const InspectorPanel: React.FC<InspectorPanelProps> = ({
  currentFrame,
  nextFrame,
  project,
  onUpdateFrameName,
  onInterpolateAI,
  onGenerateFxAI,
  onSelectColor,
}) => {
  const [isInterpolating, setIsInterpolating] = useState(false);
  const [isGeneratingFx, setIsGeneratingFx] = useState(false);
  const [fxType, setFxType] = useState('speedlines');

  const handleInterpolate = async () => {
    if (!nextFrame) return;
    setIsInterpolating(true);
    try {
      await onInterpolateAI(currentFrame, nextFrame);
    } finally {
      setIsInterpolating(false);
    }
  };

  const handleCreateFx = async () => {
    setIsGeneratingFx(true);
    try {
      await onGenerateFxAI(fxType);
    } finally {
      setIsGeneratingFx(false);
    }
  };

  return (
    <aside className="w-72 border-l border-slate-800 bg-slate-900/60 p-4 flex flex-col gap-5 overflow-y-auto shrink-0 select-none">
      {/* 1. Informations sur la pose courante */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-slate-300">
          <Info className="w-3.5 h-3.5 text-amber-400" />
          <span>Pose sélectionnée</span>
        </div>

        <div className="flex flex-col gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Nom de la pose</label>
            <input
              type="text"
              value={currentFrame.poseName || ''}
              onChange={(e) => onUpdateFrameName(e.target.value)}
              placeholder="Ex: Anticipation, Point culminant..."
              className="w-full text-xs font-semibold bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span>Tracés dessinés:</span>
            <span className="font-mono text-slate-200">
              {currentFrame.userStrokes?.length || 0}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Durée d'exposition:</span>
            <span className="font-mono text-slate-200">
              {currentFrame.holdDuration || 1} tick(s)
            </span>
          </div>
        </div>
      </div>

      {/* 2. Pile des calques (Layers) */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-slate-300">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Calques d'animation</span>
        </div>

        <div className="flex flex-col gap-1.5 text-xs">
          <div className="flex items-center justify-between p-2.5 bg-slate-950/50 border border-slate-800 rounded-lg text-slate-300">
            <span className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Retouches & Encre utilisateur
            </span>
            <span className="text-[10px] font-mono text-slate-500">Dessin</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-950/50 border border-slate-800 rounded-lg text-slate-300">
            <span className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Pose vectorielle 2D (IA)
            </span>
            <span className="text-[10px] font-mono text-slate-500">SVG</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-950/50 border border-slate-800 rounded-lg text-slate-300">
            <span className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-slate-500" />
              Arrière-plan cartoon
            </span>
            <span className="text-[10px] font-mono text-slate-500">Toile</span>
          </div>
        </div>
      </div>

      {/* 3. Assistant IA Intégré (In-betweening & FX) */}
      <div className="p-3.5 rounded-xl bg-gradient-to-b from-amber-950/20 to-slate-950 border border-amber-900/30 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Directeur IA Intégré</span>
        </div>

        {/* Interpolation In-Between */}
        <div>
          <span className="text-[11px] text-slate-400 block mb-1.5">
            Intervalliste IA (In-Between)
          </span>
          <button
            onClick={handleInterpolate}
            disabled={!nextFrame || isInterpolating}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors disabled:opacity-40 disabled:hover:bg-amber-400 active:scale-95"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>
              {isInterpolating ? 'Interpolation en cours...' : 'Générer In-Between fluide'}
            </span>
          </button>
          {!nextFrame && (
            <span className="text-[10px] text-slate-500 block mt-1">
              * Sélectionnez une image ayant une image suivante.
            </span>
          )}
        </div>

        {/* Générateur d'effets visuels cartoon (FX) */}
        <div className="pt-2 border-t border-slate-800/80">
          <span className="text-[11px] text-slate-400 block mb-1.5">
            Ajouter un Effet Cartoon (FX)
          </span>
          <div className="grid grid-cols-3 gap-1 mb-2">
            <button
              onClick={() => setFxType('speedlines')}
              className={`flex flex-col items-center justify-center p-1.5 rounded text-[10px] font-medium border transition-colors ${
                fxType === 'speedlines'
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/60'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5 mb-0.5" />
              <span>Vitesse</span>
            </button>

            <button
              onClick={() => setFxType('dust')}
              className={`flex flex-col items-center justify-center p-1.5 rounded text-[10px] font-medium border transition-colors ${
                fxType === 'dust'
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/60'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              <Wind className="w-3.5 h-3.5 mb-0.5" />
              <span>Poussière</span>
            </button>

            <button
              onClick={() => setFxType('impact')}
              className={`flex flex-col items-center justify-center p-1.5 rounded text-[10px] font-medium border transition-colors ${
                fxType === 'impact'
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/60'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              <Flame className="w-3.5 h-3.5 mb-0.5" />
              <span>Impact</span>
            </button>
          </div>

          <button
            onClick={handleCreateFx}
            disabled={isGeneratingFx}
            className="w-full flex items-center justify-center gap-2 py-1.5 px-3 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors disabled:opacity-40"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{isGeneratingFx ? 'Génération FX...' : 'Incruster FX sur la frame'}</span>
          </button>
        </div>
      </div>

      {/* 4. Palette du projet */}
      {project.colorPalette && project.colorPalette.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-slate-300">
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            <span>Nuancier du projet</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.colorPalette.map((col, idx) => (
              <button
                key={`${col}-${idx}`}
                onClick={() => onSelectColor(col)}
                style={{ backgroundColor: col }}
                title={`Utiliser la couleur ${col}`}
                className="w-7 h-7 rounded-lg border border-white/20 hover:scale-110 transition-transform shadow-sm"
              />
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};
