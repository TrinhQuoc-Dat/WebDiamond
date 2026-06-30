"use client";

import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ShopProductSection from "@/components/ShopProductSection";
import ScrollIndicator from "@/components/ScrollIndicator";
import { usePublicProducts } from "@/hooks/usePublicProducts";
import { motion } from "framer-motion";

export default function ShopPage() {
  const { products } = usePublicProducts();

  const necklaces = products.filter((p) => p.category === "NECKLACE").slice(0, 6);
  const bracelets = products.filter((p) => p.category === "BRACELETS").slice(0, 6);
  const rings = products.filter((p) => p.category === "RINGS").slice(0, 6);
  const earrings = products.filter((p) => p.category === "EARINGS").slice(0, 6);

  return (
    <>
      <CustomCursor />
      <Header />

      <main className="w-full bg-black text-white pb-12 min-h-screen" style={{ paddingTop: "95px" }}>
        <div className="w-full flex flex-col items-center" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
          <motion.h1
            className="text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase tracking-[0.2em] text-center mb-2"
            style={{ fontFamily: "var(--font-display)", marginRight: "-0.2em" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            SHOP ALL
          </motion.h1>

          <ShopProductSection title="NECKLACE" category="NECKLACE" products={necklaces} />
          
          <div className="h-20 w-full" />
          
          <ShopProductSection title="BRACELETS" category="BRACELETS" products={bracelets} viewportOnce />

          <div className="h-20 w-full" />

          <ShopProductSection title="RINGS" category="RINGS" products={rings} viewportOnce />

          <div className="h-20 w-full" />

          <ShopProductSection title="EARINGS" category="EARINGS" products={earrings} viewportOnce />
        </div>
      </main>

      <ScrollIndicator />
      <Footer />
    </>
  );
}
