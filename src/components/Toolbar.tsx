import React from 'react';
import {
  MousePointer,
  Pencil,
  Paintbrush,
  Eraser,
  Minus,
  Square,
  Circle as CircleIcon,
  Type,
  RotateCcw,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Trash2,
} from 'lucide-react';
import { ToolType } from '../types/animation';

interface ToolbarProps {
  activeTool: ToolType;
  onSelectTool: (tool: ToolType) => void;
  strokeColor: string;
  onChangeColor: (color: string) => void;
  strokeSize: number;
  onChangeSize: (size: number) => void;
  strokeOpacity: number;
  onChangeOpacity: (opacity: number) => void;
  palette: string[];
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onClearFrameInk: () => void;
  onFlipHorizontal: () => void;
  onFlipVertical: () => void;
}

const CARTOON_COLORS = [
  '#000000',
  '#FFFFFF',
  '#EA580C',
  '#DC2626',
  '#F59E0B',
  '#16A34A',
  '#0284C7',
  '#9333EA',
  '#F43F5E',
  '#FED7AA',
];

export const Toolbar: React.FC<ToolbarProps> = ({
  activeTool,
  onSelectTool,
  strokeColor,
  onChangeColor,
  strokeSize,
  onChangeSize,
  strokeOpacity,
  onChangeOpacity,
  palette,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onClearFrameInk,
  onFlipHorizontal,
  onFlipVertical,
}) => {
  const tools: { id: ToolType; label: string; icon: React.ReactNode }[] = [
    { id: 'select', label: 'Sélection', icon: <MousePointer className="w-4 h-4" /> },
    { id: 'pen', label: 'Crayon fin', icon: <Pencil className="w-4 h-4" /> },
    { id: 'brush', label: 'Pinceau cartoon', icon: <Paintbrush className="w-4 h-4" /> },
    { id: 'eraser', label: 'Gomme', icon: <Eraser className="w-4 h-4" /> },
    { id: 'line', label: 'Ligne droite', icon: <Minus className="w-4 h-4" /> },
    { id: 'rectangle', label: 'Rectangle', icon: <Square className="w-4 h-4" /> },
    { id: 'circle', label: 'Cercle', icon: <CircleIcon className="w-4 h-4" /> },
    { id: 'text', label: 'Texte / Onomatopée', icon: <Type className="w-4 h-4" /> },
  ];

  const mergedColors = Array.from(new Set([...palette, ...CARTOON_COLORS]));

  return (
    <aside className="w-16 md:w-60 border-r border-slate-800 bg-slate-900/70 p-3 flex flex-col gap-5 overflow-y-auto shrink-0 select-none">
      {/* Outils de dessin */}
      <div>
        <div className="hidden md:flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400">Outils de dessin</span>
          <div className="flex items-center gap-1">
            <button
              onClick={onUndo}
              disabled={!canUndo}
              title="Annuler (Ctrl+Z)"
              className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onRedo}
              disabled={!canRedo}
              title="Rétablir (Ctrl+Y)"
              className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
          {tools.map((t) => {
            const isActive = activeTool === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onSelectTool(t.id)}
                title={t.label}
                className={`flex items-center gap-2.5 p-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="shrink-0">{t.icon}</span>
                <span className="hidden md:inline truncate">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Propriétés de trait */}
      <div className="hidden md:flex flex-col gap-3 pt-2 border-t border-slate-800">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Épaisseur</span>
            <span className="font-mono text-slate-200">{strokeSize}px</span>
          </div>
          <input
            type="range"
            min="1"
            max="40"
            value={strokeSize}
            onChange={(e) => onChangeSize(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Opacité</span>
            <span className="font-mono text-slate-200">{Math.round(strokeOpacity * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={strokeOpacity}
            onChange={(e) => onChangeOpacity(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
        </div>
      </div>

      {/* Nuancier de couleurs cartoon */}
      <div className="pt-2 border-t border-slate-800">
        <div className="hidden md:flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400">Palette de couleurs</span>
          <label className="cursor-pointer relative flex items-center gap-1 text-[11px] text-amber-400 hover:underline">
            <span>Sélecteur</span>
            <input
              type="color"
              value={strokeColor}
              onChange={(e) => onChangeColor(e.target.value)}
              className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-1.5 justify-items-center">
          {mergedColors.slice(0, 10).map((color, idx) => {
            const isSelected = strokeColor.toLowerCase() === color.toLowerCase();
            return (
              <button
                key={`${color}-${idx}`}
                onClick={() => onChangeColor(color)}
                style={{ backgroundColor: color }}
                title={color}
                className={`w-6 h-6 rounded-md transition-transform ${
                  isSelected
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110'
                    : 'border border-white/20 hover:scale-105'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Transformations rapides de pose */}
      <div className="mt-auto pt-3 border-t border-slate-800 flex flex-col gap-2">
        <span className="hidden md:block text-[11px] font-semibold text-slate-400">Manipuler la pose</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
          <button
            onClick={onFlipHorizontal}
            title="Miroir Horizontal"
            className="flex items-center justify-center gap-1.5 p-2 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <FlipHorizontal className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Miroir H</span>
          </button>
          <button
            onClick={onFlipVertical}
            title="Miroir Vertical"
            className="flex items-center justify-center gap-1.5 p-2 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <FlipVertical className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Miroir V</span>
          </button>
        </div>

        <button
          onClick={onClearFrameInk}
          title="Effacer les tracés manuels sur cette frame"
          className="flex items-center justify-center gap-1.5 p-2 text-xs text-rose-400 hover:text-rose-300 bg-rose-950/30 hover:bg-rose-950/60 border border-rose-800/40 rounded-lg transition-colors mt-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Effacer encrage</span>
        </button>
      </div>
    </aside>
  );
};
