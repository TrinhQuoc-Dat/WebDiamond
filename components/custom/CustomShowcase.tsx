"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { Slide, DEFAULT_SHOWCASE, DEFAULT_YEAR_LABEL } from "@/utils/customPage";

import "./showcase.css";

interface CustomShowcaseProps {
  slides?: Slide[];
}

/** Chiều cao mỗi dòng trong bánh xe. Cố định để vòng lặp vô tận nối liền không lệch. */
const ROW_HEIGHT = 50;
/** Số dòng thấy cùng lúc — theo mẫu Hall of Fame (~11 dòng, mờ dần về hai mép). */
const VISIBLE_ROWS = 11;
const WHEEL_HEIGHT = ROW_HEIGHT * VISIBLE_ROWS;
/**
 * Số bản sao danh sách xếp nối nhau, để cuộn tới gần rìa thì nhảy ngược lại nguyên
 * một bản sao — nội dung giống hệt nên không thấy giật ⇒ cảm giác cuộn vô tận.
 *
 * Phải đủ nhiều để dải an toàn `[1 bản sao, hết - 1 bản sao]` rộng hơn khung nhìn,
 * nếu không ngưỡng nhảy sẽ rơi ra ngoài tầm cuộn và bánh xe kẹt ở đáy.
 */
function loopCopies(count: number): number {
  return Math.ceil(VISIBLE_ROWS / Math.max(count, 1)) + 3;
}
/** Góc nghiêng tối đa ở mép khung — tạo cảm giác mặt trống cong. */
const MAX_ANGLE = 52;

const TIMELINE_HEIGHT = 420;
const TIMELINE_DOT_HEIGHT = 72;

/** Cuộn `el` tới `to` trong `duration` ms. Dùng thay `behavior:"smooth"` để tốc độ
 *  không phụ thuộc quãng đường — bấm tên nào cũng nhảy nhanh như nhau. */
function tweenScrollTop(el: HTMLElement, to: number, duration = 420): () => void {
  const from = el.scrollTop;
  const delta = to - from;
  if (Math.abs(delta) < 1) return () => {};

  const start = performance.now();
  let raf = 0;
  const step = (now: number) => {
    const t = Math.min((now - start) / duration, 1);
    // easeInOutCubic
    const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    el.scrollTop = from + delta * e;
    if (t < 1) raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

export default function CustomShowcase({ slides }: CustomShowcaseProps) {
  // Dữ liệu đến từ API; fallback về data mặc định nếu rỗng để không vỡ slider.
  const projects = slides && slides.length > 0 ? slides : DEFAULT_SHOWCASE;
  const count = projects.length;

  /** Dòng đang chọn — CHỈ đổi khi bấm, không đổi khi cuộn bánh xe. */
  const [selected, setSelected] = useState(0);
  const safeSelected = Math.min(selected, count - 1);
  const project = projects[safeSelected];
  const yearText = project?.yearLabel || DEFAULT_YEAR_LABEL;

  const wheelRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const cancelMediaTween = useRef<() => void>(() => {});
  const paintRef = useRef<(() => void) | null>(null);

  const loopHeight = count * ROW_HEIGHT;

  // ── Bánh xe: vòng lặp vô tận + nghiêng dần theo khoảng cách tới tâm ──
  useEffect(() => {
    const wheel = wheelRef.current;
    const track = trackRef.current;
    if (!wheel || !track || loopHeight === 0) return;

    // Bắt đầu ở bản sao giữa để cuộn được cả hai chiều ngay từ đầu.
    wheel.scrollTop = loopHeight * Math.floor(loopCopies(count) / 2);

    let raf = 0;
    const paint = () => {
      raf = 0;
      const half = wheel.clientHeight / 2;
      const center = wheel.scrollTop + half;
      const rows = track.children as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < rows.length; i++) {
        const rowCenter = i * ROW_HEIGHT + ROW_HEIGHT / 2;
        // -1 (mép trên) … 0 (tâm) … 1 (mép dưới)
        const d = Math.max(-1.4, Math.min(1.4, (rowCenter - center) / half));
        const ad = Math.min(Math.abs(d), 1);
        const row = rows[i];
        row.style.transform = `rotateX(${-d * MAX_ANGLE}deg) scale(${1 - ad * 0.55})`;
        // Dòng đang chọn trôi theo bánh xe, nên phải giữ một mức sáng tối thiểu —
        // nếu để mờ theo khoảng cách như các dòng khác thì mất dấu dòng đã bấm.
        const dim = Math.max(0, 1 - ad * 0.72);
        row.style.opacity = `${row.dataset.selected === "1" ? Math.max(dim, 0.85) : dim}`;
      }
    };

    const onScroll = () => {
      // Chạm gần hai rìa thì kéo về giữa dải nhưng GIỮ NGUYÊN pha (phần dư theo một
      // vòng danh sách), nên hình ảnh không đổi — đó là chỗ tạo cảm giác vô tận.
      // Dùng modulo thay vì cộng/trừ một lần, để cú vuốt mạnh cỡ nào cũng về đúng dải.
      const maxScroll = wheel.scrollHeight - wheel.clientHeight;
      const lo = loopHeight;
      const hi = maxScroll - loopHeight;
      if (hi > lo && (wheel.scrollTop < lo || wheel.scrollTop > hi)) {
        const phase = ((wheel.scrollTop % loopHeight) + loopHeight) % loopHeight;
        const middle = Math.floor((lo + hi) / 2 / loopHeight) * loopHeight;
        wheel.scrollTop = middle + phase;
      }
      if (!raf) raf = requestAnimationFrame(paint);
    };

    wheel.addEventListener("scroll", onScroll, { passive: true });
    paintRef.current = paint;
    paint();
    return () => {
      wheel.removeEventListener("scroll", onScroll);
      paintRef.current = null;
      if (raf) cancelAnimationFrame(raf);
    };
  }, [loopHeight, count]);

  // Paint chỉ tự chạy khi cuộn; đổi lựa chọn cũng phải vẽ lại để dòng vừa bấm sáng lên.
  useEffect(() => {
    paintRef.current?.();
  }, [safeSelected]);

  // ── Bấm 1 tên: đổi lựa chọn + kéo cột phải tới đúng ảnh ──
  const handleSelect = useCallback((idx: number) => {
    setSelected(idx);
    const media = mediaRef.current;
    if (media) {
      cancelMediaTween.current();
      cancelMediaTween.current = tweenScrollTop(media, idx * media.clientHeight);
    }
  }, []);

  useEffect(() => () => cancelMediaTween.current(), []);

  // Danh sách đã nhân bản cho vòng lặp; giữ lại index thật để biết dòng nào được chọn.
  const loopRows = Array.from({ length: loopCopies(count) * count }, (_, i) => i % count);

  return (
    <section className="relative bg-black text-white h-screen overflow-hidden">
      <div className="h-full overflow-hidden z-40" style={{ paddingTop: "80px" }}>

        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:4px_4px] pointer-events-none" />

        <div className="h-full flex flex-col md:flex-row">

          {/* ═══ TRÁI — bánh xe tên ═══ */}
          <div
            className="w-full md:w-[62%] h-[38%] md:h-full relative flex items-center justify-center md:justify-start px-6 md:px-0"
            style={{ paddingLeft: "clamp(16px, 4vw, 320px)", paddingRight: "clamp(16px, 4vw, 80px)" }}
          >
            {/* Thanh chỉ vị trí — nay bám dòng ĐANG CHỌN, vì bánh xe lặp vô tận nên
                không còn "tiến độ" nào để bám. */}
            <div className="hidden md:block absolute left-28 top-1/2 -translate-y-1/2">
              <div className="relative w-px bg-white/20" style={{ height: `${TIMELINE_HEIGHT}px` }}>
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 w-[5px] bg-white rounded-full"
                  style={{ height: `${TIMELINE_DOT_HEIGHT}px` }}
                  animate={{
                    y: count > 1
                      ? (safeSelected / (count - 1)) * (TIMELINE_HEIGHT - TIMELINE_DOT_HEIGHT)
                      : 0,
                  }}
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>
            </div>

            <div className="hidden md:block" style={{ width: "100%", paddingLeft: "100px" }}>
              <div
                ref={wheelRef}
                className="showcase-wheel"
                style={{ height: `${WHEEL_HEIGHT}px`, width: "clamp(340px, 29vw, 440px)", paddingLeft: "20px" }}
              >
                <div ref={trackRef} className="showcase-wheel-track">
                  {loopRows.map((realIdx, i) => (
                    <WheelRow
                      key={i}
                      label={projects[realIdx].title}
                      isSelected={realIdx === safeSelected}
                      onSelect={() => handleSelect(realIdx)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile: tạm hiển thị tên đang chọn — Phase 4 sẽ thay bằng list dọc. */}
            <div className="md:hidden text-center">
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(20px, 5vw, 32px)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {project.title}
              </h2>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "4px", letterSpacing: "0.15em" }}>
                {yearText} {project.year}
              </div>
            </div>

            {/* ═══ GIỮA — YEAR ═══ */}
            <div className="hidden md:block absolute right-[60px] top-1/2 -translate-y-1/2">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`year-${safeSelected}`}
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

          {/* ═══ PHẢI — chồng ảnh, cuộn riêng ═══ */}
          <div className="w-full md:w-[38%] h-[62%] md:h-full relative md:absolute md:inset-y-0 md:right-0">
            <div ref={mediaRef} className="showcase-media-scroller">
              {projects.map((p, i) => (
                <div key={i} className="showcase-media-item">
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={600}
                    height={800}
                    priority={i === 0}
                    sizes="(max-width: 768px) 100vw, 38vw"
                    className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.06)] select-none max-w-[90%] max-h-[90%] md:max-w-full md:max-h-[95%]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Một dòng trong bánh xe. Dấu 4 góc bám đúng dòng đã bấm, trôi theo bánh xe. */
function WheelRow({
  label,
  isSelected,
  onSelect,
}: {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className="showcase-row"
      data-selected={isSelected ? "1" : "0"}
      style={{ height: `${ROW_HEIGHT}px` }}
      onClick={onSelect}
    >
      <span
        style={{
          position: "relative",
          display: "inline-block",
          padding: "0 18px",
          fontFamily: "var(--font-display)",
          textTransform: "uppercase",
          letterSpacing: isSelected ? "0.05em" : "0.18em",
          fontSize: "clamp(20px, 3.05vw, 46px)",
          lineHeight: 1.15,
          color: isSelected ? "#fff" : "rgba(255,255,255,0.75)",
        }}
      >
        {isSelected && <SelectionCorners />}
        {label}
      </span>
    </div>
  );
}

/** 4 dấu góc quanh dòng đang chọn (mẫu Hall of Fame). */
function SelectionCorners() {
  const bar = "rgba(255,255,255,0.55)";
  const size = "0.34em";
  const thickness = "1.5px";
  const corner = (v: "top" | "bottom", h: "left" | "right") => ({
    position: "absolute" as const,
    [v]: "-0.22em",
    [h]: 0,
    width: size,
    height: size,
    [`border${v === "top" ? "Top" : "Bottom"}`]: `${thickness} solid ${bar}`,
    [`border${h === "left" ? "Left" : "Right"}`]: `${thickness} solid ${bar}`,
    pointerEvents: "none" as const,
  });

  return (
    <>
      <span style={corner("top", "left")} />
      <span style={corner("top", "right")} />
      <span style={corner("bottom", "left")} />
      <span style={corner("bottom", "right")} />
    </>
  );
}
