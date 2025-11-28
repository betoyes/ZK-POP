import heroImage from '@assets/generated_images/luxury_jewelry_hero_image_with_model.png';
import ringImage from '@assets/generated_images/diamond_ring_product_shot.png';
import necklaceImage from '@assets/generated_images/gold_necklace_product_shot.png';
import earringsImage from '@assets/generated_images/pearl_earrings_product_shot.png';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  collection: string;
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Branding {
  companyName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroMediaType: 'image' | 'video';
  heroMediaUrl: string;
  manifestoTitle: string;
  manifestoText: string;
}

export const initialBranding: Branding = {
  companyName: 'ZK REZK',
  heroTitle: 'Herança\nFutura',
  heroSubtitle: 'Coleção 01',
  heroMediaType: 'image',
  heroMediaUrl: heroImage,
  manifestoTitle: 'Redefinindo o Luxo',
  manifestoText: 'Acreditamos em joias que falam a linguagem da arquitetura moderna. Linhas limpas, formas ousadas e uma presença inegável.'
};

export const categories: Category[] = [
  { id: 'aneis', name: 'Anéis', description: 'Símbolos de eternidade e compromisso.' },
  { id: 'colares', name: 'Colares', description: 'Elegância que envolve.' },
  { id: 'brincos', name: 'Brincos', description: 'Detalhes que iluminam.' },
  { id: 'pulseiras', name: 'Pulseiras', description: 'Toque de sofisticação.' },
];

export const collections: Collection[] = [
  { id: 'eternal', name: 'Eternal Collection', description: 'Diamantes clássicos para momentos eternos.', image: ringImage },
  { id: 'aurora', name: 'Aurora Gold', description: 'O brilho quente do ouro 18k.', image: necklaceImage },
  { id: 'ocean', name: 'Ocean Pearls', description: 'Pérolas naturais de elegância atemporal.', image: earringsImage },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Anel Solitário Royal',
    price: 12500,
    description: 'Um diamante de 1 quilate cravado em ouro branco 18k. A essência do luxo clássico.',
    image: ringImage,
    category: 'aneis',
    collection: 'eternal',
    isNew: true,
  },
  {
    id: 2,
    name: 'Colar Minimalist Gold',
    price: 4200,
    description: 'Corrente delicada em ouro amarelo 18k com pendente geométrico.',
    image: necklaceImage,
    category: 'colares',
    collection: 'aurora',
  },
  {
    id: 3,
    name: 'Brincos Pérola Barroca',
    price: 3800,
    description: 'Pérolas barrocas naturais com acabamento em ouro rosé.',
    image: earringsImage,
    category: 'brincos',
    collection: 'ocean',
    isNew: true,
  },
  {
    id: 4,
    name: 'Anel Infinity Diamond',
    price: 8900,
    description: 'Anel cravejado com diamantes em toda a volta. Ouro amarelo 18k.',
    image: ringImage,
    category: 'aneis',
    collection: 'eternal',
  },
  {
    id: 5,
    name: 'Gargantilha Riviera',
    price: 25000,
    description: 'Diamantes negros e brancos intercalados em ouro branco.',
    image: necklaceImage,
    category: 'colares',
    collection: 'eternal',
  },
  {
    id: 6,
    name: 'Brincos Cascata de Ouro',
    price: 5600,
    description: 'Design fluido que imita o movimento da água. Ouro 18k.',
    image: earringsImage,
    category: 'brincos',
    collection: 'aurora',
  },
  {
    id: 7,
    name: 'Pulseira Tennis Classic',
    price: 15000,
    description: 'A clássica pulseira tennis com diamantes de alta pureza.',
    image: ringImage, // Placeholder
    category: 'pulseiras',
    collection: 'eternal',
  },
  {
    id: 8,
    name: 'Colar Medalhão Vintage',
    price: 6700,
    description: 'Inspiração vitoriana com um toque moderno.',
    image: necklaceImage,
    category: 'colares',
    collection: 'aurora',
    isNew: true,
  },
  {
    id: 9,
    name: 'Anel Safira Real',
    price: 18000,
    description: 'Safira azul profunda cercada por diamantes.',
    image: ringImage,
    category: 'aneis',
    collection: 'eternal',
  },
  {
    id: 10,
    name: 'Brincos Argola Diamond',
    price: 9200,
    description: 'Argolas clássicas cravejadas interna e externamente.',
    image: earringsImage,
    category: 'brincos',
    collection: 'eternal',
  },
];
