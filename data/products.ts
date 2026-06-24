export interface Product {
  slug: string;
  name: string;
  category: string;
  price: string;
  image: string;
  images: string[];
  tag: string | null;
  description: string[];
  spec: string;
  colors: { id: string; name: string; hex: string }[];
  sizes: string[];
}

export const products: Product[] = [];
