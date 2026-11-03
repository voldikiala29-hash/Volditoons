import { AnimationProject } from '../types/animation';

export const DEFAULT_TEMPLATES: AnimationProject[] = [
  {
    id: 'gaspard-renard',
    title: 'Gaspard le Renard Voyageur',
    description: 'Cycle de course bondissante avec foulard rouge flottant au vent et déformation squash & stretch.',
    style: 'Classic 2D Cartoon',
    action: 'Course effrénée (Run Cycle)',
    width: 512,
    height: 512,
    fps: 8,
    backgroundColor: '#0F172A',
    colorPalette: ['#EA580C', '#FFFFFF', '#DC2626', '#1E293B', '#F59E0B', '#38BDF8'],
    frames: [
      {
        id: 'f1',
        index: 0,
        poseName: 'Anticipation (Compression)',
        description: 'Le renard se ramasse près du sol, prêt à propulser ses pattes arrière.',
        holdDuration: 1,
        userStrokes: [],
        svgContent: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="256" cy="420" rx="140" ry="24" fill="#020617" opacity="0.45"/>
          <!-- Queue touffue étirée en arrière -->
          <path d="M 160 330 C 100 350, 70 380, 50 340 C 60 290, 110 300, 150 320 Z" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          <path d="M 70 340 C 50 340, 60 300, 100 310 Z" fill="#FFFFFF"/>
          <!-- Pattes arrière pliées -->
          <ellipse cx="180" cy="360" rx="36" ry="26" fill="#C2410C" stroke="#7C2D12" stroke-width="4"/>
          <rect x="195" y="370" width="34" height="18" rx="9" fill="#1E293B"/>
          <!-- Corps compressé (squash) -->
          <ellipse cx="250" cy="335" rx="74" ry="48" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          <ellipse cx="254" cy="342" rx="46" ry="28" fill="#FED7AA"/>
          <!-- Foulard rouge flottant -->
          <path d="M 305 310 Q 320 280, 240 270 Q 280 290, 310 325 Z" fill="#DC2626" stroke="#991B1B" stroke-width="4"/>
          <!-- Pattes avant au sol -->
          <path d="M 290 340 L 320 378 L 345 378" stroke="#7C2D12" stroke-width="12" stroke-linecap="round" fill="none"/>
          <ellipse cx="340" cy="380" rx="14" ry="8" fill="#1E293B"/>
          <!-- Tête renard -->
          <circle cx="330" cy="275" r="48" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          <!-- Joue blanche -->
          <path d="M 320 295 Q 365 305, 360 260 Q 320 265, 320 295 Z" fill="#FFFFFF"/>
          <!-- Museau -->
          <polygon points="350,270 395,280 355,295" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          <circle cx="395" cy="280" r="7" fill="#0F172A"/>
          <!-- Oeil vif -->
          <ellipse cx="345" cy="265" rx="8" ry="12" fill="#0F172A"/>
          <circle cx="347" cy="262" r="3" fill="#FFFFFF"/>
          <!-- Oreilles pointues -->
          <polygon points="305,245 315,190 338,235" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          <polygon points="312,238 318,205 330,234" fill="#FED7AA"/>
          <polygon points="338,245 358,200 365,245" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          <!-- Poussière au sol -->
          <circle cx="160" cy="380" r="10" fill="#94A3B8" opacity="0.6"/>
          <circle cx="140" cy="390" r="6" fill="#94A3B8" opacity="0.4"/>
        </svg>`
      },
      {
        id: 'f2',
        index: 1,
        poseName: 'Propulsion (Take-Off)',
        description: 'Détente vive des pattes, le renard décolle en diagonale.',
        holdDuration: 1,
        userStrokes: [],
        svgContent: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="240" cy="425" rx="90" ry="16" fill="#020617" opacity="0.35"/>
          <!-- Poussière de propulsion -->
          <path d="M 120 405 Q 160 370, 190 410 Q 140 425, 120 405 Z" fill="#CBD5E1" opacity="0.7"/>
          <!-- Queue alignée avec le saut -->
          <path d="M 130 330 C 80 330, 40 310, 30 280 C 70 270, 100 290, 130 315 Z" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          <path d="M 50 285 C 30 280, 50 270, 80 280 Z" fill="#FFFFFF"/>
          <!-- Pattes arrière en extension complète -->
          <path d="M 170 320 L 130 380 L 115 400" stroke="#7C2D12" stroke-width="12" stroke-linecap="round" fill="none"/>
          <ellipse cx="115" cy="402" rx="10" ry="6" fill="#1E293B"/>
          <!-- Corps étiré (Stretch diagonal) -->
          <g transform="rotate(-15 260 280)">
            <ellipse cx="260" cy="280" rx="88" ry="42" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
            <ellipse cx="270" cy="288" rx="55" ry="24" fill="#FED7AA"/>
            <!-- Foulard flottant -->
            <path d="M 330 250 Q 270 210, 200 220 Q 260 240, 330 265 Z" fill="#DC2626" stroke="#991B1B" stroke-width="4"/>
            <!-- Pattes avant prêtes -->
            <path d="M 310 290 L 360 295 L 395 300" stroke="#7C2D12" stroke-width="12" stroke-linecap="round" fill="none"/>
            <ellipse cx="400" cy="300" rx="10" ry="6" fill="#1E293B"/>
            <!-- Tête orientée vers le haut -->
            <circle cx="345" cy="235" r="46" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
            <polygon points="360,230 405,235 370,250" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
            <circle cx="405" cy="235" r="6" fill="#0F172A"/>
            <ellipse cx="360" cy="225" rx="7" ry="11" fill="#0F172A"/>
            <circle cx="362" cy="222" r="3" fill="#FFFFFF"/>
            <!-- Oreilles rabattues par la vitesse -->
            <polygon points="310,210 285,165 328,198" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
            <polygon points="332,205 320,160 348,200" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          </g>
          <!-- Lignes de vitesse -->
          <line x1="80" y1="360" x2="40" y2="370" stroke="#F8FAFC" stroke-width="3" stroke-dasharray="8 6"/>
          <line x1="100" y1="320" x2="60" y2="330" stroke="#F8FAFC" stroke-width="3" stroke-dasharray="8 6"/>
        </svg>`
      },
      {
        id: 'f3',
        index: 2,
        poseName: 'Apex (Vol et Extension Maximale)',
        description: 'Point culminant du bond dans les airs, silhouette aérodynamique.',
        holdDuration: 1,
        userStrokes: [],
        svgContent: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <!-- Ombre discrète très basse et étirée -->
          <ellipse cx="260" cy="430" rx="70" ry="12" fill="#020617" opacity="0.25"/>
          <!-- Queue majestueuse ondulante -->
          <path d="M 120 230 C 60 210, 30 170, 20 130 C 60 140, 90 180, 130 210 Z" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          <path d="M 40 140 C 20 130, 40 160, 60 155 Z" fill="#FFFFFF"/>
          <!-- Pattes arrière tendues en arrière -->
          <path d="M 170 230 L 110 250 L 80 260" stroke="#7C2D12" stroke-width="11" stroke-linecap="round" fill="none"/>
          <ellipse cx="76" cy="262" rx="9" ry="6" fill="#1E293B"/>
          <!-- Corps élancé horizontal -->
          <ellipse cx="255" cy="210" rx="96" ry="40" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          <ellipse cx="260" cy="220" rx="60" ry="24" fill="#FED7AA"/>
          <!-- Foulard déployé en arrière -->
          <path d="M 330 180 C 260 140, 180 130, 140 120 C 190 150, 260 160, 325 195 Z" fill="#DC2626" stroke="#991B1B" stroke-width="4"/>
          <!-- Pattes avant projetées vers l'avant -->
          <path d="M 320 220 L 380 210 L 430 215" stroke="#7C2D12" stroke-width="11" stroke-linecap="round" fill="none"/>
          <ellipse cx="434" cy="216" rx="9" ry="6" fill="#1E293B"/>
          <!-- Tête fière pointée vers le but -->
          <circle cx="345" cy="175" r="44" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          <polygon points="365,170 415,175 375,190" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          <circle cx="415" cy="175" r="6" fill="#0F172A"/>
          <ellipse cx="360" cy="165" rx="7" ry="11" fill="#0F172A"/>
          <circle cx="363" cy="162" r="3" fill="#FFFFFF"/>
          <!-- Oreilles en arrière -->
          <polygon points="310,150 280,110 325,140" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          <polygon points="330,145 315,105 345,140" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
        </svg>`
      },
      {
        id: 'f4',
        index: 3,
        poseName: 'Descente (Préparation Atterrissage)',
        description: 'Le renard plonge vers le sol, pattes avant baissées pour amortir.',
        holdDuration: 1,
        userStrokes: [],
        svgContent: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <!-- Ombre qui grandit -->
          <ellipse cx="290" cy="425" rx="110" ry="18" fill="#020617" opacity="0.4"/>
          <!-- Queue qui remonte pour équilibrer -->
          <path d="M 130 250 C 90 200, 60 160, 45 130 C 85 160, 115 210, 140 240 Z" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          <path d="M 55 140 C 45 130, 65 150, 75 145 Z" fill="#FFFFFF"/>
          <!-- Pattes arrière encore hautes -->
          <path d="M 180 270 L 140 250 L 110 250" stroke="#7C2D12" stroke-width="11" stroke-linecap="round" fill="none"/>
          <ellipse cx="106" cy="250" rx="9" ry="6" fill="#1E293B"/>
          <!-- Corps incliné vers le sol (rotation positive) -->
          <g transform="rotate(18 270 280)">
            <ellipse cx="270" cy="270" rx="90" ry="44" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
            <ellipse cx="275" cy="280" rx="55" ry="24" fill="#FED7AA"/>
            <!-- Foulard qui ondule -->
            <path d="M 330 240 Q 250 180, 180 185 Q 260 215, 335 255 Z" fill="#DC2626" stroke="#991B1B" stroke-width="4"/>
            <!-- Pattes avant prêtes à toucher -->
            <path d="M 330 290 L 360 340 L 375 365" stroke="#7C2D12" stroke-width="12" stroke-linecap="round" fill="none"/>
            <ellipse cx="378" cy="368" rx="10" ry="6" fill="#1E293B"/>
            <!-- Tête regardant le sol d'atterrissage -->
            <circle cx="345" cy="245" r="46" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
            <polygon points="360,240 405,250 368,265" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
            <circle cx="405" cy="250" r="6" fill="#0F172A"/>
            <ellipse cx="360" cy="235" rx="7" ry="11" fill="#0F172A"/>
            <circle cx="362" cy="232" r="3" fill="#FFFFFF"/>
            <polygon points="315,220 300,170 335,210" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
            <polygon points="338,215 330,165 352,210" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          </g>
        </svg>`
      },
      {
        id: 'f5',
        index: 4,
        poseName: 'Impact & Amorti (Squash Atterrissage)',
        description: 'Les pattes avant absorbent le choc, écrasement dynamique et gerbes de poussière.',
        holdDuration: 1,
        userStrokes: [],
        svgContent: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <!-- Ombre large et sombre -->
          <ellipse cx="280" cy="425" rx="140" ry="22" fill="#020617" opacity="0.55"/>
          <!-- Effets de choc au sol -->
          <path d="M 320 410 L 370 410 L 390 405" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
          <circle cx="395" cy="405" r="5" fill="#F59E0B"/>
          <path d="M 330 420 L 410 425" stroke="#F59E0B" stroke-width="3"/>
          <circle cx="200" cy="405" r="8" fill="#CBD5E1" opacity="0.6"/>
          <circle cx="180" cy="415" r="12" fill="#CBD5E1" opacity="0.4"/>
          <!-- Queue projetée vers l'avant par l'inertie -->
          <path d="M 160 300 C 130 220, 180 180, 220 170 C 180 200, 160 250, 165 310 Z" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          <path d="M 215 170 C 225 170, 200 190, 190 185 Z" fill="#FFFFFF"/>
          <!-- Pattes arrière regroupées prêtes à repousser -->
          <ellipse cx="190" cy="350" rx="35" ry="25" fill="#C2410C" stroke="#7C2D12" stroke-width="4"/>
          <!-- Corps écrasé (Squash horizontal) -->
          <ellipse cx="270" cy="345" rx="90" ry="42" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          <ellipse cx="275" cy="350" rx="55" ry="24" fill="#FED7AA"/>
          <!-- Foulard qui dépasse vers l'avant par inertie -->
          <path d="M 340 310 Q 370 250, 410 240 Q 370 280, 345 320 Z" fill="#DC2626" stroke="#991B1B" stroke-width="4"/>
          <!-- Pattes avant pliées absorbant le choc -->
          <path d="M 330 350 L 345 390 L 370 395" stroke="#7C2D12" stroke-width="12" stroke-linecap="round" fill="none"/>
          <ellipse cx="370" cy="397" rx="14" ry="7" fill="#1E293B"/>
          <!-- Tête baissée avec détermination -->
          <circle cx="340" cy="285" r="46" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          <polygon points="355,280 400,290 360,305" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          <circle cx="400" cy="290" r="6" fill="#0F172A"/>
          <ellipse cx="355" cy="275" rx="7" ry="11" fill="#0F172A"/>
          <circle cx="357" cy="272" r="3" fill="#FFFFFF"/>
          <polygon points="310,250 315,200 338,245" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          <polygon points="335,250 350,205 362,250" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
        </svg>`
      },
      {
        id: 'f6',
        index: 5,
        poseName: 'Transition & Relance (Follow-Through)',
        description: 'Le renard redresse son buste, amorce la boucle vers la première pose.',
        holdDuration: 1,
        userStrokes: [],
        svgContent: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="260" cy="422" rx="120" ry="20" fill="#020617" opacity="0.45"/>
          <!-- Queue qui redescend tranquillement -->
          <path d="M 150 320 C 100 300, 70 320, 50 350 C 70 340, 110 320, 145 325 Z" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          <path d="M 60 348 C 50 350, 65 330, 80 335 Z" fill="#FFFFFF"/>
          <!-- Patte arrière qui passe en avant -->
          <ellipse cx="195" cy="355" rx="36" ry="26" fill="#C2410C" stroke="#7C2D12" stroke-width="4"/>
          <rect x="210" y="370" width="30" height="16" rx="8" fill="#1E293B"/>
          <!-- Corps normal revenant à l'équilibre -->
          <ellipse cx="258" cy="335" rx="80" ry="46" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          <ellipse cx="262" cy="342" rx="50" ry="26" fill="#FED7AA"/>
          <!-- Foulard retombant doucement -->
          <path d="M 315 310 Q 280 270, 240 280 Q 280 295, 318 322 Z" fill="#DC2626" stroke="#991B1B" stroke-width="4"/>
          <!-- Patte avant en poussée -->
          <path d="M 305 345 L 320 385 L 340 385" stroke="#7C2D12" stroke-width="12" stroke-linecap="round" fill="none"/>
          <ellipse cx="340" cy="386" rx="12" ry="7" fill="#1E293B"/>
          <!-- Tête relevée -->
          <circle cx="335" cy="275" r="48" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          <polygon points="352,270 398,280 358,295" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          <circle cx="398" cy="280" r="6" fill="#0F172A"/>
          <ellipse cx="348" cy="265" rx="8" ry="12" fill="#0F172A"/>
          <circle cx="350" cy="262" r="3" fill="#FFFFFF"/>
          <polygon points="308,245 318,195 340,238" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
          <polygon points="340,245 358,205 366,245" fill="#EA580C" stroke="#7C2D12" stroke-width="4"/>
        </svg>`
      }
    ]
  },
  {
    id: 'kiko-robot',
    title: 'Kiko le Robot Rétro (Rubber Hose 1930s)',
    description: 'Animation rebondissante style cartoon vintage avec bras en tuyau d\'arrosage et ampoule clignotante.',
    style: 'Rubber Hose 1930s (Vintage)',
    action: 'Danse & Rythme (Bouncy Dance)',
    width: 512,
    height: 512,
    fps: 8,
    backgroundColor: '#1E1B18',
    colorPalette: ['#E2E8F0', '#0F172A', '#FACC15', '#EF4444', '#94A3B8'],
    frames: [
      {
        id: 'r1',
        index: 0,
        poseName: 'Rebond Bas (Squash)',
        description: 'Kiko s\'écrase sur ses jambes élastiques, bras courbés vers le haut.',
        holdDuration: 1,
        userStrokes: [],
        svgContent: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="256" cy="430" rx="130" ry="20" fill="#0A0A0A" opacity="0.6"/>
          <!-- Grosses chaussures cartoon 1930s -->
          <ellipse cx="190" cy="415" rx="35" ry="18" fill="#0F172A" stroke="#E2E8F0" stroke-width="4"/>
          <ellipse cx="322" cy="415" rx="35" ry="18" fill="#0F172A" stroke="#E2E8F0" stroke-width="4"/>
          <!-- Jambes courbées élastiques -->
          <path d="M 215 355 Q 180 390, 195 410" stroke="#0F172A" stroke-width="16" fill="none" stroke-linecap="round"/>
          <path d="M 295 355 Q 330 390, 315 410" stroke="#0F172A" stroke-width="16" fill="none" stroke-linecap="round"/>
          <!-- Corps écrasé (Squash) -->
          <rect x="186" y="270" width="140" height="90" rx="28" fill="#E2E8F0" stroke="#0F172A" stroke-width="8"/>
          <!-- Écran ventral vintage -->
          <rect x="216" y="290" width="80" height="50" rx="10" fill="#0F172A"/>
          <circle cx="240" cy="315" r="6" fill="#EF4444"/>
          <circle cx="270" cy="315" r="6" fill="#22C55E"/>
          <!-- Bras en boucle levés de joie -->
          <path d="M 186 300 Q 110 270, 140 210" stroke="#0F172A" stroke-width="16" fill="none" stroke-linecap="round"/>
          <!-- Gants blancs cartoon à 3 bandes -->
          <circle cx="140" cy="205" r="22" fill="#FFFFFF" stroke="#0F172A" stroke-width="6"/>
          <line x1="135" y1="195" x2="135" y2="215" stroke="#0F172A" stroke-width="3"/>
          <line x1="145" y1="195" x2="145" y2="215" stroke="#0F172A" stroke-width="3"/>
          <path d="M 326 300 Q 402 270, 372 210" stroke="#0F172A" stroke-width="16" fill="none" stroke-linecap="round"/>
          <circle cx="372" cy="205" r="22" fill="#FFFFFF" stroke="#0F172A" stroke-width="6"/>
          <line x1="367" y1="195" x2="367" y2="215" stroke="#0F172A" stroke-width="3"/>
          <line x1="377" y1="195" x2="377" y2="215" stroke="#0F172A" stroke-width="3"/>
          <!-- Tête robot -->
          <rect x="206" y="175" width="100" height="85" rx="20" fill="#E2E8F0" stroke="#0F172A" stroke-width="8"/>
          <!-- Yeux Pacman vintage -->
          <path d="M 235 210 A 14 14 0 1 0 250 220 L 243 214 Z" fill="#0F172A"/>
          <path d="M 270 210 A 14 14 0 1 0 285 220 L 278 214 Z" fill="#0F172A"/>
          <!-- Sourire franc -->
          <path d="M 230 240 Q 256 255, 282 240" stroke="#0F172A" stroke-width="5" stroke-linecap="round" fill="none"/>
          <!-- Antenne avec ressort -->
          <path d="M 256 175 L 256 145" stroke="#0F172A" stroke-width="6"/>
          <circle cx="256" cy="135" r="14" fill="#FACC15" stroke="#0F172A" stroke-width="5"/>
        </svg>`
      },
      {
        id: 'r2',
        index: 1,
        poseName: 'Ascension (Stretch)',
        description: 'Kiko s\'étire vers le ciel, le corps allongé et l\'ampoule s\'allume.',
        holdDuration: 1,
        userStrokes: [],
        svgContent: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="256" cy="435" rx="90" ry="14" fill="#0A0A0A" opacity="0.4"/>
          <!-- Chaussures décollant légèrement -->
          <ellipse cx="205" cy="405" rx="35" ry="18" fill="#0F172A" stroke="#E2E8F0" stroke-width="4"/>
          <ellipse cx="307" cy="405" rx="35" ry="18" fill="#0F172A" stroke="#E2E8F0" stroke-width="4"/>
          <!-- Jambes étirées toutes droites -->
          <path d="M 225 330 L 210 395" stroke="#0F172A" stroke-width="16" fill="none" stroke-linecap="round"/>
          <path d="M 285 330 L 300 395" stroke="#0F172A" stroke-width="16" fill="none" stroke-linecap="round"/>
          <!-- Corps étiré verticalement (Stretch) -->
          <rect x="206" y="210" width="100" height="130" rx="30" fill="#E2E8F0" stroke="#0F172A" stroke-width="8"/>
          <!-- Écran ventral -->
          <rect x="221" y="250" width="70" height="60" rx="10" fill="#0F172A"/>
          <line x1="230" y1="280" x2="280" y2="280" stroke="#22C55E" stroke-width="4" stroke-dasharray="6 4"/>
          <!-- Bras baissés balancés en arrière -->
          <path d="M 206 240 Q 150 270, 160 330" stroke="#0F172A" stroke-width="16" fill="none" stroke-linecap="round"/>
          <circle cx="160" cy="335" r="22" fill="#FFFFFF" stroke="#0F172A" stroke-width="6"/>
          <path d="M 306 240 Q 362 270, 352 330" stroke="#0F172A" stroke-width="16" fill="none" stroke-linecap="round"/>
          <circle cx="352" cy="335" r="22" fill="#FFFFFF" stroke="#0F172A" stroke-width="6"/>
          <!-- Tête élancée -->
          <rect x="211" y="115" width="90" height="85" rx="20" fill="#E2E8F0" stroke="#0F172A" stroke-width="8"/>
          <path d="M 235 150 A 14 14 0 1 0 250 160 L 243 154 Z" fill="#0F172A"/>
          <path d="M 270 150 A 14 14 0 1 0 285 160 L 278 154 Z" fill="#0F172A"/>
          <ellipse cx="256" cy="180" rx="16" ry="8" fill="#0F172A"/>
          <!-- Antenne brillante étincelante -->
          <path d="M 256 115 L 256 80" stroke="#0F172A" stroke-width="6"/>
          <circle cx="256" cy="70" r="18" fill="#FACC15" stroke="#0F172A" stroke-width="5"/>
          <!-- Rayons de lumière -->
          <line x1="256" y1="42" x2="256" y2="30" stroke="#FACC15" stroke-width="4"/>
          <line x1="230" y1="52" x2="220" y2="42" stroke="#FACC15" stroke-width="4"/>
          <line x1="282" y1="52" x2="292" y2="42" stroke="#FACC15" stroke-width="4"/>
        </svg>`
      },
      {
        id: 'r3',
        index: 2,
        poseName: 'Hanche à Gauche (Shimmy Left)',
        description: 'Déhanchement comique vers la gauche avec balancement des bras.',
        holdDuration: 1,
        userStrokes: [],
        svgContent: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="240" cy="430" rx="120" ry="18" fill="#0A0A0A" opacity="0.5"/>
          <!-- Chaussures espacées -->
          <ellipse cx="170" cy="415" rx="35" ry="18" fill="#0F172A" stroke="#E2E8F0" stroke-width="4"/>
          <ellipse cx="330" cy="415" rx="35" ry="18" fill="#0F172A" stroke="#E2E8F0" stroke-width="4"/>
          <!-- Jambes arquées à gauche -->
          <path d="M 190 350 Q 150 380, 175 410" stroke="#0F172A" stroke-width="16" fill="none" stroke-linecap="round"/>
          <path d="M 265 350 Q 280 380, 325 410" stroke="#0F172A" stroke-width="16" fill="none" stroke-linecap="round"/>
          <!-- Corps penché à gauche -->
          <g transform="rotate(-10 230 310)">
            <rect x="170" y="250" width="120" height="105" rx="26" fill="#E2E8F0" stroke="#0F172A" stroke-width="8"/>
            <rect x="195" y="275" width="70" height="50" rx="10" fill="#0F172A"/>
            <circle cx="220" cy="300" r="8" fill="#FACC15"/>
            <!-- Bras gauche en haut, bras droit en bas -->
            <path d="M 170 270 Q 100 240, 110 180" stroke="#0F172A" stroke-width="16" fill="none" stroke-linecap="round"/>
            <circle cx="110" cy="175" r="22" fill="#FFFFFF" stroke="#0F172A" stroke-width="6"/>
            <path d="M 290 270 Q 360 300, 365 360" stroke="#0F172A" stroke-width="16" fill="none" stroke-linecap="round"/>
            <circle cx="365" cy="365" r="22" fill="#FFFFFF" stroke="#0F172A" stroke-width="6"/>
            <!-- Tête penchée -->
            <rect x="185" y="155" width="95" height="85" rx="20" fill="#E2E8F0" stroke="#0F172A" stroke-width="8"/>
            <path d="M 215 190 A 14 14 0 1 0 230 200 L 223 194 Z" fill="#0F172A"/>
            <path d="M 250 190 A 14 14 0 1 0 265 200 L 258 194 Z" fill="#0F172A"/>
            <path d="M 215 220 Q 240 235, 260 215" stroke="#0F172A" stroke-width="5" stroke-linecap="round" fill="none"/>
            <path d="M 232 155 L 232 120" stroke="#0F172A" stroke-width="6"/>
            <circle cx="232" cy="110" r="14" fill="#FACC15" stroke="#0F172A" stroke-width="5"/>
          </g>
          <!-- Notes de musique dans l'air -->
          <text x="380" y="180" font-family="sans-serif" font-size="28" font-weight="bold" fill="#FACC15">♪</text>
        </svg>`
      },
      {
        id: 'r4',
        index: 3,
        poseName: 'Hanche à Droite (Shimmy Right)',
        description: 'Balançoire symétrique vers la droite, retour de groove.',
        holdDuration: 1,
        userStrokes: [],
        svgContent: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="272" cy="430" rx="120" ry="18" fill="#0A0A0A" opacity="0.5"/>
          <ellipse cx="180" cy="415" rx="35" ry="18" fill="#0F172A" stroke="#E2E8F0" stroke-width="4"/>
          <ellipse cx="340" cy="415" rx="35" ry="18" fill="#0F172A" stroke="#E2E8F0" stroke-width="4"/>
          <path d="M 245 350 Q 230 380, 185 410" stroke="#0F172A" stroke-width="16" fill="none" stroke-linecap="round"/>
          <path d="M 320 350 Q 360 380, 335 410" stroke="#0F172A" stroke-width="16" fill="none" stroke-linecap="round"/>
          <!-- Corps penché à droite -->
          <g transform="rotate(10 282 310)">
            <rect x="222" y="250" width="120" height="105" rx="26" fill="#E2E8F0" stroke="#0F172A" stroke-width="8"/>
            <rect x="247" y="275" width="70" height="50" rx="10" fill="#0F172A"/>
            <circle cx="292" cy="300" r="8" fill="#FACC15"/>
            <!-- Bras droit en haut, bras gauche en bas -->
            <path d="M 342 270 Q 412 240, 402 180" stroke="#0F172A" stroke-width="16" fill="none" stroke-linecap="round"/>
            <circle cx="402" cy="175" r="22" fill="#FFFFFF" stroke="#0F172A" stroke-width="6"/>
            <path d="M 222 270 Q 152 300, 147 360" stroke="#0F172A" stroke-width="16" fill="none" stroke-linecap="round"/>
            <circle cx="147" cy="365" r="22" fill="#FFFFFF" stroke="#0F172A" stroke-width="6"/>
            <!-- Tête penchée à droite -->
            <rect x="232" y="155" width="95" height="85" rx="20" fill="#E2E8F0" stroke="#0F172A" stroke-width="8"/>
            <path d="M 252 190 A 14 14 0 1 0 267 200 L 260 194 Z" fill="#0F172A"/>
            <path d="M 287 190 A 14 14 0 1 0 302 200 L 295 194 Z" fill="#0F172A"/>
            <path d="M 252 215 Q 272 235, 297 220" stroke="#0F172A" stroke-width="5" stroke-linecap="round" fill="none"/>
            <path d="M 279 155 L 279 120" stroke="#0F172A" stroke-width="6"/>
            <circle cx="279" cy="110" r="14" fill="#FACC15" stroke="#0F172A" stroke-width="5"/>
          </g>
          <text x="100" y="190" font-family="sans-serif" font-size="28" font-weight="bold" fill="#FACC15">♫</text>
        </svg>`
      }
    ]
  },
  {
    id: 'samourai-katana',
    title: 'Samouraï & Flamme Azur (Anime 2D)',
    description: 'Dégainage fulgurant du katana avec onde de choc et particules d\'énergie bleue.',
    style: 'Anime / Studio Ghibli',
    action: 'Attaque & Coup spécial (Action & FX)',
    width: 512,
    height: 512,
    fps: 10,
    backgroundColor: '#0B0F19',
    colorPalette: ['#38BDF8', '#0284C7', '#F8FAFC', '#1E293B', '#F43F5E'],
    frames: [
      {
        id: 's1',
        index: 0,
        poseName: 'Pose de Garde (Iaido)',
        description: 'Main sur la garde du sabre, concentration absolue, vent dans le haori.',
        holdDuration: 1,
        userStrokes: [],
        svgContent: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="256" cy="440" rx="140" ry="24" fill="#030712" opacity="0.6"/>
          <!-- Haori sombre et hakama -->
          <polygon points="190,340 140,430 250,430 230,340" fill="#1E293B"/>
          <polygon points="260,340 240,430 360,430 300,340" fill="#0F172A"/>
          <!-- Buste penché en avant -->
          <path d="M 200 240 L 290 230 L 280 340 L 190 340 Z" fill="#1E293B" stroke="#0F172A" stroke-width="4"/>
          <!-- Écharpe / Obi flottant -->
          <path d="M 230 330 C 180 320, 140 360, 110 390 Q 150 350, 230 340 Z" fill="#0284C7"/>
          <!-- Bras gauche tenant le fourreau (Saya) -->
          <path d="M 220 280 L 160 300 L 190 320" stroke="#CBD5E1" stroke-width="12" stroke-linecap="round" fill="none"/>
          <!-- Fourreau noir -->
          <line x1="150" y1="330" x2="310" y2="290" stroke="#0F172A" stroke-width="10" stroke-linecap="round"/>
          <!-- Main droite sur la garde (Tsuba) -->
          <circle cx="270" cy="298" r="14" fill="#F8FAFC" stroke="#0284C7" stroke-width="3"/>
          <circle cx="280" cy="296" r="6" fill="#F43F5E"/>
          <!-- Tête du guerrier avec ruban flottant -->
          <circle cx="270" cy="190" r="38" fill="#FDE68A"/>
          <!-- Chevelure anime corbeau -->
          <path d="M 230 180 C 230 140, 270 140, 290 150 C 310 160, 315 190, 305 210 C 295 190, 280 180, 270 180 Z" fill="#0F172A"/>
          <!-- Yeux fermés ultra-concentrés -->
          <line x1="265" y1="190" x2="285" y2="190" stroke="#0F172A" stroke-width="4" stroke-linecap="round"/>
          <!-- Ruban rouge bandeau flottant -->
          <path d="M 232 185 C 170 170, 120 180, 90 200 C 130 180, 180 175, 230 190 Z" fill="#F43F5E"/>
        </svg>`
      },
      {
        id: 's2',
        index: 1,
        poseName: 'Dégainage Éclair (Slash Flash)',
        description: 'Le katana jaillit en un quart de seconde avec un arc lumineux bleu céleste.',
        holdDuration: 1,
        userStrokes: [],
        svgContent: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="280" cy="440" rx="150" ry="22" fill="#030712" opacity="0.6"/>
          <!-- Arc de coupe énergétique spectaculaire -->
          <path d="M 80 400 C 120 180, 320 80, 470 160" stroke="#38BDF8" stroke-width="18" fill="none" stroke-linecap="round" opacity="0.95"/>
          <path d="M 100 390 C 140 200, 310 110, 450 170" stroke="#FFFFFF" stroke-width="6" fill="none" stroke-linecap="round"/>
          <!-- Étincelles et particules -->
          <circle cx="280" cy="110" r="8" fill="#38BDF8"/>
          <circle cx="380" cy="130" r="12" fill="#FFFFFF"/>
          <circle cx="160" cy="270" r="6" fill="#38BDF8"/>
          <!-- Guerrier en fente avant rapide -->
          <polygon points="210,340 130,430 260,430 250,340" fill="#1E293B"/>
          <polygon points="280,340 320,430 430,430 350,340" fill="#0F172A"/>
          <!-- Buste projeté en avant -->
          <path d="M 230 260 L 330 240 L 320 340 L 220 340 Z" fill="#1E293B"/>
          <!-- Lame katana visible en pleine course -->
          <line x1="330" y1="240" x2="465" y2="165" stroke="#F8FAFC" stroke-width="8" stroke-linecap="round"/>
          <!-- Tête du samouraï, regard étincelant -->
          <circle cx="310" cy="200" r="38" fill="#FDE68A"/>
          <path d="M 270 190 C 270 150, 310 150, 330 160 C 350 170, 355 200, 345 220 Z" fill="#0F172A"/>
          <circle cx="325" cy="200" r="5" fill="#38BDF8"/>
          <!-- Bandeau rouge flottant à toute allure -->
          <path d="M 270 195 C 190 180, 130 160, 80 170 C 130 165, 200 175, 270 200 Z" fill="#F43F5E"/>
        </svg>`
      },
      {
        id: 's3',
        index: 2,
        poseName: 'Fin de Passe & Énergie Résiduelle',
        description: 'La lame s\'immobilise, fendant l\'air tandis que les braises d\'énergie se dissipent.',
        holdDuration: 1,
        userStrokes: [],
        svgContent: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="300" cy="440" rx="160" ry="24" fill="#030712" opacity="0.6"/>
          <!-- Traînée de braises d'énergie bleue -->
          <circle cx="440" cy="190" r="14" fill="#38BDF8" opacity="0.7"/>
          <circle cx="410" cy="240" r="8" fill="#38BDF8" opacity="0.5"/>
          <circle cx="360" cy="150" r="6" fill="#FFFFFF" opacity="0.8"/>
          <!-- Pose de fente stable -->
          <polygon points="230,340 150,430 270,430 260,340" fill="#1E293B"/>
          <polygon points="290,340 340,430 450,430 370,340" fill="#0F172A"/>
          <path d="M 240 270 L 340 260 L 330 350 L 230 350 Z" fill="#1E293B"/>
          <!-- Katana tenu fermement en garde latérale -->
          <line x1="340" y1="270" x2="450" y2="310" stroke="#F8FAFC" stroke-width="7" stroke-linecap="round"/>
          <line x1="340" y1="270" x2="450" y2="310" stroke="#38BDF8" stroke-width="2"/>
          <!-- Tête du samouraï calme -->
          <circle cx="320" cy="210" r="38" fill="#FDE68A"/>
          <path d="M 280 200 C 280 160, 320 160, 340 170 C 360 180, 365 210, 355 230 Z" fill="#0F172A"/>
          <circle cx="332" cy="210" r="4" fill="#0F172A"/>
          <!-- Bandeau rouge retombant avec panache -->
          <path d="M 285 205 C 220 200, 160 210, 110 240 C 160 215, 220 210, 285 210 Z" fill="#F43F5E"/>
        </svg>`
      },
      {
        id: 's4',
        index: 3,
        poseName: 'Rengainage (Zanshin)',
        description: 'Mouvement fluide de retour au fourreau, cliquetis métallique du verrou.',
        holdDuration: 1,
        userStrokes: [],
        svgContent: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="270" cy="440" rx="140" ry="24" fill="#030712" opacity="0.6"/>
          <polygon points="200,340 145,430 255,430 235,340" fill="#1E293B"/>
          <polygon points="265,340 245,430 365,430 305,340" fill="#0F172A"/>
          <path d="M 210 250 L 300 240 L 290 340 L 200 340 Z" fill="#1E293B"/>
          <!-- Katana presque rentré dans le fourreau -->
          <line x1="160" y1="330" x2="310" y2="290" stroke="#0F172A" stroke-width="10" stroke-linecap="round"/>
          <line x1="280" y1="298" x2="330" y2="285" stroke="#F8FAFC" stroke-width="6" stroke-linecap="round"/>
          <!-- Étincelle de rengainage au contact de la garde -->
          <polygon points="280,290 286,298 294,298 288,304 290,312 282,306 274,310 278,302 272,296 280,296" fill="#38BDF8"/>
          <circle cx="280" cy="200" r="38" fill="#FDE68A"/>
          <path d="M 240 190 C 240 150, 280 150, 300 160 C 320 170, 325 200, 315 220 Z" fill="#0F172A"/>
          <line x1="275" y1="200" x2="295" y2="200" stroke="#0F172A" stroke-width="4" stroke-linecap="round"/>
          <path d="M 242 195 C 190 190, 150 210, 120 230 C 150 210, 190 200, 240 200 Z" fill="#F43F5E"/>
        </svg>`
      }
    ]
  }
];
