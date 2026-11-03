import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Download,
  Sparkles,
  Film,
  Camera,
  Layers,
  Repeat,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  CinemaScript,
  PRESET_AUTO_SCENARIOS,
  preloadAllUserAssets,
  renderCinemaFrame,
  cartoonAudio,
} from '../utils/autoCinemaEngine';
import { triggerDownload } from '../utils/exportUtils';

export const AutoCinemaPlayer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [script, setScript] = useState<CinemaScript>(PRESET_AUTO_SCENARIOS[0]);
  const [prompt, setPrompt] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isLooping, setIsLooping] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isExportingVideo, setIsExportingVideo] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<number>(0);
  const [assetsLoaded, setAssetsLoaded] = useState<boolean>(false);

  // Total duration of the current script in seconds
  const totalDuration = script.shots.reduce((acc, s) => acc + s.duration, 0);

  // Preload all 37 user assets on mount
  useEffect(() => {
    preloadAllUserAssets().then(() => {
      setAssetsLoaded(true);
    });
  }, []);

  // Update audio muted status
  useEffect(() => {
    cartoonAudio.enabled = !isMuted;
  }, [isMuted]);

  // Main 60 FPS animation loop
  useEffect(() => {
    if (!assetsLoaded) return;
    let animationFrameId: number;
    let lastTimestamp = performance.now();
    let lastAudioChirpTime = 0;

    const loop = (timestamp: number) => {
      const deltaSec = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      if (isPlaying) {
        setCurrentTime((prevTime) => {
          let nextTime = prevTime + deltaSec;

          // Sound voice chirps during speech
          if (nextTime - lastAudioChirpTime > 0.16) {
            // Find current active speaker
            let curElapsed = 0;
            for (const shot of script.shots) {
              if (nextTime >= curElapsed && nextTime < curElapsed + shot.duration) {
                if (shot.speakerId) {
                  cartoonAudio.playVoiceChirp(shot.speakerId);
                }
                break;
              }
              curElapsed += shot.duration;
            }
            lastAudioChirpTime = nextTime;
          }

          if (nextTime >= totalDuration) {
            if (isLooping) {
              return 0;
            } else {
              setIsPlaying(false);
              return totalDuration;
            }
          }
          return nextTime;
        });
      }

      // Render the current cinematic frame
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          renderCinemaFrame(ctx, canvas.width, canvas.height, script, currentTime);
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, totalDuration, isLooping, script, currentTime, assetsLoaded]);

  // Handle Automatic Generation from Prompt
  const handleGenerateAutomatedVideo = async (overridePrompt?: string) => {
    const promptToUse = overridePrompt || prompt;
    if (!promptToUse.trim()) return;

    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-automated-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptToUse }),
      });
      const data = await res.json();
      if (data.shots && data.shots.length > 0) {
        setScript(data);
        setCurrentTime(0);
        setIsPlaying(true);
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }
    } catch (e) {
      console.error('Erreur génération vidéo automatique:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  // Export full automated movie as WebM video
  const handleExportMovieVideo = async () => {
    setIsExportingVideo(true);
    setExportProgress(10);
    try {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error('Canvas non initialisé');

      const stream = canvas.captureStream(30);
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm';
      const recorder = new MediaRecorder(stream, { mimeType });
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      const exportPromise = new Promise<Blob>((resolve) => {
        recorder.onstop = () => resolve(new Blob(chunks, { type: 'video/webm' }));
      });

      // Pause live loop and record from time 0 to totalDuration
      setIsPlaying(false);
      setCurrentTime(0);
      recorder.start();

      const fps = 30;
      const step = 1 / fps;
      let recordTime = 0;

      const recordInterval = setInterval(() => {
        recordTime += step;
        setCurrentTime(recordTime);
        setExportProgress(Math.min(98, Math.round((recordTime / totalDuration) * 100)));

        if (recordTime >= totalDuration) {
          clearInterval(recordInterval);
          setTimeout(() => {
            recorder.stop();
          }, 300);
        }
      }, 1000 / fps);

      const videoBlob = await exportPromise;
      triggerDownload(
        videoBlob,
        `${script.title.toLowerCase().replace(/[^a-z0-9]/gi, '_')}.webm`
      );
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.7 } });
    } catch (err: any) {
      alert(`Erreur d'exportation: ${err.message}`);
    } finally {
      setIsExportingVideo(false);
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden">
      {/* 1. Barre de commande de prompt automatique */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/70 backdrop-blur-md flex flex-col gap-3 shrink-0">
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerateAutomatedVideo()}
              placeholder="Entrez votre prompt (ex: Le sage et l'homme au chapeau discutent sur le canapé avec la Baby Oil Promax)..."
              disabled={isGenerating}
              className="w-full text-xs sm:text-sm bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          <button
            onClick={() => handleGenerateAutomatedVideo()}
            disabled={isGenerating || !prompt.trim()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 rounded-xl transition-all shadow-md active:scale-95 shrink-0 whitespace-nowrap"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Génération automatique...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Générer la vidéo automatique</span>
              </>
            )}
          </button>
        </div>

        {/* Scénarios pré-configurés 1-clic */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-slate-400 scrollbar-none">
          <span className="text-[11px] font-semibold text-slate-500 shrink-0">Scénarios prêts:</span>
          {PRESET_AUTO_SCENARIOS.map((sc, i) => (
            <button
              key={i}
              onClick={() => {
                setScript(sc);
                setCurrentTime(0);
                setIsPlaying(true);
              }}
              className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors shrink-0 whitespace-nowrap ${
                script.title === sc.title
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/60'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {sc.title}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Écran Cinématographique Haute Définition */}
      <div className="flex-1 flex items-center justify-center p-3 sm:p-6 overflow-hidden relative">
        <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-800 bg-slate-950 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={854}
            height={480}
            className="w-full h-full object-contain block"
          />

          {/* Badge Live "Articulation Vocale IA Active" */}
          <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Mouvements fluides & Articulations buccales</span>
          </div>

          {/* Titre du film en filigrane */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] font-semibold text-slate-300">
            {script.title}
          </div>
        </div>
      </div>

      {/* 3. Barre de transport & Exportation vidéo */}
      <div className="h-20 border-t border-slate-800 bg-slate-900/90 px-6 flex items-center justify-between gap-4 shrink-0">
        {/* Contrôles de lecture */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center transition-all shadow-md active:scale-95"
            title={isPlaying ? 'Pause' : 'Lecture'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={() => setCurrentTime(0)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Revenir au début"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Son cartoon */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 rounded-lg transition-colors ${
              isMuted ? 'text-slate-500 hover:text-slate-300' : 'text-amber-400 hover:text-amber-300'
            }`}
            title={isMuted ? 'Activer le son cartoon' : 'Couper le son'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Boucle */}
          <button
            onClick={() => setIsLooping(!isLooping)}
            className={`p-2 rounded-lg transition-colors ${
              isLooping ? 'text-amber-400 bg-amber-400/10' : 'text-slate-500'
            }`}
            title="Lecture en boucle"
          >
            <Repeat className="w-4 h-4" />
          </button>

          {/* Chronomètre */}
          <span className="font-mono text-xs text-slate-400 tabular-nums">
            {currentTime.toFixed(1)}s / {totalDuration.toFixed(1)}s
          </span>
        </div>

        {/* Barre de scrubbing temporelle */}
        <div className="flex-1 max-w-md hidden sm:block">
          <input
            type="range"
            min="0"
            max={totalDuration || 1}
            step="0.05"
            value={currentTime}
            onChange={(e) => {
              setCurrentTime(Number(e.target.value));
              setIsPlaying(false);
            }}
            className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
        </div>

        {/* Bouton d'exportation directe en vidéo */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportMovieVideo}
            disabled={isExportingVideo}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap"
          >
            {isExportingVideo ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                <span>Exportation ({exportProgress}%)...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-amber-400" />
                <span>Télécharger la Vidéo MP4 / WebM</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
