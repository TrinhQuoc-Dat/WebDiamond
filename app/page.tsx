import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SideMenu from "@/components/SideMenu";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Header />
      <SideMenu />
      <main>
        <Hero />
      </main>
    </>
  );
}
