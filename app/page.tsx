import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SideMenu from "@/components/SideMenu";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <>
      {/* Custom cursor — luôn hiển thị ngược màu nền nhờ mix-blend-mode: difference */}
      <CustomCursor />

      <Header />
      <SideMenu />
      <main>
        <Hero />
      </main>
    </>
  );
}
