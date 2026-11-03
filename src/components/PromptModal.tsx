import React, { useState } from 'react';
import {
  Sparkles,
  Wand2,
  X,
  Layers,
  Flame,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { CartoonStyle, ActionPreset, AnimationProject } from '../types/animation';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectGenerated: (project: AnimationProject) => void;
}

const CARTOON_STYLES: { id: CartoonStyle; label: string; desc: string }[] = [
  { id: 'Classic 2D Cartoon', label: 'Cartoon Classique', desc: 'Animation traditionnelle Disney / Warner, squash & stretch prononcé.' },
  { id: 'Anime / Studio Ghibli', label: 'Anime & Manga 2D', desc: 'Lignes épurées, poses dynamiques et effets d\'énergie cinématographiques.' },
  { id: 'Rubber Hose 1930s (Vintage)', label: 'Rubber Hose 1930s', desc: 'Style vintage Cuphead / Mickey rétro, membres tubulaires et yeux Pacman.' },
  { id: 'Chibi & Kawaii', label: 'Chibi & Mignon', desc: 'Grandes têtes expressives, poses mignonnes et animations rebondissantes.' },
  { id: 'Ligne Claire BD Franco-Belge', label: 'Ligne Claire BD', desc: 'Style Tintin / Spirou, encrage régulier et aplats de couleurs précises.' },
  { id: 'Flat Vector Animation', label: 'Vecteur Moderne', desc: 'Design géométrique contemporain, découpage fluide et couleurs saturées.' },
];

const ACTION_PRESETS: ActionPreset[] = [
  'Cycle de marche (Walk Cycle)',
  'Course effrénée (Run Cycle)',
  'Saut acrobatique (Jump & Squash)',
  'Danse & Rythme (Bouncy Dance)',
  'Attaque & Coup spécial (Action & FX)',
  'Salutation & Clignement (Idle & Wave)',
  'Rebond de balle (Squash & Stretch)',
];

const QUICK_PROMPTS = [
  'Un petit dragonneau turquoise qui crache une flamme violette avant de s\'étonner',
  'Un astronaute en apesanteur qui flotte, salue de la main et tourne sur lui-même',
  'Un chat ninja espiègle qui bondit par-dessus un mur en faisant un salto',
  'Un canard comique avec un chapeau haut-de-forme qui glisse et rattrape son équilibre',
  'Une fleur magique qui s\'éveille au lever du soleil et bat des pétales comme des ailes',
];

export const PromptModal: React.FC<PromptModalProps> = ({
  isOpen,
  onClose,
  onProjectGenerated,
}) => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<CartoonStyle>('Classic 2D Cartoon');
  const [selectedAction, setSelectedAction] = useState<ActionPreset>('Cycle de marche (Walk Cycle)');
  const [frameCount, setFrameCount] = useState<number>(6);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleEnhancePrompt = async () => {
    if (!prompt.trim()) return;
    setIsEnhancing(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          style: selectedStyle,
          action: selectedAction,
        }),
      });
      const data = await res.json();
      if (data.enhancedPrompt) {
        setPrompt(data.enhancedPrompt);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setErrorMessage('Veuillez saisir une description de votre dessin animé.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);

    // Simulate animated realistic generation steps
    setGenerationStep('1. Découpage scénaristique & poses clés d\'animation...');
    const t1 = setTimeout(() => {
      setGenerationStep('2. Application des principes de squash, stretch & anticipation...');
    }, 2000);
    const t2 = setTimeout(() => {
      setGenerationStep('3. Rendu vectoriel SVG image par image (cell-shading)...');
    }, 5000);

    try {
      const res = await fetch('/api/generate-cartoon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          style: selectedStyle,
          action: selectedAction,
          frameCount,
          palettePreset: 'vibrant',
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Erreur lors de la génération');
      }

      const generatedProject: AnimationProject = {
        id: `project-${Date.now()}`,
        title: data.title || 'Mon Dessin Animé 2D',
        description: data.description || prompt,
        style: selectedStyle,
        action: selectedAction,
        width: 512,
        height: 512,
        fps: data.recommendedFps || 8,
        backgroundColor: '#0F172A',
        colorPalette: data.colorPalette || ['#EA580C', '#F59E0B', '#38BDF8', '#FFFFFF', '#0F172A'],
        frames: data.frames.map((f: any, idx: number) => ({
          id: `frame-${Date.now()}-${idx}`,
          index: idx,
          poseName: f.poseName || `Pose ${idx + 1}`,
          description: f.description || '',
          svgContent: f.svgContent || '',
          userStrokes: [],
          holdDuration: 1,
        })),
      };

      onProjectGenerated(generatedProject);
      onClose();
    } catch (err: any) {
      console.error('Erreur génération:', err);
      setErrorMessage(
        err.message || 'Impossible de contacter le moteur IA. Vérifiez vos paramètres.'
      );
    } finally {
      clearTimeout(t1);
      clearTimeout(t2);
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        {/* En-tête */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950 font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Générateur de Dessin Animé 2D IA
              </h2>
              <p className="text-xs text-slate-400">
                L'IA décompose votre idée en séquence d'images clés vectorielles fluides
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isGenerating}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message d'erreur éventuel */}
        {errorMessage && (
          <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl text-xs text-rose-300 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* 1. Saisie du Prompt */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Votre prompt d'animation 2D
            </label>
            <button
              onClick={handleEnhancePrompt}
              disabled={isEnhancing || !prompt.trim() || isGenerating}
              className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 disabled:opacity-40 transition-colors"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>{isEnhancing ? 'Optimisation IA...' : 'Améliorer le prompt'}</span>
            </button>
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
            rows={3}
            placeholder="Ex: Un renard espiègle qui court à toute vitesse avec un foulard rouge flottant dans les airs..."
            className="w-full text-sm bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
          />

          {/* Suggestions d'inspiration rapide */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className="text-[11px] text-slate-500 self-center mr-1">Exemples:</span>
            {QUICK_PROMPTS.slice(0, 3).map((ex, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPrompt(ex)}
                disabled={isGenerating}
                className="text-[11px] text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-800 px-2 py-1 rounded-md transition-colors truncate max-w-xs"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Sélection du style 2D */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-2">
            Style d'animation 2D
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CARTOON_STYLES.map((style) => {
              const isSelected = selectedStyle === style.id;
              return (
                <div
                  key={style.id}
                  onClick={() => !isGenerating && setSelectedStyle(style.id)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-400/10 border-amber-400 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-bold">{style.label}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{style.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Action & Nombre d'images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Type de mouvement / Action
            </label>
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value as ActionPreset)}
              disabled={isGenerating}
              className="w-full text-xs font-medium bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
            >
              {ACTION_PRESETS.map((act) => (
                <option key={act} value={act}>
                  {act}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Nombre d'images séquentielles
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[4, 6, 8, 12].map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setFrameCount(cnt)}
                  disabled={isGenerating}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                    frameCount === cnt
                      ? 'bg-amber-400 text-slate-950 border-amber-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {cnt} frames
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Statut de génération en direct */}
        {isGenerating && (
          <div className="p-3.5 bg-amber-950/20 border border-amber-900/40 rounded-xl flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-amber-300">
                Création du dessin animé en cours...
              </span>
              <span className="text-[11px] text-amber-200/80 font-mono">
                {generationStep || 'Initialisation du moteur d\'animation 2D...'}
              </span>
            </div>
          </div>
        )}

        {/* Boutons d'action bas */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            disabled={isGenerating}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Annuler
          </button>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 rounded-xl transition-all shadow-md active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Animation en cours...' : 'Générer le dessin animé'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
