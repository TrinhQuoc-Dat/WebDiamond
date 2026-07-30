"use client";

import Header from "@/components/Header";
import Image from "next/image";
import { motion } from "framer-motion";

import "./reveal.css";

/** Mỗi khối trễ hơn khối bên trái 0.18s ⇒ nội dung hiện dần từ trái sang phải. */
const revealDelay = (order: number) => ({ animationDelay: `${order * 0.18}s` });

/** Một khối trong lưới; hiệu ứng do class `reveal-block` trong reveal.css lo. */
function RevealBlock({
  order,
  className,
  children,
}: {
  order: number;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`reveal-block ${className}`} style={revealDelay(order)}>
      {children}
    </section>
  );
}

export default function WarrantyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white overflow-hidden"
        style={{ margin: "0 auto", marginTop: "68px", marginBottom: "0" }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 border-x border-zinc-800">

          {/* Logo Section */}
          <RevealBlock
            order={0}
            className="relative flex flex-col border-b lg:border-b-0 lg:border-r border-zinc-800 p-8"
          >
            <div className="flex items-center justify-center h-full min-h-[200px]">
              <Image
                src="/Rectangle.svg"
                alt="Godgift Jewelry"
                width={500}
                height={500}
                className="w-full max-w-md"
              />
            </div>


          </RevealBlock>

          {/* Warranty */}
          <RevealBlock
            order={1}
            className="border-b lg:border-b-0 lg:border-r border-zinc-800 p-8 flex flex-col justify-between uppercase"
          >
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
          </RevealBlock>

          {/* Storage */}
          <RevealBlock order={2} className="p-8 flex flex-col justify-between uppercase">
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
          </RevealBlock>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="hidden lg:block w-full border-x border-zinc-800"
          style={{ marginTop: "0px", paddingBottom: "0" }}
        >
          {/* Desktop: 3-column grid */}
          <div className="grid grid-cols-3">
            {/* Column 1: Vertical label + GO */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
              className="relative text-white font-bold uppercase leading-none flex items-end justify-center border-r border-zinc-800 min-h-[280px]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(90px, 16vw, 220px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                padding: "8px 0",
                overflow: "hidden",
              }}
            >
              <div
                className="absolute flex z-10"
                style={{ left: "4px", top: "0", bottom: "0", writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "4px" }}
              >
                <span className="tracking-[0.25em] uppercase text-white/80" style={{ fontFamily: "var(--font-display)", fontSize: "10px", fontWeight: "700", whiteSpace: "nowrap" }}>GODG1FT</span>
                <span className="tracking-[0.15em] text-zinc-500 uppercase" style={{ fontFamily: "var(--font-display)", fontSize: "5px", fontWeight: "700", whiteSpace: "nowrap" }}>@ COPYRIGHT BY GODG1FT JEWELRY</span>
              </div>
              <span style={{ marginLeft: "70px" }}>GO</span>
            </motion.div>

            {/* Column 2: DG */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="text-white font-bold uppercase leading-none flex items-end justify-center border-r border-zinc-800"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(90px, 16vw, 220px)", fontWeight: 700, letterSpacing: "-0.02em", padding: "8px 0", overflow: "hidden" }}
            >
              DG1
            </motion.div>

            {/* Column 3: FT + JEWELRY */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="relative text-white font-bold uppercase leading-none flex items-end justify-start"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(90px, 16vw, 220px)", fontWeight: 700, letterSpacing: "-0.02em", padding: "8px 0", overflow: "hidden" }}
            >
              <span className="flex flex-row items-baseline">
                <span>FT</span>
                <span className="text-zinc-400 uppercase tracking-[0.2em] ml-[6px]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(14px, 2.2vw, 20px)", fontWeight: 300 }}>JEWELRY</span>
              </span>
            </motion.div>
          </div>
        </motion.div>

          {/* Mobile/tablet: flex row — outside motion.div to avoid animation nesting issues */}
        <div className="block lg:hidden w-full border-x border-zinc-800 flex flex-row items-center justify-center py-6">
          <div className="flex flex-row items-center justify-center gap-x-3">
            <span
              className="text-white font-bold uppercase leading-none"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 9vw, 86px)", fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              GO
            </span>
            <span
              className="text-white font-bold uppercase leading-none"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 9vw, 86px)", fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              DG1
            </span>
            <span
              className="text-white font-bold uppercase leading-none flex flex-row items-baseline"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 9vw, 86px)", fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              <span>FT</span>
              <span
                className="text-zinc-400 uppercase tracking-[0.2em] ml-[4px]"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(8px, 1.5vw, 14px)", fontWeight: 600 }}
              >
                JEWELRY
              </span>
            </span>
          </div>
        </div>
      </main>
    </>

  );
}