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

  // Continuous scroll-driven index (float for smooth wheel effect)
  const continuousIndex = useTransform(scrollYProgress, [0, 1], [0, projects.length - 1]);

  useMotionValueEvent(continuousIndex, "change", (latest) => {
    if (isScrolling.current) return;
    const idx = Math.min(Math.round(latest), projects.length - 1);
    if (idx >= 0 && idx !== active) {
      setActive(idx);
    }
  });

  // Timeline indicator
  const timelineY = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const itemHeight = 72;

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
    setTimeout(() => { isScrolling.current = false; }, 800);
  }, [active]);

  const project = projects[active];

  // Scroll offset so active item sits at center of the container
  const centerOffset = (420 - itemHeight) / 2;

  // Build text list — all items visible, scroll as a stack, active one is larger
  const renderSubtitleList = () => {
    return projects.map((p, i) => {
      const dist = i - active;
      const absDist = Math.abs(dist);

      let opacity = 0.15;
      let fontSize = "13px";
      let color = "rgba(255,255,255,0.3)";
      let fontWeight = 400;

      if (absDist === 0) {
        opacity = 1;
        fontSize = "clamp(22px, 2.8vw, 44px)";
        color = "rgba(255,255,255,1)";
        fontWeight = 900;
      } else if (absDist === 1) {
        opacity = 0.5;
        fontSize = "clamp(14px, 1.5vw, 18px)";
        color = "rgba(255,255,255,0.6)";
      } else if (absDist === 2) {
        opacity = 0.25;
        fontSize = "clamp(12px, 1.2vw, 15px)";
        color = "rgba(255,255,255,0.35)";
      }

      return (
        <div key={`item-${i}`} style={{ display: "flex", alignItems: "center", minHeight: `${itemHeight}px` }}>
          <motion.div
            className="cursor-pointer"
            onClick={() => handleClick(i)}
            animate={{
              opacity,
              fontSize,
              color,
              fontWeight,
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              fontFamily: "var(--font-display)",
              textTransform: "uppercase",
              letterSpacing: absDist === 0 ? "0.05em" : "6px",
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              padding: "4px 0",
            }}
          >
            {absDist === 0 ? (
              <>
                <span style={{ opacity: 0.5 }}>— </span>
                {p.title}
                <span style={{ opacity: 0.5 }}> —</span>
              </>
            ) : (
              p.subtitle
            )}
          </motion.div>
        </div>
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

          <div className="w-full md:w-[62%] relative flex items-center pr-8 md:pr-20" style={{ paddingLeft: "clamp(48px, 8vw, 320px)" }}>

            {/* Timeline bar */}
            <div className="hidden md:block absolute left-28 top-1/2 -translate-y-1/2">
              <div className="relative w-px h-[300px] bg-white/20">
                <motion.div
                  style={{ y: timelineY }}
                  className="absolute left-1/2 -translate-x-1/2 w-[5px] h-[60px] bg-white rounded-full"
                />
              </div>
            </div>

            {/* Scrolling text stack — shows active item at center + faded items above/below */}
            <div style={{ overflow: "hidden", height: "420px", width: "100%", position: "relative" }}>
              <motion.div
                animate={{ y: -active * itemHeight + centerOffset }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ width: "100%" }}
              >
                {renderSubtitleList()}
              </motion.div>
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