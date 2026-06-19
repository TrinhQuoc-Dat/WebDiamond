"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import Link from "next/link";

const MotionLink = motion.create(Link);

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Subtle parallax on scroll
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <motion.section
      ref={ref}
      className="relative w-full h-screen overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* ── Full-bleed product image ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ scale: imageScale, y: imageY }}
      >
        <Image
          src="/hero.png"
          alt="WebDiamond — signature jewelry piece"
          fill
          priority
          quality={95}
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* ── Edge vignette — matches the deep dark corners in the reference ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* ── Top fade (helps header legibility) ── */}
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, transparent 100%)",
        }}
      />

      {/* ── Bottom fade ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.70) 0%, transparent 100%)",
        }}
      />

      {/* ── Centre content ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ y: contentY }}
      >
        <MotionLink
          href="/shop"
          className="group relative"
          id="hero-shop-all"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <span
            className="block text-white leading-none tracking-[0.06em] uppercase select-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 3.5vw, 3.5rem)",
              letterSpacing: "0.15em",
              WebkitTextStroke: "1.5px white",
              textShadow: "0 0 20px rgba(255,255,255,0.15)",
            }}
          >
            Shop All
          </span>

          {/* Hover underline */}
          <motion.span
            className="absolute -bottom-2 left-0 h-[2px] bg-white origin-left"
            initial={{ scaleX: 0 }}
            variants={{ hover: { scaleX: 1 } }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </MotionLink>
      </motion.div>
    </motion.section>
  );
}
