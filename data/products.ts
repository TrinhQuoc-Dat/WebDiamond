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

export const products: Product[] = [
  // Necklaces (6 items)
  {
    slug: "necklace-lightning-1",
    name: "NECKLACE LIGHTNING",
    category: "NECKLACE",
    price: "50.000.000 VNĐ",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400&q=80&auto=format&fit=crop"
    ],
    tag: "Bestseller",
    description: [
      "Sustainable, breathable, and comfortable.",
      "Signature aesthetic with a stealthy, refined edge.",
      "Star motifs and branding that shine in low-light conditions.",
      "Enhanced structure with a sleek, technical finish.",
      "True to size. We recommend your standard size for the perfect fit."
    ],
    spec: "SAME IS 6'3, WEARING SIZE L JERSEY, CHYNA IS 5'6, WEARING SIZE M JERSEY. PLEASE NOTE: IT WILL TAKE FROM 1 TO 3 WORKING DAYS TO SHIP THIS ITEM. ORDERS OUTSIDE THE UK: TAXES AND DUTIES WILL BE PAID BY THE CUSTOMER UPON THE DELIVERY OF THE ORDER.",
    colors: [
      { id: "silver", name: "Silver", hex: "#E5E5E5" },
      { id: "gold", name: "Gold", hex: "#D4AF37" }
    ],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    slug: "necklace-lightning-2",
    name: "NECKLACE LIGHTNING II",
    category: "NECKLACE",
    price: "50.000.000 VNĐ",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400&q=80&auto=format&fit=crop"
    ],
    tag: null,
    description: [
      "Sustainable, breathable, and comfortable.",
      "Signature aesthetic with a stealthy, refined edge.",
      "Star motifs and branding that shine in low-light conditions.",
      "Enhanced structure with a sleek, technical finish.",
      "True to size. We recommend your standard size for the perfect fit."
    ],
    spec: "SAME IS 6'3, WEARING SIZE L JERSEY, CHYNA IS 5'6, WEARING SIZE M JERSEY. PLEASE NOTE: IT WILL TAKE FROM 1 TO 3 WORKING DAYS TO SHIP THIS ITEM. ORDERS OUTSIDE THE UK: TAXES AND DUTIES WILL BE PAID BY THE CUSTOMER UPON THE DELIVERY OF THE ORDER.",
    colors: [
      { id: "silver", name: "Silver", hex: "#E5E5E5" },
      { id: "gold", name: "Gold", hex: "#D4AF37" }
    ],
    sizes: ["S", "M", "L"]
  },
  {
    slug: "necklace-lightning-3",
    name: "NECKLACE LIGHTNING III",
    category: "NECKLACE",
    price: "50.000.000 VNĐ",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400&q=80&auto=format&fit=crop"
    ],
    tag: "New",
    description: [
      "Sustainable, breathable, and comfortable.",
      "Signature aesthetic with a stealthy, refined edge.",
      "Star motifs and branding that shine in low-light conditions.",
      "Enhanced structure with a sleek, technical finish.",
      "True to size. We recommend your standard size for the perfect fit."
    ],
    spec: "SAME IS 6'3, WEARING SIZE L JERSEY, CHYNA IS 5'6, WEARING SIZE M JERSEY. PLEASE NOTE: IT WILL TAKE FROM 1 TO 3 WORKING DAYS TO SHIP THIS ITEM. ORDERS OUTSIDE THE UK: TAXES AND DUTIES WILL BE PAID BY THE CUSTOMER UPON THE DELIVERY OF THE ORDER.",
    colors: [
      { id: "silver", name: "Silver", hex: "#E5E5E5" },
      { id: "gold", name: "Gold", hex: "#D4AF37" }
    ],
    sizes: ["S", "M", "L"]
  },
  {
    slug: "necklace-lightning-4",
    name: "NECKLACE LIGHTNING IV",
    category: "NECKLACE",
    price: "50.000.000 VNĐ",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400&q=80&auto=format&fit=crop"
    ],
    tag: null,
    description: [
      "Sustainable, breathable, and comfortable.",
      "Signature aesthetic with a stealthy, refined edge.",
      "Star motifs and branding that shine in low-light conditions.",
      "Enhanced structure with a sleek, technical finish.",
      "True to size. We recommend your standard size for the perfect fit."
    ],
    spec: "SAME IS 6'3, WEARING SIZE L JERSEY, CHYNA IS 5'6, WEARING SIZE M JERSEY. PLEASE NOTE: IT WILL TAKE FROM 1 TO 3 WORKING DAYS TO SHIP THIS ITEM. ORDERS OUTSIDE THE UK: TAXES AND DUTIES WILL BE PAID BY THE CUSTOMER UPON THE DELIVERY OF THE ORDER.",
    colors: [
      { id: "silver", name: "Silver", hex: "#E5E5E5" },
      { id: "gold", name: "Gold", hex: "#D4AF37" }
    ],
    sizes: ["S", "M", "L"]
  },
  {
    slug: "necklace-lightning-5",
    name: "NECKLACE LIGHTNING V",
    category: "NECKLACE",
    price: "50.000.000 VNĐ",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400&q=80&auto=format&fit=crop"
    ],
    tag: null,
    description: [
      "Sustainable, breathable, and comfortable.",
      "Signature aesthetic with a stealthy, refined edge.",
      "Star motifs and branding that shine in low-light conditions.",
      "Enhanced structure with a sleek, technical finish.",
      "True to size. We recommend your standard size for the perfect fit."
    ],
    spec: "SAME IS 6'3, WEARING SIZE L JERSEY, CHYNA IS 5'6, WEARING SIZE M JERSEY. PLEASE NOTE: IT WILL TAKE FROM 1 TO 3 WORKING DAYS TO SHIP THIS ITEM. ORDERS OUTSIDE THE UK: TAXES AND DUTIES WILL BE PAID BY THE CUSTOMER UPON THE DELIVERY OF THE ORDER.",
    colors: [
      { id: "silver", name: "Silver", hex: "#E5E5E5" },
      { id: "gold", name: "Gold", hex: "#D4AF37" }
    ],
    sizes: ["S", "M", "L"]
  },
  {
    slug: "necklace-lightning-6",
    name: "NECKLACE LIGHTNING VI",
    category: "NECKLACE",
    price: "50.000.000 VNĐ",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400&q=80&auto=format&fit=crop"
    ],
    tag: null,
    description: [
      "Sustainable, breathable, and comfortable.",
      "Signature aesthetic with a stealthy, refined edge.",
      "Star motifs and branding that shine in low-light conditions.",
      "Enhanced structure with a sleek, technical finish.",
      "True to size. We recommend your standard size for the perfect fit."
    ],
    spec: "SAME IS 6'3, WEARING SIZE L JERSEY, CHYNA IS 5'6, WEARING SIZE M JERSEY. PLEASE NOTE: IT WILL TAKE FROM 1 TO 3 WORKING DAYS TO SHIP THIS ITEM. ORDERS OUTSIDE THE UK: TAXES AND DUTIES WILL BE PAID BY THE CUSTOMER UPON THE DELIVERY OF THE ORDER.",
    colors: [
      { id: "silver", name: "Silver", hex: "#E5E5E5" },
      { id: "gold", name: "Gold", hex: "#D4AF37" }
    ],
    sizes: ["S", "M", "L"]
  },

  // Bracelets (6 items)
  {
    slug: "bracelets-shining-1",
    name: "BRACELETS SHINING",
    category: "BRACELETS",
    price: "50.000.000 VNĐ",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602752275313-477eaabc497c?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80&auto=format&fit=crop"
    ],
    tag: "Bestseller",
    description: [
      "Sustainable, breathable, and comfortable.",
      "Signature aesthetic with a stealthy, refined edge.",
      "Star motifs and branding that shine in low-light conditions.",
      "Enhanced structure with a sleek, technical finish.",
      "True to size. We recommend your standard size for the perfect fit."
    ],
    spec: "SAME IS 6'3, WEARING SIZE L JERSEY, CHYNA IS 5'6, WEARING SIZE M JERSEY. PLEASE NOTE: IT WILL TAKE FROM 1 TO 3 WORKING DAYS TO SHIP THIS ITEM. ORDERS OUTSIDE THE UK: TAXES AND DUTIES WILL BE PAID BY THE CUSTOMER UPON THE DELIVERY OF THE ORDER.",
    colors: [
      { id: "silver", name: "Silver", hex: "#E5E5E5" },
      { id: "gold", name: "Gold", hex: "#D4AF37" }
    ],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    slug: "bracelets-shining-2",
    name: "BRACELETS SHINING II",
    category: "BRACELETS",
    price: "50.000.000 VNĐ",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602752275313-477eaabc497c?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80&auto=format&fit=crop"
    ],
    tag: null,
    description: [
      "Sustainable, breathable, and comfortable.",
      "Signature aesthetic with a stealthy, refined edge.",
      "Star motifs and branding that shine in low-light conditions.",
      "Enhanced structure with a sleek, technical finish.",
      "True to size. We recommend your standard size for the perfect fit."
    ],
    spec: "SAME IS 6'3, WEARING SIZE L JERSEY, CHYNA IS 5'6, WEARING SIZE M JERSEY. PLEASE NOTE: IT WILL TAKE FROM 1 TO 3 WORKING DAYS TO SHIP THIS ITEM. ORDERS OUTSIDE THE UK: TAXES AND DUTIES WILL BE PAID BY THE CUSTOMER UPON THE DELIVERY OF THE ORDER.",
    colors: [
      { id: "silver", name: "Silver", hex: "#E5E5E5" },
      { id: "gold", name: "Gold", hex: "#D4AF37" }
    ],
    sizes: ["S", "M", "L"]
  },
  {
    slug: "bracelets-shining-3",
    name: "BRACELETS SHINING III",
    category: "BRACELETS",
    price: "50.000.000 VNĐ",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602752275313-477eaabc497c?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80&auto=format&fit=crop"
    ],
    tag: null,
    description: [
      "Sustainable, breathable, and comfortable.",
      "Signature aesthetic with a stealthy, refined edge.",
      "Star motifs and branding that shine in low-light conditions.",
      "Enhanced structure with a sleek, technical finish.",
      "True to size. We recommend your standard size for the perfect fit."
    ],
    spec: "SAME IS 6'3, WEARING SIZE L JERSEY, CHYNA IS 5'6, WEARING SIZE M JERSEY. PLEASE NOTE: IT WILL TAKE FROM 1 TO 3 WORKING DAYS TO SHIP THIS ITEM. ORDERS OUTSIDE THE UK: TAXES AND DUTIES WILL BE PAID BY THE CUSTOMER UPON THE DELIVERY OF THE ORDER.",
    colors: [
      { id: "silver", name: "Silver", hex: "#E5E5E5" },
      { id: "gold", name: "Gold", hex: "#D4AF37" }
    ],
    sizes: ["S", "M", "L"]
  },
  {
    slug: "bracelets-shining-4",
    name: "BRACELETS SHINING IV",
    category: "BRACELETS",
    price: "50.000.000 VNĐ",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602752275313-477eaabc497c?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80&auto=format&fit=crop"
    ],
    tag: null,
    description: [
      "Sustainable, breathable, and comfortable.",
      "Signature aesthetic with a stealthy, refined edge.",
      "Star motifs and branding that shine in low-light conditions.",
      "Enhanced structure with a sleek, technical finish.",
      "True to size. We recommend your standard size for the perfect fit."
    ],
    spec: "SAME IS 6'3, WEARING SIZE L JERSEY, CHYNA IS 5'6, WEARING SIZE M JERSEY. PLEASE NOTE: IT WILL TAKE FROM 1 TO 3 WORKING DAYS TO SHIP THIS ITEM. ORDERS OUTSIDE THE UK: TAXES AND DUTIES WILL BE PAID BY THE CUSTOMER UPON THE DELIVERY OF THE ORDER.",
    colors: [
      { id: "silver", name: "Silver", hex: "#E5E5E5" },
      { id: "gold", name: "Gold", hex: "#D4AF37" }
    ],
    sizes: ["S", "M", "L"]
  },
  {
    slug: "bracelets-shining-5",
    name: "BRACELETS SHINING V",
    category: "BRACELETS",
    price: "50.000.000 VNĐ",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602752275313-477eaabc497c?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80&auto=format&fit=crop"
    ],
    tag: null,
    description: [
      "Sustainable, breathable, and comfortable.",
      "Signature aesthetic with a stealthy, refined edge.",
      "Star motifs and branding that shine in low-light conditions.",
      "Enhanced structure with a sleek, technical finish.",
      "True to size. We recommend your standard size for the perfect fit."
    ],
    spec: "SAME IS 6'3, WEARING SIZE L JERSEY, CHYNA IS 5'6, WEARING SIZE M JERSEY. PLEASE NOTE: IT WILL TAKE FROM 1 TO 3 WORKING DAYS TO SHIP THIS ITEM. ORDERS OUTSIDE THE UK: TAXES AND DUTIES WILL BE PAID BY THE CUSTOMER UPON THE DELIVERY OF THE ORDER.",
    colors: [
      { id: "silver", name: "Silver", hex: "#E5E5E5" },
      { id: "gold", name: "Gold", hex: "#D4AF37" }
    ],
    sizes: ["S", "M", "L"]
  },
  {
    slug: "bracelets-shining-6",
    name: "BRACELETS SHINING VI",
    category: "BRACELETS",
    price: "50.000.000 VNĐ",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602752275313-477eaabc497c?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80&auto=format&fit=crop"
    ],
    tag: null,
    description: [
      "Sustainable, breathable, and comfortable.",
      "Signature aesthetic with a stealthy, refined edge.",
      "Star motifs and branding that shine in low-light conditions.",
      "Enhanced structure with a sleek, technical finish.",
      "True to size. We recommend your standard size for the perfect fit."
    ],
    spec: "SAME IS 6'3, WEARING SIZE L JERSEY, CHYNA IS 5'6, WEARING SIZE M JERSEY. PLEASE NOTE: IT WILL TAKE FROM 1 TO 3 WORKING DAYS TO SHIP THIS ITEM. ORDERS OUTSIDE THE UK: TAXES AND DUTIES WILL BE PAID BY THE CUSTOMER UPON THE DELIVERY OF THE ORDER.",
    colors: [
      { id: "silver", name: "Silver", hex: "#E5E5E5" },
      { id: "gold", name: "Gold", hex: "#D4AF37" }
    ],
    sizes: ["S", "M", "L"]
  }
];
