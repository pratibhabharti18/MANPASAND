export type Gender = 'male' | 'female';

export interface Shoe {
  id: string;
  name: string;
  price: number;
  gender: Gender;
  category: string;
  color: string;
  image: string;
  sizes: number[];
  brand: string;
  material: string;
  popularity: number;
  isNew: boolean;
}

export const MALE_CATEGORIES = ['Sneakers', 'Formal Shoes', 'Sports Shoes', 'Boots', 'Loafers', 'Sandals'];

export const FEMALE_COLORS = [
  { id: 'Pink', hex: '#FFC0CB' },
  { id: 'Pastel Green', hex: '#b2d8b2' },
  { id: 'Lavender', hex: '#E6E6FA' },
  { id: 'Beige', hex: '#F5F5DC' },
  { id: 'White', hex: '#FFFFFF' },
  { id: 'Black', hex: '#000000' },
  { id: 'Red', hex: '#FF0000' },
  { id: 'Blue', hex: '#0000FF' },
  { id: 'Yellow', hex: '#FFFF00' },
  { id: 'Peach', hex: '#FFDAB9' }
];

export const FEMALE_CATEGORIES = ['Heels', 'Sandals', 'Flats', 'Sneakers', 'Ethnic'];

export const SHOES: Shoe[] = [
  // MALE SHOES
  {
    id: 'm1',
    name: 'Midnight Gold Sneakers',
    price: 4500,
    gender: 'male',
    category: 'Sneakers',
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    sizes: [8, 9, 10, 11],
    brand: 'Luxe',
    material: 'Leather',
    popularity: 95,
    isNew: true
  },
  {
    id: 'm2',
    name: 'Classic Oxford Formals',
    price: 6500,
    gender: 'male',
    category: 'Formal Shoes',
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&q=80&w=800',
    sizes: [7, 8, 9, 10],
    brand: 'Aristocrat',
    material: 'Leather',
    popularity: 88,
    isNew: false
  },
  {
    id: 'm3',
    name: 'Onyx Running Runners',
    price: 3500,
    gender: 'male',
    category: 'Sports Shoes',
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
    sizes: [8, 9, 10, 11, 12],
    brand: 'Velocity',
    material: 'Mesh',
    popularity: 92,
    isNew: true
  },
  {
    id: 'm4',
    name: 'Premium Leather Chelsea Boots',
    price: 8500,
    gender: 'male',
    category: 'Boots',
    color: 'Brown',
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=800',
    sizes: [9, 10, 11],
    brand: 'Luxe',
    material: 'Leather',
    popularity: 85,
    isNew: false
  },
  {
    id: 'm5',
    name: 'Velvet Gold Tassel Loafers',
    price: 5500,
    gender: 'male',
    category: 'Loafers',
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=800',
    sizes: [7, 8, 9],
    brand: 'Aristocrat',
    material: 'Velvet',
    popularity: 75,
    isNew: true
  },
  {
    id: 'm6',
    name: 'Emperor Leather Sandals',
    price: 2500,
    gender: 'male',
    category: 'Sandals',
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&q=80&w=800',
    sizes: [8, 9, 10],
    brand: 'Comfort Walk',
    material: 'Leather',
    popularity: 60,
    isNew: false
  },
  {
    id: 'm7',
    name: 'Gold Accent High-Tops',
    price: 5000,
    gender: 'male',
    category: 'Sneakers',
    color: 'Gold',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810baa3?auto=format&fit=crop&q=80&w=800',
    sizes: [9, 10, 11, 12],
    brand: 'Luxe',
    material: 'Synthetic',
    popularity: 89,
    isNew: true
  },
  {
    id: 'm8',
    name: 'Monarch Wingtip Brogues',
    price: 7500,
    gender: 'male',
    category: 'Formal Shoes',
    color: 'Brown',
    image: 'https://images.unsplash.com/photo-1620012253291-724128ddb381?auto=format&fit=crop&q=80&w=800',
    sizes: [8, 9, 10],
    brand: 'Aristocrat',
    material: 'Leather',
    popularity: 82,
    isNew: false
  },
  {
    id: 'm9',
    name: 'Titanium Speed Runners',
    price: 3999,
    gender: 'male',
    category: 'Sports Shoes',
    color: 'Grey',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    sizes: [7, 8, 9, 10],
    brand: 'Velocity',
    material: 'Mesh',
    popularity: 96,
    isNew: true
  },
  {
    id: 'm10',
    name: 'Rugged Outback Boots',
    price: 8999,
    gender: 'male',
    category: 'Boots',
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=800',
    sizes: [8, 9, 10, 11],
    brand: 'Aristocrat',
    material: 'Leather',
    popularity: 79,
    isNew: false
  },

  // FEMALE SHOES
  {
    id: 'f1',
    name: 'Rose Quartz Stilettos',
    price: 3499,
    gender: 'female',
    category: 'Heels',
    color: 'Pink',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
    sizes: [5, 6, 7, 8],
    brand: 'Elegance',
    material: 'Suede',
    popularity: 98,
    isNew: true
  },
  {
    id: 'f2',
    name: 'Mint Breeze Block Heels',
    price: 2999,
    gender: 'female',
    category: 'Heels',
    color: 'Pastel Green',
    image: 'https://images.unsplash.com/photo-1618844890539-715bd7d8a9df?auto=format&fit=crop&q=80&w=800',
    sizes: [6, 7, 8, 9],
    brand: 'Chic Walk',
    material: 'Leather',
    popularity: 85,
    isNew: false
  },
  {
    id: 'f3',
    name: 'Lavender Dream Flats',
    price: 1999,
    gender: 'female',
    category: 'Flats',
    color: 'Lavender',
    image: 'https://images.unsplash.com/photo-1596755381832-15f5fc9076bc?auto=format&fit=crop&q=80&w=800',
    sizes: [5, 6, 7, 8, 9],
    brand: 'Comfort Walk',
    material: 'Leather',
    popularity: 91,
    isNew: true
  },
  {
    id: 'f4',
    name: 'Minimalist Beige Sandals',
    price: 1799,
    gender: 'female',
    category: 'Sandals',
    color: 'Beige',
    image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&q=80&w=800',
    sizes: [6, 7, 8],
    brand: 'Elegance',
    material: 'Synthetic',
    popularity: 78,
    isNew: false
  },
  {
    id: 'f5',
    name: 'Cloud White Platform Sneakers',
    price: 2499,
    gender: 'female',
    category: 'Sneakers',
    color: 'White',
    image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&q=80&w=800',
    sizes: [5, 6, 7, 8],
    brand: 'Velocity',
    material: 'Canvas',
    popularity: 94,
    isNew: true
  },
  {
    id: 'f6',
    name: 'Midnight Elegant Heels',
    price: 3999,
    gender: 'female',
    category: 'Heels',
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=800',
    sizes: [6, 7, 8, 9],
    brand: 'Elegance',
    material: 'Leather',
    popularity: 88,
    isNew: false
  },
  {
    id: 'f7',
    name: 'Crimson Velvet Pumps',
    price: 4500,
    gender: 'female',
    category: 'Heels',
    color: 'Red',
    image: 'https://images.unsplash.com/photo-1503160655497-20eb42436d55?auto=format&fit=crop&q=80&w=800',
    sizes: [5, 6, 7],
    brand: 'Chic Walk',
    material: 'Velvet',
    popularity: 76,
    isNew: true
  },
  {
    id: 'f8',
    name: 'Sapphire Slip-ons',
    price: 1899,
    gender: 'female',
    category: 'Flats',
    color: 'Blue',
    image: 'https://images.unsplash.com/photo-1535043934128-d8dd0b106093?auto=format&fit=crop&q=80&w=800',
    sizes: [6, 7, 8, 9],
    brand: 'Comfort Walk',
    material: 'Canvas',
    popularity: 82,
    isNew: false
  },
  {
    id: 'f9',
    name: 'Sunshine Yellow Sandals',
    price: 1599,
    gender: 'female',
    category: 'Sandals',
    color: 'Yellow',
    image: 'https://images.unsplash.com/photo-1515347619152-32b55b6c28f0?auto=format&fit=crop&q=80&w=800',
    sizes: [5, 6, 7, 8],
    brand: 'Chic Walk',
    material: 'Synthetic',
    popularity: 68,
    isNew: false
  },
  {
    id: 'f10',
    name: 'Peach Everyday Sneakers',
    price: 2299,
    gender: 'female',
    category: 'Sneakers',
    color: 'Peach',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800',
    sizes: [6, 7, 8, 9],
    brand: 'Velocity',
    material: 'Mesh',
    popularity: 89,
    isNew: true
  },
  {
    id: 'f11',
    name: 'Embroidered Ethnic Juttis',
    price: 1499,
    gender: 'female',
    category: 'Ethnic',
    color: 'Pink',
    image: 'https://images.unsplash.com/photo-1605812860427-4024433a70fd?auto=format&fit=crop&q=80&w=800',
    sizes: [5, 6, 7, 8],
    brand: 'Elegance',
    material: 'Fabric',
    popularity: 74,
    isNew: false
  },
  {
    id: 'f12',
    name: 'Blush Suede Mules',
    price: 2799,
    gender: 'female',
    category: 'Flats',
    color: 'Pink',
    image: 'https://images.unsplash.com/photo-1533669701768-e5008cfce4de?auto=format&fit=crop&q=80&w=800',
    sizes: [6, 7, 8],
    brand: 'Chic Walk',
    material: 'Suede',
    popularity: 81,
    isNew: true
  }
];
