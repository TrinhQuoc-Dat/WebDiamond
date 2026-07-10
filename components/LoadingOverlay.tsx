"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Event bus (giữ lại để không phá các import ở file khác) ──
type TransitionListener = (href: string) => void;
const listeners = new Set<TransitionListener>();
export function triggerPageTransition(href: string) {
  listeners.forEach((fn) => fn(href));
}

export default function LoadingOverlay() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hiện intro mỗi khi vào trang Home "/"
  useEffect(() => {
    if (!mounted) return;
    if (pathname !== "/") return;

    document.body.style.overflow = "hidden";
    setIsVisible(true);

    const t = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 2000);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [mounted, pathname]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro-loader"
          className="fixed inset-0 z-[99999] overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Logo GIF full cover */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.gif"
            alt="GODG1FT JEWELRY"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          />

          {/* Loading text */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.span
              className="text-[10px] tracking-[0.4em] text-white/50 uppercase"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Loading Atelier
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
