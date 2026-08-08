"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import "./reveal.css";
import Footer from "@/components/Footer";

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
      <main className="bg-black text-white overflow-hidden"
        style={{ margin: "0 auto", marginTop: "68px", marginBottom: "0" }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 border-x border-zinc-400">

          {/* Logo Section */}
          <RevealBlock
            order={0}
            className="relative flex flex-col warranty-row-divider lg:border-r border-zinc-400 p-8"
          >
            <div className="flex items-center justify-center h-full min-h-[200px]">
              <Image
                src="/Rectangle.svg"
                alt="Godgift Jewelry"
                width={500}
                height={500}
                className="w-[80%] max-w-md"
              />
            </div>
            <div
              className="absolute left-[2%] lg:top-[125%] top-[90%]  -translate-y-1/2 flex items-center"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "translateY(-50%) rotate(180deg)",
              }}
            >
              <span
                className="text-white font-bold tracking-[0.15em] nowrap"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(12px,1.1vw,18px)",
                  whiteSpace: "",
                }}
              >
                GODG1FT
              </span>

              <span
                style={{
                  whiteSpace: "nowrap",
                  fontSize: "clamp(4px,0.4vw,8px)",
                }}
              >
                © COPYRIGHT BY GODG1FT JEWELRY
              </span>
            </div>
          </RevealBlock>

          {/* Warranty */}
          <RevealBlock
            order={1}
            className="warranty-row-divider lg:border-r border-zinc-400 p-8 flex flex-col justify-between uppercase"
          >
            <div style={{ margin: "5%" }}>
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-8"
                style={{ fontFamily: "var(--font-montserrat)" }}>
                Bảo Hành
              </h2>

              <ul className="space-y-5">
                <li className="text-[15px] text-zinc-300 leading-relaxed font-bold normal-case"
                  style={{ fontFamily: "var(--font-montserrat)", padding: "2%" }}>
                  · Bảo hành sửa chữa miễn phí 12 tháng về việc rớt đá,
                  hay bất kì lỗi nào thuộc về kĩ thuật gia công.
                </li>

                <li className="text-[15px] text-zinc-300 leading-relaxed font-bold normal-case"
                  style={{ fontFamily: "var(--font-montserrat)", padding: "2%" }}>
                  · Bảo hành đánh bóng và làm sáng trọn đời.
                </li>

                <li className="text-[15px] text-zinc-300 leading-relaxed font-bold normal-case"
                  style={{ fontFamily: "var(--font-montserrat)", padding: "2%" }}>
                  · Bảo hành lớp xi:
                  miễn phí xi bạch kim 1 lần lại cho khách hàng.
                  Những lần sau khách muốn xi bạch kim thì chỉ cần gửi
                  sáp 150k/lần.
                </li>
              </ul>

              <h3 className="text-2xl md:text-3xl font-bold uppercase mb-8"
                style={{ fontFamily: "var(--font-display)", marginTop: "10%" }}>
                Warranty Policy
              </h3>

              <ul className="space-y-5">
                <li className="text-[12px] text-white leading-relaxed font-light normal-case tracking-wide"
                  style={{ fontFamily: "var(--font-display)", padding: "2%" }}>
                  · Free repair warranty for 12 months covering stone loss
                  or any defects caused by manufacturing workmanship.
                </li>

                <li className="text-[12px] text-white leading-relaxed font-light normal-case tracking-wide"
                  style={{ fontFamily: "var(--font-display)", padding: "2%" }}>
                  · Lifetime free polishing and shining warranty.
                </li>

                <li className="text-[12px] text-white leading-relaxed font-light normal-case tracking-wide"
                  style={{ fontFamily: "var(--font-display)", padding: "2%" }}>
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
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-8"
                style={{ fontFamily: "var(--font-montserrat)" }}>
                Bảo Quản
              </h2>

              <ul className="space-y-5">
                <li className="text-[15px] text-zinc-300 leading-relaxed font-bold normal-case"
                  style={{ fontFamily: "var(--font-montserrat)", padding: "2%" }}>
                  · Hạn chế tiếp xúc với hóa chất. Tránh để trang sức
                  tiếp xúc với mỹ phẩm, nước hoa, keo xịt.
                </li>

                <li className="text-[15px] text-zinc-300 leading-relaxed font-bold normal-case"
                  style={{ fontFamily: "var(--font-montserrat)", padding: "2%" }}>
                  · Tháo ra khi chơi thể thao hoặc vận động.
                </li>

                <li className="text-[15px] text-zinc-300 leading-relaxed font-bold normal-case"
                  style={{ fontFamily: "var(--font-montserrat)", padding: "2%" }}>
                  · Vệ sinh định kỳ: Có thể dùng nước ấm pha với một lượng
                  nhỏ kem đánh răng và dùng bàn chải mềm để làm sạch
                  trang sức.
                </li>
              </ul>

              <h3 className="text-2xl md:text-3xl font-bold uppercase mb-8"
                style={{ fontFamily: "var(--font-display)", marginTop: "10%" }}>
                Storage
              </h3>

              <ul className="space-y-5">
                <li className="text-[12px] text-white leading-relaxed font-light normal-case tracking-wide"
                  style={{ fontFamily: "var(--font-display)", padding: "2%" }}>
                  · Avoid chemical exposure: keep jewelry away from
                  cosmetics, perfume, hairspray, hand sanitizers,
                  cleaning agents, and chlorine.
                </li>

                <li className="text-[12px] text-white leading-relaxed font-light normal-case tracking-wide"
                  style={{ fontFamily: "var(--font-display)", padding: "2%" }}>
                  · Remove jewelry when playing sports or engaging in
                  vigorous activities.
                </li>

                <li className="text-[12px] text-white leading-relaxed font-light normal-case tracking-wide"
                  style={{ fontFamily: "var(--font-display)", padding: "2%" }}>
                  · Regular cleaning: Use warm water mixed with a small
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
          className="w-full border-x border-zinc-400 py-5 sm:py-6 md:py-7 lg:py-8 xl:py-10"
        >
          <div className="w-full mx-auto flex justify-center">
            <h1
              className="
                    w-[90%]
                    mx-auto
                    text-center
                    whitespace-nowrap
                    font-bold
                    leading-none
                    text-[13vw]
                    xl:text-[170px]
                  "
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "0.04em",
                margin: "20px 0",
              }}
            >
              GODG1FT
              <span
                className="ml-[0.25em]"
                style={{
                  fontSize: "0.13em",
                  fontWeight: "300",
                  letterSpacing: "0.18em",
                }}
              >
                JEWELRY
              </span>
            </h1>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>

  );
}