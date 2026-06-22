"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import ProductInfo from "@/components/ProductInfo";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductOrderSelector from "@/components/ProductOrderSelector";
import ProductBenefits from "@/components/ProductBenefits";
import { Product } from "@/data/products";

interface Props {
  slug: string;
  initialProduct: Product | null;
}

export default function ProductDetailClient({ slug, initialProduct }: Props) {
  const [product, setProduct] = useState<any | null>(initialProduct);
  const [loading, setLoading] = useState(true);

  // Đồng bộ sản phẩm từ LocalStorage phía client
  useEffect(() => {
    try {
      const stored = localStorage.getItem("wd_products");
      if (stored) {
        const list = JSON.parse(stored);
        const resolved = list.find((p: any) => p.slug === slug);
        if (resolved) {
          setProduct(resolved);
        } else if (!initialProduct) {
          setProduct(null);
        }
      }
    } catch (e) {
      console.error("Lỗi đồng bộ sản phẩm chi tiết", e);
    } finally {
      setLoading(false);
    }
  }, [slug, initialProduct]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("silver");
  const [selectedSize, setSelectedSize] = useState("M");
  const [isAdded, setIsAdded] = useState(false);

  // Cập nhật thuộc tính màu/size khi sản phẩm load xong
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0]?.id || "silver");
      setSelectedSize(product.sizes?.[1] || product.sizes?.[0] || "M");
    }
  }, [product]);

  const handlePrevImage = () => {
    if (!product) return;
    setActiveImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (!product) return;
    setActiveImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const handleAddToBag = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-gray-500 flex items-center justify-center font-mono text-xs tracking-widest uppercase">
        Đang đồng bộ sản phẩm...
      </div>
    );
  }

  if (!product || product.hidden) {
    return (
      <>
        <CustomCursor />
        <Header />
        <main className="w-full bg-black text-white min-h-screen flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-xl font-bold tracking-[0.2em] uppercase text-[#D4AF37] mb-2">
            Sản phẩm không khả dụng
          </h1>
          <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
            Sản phẩm này không tồn tại hoặc đã bị ẩn bởi quản trị viên.
          </p>
          <a
            href="/shop"
            className="mt-6 px-6 py-2.5 bg-white text-black font-semibold text-xs rounded uppercase tracking-wider hover:bg-gray-200 transition-colors"
          >
            Quay lại cửa hàng
          </a>
        </main>
        <Footer />
      </>
    );
  }


  return (
    <>
      <CustomCursor />
      <Header />

      {/* Main container with starry/galaxy space background */}
      <main
        className="w-full bg-black text-white min-h-screen relative overflow-hidden"
        style={{
          paddingTop: "100px",
          backgroundImage: "url('/product-detail-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundAttachment: "fixed",
          paddingBottom: "100px",
        }}
      >
        <div className="w-full flex flex-col items-center pb-40 md:pb-[150px]" style={{ paddingLeft: "5%", paddingRight: "5%" }}>

          {/* ─── 3-Column Product Core ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-24 w-full max-w-[1440px] px-4 md:px-8">

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
          <div className="w-full max-w-[1440px] px-4 md:px-8">
            <ProductBenefits />
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
