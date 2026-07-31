"use client";

import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import { Slide, DEFAULT_SHOWCASE, DEFAULT_YEAR_LABEL } from "@/utils/customPage";

interface CustomShowcaseProps {
  slides?: Slide[];
}

/** Kích thước lấy từ Figma (frame 1440×762) — xem dtteck/plans/custom-page-figma-alignment. */
const WHEEL_HEIGHT = 420;
const TIMELINE_HEIGHT = 420;
const TIMELINE_DOT_HEIGHT = 72;

/**
 * Chiều cao mỗi dòng trong "bánh xe" chữ, thu dần theo khoảng cách tới dòng đang chọn.
 * Nhịp này khớp Figma và làm cả 7 dòng vừa khít khung 420px (tổng 338px),
 * thay vì nhịp đều 72px cũ chỉ hiện được 5 dòng.
 */
function rowHeight(distance: number): number {
  if (distance === 0) return 62;
  if (distance === 1) return 52;
  if (distance === 2) return 44;
  return 42;
}

export default function CustomShowcase({ slides }: CustomShowcaseProps) {
  // Dữ liệu đến từ API; fallback về data mặc định nếu rỗng để không vỡ slider.
  const projects = slides && slides.length > 0 ? slides : DEFAULT_SHOWCASE;

  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const isScrolling = useRef(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Continuous scroll-driven index (float for smooth wheel effect)
  const continuousIndex = useTransform(scrollYProgress, [0, 1], [0, projects.length - 1]);

  const activeRef = useRef(active);
  activeRef.current = active;

  useMotionValueEvent(continuousIndex, "change", (latest) => {
    if (isScrolling.current) return;
    const idx = Math.min(Math.round(latest), projects.length - 1);
    if (idx >= 0 && idx !== activeRef.current) {
      activeRef.current = idx;
      setActive(idx);
    }
  });

  // Timeline indicator — thanh cao 420px, chấm 72px ⇒ quãng chạy 348px (theo Figma).
  const timelineY = useTransform(scrollYProgress, [0, 1], [0, TIMELINE_HEIGHT - TIMELINE_DOT_HEIGHT]);

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
    setTimeout(() => { isScrolling.current = false; }, 300);
  }, [active]);

  // Guard: nếu mảng slide đổi (ngắn hơn) sau khi mount, active có thể vượt phạm vi.
  const safeActive = Math.min(active, projects.length - 1);
  const project = projects[safeActive];
  // Nhãn năm riêng theo từng slide (fallback "YEAR").
  const yearText = project?.yearLabel || DEFAULT_YEAR_LABEL;

  // Dời cả cột chữ sao cho dòng đang chọn nằm chính giữa khung — vì mỗi dòng cao khác
  // nhau nên phải cộng dồn chiều cao các dòng phía trên thay vì nhân với một hằng số.
  const wheelOffset = useMemo(() => {
    let above = 0;
    for (let i = 0; i < safeActive; i++) above += rowHeight(safeActive - i);
    return WHEEL_HEIGHT / 2 - above - rowHeight(0) / 2;
  }, [safeActive]);

  // Build text list — all items visible, scroll as a stack, active one is larger
  const renderSubtitleList = useCallback(() => {
    return projects.map((p, i) => {
      const dist = i - active;
      const absDist = Math.abs(dist);

      let opacity = 0.15;
      let fontSize = "13px";
      let color = "rgba(255,255,255,0.3)";

      if (absDist === 0) {
        opacity = 1;
        fontSize = "clamp(22px, 3.05vw, 46px)";
        color = "rgba(255,255,255,1)";
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
        <div
          key={`item-${i}`}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", height: `${rowHeight(absDist)}px` }}
        >
          <motion.div
            className="cursor-pointer"
            onClick={() => handleClick(i)}
            animate={{ opacity, color }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              fontFamily: "var(--font-display)",
              textTransform: "uppercase",
              letterSpacing: absDist === 0 ? "0.05em" : "6px",
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              textAlign: "center",
              fontSize,
            }}
          >
            {absDist === 0 ? (
              <span style={{ position: "relative", display: "inline-block" }}>
                <span style={{ position: "absolute", bottom: "-8px", left: "-14px", opacity: 0.5, fontSize: "0.5em", lineHeight: 1 }}>└</span>
                {p.title}
                <span style={{ position: "absolute", bottom: "-8px", right: "-14px", opacity: 0.5, fontSize: "0.5em", lineHeight: 1 }}>┘</span>
              </span>
            ) : (
              p.subtitle
            )}
          </motion.div>
        </div>
      );
    });
  }, [active, projects, handleClick]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white"
      style={{ height: `${(projects.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden z-40" style={{ paddingTop: "80px" }}>

        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/5 blur-[120px]" />
        </div>

        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:4px_4px] pointer-events-none" />

        <div className="h-full flex flex-col md:flex-row">

          {/* ═══ LEFT / TOP — Text + Year ═══ */}
          <div className="w-full md:w-[62%] h-[20%] md:h-full relative flex items-center justify-center md:justify-start px-6 md:px-0" style={{ paddingLeft: "clamp(16px, 4vw, 320px)", paddingRight: "clamp(16px, 4vw, 80px)" }}>

            {/* Timeline bar — desktop only */}
            <div className="hidden md:block absolute left-28 top-1/2 -translate-y-1/2">
              <div className="relative w-px bg-white/20" style={{ height: `${TIMELINE_HEIGHT}px` }}>
                <motion.div
                  style={{ y: timelineY, height: `${TIMELINE_DOT_HEIGHT}px` }}
                  className="absolute left-1/2 -translate-x-1/2 w-[5px] bg-white rounded-full"
                />
              </div>
            </div>

            {/* Active title — mobile: centered large text */}
            <div className="md:hidden text-center">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`mobile-title-${active}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 5vw, 32px)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "white" }}>
                    {project.title}
                  </h1>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "4px", letterSpacing: "0.15em" }}>
                    {yearText} {project.year}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Text wheel — desktop only */}
            {/* Bề rộng khung có giới hạn để các dòng canh giữa quanh trục x≈370 như Figma,
                thay vì canh trái theo cả cột. */}
            <div className="hidden md:block" style={{ width: "100%", paddingLeft: "100px" }}>
              <div
                style={{
                  overflow: "hidden",
                  height: `${WHEEL_HEIGHT}px`,
                  width: "clamp(340px, 29vw, 440px)",
                  position: "relative",
                  paddingLeft: "20px",
                }}
              >
                <motion.div
                  animate={{ y: wheelOffset }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ width: "100%" }}
                >
                  {renderSubtitleList()}
                </motion.div>
              </div>
            </div>

            {/* YEAR block — desktop only */}
            <div className="hidden md:block absolute right-[60px] top-1/2 -translate-y-1/2">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`year-${active}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>
                    {yearText}
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "34px", fontWeight: 700 }}>
                    {project.year}
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)", marginTop: "44px" }}>
                    {yearText}
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "34px", fontWeight: 700 }}>
                    {project.year}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ═══ RIGHT / BOTTOM — Product Image ═══ */}
          {/* Desktop: tách khỏi luồng flex và neo theo mép khung sticky, để cột ảnh thoát
              padding-top 80px và chạy hết chiều cao màn hình, dính sát mép phải như Figma.
              (Không dùng margin âm — reset `* { margin: 0 }` trong globals.css nằm ngoài
              layer nên đè hết utility margin của Tailwind.) */}
          <div className="w-full md:w-[38%] h-[80%] md:h-full relative md:absolute md:inset-y-0 md:right-0 flex items-center justify-center md:justify-end">
            {/* Glow */}
            <div className="absolute w-[400px] h-[400px] rounded-full bg-white/5 blur-[80px] pointer-events-none" />

            <AnimatePresence mode="popLayout">
              <motion.div
                key={`img-${active}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative w-full h-full flex items-center justify-center md:justify-end"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={800}
                  priority
                  className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.06)] select-none max-w-[90%] max-h-[90%] md:max-w-full md:max-h-[95%]"
                />
              </motion.div>
            </AnimatePresence>

            {/* Lens flare */}
            <div className="absolute bottom-[100px] w-[120px] h-[120px] bg-white/15 blur-[50px] rounded-full pointer-events-none" />


          </div>
        </div>
      </div>
    </section>
  );
}