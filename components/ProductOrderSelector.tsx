"use client";

import { Product } from "@/data/products";
import { formatThousands } from "@/utils/formatPrice";
import Link from "next/link";
import { useState } from "react";
import SizeGuideDrawer from "./size-guides/SizeGuideDrawer";

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

  const [openGuide, setOpenGuide] = useState(false);
  const [selectedStone, setSelectedStone] = useState<"CZ" | "MOIS">("CZ");
  return (
    <div className="lg:col-span-4 flex flex-col gap-0 lg:pl-2 order-3 lg:order-none w-full relative h-full">
      {/* Explicit spacer to push text down on desktop */}
      <div className="hidden lg:block h-[50px] w-full shrink-0" />
      <div className="flex items-center gap-4">
        <span
          className="text-[20px] md:text-[24px] font-bold text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Stone
        </span>

        <div className="flex gap-2">
          {["CZ", "MOIS"].map((stone) => (
            <button
              key={stone}
              onClick={() => setSelectedStone(stone as "CZ" | "MOIS")}
              className={`px-4 py-2 border transition-all duration-300 font-bold ${selectedStone === stone
                ? "bg-white text-black border-white"
                : "bg-transparent text-white border-zinc-600 hover:border-white"
                }`}
            >
              {stone}
            </button>
          ))}
        </div>
      </div>

      {/* Colour Select */}
      <div className="flex flex-row items-center gap-4">
        <span className="text-[20px] md:text-[24px] font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
          Colour:
        </span>
        <div className="flex items-center gap-4">
          {(product.colors || []).map((color) => {
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
                className={`transition-all duration-300 flex items-center justify-center cursor-pointer ${isNecklace ? "" : "overflow-hidden"
                  } ${isSelected
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
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <span className="text-[20px] md:text-[24px] font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            Size:
          </span>
          <div className="flex items-center gap-2">
            {(product.sizes || []).map((size) => {
              const isSizeSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-8 flex items-center justify-center text-[14px] font-normal tracking-wider border transition-all duration-300 cursor-pointer ${isSizeSelected
                    ? "bg-white text-black border-white font-semibold"
                    : "text-white/60 border-white/20 hover:text-white hover:border-white/50"
                    }`}
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Size Guide — standalone để hưởng gap-8 từ parent */}
      <div>
        <button
          onClick={() => setOpenGuide(true)}
          className="text-[20px] md:text-[24px] font-bold text-white hover:text-white/80"
        >
          Size Guide
        </button>

        <SizeGuideDrawer
          open={openGuide}
          onClose={() => setOpenGuide(false)}
          type={product.category.toLowerCase()}
        />
      </div>

      {/* Price Tag */}
      <div className="flex flex-col gap-1 mt-20">
        <span
          className="text-[20px] md:text-[24px] lg:text-[28px] font-black tracking-widest text-white whitespace-nowrap"
          style={{ fontFamily: "var(--font-display)", margin: "20px 0" }}
        >
          {formatThousands(product.price)}
        </span>
      </div>

      {/* Add to Bag Button — links to Instagram DM */}
      <div className="hidden lg:flex flex-col gap-4">
        <a
          href="https://www.instagram.com/godg1ft.jrl/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 flex items-center justify-start gap-3 text-[39px] lg:text-[45px] tracking-[0.05em] font-bold text-white hover:text-white/70 uppercase transition-all duration-300"
          style={{ fontFamily: "var(--font-display)", textDecoration: "none", background: "none" }}
        >
          ADD TO BAG
        </a>
      </div>

      {/* BACK BUTTON */}
      <div className="absolute bottom-[10%] right-[20%] lg:flex justify-end hidden">
        <Link
          href="/shop"
          className="text-[32px] tracking-[0.1em] font-black uppercase text-white hover:text-white/70 transition-colors duration-200 block"
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
