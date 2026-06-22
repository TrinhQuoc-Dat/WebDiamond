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

const SPEC = "PLEASE NOTE: IT WILL TAKE FROM 1 TO 3 WORKING DAYS TO SHIP THIS ITEM. ORDERS OUTSIDE VIETNAM: TAXES AND DUTIES WILL BE PAID BY THE CUSTOMER UPON DELIVERY.";
const DESC = [
  "Handcrafted with precision and intention.",
  "Signature GODG1FT aesthetic — bold, refined, luminous.",
  "Premium materials with a sleek, technical finish.",
  "Designed for those who wear purpose.",
  "True to size. We recommend your standard size for the perfect fit.",
];
const COLORS = [
  { id: "silver", name: "Silver", hex: "#E5E5E5" },
  { id: "gold", name: "Gold", hex: "#D4AF37" },
];

const baseNecklace: Omit<Product, "slug"> = {
  name: "NECKLACE LIGHTNING",
  category: "NECKLACE",
  price: "50.000.000 VND",
  image: "/shop.png",
  images: ["/shop.png", "/shop.png", "/shop.png", "/shop.png", "/shop.png"],
  tag: null,
  description: DESC, spec: SPEC, colors: COLORS, sizes: ["40", "45", "50", "55"],
};

const baseBracelet: Omit<Product, "slug"> = {
  name: "BRACELETS LIGHTNING",
  category: "BRACELETS",
  price: "50.000.000 VND",
  image: "/shop.png",
  images: ["/shop.png", "/shop.png", "/shop.png", "/shop.png", "/shop.png"],
  tag: null,
  description: DESC, spec: SPEC, colors: COLORS, sizes: ["16", "17", "18", "19"],
};

export const products: Product[] = [
  // ── Necklaces (15 items = 5 rows) ──
  ...Array.from({ length: 15 }).map((_, i) => ({
    ...baseNecklace,
    slug: `necklace-lightning-${i + 1}`
  })),
  // ── Bracelets (15 items = 5 rows) ──
  ...Array.from({ length: 15 }).map((_, i) => ({
    ...baseBracelet,
    slug: `bracelets-shining-${i + 1}`
  }))
];
