"use client";

import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ShopProductSection from "@/components/ShopProductSection";
import { usePublicProducts } from "@/hooks/usePublicProducts";
import { motion } from "framer-motion";

export default function ShopPage() {
  const { products } = usePublicProducts();

  const necklaces = products.filter((p) => p.category === "NECKLACE");
  const bracelets = products.filter((p) => p.category === "BRACELETS");

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

          <ShopProductSection title="NECKLACE" products={necklaces} />
          
          <div className="h-20 w-full" />
          
          <ShopProductSection title="BRACELETS" products={bracelets} viewportOnce />
        </div>
      </main>

      <Footer />
    </>
  );
}
