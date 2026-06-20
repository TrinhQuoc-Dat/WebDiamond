import { products } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);

  // Không gọi notFound() ở server để client có cơ hội tìm sản phẩm mới trong LocalStorage
  return <ProductDetailClient slug={resolvedParams.slug} initialProduct={product || null} />;
}

// Generate static paths for Next.js to pre-render the pages at build time
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

