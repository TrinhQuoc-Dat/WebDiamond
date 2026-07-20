"use client";

import { motion } from "framer-motion";
import { Product } from "@/data/products";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="lg:col-span-4 flex flex-col gap-6 order-3 lg:order-none">
      {/* Explicit spacer to push text down on desktop */}
      <div className="hidden lg:block h-[120px] w-full shrink-0" />
      <motion.h1
        className="hidden lg:block text-[20px] md:text-[24px] font-black uppercase leading-tight tracking-[0.1em]"
        style={{ fontFamily: "var(--font-display)" }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {product.name}
      </motion.h1>

      <ul className="flex flex-col gap-2 list-none pl-0 ml-0" style={{ fontFamily: "var(--font-display)" }}>
        {product.description.map((point, index) => (
          <li key={index} className="flex items-start gap-2 text-[9px] md:text-[10px] text-white/90 font-normal uppercase tracking-widest leading-relaxed">
            <span className="shrink-0 text-white/70 mt-[1px]">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {/* Micro Disclaimer Text */}
      <p className="text-[9px] md:text-[10px] leading-relaxed uppercase tracking-[0.15em] pt-4 mt-2" style={{ fontFamily: "var(--font-display)" }}>
        {product.spec}
      </p>
    </div>
  );
}
