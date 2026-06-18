"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const products = [
  {
    id: "bracelet-01",
    name: "Aurum Chain",
    category: "Bracelets",
    price: "$2,400",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80&auto=format&fit=crop",
    tag: "Bestseller",
  },
  {
    id: "necklace-01",
    name: "Solstice Pendant",
    category: "Necklace",
    price: "$3,800",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80&auto=format&fit=crop",
    tag: "New",
  },
  {
    id: "ring-01",
    name: "Lumière Ring",
    category: "Rings",
    price: "$5,200",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=80&auto=format&fit=crop",
    tag: "Limited",
  },
  {
    id: "earring-01",
    name: "Eclipse Drops",
    category: "Earings",
    price: "$1,950",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=80&auto=format&fit=crop",
    tag: null,
  },
];

function ProductCard({ product, index }: { product: (typeof products)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      className="group relative overflow-hidden bg-[#0d0d0d]"
      style={{ gridRow: index === 1 ? "span 2" : "span 1" }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
      id={`product-card-${product.id}`}
    >
      {/* Image */}
      <div className="relative w-full h-full min-h-[320px] overflow-hidden">
        <motion.div
          className="relative w-full h-full min-h-[320px]"
          style={{ y }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Image
            src={product.image}
            alt={`${product.name} – ${product.category}`}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />

        {/* Tag */}
        {product.tag && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-white text-black text-[9px] tracking-[0.3em] uppercase font-semibold">
            {product.tag}
          </div>
        )}

        {/* Info — reveals on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
          <p className="text-[9px] tracking-[0.4em] text-white/60 uppercase mb-1">
            {product.category}
          </p>
          <h3
            className="text-[22px] text-white font-light mb-3 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-white text-sm tracking-widest font-medium">
              {product.price}
            </span>
            <button
              className="px-4 py-2 border border-white/50 text-[9px] tracking-[0.3em] uppercase text-white hover:bg-white hover:text-black transition-all duration-200"
              id={`view-${product.id}`}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 px-6 md:px-12 lg:px-20 bg-black"
      id="collections"
    >
      {/* Section header */}
      <motion.div
        className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div>
          <p className="text-[9px] tracking-[0.5em] text-white/40 uppercase mb-3">
            Curated Selection
          </p>
          <h2
            className="text-[clamp(2.5rem,7vw,6rem)] font-normal text-white leading-none uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Featured Pieces
          </h2>
        </div>

        <a
          href="#collections"
          className="inline-flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-white/40 hover:text-white transition-colors duration-300 no-underline group"
          id="view-all-link"
        >
          View All <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
        </a>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[400px]">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}

        {/* Editorial quote card */}
        <motion.div
          className="relative flex flex-col justify-center p-10 border border-white/8 bg-[#080808]"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.75 }}
        >
          <p className="text-[9px] tracking-[0.5em] text-white/30 uppercase mb-6">
            Our Philosophy
          </p>
          <blockquote
            className="text-[clamp(1.5rem,3vw,2.2rem)] font-normal text-white leading-snug mb-8 uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            "No luck. All hustle. Work until the god see you."
          </blockquote>
          <div className="w-8 h-[1px] bg-white/30" />
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative mt-16 overflow-hidden border-t border-b border-white/8 py-3">
        <motion.div
          className="flex gap-10 whitespace-nowrap"
          animate={{ x: [0, "-50%"] }}
          transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="text-[10px] tracking-[0.5em] text-white/15 uppercase">
              Bracelets · Necklace · Rings · Earings · Custom · Warrenty ·
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
