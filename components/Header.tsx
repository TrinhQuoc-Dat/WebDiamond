"use client";

import { motion, AnimatePresence } from "framer-motion";
import TransitionLink from "./TransitionLink";
import { useState } from "react";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Bracelets", href: "/shop/bracelets" },
  { label: "Necklace", href: "/shop/necklace" },
  { label: "Rings", href: "/shop/rings" },
  { label: "Earings", href: "/shop/earings" },
  { label: "Custom", href: "/custom" },
  { label: "Contact", href: "/contact" },
  { label: "Warranty", href: "/warranty" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isCustom = pathname === "/custom";

  // Ẩn header trên tất cả trang admin
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">

        {/* ── LỚP NỀN blur/gradient — desktop mọi trang + mobile các trang khác ── */}
        <div
          className={`absolute inset-0 pointer-events-none -z-10 ${isCustom ? "hidden md:block" : ""}`}
          style={{
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,.75), rgba(0,0,0,.45), rgba(0,0,0,0))",
            maskImage:
              "linear-gradient(to bottom, black 55%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 55%, transparent 100%)",
          }}
        />

        {/* ── LỚP NỀN đen solid — chỉ mobile trang /custom ── */}
        {isCustom && (
          <div className="md:hidden absolute inset-0 pointer-events-none -z-10 bg-black" />
        )}

        {/* ── NỘI DUNG HEADER ── */}
        <div
          className="relative flex items-center justify-between"
          style={{
            paddingTop: "12px",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingBottom: "12px",
          }}
        >
          {/* Logo top-left */}
          <TransitionLink href="/" className="hover:opacity-80 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo_header.png"
              alt="GODG1FT Jewelry"
              className="h-[36px] sm:h-[42px] lg:h-[48px] w-auto block"
            />
          </TransitionLink>

          {/* Hamburger Menu — chỉ hiện ở các trang con (không phải trang chủ) */}
          {!isHome && (
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
                  <>
                    {/* Overlay trong suốt — bấm ra ngoài để đóng */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setMenuOpen(false)}
                    />

                    {/* Mobile /custom: full-width đen, dính liền ngay dưới header (không gap) */}
                    {isCustom && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden fixed left-0 right-0 bg-black z-50"
                        style={{ top: '60px' }}
                      >
                        {menuItems.map((item) => (
                          <TransitionLink
                            key={`mobile-custom-${item.href}`}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            style={{
                              fontFamily: "var(--font-display)",
                              display: "block",
                              padding: "14px 24px",
                              fontSize: "12px",
                              letterSpacing: "0.2em",
                              textTransform: "uppercase",
                              color: "rgba(255,255,255,0.7)",
                              borderBottom: "1px solid rgba(255,255,255,0.08)",
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = "white";
                              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                              e.currentTarget.style.background = "transparent";
                            }}
                          >
                            {item.label}
                          </TransitionLink>
                        ))}
                      </motion.div>
                    )}

                    {/* Desktop /custom + tất cả trang khác: dropdown bình thường */}
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute right-0 top-full mt-2 w-48 bg-black/90 backdrop-blur-md border border-white/10 rounded-sm overflow-hidden z-50 ${isCustom ? "hidden md:block" : ""}`}
                    >
                      {menuItems.map((item) => (
                        <TransitionLink
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
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "white";
                            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                            e.currentTarget.style.background = "transparent";
                          }}
                        >
                          {item.label}
                        </TransitionLink>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </header>
    </>
  );
}