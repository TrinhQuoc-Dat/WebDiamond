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
    <div className="lg:col-span-3 flex flex-col gap-8 lg:pl-4 order-2 lg:order-none w-full">
      {/* Mobile-only info block */}
      <div className="lg:hidden flex flex-col gap-3 mb-2">
        <Link
          href="/shop"
          className="text-xs font-black italic uppercase text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-1 self-start"
        >
          <span>&lsaquo;</span> BACK
        </Link>
        <h1
          className="text-[28px] sm:text-[32px] font-black uppercase leading-none tracking-[0.1em] text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {product.name}
        </h1>
        <span
          className="text-[24px] sm:text-[28px] font-black italic tracking-wider text-white"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {product.price.replace(" VNĐ", " VND")}
        </span>
      </div>
      {/* Colour Select */}
      <div className="flex flex-row items-center gap-4">
        <span className="text-[20px] font-black italic uppercase tracking-wider text-white">
          Colour:
        </span>
        <div className="flex items-center gap-3">
          {product.colors.map((color) => {
            const isSelected = selectedColor === color.id;

            return (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color.id)}
                className={`p-1 rounded-full border transition-all duration-300 flex items-center justify-center overflow-hidden ${
                  isSelected ? "border-white bg-white/5 scale-110" : "border-white/10 hover:border-white/30"
                }`}
                title={color.name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={color.id === "gold" ? "/yellow.jpeg" : "/gray.jpeg"}
                  alt={color.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Size Select */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between w-full">
          <span className="text-[20px] font-black italic uppercase tracking-wider text-white">
            Size:
          </span>
          {/* Size Guide Link */}
          <Link
            href="#"
            className="text-sm font-black italic uppercase text-white hover:text-white/80 transition-colors duration-200 underline"
          >
            Size Guide
          </Link>
        </div>
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
      </div>

      {/* Price Tag - Desktop only */}
      <div className="hidden lg:flex flex-col gap-1 mt-4">
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

      {/* BACK BUTTON - Desktop only */}
      <div className="mt-8 flex justify-end hidden lg:flex">
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
