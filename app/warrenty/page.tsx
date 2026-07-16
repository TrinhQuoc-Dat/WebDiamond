"use client";

import Header from "@/components/Header";
import Image from "next/image";
import { motion } from "framer-motion";

export default function WarrantyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white overflow-hidden"
        style={{ margin: "0 auto", marginTop: "150px", marginBottom: "0" }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 border-x border-zinc-800">

          {/* Logo Section */}
          <section className="relative flex flex-col border-b lg:border-b-0 lg:border-r border-zinc-800 p-8">
            <div className="flex items-start justify-center" style={{ paddingTop: "80px" }}>
              <Image
                src="/Rectangle.svg"
                alt="Godgift Jewelry"
                width={500}
                height={500}
                className="w-full max-w-md"
              />
            </div>


          </section>

          {/* Warranty */}
          <section className="border-b lg:border-b-0 lg:border-r border-zinc-800 p-8 flex flex-col justify-between uppercase">
            <div style={{ margin: "5%" }}>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-8"
                style={{ fontFamily: "var(--font-montserrat)" }}>
                Bảo Hành
              </h2>

              <ul className="space-y-5">
                <li className="text-[13px] text-white/70 leading-relaxed font-light"
                  style={{ fontFamily: "var(--font-montserrat)", padding: "2%" }}>
                  • Bảo hành sửa chữa miễn phí 12 tháng về việc rớt đá,
                  hay bất kì lỗi nào thuộc về kĩ thuật gia công.
                </li>

                <li className="text-[13px] text-white/70 leading-relaxed font-light"
                  style={{ fontFamily: "var(--font-montserrat)", padding: "2%" }}>
                  · Bảo hành đánh bóng và làm sáng trọn đời.
                </li>

                <li className="text-[13px] text-white/70 leading-relaxed font-light"
                  style={{ fontFamily: "var(--font-montserrat)", padding: "2%" }}>
                  · Bảo hành lớp xi:
                  miễn phí xi bạch kim 1 lần lại cho khách hàng.
                  Những lần sau khách muốn xi bạch kim thì chỉ cần gửi
                  sáp 150k/lần.
                </li>
              </ul>

              <h3 className="text-4xl md:text-5xl font-bold uppercase mb-8"
                style={{ fontFamily: "var(--font-display)", marginTop: "60px" }}>
                Warranty Policy
              </h3>

              <ul className="space-y-5">
                <li className="text-[12px] text-white/50 leading-relaxed font-light uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-montserrat)", padding: "2%" }}>
                  · Free repair warranty for 12 months covering stone loss
                  or any defects caused by manufacturing workmanship.
                </li>

                <li className="text-[12px] text-white/50 leading-relaxed font-light uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-montserrat)", padding: "2%" }}>
                  • Lifetime free polishing and shining warranty.
                </li>

                <li className="text-[12px] text-white/50 leading-relaxed font-light uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-montserrat)", padding: "2%" }}>
                  · Plating warranty: one-time free platinum plating service
                  for customer. For subsequent requests, a fee of
                  150,000 VND per service will apply.
                </li>
              </ul>
            </div>
          </section>

          {/* Storage */}
          <section className="p-8 flex flex-col justify-between uppercase">
            <div style={{ margin: "5%" }}>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-8"
                style={{ fontFamily: "var(--font-montserrat)" }}>
                Bảo Quản
              </h2>

              <ul className="space-y-5">
                <li className="text-[13px] text-white/70 leading-relaxed font-light"
                  style={{ fontFamily: "var(--font-montserrat)", padding: "2%" }}>
                  • Hạn chế tiếp xúc với hóa chất. Tránh để trang sức
                  tiếp xúc với mỹ phẩm, nước hoa, keo xịt.
                </li>

                <li className="text-[13px] text-white/70 leading-relaxed font-light"
                  style={{ fontFamily: "var(--font-montserrat)", padding: "2%" }}>
                  · Tháo ra khi chơi thể thao hoặc vận động.
                </li>

                <li className="text-[13px] text-white/70 leading-relaxed font-light"
                  style={{ fontFamily: "var(--font-montserrat)", padding: "2%" }}>
                  · Vệ sinh định kỳ: Có thể dùng nước ấm pha với một lượng
                  nhỏ kem đánh răng và dùng bàn chải mềm để làm sạch
                  trang sức.
                </li>
              </ul>

              <h3 className="text-4xl md:text-5xl font-bold uppercase mb-8"
                style={{ fontFamily: "var(--font-display)", marginTop: "60px" }}>
                Storage
              </h3>

              <ul className="space-y-5">
                <li className="text-[12px] text-white/50 leading-relaxed font-light uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-montserrat)", padding: "2%" }}>
                  · Avoid chemical exposure: keep jewelry away from
                  cosmetics, perfume, hairspray, hand sanitizers,
                  cleaning agents, and chlorine.
                </li>

                <li className="text-[12px] text-white/50 leading-relaxed font-light uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-montserrat)", padding: "2%" }}>
                  • Remove jewelry when playing sports or engaging in
                  vigorous activities.
                </li>

                <li className="text-[12px] text-white/50 leading-relaxed font-light uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-montserrat)", padding: "2%" }}>
                  • Regular cleaning: Use warm water mixed with a small
                  amount of toothpaste and a soft brush to clean the jewelry.
                </li>
              </ul>
            </div>
          </section>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full overflow-hidden border-x border-zinc-800"
          style={{ marginTop: "0px", paddingBottom: "0" }}
        >
          {/* 3-column grid matching top section */}
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Column 1: Vertical label + GO */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
              className="relative text-white font-bold uppercase leading-none flex items-end justify-center border-b lg:border-b-0 lg:border-r border-zinc-800"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(80px, 14vw, 200px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                padding: "8px 0",
                minHeight: "280px",
                overflow: "hidden",
              }}
            >
              {/* Vertical: copyright (top) → GODG1FT (bottom) — single vertical line */}
              <div
                className="absolute z-10"
                style={{
                  left: "8px",
                  top: "0",
                  bottom: "0",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  transform: "rotate(180deg)",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <span
                  className="tracking-[0.25em] uppercase text-white/80"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "12px",
                    fontWeight: "700",
                    whiteSpace: "nowrap",
                  }}
                >
                  GODG1FT
                </span>
                <span
                  className="tracking-[0.15em] text-zinc-500 uppercase"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "6px",
                    fontWeight: "700",
                    whiteSpace: "nowrap",
                  }}
                >
                  @ COPYRIGHT BY GODG1FT JEWELRY
                </span>
              </div>
              GO
            </motion.div>

            {/* Column 2: DG */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="text-white font-bold uppercase leading-none flex items-end justify-center border-b lg:border-b-0 lg:border-r border-zinc-800"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(80px, 14vw, 200px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                padding: "8px 0",
                overflow: "hidden",
              }}
            >
              DG1
            </motion.div>

            {/* Column 3: FT + JEWELRY */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="relative text-white font-bold uppercase leading-none flex items-end justify-center"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(80px, 14vw, 200px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                padding: "8px 0",
                overflow: "hidden",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "baseline" }}>
                FT
                <span
                  className="text-zinc-400 uppercase tracking-[0.2em]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(14px, 2.5vw, 32px)",
                    fontWeight: 400,
                    marginLeft: "4px",
                  }}
                >
                  JEWELRY
                </span>
              </span>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </>

  );
}