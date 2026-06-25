"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const menuItems = [
  { label: "Bracelets", href: "/shop/bracelets" },
  { label: "Necklace", href: "/shop/necklace" },
  { label: "Rings", href: "/shop/rings" },
  { label: "Earings", href: "/shop/earings" },
  { label: "Custom", href: "/custom" },
  { label: "Contact", href: "/contact" },
  { label: "Warrenty", href: "/warrenty" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Gradient backdrop layer — tạo khoảng cách thị giác giữa header và content khi scroll */}
      <div className="fixed top-0 inset-x-0 h-[200px] bg-gradient-to-b from-black via-black/60 to-transparent pointer-events-none z-40" />

      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-black/10 backdrop-blur-sm"
        style={{ paddingTop: "12px", paddingLeft: "24px", paddingRight: "24px", paddingBottom: "12px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >

        {/* ── Logo top-left ── */}
        {/* Layout: [text block] [logo.gif] — side by side */}
        <div className="flex items-center gap-4">

          {/* Text block */}
          <Link href="/" className="flex flex-col items-end leading-none gap-[6px] hover:opacity-80 transition-opacity">
            {/* GODG1FT — wide spacing giữa các ký tự */}
            <span
              className="
                      text-white/80
                      uppercase
                      font-normal
                      leading-none
                      text-[24px]
                      sm:text-[22px]
                      lg:text-[32px]
                    "
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "0.35em",
                marginRight: "-0.25em",
                fontWeight: "700",
              }}
            >
              GODG1FT
            </span>
            {/* JEWELRY — right-aligned */}
            <span
              className="text-white/50 uppercase font-normal"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "10px",
                letterSpacing: "0.7em",
                marginRight: "-0.4em",
                transform: "translateX(-4px)",
              }}
            >
              JEWELRY
            </span>
          </Link>

          {/* logo.svg — placed in /public/logo.svg */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <img
              src="/logo.svg"
              alt="WebDiamond logo"
              className="
          h-[24px]
          sm:h-[30px]
          lg:h-[36px]
          w-auto
          block
        "
            />
          </Link>
        </div>

        {/* ── Hamburger Menu (3 dashes) top-right ── */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col items-center justify-center gap-[5px] p-2 hover:opacity-60 transition-opacity cursor-pointer"
            style={{ background: "none", border: "none" }}
            aria-label="Menu"
          >
            <span className="block w-[28px] h-[2px] bg-white" />
            <span className="block w-[28px] h-[2px] bg-white" />
            <span className="block w-[28px] h-[2px] bg-white" />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-48 bg-black/90 backdrop-blur-md border border-white/10 rounded-sm overflow-hidden z-50"
              >
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: "var(--font-display)",
                      display: "block",
                      padding: "12px 20px",
                      fontSize: "12px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.7)",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "white"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.background = "transparent"; }}
                  >
                    {item.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}
