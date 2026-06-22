"use client";

import { motion } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import ShopProductSection from "@/components/ShopProductSection";
import ScrollIndicator from "@/components/ScrollIndicator";
import { usePublicProducts } from "@/hooks/usePublicProducts";
import Footer from "./Footer";

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
      <main style={{margin:"0 6%"}}>
        <div className="w-full bg-black text-white min-h-screen" style={{ paddingTop: "120px", paddingBottom: "90px" }}>
          <ShopProductSection products={items} title={category} category={category} hideMoreButton={true} />
        </div>
      </main>
      <ScrollIndicator />
      <Footer />
    </>
  );
}
