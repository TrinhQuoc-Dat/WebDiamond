"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollIndicator() {
  const { scrollY } = useScroll();
  
  // Opacity giảm dần từ 1 -> 0 khi scroll được 100px
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);
  // Tắt tương tác click khi đã cuộn (ẩn)
  const pointerEvents = useTransform(scrollY, [0, 100], ["auto", "none"] as any);

  const handleScroll = () => {
    // Scroll xuống 1 màn hình
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={handleScroll}
      style={{ opacity, pointerEvents }}
      className="fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center cursor-pointer text-white/70 hover:text-white transition-colors z-40 outline-none"
      aria-label="Scroll down"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.2"
        >
          <path d="M12 4v16M12 20l-6-6M12 20l6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </motion.button>
  );
}
