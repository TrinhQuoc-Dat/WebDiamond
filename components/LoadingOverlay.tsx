"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingOverlay() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show loader on path change
    setIsVisible(true);
    
    // Lock scroll
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 1500); // minimum 1.5 seconds

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black"
          style={{ cursor: "none" }}
        >
          {/* Logo animation / GIF */}
          <div className="relative flex flex-col items-center gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.gif"
              alt="GODG1FT JEWELRY"
              className="w-48 h-auto max-w-[80vw] object-contain select-none pointer-events-none"
            />
            {/* Elegant subtext loading bar or letters */}
            <motion.span
              className="text-[10px] tracking-[0.4em] text-white/50 uppercase block mt-2"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              style={{ fontFamily: "var(--font-sans)", fontWeight: 500 }}
            >
              Loading Atelier
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
