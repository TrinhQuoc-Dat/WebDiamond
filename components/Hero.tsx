"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Helper functions for external video link parsing (YouTube & Google Drive)
const getYouTubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const getGoogleDriveDirectLink = (url: string) => {
  if (!url) return null;
  const match = url.match(/\/file\/d\/([^\/]+)/) || url.match(/[?&]id=([^&]+)/);
  if (match && match[1]) {
    return `https://docs.google.com/uc?export=download&id=${match[1]}`;
  }
  return null;
};

const MotionLink = motion.create(Link);

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [banner, setBanner] = useState<{ title: string; subtitle: string; image: string; link: string; type?: "image" | "video"; muted?: boolean } | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Đọc dữ liệu banner động từ LocalStorage ở phía client-side
  useEffect(() => {
    try {
      const stored = localStorage.getItem("wd_banners");
      if (stored) {
        const list = JSON.parse(stored);
        const active = list.find((b: any) => b.active);
        if (active) {
          setBanner({
            title: active.title || "WebDiamond",
            subtitle: active.subtitle || "Shop All",
            image: active.image || "/hero.png",
            type: active.type || "image",
            link: active.link || "/shop",
            muted: active.muted !== false
          });
        }
      }
    } catch (e) {
      console.error("Lỗi đọc banner từ localStorage ở trang chủ", e);
    }
  }, []);

  // Cập nhật trạng thái tắt tiếng ban đầu dựa theo cấu hình của Banner
  useEffect(() => {
    if (banner) {
      setIsMuted(banner.muted !== false);
    }
  }, [banner]);

  // Hỗ trợ tự động bật âm thanh thông minh sau tương tác đầu tiên của khách hàng
  useEffect(() => {
    if (!banner || banner.type !== "video" || banner.muted === true) return;

    const handleInteraction = () => {
      // Bật âm thanh (unmute) thông qua React state để re-render YouTube iframe và thẻ video
      setIsMuted(false);

      // Đồng thời tác động trực tiếp vào DOM của thẻ video bản địa HTML5 để phát tiếng ngay lập tức
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;
        videoRef.current.play().catch((err) => {
          console.log("Không thể tự động phát video có tiếng, giữ chế độ tắt tiếng:", err);
        });
      }

      // Hủy sự kiện sau lần kích hoạt đầu tiên
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };

    // Chỉ lắng nghe click bật âm thanh nếu hiện tại đang bị muted (do bị trình duyệt chặn autoplay)
    if (isMuted) {
      window.addEventListener("click", handleInteraction, { passive: true });
      window.addEventListener("touchstart", handleInteraction, { passive: true });
    }

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [banner, isMuted]);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, []);

  // Subtle parallax on scroll
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  // Sử dụng dữ liệu động nếu có, ngược lại sử dụng dữ liệu mặc định từ main (video /videobanner.mp4)
  const isVideoBanner = banner ? banner.type === "video" : true;
  const bannerImage = banner?.image || "/videobanner.mp4";
  const bannerText = banner?.subtitle || "Shop All";
  const bannerLink = banner?.link || "#collections";

  return (
    <motion.section
      ref={ref}
      className="relative w-full h-screen overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* ── Full-bleed product image / video ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ scale: imageScale, y: imageY }}
      >
        {isVideoBanner ? (
          (() => {
            const youtubeId = getYouTubeId(bannerImage);
            const driveDirectLink = getGoogleDriveDirectLink(bannerImage);
            
            if (youtubeId) {
              return (
                <div className="w-full h-full relative overflow-hidden pointer-events-none">
                  <iframe
                    ref={iframeRef}
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&enablejsapi=1&modestbranding=1&playsinline=1`}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "105vw",
                      height: "59.06vw", // 105 * 9 / 16
                      minHeight: "105vh",
                      minWidth: "186.66vh", // 105 * 16 / 9
                      border: "none"
                    }}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    frameBorder="0"
                  />
                </div>
              );
            }
            
            return (
              <video
                ref={(el) => {
                  (videoRef as any).current = el;
                  if (el) {
                    if (banner?.muted === false) {
                      // Nếu cấu hình bật tiếng, thử phát unmuted
                      el.muted = isMuted;
                      const playPromise = el.play();
                      if (playPromise !== undefined) {
                        playPromise.catch(() => {
                          // Bị chặn unmuted, fallback tắt tiếng để autoplay tiếp tục
                          el.muted = true;
                          setIsMuted(true);
                          el.play().catch((err) => console.log("Lỗi fallback video:", err));
                        });
                      }
                    } else {
                      // Mặc định tắt tiếng
                      el.muted = true;
                    }
                  }
                }}
                src={driveDirectLink || bannerImage}
                autoPlay
                loop
                playsInline
                className="w-full h-full object-cover object-center"
              />
            );
          })()
        ) : (
          <Image
            src={bannerImage}
            alt="WebDiamond — signature jewelry piece"
            fill
            priority
            quality={95}
            className="object-cover object-center"
            sizes="100vw"
            unoptimized={bannerImage.startsWith("http")} // Tránh Next.js Image Optimization lỗi với ảnh Unsplash động
          />
        )}
      </motion.div>

      {/* ── Edge vignette ── */}
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
        <motion.a
          href={bannerLink}
          className="group relative"
          id="hero-shop-all"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <span
            className="block text-white font-bold leading-none tracking-[0.06em] uppercase select-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 3.5vw, 3.5rem)",
              letterSpacing: "0.15em",
              WebkitTextStroke: "2px white",
              textShadow: "0 0 20px rgba(255,255,255,0.15)",
            }}
          >
            {bannerText}
          </span>

          {/* Hover underline */}
          <motion.span
            className="absolute -bottom-2 left-0 h-[2px] bg-white origin-left"
            initial={{ scaleX: 0 }}
            variants={{ hover: { scaleX: 1 } }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </motion.a>
      </motion.div>
    </motion.section>
  );
}
