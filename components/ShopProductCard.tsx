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
      whileHover={{ y: -4 }}
      className="flex flex-col items-center group cursor-pointer"
    >
      <Link href={`/shop/${product.slug}`} className="w-full flex flex-col items-center">
        {/* Transparent Image Container */}
        <div className="relative w-full aspect-[5/4] overflow-hidden flex items-center justify-center bg-black">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            unoptimized={product.image.startsWith("http")}
          />
        </div>

        {/* Product Details (Matching shop.png exactly) */}
        <div className="mt-[1rem] flex flex-col items-center gap-1.5 w-full">
          {/* Name: Gray, thin uppercase */}
          <h3
            className="text-[18px] md:text-[16px] tracking-[0.1em] text-gray-400 uppercase text-center font-normal"
            style={{ fontFamily: "var(--font-display)" , padding: "20px 0px 0px 0px"}}
          >
            {product.name}
          </h3>
          
          {/* Price: White, bold uppercase */}
          <p
            className="text-[18px] md:text-[16px] tracking-[0.05em] text-white font-bold uppercase text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {product.price}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
