import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Repeat1,
  Layers,
  Plus,
  Copy,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Clock,
} from 'lucide-react';
import { AnimationFrame, LoopMode } from '../types/animation';

interface TimelineProps {
  frames: AnimationFrame[];
  currentIndex: number;
  onSelectFrame: (index: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  loopMode: LoopMode;
  onChangeLoopMode: (mode: LoopMode) => void;
  fps: number;
  onChangeFps: (fps: number) => void;
  onionSkinEnabled: boolean;
  onToggleOnionSkin: () => void;
  onionSkinOpacity: number;
  onChangeOnionSkinOpacity: (opacity: number) => void;
  onAddBlankFrame: () => void;
  onDuplicateFrame: (index: number) => void;
  onDeleteFrame: (index: number) => void;
  onMoveFrame: (fromIndex: number, toIndex: number) => void;
  onChangeFrameHold: (index: number, hold: number) => void;
}

export const Timeline: React.FC<TimelineProps> = ({
  frames,
  currentIndex,
  onSelectFrame,
  isPlaying,
  onTogglePlay,
  onStepBack,
  onStepForward,
  loopMode,
  onChangeLoopMode,
  fps,
  onChangeFps,
  onionSkinEnabled,
  onToggleOnionSkin,
  onionSkinOpacity,
  onChangeOnionSkinOpacity,
  onAddBlankFrame,
  onDuplicateFrame,
  onDeleteFrame,
  onMoveFrame,
  onChangeFrameHold,
}) => {
  return (
    <footer className="h-44 border-t border-slate-800 bg-slate-900/90 flex flex-col shrink-0 select-none">
      {/* Barre de transport & contrôles de lecture */}
      <div className="flex items-center justify-between px-5 py-2 border-b border-slate-800/80 bg-slate-950/40 text-xs">
        {/* Contrôles de transport lecture */}
        <div className="flex items-center gap-2">
          <button
            onClick={onStepBack}
            title="Image précédente (,)"
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={onTogglePlay}
            title={isPlaying ? 'Pause (Espace)' : 'Lecture (Espace)'}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-bold transition-all active:scale-95 ${
              isPlaying
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-sm'
                : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current ml-0.5" />
                <span>Lecture</span>
              </>
            )}
          </button>

          <button
            onClick={onStepForward}
            title="Image suivante (.)"
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Mode de boucle */}
          <button
            onClick={() => {
              if (loopMode === 'loop') onChangeLoopMode('ping-pong');
              else if (loopMode === 'ping-pong') onChangeLoopMode('once');
              else onChangeLoopMode('loop');
            }}
            title={`Mode de boucle: ${
              loopMode === 'loop' ? 'Boucle continue' : loopMode === 'ping-pong' ? 'Aller-Retour (Yo-yo)' : 'Une seule fois'
            }`}
            className="flex items-center gap-1.5 px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg transition-colors ml-2"
          >
            {loopMode === 'loop' && <Repeat className="w-3.5 h-3.5 text-amber-400" />}
            {loopMode === 'ping-pong' && <Repeat className="w-3.5 h-3.5 text-cyan-400" />}
            {loopMode === 'once' && <Repeat1 className="w-3.5 h-3.5 text-slate-400" />}
            <span className="hidden sm:inline capitalize">
              {loopMode === 'loop' ? 'Boucle' : loopMode === 'ping-pong' ? 'Yo-Yo' : '1 Fois'}
            </span>
          </button>

          {/* Vitesse FPS */}
          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-slate-800">
            <span className="text-slate-400">Vitesse:</span>
            <input
              type="range"
              min="1"
              max="24"
              value={fps}
              onChange={(e) => onChangeFps(Number(e.target.value))}
              className="w-20 accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <span className="font-mono text-slate-200 tabular-nums w-12">{fps} FPS</span>
          </div>
        </div>

        {/* Pelure d'oignon & Actions sur l'image */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleOnionSkin}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                onionSkinEnabled
                  ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/60'
                  : 'text-slate-400 hover:text-white bg-slate-800/40'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Pelure d'oignon</span>
            </button>

            {onionSkinEnabled && (
              <input
                type="range"
                min="0.1"
                max="0.8"
                step="0.05"
                value={onionSkinOpacity}
                onChange={(e) => onChangeOnionSkinOpacity(Number(e.target.value))}
                title="Opacité de la pelure d'oignon"
                className="w-16 accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            )}
          </div>

          <div className="h-4 w-px bg-slate-800" />

          {/* Boutons d'édition de frame */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onAddBlankFrame}
              title="Ajouter une image vierge"
              className="flex items-center gap-1 px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Ajouter</span>
            </button>

            <button
              onClick={() => onDuplicateFrame(currentIndex)}
              title="Dupliquer l'image sélectionnée"
              className="p-1.5 text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onDeleteFrame(currentIndex)}
              disabled={frames.length <= 1}
              title="Supprimer cette image"
              className="p-1.5 text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-950/80 rounded-lg transition-colors disabled:opacity-30"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bandeau chronologique (Filmstrip) */}
      <div className="flex-1 flex items-center px-4 overflow-x-auto gap-3 py-2 scrollbar-thin">
        {frames.map((frame, index) => {
          const isCurrent = index === currentIndex;
          return (
            <div
              key={frame.id}
              onClick={() => onSelectFrame(index)}
              className={`group relative flex flex-col shrink-0 w-28 rounded-xl p-2 cursor-pointer transition-all ${
                isCurrent
                  ? 'bg-amber-400/10 ring-2 ring-amber-400 shadow-md'
                  : 'bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50'
              }`}
            >
              {/* Header de vignette */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                <span className={isCurrent ? 'text-amber-400 font-bold' : ''}>
                  #{String(index + 1).padStart(2, '0')}
                </span>

                {/* Exposition / Hold duration selector */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    const nextHold = (frame.holdDuration || 1) >= 3 ? 1 : (frame.holdDuration || 1) + 1;
                    onChangeFrameHold(index, nextHold);
                  }}
                  title={`Durée d'exposition: ${frame.holdDuration || 1} tick(s). Cliquez pour changer.`}
                  className="flex items-center gap-0.5 px-1 py-0.5 rounded text-[10px] bg-slate-900 text-slate-300 hover:text-white"
                >
                  <Clock className="w-2.5 h-2.5" />
                  <span>{frame.holdDuration || 1}x</span>
                </div>
              </div>

              {/* Aperçu SVG vectoriel de la pose */}
              <div className="w-full h-14 bg-slate-950 rounded-lg overflow-hidden flex items-center justify-center border border-slate-800 relative">
                {frame.svgContent ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: frame.svgContent }}
                    className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain"
                  />
                ) : (
                  <span className="text-[10px] text-slate-600">Vierge</span>
                )}

                {frame.userStrokes && frame.userStrokes.length > 0 && (
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400" title="Contient des retouches manuelles" />
                )}
              </div>

              {/* Titre de pose */}
              <span className="text-[10px] text-slate-300 truncate mt-1 text-center font-medium">
                {frame.poseName || `Pose ${index + 1}`}
              </span>

              {/* Boutons d'ordonnancement (gauche/droite) au hover */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center gap-1 bg-slate-900 border border-slate-700 rounded px-1 py-0.5 shadow-lg">
                <button
                  disabled={index === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveFrame(index, index - 1);
                  }}
                  className="text-slate-400 hover:text-white disabled:opacity-20"
                  title="Déplacer vers la gauche"
                >
                  <ChevronLeft className="w-3 h-3" />
                </button>
                <button
                  disabled={index === frames.length - 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveFrame(index, index + 1);
                  }}
                  className="text-slate-400 hover:text-white disabled:opacity-20"
                  title="Déplacer vers la droite"
                >
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </footer>
  );
};
