"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Header() {
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
          className="text-white font-black tracking-[0.06em] uppercase leading-none hover:opacity-50 transition-opacity duration-200"
          style={{ fontFamily: "var(--font-display)", fontSize: "38px", letterSpacing: "0.25em" }}
          whileTap={{ scale: 0.94 }}
          id="bag-button"
          aria-label="Shopping bag"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bag.svg"
            alt="Shopping bag"
            className="
            h-[38px]
            sm:h-[48px]
            lg:h-[60px]
            w-auto
            block
          "
          />
        </motion.button>
      </motion.header>
    </>
  );
}
