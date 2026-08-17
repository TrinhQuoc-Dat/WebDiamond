"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Product } from "@/data/products";

interface ProductImageGalleryProps {
  product: Product;
  galleryImages: string[];
  activeImageIndex: number;
  setActiveImageIndex: (index: number) => void;
  onPrevImage: () => void;
  onNextImage: () => void;
}

export default function ProductImageGallery({
  product,
  galleryImages,
  activeImageIndex,
  setActiveImageIndex,
  onPrevImage,
  onNextImage,
}: ProductImageGalleryProps) {
  // State quản lý tọa độ con trỏ và trạng thái hover để zoom
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50, isHovered: false });

  // Tính toán tọa độ chuột theo phần trăm (%) trong khung ảnh
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y, isHovered: true });
  };

  const handleMouseLeave = () => {
    setZoomPos((prev) => ({ ...prev, isHovered: false }));
  };

  return (
    <div className="lg:col-span-5 flex flex-col items-center gap-6 lg:gap-12 relative order-1 lg:order-none w-full">
      <div
        className="w-full flex flex-col items-center lg:-translate-y-[48px]"
        style={{ paddingLeft: "5%", paddingRight: "5%", gap: "1rem" }}
      >
        {/* Main Image with side arrows on mobile */}
        <div className="flex items-center justify-center gap-4 w-full relative">
          {/* Mannequin / Main Image Container — Thêm zoom khi Hover */}
          <div
            className="relative w-full aspect-square max-h-[500px] bg-transparent overflow-hidden flex items-center justify-center cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {galleryImages.map((img, idx) => (
              <div
                key={img}
                className="absolute inset-0 w-full h-full transition-opacity duration-300 ease-in-out"
                style={{
                  opacity: idx === activeImageIndex ? 1 : 0,
                  pointerEvents: idx === activeImageIndex ? "auto" : "none",
                }}
              >
                {/* Khung bao bọc hiệu ứng Zoom */}
                <div
                  className="w-full h-full relative transition-transform duration-150 ease-out pointer-events-none"
                  style={{
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transform: zoomPos.isHovered ? "scale(2.2)" : "scale(1)",
                  }}
                >
                  <Image
                    src={img}
                    alt={`${product.name} display ${idx + 1}`}
                    fill
                    priority={idx === 0}
                    loading={idx === 0 ? "eager" : "eager"}
                    className="object-contain object-center"
                    sizes="(max-width: 768px) 90vw, 480px"
                  />
                </div>
              </div>
            ))}
          </div>        
        </div>

        {/* Dots Indicator on Mobile */}
        <div className="flex lg:hidden items-center justify-center w-full mt-5 px-2">
          {/* Left Arrow */}
          <button
            onClick={onPrevImage}
            className="w-8 h-8 flex items-center justify-center text-white shrink-0"
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15 6l-6 6 6 6z" />
            </svg>
          </button>

          {/* Thumbnails */}
          <div className="flex items-center justify-center flex-1 gap-3 overflow-hidden px-2">
            {galleryImages.map((img, idx) => {
              const isActive = idx === activeImageIndex;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`
            relative
            transition-all
            duration-300
            ${isActive
                      ? "w-11 h-16 scale-110 opacity-100"
                      : "w-8 h-12 opacity-60"
                    }
          `}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover rounded-sm"
                    sizes="48px"
                  />
                </button>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={onNextImage}
            className="w-8 h-8 flex items-center justify-center text-white shrink-0"
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 6l6 6-6 6z" />
            </svg>
          </button>
        </div>

        {/* Thumbnails Row - Desktop only */}
        <div className="hidden lg:flex items-center gap-6 w-full max-w-[440px] justify-center mt-10">
          {/* Left Arrow */}
          <button
            onClick={onPrevImage}
            className="w-10 h-10 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all duration-200"
            aria-label="Previous image"
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15 6l-6 6 6 6z" />
            </svg>
          </button>

          {/* Thumbnails Row */}
          <div className="flex items-center justify-center flex-1 relative h-20 gap-4">
            {galleryImages.map((img, idx) => {
              const isActive = idx === activeImageIndex;

              return (
                <motion.div
                  key={idx}
                  className="relative cursor-pointer select-none"
                  whileHover={{ scale: 1.15, zIndex: 10 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <div
                    className={`w-10 h-14 relative bg-transparent overflow-hidden rounded-[2px] transition-all duration-300 ${isActive
                        ? "scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                        : "opacity-60 hover:opacity-100"
                      }`}
                  >
                    <Image
                      src={img}
                      alt={idx === 0 ? "thumbnail" : `detail ${idx}`}
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
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 6l6 6-6 6z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}