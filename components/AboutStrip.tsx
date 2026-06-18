"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "2024", label: "Founded" },
  { value: "40+", label: "Countries" },
  { value: "10K+", label: "Pieces Crafted" },
  { value: "100%", label: "Certified Gold" },
];

export default function AboutStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="w-full py-28 px-6 md:px-12 lg:px-20 bg-black border-t border-white/8"
      id="about"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-[9px] tracking-[0.5em] text-white/30 uppercase mb-4">
            Our Atelier
          </p>
          <h2
            className="text-[clamp(2.5rem,6vw,5.5rem)] font-normal text-white leading-none uppercase mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Crafted with intention,
            <br />
            worn with meaning.
          </h2>
          <p
            className="text-white/40 text-sm leading-relaxed max-w-md mb-8"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Each WebDiamond piece is handcrafted by master artisans using only
            ethically sourced materials. No luck — all hustle. Every detail
            exists with purpose.
          </p>
          <a
            href="#atelier"
            className="inline-flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-white/50 hover:text-white transition-colors duration-300 no-underline group"
            id="discover-atelier-link"
          >
            Discover Our Story
            <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
          </a>
        </motion.div>

        {/* Right — stats */}
        <div className="grid grid-cols-2 gap-px bg-white/8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-black p-8 flex flex-col gap-2"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
            >
              <span
                className="text-5xl font-normal text-white leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.value}
              </span>
              <span className="text-[9px] tracking-[0.35em] text-white/30 uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
