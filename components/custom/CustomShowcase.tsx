"use client";

import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";

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
  {
    title: "LIL BABY",
    subtitle: "ICE CHOKER",
    year: "2024",
    image: "/hero.png",
  },
  {
    title: "21 SAVAGE",
    subtitle: "SKULL RING",
    year: "2023",
    image: "/shop.png",
  },
  {
    title: "FUTURE",
    subtitle: "CUBAN LINK",
    year: "2023",
    image: "/hero.png",
  },
  {
    title: "GUNNA",
    subtitle: "EMERALD BRACELET",
    year: "2022",
    image: "/shop.png",
  },
];

export default function CustomShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const isScrolling = useRef(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll-driven index change
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isScrolling.current) return;
    const idx = Math.min(
      Math.floor(latest * projects.length),
      projects.length - 1
    );
    if (idx >= 0 && idx !== active) {
      setActive(idx);
    }
  });

  // Timeline indicator
  const timelineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const timelineY = useTransform(timelineProgress, [0, 1], [0, 240]);

  const handleClick = useCallback((idx: number) => {
    if (idx === active) return;
    isScrolling.current = true;
    setActive(idx);

    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionScrollable = sectionRef.current.offsetHeight - window.innerHeight;
      const targetScroll = sectionTop + (sectionScrollable * idx) / projects.length;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }

    // Release scroll lock after animation completes
    setTimeout(() => {
      isScrolling.current = false;
    }, 800);
  }, [active]);

  const project = projects[active];

  // Build the vertical list of all project subtitles with varying opacity/size
  const renderSubtitleList = () => {
    return projects.map((p, i) => {
      const distance = Math.abs(i - active);
      const isActive = i === active;

      let opacity = 0.15;
      let fontSize = "13px";
      let color = "text-white/30";

      if (isActive) {
        opacity = 1;
        fontSize = "clamp(36px, 5vw, 76px)";
        color = "text-white";
      } else if (distance === 1) {
        opacity = 0.5;
        fontSize = "clamp(16px, 2vw, 24px)";
        color = "text-white/60";
      } else if (distance === 2) {
        opacity = 0.3;
        fontSize = "clamp(14px, 1.5vw, 18px)";
        color = "text-white/40";
      }

      if (isActive) {
        return (
          <motion.div
            key={`item-${i}`}
            className="relative inline-block my-3 cursor-pointer"
            onClick={() => handleClick(i)}
            layout
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Left bracket */}
            <div className="absolute left-[-14px] top-1/2 h-[55%] w-[2.5px] bg-white -translate-y-1/2" />
            {/* Right bracket */}
            <div className="absolute right-[-14px] top-1/2 h-[55%] w-[2.5px] bg-white -translate-y-1/2" />

            <h1
              className="uppercase font-black leading-[0.9]"
              style={{
                fontSize,
                fontFamily: "var(--font-display)",
              }}
            >
              {p.title}
            </h1>
          </motion.div>
        );
      }

      return (
        <motion.p
          key={`item-${i}`}
          className={`uppercase tracking-[6px] cursor-pointer hover:opacity-80 transition-colors ${color}`}
          style={{
            opacity,
            fontSize,
            fontFamily: "var(--font-display)",
            lineHeight: 1.4,
          }}
          onClick={() => handleClick(i)}
          layout
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {p.subtitle}
        </motion.p>
      );
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white"
      style={{ height: `${(projects.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-white/5 blur-[200px]"
          />
        </div>

        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:4px_4px] pointer-events-none" />

        <div className="relative h-full flex">

          {/* ═══ LEFT PANEL ═══ */}
          <div className="w-full md:w-[62%] relative flex items-center px-8 md:px-20">

            {/* Timeline bar */}
            <div className="hidden md:block absolute left-20 top-1/2 -translate-y-1/2">
              <div className="relative w-px h-[300px] bg-white/20">
                <motion.div
                  style={{ y: timelineY }}
                  className="absolute left-1/2 -translate-x-1/2 w-[5px] h-[60px] bg-white rounded-full"
                />
              </div>
            </div>

            {/* Vertical subtitle list */}
            <div className="md:ml-48 w-full flex flex-col gap-2 items-start">
              {renderSubtitleList()}
            </div>

            {/* YEAR block */}
            <div className="hidden md:block absolute right-[60px] top-1/2 -translate-y-1/2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`year-${active}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div
                    className="italic text-[36px] md:text-[44px] font-light text-white/60"
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

                  <div
                    className="italic text-[36px] md:text-[44px] font-light text-white/60 mt-12"
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

          {/* ═══ RIGHT PANEL — Product Image ═══ */}
          <div className="hidden md:flex w-[38%] items-center justify-center relative">
            {/* Glow */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-white/5 blur-[150px] pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${active}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
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

            {/* Lens flare */}
            <div className="absolute bottom-[100px] w-[160px] h-[160px] bg-white/15 blur-[80px] rounded-full pointer-events-none" />
          </div>

          {/* ═══ Dot Navigation ═══ */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => handleClick(i)}
                className={`w-2 h-2 rounded-full border border-white/40 transition-all duration-300 ${i === active ? "bg-white scale-[1.4]" : "bg-transparent hover:bg-white/30"
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