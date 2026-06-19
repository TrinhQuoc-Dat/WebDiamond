"use client";

import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Product } from "@/data/products";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.id || "silver");
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0] || "M");
  const [isAdded, setIsAdded] = useState(false);

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const handleAddToBag = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <>
      <CustomCursor />
      <Header />

      {/* Main container with starry/galaxy space background */}
      <main 
        className="w-full bg-black text-white min-h-screen relative overflow-hidden"
        style={{
          paddingTop: "95px",
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 1px, transparent 1px),
            radial-gradient(circle at 75% 40%, rgba(255,255,255,0.06) 1px, transparent 1px),
            radial-gradient(circle at 50% 80%, rgba(255,255,255,0.05) 2px, transparent 2px),
            radial-gradient(circle at 10% 70%, rgba(255,255,255,0.07) 1px, transparent 1px),
            radial-gradient(circle at 85% 15%, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "600px 600px",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-20">
          
          {/* ─── 3-Column Product Core ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-24">
            
            {/* 1. Left Column: Specs & QR */}
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
                  SCAN FOR ADIVSE
                </span>
                
                {/* SVG QR Code (directly on background, no white box) */}
                <div className="w-[120px] h-[120px] flex items-center justify-start text-white">
                  <svg width="110" height="110" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current">
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

            {/* 2. Center Column: Large Display & Curved Thumbnails */}
            <div className="lg:col-span-5 flex flex-col items-center gap-12 relative">
              
              {/* Mannequin / Main Image Container */}
              <div className="relative w-full aspect-[4/5] max-w-[420px] bg-[#080808] border border-white/10 rounded-sm overflow-hidden shadow-2xl flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={product.images[activeImageIndex]}
                      alt={`${product.name} display`}
                      fill
                      priority
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Edge vignette */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/25" />
              </div>

              {/* Curved Thumbnail Arc Controls */}
              <div className="flex items-center gap-6 w-full max-w-[440px] justify-center mt-4">
                {/* Left Arrow */}
                <button
                  onClick={handlePrevImage}
                  className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white hover:scale-110 active:scale-95 transition-all duration-200"
                  aria-label="Previous image"
                >
                  <span className="text-xl leading-none">◀</span>
                </button>

                {/* Thumbnails Row in Arc Layout */}
                <div className="flex items-center justify-between flex-1 relative h-28 px-4">
                  {product.images.map((img, idx) => {
                    const isActive = idx === activeImageIndex;
                    
                    // Arc offsets: Center (idx 2) is at peak, sides drop lower and rotate
                    const distFromCenter = idx - 2; // -2, -1, 0, 1, 2
                    const rotate = distFromCenter * 6; // -12, -6, 0, 6, 12 deg
                    const translateY = Math.abs(distFromCenter) * 10; // 20px, 10px, 0px, 10px, 20px

                    return (
                      <motion.div
                        key={idx}
                        className="relative cursor-pointer select-none"
                        style={{
                          transform: `translateY(${translateY}px) rotate(${rotate}deg)`,
                        }}
                        whileHover={{ scale: 1.15, zIndex: 10, y: translateY - 5 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        onClick={() => setActiveImageIndex(idx)}
                      >
                        <div
                          className={`w-12 h-16 relative bg-neutral-900 border overflow-hidden rounded-[2px] transition-all duration-300 ${
                            isActive ? "border-white scale-110 shadow-lg shadow-white/10" : "border-white/10 opacity-60 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={img}
                            alt="thumbnail"
                            fill
                            className="object-cover object-center"
                            sizes="48px"
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Right Arrow */}
                <button
                  onClick={handleNextImage}
                  className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white hover:scale-110 active:scale-95 transition-all duration-200"
                  aria-label="Next image"
                >
                  <span className="text-xl leading-none">▶</span>
                </button>
              </div>

            </div>

            {/* 3. Right Column: Colors, Sizes, Price, Add to Bag */}
            <div className="lg:col-span-3 flex flex-col gap-8 lg:pl-4">
              
              {/* Colour Select */}
              <div className="flex flex-col gap-2">
                <span className="text-[20px] font-black italic uppercase tracking-wider text-white">
                  Colour:
                </span>
                <div className="flex items-center gap-4">
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
                  onClick={handleAddToBag}
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

          </div>

          {/* ─── 4-Grid Benefits Section ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 border-t border-white/10 pt-16 mb-16">
            
            {/* Item 1: Global Shipping */}
            <div className="flex flex-col gap-4">
              <div className="text-white/80">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <p className="text-xs md:text-sm text-white/60 leading-relaxed font-light tracking-wide max-w-md">
                We ship our jewelry globally. Your order will be processed within 2–3 business days. Delivery typically takes 7–15 business days.
              </p>
            </div>

            {/* Item 2: Reflection & Bespoke */}
            <div className="flex flex-col gap-4">
              <div className="text-white/80">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <p className="text-xs md:text-sm text-white/60 leading-relaxed font-light tracking-wide max-w-md">
                GODGIFT turn jewelry into a reflection of you. Whether it’s an engraved date, a custom initial, or a bespoke design, we specialize in bringing your vision to life.
              </p>
            </div>

            {/* Item 3: Secure Checkout */}
            <div className="flex flex-col gap-4">
              <div className="text-white/80">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <p className="text-xs md:text-sm text-white/60 leading-relaxed font-light tracking-wide max-w-md">
                All online payments are processed through secure, encrypted gateways. We do not store your credit card information on our servers.
              </p>
            </div>

            {/* Item 4: Dispatch Commitment */}
            <div className="flex flex-col gap-4">
              <div className="text-white/80">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <p className="text-xs md:text-sm text-white/60 leading-relaxed font-light tracking-wide max-w-md">
                GODGIFT respect your time as much as we value our craft. We are committed to ensuring your order is meticulously prepared and dispatched according to our promised schedule.
              </p>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
