"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Product } from "@/data/products";
import ShopProductCard from "./ShopProductCard";

interface ShopProductSectionProps {
  title: string;
  products: Product[];
  viewportOnce?: boolean;
}

export default function ShopProductSection({
  title,
  products,
  viewportOnce = false,
}: ShopProductSectionProps) {
  const headerAnimation = viewportOnce
    ? {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true },
      }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      };

  return (
    <section className="w-full flex flex-col items-center mt-12 mb-24">
      {/* Category Title */}
      <motion.h2
        className="text-xl md:text-[24px] font-black uppercase tracking-[0.3em] mb-12 text-center text-white"
        style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.2em" }}
        {...headerAnimation}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {title}
      </motion.h2>

      {/* Product Grid */}
      <div 
        className="grid grid-cols-2 md:grid-cols-3 gap-y-8 md:gap-y-12 gap-x-6 md:gap-x-8 w-full max-w-[950px]"
        style={{ paddingLeft: "16px", paddingRight: "16px" }}
      >
        {products.map((product, idx) => (
          <ShopProductCard
            key={product.slug}
            product={product}
            index={idx}
            viewportOnce={viewportOnce}
            priority={!viewportOnce && idx < 3}
          />
        ))}
      </div>

      {/* Explicit spacer to push SEE MORE down */}
      <div className="h-5 w-full" />

      {/* SEE MORE */}
      <Link
        href="#"
        className="text-xs md:text-sm tracking-[0.2em] font-black italic uppercase text-white/60 hover:text-white mt-5 transition-colors duration-200 block border-b border-transparent hover:border-white/40 pb-1"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        SEE MORE
      </Link>
    </section>
  );
}
