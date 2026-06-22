"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, products as initialProducts } from "@/data/products";

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  type?: "image" | "video";
  link: string;
  active: boolean;
  muted?: boolean;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  status: "Mới" | "Đang xử lý" | "Đã xử lý";
}

export interface AdminProduct extends Product {
  hidden?: boolean;
}

interface AdminContextType {
  banners: Banner[];
  contacts: Contact[];
  products: AdminProduct[];
  isLoggedIn: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  addBanner: (banner: Omit<Banner, "id">) => void;
  updateBanner: (id: string, updated: Partial<Banner>) => void;
  deleteBanner: (id: string) => void;
  updateContactStatus: (id: string, status: Contact["status"]) => void;
  addProduct: (product: AdminProduct) => void;
  updateProduct: (slug: string, updated: Partial<AdminProduct>) => void;
  toggleProductVisibility: (slug: string) => void;
  deleteProduct: (slug: string) => void;
  resetAllData: () => void;
}

const AdminDataContext = createContext<AdminContextType | undefined>(undefined);

// Mock dữ liệu ban đầu cho banner
const defaultBanners: Banner[] = [
  {
    id: "banner-1",
    title: "GODG1FT",
    subtitle: "Shop All",
    image: "/videobanner.mp4",
    type: "video",
    link: "/shop",
    active: true,
    muted: true,
  },
  {
    id: "banner-2",
    title: "Luxury Collection",
    subtitle: "New Arrival",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=1600&q=80&auto=format&fit=crop",
    type: "image",
    link: "/shop",
    active: false,
    muted: true,
  }
];

// Mock dữ liệu ban đầu cho liên hệ
const defaultContacts: Contact[] = [
  {
    id: "ct-1",
    name: "Nguyễn Văn An",
    email: "an.nguyen@gmail.com",
    phone: "0912345678",
    message: "Tôi muốn nhận thông tin tư vấn thiết kế nhẫn cưới kim cương 18K bản giới hạn. Xin cám ơn!",
    createdAt: "2026-06-20T10:30:00.000Z",
    status: "Mới",
  },
  {
    id: "ct-2",
    name: "Trần Thị Bình",
    email: "binh.tran@yahoo.com",
    phone: "0987654321",
    message: "Sản phẩm dây chuyền 'NECKLACE LIGHTNING III' hiện tại cửa hàng ở TP.HCM còn hàng trưng bày không ạ? Tôi muốn qua xem trực tiếp.",
    createdAt: "2026-06-19T14:15:00.000Z",
    status: "Đang xử lý",
  },
  {
    id: "ct-3",
    name: "Lê Hoàng Nam",
    email: "nam.le@outlook.com",
    phone: "0905556677",
    message: "Hỗ trợ xuất hóa đơn VAT cho doanh nghiệp khi mua sản phẩm lắc tay vàng trắng đính kim cương không?",
    createdAt: "2026-06-18T09:00:00.000Z",
    status: "Đã xử lý",
  },
  {
    id: "ct-4",
    name: "Phạm Minh Hoàng",
    email: "hoang.pham@gmail.com",
    phone: "0934112233",
    message: "Tôi ở Hà Nội, đặt giao hàng hỏa tốc trong ngày thì phí ship và thời gian nhận hàng như thế nào?",
    createdAt: "2026-06-20T16:45:00.000Z",
    status: "Mới",
  }
];

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Tải dữ liệu từ LocalStorage khi khởi tạo
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const localBanners = localStorage.getItem("wd_banners");
        const localContacts = localStorage.getItem("wd_contacts");
        const localProducts = localStorage.getItem("wd_products");
        const localLoggedIn = localStorage.getItem("wd_admin_logged_in") === "true";

        // Xử lý và làm sạch dữ liệu banner để tránh lỗi nhiều banner active cùng lúc
        let initialBanners = defaultBanners;
        if (localBanners) {
          try {
            const parsed = JSON.parse(localBanners) as Banner[];

            // Auto-migrate: nếu banner-1 vẫn còn dùng hero.png cũ → đổi sang videobanner.mp4
            const migrated = parsed.map((b) => {
              if (b.id === "banner-1" && b.image === "/hero.png" && b.type === "image") {
                return { ...b, image: "/videobanner.mp4", type: "video" as const, title: "GODG1FT" };
              }
              return b;
            });

            let hasActive = false;
            initialBanners = migrated.map((b) => {
              if (b.active) {
                if (hasActive) {
                  return { ...b, active: false }; // De-activate các banner active trùng lặp phía sau
                }
                hasActive = true;
              }
              return b;
            });
            // Nếu không có banner nào active, kích hoạt banner đầu tiên
            if (!hasActive && initialBanners.length > 0) {
              initialBanners[0] = { ...initialBanners[0], active: true };
            }
          } catch (err) {
            initialBanners = defaultBanners;
          }
        }
        setBanners(initialBanners);
        setContacts(localContacts ? JSON.parse(localContacts) : defaultContacts);
        setIsLoggedIn(localLoggedIn);
        
        if (localProducts) {
          try {
            const parsed = JSON.parse(localProducts) as AdminProduct[];
            const migrated = parsed.map((p) => {
              if (
                p.category === "NECKLACE" &&
                JSON.stringify(p.sizes) === JSON.stringify(["S", "M", "L", "XL"])
              ) {
                return { ...p, sizes: ["40", "45", "50", "55"] };
              }
              if (
                p.category === "BRACELETS" &&
                JSON.stringify(p.sizes) === JSON.stringify(["S", "M", "L", "XL"])
              ) {
                return { ...p, sizes: ["16", "17", "18", "19"] };
              }
              return p;
            });
            setProducts(migrated);
          } catch {
            setProducts(initialProducts.map((p) => ({ ...p, hidden: false })));
          }
        } else {
          // Gán mặc định trạng thái hidden: false cho các sản phẩm gốc
          const mapped = initialProducts.map((p) => ({ ...p, hidden: false }));
          setProducts(mapped);
        }
      } catch (e) {
        console.error("Lỗi khi đọc dữ liệu từ localStorage", e);
        setBanners(defaultBanners);
        setContacts(defaultContacts);
        setProducts(initialProducts.map((p) => ({ ...p, hidden: false })));
      }
      setLoaded(true);
    }
  }, []);

  // Lưu dữ liệu vào LocalStorage mỗi khi thay đổi
  useEffect(() => {
    if (loaded && typeof window !== "undefined") {
      localStorage.setItem("wd_banners", JSON.stringify(banners));
    }
  }, [banners, loaded]);

  useEffect(() => {
    if (loaded && typeof window !== "undefined") {
      localStorage.setItem("wd_contacts", JSON.stringify(contacts));
    }
  }, [contacts, loaded]);

  useEffect(() => {
    if (loaded && typeof window !== "undefined") {
      localStorage.setItem("wd_products", JSON.stringify(products));
    }
  }, [products, loaded]);

  // Quản lý Banners
  const addBanner = (newB: Omit<Banner, "id">) => {
    const banner: Banner = {
      ...newB,
      id: `banner-${Date.now()}`,
    };
    setBanners((prev) => {
      // Nếu banner mới có active = true, ta phải deactivate tất cả các banner hiện tại
      if (banner.active) {
        return prev.map((b) => ({ ...b, active: false })).concat(banner);
      }
      return [...prev, banner];
    });
  };

  const updateBanner = (id: string, updated: Partial<Banner>) => {
    setBanners((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          // Nếu cập nhật active: true, đặt các banner khác thành false
          return { ...b, ...updated };
        }
        if (updated.active && b.id !== id) {
          return { ...b, active: false };
        }
        return b;
      })
    );
  };

  const deleteBanner = (id: string) => {
    setBanners((prev) => {
      const filtered = prev.filter((b) => b.id !== id);
      // Nếu xóa banner đang active, đặt banner đầu tiên còn lại thành active
      if (filtered.length > 0 && !filtered.some((b) => b.active)) {
        const copy = [...filtered];
        copy[0] = { ...copy[0], active: true };
        return copy;
      }
      return filtered;
    });
  };

  // Quản lý Liên hệ
  const updateContactStatus = (id: string, status: Contact["status"]) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  // Quản lý Sản phẩm
  const addProduct = (newP: AdminProduct) => {
    setProducts((prev) => [newP, ...prev]);
  };

  const updateProduct = (slug: string, updated: Partial<AdminProduct>) => {
    setProducts((prev) =>
      prev.map((p) => (p.slug === slug ? { ...p, ...updated } : p))
    );
  };

  const toggleProductVisibility = (slug: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.slug === slug ? { ...p, hidden: !p.hidden } : p))
    );
  };

  const deleteProduct = (slug: string) => {
    setProducts((prev) => prev.filter((p) => p.slug !== slug));
  };

  const login = (email: string, pass: string): boolean => {
    if (email === "admin@webdiamond.com" && pass === "admin123") {
      setIsLoggedIn(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("wd_admin_logged_in", "true");
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("wd_admin_logged_in");
    }
  };

  const resetAllData = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("wd_banners");
      localStorage.removeItem("wd_contacts");
      localStorage.removeItem("wd_products");
      localStorage.removeItem("wd_admin_logged_in");
      setBanners(defaultBanners);
      setContacts(defaultContacts);
      setProducts(initialProducts.map((p) => ({ ...p, hidden: false })));
      setIsLoggedIn(false);
    }
  };

  return (
    <AdminDataContext.Provider
      value={{
        banners,
        contacts,
        products,
        isLoggedIn,
        login,
        logout,
        addBanner,
        updateBanner,
        deleteBanner,
        updateContactStatus,
        addProduct,
        updateProduct,
        toggleProductVisibility,
        deleteProduct,
        resetAllData,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (context === undefined) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
};
