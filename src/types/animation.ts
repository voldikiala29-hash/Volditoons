export type ToolType = 
  | 'select' 
  | 'pen' 
  | 'brush' 
  | 'eraser' 
  | 'line' 
  | 'rectangle' 
  | 'circle' 
  | 'fill' 
  | 'text';

export type LoopMode = 'loop' | 'ping-pong' | 'once';

export type CartoonStyle = 
  | 'Classic 2D Cartoon'
  | 'Anime / Studio Ghibli'
  | 'Rubber Hose 1930s (Vintage)'
  | 'Chibi & Kawaii'
  | 'Ligne Claire BD Franco-Belge'
  | 'Flat Vector Animation';

export type ActionPreset = 
  | 'Cycle de marche (Walk Cycle)'
  | 'Course effrénée (Run Cycle)'
  | 'Saut acrobatique (Jump & Squash)'
  | 'Danse & Rythme (Bouncy Dance)'
  | 'Attaque & Coup spécial (Action & FX)'
  | 'Salutation & Clignement (Idle & Wave)'
  | 'Rebond de balle (Squash & Stretch)';

export interface DrawingPoint {
  x: number;
  y: number;
}

export interface DrawingStroke {
  id: string;
  tool: ToolType;
  points: DrawingPoint[];
  color: string;
  size: number;
  opacity: number;
  fill?: boolean;
  text?: string;
}

export interface AnimationLayer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  opacity: number;
}

export interface AnimationFrame {
  id: string;
  index: number;
  poseName: string;
  description?: string;
  svgContent: string; // The base vector cartoon pose
  userStrokes: DrawingStroke[]; // Hand-drawn brush strokes / edits on this frame
  holdDuration: number; // Duration multiplier (1 = normal, 2 = hold for 2 ticks)
}

export interface AnimationProject {
  id: string;
  title: string;
  description: string;
  style: CartoonStyle;
  action: string;
  width: number;
  height: number;
  fps: number;
  frames: AnimationFrame[];
  backgroundColor: string;
  colorPalette: string[];
}
