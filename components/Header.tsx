"use client";

import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-start justify-between"
      style={{ paddingTop: "40px", paddingLeft: "24px", paddingRight: "24px", paddingBottom: "24px" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* ── Logo top-left ── */}
      {/* Layout: [text block] [logo.gif] — side by side */}
      <div className="flex items-center gap-4">

        {/* Text block */}
        <div className="flex flex-col items-end leading-none gap-[6px]">
          {/* GODG1FT — wide spacing giữa các ký tự */}
          <span
            className="text-white/80 font-normal uppercase leading-none block"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "28px",
              letterSpacing: "0.5em",
              marginRight: "-0.3em",
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
        </div>

        {/* logo.svg — placed in /public/logo.svg */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.svg"
          alt="WebDiamond logo"
          style={{ height: "45px", width: "auto", display: "block" }}
        />
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
          style={{ height: "60px", width: "auto", display: "block" }}
        />
      </motion.button>
    </motion.header>
  );
}
