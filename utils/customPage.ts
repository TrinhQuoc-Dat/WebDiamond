import { apiFetch } from "@/utils/api";

export const DEFAULT_YEAR_LABEL = "YEAR";

// 1 slide của slider showcase (phần trên trang /custom)
export interface Slide {
  title: string;
  subtitle: string;
  year: string;
  yearLabel: string;
  image: string;
}

export interface CustomPageContent {
  showcase: Slide[];
}

// Dữ liệu mặc định = đúng nội dung đang gán cứng trong CustomShowcase.tsx.
// Dùng làm fallback khi API lỗi/rỗng để trang không bao giờ vỡ.
export const DEFAULT_SHOWCASE: Slide[] = [
  { title: "YOUNG THUG", subtitle: "NECKLACE LIGHTNING", year: "2026", yearLabel: "YEAR", image: "/shop.png" },
  { title: "TRAVIS SCOTT", subtitle: "DIAMOND CHAIN", year: "2025", yearLabel: "YEAR", image: "/hero.png" },
  { title: "DRAKE", subtitle: "LUXURY PENDANT", year: "2024", yearLabel: "YEAR", image: "/shop.png" },
  { title: "LIL BABY", subtitle: "ICE CHOKER", year: "2024", yearLabel: "YEAR", image: "/hero.png" },
  { title: "21 SAVAGE", subtitle: "SKULL RING", year: "2023", yearLabel: "YEAR", image: "/shop.png" },
  { title: "FUTURE", subtitle: "CUBAN LINK", year: "2023", yearLabel: "YEAR", image: "/hero.png" },
  { title: "GUNNA", subtitle: "EMERALD BRACELET", year: "2022", yearLabel: "YEAR", image: "/shop.png" },
];

export const DEFAULT_CUSTOM_PAGE: CustomPageContent = {
  showcase: DEFAULT_SHOWCASE,
};

// Lấy nội dung trang custom từ backend; luôn trả về data hợp lệ (fallback default).
export async function getCustomPage(): Promise<CustomPageContent> {
  try {
    const res = await apiFetch<Partial<CustomPageContent>>("/custom-page");
    const showcase = Array.isArray(res?.showcase) && res.showcase.length > 0
      ? res.showcase
      : DEFAULT_SHOWCASE;
    return { showcase };
  } catch {
    return DEFAULT_CUSTOM_PAGE;
  }
}
