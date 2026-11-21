export type CategorySlug =
  | 'all'
  | 'notebooks'
  | 'writing'
  | 'paper'
  | 'art-color'
  | 'desk'
  | 'books';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

export interface ProductVariant {
  name: string;
  colorHex: string;
}

export interface Product {
  id: string;
  name: string;
  category: Exclude<CategorySlug, 'all'>;
  categoryLabel: string;
  price: number;
  image: string;
  secondaryImage?: string;
  badge?: 'Bestseller' | 'New Arrival' | 'Studio Edition';
  isNewArrival?: boolean;
  moods: ('quiet-morning' | 'colorful-thinking' | 'organized-mind' | 'open-sketchbook')[];
  shortDescription: string;
  details: string[];
  dimensions: string;
  materials: string;
  variants?: ProductVariant[];
}

export interface CategoryItem {
  id: Exclude<CategorySlug, 'all'>;
  title: string;
  description: string;
  image: string;
  itemCount: number;
  aspectClass: string;
}

export interface MoodCollection {
  id: 'quiet-morning' | 'colorful-thinking' | 'organized-mind' | 'open-sketchbook';
  title: string;
  subtitle: string;
  description: string;
  image: string;
  accentColor: string;
}

export interface EditorialArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  body: string[];
}

export interface CartItem {
  product: Product;
  variantName: string;
  quantity: number;
}

export interface PlacedOrder {
  orderNumber: string;
  date: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  notes?: string;
  channel: 'checkout' | 'whatsapp';
  total: number;
  items: { name: string; variant: string; quantity: number; price: number }[];
}
