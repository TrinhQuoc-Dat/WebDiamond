import { useEffect, useState } from "react";
import { Product } from "@/data/products";
import { apiFetch } from "@/utils/api";

export interface PublicProduct extends Product {
  hidden?: boolean;
}

export function usePublicProducts() {
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await apiFetch<{ data: PublicProduct[]; total: number }>("/products?limit=100");
        setProducts(response.data || []);
      } catch (err: any) {
        console.error("Lỗi khi tải sản phẩm công khai:", err);
        setError(err.message || "Không thể tải danh sách sản phẩm");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const activeProducts = products.filter((p) => !p.hidden);

  return { products: activeProducts, loading, error };
}
