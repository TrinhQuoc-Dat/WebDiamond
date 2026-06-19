"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Product } from "@/data/products";

interface ProductOrderSelectorProps {
  product: Product;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  isAdded: boolean;
  onAddToBag: () => void;
}

export default function ProductOrderSelector({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  isAdded,
  onAddToBag,
}: ProductOrderSelectorProps) {
  return (
    <div className="lg:col-span-3 flex flex-col gap-8 lg:pl-4">
      {/* Colour Select */}
      <div className="flex flex-row items-center gap-4">
        <span className="text-[20px] font-black italic uppercase tracking-wider text-white">
          Colour:
        </span>
        <div className="flex items-center gap-3">
          {product.colors.map((color) => {
            const isSelected = selectedColor === color.id;
            const fillHex = color.id === "gold" ? "#D4AF37" : "#E5E5E5";

            return (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color.id)}
                className={`p-2 rounded-full border transition-all duration-300 flex items-center justify-center ${
                  isSelected ? "border-white bg-white/5 scale-110" : "border-white/10 hover:border-white/30"
                }`}
                title={color.name}
              >
                {/* Spider logo emblem in tiny size */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 100 100"
                  className="transition-colors duration-300"
                  style={{ color: fillHex }}
                  fill="currentColor"
                >
                  <circle cx="50" cy="40" r="12" />
                  <circle cx="50" cy="58" r="8" />
                  <path d="M40 35 C30 30, 20 40, 22 55" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M38 42 C24 40, 16 55, 18 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M39 50 C26 53, 20 70, 24 82" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M42 58 C32 66, 28 82, 34 90" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M60 35 C70 30, 80 40, 78 55" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M62 42 C76 40, 84 55, 82 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M61 50 C74 53, 80 70, 76 82" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M58 58 C68 66, 72 82, 66 90" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
                </svg>
              </button>
            );
          })}
        </div>
      </div>

      {/* Size Select */}
      <div className="flex flex-col gap-3">
        <span className="text-[20px] font-black italic uppercase tracking-wider text-white">
          Size:
        </span>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-9 h-9 text-xs font-black rounded-sm border uppercase transition-all duration-200 ${
                  isSelected
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white border-white/20 hover:border-white/40"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>

        {/* Size Guide Link */}
        <Link
          href="#"
          className="text-[16px] font-black italic uppercase text-white hover:text-white/80 transition-colors duration-200 underline mt-1"
        >
          Size Guide
        </Link>
      </div>

      {/* Price Tag */}
      <div className="flex flex-col gap-1 mt-4">
        <span
          className="text-[28px] md:text-[32px] font-black italic tracking-wider text-white"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {product.price}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 mt-2">
        <motion.button
          onClick={onAddToBag}
          whileTap={{ scale: 0.96 }}
          className="w-full py-4 text-center text-[28px] tracking-[0.05em] text-black bg-white uppercase font-black italic select-none hover:bg-neutral-200 transition-colors cursor-pointer rounded-sm"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {isAdded ? "ADDED" : "ADD TO BAG"}
        </motion.button>
      </div>

      {/* BACK BUTTON */}
      <div className="mt-8 flex justify-end">
        <Link
          href="/shop"
          className="text-[14px] md:text-[16px] tracking-[0.15em] font-black uppercase text-white/60 hover:text-white transition-colors duration-200 block border-b border-transparent hover:border-white/40 pb-1"
        >
          BACK
        </Link>
      </div>
    </div>
  );
}
