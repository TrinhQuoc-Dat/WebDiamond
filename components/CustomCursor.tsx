"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 300, damping: 28 };
  const followerX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const followerY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Dot cursor */}
      <motion.div
        className="cursor"
        style={{ left: mouseX, top: mouseY, pointerEvents: "none" }}
      />
      {/* Ring follower */}
      <motion.div
        className="cursor-follower"
        style={{ left: followerX, top: followerY, pointerEvents: "none" }}
      />
    </>
  );
}
