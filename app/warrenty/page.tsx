import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";

export default function WarrantyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white overflow-hidden"
        style={{ margin: "0 auto", marginTop: "150px", marginBottom: "50px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-screen border-x border-zinc-800">

          {/* Logo Section */}
          <section className="relative flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-800 p-8">
            <div className="flex-1 flex items-center justify-center">
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
            <div style={{ fontFamily: "var(--font-sans)", margin: "5%" }}>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wide mb-8">
                Bảo Hành
              </h2>

              <ul className="space-y-6 text-lg leading-relaxed" >
                <li style={{ padding: "2%" }} >
                  • Bảo hành sửa chữa miễn phí 12 tháng về việc rớt đá,
                  hay bất kì lỗi nào thuộc về kĩ thuật gia công.
                </li>

                <li style={{ padding: "2%" }}>
                  • Bảo hành đánh bóng và làm sáng trọn đời.
                </li>

                <li style={{ padding: "2%" }}>
                  • Bảo hành lớp xi:
                  miễn phí xi bạch kim 1 lần lại cho khách hàng.
                  Những lần sau khách muốn xi bạch kim thì chỉ cần gửi
                  sáp 150k/lần.
                </li>
              </ul>

              <h3 className="text-4xl md:text-5xl font-black uppercase mt-20 mb-8">
                Warranty Policy
              </h3>

              <ul className="space-y-6 text-lg leading-relaxed text-zinc-300">
                <li style={{ padding: "2%" }}>
                  • Free repair warranty for 12 months covering stone loss
                  or any defects caused by manufacturing workmanship.
                </li>

                <li style={{ padding: "2%" }}>
                  • Lifetime free polishing and shining warranty.
                </li>

                <li style={{ padding: "2%" }}>
                  • Plating warranty: one-time free platinum plating service
                  for customer. For subsequent requests, a fee of
                  150,000 VND per service will apply.
                </li>
              </ul>
            </div>
          </section>

          {/* Storage */}
          <section className="p-8 flex flex-col justify-between uppercase">
            <div style={{ fontFamily: "var(--font-sans)", margin: "5%" }}>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wide mb-8">
                Bảo Quản
              </h2>

              <ul className="space-y-6 text-lg leading-relaxed">
                <li style={{ padding: "2%" }}>
                  • Hạn chế tiếp xúc với hóa chất. Tránh để trang sức
                  tiếp xúc với mỹ phẩm, nước hoa, keo xịt.
                </li>

                <li style={{ padding: "2%" }}>
                  • Tháo ra khi chơi thể thao hoặc vận động.
                </li>

                <li style={{ padding: "2%" }}>
                  • Vệ sinh định kỳ: Có thể dùng nước ấm pha với một lượng
                  nhỏ kem đánh răng và dùng bàn chải mềm để làm sạch
                  trang sức.
                </li>
              </ul>

              <h3 className="text-4xl md:text-5xl font-black uppercase mt-20 mb-8">
                Storage
              </h3>

              <ul className="space-y-6 text-lg leading-relaxed text-zinc-300">
                <li style={{ padding: "2%" }}>
                  • Avoid chemical exposure: keep jewelry away from
                  cosmetics, perfume, hairspray, hand sanitizers,
                  cleaning agents, and chlorine.
                </li>

                <li style={{ padding: "2%" }}>
                  • Remove jewelry when playing sports or engaging in
                  vigorous activities.
                </li>

                <li style={{ padding: "2%" }}>
                  • Regular cleaning: Use warm water mixed with a small
                  amount of toothpaste and a soft brush to clean the jewelry.
                </li>
              </ul>
            </div>
          </section>
        </div>

        <div className="relative">
          <div>
            <p
              style={{
                fontSize: "clamp(60px, 12vw, 160px)",
                fontWeight: 800,
                marginLeft: "8%",
                lineHeight: 0.9,
                whiteSpace: "nowrap",
              }}
            >
              GODG1FT
            </p>
          </div>
          <div className="absolute left-5 bottom-10 rotate-[-90deg] origin-left">
            <span
              style={{
                padding: "20px 20px 0 0",
                fontFamily: "var(--font-sans)",
                fontSize: "18px",
                fontWeight: "700",
                letterSpacing: "1px",
              }}
              className="tracking-[0.3em] uppercase"
            >GODG1FT</span>
            <span className="tracking-[0.3em] text-zinc-500 uppercase"
              style={{ fontSize: "8px", }}
            >
              @ COPYRIGHT BY GOG1FT JEWELRY
            </span>
          </div>

          <div className="mt-10 flex justify-end">
            <div>
              <p className="text-right text-2xl tracking-[0.2em] text-zinc-300 uppercase"
                style={{ marginRight: "15px" }}>
                Jewelry
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>

  );
}