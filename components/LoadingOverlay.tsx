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
  const prevPathRef = useRef<string>("/");

  useEffect(() => {
    setMounted(true);
  }, []);

  // ── Intro: hiện khi vào trang chủ "/" ──
  useEffect(() => {
    if (!mounted) return;
    if (pathname !== "/") return;

    const wrapper = document.getElementById("main-content-wrapper");
    if (wrapper) {
      wrapper.style.filter = "blur(20px)";
      wrapper.style.transition = "filter 0.3s ease";
    }
    document.body.style.overflow = "hidden";

    setTimeout(() => setIsVisible(true), 150);

    const t = setTimeout(() => {
      setIsVisible(false);
      if (wrapper) wrapper.style.filter = "none";
      document.body.style.overflow = "";
    }, 2220);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [mounted, pathname]);

  // ── Lắng nghe event bus: khi navigate từ homepage ra trang khác ──
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  const blurWrapper = (blur: boolean) => {
    const wrapper = document.getElementById("main-content-wrapper");
    if (!wrapper) return;
    if (blur) {
      wrapper.style.filter = "blur(20px)";
      wrapper.style.transition = "filter 0.3s ease";
    } else {
      wrapper.style.filter = "none";
    }
  };

  const handleTransitionRequest = useCallback(
    (href: string) => {
      if (pathnameRef.current !== "/") return;
      if (href === "/") return;

      blurWrapper(true);
      document.body.style.overflow = "hidden";

      setTimeout(() => setIsVisible(true), 150);

      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = setTimeout(() => {
        setIsVisible(false);
        blurWrapper(false);
        document.body.style.overflow = "";
      }, 2220);
    },
    []
  );

  useEffect(() => {
    listeners.add(handleTransitionRequest);
    return () => {
      listeners.delete(handleTransitionRequest);
    };
  }, [handleTransitionRequest]);

  if (!mounted) return null;

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] overflow-hidden bg-black"
    >
      {/* Logo GIF full cover */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.gif"
        alt="GODG1FT JEWELRY"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        style={{
          animation: "logoTransitionIn 0.5s ease-out forwards",
        }}
      />

      {/* Loading text */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <span
          className="text-[10px] tracking-[0.4em] text-white/50 uppercase animate-pulse"
        >
          Loading Atelier
        </span>
      </div>

      <style>{`
        @keyframes logoTransitionIn {
          0% { transform: scale(0.6); opacity: 0.3; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
