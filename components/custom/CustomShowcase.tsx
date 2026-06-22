"use client";

import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useCallback } from "react";

const projects = [
  {
    title: "YOUNG THUG",
    subtitle: "NECKLACE LIGHTNING",
    year: "2026",
    image: "/shop.png",
  },
  {
    title: "TRAVIS SCOTT",
    subtitle: "DIAMOND CHAIN",
    year: "2025",
    image: "/hero.png",
  },
  {
    title: "DRAKE",
    subtitle: "LUXURY PENDANT",
    year: "2024",
    image: "/shop.png",
  },
];

export default function CustomShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Map scroll progress to active index
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const segmentSize = 1 / projects.length;
    const idx = Math.min(
      Math.floor(latest / segmentSize),
      projects.length - 1
    );
    if (idx !== active && idx >= 0) {
      setActive(idx);
    }
  });

  // Timeline indicator position
  const timelineY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 240]
  );

  const handleClick = useCallback((idx: number) => {
    setActive(idx);
    // Scroll to the corresponding scroll position
    if (sectionRef.current) {
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.scrollHeight - window.innerHeight;
      const targetScroll = sectionTop + (sectionHeight * idx) / projects.length;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  }, [active]);

  const project = projects[active];

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white/5 blur-[200px]"
          />
        </div>

        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:4px_4px] pointer-events-none" />

        <div className="relative h-full flex">

          {/* ═══ LEFT PANEL ═══ */}
          <div className="w-full md:w-[65%] relative flex items-center px-8 md:px-20">

            {/* Timeline bar */}
            <div className="hidden md:block absolute left-10 top-1/2 -translate-y-1/2">
              <div className="relative w-px h-[300px] bg-white/20">
                <motion.div
                  style={{ y: timelineY }}
                  className="absolute left-1/2 -translate-x-1/2 w-[5px] h-[60px] bg-white rounded-full"
                />
              </div>
            </div>

            {/* Content */}
            <div className="md:ml-20 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -60 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Subtitle list above — fading out */}
                  <div className="space-y-3 mb-8">
                    {projects.map((p, i) => {
                      const distance = Math.abs(i - active);
                      if (i >= active || distance > 2) return null;
                      const opacity = distance === 1 ? 0.5 : 0.25;
                      const fontSize = distance === 1 ? "18px" : "14px";
                      return (
                        <p
                          key={`above-${i}`}
                          className="uppercase tracking-[6px] cursor-pointer hover:text-white/80 transition-colors"
                          style={{ opacity, fontSize, fontFamily: "var(--font-display)" }}
                          onClick={() => handleClick(i)}
                        >
                          {p.subtitle}
                        </p>
                      );
                    })}
                  </div>

                  {/* Main Title with brackets */}
                  <div className="relative inline-block my-4">
                    <div className="absolute left-[-16px] top-1/2 h-[55%] w-[2.5px] bg-white -translate-y-1/2" />
                    <div className="absolute right-[-16px] top-1/2 h-[55%] w-[2.5px] bg-white -translate-y-1/2" />
                    <h1
                      className="uppercase font-black leading-[0.9]"
                      style={{
                        fontSize: "clamp(48px, 7vw, 120px)",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {project.title}
                    </h1>
                  </div>

                  {/* Subtitle list below — fading out */}
                  <div className="space-y-3 mt-8">
                    {projects.map((p, i) => {
                      const distance = Math.abs(i - active);
                      if (i <= active || distance > 2) return null;
                      const opacity = distance === 1 ? 0.5 : 0.25;
                      const fontSize = distance === 1 ? "18px" : "14px";
                      return (
                        <p
                          key={`below-${i}`}
                          className="uppercase tracking-[6px] cursor-pointer hover:text-white/80 transition-colors"
                          style={{ opacity, fontSize, fontFamily: "var(--font-display)" }}
                          onClick={() => handleClick(i)}
                        >
                          {p.subtitle}
                        </p>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* YEAR block — positioned to the right of the text on desktop */}
              <div className="hidden md:block absolute right-[60px] top-1/2 -translate-y-1/2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`year-${project.year}-${active}`}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className="italic text-[36px] md:text-[44px] font-light text-white/70"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      YEAR
                    </div>
                    <div
                      className="font-black text-[52px] md:text-[64px]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {project.year}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ═══ RIGHT PANEL — Product Image ═══ */}
          <div className="hidden md:flex w-[35%] items-center justify-center relative">
            {/* Glow behind image */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-white/5 blur-[150px] pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={project.image + active}
                initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={800}
                  priority
                  className="object-contain drop-shadow-[0_0_80px_rgba(255,255,255,0.06)] select-none"
                />
              </motion.div>
            </AnimatePresence>

            {/* Lens flare effect */}
            <div className="absolute bottom-[100px] w-[180px] h-[180px] bg-white/15 blur-[80px] rounded-full pointer-events-none" />
          </div>

          {/* ═══ Dot Navigation (bottom center) ═══ */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => handleClick(i)}
                className={`w-2.5 h-2.5 rounded-full border border-white/40 transition-all duration-300 ${
                  i === active ? "bg-white scale-125" : "bg-transparent hover:bg-white/30"
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}