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
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black"
          style={{ cursor: "none" }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Wrapper: translateZ(0) forces GPU layer → prevents 3D alias artifact */}
            <div
              style={{
                transform: "translateZ(0)",
                willChange: "transform",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.gif"
                alt="GODG1FT JEWELRY"
                className="select-none pointer-events-none"
                style={{
                  width: 192,
                  maxWidth: "80vw",
                  height: "auto",
                  display: "block",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              />
            </div>
            <motion.span
              className="text-[10px] tracking-[0.4em] text-white/50 uppercase"
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
