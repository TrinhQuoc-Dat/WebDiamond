"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { label: "Bracelets", href: "#bracelets" },
  { label: "Necklace", href: "#necklaces" },
  { label: "Rings", href: "#rings" },
  { label: "Earings", href: "#earrings" },
  { label: "Custom", href: "#custom" },
  { label: "Contact", href: "#contact" },
  { label: "Warrenty", href: "#warranty" },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.9 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function SideMenu() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <motion.nav
      className="fixed bottom-7 left-5 md:bottom-9 md:left-7 z-40 flex flex-col gap-[3px]"
      aria-label="Category navigation"
      variants={container}
      initial="hidden"
      animate="visible"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {menuItems.map((m, i) => {
        const isHovered = hoveredIndex === i;
        const isActive = activeIndex === i;
        const anyHovered = hoveredIndex !== null;

        return (
          <motion.a
            key={m.label}
            href={m.href}
            className="relative flex items-center no-underline cursor-pointer select-none"
            variants={itemVariant}
            id={`sidemenu-${m.label.toLowerCase().replace(" ", "-")}`}
            onMouseEnter={() => setHoveredIndex(i)}
            onClick={() => setActiveIndex(i)}
            animate={{
              opacity: anyHovered ? (isHovered ? 1 : 0.25) : isActive ? 1 : 0.85,
              x: isHovered ? 10 : 0,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Left dash indicator */}
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  className="absolute -left-5 top-1/2 -translate-y-1/2 block h-[2px] bg-white origin-left"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 14, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>

            {/* Label text */}
            <span
              className="text-white font-black uppercase leading-tight relative"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(15px, 2vw, 22px)",
                letterSpacing: "0.15em",
                WebkitTextStroke: "1px white",
              }}
            >
              {m.label}

              {/* Underline sweep on hover */}
              <motion.span
                className="absolute -bottom-[2px] left-0 h-[2px] bg-white block origin-left"
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                style={{ width: "100%" }}
              />

              {/* Active dot */}
              {isActive && !isHovered && (
                <motion.span
                  className="absolute -right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                />
              )}
            </span>
          </motion.a>
        );
      })}
    </motion.nav>
  );
}
