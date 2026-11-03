import {
  USER_CHARACTERS,
  USER_BACKGROUNDS,
  USER_PROPS,
  CharacterAsset,
  BackgroundAsset,
  PropAsset,
  MOUTH_SHEET,
  EYE_SHEET,
} from '../data/userAssets';

export interface CinemaShot {
  shotId: string;
  type: 'wide' | 'medium' | 'close_up';
  duration: number; // in seconds
  speakerId: string;
  dialogue: string;
  expression1: 'neutral' | 'talking' | 'shocked' | 'laughing' | 'suspicious';
  expression2: 'neutral' | 'talking' | 'shocked' | 'laughing' | 'suspicious';
  cameraZoom?: number;
  cameraPanX?: number;
  cameraPanY?: number;
  fx?: 'none' | 'shake' | 'sweat' | 'laugh' | 'speedlines';
}

export interface CinemaScript {
  title: string;
  backgroundId: string;
  propId?: string;
  shots: CinemaShot[];
}

// Built-in automated cartoon scenarios using user's uploaded characters
export const PRESET_AUTO_SCENARIOS: CinemaScript[] = [
  {
    title: 'La Révélation de la Baby Oil Promax',
    backgroundId: 'salon_vert_fenetre',
    propId: 'baby_oil_promax',
    shots: [
      {
        shotId: 's1',
        type: 'wide',
        duration: 3.2,
        speakerId: 'vieux_sage',
        dialogue: "Approche, mon ami... Tu vois cette bouteille sur la table ?",
        expression1: 'talking',
        expression2: 'neutral',
        cameraZoom: 1.0,
        cameraPanX: 0,
        cameraPanY: 0,
        fx: 'none',
      },
      {
        shotId: 's2',
        type: 'close_up',
        duration: 3.5,
        speakerId: 'enqueteur',
        dialogue: "Quoi ?! La Baby Oil Promax ?! Mais où as-tu trouvé ça ?!",
        expression1: 'neutral',
        expression2: 'shocked',
        cameraZoom: 1.35,
        cameraPanX: 30,
        cameraPanY: -15,
        fx: 'shake',
      },
      {
        shotId: 's3',
        type: 'medium',
        duration: 3.8,
        speakerId: 'vieux_sage',
        dialogue: "Hahaha ! C'est le secret ultime pour glisser hors de tous les ennuis !",
        expression1: 'laughing',
        expression2: 'suspicious',
        cameraZoom: 1.15,
        cameraPanX: -25,
        cameraPanY: -5,
        fx: 'laugh',
      },
      {
        shotId: 's4',
        type: 'close_up',
        duration: 3.2,
        speakerId: 'enqueteur',
        dialogue: "Tu es complètement fou ! La police va débarquer dans une minute !",
        expression1: 'laughing',
        expression2: 'shocked',
        cameraZoom: 1.4,
        cameraPanX: 35,
        cameraPanY: -20,
        fx: 'sweat',
      },
    ],
  },
  {
    title: 'Panique Totale en Salle de Classe',
    backgroundId: 'classe_interieur',
    propId: 'tableau_blanc_face',
    shots: [
      {
        shotId: 'c1',
        type: 'wide',
        duration: 3.0,
        speakerId: 'chauve_stresse',
        dialogue: "Bienvenue au cours... Aujourd'hui nous allons... euh...",
        expression1: 'talking',
        expression2: 'neutral',
        cameraZoom: 1.0,
        cameraPanX: 0,
        cameraPanY: 0,
        fx: 'none',
      },
      {
        shotId: 'c2',
        type: 'close_up',
        duration: 3.5,
        speakerId: 'chauve_stresse',
        dialogue: "Pourquoi est-ce que tout le monde me regarde comme ça ?!",
        expression1: 'shocked',
        expression2: 'neutral',
        cameraZoom: 1.4,
        cameraPanX: -20,
        cameraPanY: -20,
        fx: 'sweat',
      },
      {
        shotId: 'c3',
        type: 'medium',
        duration: 3.2,
        speakerId: 'ecoliers_classe',
        dialogue: "Monsieur, vous avez oublié votre pantalon ce matin !",
        expression1: 'shocked',
        expression2: 'talking',
        cameraZoom: 1.1,
        cameraPanX: 30,
        cameraPanY: 0,
        fx: 'none',
      },
      {
        shotId: 'c4',
        type: 'close_up',
        duration: 3.5,
        speakerId: 'chauve_stresse',
        dialogue: "NON ! C'EST LE PIRE CAUCHEMAR DE MA VIE D'ENSEIGNANT !",
        expression1: 'shocked',
        expression2: 'neutral',
        cameraZoom: 1.5,
        cameraPanX: -10,
        cameraPanY: -30,
        fx: 'shake',
      },
    ],
  },
  {
    title: 'Dispute Animée dans la Voiture',
    backgroundId: 'voiture_arriere',
    shots: [
      {
        shotId: 'v1',
        type: 'medium',
        duration: 3.2,
        speakerId: 'enqueteur',
        dialogue: "Regarde la route ! On va droit dans le ravin à cette allure !",
        expression1: 'shocked',
        expression2: 'neutral',
        cameraZoom: 1.1,
        cameraPanX: -20,
        cameraPanY: 0,
        fx: 'shake',
      },
      {
        shotId: 'v2',
        type: 'close_up',
        duration: 3.6,
        speakerId: 'vieux_sage',
        dialogue: "Détends-toi jeune homme, mes réflexes sont ceux d'un aigle royal.",
        expression1: 'neutral',
        expression2: 'talking',
        cameraZoom: 1.35,
        cameraPanX: 25,
        cameraPanY: -15,
        fx: 'laugh',
      },
      {
        shotId: 'v3',
        type: 'close_up',
        duration: 3.2,
        speakerId: 'enqueteur',
        dialogue: "Un aigle royal qui a oublié ses lunettes au restaurant !",
        expression1: 'shocked',
        expression2: 'talking',
        cameraZoom: 1.4,
        cameraPanX: -25,
        cameraPanY: -20,
        fx: 'sweat',
      },
    ],
  },
  {
    title: 'Le Mystère des Toilettes Publiques',
    backgroundId: 'sanitaires_toilettes',
    propId: 'baby_oil_promax',
    shots: [
      {
        shotId: 't1',
        type: 'wide',
        duration: 3.0,
        speakerId: 'chauve_stresse',
        dialogue: "Qui a laissé une fiole magique juste à côté des lavabos ?!",
        expression1: 'talking',
        expression2: 'neutral',
        cameraZoom: 1.0,
        cameraPanX: 0,
        cameraPanY: 0,
        fx: 'none',
      },
      {
        shotId: 't2',
        type: 'close_up',
        duration: 3.5,
        speakerId: 'vieux_sage',
        dialogue: "Touche-la et tu te téléporteras dans une autre dimension...",
        expression1: 'neutral',
        expression2: 'laughing',
        cameraZoom: 1.35,
        cameraPanX: 30,
        cameraPanY: -10,
        fx: 'laugh',
      },
      {
        shotId: 't3',
        type: 'close_up',
        duration: 3.2,
        speakerId: 'chauve_stresse',
        dialogue: "Mais je voulais juste me laver les mains !",
        expression1: 'shocked',
        expression2: 'laughing',
        cameraZoom: 1.45,
        cameraPanX: -30,
        cameraPanY: -20,
        fx: 'sweat',
      },
    ],
  },
];

// In-memory image cache for high performance 60fps canvas rendering
const imageCache: Map<string, HTMLImageElement> = new Map();

export function preloadImage(src: string): Promise<HTMLImageElement> {
  if (imageCache.has(src)) {
    return Promise.resolve(imageCache.get(src)!);
  }
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = () => {
      resolve(img);
    };
    img.src = src;
  });
}

// Preload all user images
export async function preloadAllUserAssets(): Promise<void> {
  const promises: Promise<any>[] = [];
  USER_BACKGROUNDS.forEach((b) => promises.push(preloadImage(b.image)));
  USER_PROPS.forEach((p) => promises.push(preloadImage(p.image)));
  USER_CHARACTERS.forEach((c) => {
    promises.push(preloadImage(c.defaultImage));
    Object.values(c.expressions).forEach((expr) => promises.push(preloadImage(expr)));
  });
  promises.push(preloadImage(MOUTH_SHEET));
  promises.push(preloadImage(EYE_SHEET));
  await Promise.all(promises);
}

// Cartoon Web Audio Sound Synthesizer (Speech chatter & cartoon sound effects)
class CartoonSoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play cartoon voice babble / phoneme chirp
  public playVoiceChirp(speakerId: string) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Pitch based on character
      let baseFreq = 220;
      if (speakerId === 'vieux_sage') baseFreq = 160 + Math.random() * 40; // Raspy low
      else if (speakerId === 'enqueteur') baseFreq = 280 + Math.random() * 60; // Nervous medium
      else if (speakerId === 'chauve_stresse') baseFreq = 380 + Math.random() * 100; // High squeak
      else if (speakerId === 'gars_vert') baseFreq = 320 + Math.random() * 80;
      else if (speakerId === 'maitre_paille') baseFreq = 200 + Math.random() * 50; // Deep master
      else if (speakerId === 'ecoliers_classe') baseFreq = 440 + Math.random() * 120; // Kids choir

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.3, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // Cartoon dramatic shock sting
  public playShockSting() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch (e) {}
  }
}

export const cartoonAudio = new CartoonSoundEngine();

// Automatic Cinema Canvas Renderer (renders one frame of the animated movie)
export function renderCinemaFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  script: CinemaScript,
  currentTimeSec: number
): void {
  // 1. Calculate total duration and find current active shot
  let elapsed = 0;
  let activeShot: CinemaShot = script.shots[0];
  let shotProgress = 0; // 0 to 1 inside current shot
  let shotStartTime = 0;

  for (let i = 0; i < script.shots.length; i++) {
    const shot = script.shots[i];
    if (currentTimeSec >= elapsed && currentTimeSec < elapsed + shot.duration) {
      activeShot = shot;
      shotStartTime = elapsed;
      shotProgress = (currentTimeSec - elapsed) / shot.duration;
      break;
    }
    elapsed += shot.duration;
  }

  // If beyond total duration, freeze on final shot
  if (currentTimeSec >= elapsed) {
    activeShot = script.shots[script.shots.length - 1];
    shotProgress = 1;
  }

  ctx.save();
  ctx.clearRect(0, 0, width, height);

  // 2. Camera Transform (Zoom & Pan with smooth ease)
  const targetZoom = activeShot.cameraZoom || 1.0;
  const targetPanX = activeShot.cameraPanX || 0;
  const targetPanY = activeShot.cameraPanY || 0;

  ctx.translate(width / 2, height / 2);
  ctx.scale(targetZoom, targetZoom);
  ctx.translate(-width / 2 + targetPanX, -height / 2 + targetPanY);

  // 3. Render Background
  const bgAsset =
    USER_BACKGROUNDS.find((b) => b.id === script.backgroundId) || USER_BACKGROUNDS[0];
  const bgImg = imageCache.get(bgAsset.image);

  if (bgImg && bgImg.complete) {
    // Fill background keeping aspect ratio
    const bgScale = Math.max(width / bgImg.width, height / bgImg.height);
    const bgW = bgImg.width * bgScale;
    const bgH = bgImg.height * bgScale;
    ctx.drawImage(bgImg, (width - bgW) / 2, (height - bgH) / 2, bgW, bgH);
  } else {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, width, height);
  }

  // 4. Render Prop (e.g. Baby Oil Promax, Couch, Whiteboard)
  if (script.propId) {
    const propAsset = USER_PROPS.find((p) => p.id === script.propId);
    if (propAsset) {
      const propImg = imageCache.get(propAsset.image);
      if (propImg && propImg.complete) {
        ctx.save();
        // Position prop nicely in center/table
        const pScale = 0.35;
        const pw = propImg.width * pScale;
        const ph = propImg.height * pScale;
        const px = width * 0.5 - pw / 2;
        const py = height * 0.72 - ph / 2;

        // Draw with screen blend to hide solid black backdrop
        ctx.globalCompositeOperation = 'screen';
        ctx.drawImage(propImg, px, py, pw, ph);
        ctx.restore();
      }
    }
  }

  // 5. Determine active characters in this scene dynamically
  const scriptSpeakers = Array.from(new Set(script.shots.map((s) => s.speakerId).filter(Boolean)));
  let char1Id = scriptSpeakers[0] || 'vieux_sage';
  let char2Id = scriptSpeakers.find((id) => id !== char1Id) || (char1Id === 'vieux_sage' ? 'enqueteur' : 'vieux_sage');

  // If the active shot has a speaker that isn't char1Id or char2Id, ensure they replace the inactive slot
  if (activeShot.speakerId && activeShot.speakerId !== char1Id && activeShot.speakerId !== char2Id) {
    char2Id = activeShot.speakerId;
  }

  const char1 = USER_CHARACTERS.find((c) => c.id === char1Id) || USER_CHARACTERS[0];
  const char2 = USER_CHARACTERS.find((c) => c.id === char2Id) || USER_CHARACTERS[1];

  const isChar1Speaking = activeShot.speakerId === char1.id;
  const isChar2Speaking = activeShot.speakerId === char2.id;

  // Natural continuous idle breathing and speech articulation physics
  const breathingOffset1 = Math.sin(currentTimeSec * 3) * 5;
  const breathingOffset2 = Math.sin(currentTimeSec * 3 + 1.5) * 5;

  // Mouth Articulation Lip-Sync & Jaw Bouncing
  let jawBounce1 = 0;
  let jawBounce2 = 0;
  if (isChar1Speaking) {
    jawBounce1 = Math.abs(Math.sin(currentTimeSec * 16)) * 8;
  }
  if (isChar2Speaking) {
    jawBounce2 = Math.abs(Math.sin(currentTimeSec * 16)) * 8;
  }

  // Panic / Sweat shaking
  let shakeOffset1 = 0;
  let shakeOffset2 = 0;
  if (activeShot.fx === 'shake' || activeShot.fx === 'sweat') {
    if (isChar1Speaking) shakeOffset1 = Math.sin(currentTimeSec * 45) * 4;
    if (isChar2Speaking) shakeOffset2 = Math.sin(currentTimeSec * 45) * 4;
  }

  // 6. Draw Character 1 (Left side)
  ctx.save();
  const c1ExprKey = activeShot.expression1 || 'neutral';
  const c1ImgSrc =
    (char1.expressions as any)[c1ExprKey] || char1.defaultImage;
  const c1Img = imageCache.get(c1ImgSrc) || imageCache.get(char1.defaultImage);

  if (c1Img && c1Img.complete) {
    const c1Scale = 0.52;
    const c1W = c1Img.width * c1Scale;
    const c1H = c1Img.height * c1Scale;
    const c1X = width * 0.22 - c1W / 2 + shakeOffset1;
    const c1Y = height * 0.98 - c1H + breathingOffset1 + jawBounce1;

    // Chroma key / Screen blend to make black background clean
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.drawImage(c1Img, c1X, c1Y, c1W, c1H);
    ctx.restore();

    const c1Offset = getCharacterMouthOffset(char1.id);

    // Natural eye blink articulation
    renderEyeBlink(ctx, c1X + c1W * c1Offset.xRatio, c1Y + c1H * (c1Offset.yRatio - 0.09), currentTimeSec, 0);

    // Live articulated mouth phoneme overlay when speaking
    if (isChar1Speaking) {
      renderMouthPhoneme(
        ctx,
        c1X + c1W * c1Offset.xRatio,
        c1Y + c1H * c1Offset.yRatio,
        currentTimeSec,
        c1Offset.scale
      );
    }
  }
  ctx.restore();

  // 7. Draw Character 2 (Right side, mirrored)
  ctx.save();
  const c2ExprKey = activeShot.expression2 || 'neutral';
  const c2ImgSrc =
    (char2.expressions as any)[c2ExprKey] || char2.defaultImage;
  const c2Img = imageCache.get(c2ImgSrc) || imageCache.get(char2.defaultImage);

  if (c2Img && c2Img.complete) {
    const c2Scale = 0.52;
    const c2W = c2Img.width * c2Scale;
    const c2H = c2Img.height * c2Scale;
    const c2X = width * 0.78 - c2W / 2 + shakeOffset2;
    const c2Y = height * 0.98 - c2H + breathingOffset2 + jawBounce2;
    const c2Offset = getCharacterMouthOffset(char2.id);

    ctx.save();
    ctx.translate(c2X + c2W / 2, c2Y + c2H / 2);
    ctx.scale(-1, 1); // Flip horizontally to face Character 1
    ctx.translate(-(c2X + c2W / 2), -(c2Y + c2H / 2));

    ctx.globalCompositeOperation = 'screen';
    ctx.drawImage(c2Img, c2X, c2Y, c2W, c2H);

    // Eye blinking inside flipped coordinate space
    renderEyeBlink(ctx, c2X + c2W * c2Offset.xRatio, c2Y + c2H * (c2Offset.yRatio - 0.09), currentTimeSec, 1.8);

    // Live articulated mouth phoneme overlay when speaking
    if (isChar2Speaking) {
      renderMouthPhoneme(
        ctx,
        c2X + c2W * c2Offset.xRatio,
        c2Y + c2H * c2Offset.yRatio,
        currentTimeSec,
        c2Offset.scale
      );
    }

    ctx.restore();
  }
  ctx.restore();

  // 8. Cartoon Visual FX (Sweat drops, Laughing particles, Impact lines)
  if (activeShot.fx === 'sweat') {
    renderSweatDrops(ctx, isChar1Speaking ? width * 0.3 : width * 0.7, height * 0.35, currentTimeSec);
  } else if (activeShot.fx === 'laugh') {
    renderLaughNotes(ctx, isChar1Speaking ? width * 0.32 : width * 0.68, height * 0.32, currentTimeSec);
  }

  // 9. Reset camera transform for fixed HUD & Subtitles
  ctx.restore();

  // 10. Cartoon Dialogue Balloon above speaking character
  const speakerX = isChar1Speaking ? width * 0.28 : width * 0.72;
  const speakerY = height * 0.22;
  renderSpeechBubble(ctx, speakerX, speakerY, activeShot.dialogue, isChar1Speaking ? 'left' : 'right');

  // 11. Cinematic Comic Subtitles Bar at bottom
  renderSubtitlesBar(ctx, width, height, activeShot);
}

// Per-character facial anchors for mouth visemes and head features
function getCharacterMouthOffset(charId: string) {
  switch (charId) {
    case 'vieux_sage':
      return { xRatio: 0.51, yRatio: 0.36, scale: 0.72 };
    case 'enqueteur':
      return { xRatio: 0.49, yRatio: 0.33, scale: 0.74 };
    case 'chauve_stresse':
      return { xRatio: 0.50, yRatio: 0.30, scale: 0.70 };
    case 'gars_vert':
      return { xRatio: 0.51, yRatio: 0.25, scale: 0.62 };
    case 'maitre_paille':
      return { xRatio: 0.48, yRatio: 0.35, scale: 0.68 };
    case 'ecoliers_classe':
      return { xRatio: 0.50, yRatio: 0.32, scale: 0.65 };
    default:
      return { xRatio: 0.50, yRatio: 0.32, scale: 0.70 };
  }
}

// Render natural periodic eye blink using EYE_SHEET
function renderEyeBlink(
  ctx: CanvasRenderingContext2D,
  eyeX: number,
  eyeY: number,
  timeSec: number,
  offsetPhase: number = 0
) {
  const eyeSheet = imageCache.get(EYE_SHEET);
  // Blink every 3.6s for 0.16s
  const cycle = (timeSec + offsetPhase) % 3.6;
  if (cycle > 0.18) return; // Open eyes (default in character sprite)

  if (eyeSheet && eyeSheet.complete) {
    // Slices for closed/blinking eye arcs in img5882_3e9cbe71.webp (1000 x 563)
    // Coords near bottom center/left where closed eyelids are drawn
    const sx = 580;
    const sy = 560 * 0.65;
    const sw = 120;
    const sh = 40;

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.drawImage(
      eyeSheet,
      sx,
      sy,
      sw,
      sh,
      eyeX - (sw * 0.4) / 2,
      eyeY - (sh * 0.4) / 2,
      sw * 0.4,
      sh * 0.4
    );
    ctx.restore();
  } else {
    // Fallback crisp cartoon closed eyelid arcs
    ctx.save();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(eyeX - 10, eyeY, 6, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(eyeX + 10, eyeY, 6, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();
    ctx.restore();
  }
}

// Render animated mouth phoneme visemes from the user's mouth sheet
function renderMouthPhoneme(
  ctx: CanvasRenderingContext2D,
  headX: number,
  headY: number,
  timeSec: number,
  scale: number = 1.0
) {
  const mouthSheet = imageCache.get(MOUTH_SHEET);
  if (!mouthSheet || !mouthSheet.complete) return;

  // Mouth viseme cycle: closed -> mid -> open -> wide
  const phonemeIndex = Math.floor(timeSec * 10) % 4;
  // Sub-rectangles inside img3693_6662af66.webp (1000 x 563)
  const mouthCoords = [
    { sx: 350, sy: 60, sw: 120, sh: 80 },  // closed smile
    { sx: 460, sy: 220, sw: 140, sh: 100 }, // open talking
    { sx: 460, sy: 340, sw: 150, sh: 110 }, // wide teeth
    { sx: 560, sy: 220, sw: 120, sh: 90 },  // round O
  ];
  const mc = mouthCoords[phonemeIndex] || mouthCoords[0];

  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  ctx.drawImage(
    mouthSheet,
    mc.sx,
    mc.sy,
    mc.sw,
    mc.sh,
    headX - (mc.sw * scale) / 2,
    headY - (mc.sh * scale) / 2,
    mc.sw * scale,
    mc.sh * scale
  );
  ctx.restore();
}

// Render comic sweat drops
function renderSweatDrops(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  timeSec: number
) {
  ctx.save();
  ctx.fillStyle = '#38BDF8';
  ctx.strokeStyle = '#0284C7';
  ctx.lineWidth = 2;

  const drop1Y = y + (Math.sin(timeSec * 8) * 10);
  const drop2Y = y - 15 + (Math.cos(timeSec * 8) * 12);

  ctx.beginPath();
  ctx.arc(x - 20, drop1Y, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x + 20, drop2Y, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

// Render comic laugh notes
function renderLaughNotes(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  timeSec: number
) {
  ctx.save();
  ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#FACC15';
  ctx.strokeStyle = '#78350F';
  ctx.lineWidth = 3;

  const noteY = y + Math.sin(timeSec * 6) * 8;
  ctx.strokeText('HAHAHA !', x - 40, noteY);
  ctx.fillText('HAHAHA !', x - 40, noteY);
  ctx.restore();
}

// Render cartoon speech bubble
function renderSpeechBubble(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  align: 'left' | 'right'
) {
  ctx.save();
  ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';

  // Measure text and wrap
  const maxW = 320;
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach((w) => {
    const testLine = currentLine ? `${currentLine} ${w}` : w;
    if (ctx.measureText(testLine).width > maxW) {
      lines.push(currentLine);
      currentLine = w;
    } else {
      currentLine = testLine;
    }
  });
  if (currentLine) lines.push(currentLine);

  const bubbleW = Math.min(360, Math.max(...lines.map((l) => ctx.measureText(l).width)) + 36);
  const bubbleH = lines.length * 22 + 24;

  const bx = align === 'left' ? x - 20 : x - bubbleW + 20;
  const by = y - bubbleH;

  // Draw speech bubble background with cartoon stroke
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#0F172A';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(bx, by, bubbleW, bubbleH, 18);
  ctx.fill();
  ctx.stroke();

  // Tail
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  if (align === 'left') {
    ctx.moveTo(bx + 40, by + bubbleH);
    ctx.lineTo(bx + 30, by + bubbleH + 18);
    ctx.lineTo(bx + 65, by + bubbleH);
  } else {
    ctx.moveTo(bx + bubbleW - 40, by + bubbleH);
    ctx.lineTo(bx + bubbleW - 30, by + bubbleH + 18);
    ctx.lineTo(bx + bubbleW - 65, by + bubbleH);
  }
  ctx.fill();
  ctx.stroke();

  // Text
  ctx.fillStyle = '#0F172A';
  lines.forEach((line, i) => {
    ctx.fillText(line, bx + 18, by + 26 + i * 22);
  });

  ctx.restore();
}

// Render cinematic subtitles bar at bottom
function renderSubtitlesBar(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  shot: CinemaShot
) {
  ctx.save();
  const barH = 56;
  const barY = height - barH;

  // Subtle dark gradient scrim
  const grad = ctx.createLinearGradient(0, barY - 20, 0, height);
  grad.addColorStop(0, 'rgba(2, 6, 23, 0)');
  grad.addColorStop(0.3, 'rgba(2, 6, 23, 0.85)');
  grad.addColorStop(1, 'rgba(2, 6, 23, 0.98)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, barY - 20, width, barH + 20);

  // Subtitle text
  const speakerName =
    USER_CHARACTERS.find((c) => c.id === shot.speakerId)?.name || 'Personnage';

  ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#F59E0B';
  ctx.fillText(speakerName.toUpperCase(), 32, barY + 16);

  ctx.font = '500 14px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#F8FAFC';
  ctx.fillText(shot.dialogue, 32, barY + 38);

  ctx.restore();
}
