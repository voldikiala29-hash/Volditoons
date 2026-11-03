export interface CharacterAsset {
  id: string;
  name: string;
  role: string;
  defaultImage: string;
  expressions: {
    neutral: string;
    talking: string;
    shocked: string;
    laughing?: string;
    suspicious?: string;
  };
}

export interface BackgroundAsset {
  id: string;
  name: string;
  image: string;
  category: 'indoor' | 'classroom' | 'vehicle' | 'bathroom' | 'outdoor';
}

export interface PropAsset {
  id: string;
  name: string;
  image: string;
}

export const USER_BACKGROUNDS: BackgroundAsset[] = [
  {
    id: 'salon_vert_fenetre',
    name: 'Salon Vert avec Fenêtre & Canapé',
    image: '/assets/aistudio/img9693_941e5d22.webp',
    category: 'indoor',
  },
  {
    id: 'salon_vert_canape',
    name: 'Salon Vert Canapé Cosy',
    image: '/assets/aistudio/img3129_765f03a1.webp',
    category: 'indoor',
  },
  {
    id: 'salon_beige_porte',
    name: 'Salon Beige avec Porte',
    image: '/assets/aistudio/img4502_11920286.webp',
    category: 'indoor',
  },
  {
    id: 'classe_interieur',
    name: 'Salle de Classe École',
    image: '/assets/aistudio/img6490_1983b7b9.webp',
    category: 'classroom',
  },
  {
    id: 'classe_exterieur',
    name: 'Campus Extérieur École',
    image: '/assets/aistudio/img2039_31c111b1.webp',
    category: 'outdoor',
  },
  {
    id: 'voiture_arriere',
    name: 'Sièges Arrière de Voiture',
    image: '/assets/aistudio/img2319_1805196b.webp',
    category: 'vehicle',
  },
  {
    id: 'sanitaires_toilettes',
    name: 'Toilettes & Lavabos',
    image: '/assets/aistudio/img9515_204217e2.webp',
    category: 'bathroom',
  },
];

export const USER_PROPS: PropAsset[] = [
  {
    id: 'baby_oil_promax',
    name: 'Bouteille Baby Oil Promax',
    image: '/assets/aistudio/img9135_42953dcf.webp',
  },
  {
    id: 'tableau_blanc_face',
    name: 'Tableau Blanc (White Board)',
    image: '/assets/aistudio/img3445_4d072f00.webp',
  },
  {
    id: 'tableau_blanc_angle',
    name: 'Tableau Blanc en perspective',
    image: '/assets/aistudio/img1926_cdca4dc1.webp',
  },
  {
    id: 'canape_isole',
    name: 'Canapé Vert Foncé',
    image: '/assets/aistudio/img1868_9f17b4e7.webp',
  },
  {
    id: 'tv_retro_crt',
    name: 'Téléviseur Cathodique Vintage',
    image: '/assets/aistudio/img2751_0479e3cd.webp',
  },
];

export const USER_CHARACTERS: CharacterAsset[] = [
  {
    id: 'vieux_sage',
    name: 'Le Vieux Sage',
    role: 'Personnage rusé et expressif avec chapeau et barbiche blanche',
    defaultImage: '/assets/aistudio/img1623_c209893d.webp',
    expressions: {
      neutral: '/assets/aistudio/img6763_7d5e2a94.webp',
      talking: '/assets/aistudio/img2264_795876b0.webp',
      shocked: '/assets/aistudio/img1327_c7533137.webp',
      laughing: '/assets/aistudio/img1327_c7533137.webp',
      suspicious: '/assets/aistudio/img9635_a708c3ad.webp',
    },
  },
  {
    id: 'enqueteur',
    name: 'L\'Homme au Chapeau',
    role: 'Personnage anxieux et curieux avec chapeau marron',
    defaultImage: '/assets/aistudio/img5321_f619af34.webp',
    expressions: {
      neutral: '/assets/aistudio/img5321_f619af34.webp',
      talking: '/assets/aistudio/img4362_d659ca09.webp',
      shocked: '/assets/aistudio/img1306_b3db0d56.webp',
      laughing: '/assets/aistudio/img3483_e92458fd.webp',
      suspicious: '/assets/aistudio/img3483_e92458fd.webp',
    },
  },
  {
    id: 'chauve_stresse',
    name: 'Le Chauve en Panique',
    role: 'Personnage hyper-expressif, sueur et panique cartoon',
    defaultImage: '/assets/aistudio/img6837_e91b0afa.webp',
    expressions: {
      neutral: '/assets/aistudio/img6837_e91b0afa.webp',
      talking: '/assets/aistudio/img7749_d8fea05f.webp',
      shocked: '/assets/aistudio/img8079_f11f2974.webp',
      laughing: '/assets/aistudio/img7749_d8fea05f.webp',
      suspicious: '/assets/aistudio/img8079_f11f2974.webp',
    },
  },
  {
    id: 'maitre_paille',
    name: 'Le Maître Voyageur',
    role: 'Personnage au chapeau conique avec son acolyte expressif',
    defaultImage: '/assets/aistudio/img2276_61a14558.webp',
    expressions: {
      neutral: '/assets/aistudio/img2276_61a14558.webp',
      talking: '/assets/aistudio/img5947_26e00aff.webp',
      shocked: '/assets/aistudio/img5123_e8cb1d91.webp',
    },
  },
  {
    id: 'gars_vert',
    name: 'Le Filiforme Vert',
    role: 'Personnage cartoon vert flexible et élastique',
    defaultImage: '/assets/aistudio/img1540_37eb1984.webp',
    expressions: {
      neutral: '/assets/aistudio/img1540_37eb1984.webp',
      talking: '/assets/aistudio/img2805_a8ba3617.webp',
      shocked: '/assets/aistudio/img1540_37eb1984.webp',
    },
  },
  {
    id: 'ecoliers_classe',
    name: 'La Classe d\'Élèves',
    role: 'Foule d\'écoliers attentifs ou terrifiés assis aux pupitres',
    defaultImage: '/assets/aistudio/img6506_11874201.webp',
    expressions: {
      neutral: '/assets/aistudio/img6506_11874201.webp',
      talking: '/assets/aistudio/img6506_11874201.webp',
      shocked: '/assets/aistudio/img5798_a2f98d0a.webp',
    },
  },
];

// Special body parts & sheets
export const MOUTH_SHEET = '/assets/aistudio/img3693_6662af66.webp';
export const EYE_SHEET = '/assets/aistudio/img5882_3e9cbe71.webp';
export const CROWD_FOG = '/assets/aistudio/img5798_a2f98d0a.webp';
export const MONSTER_DUO = '/assets/aistudio/img6088_4cc4d944.webp';
