import ProductDetailClient from "./ProductDetailClient";
import { API_URL } from "@/utils/api";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;

  // Try fetching the product directly from the backend to pre-render it with real data
  let initialProduct = null;
  try {
    const res = await fetch(`${API_URL}/products/${resolvedParams.slug}`, {
      next: { revalidate: 60 }, // cache for 60 seconds
    });
    if (res.ok) {
      initialProduct = await res.json();
    }
  } catch (e) {
    console.warn(`Could not pre-fetch product detail for slug ${resolvedParams.slug}:`, e);
  }

  return <ProductDetailClient slug={resolvedParams.slug} initialProduct={initialProduct} />;
}

// Generate static paths for Next.js to pre-render the pages at build time
export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_URL}/products?limit=1000`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const payload = await res.json();
    const data = payload.data || [];
    return data.map((product: any) => ({
      slug: product.slug,
    }));
  } catch (e) {
    console.warn("Could not fetch products from backend for static generation:", e);
    return [];
  }
}

