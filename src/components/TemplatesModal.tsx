import React, { useState } from 'react';
import { X, Play, Palette, User, Image as ImageIcon, Sparkles } from 'lucide-react';
import { AnimationProject } from '../types/animation';
import { DEFAULT_TEMPLATES } from '../data/defaultTemplates';
import {
  USER_CHARACTERS,
  USER_BACKGROUNDS,
  USER_PROPS,
} from '../data/userAssets';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: AnimationProject) => void;
  currentProjectId: string;
}

export const TemplatesModal: React.FC<TemplatesModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
  currentProjectId,
}) => {
  const [activeTab, setActiveTab] = useState<'characters' | 'backgrounds' | 'props' | 'templates'>('characters');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-5 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-400 flex items-center justify-center text-slate-950 font-bold">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Bibliothèque de Vos Personnages & Décors 2D
              </h2>
              <p className="text-xs text-slate-400">
                Vos 37 parties du corps, personnages et décors prêts pour l'animation automatique
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Onglets de catégories */}
        <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('characters')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'characters'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Personnages & Expressions ({USER_CHARACTERS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('backgrounds')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'backgrounds'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Décors ({USER_BACKGROUNDS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('props')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'props'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Accessoires & Parties ({USER_PROPS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'templates'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Modèles Manuels ({DEFAULT_TEMPLATES.length})</span>
          </button>
        </div>

        {/* Contenu de l'onglet Personnages */}
        {activeTab === 'characters' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {USER_CHARACTERS.map((char) => (
              <div
                key={char.id}
                className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden p-3 flex flex-col gap-2.5"
              >
                <div className="w-full h-44 bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center p-2 relative group">
                  <img
                    src={char.defaultImage}
                    alt={char.name}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[10px] bg-slate-950/80 text-cyan-300 font-mono">
                    Articulé
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white">{char.name}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                    {char.role}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 pt-1 border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-500">Expressions:</span>
                  <div className="flex gap-1">
                    {Object.keys(char.expressions).map((k) => (
                      <span
                        key={k}
                        className="text-[9px] px-1 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contenu de l'onglet Décors */}
        {activeTab === 'backgrounds' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {USER_BACKGROUNDS.map((bg) => (
              <div
                key={bg.id}
                className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden p-3 flex flex-col gap-2"
              >
                <div className="w-full h-40 bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src={bg.image}
                    alt={bg.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xs font-bold text-white truncate">{bg.name}</h4>
                <span className="text-[10px] text-slate-500 capitalize">{bg.category}</span>
              </div>
            ))}
          </div>
        )}

        {/* Contenu de l'onglet Accessoires & Parties */}
        {activeTab === 'props' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {USER_PROPS.map((prop) => (
              <div
                key={prop.id}
                className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden p-3 flex flex-col gap-2"
              >
                <div className="w-full h-40 bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center p-2">
                  <img
                    src={prop.image}
                    alt={prop.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h4 className="text-xs font-bold text-white truncate">{prop.name}</h4>
              </div>
            ))}
          </div>
        )}

        {/* Modèles manuels */}
        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {DEFAULT_TEMPLATES.map((tmpl) => (
              <div
                key={tmpl.id}
                className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden p-4 flex flex-col justify-between gap-3"
              >
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">{tmpl.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {tmpl.description}
                  </p>
                </div>
                <button
                  onClick={() => {
                    onSelectTemplate(tmpl);
                    onClose();
                  }}
                  className="w-full py-1.5 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg transition-colors"
                >
                  Charger ce modèle
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
