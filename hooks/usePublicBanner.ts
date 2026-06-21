import { useEffect, useState } from "react";
import { Banner } from "@/context/AdminDataContext";

const defaultBanner: Banner = {
  id: "banner-1",
  title: "GODG1FT",
  subtitle: "Shop All",
  image: "/videobanner.mp4",
  type: "video",
  link: "/shop",
  active: true,
  muted: true,
};

export function usePublicBanner() {
  const [banner, setBanner] = useState<Banner | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("wd_banners");
      if (stored) {
        const banners: Banner[] = JSON.parse(stored);
        const migrated = banners.map((b) =>
          b.id === "banner-1" && b.image === "/hero.png"
            ? { ...b, image: "/videobanner.mp4", type: "video" as const }
            : b
        );
        const active = migrated.find((b) => b.active) ?? null;
        setBanner(active);
      } else {
        setBanner(defaultBanner);
      }
    } catch {
      setBanner(defaultBanner);
    }
  }, []);

  return { banner };
}
