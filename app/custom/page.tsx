"use client";

import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

const products = [
  {
    title: "YOUNG THUG",
    subtitle: "NECKLACE LIGHTNING",
    year: "2026",
    image: "/shop.png",
  },
  {
    title: "TRAVIS SCOTT",
    subtitle: "DIAMOND CHAIN",
    year: "2026",
    image: "/hero.png",
  },
  {
    title: "DRAKE",
    subtitle: "LUXURY PENDANT",
    year: "2026",
    image: "/shop.png",
  },
];

export default function CustomShowcase() {
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  const progress = smoothProgress.get();

  const active =
    progress < 0.33
      ? 0
      : progress < 0.66
      ? 1
      : 2;

  const timelineY = useTransform(
    smoothProgress,
    [0, 1],
    [0, 240]
  );

  const product = products[active];

  return (
    <section
      className="relative bg-black text-white"
      style={{
        height: `${products.length * 100}vh`,
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Background Glow */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="
              absolute
              top-1/2
              left-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-[900px]
              h-[900px]
              rounded-full
              bg-white/5
              blur-[180px]
            "
          />
        </div>

        <div className="relative h-full flex">

          {/* LEFT */}
          <div className="w-[65%] relative flex items-center px-20">

            {/* Timeline */}
            <div className="absolute left-10 top-1/2 -translate-y-1/2 h-[300px] w-px bg-white/20">

              <motion.div
                style={{
                  y: timelineY,
                }}
                className="
                  absolute
                  left-1/2
                  -translate-x-1/2
                  w-[6px]
                  h-[60px]
                  bg-white
                  rounded-full
                "
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={product.title}
                initial={{
                  opacity: 0,
                  y: 80,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -80,
                }}
                transition={{
                  duration: 0.7,
                }}
              >
                <div className="space-y-4 text-white/40 uppercase tracking-[6px]">
                  <p>{product.subtitle}</p>
                  <p>{product.subtitle}</p>
                </div>

                <h1
                  className="
                    uppercase
                    font-black
                    mt-10
                    mb-10
                  "
                  style={{
                    fontSize: "clamp(90px,9vw,180px)",
                    lineHeight: 0.9,
                  }}
                >
                  {product.title}
                </h1>

                <div className="space-y-4 text-white/40 uppercase tracking-[6px]">
                  <p>{product.subtitle}</p>
                  <p>{product.subtitle}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* YEAR */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={product.year + product.title}
                  initial={{
                    opacity: 0,
                    x: 50,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -50,
                  }}
                >
                  <div className="text-3xl italic mb-2">
                    YEAR
                  </div>

                  <div className="font-black text-7xl">
                    {product.year}
                  </div>

                  <div className="mt-16 text-3xl italic mb-2">
                    YEAR
                  </div>

                  <div className="font-black text-7xl">
                    {product.year}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-[35%] flex items-center justify-center relative">

            <AnimatePresence mode="wait">
              <motion.div
                key={product.image}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  rotate: -5,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 1.15,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="relative"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  width={700}
                  height={900}
                  priority
                  className="
                    object-contain
                    drop-shadow-[0_0_60px_rgba(255,255,255,0.08)]
                  "
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}