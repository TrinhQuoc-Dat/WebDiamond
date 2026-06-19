"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";

interface ShopProductCardProps {
  product: Product;
  index: number;
  viewportOnce?: boolean;
  priority?: boolean;
}

export default function ShopProductCard({
  product,
  index,
  viewportOnce = false,
  priority = false,
}: ShopProductCardProps) {
  const animationProps = viewportOnce
    ? {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
      }
    : {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <motion.div
      {...animationProps}
      transition={{ delay: 0.1 * index + (viewportOnce ? 0 : 0.3), duration: 0.6 }}
      whileHover={{ y: -6 }}
      className="flex flex-col items-center group cursor-pointer"
    >
      <Link href={`/shop/${product.slug}`} className="w-full flex flex-col items-center">
        {/* Borderless and transparent Image Container */}
        <div className="relative w-full aspect-[4/5] overflow-hidden flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />
        </div>

        {/* Product Details (Clean spacing) */}
        <h3
          className="text-[11px] md:text-[12px] tracking-[0.08em] font-extrabold text-center uppercase leading-none text-white mt-4 md:mt-6"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {product.name}
        </h3>
        <p
          className="text-[10px] md:text-[11px] tracking-[0.05em] text-white opacity-80 text-center font-medium mt-2 md:mt-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {product.price.replace(" VNĐ", " VND")}
        </p>
      </Link>
    </motion.div>
  );
}
