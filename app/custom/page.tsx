"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import CustomShowcase from "@/components/custom/CustomShowcase";
import HowItWorks from "@/components/custom/HowItWorks";
import CustomForm from "@/components/custom/CustomForm";
import ScrollIndicator from "@/components/ScrollIndicator";
import { Slide, DEFAULT_SHOWCASE, getCustomPage } from "@/utils/customPage";

export default function CustomPage() {
  // Khởi tạo bằng data mặc định để không nháy, rồi cập nhật từ API khi tải xong.
  const [slides, setSlides] = useState<Slide[]>(DEFAULT_SHOWCASE);

  useEffect(() => {
    getCustomPage().then((content) => setSlides(content.showcase));
  }, []);

  return (
    <>

      {/* ── Showcase Section (scroll-driven slider) ── */}
      <CustomShowcase slides={slides} />

      {/* ── How It Works ── */}
      <HowItWorks />

      {/* ── Divider ── */}
      <div className="w-full bg-black flex justify-center">
        <div className="w-[60%] h-px bg-white/10" />
      </div>

      {/* ── Custom Form ── */}
      <CustomForm />

      <ScrollIndicator />
      <Footer />
    </>
  );
}