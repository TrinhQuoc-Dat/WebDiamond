"use client";

import { motion } from "framer-motion";
import { Product } from "@/data/products";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="lg:col-span-4 flex flex-col gap-6">
      <motion.h1
        className="text-[36px] md:text-[44px] font-black uppercase leading-tight tracking-[0.1em]"
        style={{ fontFamily: "var(--font-display)" }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {product.name}
      </motion.h1>

      {/* Description Bullet Points */}
      <ul className="flex flex-col gap-3 text-xs md:text-sm text-white/80 font-light list-disc pl-4 tracking-wider leading-relaxed">
        {product.description.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>

      {/* Micro Disclaimer Text */}
      <p className="text-[9px] text-white/40 leading-relaxed uppercase tracking-[0.12em] border-t border-white/10 pt-4 mt-2">
        {product.spec}
      </p>

      {/* QR Scan Section */}
      <div className="flex flex-col gap-4 mt-4">
        <span className="text-[11px] tracking-[0.3em] font-extrabold uppercase text-white/50">
          SCAN FOR ADVISE
        </span>

        {/* SVG QR Code (directly on background, no white box) */}
        <div className="w-[120px] h-[120px] flex items-center justify-start text-white">
          <svg
            width="110"
            height="110"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current"
          >
            {/* Positioning Anchor Top-Left */}
            <rect x="0" y="0" width="22" height="22" stroke="currentColor" strokeWidth="4" rx="2" />
            <rect x="6" y="6" width="10" height="10" fill="currentColor" />

            {/* Positioning Anchor Top-Right */}
            <rect x="78" y="0" width="22" height="22" stroke="currentColor" strokeWidth="4" rx="2" />
            <rect x="84" y="6" width="10" height="10" fill="currentColor" />

            {/* Positioning Anchor Bottom-Left */}
            <rect x="0" y="78" width="22" height="22" stroke="currentColor" strokeWidth="4" rx="2" />
            <rect x="6" y="84" width="10" height="10" fill="currentColor" />

            {/* QR Matrix Dots */}
            <rect x="32" y="0" width="6" height="6" fill="currentColor" />
            <rect x="44" y="6" width="6" height="6" fill="currentColor" />
            <rect x="56" y="0" width="6" height="6" fill="currentColor" />
            <rect x="32" y="16" width="12" height="6" fill="currentColor" />
            <rect x="56" y="20" width="6" height="6" fill="currentColor" />
            <rect x="0" y="32" width="6" height="12" fill="currentColor" />
            <rect x="16" y="38" width="12" height="6" fill="currentColor" />
            <rect x="32" y="32" width="6" height="6" fill="currentColor" />
            <rect x="44" y="38" width="12" height="6" fill="currentColor" />
            <rect x="68" y="32" width="6" height="12" fill="currentColor" />
            <rect x="84" y="38" width="10" height="6" fill="currentColor" />
            <rect x="32" y="52" width="6" height="12" fill="currentColor" />
            <rect x="48" y="56" width="10" height="6" fill="currentColor" />
            <rect x="68" y="52" width="6" height="6" fill="currentColor" />
            <rect x="80" y="58" width="6" height="6" fill="currentColor" />
            <rect x="32" y="68" width="12" height="6" fill="currentColor" />
            <rect x="56" y="74" width="6" height="12" fill="currentColor" />
            <rect x="68" y="68" width="6" height="6" fill="currentColor" />
            <rect x="80" y="74" width="12" height="6" fill="currentColor" />
            <rect x="32" y="84" width="6" height="6" fill="currentColor" />
            <rect x="44" y="80" width="6" height="10" fill="currentColor" />
            <rect x="68" y="84" width="12" height="6" fill="currentColor" />
            <rect x="84" y="84" width="6" height="6" fill="currentColor" />

            {/* Center Instagram Icon */}
            <circle cx="50" cy="50" r="11" fill="black" />
            <circle cx="50" cy="50" r="8" fill="currentColor" />
            <circle cx="50" cy="50" r="5" fill="black" />
            <circle cx="50" cy="50" r="3" fill="currentColor" />
            <circle cx="54.5" cy="45.5" r="1" fill="black" />
          </svg>
        </div>
      </div>
    </div>
  );
}
