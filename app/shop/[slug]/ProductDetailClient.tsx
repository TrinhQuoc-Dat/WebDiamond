"use client";

import { useState } from "react";
import Header from "@/components/Header";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import ProductInfo from "@/components/ProductInfo";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductOrderSelector from "@/components/ProductOrderSelector";
import ProductBenefits from "@/components/ProductBenefits";
import { Product } from "@/data/products";

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
            <ProductInfo product={product} />

            {/* 2. Center Column: Large Display & Curved Thumbnails */}
            <ProductImageGallery
              product={product}
              activeImageIndex={activeImageIndex}
              setActiveImageIndex={setActiveImageIndex}
              onPrevImage={handlePrevImage}
              onNextImage={handleNextImage}
            />

            {/* 3. Right Column: Colors, Sizes, Price, Add to Bag */}
            <ProductOrderSelector
              product={product}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              isAdded={isAdded}
              onAddToBag={handleAddToBag}
            />

          </div>

          {/* ─── 4-Grid Benefits Section ─── */}
          <ProductBenefits />

        </div>
      </main>

      <Footer />
    </>
  );
}
