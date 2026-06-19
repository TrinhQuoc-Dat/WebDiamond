"use client";

import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { products } from "@/data/products";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ShopPage() {
  const necklaces = products.filter((p) => p.category === "NECKLACE");
  const bracelets = products.filter((p) => p.category === "BRACELETS");

  return (
    <>
      <CustomCursor />
      <Header />

      <main className="w-full bg-black text-white pb-12 min-h-screen" style={{ paddingTop: "95px" }}>
        <div className="w-full px-6 md:px-12 flex flex-col items-center">
          
          {/* Page Title */}
          <motion.h1
            className="text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase tracking-[0.2em] text-center mb-2"
            style={{ fontFamily: "var(--font-display)", marginRight: "-0.2em" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            SHOP ALL
          </motion.h1>

          {/* ─── NECKLACE SECTION ─── */}
          <section className="w-full flex flex-col items-center mt-12 mb-24">
            <motion.h2
              className="text-xl md:text-[24px] font-black uppercase tracking-[0.3em] mb-12 text-center text-white"
              style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.2em" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              NECKLACE
            </motion.h2>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 w-full max-w-[950px]">
              {necklaces.map((product, idx) => (
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx + 0.3, duration: 0.6 }}
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
                        priority={idx < 3}
                      />
                    </div>

                    {/* Product Details (Clean spacing) */}
                    <h3 
                      className="text-[12px] tracking-[0.08em] font-extrabold text-center uppercase leading-none text-white"
                      style={{ fontFamily: "var(--font-sans)", marginTop: "24px" }}
                    >
                      {product.name}
                    </h3>
                    <p 
                      className="text-[11px] tracking-[0.05em] text-white opacity-80 text-center font-medium"
                      style={{ fontFamily: "var(--font-sans)", marginTop: "12px" }}
                    >
                      {product.price.replace(" VNĐ", " VND")}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Explicit spacer to push SEE MORE down */}
            <div className="h-5 w-full" />

            {/* SEE MORE */}
            <Link
              href="#"
              className="text-xs md:text-sm tracking-[0.2em] font-black italic uppercase text-white/60 hover:text-white mt-5 transition-colors duration-200 block border-b border-transparent hover:border-white/40 pb-1"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              SEE MORE
            </Link>
          </section>

          {/* Spacing Divider */}
          <div className="h-12 w-full" />

          {/* ─── BRACELETS SECTION ─── */}
          <section className="w-full flex flex-col items-center mb-16">
            <h2
              className="text-xl md:text-[24px] font-black uppercase tracking-[0.3em] mb-12 text-center text-white"
              style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.2em" }}
            >
              BRACELETS
            </h2>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 w-full max-w-[950px]">
              {bracelets.map((product, idx) => (
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.1 * idx, duration: 0.6 }}
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
                      />
                    </div>

                    {/* Product Details (Clean spacing) */}
                    <h3 
                      className="text-[12px] tracking-[0.08em] font-extrabold text-center uppercase leading-none text-white"
                      style={{ fontFamily: "var(--font-sans)", marginTop: "24px" }}
                    >
                      {product.name}
                    </h3>
                    <p 
                      className="text-[11px] tracking-[0.05em] text-white opacity-80 text-center font-medium"
                      style={{ fontFamily: "var(--font-sans)", marginTop: "12px" }}
                    >
                      {product.price.replace(" VNĐ", " VND")}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Explicit spacer to push SEE MORE down */}
            <div className="h-5 w-full" />

            {/* SEE MORE */}
            <Link
              href="#"
              className="text-xs md:text-sm tracking-[0.2em] font-black italic uppercase text-white/60 hover:text-white mt-20 transition-colors duration-200 block border-b border-transparent hover:border-white/40 pb-1"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              SEE MORE
            </Link>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
