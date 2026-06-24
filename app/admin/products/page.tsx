"use client";

import React, { useState } from "react";
import { useAdminData, AdminProduct } from "@/context/AdminDataContext";
import Modal from "@/components/admin/Modal";
import ProductForm from "@/components/admin/ProductForm";

export default function ProductsPage() {
  const { products, addProduct, updateProduct, toggleProductVisibility, deleteProduct } = useAdminData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  // Bộ lọc
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [visibilityFilter, setVisibilityFilter] = useState("Tất cả"); // Tất cả, Hiển thị, Đang ẩn

  // Lấy các danh mục hiện tại để lọc động
  const categories = ["Tất cả", ...Array.from(new Set(products.map((p) => p.category)))];

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (product: AdminProduct) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleFormSubmit = async (data: AdminProduct) => {
    try {
      if (editingProduct) {
        // Chế độ sửa
        await updateProduct(editingProduct.slug, data);
      } else {
        // Chế độ thêm
        // Kiểm tra trùng lặp slug
        if (products.some((p) => p.slug === data.slug)) {
          return alert("Slug sản phẩm đã tồn tại trong hệ thống. Vui lòng nhập slug khác!");
        }
        await addProduct(data);
      }
      setModalOpen(false);
    } catch (err: any) {
      alert(err.message || "Thao tác sản phẩm thất bại");
    }
  };

  const handleDelete = async (slug: string, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${name}"? Thao tác này không thể khôi phục.`)) {
      try {
        await deleteProduct(slug);
      } catch (err: any) {
        alert(err.message || "Xóa sản phẩm thất bại");
      }
    }
  };

  // Lọc dữ liệu sản phẩm
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.price.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === "Tất cả" || p.category === selectedCategory;
    
    let matchesVisibility = true;
    if (visibilityFilter === "Hiển thị") {
      matchesVisibility = !p.hidden;
    } else if (visibilityFilter === "Đang ẩn") {
      matchesVisibility = !!p.hidden;
    }

    return matchesSearch && matchesCategory && matchesVisibility;
  });

  return (
    <div className="space-y-12 animate-fade-in text-sm text-gray-300">
      {/* Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-[#1C1C1E] pb-8 pt-2">
        <div>
          <h1 className="text-3xl font-bold tracking-wider text-white uppercase">
            Quản lý Sản phẩm
          </h1>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            Đăng bài viết mới, điều chỉnh phân loại sản phẩm trang sức, giá bán và thiết lập ẩn/hiện sản phẩm trên shop.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C5A02E] text-black font-bold text-xs uppercase tracking-widest transition-all duration-300 self-start sm:self-auto shadow-lg"
          style={{
            padding: "12px 24px",
            borderRadius: "8px",
            lineHeight: "1.2",
            cursor: "pointer"
          }}
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Đăng sản phẩm mới
        </button>
      </div>

      {/* Filter Options panel */}
      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#121214] border border-[#1C1C1E] rounded-xl shadow-lg"
        style={{ padding: "14px 20px" }}
      >
        {/* Search */}
        <div 
          className="flex items-center gap-2.5 bg-white/[0.02] border border-[#1C1C1E] rounded-xl w-full focus-within:border-[#D4AF37]/50 focus-within:bg-white/[0.04] transition-all duration-300"
          style={{ padding: "9px 14px" }}
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên sản phẩm, slug, giá..."
            className="bg-transparent text-gray-200 outline-none w-full placeholder-gray-500"
            style={{ fontSize: "12.5px", lineHeight: "1.2" }}
          />
        </div>

        {/* Category */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 font-semibold uppercase whitespace-nowrap">Danh mục:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-white/[0.02] border border-[#1C1C1E] rounded-xl text-white outline-none focus:border-[#D4AF37]/50"
            style={{ padding: "9px 14px", fontSize: "12.5px", lineHeight: "1.2", cursor: "pointer" }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-[#121214]">
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Visibility */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 font-semibold uppercase whitespace-nowrap">Trạng thái:</span>
          <select
            value={visibilityFilter}
            onChange={(e) => setVisibilityFilter(e.target.value)}
            className="w-full bg-white/[0.02] border border-[#1C1C1E] rounded-xl text-white outline-none focus:border-[#D4AF37]/50"
            style={{ padding: "9px 14px", fontSize: "12.5px", lineHeight: "1.2", cursor: "pointer" }}
          >
            <option value="Tất cả" className="bg-[#121214]">Tất cả trạng thái</option>
            <option value="Hiển thị" className="bg-[#121214]">Đang hiển thị (Visible)</option>
            <option value="Đang ẩn" className="bg-[#121214]">Đang ẩn (Hidden)</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#121214] border border-[#1C1C1E] rounded-xl overflow-hidden shadow-lg">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#D4AF37]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            Không tìm thấy sản phẩm nào.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1C1C1E] bg-white/[0.01]">
                  <th className="px-8 py-6 text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] w-24">Hình ảnh</th>
                  <th className="px-8 py-6 text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em]">Thông tin sản phẩm</th>
                  <th className="px-8 py-6 text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em]">Giá bán</th>
                  <th className="px-8 py-6 text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em]">Danh mục / Nhãn</th>
                  <th className="px-8 py-6 text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] w-36">Hiển thị</th>
                  <th className="px-8 py-6 text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] text-right w-40">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1C1E]/50">
                {filteredProducts.map((p) => (
                  <tr
                    key={p.slug}
                    className={`transition-colors hover:bg-white/[0.01] ${
                      p.hidden ? "opacity-45 bg-black/[0.05]" : ""
                    }`}
                  >
                    {/* Image */}
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#1C1C1E] bg-black">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                    </td>

                    {/* Basic Info */}
                    <td className="px-8 py-6">
                      <div className="font-semibold text-white truncate max-w-xs text-sm">{p.name}</div>
                      <div className="text-[10px] text-gray-500 font-mono truncate max-w-xs mt-1.5">{p.slug}</div>
                    </td>

                    {/* Price */}
                    <td className="px-8 py-6 whitespace-nowrap font-bold text-white text-sm">
                      {p.price}
                    </td>

                    {/* Category & Tag */}
                    <td className="px-8 py-6 whitespace-nowrap">
                      <span className="px-3 py-1 bg-white/[0.02] border border-[#1C1C1E] rounded-lg text-[10px] font-bold text-gray-300 uppercase tracking-wider">
                        {p.category}
                      </span>
                      {p.tag && (
                        <span className="ml-2.5 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-lg text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                          {p.tag}
                        </span>
                      )}
                    </td>

                    {/* Visibility Action */}
                    <td className="px-8 py-6 whitespace-nowrap">
                      <button
                        onClick={() => toggleProductVisibility(p.slug)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all duration-300 ${
                          p.hidden
                            ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/25"
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/25"
                        }`}
                      >
                        {p.hidden ? (
                          <>
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                            Đang ẩn
                          </>
                        ) : (
                          <>
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Hiển thị
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-8 py-6 whitespace-nowrap text-right text-xs">
                      <div className="flex justify-end gap-2.5">
                        {/* Edit Button */}
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-2.5 bg-white/[0.02] hover:bg-white/[0.06] text-gray-400 hover:text-white border border-[#1C1C1E] rounded-xl transition-all"
                          title="Sửa sản phẩm"
                        >
                          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(p.slug, p.name)}
                          className="p-2.5 bg-white/[0.02] hover:bg-red-500/5 text-gray-400 hover:text-red-400 border border-[#1C1C1E] hover:border-red-500/20 rounded-xl transition-all"
                          title="Xóa sản phẩm"
                        >
                          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit/Add Product Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProduct ? "Chỉnh sửa thông tin Sản phẩm" : "Đăng sản phẩm mới"}
        size="lg"
      >
        <ProductForm
          initialProduct={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
