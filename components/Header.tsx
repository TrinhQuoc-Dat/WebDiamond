"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldShowBg = isScrolled || pathname !== "/";

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300 ease-out px-6 md:px-12 ${
        shouldShowBg
          ? "bg-black border-b border-white/5 py-4"
          : "bg-transparent pt-10 pb-6"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* ── Logo top-left ── */}
      {/* Layout: [text block] [logo.gif] — side by side */}
      <Link href="/" className="flex items-center gap-4 cursor-pointer hover:opacity-90 transition-opacity select-none">
        {/* Text block */}
        <div className="flex flex-col leading-none gap-[6px]">
          {/* GODG1FT — wide spacing giữa các ký tự */}
          <span
            className="text-white font-black uppercase leading-none block"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px, 3.5vw, 38px)",
              letterSpacing: "0.25em",
            }}
          >
            GODG1FT
          </span>
          {/* JEWELRY — right-aligned */}
          <span
            className="text-white uppercase opacity-90"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "9px",
              fontWeight: 800,
              letterSpacing: "0.5em",
              alignSelf: "flex-end",
            }}
          >
            JEWELRY
          </span>
        </div>

        {/* logo.gif — placed in /public/logo.gif */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.gif"
          alt="WebDiamond logo"
          className="h-10 md:h-[60px] w-auto block object-contain"
        />
      </Link>

      {/* ── BAG top-right ── */}
      <motion.button
        className="text-white hover:opacity-80 transition-opacity duration-200 cursor-pointer flex items-center justify-center select-none"
        whileTap={{ scale: 0.94 }}
        id="bag-button"
        aria-label="Shopping bag"
      >
        <svg width="65" height="35" viewBox="0 0 70 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
          {/* Jet rocket outline */}
          <path d="M12 6 L58 17.5 L12 29 L20 17.5 Z" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
          <path d="M20 17.5 L58 17.5" stroke="currentColor" strokeWidth="2" />
          {/* Text BAG inside the jet */}
          <text x="24" y="21" fill="currentColor" fontSize="9" fontFamily="var(--font-sans)" fontWeight="900" letterSpacing="1">BAG</text>
          {/* Small number 1 below the left wing */}
          <text x="11" y="34" fill="currentColor" fontSize="8" fontFamily="var(--font-sans)" fontWeight="900">1</text>
        </svg>
      </motion.button>
    </motion.header>
  );
}
