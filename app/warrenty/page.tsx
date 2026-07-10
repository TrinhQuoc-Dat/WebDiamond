import Header from "@/components/Header";
import Image from "next/image";

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
                style={{ fontFamily: "var(--font-display)" }}>
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
                style={{ fontFamily: "var(--font-display)" }}>
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

        <div className="relative w-full overflow-hidden" style={{ marginTop: "40px", paddingBottom: "0" }}>
          {/* Small rotated GODG1FT label */}
          <div className="absolute left-4 bottom-16 rotate-[-90deg] origin-left z-10">
            <span
              className="tracking-[0.3em] uppercase text-white/80"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "16px",
                fontWeight: "900",
              }}
            >GODG1FT</span>
            <span className="tracking-[0.2em] text-zinc-500 uppercase ml-3"
              style={{ fontSize: "9px", fontWeight: "700" }}
            >
              © COPYRIGHT BY GODG1FT JEWELRY
            </span>
          </div>

          {/* Full-width GODG1FT */}
          <p
            className="text-white font-bold uppercase w-full"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "18vw",
              fontWeight: 700,
              lineHeight: 0.85,
              whiteSpace: "nowrap",
              letterSpacing: "-0.02em",
              margin: 0,
              padding: 0,
              paddingLeft: "3%",
            }}
          >
            GODG1FT
          </p>

          {/* JEWELRY aligned right */}
          <div className="flex justify-end" style={{ paddingRight: "3%", marginTop: "4px" }}>
            <p
              className="text-zinc-400 uppercase tracking-[0.4em]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(14px, 2.5vw, 32px)",
                fontWeight: 400,
              }}
            >
              Jewelry
            </p>
          </div>
        </div>
      </main>
    </>

  );
}