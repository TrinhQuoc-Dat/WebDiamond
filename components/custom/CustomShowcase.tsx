"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";
import { Slide, DEFAULT_SHOWCASE, DEFAULT_YEAR_LABEL } from "@/utils/customPage";
import { getGoogleDriveDirectLink, getYouTubeId, looksLikeVideo } from "@/utils/media";

import "./showcase.css";

interface CustomShowcaseProps {
  slides?: Slide[];
}

/** Chiều cao mỗi dòng trong bánh xe. Cố định để vòng lặp vô tận nối liền không lệch. */
const ROW_HEIGHT = 46;
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

/** Thời gian tween — dùng chung cho bánh xe, cột media và số năm. */
const WHEEL_TWEEN_MS = 420;

const TIMELINE_HEIGHT = 420;
const TIMELINE_DOT_HEIGHT = 72;

/** Chiều cao header cố định ở khổ mobile (đo được 60px) — khối tên ghim ngay dưới nó. */
const MOBILE_HEAD_OFFSET = 60;

/** Cuộn `el` tới `to` trong `duration` ms. Dùng thay `behavior:"smooth"` để tốc độ
 *  không phụ thuộc quãng đường — bấm tên nào cũng nhảy nhanh như nhau. */
function tweenScrollTop(el: HTMLElement, to: number, duration = WHEEL_TWEEN_MS): () => void {
  const from = el.scrollTop;
  const delta = to - from;
  if (Math.abs(delta) < 1) return () => { };

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
  const cancelMediaTween = useRef<() => void>(() => { });
  const paintRef = useRef<(() => void) | null>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const cancelWheelTween = useRef<() => void>(() => { });
  const wrapRef = useRef<(() => void) | null>(null);
  const suppressWrap = useRef(false);
  /** Ref để scroll handler đọc được selected hiện tại mà không re-create effect. */
  const selectedRef = useRef(0);
  selectedRef.current = safeSelected;
  /** Timer snap-back: cuộn xong 600ms mà không bấm thì tự trở về phần tử đang chọn. */
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | 0>(0);

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

      // Chỉ tính cho các dòng đang trong khung nhìn. Danh sách nhân bản có ~35 dòng
      // nhưng chỉ ~11 dòng nhìn thấy; ghi style cho 24 dòng bị `overflow:hidden` cắt
      // mất là công toi. Dòng ngoài khung giữ nguyên style cũ, khi trôi vào lại thì
      // vòng lặp này đã bao gồm nó rồi.
      const firstVisible = Math.max(0, Math.floor(wheel.scrollTop / ROW_HEIGHT) - 1);
      const lastVisible = Math.min(
        rows.length - 1,
        Math.ceil((wheel.scrollTop + wheel.clientHeight) / ROW_HEIGHT) + 1,
      );

      for (let i = firstVisible; i <= lastVisible; i++) {
        const rowCenter = i * ROW_HEIGHT + ROW_HEIGHT / 2;
        // -1 (mép trên) … 0 (tâm) … 1 (mép dưới)
        const d = Math.max(-1.4, Math.min(1.4, (rowCenter - center) / half));
        const ad = Math.min(Math.abs(d), 1);
        const row = rows[i];
        const inner = row.firstElementChild as HTMLElement | null;
        if (!inner) continue;
        inner.style.transform = `rotateX(${-d * MAX_ANGLE}deg) scale(${1 - ad * 0.55})`;
        // Dòng đang chọn trôi theo bánh xe, nên phải giữ một mức sáng tối thiểu —
        // nếu để mờ theo khoảng cách như các dòng khác thì mất dấu dòng đã bấm.
        const dim = Math.max(0, 1 - ad * 0.72);
        inner.style.opacity = `${row.dataset.selected === "1" ? Math.max(dim, 0.85) : dim}`;
      }

      // Chấm trên thanh dọc bám vị trí cuộn của bánh xe. Dùng phần dư theo một vòng
      // danh sách nên khi vòng lặp nhảy ngầm, chấm không giật — phần dư không đổi.
      const dot = dotRef.current;
      if (dot) {
        const phase = ((center % loopHeight) + loopHeight) % loopHeight;
        const travel = TIMELINE_HEIGHT - TIMELINE_DOT_HEIGHT;
        dot.style.transform = `translateY(${(phase / loopHeight) * travel}px)`;
      }
    };

    // Chạm gần hai rìa thì kéo về giữa dải nhưng GIỮ NGUYÊN pha (phần dư theo một vòng
    // danh sách), nên hình ảnh không đổi — đó là chỗ tạo cảm giác vô tận. Dùng modulo
    // thay vì cộng/trừ một lần, để cú vuốt mạnh cỡ nào cũng về đúng dải.
    const wrap = () => {
      const maxScroll = wheel.scrollHeight - wheel.clientHeight;
      const lo = loopHeight;
      const hi = maxScroll - loopHeight;
      if (hi > lo && (wheel.scrollTop < lo || wheel.scrollTop > hi)) {
        const phase = ((wheel.scrollTop % loopHeight) + loopHeight) % loopHeight;
        const middle = Math.floor((lo + hi) / 2 / loopHeight) * loopHeight;
        wheel.scrollTop = middle + phase;
      }
    };

    // Sau khi user dừng cuộn 600ms mà không bấm chọn, tự tween về phần tử đang chọn.
    const SNAP_DELAY = 600;
    const snapToSelected = () => {
      const sel = selectedRef.current;
      const center = wheel.scrollTop + wheel.clientHeight / 2;
      // Tìm bản sao gần nhất của phần tử đang chọn.
      const copies = loopCopies(count);
      let bestTarget = 0;
      let bestDist = Infinity;
      for (let c = 0; c < copies; c++) {
        const rowIdx = c * count + sel;
        const rowCenter = rowIdx * ROW_HEIGHT + ROW_HEIGHT / 2;
        const t = rowCenter - wheel.clientHeight / 2;
        const dist = Math.abs(t - wheel.scrollTop);
        if (dist < bestDist) {
          bestDist = dist;
          bestTarget = t;
        }
      }
      const maxScroll = wheel.scrollHeight - wheel.clientHeight;
      bestTarget = Math.max(0, Math.min(bestTarget, maxScroll));
      if (Math.abs(bestTarget - wheel.scrollTop) < 1) return; // đã đúng giữa rồi

      suppressWrap.current = true;
      cancelWheelTween.current();
      const stop = tweenScrollTop(wheel, bestTarget);
      cancelWheelTween.current = () => {
        stop();
        suppressWrap.current = false;
      };
      window.setTimeout(() => {
        suppressWrap.current = false;
        wrapRef.current?.();
      }, WHEEL_TWEEN_MS);
    };

    const onScroll = () => {
      // Trong lúc bấm-để-đưa-vào-giữa thì KHÔNG được nhảy vòng: tween đang chạy theo
      // giá trị scrollTop tuyệt đối, nhảy giữa chừng sẽ làm nó lệch đích.
      if (!suppressWrap.current) {
        wrap();
        // Reset idle timer — chỉ snap-back khi user cuộn TỰ DO (không phải tween click).
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(snapToSelected, SNAP_DELAY);
      }
      if (!raf) raf = requestAnimationFrame(paint);
    };

    wheel.addEventListener("scroll", onScroll, { passive: true });
    wrapRef.current = wrap;
    paintRef.current = paint;
    paint();
    return () => {
      wheel.removeEventListener("scroll", onScroll);
      paintRef.current = null;
      if (raf) cancelAnimationFrame(raf);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [loopHeight, count]);

  // Paint chỉ tự chạy khi cuộn; đổi lựa chọn cũng phải vẽ lại để dòng vừa bấm sáng lên.
  useEffect(() => {
    paintRef.current?.();
  }, [safeSelected]);

  // ── Bấm 1 tên: đưa nó vào giữa bánh xe + kéo cột phải tới đúng media ──
  // `loopIdx` là vị trí của ĐÚNG dòng vừa bấm trong danh sách đã nhân bản, nên bánh xe
  // đi quãng ngắn nhất tới chính dòng đó chứ không nhảy sang bản sao khác.
  const handleSelect = useCallback((idx: number, loopIdx: number) => {
    // Huỷ idle snap-back — click đã tự center rồi, không cần snap.
    if (idleTimerRef.current) { clearTimeout(idleTimerRef.current); idleTimerRef.current = 0; }
    setSelected(idx);

    const wheel = wheelRef.current;
    if (wheel) {
      cancelWheelTween.current();
      suppressWrap.current = true;

      let target = loopIdx * ROW_HEIGHT + ROW_HEIGHT / 2 - wheel.clientHeight / 2;
      // Chỉ kẹp theo giới hạn thật của trình duyệt — KHÔNG kẹp theo [lo, hi] nữa.
      // Trước đây kẹp về vùng an toàn của wrap khiến bánh xe cuộn ngược khi bấm tên
      // nằm ngoài dải [lo, hi]. Vì suppressWrap = true suốt lúc tween, wrap không can
      // thiệp; tween xong thì wrap() chuẩn hoá vị trí — cùng pha nên không giật.
      const maxScroll = wheel.scrollHeight - wheel.clientHeight;
      target = Math.max(0, Math.min(target, maxScroll));

      const stop = tweenScrollTop(wheel, target);
      cancelWheelTween.current = () => {
        stop();
        suppressWrap.current = false;
      };
      // Hết tween mới cho phép nhảy vòng trở lại, rồi chuẩn hoá lại vị trí một lần.
      window.setTimeout(() => {
        suppressWrap.current = false;
        wrapRef.current?.();
      }, WHEEL_TWEEN_MS);
    }

    const media = mediaRef.current;
    const mediaTarget = media?.children[idx] as HTMLElement | undefined;
    if (media && mediaTarget) {
      cancelMediaTween.current();
      // Lấy offsetTop thật của ảnh thay vì nhân idx với chiều cao khung — đúng kể cả
      // khi ảnh không còn cao bằng đúng một khung.
      cancelMediaTween.current = tweenScrollTop(media, mediaTarget.offsetTop);
    }
  }, [loopHeight]);

  useEffect(
    () => () => {
      cancelMediaTween.current();
      cancelWheelTween.current();
    },
    [],
  );

  // Danh sách đã nhân bản cho vòng lặp; giữ lại index thật để biết dòng nào được chọn.
  const years = projects.map((p) => p.year);

  const loopRows = Array.from({ length: loopCopies(count) * count }, (_, i) => i % count);

  return (
    <>
      {/* Mobile: danh sách dọc, hiện hết, cuộn như trang bình thường (mẫu Hall of Fame).
          Đổi nhánh bằng CSS thuần — KHÔNG đo `window.innerWidth` bằng state, vì state đó
          khởi tạo sai ở lần render đầu (đã dính đúng lỗi này ở trang /warrenty). */}
      <ShowcaseMobileList projects={projects} />

      {/* Desktop: hai cột cuộn độc lập + bánh xe. */}
      <section className="relative bg-black text-white h-screen overflow-hidden hidden md:block">
        <div className="h-full overflow-hidden z-40" style={{ paddingTop: "80px" }}>

          {/* Noise */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:4px_4px] pointer-events-none" />

          <div className="h-full flex flex-row">

            {/* ═══ TRÁI — bánh xe tên ═══ */}
            <div
              className="w-[62%] h-full relative flex items-center justify-start"
              style={{ paddingLeft: "clamp(16px, 4vw, 320px)", paddingRight: "clamp(16px, 4vw, 80px)" }}
            >
              {/* Thanh chỉ vị trí — chấm bám vị trí cuộn của bánh xe (xem `paint`),
                chạy vòng theo danh sách vì bánh xe lặp vô tận. */}
              <div className="absolute left-28 top-1/2 -translate-y-1/2">
                <div className="relative w-px bg-white/20" style={{ height: `${TIMELINE_HEIGHT}px` }}>
                  <div
                    ref={dotRef}
                    className="absolute left-1/2 w-[5px] bg-white rounded-full"
                    style={{ height: `${TIMELINE_DOT_HEIGHT}px`, marginLeft: "-2.5px" }}
                  />
                </div>
              </div>

              <div style={{ width: "100%", paddingLeft: "100px" }}>
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
                        onSelect={() => handleSelect(realIdx, i)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* ═══ GIỮA — YEAR ═══ */}
              {/* Chữ YEAR đứng yên; chỉ số năm chạy dọc như cột ảnh bên phải. */}
              <div className="absolute right-[60px] top-1/2 -translate-y-1/2">
                <div style={yearLabelStyle}>{yearText}</div>
                <YearReel years={years} index={safeSelected} />
                <div style={{ ...yearLabelStyle, marginTop: "44px" }}>{yearText}</div>
                <YearReel years={years} index={safeSelected} />
              </div>
            </div>

            {/* ═══ PHẢI — chồng ảnh, cuộn riêng ═══ */}
            <div className="w-[38%] h-full absolute inset-y-0 right-0">
              <div ref={mediaRef} className="showcase-media-scroller">
                {projects.map((p, i) => (
                  <div key={i} className="showcase-media-item">
                    <SlideMedia slide={p} priority={i === 0} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Nhánh mobile: mỗi slide là một khối xếp dọc (tên → PIECE/YEAR → media), cuộn bằng
 * chính thanh cuộn của trang. Không sticky, không bánh xe, không vùng cuộn lồng nhau —
 * trên màn hình hẹp mấy thứ đó chỉ gây khó chịu.
 */
function ShowcaseMobileList({ projects }: { projects: Slide[] }) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const current = projects[Math.min(active, projects.length - 1)];

  // Ảnh nào đang xem thì khối tên ghim ở trên hiển thị tên ảnh đó.
  //
  // Thu `root` thành đúng MỘT đường ngang giữa phần nhìn thấy (dưới header), rồi hỏi
  // ảnh nào cắt đường đó. Cách này luôn cho đúng một đáp án. Bản trước dùng ngưỡng tỉ lệ
  // hiển thị nên có đoạn hai ảnh cùng ló mà không ảnh nào vượt ngưỡng ⇒ tên đứng im, đo
  // được lệch ở y=800 và y=1600.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    let observer: IntersectionObserver | null = null;

    const attach = () => {
      observer?.disconnect();
      const lineY = MOBILE_HEAD_OFFSET + (window.innerHeight - MOBILE_HEAD_OFFSET) / 2;
      observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
          }
        },
        { rootMargin: `-${lineY}px 0px -${Math.max(window.innerHeight - lineY - 1, 0)}px 0px`, threshold: 0 },
      );
      for (const child of Array.from(list.children)) observer.observe(child);
    };

    attach();
    window.addEventListener("resize", attach);
    return () => {
      window.removeEventListener("resize", attach);
      observer?.disconnect();
    };
  }, [projects.length]);

  return (
    <section className="md:hidden bg-black text-white" style={{ paddingBottom: "24px" }}>
      {/* Khối tên ghim lại dưới header; nội dung cuộn qua bên dưới nó. */}
      <div
        className="sticky z-30 bg-black"
        style={{ top: `${MOBILE_HEAD_OFFSET}px`, paddingTop: "16px", paddingLeft: "16px", paddingRight: "16px", paddingBottom: "12px" }}
      >
        <h2
          className="text-center"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(18px, 6vw, 28px)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          <span style={{ position: "relative", display: "inline-block", padding: "0 16px" }}>
            <SelectionCorners />
            {current.title}
          </span>
        </h2>

        {/* Hàng PIECE / YEAR giống bố cục mẫu khách gửi */}
        <div
          className="flex items-baseline justify-between"
          style={{ paddingTop: "18px", borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: "8px" }}
        >
          <span style={labelStyle}>PIECE</span>
          <span style={labelStyle}>{current.yearLabel || DEFAULT_YEAR_LABEL}</span>
        </div>
        <div className="flex items-baseline justify-between" style={{ paddingTop: "8px" }}>
          <span style={valueStyle}>{current.subtitle}</span>
          <span style={valueStyle}>{current.year}</span>
        </div>
      </div>

      <div ref={listRef}>
        {projects.map((p, i) => (
          <div
            key={i}
            data-index={i}
            className="w-full flex items-center justify-center overflow-hidden"
            style={{ paddingLeft: "16px", paddingRight: "16px", paddingTop: "20px" }}
          >
            <SlideMedia slide={p} priority={i === 0} />
          </div>
        ))}
      </div>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "10px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.45)",
};

const valueStyle: React.CSSProperties = {
  fontFamily: "var(--font-montserrat)",
  fontSize: "13px",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.9)",
};

const yearLabelStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "24px",
  fontStyle: "italic",
  fontWeight: 400,
  color: "rgba(255,255,255,0.6)",
};

/** Chiều cao một dòng số năm — cũng là chiều cao khung nhìn của cuộn năm. */
const YEAR_LINE_HEIGHT = 44;

/**
 * Số năm dạng "cuộn": xếp dọc tất cả năm rồi trượt tới năm đang chọn, cùng kiểu chuyển
 * động với cột ảnh bên phải. Khung `overflow: hidden` nên người dùng không tự cuộn được
 * — chỉ đổi khi bấm chọn.
 */
function YearReel({ years, index }: { years: string[]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const cancel = useRef<() => void>(() => { });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    cancel.current();
    cancel.current = tweenScrollTop(el, index * YEAR_LINE_HEIGHT);
    return () => cancel.current();
  }, [index]);

  return (
    <div ref={ref} className="showcase-year-reel" style={{ height: `${YEAR_LINE_HEIGHT}px` }}>
      {years.map((y, i) => (
        <div
          key={i}
          className="flex items-center"
          style={{ height: `${YEAR_LINE_HEIGHT}px`, fontFamily: "var(--font-display)", fontSize: "34px", fontWeight: 700 }}
        >
          {y}
        </div>
      ))}
    </div>
  );
}

/**
 * Media của một slide: ảnh, video đã upload, hoặc link YouTube/Google Drive.
 *
 * `mediaType` là nguồn tin chính; slide lưu trước khi có field này thì đoán theo đuôi
 * file / dạng link, nên dữ liệu cũ không cần sửa tay vẫn hiển thị đúng.
 */
function SlideMedia({ slide, priority }: { slide: Slide; priority: boolean }) {
  const src = slide.image;
  if (!src) return null;

  const isVideo = slide.mediaType ? slide.mediaType === "video" : looksLikeVideo(src);
  const mediaClass =
    "object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.06)] select-none max-w-[90%] max-h-[90%] md:max-w-full md:max-h-[95%]";

  if (!isVideo) {
    return (
      <Image
        src={src}
        alt={slide.title}
        width={600}
        height={800}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 38vw"
        className={mediaClass}
      />
    );
  }

  const youtubeId = getYouTubeId(src);
  if (youtubeId) {
    return (
      <iframe
        // `mute=1` bắt buộc, nếu không trình duyệt chặn autoplay.
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&rel=0&modestbranding=1&playsinline=1`}
        title={slide.title}
        allow="autoplay; encrypted-media"
        className="w-full aspect-video border-0 pointer-events-none"
      />
    );
  }

  return (
    <video
      src={getGoogleDriveDirectLink(src) ?? src}
      // muted + playsInline là điều kiện để autoplay không bị chặn.
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className={mediaClass}
    />
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
      <span className="showcase-row-inner">
        <span
          style={{
            position: "relative",
            display: "inline-block",
            padding: "0 18px",
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
            letterSpacing: isSelected ? "0.05em" : "0.16em",
            fontSize: "clamp(15px, 2.05vw, 30px)",
            lineHeight: 1.15,
            color: isSelected ? "#fff" : "rgba(255,255,255,0.75)",
          }}
        >
          {isSelected && <SelectionCorners />}
          {label}
        </span>
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
