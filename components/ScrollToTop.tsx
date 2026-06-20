"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const smoothScrollTo = (element: Window | Element, target: number, duration: number) => {
  const start = element === window 
    ? (window.scrollY || document.documentElement.scrollTop || document.body.scrollTop)
    : (element as HTMLElement).scrollTop;
  
  const change = target - start;
  const startTime = performance.now();

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing: easeInOutCubic (mượt mà, tăng tốc nhẹ ở giữa và giảm tốc từ từ khi gần đến đích)
    const easeInOutCubic = (t: number) => 
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    
    const currentScroll = start + change * easeInOutCubic(progress);

    if (element === window) {
      window.scrollTo(0, currentScroll);
    } else {
      (element as HTMLElement).scrollTop = currentScroll;
    }

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Check window scroll height
      const windowScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

      // Check admin main content scroll height
      const adminMain = document.querySelector(".admin-layout main") || document.querySelector("main.overflow-y-auto");
      const adminScroll = adminMain ? adminMain.scrollTop : 0;

      // Use the maximum scroll value
      const maxScroll = Math.max(windowScroll, adminScroll);

      if (maxScroll > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Sử dụng capture phase (đối số thứ 3 là true) để bắt các sự kiện cuộn từ các thẻ con (như <main overflow-y-auto>)
    window.addEventListener("scroll", toggleVisibility, true);
    return () => window.removeEventListener("scroll", toggleVisibility, true);
  }, []);

  const scrollToTop = () => {
    const adminMain = document.querySelector(".admin-layout main") || document.querySelector("main.overflow-y-auto");
    
    // Nếu đang ở trang admin và adminMain đang cuộn
    if (adminMain && adminMain.scrollTop > 0) {
      smoothScrollTo(adminMain, 0, 800); // Cuộn mượt trong 800ms
    } else {
      // Cuộn window (cho trang bán hàng thông thường)
      smoothScrollTo(window, 0, 800); // Cuộn mượt trong 800ms
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[9999] flex items-center justify-center w-12 h-12 bg-black/80 hover:bg-[#D4AF37] text-white hover:text-black border border-[#D4AF37] hover:border-[#D4AF37] rounded-full shadow-2xl transition-all duration-300 group"
          style={{ cursor: "pointer" }}
          title="Cuộn lên đầu trang"
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
