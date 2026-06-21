"use client";

import { motion } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import ShopProductSection from "@/components/ShopProductSection";
import { usePublicProducts } from "@/hooks/usePublicProducts";

interface CategoryPageProps {
  category: string; // "BRACELETS" | "NECKLACE" | etc.
  label: string;    // display label shown to user
}

export default function CategoryPage({ category, label }: CategoryPageProps) {
  const { products } = usePublicProducts();
  const items = products.filter((p) => p.category === category);

  return (
    <>
      <CustomCursor />
      <Header />

      <main className="w-full bg-black text-white min-h-screen" style={{ paddingTop: "120px", paddingBottom: "150px" }}>
        <ShopProductSection products={items} />
      </main>
    </>
  );
}
