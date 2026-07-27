"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

import RingGuide from "./RingGuide";
import NecklaceGuide from "./NecklaceGuide";
import BraceletGuide from "./BraceletGuide";
import EarringGuide from "./EarringGuide";

interface Props {
  open: boolean;
  onClose: () => void;
  type: string;
}

export default function SizeGuideDrawer({
  open,
  onClose,
  type,
}: Props) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const renderGuide = () => {
    switch (type) {
      case "ring":
        return <RingGuide />;

      case "necklace":
        return <NecklaceGuide />;

      case "bracelet":
        return <BraceletGuide />;

      case "earring":
        return <EarringGuide />;

      default:
        return <div>Guide not found.</div>;
    }
  };

  return (
  <>
    {/* Overlay */}
    <div
      onClick={onClose}
      className={`
        fixed inset-0 z-40
        bg-black/15
        backdrop-blur-md
        transition-all
        duration-500
        ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      
    />

    {/* Drawer */}
    <div
      className={`
        fixed
        top-0
        right-0
        h-screen
        w-full
        md:w-[68%]
        bg-black
        rounded-l-3xl
        z-50
        transform
        transition-transform
        duration-500
        ease-[cubic-bezier(.22,1,.36,1)]

        ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }

        shadow-[0_0_80px_rgba(0,0,0,.75)]
        border-l
        border-white/10
      `}
    >
      {/* Viền sáng */}
      <div className="absolute left-0 top-0 h-full w-px bg-white/30 shadow-[0_0_25px_rgba(255,255,255,.45)]" />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="
          absolute
          top-6
          left-6
          w-11
          h-11
          backdrop-blur-md
          flex
          items-center
          justify-center
          hover:bg-white/10
          transition
        "
      >
        <svg width="54" height="54" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 6l6 6-6 6z"/>
          </svg>
      </button>

      {/* Content */}
      <div className="h-full overflow-y-auto pt-24 px-10 pb-10">
        {renderGuide()}
      </div>
    </div>
  </>
);
}