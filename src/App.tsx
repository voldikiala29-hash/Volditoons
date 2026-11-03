import React, { useState, useEffect } from 'react';
import {
  AnimationProject,
  AnimationFrame,
  ToolType,
  LoopMode,
  DrawingStroke,
} from './types/animation';
import { DEFAULT_TEMPLATES } from './data/defaultTemplates';
import { TopNav } from './components/TopNav';
import { AutoCinemaPlayer } from './components/AutoCinemaPlayer';
import { Toolbar } from './components/Toolbar';
import { CanvasViewport } from './components/CanvasViewport';
import { Timeline } from './components/Timeline';
import { InspectorPanel } from './components/InspectorPanel';
import { PromptModal } from './components/PromptModal';
import { TemplatesModal } from './components/TemplatesModal';
import { ExportModal } from './components/ExportModal';

export default function App() {
  // App Mode: 'auto' (Default: 100% automated video generation from prompt) or 'manual' (frame-by-frame editor)
  const [mode, setMode] = useState<'auto' | 'manual'>('auto');

  // Manual editor state
  const [project, setProject] = useState<AnimationProject>(DEFAULT_TEMPLATES[0]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [loopMode, setLoopMode] = useState<LoopMode>('loop');
  const [pingPongDir, setPingPongDir] = useState<1 | -1>(1);

  // Drawing state
  const [activeTool, setActiveTool] = useState<ToolType>('pen');
  const [strokeColor, setStrokeColor] = useState<string>('#EA580C');
  const [strokeSize, setStrokeSize] = useState<number>(6);
  const [strokeOpacity, setStrokeOpacity] = useState<number>(1);
  const [onionSkinEnabled, setOnionSkinEnabled] = useState<boolean>(true);
  const [onionSkinOpacity, setOnionSkinOpacity] = useState<number>(0.35);

  // Undo / Redo history
  const [history, setHistory] = useState<DrawingStroke[][]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Modals
  const [isPromptModalOpen, setIsPromptModalOpen] = useState<boolean>(false);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  const currentFrame = project.frames[currentFrameIndex] || project.frames[0];
  const previousFrame =
    currentFrameIndex > 0 ? project.frames[currentFrameIndex - 1] : undefined;
  const nextFrame =
    currentFrameIndex < project.frames.length - 1
      ? project.frames[currentFrameIndex + 1]
      : undefined;

  // Manual playback loop
  useEffect(() => {
    if (!isPlaying || mode !== 'manual') return;

    const frameHold = Math.max(1, currentFrame.holdDuration || 1);
    const intervalMs = (1000 / project.fps) * frameHold;

    const timer = setTimeout(() => {
      setCurrentFrameIndex((prevIndex) => {
        const total = project.frames.length;
        if (loopMode === 'loop') {
          return (prevIndex + 1) % total;
        } else if (loopMode === 'ping-pong') {
          let next = prevIndex + pingPongDir;
          if (next >= total) {
            setPingPongDir(-1);
            return total - 2 >= 0 ? total - 2 : 0;
          } else if (next < 0) {
            setPingPongDir(1);
            return 1 < total ? 1 : 0;
          }
          return next;
        } else {
          if (prevIndex + 1 >= total) {
            setIsPlaying(false);
            return prevIndex;
          }
          return prevIndex + 1;
        }
      });
    }, intervalMs);

    return () => clearTimeout(timer);
  }, [isPlaying, currentFrameIndex, currentFrame, project.fps, loopMode, pingPongDir, project.frames.length, mode]);

  // Frame Strokes Update
  const handleUpdateFrameStrokes = (newStrokes: DrawingStroke[]) => {
    const updatedFrames = [...project.frames];
    updatedFrames[currentFrameIndex] = {
      ...updatedFrames[currentFrameIndex],
      userStrokes: newStrokes,
    };
    setProject((prev) => ({ ...prev, frames: updatedFrames }));

    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(newStrokes);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevStrokes = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      const updatedFrames = [...project.frames];
      updatedFrames[currentFrameIndex] = {
        ...updatedFrames[currentFrameIndex],
        userStrokes: prevStrokes,
      };
      setProject((prev) => ({ ...prev, frames: updatedFrames }));
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextStrokes = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      const updatedFrames = [...project.frames];
      updatedFrames[currentFrameIndex] = {
        ...updatedFrames[currentFrameIndex],
        userStrokes: nextStrokes,
      };
      setProject((prev) => ({ ...prev, frames: updatedFrames }));
    }
  };

  const handleClearFrameInk = () => {
    handleUpdateFrameStrokes([]);
  };

  const handleFlipHorizontal = () => {
    const frame = project.frames[currentFrameIndex];
    if (!frame) return;

    let updatedSvg = frame.svgContent;
    if (updatedSvg) {
      if (updatedSvg.includes('transform="scale(-1, 1)"')) {
        updatedSvg = updatedSvg.replace(
          '<g transform="scale(-1, 1) translate(-512, 0)">',
          ''
        ).replace('</g></svg>', '</svg>');
      } else {
        updatedSvg = updatedSvg.replace(
          '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">',
          '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g transform="scale(-1, 1) translate(-512, 0)">'
        ).replace('</svg>', '</g></svg>');
      }
    }

    const flippedStrokes = (frame.userStrokes || []).map((s) => ({
      ...s,
      points: s.points.map((p) => ({ x: 512 - p.x, y: p.y })),
    }));

    const updatedFrames = [...project.frames];
    updatedFrames[currentFrameIndex] = {
      ...frame,
      svgContent: updatedSvg,
      userStrokes: flippedStrokes,
    };
    setProject((prev) => ({ ...prev, frames: updatedFrames }));
  };

  const handleFlipVertical = () => {
    const frame = project.frames[currentFrameIndex];
    if (!frame) return;

    let updatedSvg = frame.svgContent;
    if (updatedSvg) {
      if (updatedSvg.includes('transform="scale(1, -1)"')) {
        updatedSvg = updatedSvg.replace(
          '<g transform="scale(1, -1) translate(0, -512)">',
          ''
        ).replace('</g></svg>', '</svg>');
      } else {
        updatedSvg = updatedSvg.replace(
          '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">',
          '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g transform="scale(1, -1) translate(0, -512)">'
        ).replace('</svg>', '</g></svg>');
      }
    }

    const flippedStrokes = (frame.userStrokes || []).map((s) => ({
      ...s,
      points: s.points.map((p) => ({ x: p.x, y: 512 - p.y })),
    }));

    const updatedFrames = [...project.frames];
    updatedFrames[currentFrameIndex] = {
      ...frame,
      svgContent: updatedSvg,
      userStrokes: flippedStrokes,
    };
    setProject((prev) => ({ ...prev, frames: updatedFrames }));
  };

  const handleAddBlankFrame = () => {
    const newFrame: AnimationFrame = {
      id: `frame-${Date.now()}`,
      index: project.frames.length,
      poseName: `Pose ${project.frames.length + 1}`,
      svgContent: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" r="30" fill="#38BDF8" opacity="0.3"/></svg>`,
      userStrokes: [],
      holdDuration: 1,
    };
    const nextFrames = [...project.frames, newFrame];
    setProject((prev) => ({ ...prev, frames: nextFrames }));
    setCurrentFrameIndex(nextFrames.length - 1);
  };

  const handleDuplicateFrame = (index: number) => {
    const source = project.frames[index];
    if (!source) return;

    const dup: AnimationFrame = {
      ...source,
      id: `frame-${Date.now()}`,
      poseName: `${source.poseName} (Copie)`,
      userStrokes: JSON.parse(JSON.stringify(source.userStrokes || [])),
    };

    const nextFrames = [...project.frames];
    nextFrames.splice(index + 1, 0, dup);
    setProject((prev) => ({ ...prev, frames: nextFrames }));
    setCurrentFrameIndex(index + 1);
  };

  const handleDeleteFrame = (index: number) => {
    if (project.frames.length <= 1) return;
    const nextFrames = project.frames.filter((_, i) => i !== index);
    setProject((prev) => ({ ...prev, frames: nextFrames }));
    setCurrentFrameIndex((prev) => Math.min(prev, nextFrames.length - 1));
  };

  const handleMoveFrame = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= project.frames.length) return;
    const nextFrames = [...project.frames];
    const [moved] = nextFrames.splice(fromIndex, 1);
    nextFrames.splice(toIndex, 0, moved);
    setProject((prev) => ({ ...prev, frames: nextFrames }));
    setCurrentFrameIndex(toIndex);
  };

  const handleChangeFrameHold = (index: number, hold: number) => {
    const nextFrames = [...project.frames];
    if (nextFrames[index]) {
      nextFrames[index] = { ...nextFrames[index], holdDuration: hold };
      setProject((prev) => ({ ...prev, frames: nextFrames }));
    }
  };

  const handleUpdateFrameName = (name: string) => {
    const nextFrames = [...project.frames];
    if (nextFrames[currentFrameIndex]) {
      nextFrames[currentFrameIndex] = {
        ...nextFrames[currentFrameIndex],
        poseName: name,
      };
      setProject((prev) => ({ ...prev, frames: nextFrames }));
    }
  };

  const handleInterpolateAI = async (frameA: AnimationFrame, frameB: AnimationFrame) => {
    try {
      const res = await fetch('/api/interpolate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          frameA,
          frameB,
          style: project.style,
          hint: `Transition fluide entre ${frameA.poseName} et ${frameB.poseName}`,
        }),
      });
      const data = await res.json();
      if (data.svgContent) {
        const inBetweenFrame: AnimationFrame = {
          id: `inbetween-${Date.now()}`,
          index: currentFrameIndex + 1,
          poseName: data.poseName || 'Intermédiaire (In-Between)',
          description: data.description || 'Interpolation fluide générée par l\'IA',
          svgContent: data.svgContent,
          userStrokes: [],
          holdDuration: 1,
        };
        const nextFrames = [...project.frames];
        nextFrames.splice(currentFrameIndex + 1, 0, inBetweenFrame);
        setProject((prev) => ({ ...prev, frames: nextFrames }));
        setCurrentFrameIndex(currentFrameIndex + 1);
      }
    } catch (err: any) {
      alert(`Erreur d'interpolation: ${err.message}`);
    }
  };

  const handleGenerateFxAI = async (fxType: string) => {
    try {
      const res = await fetch('/api/generate-fx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fxType, color: strokeColor }),
      });
      const data = await res.json();
      if (data.svgContent) {
        const frame = project.frames[currentFrameIndex];
        let currentSvg = frame.svgContent;
        let fxInner = data.svgContent.replace(/<svg[^>]*>/, '').replace('</svg>', '');
        const mergedSvg = currentSvg.replace('</svg>', `${fxInner}</svg>`);
        const nextFrames = [...project.frames];
        nextFrames[currentFrameIndex] = { ...frame, svgContent: mergedSvg };
        setProject((prev) => ({ ...prev, frames: nextFrames }));
      }
    } catch (err: any) {
      alert(`Erreur FX: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* 1. Barre de navigation supérieure (Top Bar Contract 3 zones) */}
      <TopNav
        mode={mode}
        onSelectMode={setMode}
        onOpenPrompt={() => setIsPromptModalOpen(true)}
        onOpenTemplates={() => setIsTemplatesModalOpen(true)}
        onOpenExport={() => setIsExportModalOpen(true)}
        currentProjectTitle={project.title}
      />

      {/* 2. Vue Principale : Mode Automatique (par défaut) OU Éditeur Manuel */}
      {mode === 'auto' ? (
        <AutoCinemaPlayer />
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* Barre d'outils de dessin */}
          <Toolbar
            activeTool={activeTool}
            onSelectTool={setActiveTool}
            strokeColor={strokeColor}
            onChangeColor={setStrokeColor}
            strokeSize={strokeSize}
            onChangeSize={setStrokeSize}
            strokeOpacity={strokeOpacity}
            onChangeOpacity={setStrokeOpacity}
            palette={project.colorPalette}
            canUndo={historyIndex > 0}
            canRedo={historyIndex < history.length - 1}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onClearFrameInk={handleClearFrameInk}
            onFlipHorizontal={handleFlipHorizontal}
            onFlipVertical={handleFlipVertical}
          />

          {/* Viewport interactif */}
          <CanvasViewport
            currentFrame={currentFrame}
            previousFrame={previousFrame}
            nextFrame={nextFrame}
            backgroundColor={project.backgroundColor}
            activeTool={activeTool}
            strokeColor={strokeColor}
            strokeSize={strokeSize}
            strokeOpacity={strokeOpacity}
            onionSkinEnabled={onionSkinEnabled}
            onionSkinOpacity={onionSkinOpacity}
            onUpdateFrameStrokes={handleUpdateFrameStrokes}
            fps={project.fps}
            totalFrames={project.frames.length}
            currentIndex={currentFrameIndex}
            isPlaying={isPlaying}
          />

          {/* Inspecteur droit */}
          <InspectorPanel
            currentFrame={currentFrame}
            nextFrame={nextFrame}
            project={project}
            onUpdateFrameName={handleUpdateFrameName}
            onInterpolateAI={handleInterpolateAI}
            onGenerateFxAI={handleGenerateFxAI}
            onSelectColor={setStrokeColor}
          />
        </div>
      )}

      {/* 3. Bandeau chronologique inférieur (uniquement en mode manuel) */}
      {mode === 'manual' && (
        <Timeline
          frames={project.frames}
          currentIndex={currentFrameIndex}
          onSelectFrame={(index) => {
            setIsPlaying(false);
            setCurrentFrameIndex(index);
          }}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying((p) => !p)}
          onStepBack={() => {
            setIsPlaying(false);
            setCurrentFrameIndex((prev) => Math.max(0, prev - 1));
          }}
          onStepForward={() => {
            setIsPlaying(false);
            setCurrentFrameIndex((prev) => Math.min(project.frames.length - 1, prev + 1));
          }}
          loopMode={loopMode}
          onChangeLoopMode={setLoopMode}
          fps={project.fps}
          onChangeFps={(fps) => setProject((prev) => ({ ...prev, fps }))}
          onionSkinEnabled={onionSkinEnabled}
          onToggleOnionSkin={() => setOnionSkinEnabled((s) => !s)}
          onionSkinOpacity={onionSkinOpacity}
          onChangeOnionSkinOpacity={setOnionSkinOpacity}
          onAddBlankFrame={handleAddBlankFrame}
          onDuplicateFrame={handleDuplicateFrame}
          onDeleteFrame={handleDeleteFrame}
          onMoveFrame={handleMoveFrame}
          onChangeFrameHold={handleChangeFrameHold}
        />
      )}

      {/* Modales */}
      <PromptModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        onProjectGenerated={(newProject) => {
          setProject(newProject);
          setCurrentFrameIndex(0);
          setMode('manual');
          setIsPlaying(true);
        }}
      />

      <TemplatesModal
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        onSelectTemplate={(tmpl) => {
          setProject(tmpl);
          setCurrentFrameIndex(0);
          setMode('manual');
          setIsPlaying(false);
        }}
        currentProjectId={project.id}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        project={project}
      />
    </div>
  );
}
