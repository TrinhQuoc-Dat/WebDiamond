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
  
  // State mới để lưu timestamp, dùng để reset ảnh GIF
  const [gifTimestamp, setGifTimestamp] = useState<number>(0);

  const blurAnimationRef = useRef<Animation | null>(null);
  const isFirstLoad = useRef(true);
  
  const GIF_DURATION = 2320;
  const START_DELAY = 150;

  useEffect(() => {
    setMounted(true);
    // Khởi tạo timestamp cho lần đầu tiên tải trang
    setGifTimestamp(Date.now());
  }, []);

  // ── Intro: hiện khi vào trang chủ "/" ──
  useEffect(() => {
    if (!mounted) return;
    
    // Nếu không phải trang chủ, hoặc không phải lần đầu load web thì bỏ qua
    if (pathname !== "/" || !isFirstLoad.current) return;
    
    isFirstLoad.current = false; // Đánh dấu đã chạy xong lần đầu

    const wrapper = document.getElementById("main-content-wrapper");
    if (wrapper) {
      wrapper.style.filter = "blur(20px)";
      wrapper.style.transition = "filter 0.3s ease";
    }
    document.body.style.overflow = "hidden";

    setTimeout(() => setIsVisible(true), START_DELAY);

    const t = setTimeout(() => {
      setIsVisible(false);
      if (wrapper) {
        blurAnimationRef.current?.cancel();
        wrapper.style.filter = "none";
      }
      document.body.style.overflow = "";
    }, GIF_DURATION + START_DELAY + 100);
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
      blurAnimationRef.current?.cancel();
      wrapper.style.filter = "none";
    }
  };

  const animateBlur = () => {
    const wrapper = document.getElementById("main-content-wrapper");
    if (!wrapper) return;

    blurAnimationRef.current = wrapper.animate(
      [
        { filter: "blur(0px)", offset: 0 },
        { filter: "blur(20px)", offset: 0.3 },
        { filter: "blur(50px)", offset: 0.5 },
        { filter: "blur(70px)", offset: 0.6 },
        { filter: "blur(40px)", offset: 0.7 },
        { filter: "blur(30px)", offset: 0.8 },
        { filter: "blur(20px)", offset: 0.9 },
        { filter: "blur(10px)", offset: 0.95 },
        { filter: "blur(0px)", offset: 1 },
      ],
      {
        duration: 2320,
        easing: "ease-in-out",
        fill: "forwards",
      }
    );
  };

  // Thêm 1 ref để quản lý timeout của việc show overlay
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTransitionRequest = useCallback(
    (href: string) => {
      if (pathnameRef.current === href) return;

      // 🔥 RESET GIF TẠI ĐÂY bằng cách cập nhật timestamp mới
      setGifTimestamp(Date.now());

      blurAnimationRef.current?.cancel();
      animateBlur();
      document.body.style.overflow = "hidden";

      // Clear timeout cũ nếu người dùng click quá nhanh
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);

      showTimerRef.current = setTimeout(() => setIsVisible(true), START_DELAY);
      
      transitionTimerRef.current = setTimeout(() => {
        setIsVisible(false);
        blurWrapper(false);
        document.body.style.overflow = "";
      }, GIF_DURATION + START_DELAY + 100);
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
    <div className="fixed inset-0 z-[99999] overflow-hidden bg-transparent">
      {/* Logo GIF full cover */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        // 🔥 Thêm timestamp vào URL để bắt buộc trình duyệt load và chạy lại GIF từ đầu
        src={gifTimestamp ? `/logo.gif?t=${gifTimestamp}` : "/logo.gif"}
        alt="GODG1FT JEWELRY"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        style={{
          animation: "logoTransitionIn 0.5s ease-out forwards",
        }}
      />

      <style>{`
        @keyframes logoTransitionIn {
          0% { transform: scale(0.6); opacity: 0.3; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}