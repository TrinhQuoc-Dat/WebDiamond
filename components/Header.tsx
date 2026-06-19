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
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300 ease-out ${
        shouldShowBg
          ? "bg-black border-b border-white/5 py-4"
          : "bg-transparent pt-10 pb-6"
      }`}
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/airplane.jpeg"
          alt="Shopping bag"
          className="h-9 w-auto block object-contain"
        />
      </motion.button>
    </motion.header>
  );
}
