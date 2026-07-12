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

    document.body.style.overflow = "hidden";
    setIsVisible(true);

    const t = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 2620);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [mounted, pathname]);

  // ── Lắng nghe event bus: khi navigate từ homepage ra trang khác ──
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  const handleTransitionRequest = useCallback(
    (href: string) => {
      if (pathnameRef.current !== "/") return;
      if (href === "/") return;

      document.body.style.overflow = "hidden";
      setIsVisible(true);

      // Hiện overlay đúng 2620ms giống y intro trang chủ
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = "";
      }, 2620);
    },
    [] // Không phụ thuộc pathname → callback ổn định, timer không bị clear
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
      {/* Logo GIF full cover — không hiệu ứng, hiện nguyên bản */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.gif"
        alt="GODG1FT JEWELRY"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />

      {/* Loading text */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <span
          className="text-[10px] tracking-[0.4em] text-white/50 uppercase animate-pulse"
        >
          Loading Atelier
        </span>
      </div>
    </div>
  );
}
