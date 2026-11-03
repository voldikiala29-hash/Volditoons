import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Grid,
  Layers,
  Eye,
  EyeOff,
} from 'lucide-react';
import { AnimationFrame, ToolType, DrawingPoint, DrawingStroke } from '../types/animation';
import { renderFrameToCanvas } from '../utils/exportUtils';

interface CanvasViewportProps {
  currentFrame: AnimationFrame;
  previousFrame?: AnimationFrame;
  nextFrame?: AnimationFrame;
  backgroundColor: string;
  activeTool: ToolType;
  strokeColor: string;
  strokeSize: number;
  strokeOpacity: number;
  onionSkinEnabled: boolean;
  onionSkinOpacity: number;
  onUpdateFrameStrokes: (strokes: DrawingStroke[]) => void;
  fps: number;
  totalFrames: number;
  currentIndex: number;
  isPlaying: boolean;
}

export const CanvasViewport: React.FC<CanvasViewportProps> = ({
  currentFrame,
  previousFrame,
  nextFrame,
  backgroundColor,
  activeTool,
  strokeColor,
  strokeSize,
  strokeOpacity,
  onionSkinEnabled,
  onionSkinOpacity,
  onUpdateFrameStrokes,
  totalFrames,
  currentIndex,
  isPlaying,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null);
  const onionPrevCanvasRef = useRef<HTMLCanvasElement>(null);
  const onionNextCanvasRef = useRef<HTMLCanvasElement>(null);

  const [zoom, setZoom] = useState<number>(1);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [showSafeZone, setShowSafeZone] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [currentStroke, setCurrentStroke] = useState<DrawingStroke | null>(null);

  const CANVAS_WIDTH = 512;
  const CANVAS_HEIGHT = 512;

  // Render the base frame (SVG + finalized userStrokes) onto mainCanvas
  useEffect(() => {
    if (!mainCanvasRef.current) return;
    renderFrameToCanvas(
      currentFrame,
      mainCanvasRef.current,
      backgroundColor,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );
  }, [currentFrame, backgroundColor]);

  // Render Onion Skin: Previous Frame (tinted cyan/blue)
  useEffect(() => {
    if (!onionSkinEnabled || !previousFrame || !onionPrevCanvasRef.current) return;
    renderFrameToCanvas(
      previousFrame,
      onionPrevCanvasRef.current,
      'transparent',
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );
  }, [previousFrame, onionSkinEnabled]);

  // Render Onion Skin: Next Frame (tinted red/orange)
  useEffect(() => {
    if (!onionSkinEnabled || !nextFrame || !onionNextCanvasRef.current) return;
    renderFrameToCanvas(
      nextFrame,
      onionNextCanvasRef.current,
      'transparent',
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );
  }, [nextFrame, onionSkinEnabled]);

  // Redraw the active live drawing stroke onto drawingCanvas
  useEffect(() => {
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (currentStroke && currentStroke.points.length > 0) {
      ctx.save();
      ctx.globalAlpha = currentStroke.opacity;
      ctx.strokeStyle = currentStroke.color;
      ctx.fillStyle = currentStroke.color;
      ctx.lineWidth = currentStroke.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (currentStroke.tool === 'pen' || currentStroke.tool === 'brush') {
        ctx.beginPath();
        ctx.moveTo(currentStroke.points[0].x, currentStroke.points[0].y);
        for (let i = 1; i < currentStroke.points.length; i++) {
          ctx.lineTo(currentStroke.points[i].x, currentStroke.points[i].y);
        }
        ctx.stroke();
      } else if (currentStroke.tool === 'line' && currentStroke.points.length >= 2) {
        ctx.beginPath();
        ctx.moveTo(currentStroke.points[0].x, currentStroke.points[0].y);
        ctx.lineTo(currentStroke.points[1].x, currentStroke.points[1].y);
        ctx.stroke();
      } else if (currentStroke.tool === 'rectangle' && currentStroke.points.length >= 2) {
        const x = Math.min(currentStroke.points[0].x, currentStroke.points[1].x);
        const y = Math.min(currentStroke.points[0].y, currentStroke.points[1].y);
        const w = Math.abs(currentStroke.points[1].x - currentStroke.points[0].x);
        const h = Math.abs(currentStroke.points[1].y - currentStroke.points[0].y);
        ctx.strokeRect(x, y, w, h);
      } else if (currentStroke.tool === 'circle' && currentStroke.points.length >= 2) {
        const dx = currentStroke.points[1].x - currentStroke.points[0].x;
        const dy = currentStroke.points[1].y - currentStroke.points[0].y;
        const radius = Math.sqrt(dx * dx + dy * dy);
        ctx.beginPath();
        ctx.arc(currentStroke.points[0].x, currentStroke.points[0].y, radius, 0, Math.PI * 2);
        ctx.stroke();
      } else if (currentStroke.tool === 'eraser') {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.moveTo(currentStroke.points[0].x, currentStroke.points[0].y);
        for (let i = 1; i < currentStroke.points.length; i++) {
          ctx.lineTo(currentStroke.points[i].x, currentStroke.points[i].y);
        }
        ctx.stroke();
      }

      ctx.restore();
    }
  }, [currentStroke]);

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): DrawingPoint => {
    const canvas = drawingCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool === 'select' || isPlaying) return;

    const point = getCanvasCoords(e);

    if (activeTool === 'text') {
      const text = window.prompt('Entrez le texte ou l’onomatopée cartoon (ex: BAM!, POW!, SPLASH):', 'POW!');
      if (text && text.trim()) {
        const newStroke: DrawingStroke = {
          id: `stroke-${Date.now()}`,
          tool: 'text',
          points: [point],
          color: strokeColor,
          size: strokeSize,
          opacity: strokeOpacity,
          text: text.trim(),
        };
        onUpdateFrameStrokes([...(currentFrame.userStrokes || []), newStroke]);
      }
      return;
    }

    setIsDrawing(true);
    const newStroke: DrawingStroke = {
      id: `stroke-${Date.now()}`,
      tool: activeTool,
      points: [point],
      color: strokeColor,
      size: strokeSize,
      opacity: strokeOpacity,
    };
    setCurrentStroke(newStroke);
  };

  const handlePointerMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStroke || isPlaying) return;
    const point = getCanvasCoords(e);

    if (activeTool === 'pen' || activeTool === 'brush' || activeTool === 'eraser') {
      setCurrentStroke((prev) => (prev ? { ...prev, points: [...prev.points, point] } : null));
    } else if (activeTool === 'line' || activeTool === 'rectangle' || activeTool === 'circle') {
      setCurrentStroke((prev) => (prev ? { ...prev, points: [prev.points[0], point] } : null));
    }
  };

  const handlePointerUp = () => {
    if (!isDrawing || !currentStroke || isPlaying) return;
    setIsDrawing(false);

    if (currentStroke.points.length > 0) {
      onUpdateFrameStrokes([...(currentFrame.userStrokes || []), currentStroke]);
    }
    setCurrentStroke(null);
  };

  const handleZoomIn = () => setZoom((z) => Math.min(2.5, +(z + 0.25).toFixed(2)));
  const handleZoomOut = () => setZoom((z) => Math.max(0.5, +(z - 0.25).toFixed(2)));
  const handleResetZoom = () => setZoom(1);

  return (
    <div
      ref={containerRef}
      className="flex-1 relative flex flex-col bg-slate-950/80 overflow-hidden select-none"
    >
      {/* Barre d'état haute du viewport */}
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-slate-800 bg-slate-900/60 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-bold text-white uppercase tracking-wider">
            Image {currentIndex + 1} / {totalFrames}
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-amber-400 font-medium">
            {currentFrame.poseName || 'Pose clé'}
          </span>
          {currentFrame.description && (
            <span className="hidden lg:inline text-slate-400 truncate max-w-sm">
              ({currentFrame.description})
            </span>
          )}
        </div>

        {/* Contrôles de vue (Zoom, Pelure d'oignon, Grille, Repères) */}
        <div className="flex items-center gap-2">
          {/* Pelure d'oignon status */}
          <div
            title="Pelure d'oignon (Onion Skin): Cyan = Image précédente, Orange = Image suivante"
            className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-medium transition-colors ${
              onionSkinEnabled
                ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-800/60'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pelure d'oignon</span>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          {/* Grille */}
          <button
            onClick={() => setShowGrid(!showGrid)}
            title="Afficher/Masquer la grille d'alignement"
            className={`p-1.5 rounded transition-colors ${
              showGrid ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
          </button>

          {/* Repères Safe Zone */}
          <button
            onClick={() => setShowSafeZone(!showSafeZone)}
            title="Afficher/Masquer la zone de sécurité broadcast"
            className={`p-1.5 rounded transition-colors ${
              showSafeZone ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-slate-800" />

          {/* Zoom controls */}
          <div className="flex items-center gap-1 text-slate-400">
            <button
              onClick={handleZoomOut}
              title="Zoom arrière"
              className="p-1 hover:text-white rounded"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              title="Réinitialiser à 100%"
              className="font-mono text-[11px] text-slate-300 hover:text-white px-1"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              onClick={handleZoomIn}
              title="Zoom avant"
              className="p-1 hover:text-white rounded"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Zone de travail Canvas */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
            transition: 'transform 120ms ease-out',
            width: `${CANVAS_WIDTH}px`,
            height: `${CANVAS_HEIGHT}px`,
          }}
          className="relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-slate-800 shrink-0"
        >
          {/* Calque 1: Image principale rendue */}
          <canvas
            ref={mainCanvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="absolute inset-0 w-full h-full block"
          />

          {/* Calque 2: Pelure d'oignon - Image précédente (filtre cyan bleuté) */}
          {onionSkinEnabled && previousFrame && !isPlaying && (
            <canvas
              ref={onionPrevCanvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              style={{
                opacity: onionSkinOpacity,
                filter: 'hue-rotate(180deg) saturate(200%) brightness(1.2)',
                mixBlendMode: 'screen',
              }}
              className="absolute inset-0 w-full h-full pointer-events-none"
            />
          )}

          {/* Calque 3: Pelure d'oignon - Image suivante (filtre orange rougeoyant) */}
          {onionSkinEnabled && nextFrame && !isPlaying && (
            <canvas
              ref={onionNextCanvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              style={{
                opacity: onionSkinOpacity * 0.8,
                filter: 'hue-rotate(300deg) saturate(220%) brightness(1.2)',
                mixBlendMode: 'screen',
              }}
              className="absolute inset-0 w-full h-full pointer-events-none"
            />
          )}

          {/* Calque 4: Grille d'animation 2D vectorielle */}
          {showGrid && (
            <div
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
                `,
                backgroundSize: '32px 32px',
              }}
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              {/* Ligne médiane horizontale & verticale */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-amber-400/30" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-amber-400/30" />
            </div>
          )}

          {/* Calque 5: Safe zone (marges de cadrage pour dessin animé) */}
          {showSafeZone && (
            <div className="absolute inset-6 border border-dashed border-cyan-400/40 pointer-events-none flex flex-col justify-between p-2">
              <span className="text-[10px] text-cyan-400/60 font-mono">ACTION SAFE ZONE</span>
              <span className="text-[10px] text-cyan-400/60 font-mono text-right">512 × 512</span>
            </div>
          )}

          {/* Calque 6: Canvas interactif de dessin en direct */}
          <canvas
            ref={drawingCanvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            className={`absolute inset-0 w-full h-full ${
              isPlaying
                ? 'cursor-default'
                : activeTool === 'select'
                ? 'cursor-default'
                : activeTool === 'eraser'
                ? 'cursor-cell'
                : 'cursor-crosshair'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
