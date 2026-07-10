"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import CustomShowcase from "@/components/custom/CustomShowcase";
import HowItWorks from "@/components/custom/HowItWorks";
import CustomForm from "@/components/custom/CustomForm";
import ScrollIndicator from "@/components/ScrollIndicator";
import { Slide, DEFAULT_SHOWCASE, DEFAULT_YEAR_LABEL, getCustomPage } from "@/utils/customPage";

export default function CustomPage() {
  // Khởi tạo bằng data mặc định để không nháy, rồi cập nhật từ API khi tải xong.
  const [slides, setSlides] = useState<Slide[]>(DEFAULT_SHOWCASE);
  const [yearLabel, setYearLabel] = useState<string>(DEFAULT_YEAR_LABEL);

  useEffect(() => {
    getCustomPage().then((content) => {
      setSlides(content.showcase);
      setYearLabel(content.yearLabel);
    });
  }, []);

  return (
    <>
      <CustomCursor />
      <Header />

      {/* ── Showcase Section (scroll-driven slider) ── */}
      <CustomShowcase slides={slides} yearLabel={yearLabel} />

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