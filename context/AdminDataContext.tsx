"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";
import { apiFetch } from "@/utils/api";

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
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  addBanner: (banner: Omit<Banner, "id">) => Promise<void>;
  updateBanner: (id: string, updated: Partial<Banner>) => Promise<void>;
  deleteBanner: (id: string) => Promise<void>;
  updateContactStatus: (id: string, status: Contact["status"]) => Promise<void>;
  addProduct: (product: AdminProduct) => Promise<void>;
  updateProduct: (slug: string, updated: Partial<AdminProduct>) => Promise<void>;
  toggleProductVisibility: (slug: string) => Promise<void>;
  deleteProduct: (slug: string) => Promise<void>;
  resetAllData: () => void;
}

const AdminDataContext = createContext<AdminContextType | undefined>(undefined);

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const loadAllData = async () => {
    try {
      const [bannersRes, contactsRes, productsRes] = await Promise.all([
        apiFetch<Banner[]>("/admin/banners"),
        apiFetch<{ data: Contact[] }>("/admin/contacts?limit=1000"),
        apiFetch<{ data: AdminProduct[] }>("/admin/products?limit=1000"),
      ]);
      setBanners(bannersRes || []);
      setContacts(contactsRes.data || []);
      setProducts(productsRes.data || []);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu Admin:", err);
    }
  };

  // Tải dữ liệu từ Backend khi khởi tạo
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localLoggedIn = localStorage.getItem("wd_admin_logged_in") === "true";
      setIsLoggedIn(localLoggedIn);
      if (localLoggedIn) {
        loadAllData().then(() => setLoaded(true));
      } else {
        setLoaded(true);
      }
    }
  }, []);

  // Quản lý Banners
  const addBanner = async (newB: Omit<Banner, "id">) => {
    await apiFetch("/admin/banners", {
      method: "POST",
      body: JSON.stringify(newB),
    });
    const bannersRes = await apiFetch<Banner[]>("/admin/banners");
    setBanners(bannersRes || []);
  };

  const updateBanner = async (id: string, updated: Partial<Banner>) => {
    await apiFetch(`/admin/banners/${id}`, {
      method: "PUT",
      body: JSON.stringify(updated),
    });
    const bannersRes = await apiFetch<Banner[]>("/admin/banners");
    setBanners(bannersRes || []);
  };

  const deleteBanner = async (id: string) => {
    await apiFetch(`/admin/banners/${id}`, {
      method: "DELETE",
    });
    const bannersRes = await apiFetch<Banner[]>("/admin/banners");
    setBanners(bannersRes || []);
  };

  // Quản lý Liên hệ
  const updateContactStatus = async (id: string, status: Contact["status"]) => {
    try {
      await apiFetch(`/admin/contacts/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c))
      );
    } catch (e: any) {
      alert(e.message || "Cập nhật trạng thái liên hệ thất bại");
    }
  };

  // Quản lý Sản phẩm
  const addProduct = async (newP: AdminProduct) => {
    const priceValue = parseInt(newP.price.replace(/\./g, "").replace(" VND", "")) || 0;
    const payload = {
      ...newP,
      priceValue,
    };
    await apiFetch("/admin/products", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const productsRes = await apiFetch<{ data: AdminProduct[] }>("/admin/products?limit=1000");
    setProducts(productsRes.data || []);
  };

  const updateProduct = async (slug: string, updated: Partial<AdminProduct>) => {
    const existing = products.find((p) => p.slug === slug);
    if (!existing) return;

    const priceValue = updated.price
      ? (parseInt(updated.price.replace(/\./g, "").replace(" VND", "")) || 0)
      : undefined;

    const payload = {
      ...updated,
      ...(priceValue !== undefined ? { priceValue } : {}),
    };

    await apiFetch(`/admin/products/${(existing as any).id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    const productsRes = await apiFetch<{ data: AdminProduct[] }>("/admin/products?limit=1000");
    setProducts(productsRes.data || []);
  };

  const toggleProductVisibility = async (slug: string) => {
    try {
      const existing = products.find((p) => p.slug === slug);
      if (!existing) return;

      await apiFetch(`/admin/products/${(existing as any).id}/visibility`, {
        method: "PATCH",
      });

      setProducts((prev) =>
        prev.map((p) => (p.slug === slug ? { ...p, hidden: !p.hidden } : p))
      );
    } catch (e: any) {
      alert(e.message || "Không thể thay đổi trạng thái ẩn/hiện sản phẩm");
    }
  };

  const deleteProduct = async (slug: string) => {
    const existing = products.find((p) => p.slug === slug);
    if (!existing) return;

    await apiFetch(`/admin/products/${(existing as any).id}`, {
      method: "DELETE",
    });

    setProducts((prev) => prev.filter((p) => p.slug !== slug));
  };

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const res = await apiFetch<any>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password: pass }),
      });
      if (res && res.accessToken) {
        localStorage.setItem("wd_access_token", res.accessToken);
        localStorage.setItem("wd_admin_logged_in", "true");
        setIsLoggedIn(true);
        // Load data immediately after login
        const [bannersRes, contactsRes, productsRes] = await Promise.all([
          apiFetch<Banner[]>("/admin/banners"),
          apiFetch<{ data: Contact[] }>("/admin/contacts?limit=1000"),
          apiFetch<{ data: AdminProduct[] }>("/admin/products?limit=1000"),
        ]);
        setBanners(bannersRes || []);
        setContacts(contactsRes.data || []);
        setProducts(productsRes.data || []);
        return true;
      }
      return false;
    } catch (err: any) {
      throw new Error(err.message || "Đăng nhập không thành công");
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setBanners([]);
    setContacts([]);
    setProducts([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("wd_admin_logged_in");
      localStorage.removeItem("wd_access_token");
    }
  };

  const resetAllData = () => {
    logout();
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
