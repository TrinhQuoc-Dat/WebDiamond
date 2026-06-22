"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Product } from "@/data/products";

interface ProductImageGalleryProps {
  product: Product;
  activeImageIndex: number;
  setActiveImageIndex: (index: number) => void;
  onPrevImage: () => void;
  onNextImage: () => void;
}

export default function ProductImageGallery({
  product,
  activeImageIndex,
  setActiveImageIndex,
  onPrevImage,
  onNextImage,
}: ProductImageGalleryProps) {
  return (
    <div className="lg:col-span-5 flex flex-col items-center gap-6 lg:gap-12 relative order-1 lg:order-none w-full">
      <div className="w-full flex flex-col items-center lg:-translate-y-[48px]">
      {/* Main Image with side arrows on mobile */}
      <div className="flex items-center justify-center gap-4 w-full relative">
        {/* Left Arrow for mobile/tablet */}
        <button
          onClick={onPrevImage}
          className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer lg:hidden"
          aria-label="Previous image"
        >
          <span className="text-2xl leading-none">←</span>
        </button>

        {/* Mannequin / Main Image Container */}
        <div className="relative w-full aspect-[4/5] max-w-[320px] lg:max-w-[380px] bg-transparent overflow-hidden flex items-center justify-center">
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

        </div>

        {/* Right Arrow for mobile/tablet */}
        <button
          onClick={onNextImage}
          className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer lg:hidden"
          aria-label="Next image"
        >
          <span className="text-2xl leading-none">→</span>
        </button>
      </div>

      {/* Dots Indicator on Mobile */}
      <div className="flex items-center justify-center gap-2 lg:hidden">
        {product.images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImageIndex(idx)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              idx === activeImageIndex ? "bg-white w-3" : "bg-white/30"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Thumbnails Row - Desktop only */}
      <div className="hidden lg:flex items-center gap-6 w-full max-w-[440px] justify-center mt-4">
        {/* Left Arrow */}
        <button
          onClick={onPrevImage}
          className="w-10 h-10 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Previous image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 6l-6 6 6 6z"/>
          </svg>
        </button>

        {/* Thumbnails Row */}
        <div className="flex items-center justify-center flex-1 relative h-20 gap-4">
          {product.images.map((img, idx) => {
            const isActive = idx === activeImageIndex;
            // Calculate arch rotation
            const mid = (product.images.length - 1) / 2;
            const offset = idx - mid;
            const rotation = offset * 15; // 15 degrees per step
            const yOffset = Math.abs(offset) * 8; // push down edges

            return (
              <motion.div
                key={idx}
                className="relative cursor-pointer select-none"
                style={{ rotate: rotation, y: yOffset }}
                whileHover={{ scale: 1.15, zIndex: 10, y: yOffset - 5 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                onClick={() => setActiveImageIndex(idx)}
              >
                <div
                  className={`w-10 h-14 relative bg-transparent overflow-hidden rounded-[2px] transition-all duration-300 ${
                    isActive
                      ? "scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt="thumbnail"
                    fill
                    className="object-cover object-center"
                    sizes="40px"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={onNextImage}
          className="w-10 h-10 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Next image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 6l6 6-6 6z"/>
          </svg>
        </button>
      </div>
      </div>
    </div>
  );
}
