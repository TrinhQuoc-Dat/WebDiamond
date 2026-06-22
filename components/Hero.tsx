"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

// Parse Google Drive share link → direct download URL
const getGoogleDriveDirectLink = (url: string): string | null => {
  const match = url.match(/\/file\/d\/([^/]+)/) || url.match(/[?&]id=([^&]+)/);
  return match?.[1]
    ? `https://docs.google.com/uc?export=download&id=${match[1]}`
    : null;
};

// Parse YouTube share/watch link → video ID
const getYouTubeId = (url: string): string | null => {
  const match = url.match(
    /(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]{11})/
  );
  return match?.[1] ?? null;
};

type BannerData = {
  title: string;
  subtitle: string;
  image: string;
  link: string;
  type: "image" | "video";
  muted: boolean;
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [banner, setBanner] = useState<BannerData | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Read active banner from localStorage (client-only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("wd_banners");
      if (stored) {
        const list = JSON.parse(stored) as Array<Partial<BannerData> & { active?: boolean }>;
        const active = list.find((b) => b.active);
        console.log("active", active);

        if (active) {
          setBanner({
            title: active.title ?? "GODG1FT",
            subtitle: active.subtitle ?? "Shop All",
            image: active.image ?? "/videobanner.mp4",
            type: active.type ?? "video",
            link: active.link ?? "/shop",
            muted: active.muted !== false,
          });
        }
      }
    } catch {
      // localStorage unavailable — defaults will be used
    }
  }, []);

  // Sync mute state with banner config
  useEffect(() => {
    if (banner) setIsMuted(banner.muted);
  }, [banner]);

  // Unmute on first user interaction
  useEffect(() => {
    if (!banner || banner.type !== "video") return;

    const handleInteraction = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1;
        videoRef.current.play().then(() => {
          // Phát thành công -> Cập nhật UI và gỡ bỏ sự kiện
          setIsMuted(false);
          window.removeEventListener("click", handleInteraction);
          window.removeEventListener("touchstart", handleInteraction);
          window.removeEventListener("scroll", handleInteraction);
          window.removeEventListener("keydown", handleInteraction);
        }).catch(() => {
          // Trình duyệt chặn (thường do timeout 3s) -> Giữ nguyên trạng thái để chờ click
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        });
      } else {
        setIsMuted(false);
        window.removeEventListener("click", handleInteraction);
        window.removeEventListener("touchstart", handleInteraction);
        window.removeEventListener("scroll", handleInteraction);
        window.removeEventListener("keydown", handleInteraction);
      }
    };

    if (isMuted) {
      window.addEventListener("click", handleInteraction, { passive: true });
      window.addEventListener("touchstart", handleInteraction, { passive: true });
      window.addEventListener("scroll", handleInteraction, { passive: true });
      window.addEventListener("keydown", handleInteraction, { passive: true });
      
      const timer = setTimeout(() => {
        handleInteraction();
      }, 3000);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("click", handleInteraction);
        window.removeEventListener("touchstart", handleInteraction);
        window.removeEventListener("scroll", handleInteraction);
        window.removeEventListener("keydown", handleInteraction);
      };
    }
  }, [banner, isMuted]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  // Resolved values with defaults
  const isVideo = banner ? banner.type === "video" : true;
  const src = banner?.image ?? "/videobanner.mp4";
  const labelText = banner?.subtitle ?? "Shop All";
  const linkHref = banner?.link ?? "/shop";

  // Video sub-type helpers
  const youtubeId = isVideo ? getYouTubeId(src) : null;
  const driveLink = isVideo && !youtubeId ? getGoogleDriveDirectLink(src) : null;

  return (
    <motion.section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* ── Full-bleed media ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ scale: imageScale, y: imageY }}
      >
        {isVideo ? (
          youtubeId ? (
            // YouTube embed
            <div className="w-full h-full relative overflow-hidden pointer-events-none">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${youtubeId}&controls=0&rel=0&modestbranding=1&playsinline=1`}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "105vw",
                  height: "59.06vw",
                  minHeight: "105vh",
                  minWidth: "186.66vh",
                  border: "none",
                }}
                allow="autoplay; encrypted-media"
                frameBorder="0"
              />
            </div>
          ) : (
            // Local / Google Drive video
            <video
              ref={videoRef}
              src={driveLink ?? src}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              className="w-full h-full object-cover object-center"
            />
          )
        ) : (
          // Static image
          <Image
            src={src}
            alt="GODG1FT — signature jewelry piece"
            fill
            priority
            quality={95}
            className="object-cover object-center"
            sizes="100vw"
            unoptimized={src.startsWith("http")}
          />
        )}
      </motion.div>

      {/* ── Dark Gradient Overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(0,0,0,0.55) 0%,
              rgba(0,0,0,0.30) 40%,
              rgba(0,0,0,0.45) 100%
            )
          `,
        }}
      />

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* ── Top fade ── */}
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.50), transparent)" }}
      />

      {/* ── Bottom fade ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.70), transparent)" }}
      />

      {/* ── Centre CTA ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ y: contentY }}
      >
        <motion.a
          href={linkHref}
          className="group relative"
          id="hero-shop-all"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <span
            className="block text-white font-bold uppercase select-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 3.5vw, 3.5rem)",
              letterSpacing: "0.15em",
              WebkitTextStroke: "2px white",
              textShadow: `
                0 2px 8px rgba(0,0,0,0.8),
                0 8px 24px rgba(0,0,0,0.75),
                0 20px 60px rgba(0,0,0,0.65),
                0 0 40px rgba(255,255,255,0.12)
              `,
              filter: "drop-shadow(0 12px 30px rgba(0,0,0,0.7))",
            }}
          >
            {labelText}
          </span>

          <motion.span
            className="absolute -bottom-2 left-0 right-0 h-[2px] bg-white origin-left"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </motion.a>
      </motion.div>

      {/* ── Audio Control Button ── */}
      {isVideo && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isMuted) {
              if (videoRef.current) {
                videoRef.current.muted = false;
                videoRef.current.volume = 1;
                videoRef.current.play().catch(() => {});
              }
              setIsMuted(false);
            } else {
              if (videoRef.current) {
                videoRef.current.muted = true;
              }
              setIsMuted(true);
            }
          }}
          className="absolute bottom-6 right-6 z-50 p-3 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white backdrop-blur-md transition-all flex items-center justify-center cursor-pointer group"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 opacity-70 group-hover:opacity-100">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>
          ) : (
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 opacity-70 group-hover:opacity-100">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>
          )}
        </button>
      )}
    </motion.section>
  );
}
