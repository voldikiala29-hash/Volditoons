import React, { useState } from 'react';
import {
  X,
  Download,
  Film,
  Image as ImageIcon,
  Grid,
  FileCode,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AnimationProject } from '../types/animation';
import {
  exportToGif,
  exportToVideo,
  exportToSpriteSheet,
  triggerDownload,
} from '../utils/exportUtils';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: AnimationProject;
}

type ExportTab = 'gif' | 'video' | 'spritesheet' | 'project';

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const [activeTab, setActiveTab] = useState<ExportTab>('gif');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('');

  if (!isOpen) return null;

  const triggerCelebration = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
    });
  };

  const handleExportGif = async () => {
    setIsExporting(true);
    setProgress(10);
    setStatusMessage('Compilation des images pour le GIF...');
    try {
      const blob = await exportToGif(project, (p) => {
        setProgress(p);
        setStatusMessage(`Encodage GIF animé (${p}%)...`);
      });
      triggerDownload(blob, `${project.title.toLowerCase().replace(/\s+/g, '_')}.gif`);
      triggerCelebration();
      setStatusMessage('GIF téléchargé avec succès !');
    } catch (err: any) {
      console.error(err);
      setStatusMessage(`Erreur: ${err.message || 'Impossible d\'exporter le GIF'}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportVideo = async () => {
    setIsExporting(true);
    setProgress(5);
    setStatusMessage('Enregistrement du flux vidéo WebM en temps réel...');
    try {
      const blob = await exportToVideo(project, 4, (p) => {
        setProgress(p);
        setStatusMessage(`Rendu vidéo WebM (${p}%)...`);
      });
      triggerDownload(blob, `${project.title.toLowerCase().replace(/\s+/g, '_')}.webm`);
      triggerCelebration();
      setStatusMessage('Vidéo WebM téléchargée !');
    } catch (err: any) {
      console.error(err);
      setStatusMessage(`Erreur vidéo: ${err.message || 'Échec de l\'enregistrement'}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportSpriteSheet = async () => {
    setIsExporting(true);
    setStatusMessage('Génération de la planche de sprites et de l\'atlas JSON...');
    try {
      const { pngBlob, atlasJson } = await exportToSpriteSheet(project, 4);
      triggerDownload(pngBlob, `${project.title.toLowerCase().replace(/\s+/g, '_')}_spritesheet.png`);

      // Also download JSON atlas
      const jsonBlob = new Blob([atlasJson], { type: 'application/json' });
      triggerDownload(jsonBlob, `${project.title.toLowerCase().replace(/\s+/g, '_')}_atlas.json`);

      triggerCelebration();
      setStatusMessage('Planche de sprites PNG et Atlas JSON téléchargés !');
    } catch (err: any) {
      console.error(err);
      setStatusMessage(`Erreur: ${err.message}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportProjectJson = () => {
    const dataStr = JSON.stringify(project, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    triggerDownload(blob, `${project.title.toLowerCase().replace(/\s+/g, '_')}.tooncraft.json`);
    triggerCelebration();
    setStatusMessage('Projet sauvegardé au format ToonCraft JSON !');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Exporter l'Animation 2D
              </h2>
              <p className="text-xs text-slate-400">
                {project.title} · {project.frames.length} images · {project.fps} FPS
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isExporting}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Onglets de format d'export */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('gif')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'gif'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4 mb-1" />
            <span>GIF Animé</span>
          </button>

          <button
            onClick={() => setActiveTab('video')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'video'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Film className="w-4 h-4 mb-1" />
            <span>Vidéo WebM</span>
          </button>

          <button
            onClick={() => setActiveTab('spritesheet')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'spritesheet'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Grid className="w-4 h-4 mb-1" />
            <span>Planche Sprites</span>
          </button>

          <button
            onClick={() => setActiveTab('project')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'project'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4 mb-1" />
            <span>Projet JSON</span>
          </button>
        </div>

        {/* Détails du format sélectionné */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
          {activeTab === 'gif' && (
            <div className="flex flex-col gap-2">
              <span className="font-bold text-white text-sm">Format GIF Animé (Boucle standard)</span>
              <p className="text-slate-400 leading-relaxed">
                Génère un fichier .GIF autonome optimisé pour le web, les réseaux sociaux, Discord ou vos messages.
              </p>
              <div className="flex items-center gap-4 text-slate-400 pt-2 font-mono">
                <span>Résolution: {project.width}x{project.height}px</span>
                <span>·</span>
                <span>Vitesse: {project.fps} FPS</span>
              </div>
            </div>
          )}

          {activeTab === 'video' && (
            <div className="flex flex-col gap-2">
              <span className="font-bold text-white text-sm">Vidéo Haute Définition WebM (VP9)</span>
              <p className="text-slate-400 leading-relaxed">
                Enregistrement direct du canevas en haute fidélité avec encodage vidéo fluide en boucle (4 cycles d'animation).
              </p>
              <div className="flex items-center gap-4 text-slate-400 pt-2 font-mono">
                <span>Codec: VP9 / WebM</span>
                <span>·</span>
                <span>Dimensions: {project.width}x{project.height}px</span>
              </div>
            </div>
          )}

          {activeTab === 'spritesheet' && (
            <div className="flex flex-col gap-2">
              <span className="font-bold text-white text-sm">Planche de Sprites PNG + Atlas JSON</span>
              <p className="text-slate-400 leading-relaxed">
                Toutes les frames assemblées dans une grille d'images PNG transparente avec un fichier JSON de métadonnées de timing (idéal pour Unity, Phaser, Godot ou CSS).
              </p>
              <div className="flex items-center gap-4 text-slate-400 pt-2 font-mono">
                <span>Disposition: 4 colonnes</span>
                <span>·</span>
                <span>Total: {project.frames.length} sprites</span>
              </div>
            </div>
          )}

          {activeTab === 'project' && (
            <div className="flex flex-col gap-2">
              <span className="font-bold text-white text-sm">Sauvegarde Complète de Projet</span>
              <p className="text-slate-400 leading-relaxed">
                Exporte l'intégralité des calques vectoriels, poses d'animation, tracés manuels et réglages pour pouvoir réimporter et retoucher ce projet à tout moment.
              </p>
              <div className="flex items-center gap-4 text-slate-400 pt-2 font-mono">
                <span>Format: .tooncraft.json</span>
              </div>
            </div>
          )}
        </div>

        {/* Barre de progression & message de statut */}
        {isExporting && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-mono text-amber-300">
              <span className="flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                {statusMessage}
              </span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
              <div
                style={{ width: `${progress}%` }}
                className="bg-amber-400 h-full transition-all duration-150"
              />
            </div>
          </div>
        )}

        {statusMessage && !isExporting && (
          <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Bouton d'exportation */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            disabled={isExporting}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Fermer
          </button>

          <button
            type="button"
            disabled={isExporting}
            onClick={() => {
              if (activeTab === 'gif') handleExportGif();
              else if (activeTab === 'video') handleExportVideo();
              else if (activeTab === 'spritesheet') handleExportSpriteSheet();
              else if (activeTab === 'project') handleExportProjectJson();
            }}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 rounded-xl transition-all shadow-md active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>
              {isExporting ? 'Exportation en cours...' : 'Télécharger le fichier'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
