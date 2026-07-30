"use client";

import ProductBenefits from "@/components/ProductBenefits";

/**
 * How It Works — dùng chung đúng block với trang chi tiết sản phẩm (/shop/[slug]).
 * Layout/wrapper giữ nguyên như ProductDetailClient để hai trang hiển thị giống hệt nhau.
 */
export default function HowItWorks() {
  return (
    <section className="w-full bg-black text-white">
      <div className="w-full flex flex-col items-center" style={{ paddingLeft: "2%", paddingRight: "2%" }}>
        <div className="w-full max-w-[1440px] px-4 md:px-8">
          <ProductBenefits />
        </div>
      </div>
    </section>
  );
}
