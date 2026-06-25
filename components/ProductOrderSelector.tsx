"use client";

import { Product } from "@/data/products";
import Link from "next/link";

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
    <div className="lg:col-span-3 flex flex-col gap-6 lg:pl-8 order-2 lg:order-none w-full relative h-full">
      {/* Explicit spacer to push text down on desktop */}
      <div className="hidden lg:block h-[120px] w-full shrink-0" />
      {/* Mobile-only info block */}
      <div className="lg:hidden flex flex-col gap-3 mb-2">
        <h1
          className="text-[26px] sm:text-[32px] font-black uppercase leading-none tracking-[0.1em] text-white"
          style={{ fontFamily: "var(--font-display)", lineHeight: "1.5em", padding: "0px 0px 0px 0px" }}
        >
          {product.name}
        </h1>
      </div>

      {/* Colour Select */}
      <div className="flex flex-row items-center gap-4 mt-8">
        <span className="text-[18px] font-normal italic tracking-wider text-white" style={{ fontFamily: "var(--font-sans)" }}>
          Colour:
        </span>
        <div className="flex items-center gap-4">
          {product.colors.map((color) => {
            const isSelected = selectedColor === color.id;
            const isNecklace = product.category === "NECKLACE";
            
            const idLower = (color.id || "").toLowerCase();
            const nameLower = (color.name || "").toLowerCase();
            const hexLower = (color.hex || "").toLowerCase();
            
            const isGold = 
              idLower.includes("gold") || 
              idLower.includes("yellow") || 
              idLower.includes("vang") || 
              idLower.includes("vàng") ||
              nameLower.includes("gold") || 
              nameLower.includes("yellow") || 
              nameLower.includes("vang") || 
              nameLower.includes("vàng") ||
              hexLower === "#d4af37";

            return (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color.id)}
                className={`transition-all duration-300 flex items-center justify-center cursor-pointer ${
                  isNecklace ? "" : "overflow-hidden"
                } ${
                  isSelected
                    ? isNecklace
                      ? "scale-110"
                      : "scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                    : "opacity-70 hover:opacity-100"
                }`}
                title={color.name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={isGold ? "/yellow.svg" : "/gray.svg"}
                  alt={color.name}
                  className="w-12 h-12 object-contain mix-blend-screen transition-all duration-300"
                  style={{
                    filter: isNecklace && isSelected
                      ? isGold
                        ? "drop-shadow(0 0 6px rgba(255, 200, 0, 0.6)) drop-shadow(0 0 15px rgba(255, 180, 0, 0.3))"
                        : "drop-shadow(0 0 6px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 15px rgba(255, 255, 255, 0.3))"
                      : undefined
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Size Select */}
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex items-center gap-4">
          <span className="text-[18px] font-normal italic tracking-wider text-white" style={{ fontFamily: "var(--font-sans)" }}>
            Size:
          </span>
          <div className="flex items-center gap-2">
            {product.sizes && product.sizes.map((size) => {
              const isSizeSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-8 flex items-center justify-center text-[14px] font-normal tracking-wider border transition-all duration-300 cursor-pointer ${
                    isSizeSelected
                      ? "bg-white text-black border-white font-semibold"
                      : "text-white/60 border-white/20 hover:text-white hover:border-white/50"
                  }`}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Size Guide Link */}
        <Link
            href={`/size-guide/${product.category.toLocaleLowerCase()}`}
            className="text-[18px] font-normal italic text-white hover:text-white/80 transition-colors duration-200 mt-2"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Size Guide
        </Link>
      </div>

      {/* Price Tag */}
      <div className="flex flex-col gap-1 mt-8">
        <span
          className="text-[22px] md:text-[26px] lg:text-[20px] font-black tracking-widest text-white whitespace-nowrap"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {product.price}
        </span>
      </div>

      {/* Add to Bag Button */}
      <div className="flex flex-col gap-4 mt-6">
        <button
          onClick={onAddToBag}
          className="w-full py-4 text-center text-[16px] tracking-[0.2em] font-black text-black bg-white hover:bg-gray-200 uppercase transition-all duration-300 cursor-pointer rounded-xl shadow-lg hover:shadow-white/5"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {isAdded ? "ADDED TO BAG" : "ADD TO BAG"}
        </button>
      </div>

      {/* BACK BUTTON */}
      <div className="absolute bottom-0 right-0 lg:flex justify-end hidden">
        <Link
          href="/shop"
          className="text-[18px] md:text-[22px] tracking-[0.1em] font-black uppercase text-white hover:text-white/70 transition-colors duration-200 block"
          style={{ fontFamily: "var(--font-display)" }}
        >
          BACK
        </Link>
      </div>
      
      {/* Mobile BACK button */}
      <div className="mt-8 flex justify-end lg:hidden">
        <Link
          href="/shop"
          className="text-[18px] md:text-[22px] tracking-[0.1em] font-black uppercase text-white hover:text-white/70 transition-colors duration-200 block"
          style={{ fontFamily: "var(--font-display)" }}
        >
          BACK
        </Link>
      </div>
    </div> 
  );
}
