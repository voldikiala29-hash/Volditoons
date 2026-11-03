import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '20mb' }));

// Server-side Google GenAI initialization
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Helper function for exponential backoff retries on Gemini API
async function callGeminiWithRetry(fn: () => Promise<any>, maxRetries = 2, delayMs = 1000): Promise<any> {
  let lastError: any;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      lastError = err;
      const isRateOrTransient =
        err?.status === 429 ||
        err?.status === 503 ||
        err?.message?.includes('503') ||
        err?.message?.includes('429') ||
        err?.message?.includes('high demand');
      if (attempt < maxRetries && isRateOrTransient) {
        await new Promise((resolve) => setTimeout(resolve, delayMs * Math.pow(2, attempt)));
      } else {
        throw err;
      }
    }
  }
  throw lastError;
}

// Procedural cartoon animation generator fallback (used if API temporarily 503)
function generateProceduralCartoon(prompt: string, style: string, action: string, frameCount: number) {
  const safeFrames = Math.min(Math.max(Number(frameCount) || 6, 4), 12);
  const colorPalettes: Record<string, string[]> = {
    'Classic 2D Cartoon': ['#EA580C', '#FFFFFF', '#DC2626', '#F59E0B', '#1E293B'],
    'Anime / Studio Ghibli': ['#38BDF8', '#0284C7', '#F8FAFC', '#1E293B', '#F43F5E'],
    'Rubber Hose 1930s (Vintage)': ['#E2E8F0', '#0F172A', '#FACC15', '#EF4444', '#94A3B8'],
    'Chibi & Kawaii': ['#EC4899', '#F472B6', '#FDF2F8', '#38BDF8', '#FBBF24'],
    'Ligne Claire BD Franco-Belge': ['#2563EB', '#DC2626', '#FEF08A', '#0F172A', '#F8FAFC'],
    'Flat Vector Animation': ['#6366F1', '#8B5CF6', '#EC4899', '#10B981', '#0F172A'],
  };
  const palette = colorPalettes[style] || colorPalettes['Classic 2D Cartoon'];
  const primaryColor = palette[0];
  const accentColor = palette[2] || '#DC2626';

  const frames = [];
  const poses = [
    { name: 'Anticipation', desc: 'Compression préparatoire et flexion', cy: 320, rx: 75, ry: 40, stretch: false, legY: 380 },
    { name: 'Propulsion', desc: 'Détente vive et extension vers le haut', cy: 260, rx: 60, ry: 70, stretch: true, legY: 395 },
    { name: 'Apex (Vol)', desc: 'Point culminant et apesanteur', cy: 190, rx: 65, ry: 60, stretch: false, legY: 320 },
    { name: 'Descente', desc: 'Chute accélérée orientée vers le sol', cy: 250, rx: 60, ry: 70, stretch: true, legY: 350 },
    { name: 'Impact & Amorti', desc: 'Écrasement horizontal (Squash) au contact du sol', cy: 340, rx: 85, ry: 35, stretch: false, legY: 385 },
    { name: 'Relance & Équilibre', desc: 'Retour à la pose médiane de repos', cy: 300, rx: 70, ry: 50, stretch: false, legY: 380 },
  ];

  for (let i = 0; i < safeFrames; i++) {
    const poseTemplate = poses[i % poses.length];
    const t = i / (safeFrames - 1 || 1);
    const xPos = 220 + Math.sin(t * Math.PI) * 50;

    const svg = `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="${xPos}" cy="425" rx="${110 - (300 - poseTemplate.cy) * 0.2}" ry="${18 - (300 - poseTemplate.cy) * 0.05}" fill="#020617" opacity="0.45"/>
      <!-- Traînée de mouvement -->
      ${poseTemplate.stretch ? `<line x1="${xPos - 40}" y1="${poseTemplate.cy + 60}" x2="${xPos - 40}" y2="${poseTemplate.cy + 100}" stroke="#CBD5E1" stroke-width="3" stroke-dasharray="6 4" opacity="0.6"/>` : ''}
      <!-- Pattes / Base -->
      <path d="M ${xPos - 30} ${poseTemplate.cy + 20} L ${xPos - 40} ${poseTemplate.legY} L ${xPos - 20} ${poseTemplate.legY}" stroke="#0F172A" stroke-width="10" stroke-linecap="round" fill="none"/>
      <path d="M ${xPos + 30} ${poseTemplate.cy + 20} L ${xPos + 40} ${poseTemplate.legY} L ${xPos + 60} ${poseTemplate.legY}" stroke="#0F172A" stroke-width="10" stroke-linecap="round" fill="none"/>
      <ellipse cx="${xPos - 25}" cy="${poseTemplate.legY}" rx="14" ry="7" fill="#0F172A"/>
      <ellipse cx="${xPos + 55}" cy="${poseTemplate.legY}" rx="14" ry="7" fill="#0F172A"/>
      <!-- Corps stylisé avec Squash & Stretch -->
      <ellipse cx="${xPos}" cy="${poseTemplate.cy}" rx="${poseTemplate.rx}" ry="${poseTemplate.ry}" fill="${primaryColor}" stroke="#0F172A" stroke-width="6"/>
      <ellipse cx="${xPos}" cy="${poseTemplate.cy + 5}" rx="${poseTemplate.rx * 0.6}" ry="${poseTemplate.ry * 0.5}" fill="#FFFFFF" opacity="0.85"/>
      <!-- Écharpe ou motif dynamique -->
      <path d="M ${xPos - 20} ${poseTemplate.cy - poseTemplate.ry * 0.4} Q ${xPos - 70} ${poseTemplate.cy - 10}, ${xPos - 90} ${poseTemplate.cy + 10} Q ${xPos - 60} ${poseTemplate.cy}, ${xPos - 10} ${poseTemplate.cy - poseTemplate.ry * 0.2} Z" fill="${accentColor}" stroke="#0F172A" stroke-width="4"/>
      <!-- Tête expressive -->
      <circle cx="${xPos + 15}" cy="${poseTemplate.cy - poseTemplate.ry * 0.7}" r="38" fill="${primaryColor}" stroke="#0F172A" stroke-width="6"/>
      <!-- Yeux cartoon -->
      <ellipse cx="${xPos + 22}" cy="${poseTemplate.cy - poseTemplate.ry * 0.75}" rx="7" ry="11" fill="#0F172A"/>
      <circle cx="${xPos + 24}" cy="${poseTemplate.cy - poseTemplate.ry * 0.78}" r="3" fill="#FFFFFF"/>
      <ellipse cx="${xPos + 5}" cy="${poseTemplate.cy - poseTemplate.ry * 0.75}" rx="6" ry="10" fill="#0F172A"/>
      <circle cx="${xPos + 7}" cy="${poseTemplate.cy - poseTemplate.ry * 0.78}" r="2.5" fill="#FFFFFF"/>
      <!-- Sourire -->
      <path d="M ${xPos + 12} ${poseTemplate.cy - poseTemplate.ry * 0.6} Q ${xPos + 24} ${poseTemplate.cy - poseTemplate.ry * 0.5}, ${xPos + 32} ${poseTemplate.cy - poseTemplate.ry * 0.65}" stroke="#0F172A" stroke-width="4" stroke-linecap="round" fill="none"/>
      <!-- Oreilles / Antennes -->
      <polygon points="${xPos - 5},${poseTemplate.cy - poseTemplate.ry * 0.9} ${xPos - 15},${poseTemplate.cy - poseTemplate.ry * 1.3} ${xPos + 10},${poseTemplate.cy - poseTemplate.ry}" fill="${primaryColor}" stroke="#0F172A" stroke-width="4"/>
      <polygon points="${xPos + 20},${poseTemplate.cy - poseTemplate.ry * 0.9} ${xPos + 35},${poseTemplate.cy - poseTemplate.ry * 1.3} ${xPos + 38},${poseTemplate.cy - poseTemplate.ry * 0.9}" fill="${primaryColor}" stroke="#0F172A" stroke-width="4"/>
    </svg>`;

    frames.push({
      index: i,
      poseName: `${poseTemplate.name} (${i + 1}/${safeFrames})`,
      description: poseTemplate.desc,
      svgContent: svg,
    });
  }

  return {
    title: prompt.slice(0, 40) || 'Animation 2D ToonCraft',
    description: `Animation 2D générée pour "${prompt}" (${style})`,
    recommendedFps: 8,
    colorPalette: palette,
    frames,
  };
}

// Prompt Enhancement Endpoint
app.post('/api/enhance-prompt', async (req, res) => {
  try {
    const { prompt, style = 'Classic 2D Cartoon', action = 'Walk Cycle' } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt manquant' });
    }

    if (!ai) {
      return res.json({
        enhancedPrompt: `${prompt}, style d'animation 2D traditionnel ${style}, décomposition fluide de l'action ${action}, lignes d'encrage nettes, couleurs vives et dynamiques, respect des 12 principes de l'animation Disney (anticipation, squash and stretch, timing dynamique).`,
      });
    }

    try {
      const response = await callGeminiWithRetry(() =>
        ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `Tu es un directeur d'animation 2D légendaire. 
Améliore ce prompt d'animation pour concevoir un dessin animé 2D image par image saisissant.
Prompt initial: "${prompt}"
Style d'animation: "${style}"
Action principale: "${action}"

Règles:
1. Reste fidèle au sujet du prompt tout en décrivant précisément l'apparence 2D (contours, couleurs, ombres aplaties).
2. Spécifie la trajectoire du mouvement, l'anticipation, le squash & stretch et le follow-through.
3. Rédige un prompt concis et percutant de 2 à 3 phrases en français.`,
        })
      );
      res.json({ enhancedPrompt: response.text?.trim() || prompt });
    } catch (apiErr) {
      // Fallback enhancement
      res.json({
        enhancedPrompt: `${prompt}, animation 2D expressive en style ${style}, cycle dynamique de ${action} avec squash & stretch prononcé, encrage net et couleurs saturées.`,
      });
    }
  } catch (error: any) {
    console.error('Erreur enhance-prompt:', error);
    res.status(500).json({ error: error.message || 'Erreur interne' });
  }
});

// Full 2D Cartoon Sequence Generator Endpoint
app.post('/api/generate-cartoon', async (req, res) => {
  try {
    const {
      prompt,
      style = 'Classic 2D Cartoon',
      action = 'Cycle de marche',
      frameCount = 6,
      palettePreset = 'vibrant',
    } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Le prompt est obligatoire' });
    }

    const safeFrameCount = Math.min(Math.max(Number(frameCount) || 6, 4), 12);

    if (!ai) {
      return res.status(500).json({
        error: "Clé API Gemini non configurée dans le panneau Paramètres > Secrets.",
      });
    }

    const systemPrompt = `Tu es un moteur d'animation 2D vectoriel de pointe.
Tu dois concevoir une séquence complète d'animation 2D image par image (frame-by-frame) pour un dessin animé au format SVG (viewBox="0 0 512 512").

Consignes graphiques absolues:
1. Crée un personnage ou sujet en dessin animé 2D reconnaissable, dynamique et expressif selon le style demandé.
2. Pour CHAQUE frame (exactement ${safeFrameCount} frames), génère un code SVG propre (contenu à l'intérieur de <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">...</svg>) qui représente la pose séquentielle précise du mouvement (ex: Anticipation -> Action -> Amorti -> Retour pour une boucle parfaite).
3. Utilise des formes SVG vectorielles élégantes (<rect>, <circle>, <ellipse>, <path>, <polygon>, <g>) avec des couleurs saturées, des ombres nettes (cell-shading) et des contours cartoon épais ou soignés (stroke-width 3 à 6px, stroke-linecap="round").
4. Reste dans la zone de dessin (largeur 512, hauteur 512) avec un sol/repère ou arrière-plan adapté.
5. Inclus des effets de dessin animé (lignes de vitesse, petites étoiles d'impact, poussière sous les pas, ombres au sol).
6. Le SVG généré pour chaque frame doit être valide et autonome.`;

    const userPrompt = `Génère une séquence d'animation 2D de ${safeFrameCount} images pour ce prompt:
"${prompt}"
Style graphique: "${style}"
Mouvement / Action: "${action}"
Ambiance palette: "${palettePreset}"

Fournis un titre de projet, une brève description du mouvement, la palette de couleurs principales (codes hexadécimaux), et pour chacune des ${safeFrameCount} frames:
- index (de 0 à ${safeFrameCount - 1})
- poseName (ex: "Anticipation", "Extension", "Point culminant", "Réception", etc.)
- svgContent: le balisage SVG complet (balise <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">...</svg>) pour cette pose spécifique.`;

    let parsed: any = null;
    try {
      const response = await callGeminiWithRetry(() =>
        ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: userPrompt,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "Titre du dessin animé" },
                description: { type: Type.STRING, description: "Description de l'animation" },
                recommendedFps: { type: Type.INTEGER, description: "FPS recommandé (ex: 8 ou 12)" },
                colorPalette: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Couleurs clés hexadécimales"
                },
                frames: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      index: { type: Type.INTEGER },
                      poseName: { type: Type.STRING },
                      description: { type: Type.STRING },
                      svgContent: { type: Type.STRING }
                    },
                    required: ['index', 'poseName', 'svgContent']
                  }
                }
              },
              required: ['title', 'description', 'recommendedFps', 'colorPalette', 'frames']
            }
          }
        })
      );
      parsed = JSON.parse(response.text || '{}');
    } catch (apiErr) {
      console.warn("Spike API Gemini, activation du générateur procédural cartoon:", apiErr);
      parsed = generateProceduralCartoon(prompt, style, action, safeFrameCount);
    }

    if (!parsed.frames || parsed.frames.length === 0) {
      parsed = generateProceduralCartoon(prompt, style, action, safeFrameCount);
    }

    res.json(parsed);
  } catch (error: any) {
    console.error('Erreur generate-cartoon:', error);
    res.status(500).json({ error: error.message || 'Erreur lors de la génération cartoon' });
  }
});

// Endpoint to automatically generate animated video script from prompt using user's characters and backgrounds
app.post('/api/generate-automated-video', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt manquant' });
    }

    const availableCharacters = [
      { id: 'vieux_sage', name: 'Le Vieux Sage', traits: 'malicieux, moqueur, sage avec barbiche blanche et chapeau' },
      { id: 'enqueteur', name: 'L\'Homme au Chapeau', traits: 'anxieux, surpris, curieux avec chapeau marron' },
      { id: 'chauve_stresse', name: 'Le Chauve en Panique', traits: 'hyper-stressé, sueurs froides, panique comique' },
      { id: 'maitre_paille', name: 'Le Maître Voyageur', traits: 'chapeau conique en paille avec son acolyte' },
      { id: 'gars_vert', name: 'Le Filiforme Vert', traits: 'personnage cartoon vert souple et élastique' },
      { id: 'ecoliers_classe', name: 'La Classe d\'Élèves', traits: 'groupe d\'écoliers attentifs ou terrifiés' },
    ];

    const availableBackgrounds = [
      { id: 'salon_vert_fenetre', name: 'Salon Vert avec Fenêtre' },
      { id: 'salon_vert_canape', name: 'Salon Vert Canapé' },
      { id: 'salon_beige_porte', name: 'Salon Beige avec Porte' },
      { id: 'classe_interieur', name: 'Salle de Classe École' },
      { id: 'classe_exterieur', name: 'Campus Extérieur' },
      { id: 'voiture_arriere', name: 'Sièges Arrière Voiture' },
      { id: 'sanitaires_toilettes', name: 'Toilettes Sanitaires' },
    ];

    const availableProps = [
      { id: 'baby_oil_promax', name: 'Bouteille Baby Oil Promax' },
      { id: 'tableau_blanc_face', name: 'Tableau Blanc' },
      { id: 'canape_isole', name: 'Canapé Vert Foncé' },
      { id: 'tv_retro_crt', name: 'Téléviseur Cathodique Vintage' },
    ];

    const generateProceduralScript = (userPrompt: string) => {
      const lower = userPrompt.toLowerCase();
      let bgId = 'salon_vert_fenetre';
      let char1 = 'vieux_sage';
      let char2 = 'enqueteur';
      let propId = 'baby_oil_promax';

      if (lower.includes('classe') || lower.includes('ecole') || lower.includes('école') || lower.includes('eleve') || lower.includes('élève')) {
        bgId = 'classe_interieur';
        char1 = 'chauve_stresse';
        char2 = 'ecoliers_classe';
        propId = 'tableau_blanc_face';
      } else if (lower.includes('voiture') || lower.includes('auto') || lower.includes('route')) {
        bgId = 'voiture_arriere';
        char1 = 'enqueteur';
        char2 = 'vieux_sage';
      } else if (lower.includes('toilette') || lower.includes('wc') || lower.includes('bain')) {
        bgId = 'sanitaires_toilettes';
        char1 = 'chauve_stresse';
        char2 = 'vieux_sage';
        propId = 'baby_oil_promax';
      } else if (lower.includes('vert') || lower.includes('filiforme')) {
        char1 = 'gars_vert';
        char2 = 'vieux_sage';
      }

      return {
        title: userPrompt.slice(0, 50),
        backgroundId: bgId,
        propId,
        shots: [
          {
            shotId: 'shot-1',
            type: 'wide',
            duration: 3.0,
            speakerId: char1,
            dialogue: "Écoute-moi attentivement... Tout a commencé ce matin.",
            expression1: 'talking',
            expression2: 'neutral',
            cameraZoom: 1.0,
            cameraPanX: 0,
            cameraPanY: 0,
            fx: 'none',
          },
          {
            shotId: 'shot-2',
            type: 'close_up',
            duration: 3.5,
            speakerId: char2,
            dialogue: "Quoi ?! Ne me dis pas que c'est encore cette histoire ?!",
            expression1: 'neutral',
            expression2: 'shocked',
            cameraZoom: 1.3,
            cameraPanX: 30,
            cameraPanY: -20,
            fx: 'shake',
          },
          {
            shotId: 'shot-3',
            type: 'medium',
            duration: 3.5,
            speakerId: char1,
            dialogue: "Regarde bien cette bouteille... C'est la Baby Oil Promax !",
            expression1: 'laughing',
            expression2: 'suspicious',
            cameraZoom: 1.15,
            cameraPanX: -20,
            cameraPanY: -10,
            fx: 'laugh',
          },
          {
            shotId: 'shot-4',
            type: 'close_up',
            duration: 3.0,
            speakerId: char2,
            dialogue: "Aaah ! Mais c'est une catastrophe totale !",
            expression1: 'laughing',
            expression2: 'shocked',
            cameraZoom: 1.4,
            cameraPanX: 40,
            cameraPanY: -25,
            fx: 'sweat',
          },
        ],
      };
    };

    if (!ai) {
      return res.json(generateProceduralScript(prompt));
    }

    try {
      const systemInstruction = `Tu es un scénariste et réalisateur d'animation 2D professionnel.
Tu dois transformer le prompt de l'utilisateur en une vidéo animée automatique en découpant la scène en 3 ou 4 plans (shots) dynamiques et comiques.
Personnages disponibles (ID exacts):
- vieux_sage (Le Vieux Sage malicieux avec barbe blanche)
- enqueteur (L'Homme au chapeau marron anxieux)
- chauve_stresse (Le Chauve en sueur qui panique)
- maitre_paille (Le Maître au chapeau de paille)
- gars_vert (Le Personnage vert filiforme)
- ecoliers_classe (La Classe d'écoliers aux pupitres)

Décors disponibles (ID exacts):
- salon_vert_fenetre
- salon_vert_canape
- salon_beige_porte
- classe_interieur
- classe_exterieur
- voiture_arriere
- sanitaires_toilettes

Accessoires disponibles (ID exacts):
- baby_oil_promax
- tableau_blanc_face
- canape_isole
- tv_retro_crt

Pour chaque plan (shot):
- shotId: identifiant unique
- type: "wide" | "medium" | "close_up"
- duration: durée en secondes (ex: 2.5 à 4 secondes)
- speakerId: ID du personnage qui parle
- dialogue: réplique courte percutante en français
- expression1: expression du premier personnage ("neutral" | "talking" | "shocked" | "laughing" | "suspicious")
- expression2: expression du deuxième personnage ("neutral" | "talking" | "shocked" | "laughing" | "suspicious")
- cameraZoom: facteur de zoom caméra (1.0 à 1.5)
- cameraPanX: décalage horizontal caméra (-50 à 50)
- cameraPanY: décalage vertical caméra (-30 à 30)
- fx: "none" | "shake" | "sweat" | "laugh" | "speedlines"`;

      const response = await callGeminiWithRetry(() =>
        ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `Scénarise et anime ce prompt: "${prompt}"`,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                backgroundId: { type: Type.STRING },
                propId: { type: Type.STRING },
                shots: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      shotId: { type: Type.STRING },
                      type: { type: Type.STRING },
                      duration: { type: Type.NUMBER },
                      speakerId: { type: Type.STRING },
                      dialogue: { type: Type.STRING },
                      expression1: { type: Type.STRING },
                      expression2: { type: Type.STRING },
                      cameraZoom: { type: Type.NUMBER },
                      cameraPanX: { type: Type.NUMBER },
                      cameraPanY: { type: Type.NUMBER },
                      fx: { type: Type.STRING },
                    },
                    required: [
                      'shotId',
                      'type',
                      'duration',
                      'speakerId',
                      'dialogue',
                      'expression1',
                      'expression2',
                    ],
                  },
                },
              },
              required: ['title', 'backgroundId', 'shots'],
            },
          },
        })
      );

      const parsed = JSON.parse(response.text || '{}');
      if (!parsed.shots || parsed.shots.length === 0) {
        return res.json(generateProceduralScript(prompt));
      }
      res.json(parsed);
    } catch (err) {
      console.warn("Utilisation du fallback procédural pour automated-video:", err);
      res.json(generateProceduralScript(prompt));
    }
  } catch (error: any) {
    console.error('Erreur generate-automated-video:', error);
    res.status(500).json({ error: error.message });
  }
});

// Interpolation (In-Between Frame Generator)
app.post('/api/interpolate', async (req, res) => {
  try {
    const { frameA, frameB, style = 'Classic 2D Cartoon', hint = 'Transition intermédiaire' } = req.body;

    if (!frameA || !frameB) {
      return res.status(400).json({ error: 'Les deux poses clés (frameA et frameB) sont nécessaires' });
    }

    if (!ai) {
      return res.status(500).json({
        error: "Clé API Gemini non configurée.",
      });
    }

    const promptText = `Tu es un intervalliste professionnel d'animation 2D (In-betweener).
Voici deux poses clés SVG successives d'un dessin animé 2D:

Pose A (Début):
${frameA.svgContent?.slice(0, 3000)}

Pose B (Fin):
${frameB.svgContent?.slice(0, 3000)}

Style: ${style}
Indication de mouvement: ${hint}

Génère la pose intermédiaire exacte (in-between / breakdown) qui assure une transition parfaitement fluide et anatomiquement juste entre la Pose A et la Pose B.
Conserve les mêmes couleurs, style d'encrage et dimensions (viewBox="0 0 512 512").`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            poseName: { type: Type.STRING, description: "Nom de la pose intermédiaire" },
            description: { type: Type.STRING, description: "Détail du mouvement intermédiaire" },
            svgContent: { type: Type.STRING, description: "Balise SVG complète viewBox='0 0 512 512'" }
          },
          required: ['poseName', 'description', 'svgContent']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Erreur interpolate:', error);
    res.status(500).json({
      error: error.message || "Erreur lors de l'interpolation",
    });
  }
});

// AI Visual FX Generator (Dust, Impact Star, Speedlines, Energy, Sparkles)
app.post('/api/generate-fx', async (req, res) => {
  try {
    const { fxType = 'speedlines', color = '#FFD700' } = req.body;

    if (!ai) {
      return res.status(500).json({ error: "Clé API non configurée." });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Génère un élément graphique d'effet spécial de dessin animé 2D (FX) au format SVG (viewBox="0 0 512 512").
Type d'effet: "${fxType}" (exemples: lignes de vitesse dynamiques, explosion comique de fumée/poussière, étoiles d'impact cartoon, étincelles magiques, flammes stylisées).
Couleur dominante: "${color}".
Le SVG doit avoir un fond transparent et des tracés vectoriels expressifs et exagérés propres au cartoon.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fxName: { type: Type.STRING },
            svgContent: { type: Type.STRING }
          },
          required: ['fxName', 'svgContent']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Erreur generate-fx:', error);
    res.status(500).json({ error: error.message || 'Erreur FX' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Mount Vite or serve static
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Serveur ToonCraft AI démarré sur http://0.0.0.0:${port}`);
  });
}

startServer();
