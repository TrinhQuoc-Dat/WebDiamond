import { apiFetch } from "@/utils/api";

// 1 slide của slider showcase (phần trên trang /custom)
export interface Slide {
  title: string;
  subtitle: string;
  year: string;
  image: string;
}

export interface CustomPageContent {
  showcase: Slide[];
  yearLabel: string;
}

// Dữ liệu mặc định = đúng nội dung đang gán cứng trong CustomShowcase.tsx.
// Dùng làm fallback khi API lỗi/rỗng để trang không bao giờ vỡ.
export const DEFAULT_SHOWCASE: Slide[] = [
  { title: "YOUNG THUG", subtitle: "NECKLACE LIGHTNING", year: "2026", image: "/shop.png" },
  { title: "TRAVIS SCOTT", subtitle: "DIAMOND CHAIN", year: "2025", image: "/hero.png" },
  { title: "DRAKE", subtitle: "LUXURY PENDANT", year: "2024", image: "/shop.png" },
  { title: "LIL BABY", subtitle: "ICE CHOKER", year: "2024", image: "/hero.png" },
  { title: "21 SAVAGE", subtitle: "SKULL RING", year: "2023", image: "/shop.png" },
  { title: "FUTURE", subtitle: "CUBAN LINK", year: "2023", image: "/hero.png" },
  { title: "GUNNA", subtitle: "EMERALD BRACELET", year: "2022", image: "/shop.png" },
];

export const DEFAULT_YEAR_LABEL = "YEAR";

export const DEFAULT_CUSTOM_PAGE: CustomPageContent = {
  showcase: DEFAULT_SHOWCASE,
  yearLabel: DEFAULT_YEAR_LABEL,
};

// Lấy nội dung trang custom từ backend; luôn trả về data hợp lệ (fallback default).
export async function getCustomPage(): Promise<CustomPageContent> {
  try {
    const res = await apiFetch<Partial<CustomPageContent>>("/custom-page");
    const showcase = Array.isArray(res?.showcase) && res.showcase.length > 0
      ? res.showcase
      : DEFAULT_SHOWCASE;
    const yearLabel = res?.yearLabel ?? DEFAULT_YEAR_LABEL;
    return { showcase, yearLabel };
  } catch {
    return DEFAULT_CUSTOM_PAGE;
  }
}
