"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingOverlay() {
  const pathname = usePathname();
  // false on server → no SSR/client mismatch
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    setIsVisible(true);
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 1200);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [pathname, mounted]);

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[99999] overflow-hidden bg-black"
        >
          <img
            src="/logo.gif"
            alt="GODG1FT JEWELRY"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          />

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <motion.span
              className="text-[10px] tracking-[0.4em] text-white/50 uppercase"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Loading Atelier
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
