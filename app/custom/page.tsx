"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import CustomShowcase from "@/components/custom/CustomShowcase";
import HowItWorks from "@/components/custom/HowItWorks";
import CustomForm from "@/components/custom/CustomForm";
import ScrollIndicator from "@/components/ScrollIndicator";

export default function CustomPage() {
  return (
    <>
      <CustomCursor />
      <Header />

      {/* ── Showcase Section (scroll-driven slider) ── */}
      <CustomShowcase />

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