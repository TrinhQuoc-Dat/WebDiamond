import { products } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}

// Generate static paths for Next.js to pre-render the pages at build time
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}
