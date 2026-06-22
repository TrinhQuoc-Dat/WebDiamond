import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SideMenu from "@/components/SideMenu";

export default function Home() {
  return (
    <>
      <Header />
      <SideMenu />
      <main>
        <Hero />
      </main>
    </>
  );
}
