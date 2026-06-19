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
    <div className="lg:col-span-5 flex flex-col items-center gap-12 relative order-1 lg:order-none">
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
          onClick={onPrevImage}
          className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Previous image"
        >
          <span className="text-xl leading-none">◀</span>
        </button>

        {/* Thumbnails Row */}
        <div className="flex items-center justify-between flex-1 relative h-20 px-4">
          {product.images.map((img, idx) => {
            const isActive = idx === activeImageIndex;

            return (
              <motion.div
                key={idx}
                className="relative cursor-pointer select-none"
                whileHover={{ scale: 1.15, zIndex: 10, y: -5 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                onClick={() => setActiveImageIndex(idx)}
              >
                <div
                  className={`w-12 h-16 relative bg-neutral-900 border overflow-hidden rounded-[2px] transition-all duration-300 ${
                    isActive
                      ? "border-white scale-110 shadow-lg shadow-white/10"
                      : "border-white/10 opacity-60 hover:opacity-100"
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
          onClick={onNextImage}
          className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Next image"
        >
          <span className="text-xl leading-none">▶</span>
        </button>
      </div>
    </div>
  );
}
