"use client";

import Image from "next/image";

export default function CustomShowcase() {
  return (
    <section className="relative h-screen overflow-hidden bg-black text-white">
      {/* Noise Background */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:4px_4px]" />

      <div className="relative h-full flex">
        {/* LEFT SIDE */}
        <div className="w-[68%] flex items-center relative px-[120px]">

          {/* Timeline */}
          <div className="absolute left-[60px] top-1/2 -translate-y-1/2">
            <div className="relative w-px h-[620px] bg-white/20">

              <div className="absolute left-1/2 top-[270px] -translate-x-1/2 w-[6px] h-[100px] bg-white" />

            </div>
          </div>

          {/* Text */}
          <div className="ml-[120px]">

            <div className="space-y-10 mb-10">
              <p className="uppercase tracking-[8px] text-white/70 text-[20px]">
                NECKLACE LIGHTNING
              </p>

              <p className="uppercase tracking-[8px] text-white/70 text-[28px]">
                NECKLACE LIGHTNING
              </p>

              <p className="uppercase tracking-[8px] text-white text-[42px]">
                NECKLACE LIGHTNING
              </p>
            </div>

            {/* Main Title */}
            <div className="relative inline-block">

              <div className="absolute left-[-16px] top-1/2 h-[60px] w-[2px] bg-white -translate-y-1/2" />

              <div className="absolute right-[-16px] top-1/2 h-[60px] w-[2px] bg-white -translate-y-1/2" />

              <h1 className="text-[96px] font-black leading-none tracking-tight uppercase">
                YOUNG THUG
              </h1>
            </div>

            <div className="space-y-10 mt-10">
              <p className="uppercase tracking-[8px] text-white/70 text-[28px]">
                NECKLACE LIGHTNING
              </p>

              <p className="uppercase tracking-[8px] text-white/50 text-[20px]">
                NECKLACE LIGHTNING
              </p>

              <p className="uppercase tracking-[8px] text-white/50 text-[20px]">
                NECKLACE LIGHTNING
              </p>
            </div>
          </div>

          {/* YEAR */}
          <div className="absolute right-[80px] top-1/2 -translate-y-1/2">

            <div>
              <div className="italic text-[52px] font-light">
                YEAR
              </div>

              <div className="text-[72px] font-black">
                2026
              </div>
            </div>

            <div className="mt-24">
              <div className="italic text-[52px] font-light">
                YEAR
              </div>

              <div className="text-[72px] font-black">
                2026
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-[32%] flex items-center justify-center relative">

          {/* Glow */}
          <div className="absolute w-[700px] h-[700px] rounded-full bg-white/5 blur-[180px]" />

          <Image
            src="/shop.png"
            alt="Luxury Product"
            width={700}
            height={900}
            priority
            className="object-contain select-none"
          />

          {/* Lens flare */}
          <div className="absolute bottom-[120px] w-[200px] h-[200px] bg-white/20 blur-[80px] rounded-full" />

        </div>
      </div>
    </section>
  );
}