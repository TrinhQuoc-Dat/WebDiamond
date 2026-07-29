"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";

// ── Event bus: trigger hiệu ứng chuyển trang từ Homepage ──
type TransitionListener = (href: string) => void;
const listeners = new Set<TransitionListener>();

export function triggerPageTransition(href: string) {
  listeners.forEach((fn) => fn(href));
}

export default function LoadingOverlay() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // ── Blob URL technique: preload GIF data vào RAM 1 lần,
  //    mỗi lần cần restart tạo blob URL mới → browser coi như ảnh hoàn toàn mới → chạy từ frame 1
  const gifDataRef = useRef<ArrayBuffer | null>(null);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const prevBlobUrlRef = useRef<string | null>(null);
  const isFirstLoad = useRef(true);

  // GIF thực tế: 50 frames × 40ms = 2000ms cho đúng 1 vòng
  const GIF_DURATION = 2000;

  // Preload GIF data vào memory 1 lần duy nhất
  useEffect(() => {
    setMounted(true);
    fetch("/GG Logo fly_Faster_1.gif")
      .then((r) => r.arrayBuffer())
      .then((buffer) => {
        gifDataRef.current = buffer;
      })
      .catch((err) => console.error("Lỗi preload GIF:", err));
  }, []);

  // Tạo blob URL mới từ data đã cache trong RAM (instant, 0 network)
  const createFreshGifUrl = useCallback(() => {
    // Revoke URL cũ để tránh memory leak
    if (prevBlobUrlRef.current) {
      URL.revokeObjectURL(prevBlobUrlRef.current);
    }

    if (gifDataRef.current) {
      const blob = new Blob([gifDataRef.current], { type: "image/gif" });
      const url = URL.createObjectURL(blob);
      prevBlobUrlRef.current = url;
      return url;
    }

    // Fallback nếu preload chưa xong
    return `/GG Logo fly_Faster_1.gif?t=${Date.now()}`;
  }, []);

  // Cleanup blob URL khi unmount
  useEffect(() => {
    return () => {
      if (prevBlobUrlRef.current) {
        URL.revokeObjectURL(prevBlobUrlRef.current);
      }
    };
  }, []);

  // ── Intro: hiện khi vào trang chủ "/" ──
  useEffect(() => {
    if (!mounted) return;
    if (pathname !== "/" || !isFirstLoad.current) return;

    isFirstLoad.current = false;

    const wrapper = document.getElementById("main-content-wrapper");
    if (wrapper) {
      wrapper.style.willChange = "filter, opacity";
      wrapper.style.filter = "blur(16px)";
      wrapper.style.opacity = "0.6";
      wrapper.style.transition = "filter 0.3s ease, opacity 0.3s ease";
    }
    document.body.style.overflow = "hidden";

    // Tạo blob URL mới → GIF chạy từ frame 1
    setGifUrl(createFreshGifUrl());
    setIsVisible(true);

    // Sau GIF xong 1 vòng → ẩn overlay ngay + unblur nền mượt
    const t = setTimeout(() => {
      setIsVisible(false);
      if (wrapper) {
        wrapper.style.transition = "filter 0.5s ease, opacity 0.5s ease";
        wrapper.style.filter = "none";
        wrapper.style.opacity = "1";
        setTimeout(() => {
          if (wrapper) wrapper.style.willChange = "auto";
        }, 600);
      }
      document.body.style.overflow = "";
    }, GIF_DURATION);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [mounted, pathname, createFreshGifUrl]);

  // ── Lắng nghe event bus: khi navigate từ homepage ra trang khác ──
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  const handleTransitionRequest = useCallback(
    (href: string) => {
      if (pathnameRef.current === href) return;

      // Tạo blob URL hoàn toàn mới → GIF chạy từ frame 1
      setGifUrl(createFreshGifUrl());

      // Blur wrapper
      const wrapper = document.getElementById("main-content-wrapper");
      if (wrapper) {
        wrapper.style.willChange = "filter, opacity";
        wrapper.style.transition = "filter 0.3s ease, opacity 0.3s ease";
        wrapper.style.filter = "blur(16px)";
        wrapper.style.opacity = "0.6";
      }
      document.body.style.overflow = "hidden";

      // Clear timeout cũ
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);

      setIsVisible(true);

      // Sau GIF xong 1 vòng → ẩn overlay ngay + unblur nền mượt
      transitionTimerRef.current = setTimeout(() => {
        setIsVisible(false);
        if (wrapper) {
          wrapper.style.transition = "filter 0.5s ease, opacity 0.5s ease";
          wrapper.style.filter = "none";
          wrapper.style.opacity = "1";
          setTimeout(() => {
            if (wrapper) wrapper.style.willChange = "auto";
          }, 600);
        }
        document.body.style.overflow = "";
      }, GIF_DURATION);
    },
    [createFreshGifUrl]
  );

  useEffect(() => {
    listeners.add(handleTransitionRequest);
    return () => {
      listeners.delete(handleTransitionRequest);
    };
  }, [handleTransitionRequest]);

  if (!mounted) return null;
  if (!isVisible || !gifUrl) return null;

  return (
    <div className="fixed inset-0 z-[99999] overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={gifUrl}
        alt="GODG1FT JEWELRY"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />
    </div>
  );
}