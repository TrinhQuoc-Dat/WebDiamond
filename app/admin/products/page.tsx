"use client";

import React, { useState } from "react";
import { useAdminData, AdminProduct } from "@/context/AdminDataContext";
import Modal from "@/components/admin/Modal";
import ProductForm from "@/components/admin/ProductForm";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

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

  const categoryOptions = categories.map(cat => ({ label: cat.toUpperCase(), value: cat }));
  const visibilityOptions = [
    { label: "TẤT CẢ TRẠNG THÁI", value: "Tất cả" },
    { label: "ĐANG HIỂN THỊ", value: "Hiển thị" },
    { label: "ĐANG ẨN", value: "Đang ẩn" }
  ];

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

  // --- CÁC TEMPLATE CỘT CHO DATATABLE ---
  const imageBodyTemplate = (p: AdminProduct) => (
    <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#1C1C1E] bg-black mx-auto">
      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
    </div>
  );

  const infoBodyTemplate = (p: AdminProduct) => (
    <div>
      <div className="font-semibold text-white truncate max-w-xs text-sm">{p.name}</div>
      <div className="text-[10px] text-gray-500 font-mono truncate max-w-xs mt-1.5">{p.slug}</div>
    </div>
  );

  const categoryBodyTemplate = (p: AdminProduct) => (
    <div className="flex flex-wrap items-center gap-2">
      <span className="px-3 py-1 bg-white/[0.02] border border-[#1C1C1E] rounded-lg text-[10px] font-bold text-gray-300 uppercase tracking-wider">
        {p.category}
      </span>
      {p.tag && (
        <span className="px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-lg text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
          {p.tag}
        </span>
      )}
    </div>
  );

  const visibilityBodyTemplate = (p: AdminProduct) => (
    <button
      onClick={() => toggleProductVisibility(p.slug)}
      className={`flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all duration-300 border ${
        p.hidden
          ? "bg-red-500/5 text-red-500 border-red-500/30 hover:bg-red-500/10"
          : "bg-[#00E676]/5 text-[#00E676] border-[#00E676]/30 hover:bg-[#00E676]/10"
      }`}
      style={{ width: '90px', letterSpacing: '0.05em' }}
    >
      {p.hidden ? (
        <>
          <i className="pi pi-eye-slash" style={{ fontSize: '10px' }} /> Đang ẩn
        </>
      ) : (
        <>
          <i className="pi pi-eye" style={{ fontSize: '10px' }} /> Hiển thị
        </>
      )}
    </button>
  );

  const actionBodyTemplate = (p: AdminProduct) => (
    <div className="flex justify-end gap-3">
      <Button
        icon="pi pi-pencil"
        rounded
        text
        severity="info"
        aria-label="Edit"
        onClick={() => handleOpenEditModal(p)}
        style={{ width: '36px', height: '36px', color: '#60A5FA', background: 'rgba(96, 165, 250, 0.1)', flexShrink: 0 }}
      />
      <Button
        icon="pi pi-trash"
        rounded
        text
        severity="danger"
        aria-label="Delete"
        onClick={() => handleDelete(p.slug, p.name)}
        style={{ width: '36px', height: '36px', color: '#F87171', background: 'rgba(248, 113, 113, 0.1)', flexShrink: 0 }}
      />
    </div>
  );
  // ----------------------------------------

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
          className="flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#C5A02E] text-black font-bold uppercase transition-all duration-300 shadow-lg hover:shadow-[#D4AF37]/20 hover:-translate-y-0.5 active:translate-y-0"
          style={{
            padding: "10px 18px",
            borderRadius: "8px",
            fontSize: "11px",
            letterSpacing: "0.05em",
          }}
        >
          <i className="pi pi-plus" style={{ fontSize: '10px', fontWeight: 'bold' }}></i>
          <span>Đăng sản phẩm mới</span>
        </button>
      </div>

      {/* Filter Options panel */}
      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#121214] border border-[#1C1C1E] rounded-xl shadow-lg"
        style={{ padding: "14px 20px" }}
      >
        {/* Search */}
        <div className="flex items-center gap-3">
          <span className="p-input-icon-left w-full relative">
            <i className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <InputText
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên sản phẩm, slug, giá..."
              style={{
                width: "100%",
                height: 48,
                backgroundColor: "#0D0D0F",
                border: "1px solid #2A2A30",
                borderRadius: 12,
                color: "rgba(255,255,255,0.9)",
                fontSize: 13,
                paddingLeft: "40px"
              }}
            />
          </span>
        </div>

        {/* Category */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 font-semibold uppercase whitespace-nowrap">Danh mục:</span>
          <Dropdown
            value={selectedCategory}
            options={categoryOptions}
            onChange={(e) => setSelectedCategory(e.value)}
            style={{
              width: "100%",
              height: 48,
              backgroundColor: "#0D0D0F",
              border: "1px solid #2A2A30",
              borderRadius: 12,
              color: "rgba(255,255,255,0.9)",
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              alignItems: "center"
            }}
            panelClassName="dark-dropdown-panel uppercase-dropdown"
          />
        </div>

        {/* Visibility */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 font-semibold uppercase whitespace-nowrap">Trạng thái:</span>
          <Dropdown
            value={visibilityFilter}
            options={visibilityOptions}
            onChange={(e) => setVisibilityFilter(e.value)}
            style={{
              width: "100%",
              height: 48,
              backgroundColor: "#0D0D0F",
              border: "1px solid #2A2A30",
              borderRadius: 12,
              color: "rgba(255,255,255,0.9)",
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              alignItems: "center"
            }}
            panelClassName="dark-dropdown-panel uppercase-dropdown"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#121214] border border-[#1C1C1E] rounded-xl overflow-hidden shadow-lg custom-admin-table">
        <DataTable
          value={filteredProducts}
          emptyMessage={<div className="text-center py-12 text-gray-500"><i className="pi pi-inbox text-4xl text-[#D4AF37] opacity-50 mb-4 block" />Không tìm thấy sản phẩm nào.</div>}
          rowClassName={(p) => (p.hidden ? "opacity-60 bg-black/[0.2]" : "")}
          responsiveLayout="scroll"
        >
          <Column header="Ảnh" body={imageBodyTemplate} style={{ width: '100px', textAlign: 'center' }} align="center" />
          <Column header="Thông tin sản phẩm" body={infoBodyTemplate} />
          <Column field="price" header="Giá bán" style={{ fontWeight: 'bold', color: 'white' }} />
          <Column header="Danh mục / Nhãn" body={categoryBodyTemplate} />
          <Column header="Hiển thị" body={visibilityBodyTemplate} style={{ width: '150px' }} />
          <Column header="Thao tác" body={actionBodyTemplate} style={{ width: '120px', textAlign: 'right' }} align="right" />
        </DataTable>
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
