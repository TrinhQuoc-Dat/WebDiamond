"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  // Đọc từ localStorage khi component mount và lắng nghe sự kiện
  useEffect(() => {
    const updateCartCount = () => {
      const savedCount = localStorage.getItem("cartCount");
      if (savedCount) {
        setCartCount(parseInt(savedCount, 10));
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();

    window.addEventListener("cart-updated", updateCartCount);
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("cart-updated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

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
                fontWeight: "500",
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
          h-[38px]
          sm:h-[48px]
          lg:h-[58px]
          w-auto
          block
        "
            />
          </Link>
        </div>

        {/* ── BAG top-right ── */}


        <motion.button
          className="text-white font-black tracking-[0.06em] uppercase leading-none hover:opacity-50 transition-opacity duration-200 relative"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "38px",
            letterSpacing: "0.25em",
          }}
          whileTap={{ scale: 0.94 }}
          id="bag-button"
          aria-label="Shopping bag"
        >
          <div className="relative inline-block">
            <a href="https://www.instagram.com/godg1ft.jrl/">
              <img
                src="/bay-cart.jpg"
                alt="Shopping bag"
                className="
                h-[58px]
                sm:h-[68px]
                lg:h-[80px]
                w-auto
                block
              "
                style={{ paddingLeft: "10px" }}
              />

              {/* Ngôi sao chứa số */}
              <div className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4">
                <div className="relative w-7 h-7">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                    <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" />
                  </svg>

                  <span
                    className="absolute inset-0 flex items-center justify-center text-black font-bold"
                    style={{
                      fontFamily: "var(--font-sans)",
                      transform: "translate(4px, 1px)",
                      fontSize: "12px",
                      fontWeight: 800,
                    }}
                  >
                    {cartCount}
                  </span>
                </div>
              </div>
            </a>

          </div>
        </motion.button>
      </motion.header>
    </>
  );
}
