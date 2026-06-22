import { useEffect, useState } from "react";
import { products as staticProducts, Product } from "@/data/products";

export interface PublicProduct extends Product {
  hidden?: boolean;
}

export function usePublicProducts() {
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("wd_products");
      const parsed: PublicProduct[] = stored
        ? JSON.parse(stored)
        : staticProducts.map((p) => ({ ...p, hidden: false }));
      setProducts(parsed);
    } catch {
      setProducts(staticProducts.map((p) => ({ ...p, hidden: false })));
    } finally {
      setLoading(false);
    }
  }, []);

  const activeProducts = products.filter((p) => !p.hidden);

  return { products: activeProducts, loading };
}
