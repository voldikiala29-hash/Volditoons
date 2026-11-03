import { AnimationFrame, AnimationProject } from '../types/animation';
// @ts-ignore
import gifshot from 'gifshot';

// Helper to render an AnimationFrame (SVG + user strokes) to an HTMLCanvasElement
export async function renderFrameToCanvas(
  frame: AnimationFrame,
  canvas: HTMLCanvasElement,
  bgColor: string = '#0F172A',
  width: number = 512,
  height: number = 512
): Promise<void> {
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Draw Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // 2. Draw SVG content if present
  if (frame.svgContent) {
    await new Promise<void>((resolve) => {
      const img = new Image();
      // Ensure SVG has proper dimensions and xmlns
      let cleanSvg = frame.svgContent;
      if (!cleanSvg.includes('xmlns=')) {
        cleanSvg = cleanSvg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
      }
      const blob = new Blob([cleanSvg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);
        resolve();
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve();
      };
      img.src = url;
    });
  }

  // 3. Draw user hand-drawn strokes
  if (frame.userStrokes && frame.userStrokes.length > 0) {
    frame.userStrokes.forEach((stroke) => {
      ctx.save();
      ctx.globalAlpha = stroke.opacity;

      if (stroke.tool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.strokeStyle = 'rgba(0,0,0,1)';
      } else {
        ctx.strokeStyle = stroke.color;
        ctx.fillStyle = stroke.color;
      }

      ctx.lineWidth = stroke.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (stroke.tool === 'pen' || stroke.tool === 'brush' || stroke.tool === 'eraser') {
        if (stroke.points.length > 1) {
          ctx.beginPath();
          ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
          for (let i = 1; i < stroke.points.length; i++) {
            ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
          }
          ctx.stroke();
        } else if (stroke.points.length === 1) {
          ctx.beginPath();
          ctx.arc(stroke.points[0].x, stroke.points[0].y, stroke.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (stroke.tool === 'line' && stroke.points.length >= 2) {
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        ctx.lineTo(stroke.points[1].x, stroke.points[1].y);
        ctx.stroke();
      } else if (stroke.tool === 'rectangle' && stroke.points.length >= 2) {
        const x = Math.min(stroke.points[0].x, stroke.points[1].x);
        const y = Math.min(stroke.points[0].y, stroke.points[1].y);
        const w = Math.abs(stroke.points[1].x - stroke.points[0].x);
        const h = Math.abs(stroke.points[1].y - stroke.points[0].y);
        if (stroke.fill) {
          ctx.fillRect(x, y, w, h);
        }
        ctx.strokeRect(x, y, w, h);
      } else if (stroke.tool === 'circle' && stroke.points.length >= 2) {
        const dx = stroke.points[1].x - stroke.points[0].x;
        const dy = stroke.points[1].y - stroke.points[0].y;
        const radius = Math.sqrt(dx * dx + dy * dy);
        ctx.beginPath();
        ctx.arc(stroke.points[0].x, stroke.points[0].y, radius, 0, Math.PI * 2);
        if (stroke.fill) {
          ctx.fill();
        }
        ctx.stroke();
      } else if (stroke.tool === 'text' && stroke.text && stroke.points.length > 0) {
        ctx.font = `bold ${stroke.size * 2}px "Plus Jakarta Sans", sans-serif`;
        ctx.fillText(stroke.text, stroke.points[0].x, stroke.points[0].y);
      }

      ctx.restore();
    });
  }
}

// Convert frame into a Data URL
export async function frameToDataUrl(
  frame: AnimationFrame,
  bgColor: string = '#0F172A',
  width: number = 512,
  height: number = 512
): Promise<string> {
  const offscreen = document.createElement('canvas');
  await renderFrameToCanvas(frame, offscreen, bgColor, width, height);
  return offscreen.toDataURL('image/png');
}

// Export Animated GIF using gifshot
export async function exportToGif(
  project: AnimationProject,
  onProgress?: (progress: number) => void
): Promise<Blob> {
  return new Promise(async (resolve, reject) => {
    try {
      const images: string[] = [];
      const totalFrames = project.frames.length;

      for (let i = 0; i < totalFrames; i++) {
        const frame = project.frames[i];
        // Repeat according to holdDuration
        const hold = Math.max(1, frame.holdDuration || 1);
        const dataUrl = await frameToDataUrl(frame, project.backgroundColor, project.width, project.height);
        for (let h = 0; h < hold; h++) {
          images.push(dataUrl);
        }
        if (onProgress) {
          onProgress(Math.round(((i + 1) / totalFrames) * 50));
        }
      }

      const interval = 1 / project.fps;

      gifshot.createGIF(
        {
          images,
          interval,
          gifWidth: project.width,
          gifHeight: project.height,
          numWorkers: 2,
          progressCallback: (captureProgress: number) => {
            if (onProgress) {
              onProgress(50 + Math.round(captureProgress * 50));
            }
          },
        },
        (obj: any) => {
          if (!obj.error) {
            // Convert base64 data to Blob
            const base64Data = obj.image.split(',')[1];
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/gif' });
            resolve(blob);
          } else {
            reject(new Error(obj.errorMsg || 'Échec de la création du GIF'));
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
}

// Export WebM Video using Canvas CaptureStream & MediaRecorder
export async function exportToVideo(
  project: AnimationProject,
  loopCount: number = 3,
  onProgress?: (progress: number) => void
): Promise<Blob> {
  return new Promise(async (resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = project.width;
      canvas.height = project.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas non supporté'));

      const stream = canvas.captureStream(project.fps);
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm';
      const recorder = new MediaRecorder(stream, { mimeType });
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const videoBlob = new Blob(chunks, { type: 'video/webm' });
        resolve(videoBlob);
      };

      // Pre-render all frames to image bitmaps for super smooth real-time recording
      const preRenderedCanvases: HTMLCanvasElement[] = [];
      for (let i = 0; i < project.frames.length; i++) {
        const frameCanvas = document.createElement('canvas');
        await renderFrameToCanvas(project.frames[i], frameCanvas, project.backgroundColor, project.width, project.height);
        preRenderedCanvases.push(frameCanvas);
      }

      recorder.start();

      const totalPlays = loopCount;
      const frameDurationMs = 1000 / project.fps;

      let currentLoop = 0;
      let frameIndex = 0;

      const totalSteps = totalPlays * project.frames.length;
      let stepCount = 0;

      const intervalId = setInterval(() => {
        const frameCanvas = preRenderedCanvases[frameIndex];
        ctx.clearRect(0, 0, project.width, project.height);
        ctx.drawImage(frameCanvas, 0, 0);

        stepCount++;
        if (onProgress) {
          onProgress(Math.min(99, Math.round((stepCount / totalSteps) * 100)));
        }

        frameIndex++;
        if (frameIndex >= project.frames.length) {
          frameIndex = 0;
          currentLoop++;
          if (currentLoop >= totalPlays) {
            clearInterval(intervalId);
            setTimeout(() => {
              recorder.stop();
            }, frameDurationMs * 2);
          }
        }
      }, frameDurationMs);
    } catch (err) {
      reject(err);
    }
  });
}

// Export Sprite Sheet PNG & Atlas JSON
export async function exportToSpriteSheet(
  project: AnimationProject,
  columns: number = 4
): Promise<{ pngBlob: Blob; atlasJson: string }> {
  const totalFrames = project.frames.length;
  const cols = Math.min(totalFrames, columns);
  const rows = Math.ceil(totalFrames / cols);

  const sheetCanvas = document.createElement('canvas');
  sheetCanvas.width = cols * project.width;
  sheetCanvas.height = rows * project.height;
  const sheetCtx = sheetCanvas.getContext('2d')!;

  // Fill transparent or canvas background
  sheetCtx.fillStyle = project.backgroundColor;
  sheetCtx.fillRect(0, 0, sheetCanvas.width, sheetCanvas.height);

  const atlasFrames: Record<string, any> = {};

  for (let i = 0; i < totalFrames; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = col * project.width;
    const y = row * project.height;

    const frameCanvas = document.createElement('canvas');
    await renderFrameToCanvas(project.frames[i], frameCanvas, project.backgroundColor, project.width, project.height);

    sheetCtx.drawImage(frameCanvas, x, y);

    atlasFrames[`frame_${i}`] = {
      frame: { x, y, w: project.width, h: project.height },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: project.width, h: project.height },
      sourceSize: { w: project.width, h: project.height },
      duration: (1000 / project.fps) * (project.frames[i].holdDuration || 1),
      poseName: project.frames[i].poseName,
    };
  }

  const atlas = {
    frames: atlasFrames,
    meta: {
      app: 'ToonCraft AI 2D Studio',
      title: project.title,
      style: project.style,
      fps: project.fps,
      size: { w: sheetCanvas.width, h: sheetCanvas.height },
      format: 'RGBA8888',
      scale: 1,
    },
  };

  const pngBlob = await new Promise<Blob>((resolve) => {
    sheetCanvas.toBlob((blob) => resolve(blob!), 'image/png');
  });

  return {
    pngBlob,
    atlasJson: JSON.stringify(atlas, null, 2),
  };
}

// Trigger browser download of any Blob
export function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
