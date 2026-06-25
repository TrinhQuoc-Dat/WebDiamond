"use client";

import React, { useState, useEffect } from "react";
import { AdminProduct } from "@/context/AdminDataContext";

interface ProductFormProps {
  initialProduct?: AdminProduct | null;
  onSubmit: (data: AdminProduct) => void;
  onCancel: () => void;
}

const CATEGORIES = ["NECKLACE", "BRACELETS", "RINGS", "EARINGS"];
const TAGS = ["Bestseller", "New", "Limited"];

// Gợi ý một số ảnh Unsplash trang sức chất lượng cao để test
const PRESET_IMAGES = [
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=80&auto=format&fit=crop",
];

export default function ProductForm({ initialProduct, onSubmit, onCancel }: ProductFormProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("NECKLACE");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [tag, setTag] = useState<string>("");
  const [spec, setSpec] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [detailUrlInput, setDetailUrlInput] = useState("");
  
  // Biến thể tự tạo
  const [customColorName, setCustomColorName] = useState("");
  const [customColorHex, setCustomColorHex] = useState("#D4AF37");
  const [customSize, setCustomSize] = useState("");
  
  // Danh sách các mô tả dòng (Description Points)
  const [descPoints, setDescPoints] = useState<string[]>([""]);
  
  // Màu sắc & kích thước
  const [selectedColors, setSelectedColors] = useState<{ id: string; name: string; hex: string }[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  // Tải dữ liệu ban đầu nếu là chế độ chỉnh sửa (Edit)
  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setSlug(initialProduct.slug);
      setCategory(initialProduct.category);
      setPrice(initialProduct.price);
      setImage(initialProduct.image);
      setTag(initialProduct.tag || "");
      setSpec(initialProduct.spec || "");
      setDescPoints(initialProduct.description && initialProduct.description.length > 0 ? initialProduct.description : [""]);
      setSelectedColors(initialProduct.colors || []);
      setSelectedSizes(initialProduct.sizes || []);
      setAdditionalImages(initialProduct.images || [initialProduct.image]);

      if (initialProduct.image.startsWith("data:") || initialProduct.image.startsWith("blob:")) {
        setUploadedFileName("Tệp tin cục bộ đã lưu");
      } else {
        setUploadedFileName("");
      }
    } else {
      // Giá trị mặc định cho sản phẩm mới (để trống hoàn toàn)
      setName("");
      setSlug("");
      setCategory("NECKLACE");
      setPrice("");
      setImage("");
      setTag("");
      setSpec("");
      setDescPoints([""]);
      setSelectedColors([]);
      setSelectedSizes([]);
      setUploadedFileName("");
      setAdditionalImages([]);
    }
  }, [initialProduct]);

  // Tự động tạo slug khi gõ tên sản phẩm
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!initialProduct) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setSlug(generatedSlug);
    }
  };

  // Quản lý mô tả
  const handleAddDescPoint = () => {
    setDescPoints([...descPoints, ""]);
  };

  const handleRemoveDescPoint = (index: number) => {
    const copy = [...descPoints];
    copy.splice(index, 1);
    setDescPoints(copy.length === 0 ? [""] : copy);
  };

  const handleDescPointChange = (index: number, val: string) => {
    const copy = [...descPoints];
    copy[index] = val;
    setDescPoints(copy);
  };

  // Thêm màu sắc mới
  const handleAddColor = () => {
    if (!customColorName.trim()) return alert("Vui lòng nhập tên màu");
    const nameUpper = customColorName.trim();
    // Tạo ID duy nhất cho màu sắc
    const id = `color-${nameUpper.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;
    const hex = customColorHex;

    // Tránh trùng lặp Tên màu
    if (selectedColors.some(c => c.name.toLowerCase() === nameUpper.toLowerCase())) {
      return alert("Tên màu sắc này đã được thêm!");
    }

    setSelectedColors([...selectedColors, { id, name: nameUpper, hex }]);
    setCustomColorName("");
  };

  // Xóa màu sắc
  const handleRemoveColor = (id: string) => {
    setSelectedColors(selectedColors.filter(c => c.id !== id));
  };

  // Thêm kích thước mới
  const handleAddSize = () => {
    if (!customSize.trim()) return alert("Vui lòng nhập kích thước");
    const sizeUpper = customSize.trim().toUpperCase();

    // Tránh trùng lặp kích thước
    if (selectedSizes.includes(sizeUpper)) {
      return alert("Kích thước này đã được thêm!");
    }

    setSelectedSizes([...selectedSizes, sizeUpper]);
    setCustomSize("");
  };

  // Xóa kích thước
  const handleRemoveSize = (size: string) => {
    setSelectedSizes(selectedSizes.filter(s => s !== size));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);

    const limit = 2.5 * 1024 * 1024; // 2.5 MB
    if (file.size > limit) {
      const objectUrl = URL.createObjectURL(file);
      setImage(objectUrl);
      alert(
        `Lưu ý: Tệp tin này khá lớn (${(file.size / (1024 * 1024)).toFixed(1)}MB). ` +
        `Để tránh lỗi bộ nhớ trình duyệt (LocalStorage), hệ thống sẽ sử dụng liên kết tạm thời. ` +
        `Ảnh sẽ hoạt động tốt trong phiên làm việc này, nhưng có thể bị mất khi bạn tải lại trang (F5).`
      );
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handleMultipleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const limit = 2.5 * 1024 * 1024; // 2.5 MB
    let hasLargeFile = false;
    let largeFileSizes = 0;

    const filePromises = Array.from(files).map((file) => {
      return new Promise<string>((resolve) => {
        if (file.size > limit) {
          hasLargeFile = true;
          largeFileSizes = file.size;
          const objectUrl = URL.createObjectURL(file);
          resolve(objectUrl);
        } else {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              resolve(event.target.result as string);
            } else {
              resolve("");
            }
          };
          reader.readAsDataURL(file);
        }
      });
    });

    Promise.all(filePromises).then((results) => {
      const validResults = results.filter((res) => res !== "");
      if (validResults.length > 0) {
        setAdditionalImages((prev) => [...prev, ...validResults]);
        if (hasLargeFile) {
          alert(
            `Lưu ý: Có tệp tin khá lớn (${(largeFileSizes / (1024 * 1024)).toFixed(1)}MB). ` +
            `Để tránh lỗi bộ nhớ trình duyệt (LocalStorage), hệ thống sẽ sử dụng liên kết tạm thời cho các tệp lớn này. ` +
            `Ảnh sẽ hoạt động tốt trong phiên làm việc này, nhưng có thể bị mất khi bạn tải lại trang (F5).`
          );
        }
      }
    });
    e.target.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return alert("Vui lòng nhập tên sản phẩm");
    if (!slug.trim()) return alert("Vui lòng nhập slug");
    if (!price.trim()) return alert("Vui lòng nhập giá sản phẩm");
    if (!image.trim()) return alert("Vui lòng nhập/chọn ảnh sản phẩm");

    const submittedData: AdminProduct = {
      slug: slug.trim(),
      name: name.trim().toUpperCase(), // Đồng bộ chữ in hoa ở dữ liệu mẫu
      category,
      price: price.trim(),
      image: image.trim(),
      images: additionalImages.length > 0 ? additionalImages : [image.trim()],
      tag: tag || null,
      description: descPoints.filter((pt) => pt.trim() !== ""),
      spec: spec.trim(),
      colors: selectedColors,
      sizes: selectedSizes,
      hidden: initialProduct ? initialProduct.hidden : false,
    };

    onSubmit(submittedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-sm text-gray-300">
      {/* Thông tin cơ bản */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Tên sản phẩm *</label>
          <input
            type="text"
            required
            value={name}
            onChange={handleNameChange}
            placeholder="Ví dụ: Lắc tay Diamond Premium"
            className="w-full bg-[#1A1A1E] border border-[#2A2A30] rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#D4AF37] transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Đường dẫn tĩnh (Slug) *</label>
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="vi-du-lac-tay-diamond"
            className="w-full bg-[#1A1A1E] border border-[#2A2A30] rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#D4AF37] transition-all font-mono text-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Danh mục *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-[#1A1A1E] border border-[#2A2A30] rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#D4AF37] transition-all"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Giá bán *</label>
          <input
            type="text"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="50.000.000 VNĐ"
            className="w-full bg-[#1A1A1E] border border-[#2A2A30] rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#D4AF37] transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Nhãn đính kèm (Tag)</label>
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-full bg-[#1A1A1E] border border-[#2A2A30] rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#D4AF37] transition-all"
          >
            <option value="">Không có nhãn</option>
            {TAGS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ảnh sản phẩm */}
      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">URL Hình ảnh *</label>
        
        {uploadedFileName ? (
          <div className="flex items-center justify-between bg-[#1A1A1E] border border-[#D4AF37]/40 rounded-xl px-4 py-2.5 text-white mb-3 animate-fade-in">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 bg-[#D4AF37]/10 text-[#D4AF37] rounded-xl shrink-0">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Đã tải lên tệp tin từ máy:</span>
                <span className="block text-xs text-[#D4AF37] font-semibold truncate font-mono mt-0.5" title={uploadedFileName}>{uploadedFileName}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setUploadedFileName("");
                setImage("");
              }}
              className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 rounded-lg transition-all text-xs font-bold uppercase tracking-wider"
              style={{ cursor: "pointer" }}
            >
              Xóa tệp
            </button>
          </div>
        ) : (
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="flex-1 bg-[#1A1A1E] border border-[#2A2A30] rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#D4AF37] transition-all font-mono text-xs animate-fade-in"
            />
            <button
              type="button"
              onClick={() => document.getElementById("product-file-input")?.click()}
              className="p-2.5 bg-white/[0.03] hover:bg-white/[0.08] text-gray-400 hover:text-white border border-[#2A2A30] hover:border-[#D4AF37]/50 rounded-xl transition-all flex items-center justify-center shrink-0 w-11 h-11"
              style={{ cursor: "pointer" }}
              title="Chọn ảnh từ máy tính"
            >
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
            </button>
          </div>
        )}

        <input
          type="file"
          id="product-file-input"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Thumbnail Preview & Presets */}
        <div className="space-y-2">
          <span className="block text-[10px] text-gray-500 font-semibold uppercase">Chọn nhanh ảnh demo sang trọng</span>
          <div className="flex flex-wrap gap-2">
            {PRESET_IMAGES.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setImage(img)}
                className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                  image === img ? "border-[#D4AF37]" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`preset-${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hình ảnh chi tiết (Ảnh phụ) */}
      <div className="space-y-4 border-t border-[#1C1C1E]/60 pt-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase">Hình ảnh chi tiết (Ảnh phụ)</label>
            <span className="block text-[10px] text-gray-500 mt-1">
              Thêm các ảnh phụ để hiển thị chi tiết sản phẩm ở trang khách hàng.
            </span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => document.getElementById("product-detail-files-input")?.click()}
              className="px-3 py-1.5 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 rounded-lg transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
              style={{ cursor: "pointer" }}
            >
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Tải nhiều ảnh từ máy
            </button>
            <input
              type="file"
              id="product-detail-files-input"
              accept="image/*"
              multiple
              onChange={handleMultipleFilesChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Thanh thêm URL ảnh online */}
        <div className="flex gap-2">
          <input
            type="text"
            value={detailUrlInput}
            onChange={(e) => setDetailUrlInput(e.target.value)}
            placeholder="Dán URL ảnh phụ trực tuyến (https://...)"
            className="flex-1 bg-[#1A1A1E] border border-[#2A2A30] rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#D4AF37] transition-all font-mono text-xs"
          />
          <button
            type="button"
            onClick={() => {
              if (detailUrlInput.trim()) {
                setAdditionalImages((prev) => [...prev, detailUrlInput.trim()]);
                setDetailUrlInput("");
              }
            }}
            className="px-4 py-2.5 bg-white/[0.03] hover:bg-[#D4AF37] text-gray-300 hover:text-black border border-[#2A2A30] hover:border-[#D4AF37] rounded-xl transition-all text-xs font-bold uppercase tracking-wider"
            style={{ cursor: "pointer" }}
          >
            Thêm
          </button>
        </div>

        {/* Lưới Thumbnail Preview các ảnh phụ hiện tại */}
        {additionalImages.length > 0 && (
          <div className="bg-[#1A1A1E] border border-[#2A2A30] rounded-xl p-4">
            <span className="block text-[10px] text-gray-500 font-semibold uppercase mb-3">
              Danh sách ảnh chi tiết ({additionalImages.length})
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-3">
              {additionalImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative group aspect-square rounded-lg overflow-hidden border border-[#2A2A30] bg-black"
                >
                  <img src={img} alt={`detail-img-${idx}`} className="w-full h-full object-cover" />
                  
                  {/* Overlay nút Xóa */}
                  <button
                    type="button"
                    onClick={() => {
                      setAdditionalImages(additionalImages.filter((_, i) => i !== idx));
                    }}
                    className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-500/80 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md"
                    style={{ cursor: "pointer" }}
                    title="Xóa ảnh này"
                  >
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Phân loại thuộc tính (Màu & Size) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#1C1C1E]/60 pt-5">
        {/* Màu sắc */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-gray-400 uppercase">Màu sắc khả dụng</label>
          
          {/* Form thêm màu */}
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={customColorName}
              onChange={(e) => setCustomColorName(e.target.value)}
              placeholder="Tên màu (ví dụ: Gold, Bạc, Rose Gold...)"
              className="flex-1 bg-[#1A1A1E] border border-[#2A2A30] rounded-xl px-4 py-2 text-white outline-none focus:border-[#D4AF37] transition-all text-xs"
            />
            <div className="flex items-center gap-1 bg-[#1A1A1E] border border-[#2A2A30] rounded-xl px-2 py-1 shrink-0 h-9">
              <input
                type="color"
                value={customColorHex}
                onChange={(e) => setCustomColorHex(e.target.value)}
                className="w-7 h-6 border-0 bg-transparent rounded cursor-pointer shrink-0"
                title="Chọn mã màu"
              />
              <span className="text-[10px] text-gray-400 font-mono uppercase px-1">{customColorHex}</span>
            </div>
            <button
              type="button"
              onClick={handleAddColor}
              className="px-3 py-2 bg-white/[0.03] hover:bg-[#D4AF37] text-gray-300 hover:text-black border border-[#2A2A30] hover:border-[#D4AF37] rounded-xl transition-all text-xs font-bold uppercase shrink-0 h-9"
              style={{ cursor: "pointer" }}
            >
              Thêm
            </button>
          </div>

          {/* Danh sách màu hiện tại */}
          <div className="flex flex-wrap gap-2 p-3 bg-[#1A1A1E] border border-[#2A2A30] rounded-xl min-h-[50px] items-center">
            {selectedColors.length === 0 ? (
              <span className="text-xs text-gray-500 italic">Chưa có màu sắc nào được thêm.</span>
            ) : (
              selectedColors.map((color) => (
                <div
                  key={color.id}
                  className="flex items-center gap-1.5 pl-2 pr-1 py-1 rounded-lg border border-[#2A2A30] bg-[#121214] text-xs text-white"
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/20"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span>{color.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveColor(color.id)}
                    className="p-0.5 text-gray-500 hover:text-red-400 rounded transition-all"
                    style={{ cursor: "pointer" }}
                  >
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Kích thước */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-gray-400 uppercase">Kích thước (Sizes)</label>
          
          {/* Form thêm kích thước */}
          <div className="flex gap-2">
            <input
              type="text"
              value={customSize}
              onChange={(e) => setCustomSize(e.target.value)}
              placeholder="Nhập kích thước (ví dụ: S, M, XL, 39, 40...)"
              className="flex-1 bg-[#1A1A1E] border border-[#2A2A30] rounded-xl px-4 py-2 text-white outline-none focus:border-[#D4AF37] transition-all text-xs"
            />
            <button
              type="button"
              onClick={handleAddSize}
              className="px-4 py-2 bg-white/[0.03] hover:bg-[#D4AF37] text-gray-300 hover:text-black border border-[#2A2A30] hover:border-[#D4AF37] rounded-xl transition-all text-xs font-bold uppercase shrink-0 h-9"
              style={{ cursor: "pointer" }}
            >
              Thêm
            </button>
          </div>

          {/* Danh sách kích thước hiện tại */}
          <div className="flex flex-wrap gap-2 p-3 bg-[#1A1A1E] border border-[#2A2A30] rounded-xl min-h-[50px] items-center">
            {selectedSizes.length === 0 ? (
              <span className="text-xs text-gray-500 italic">Chưa có kích thước nào được thêm.</span>
            ) : (
              selectedSizes.map((size) => (
                <div
                  key={size}
                  className="flex items-center gap-1.5 pl-2.5 pr-1 py-1 rounded-lg border border-[#2A2A30] bg-[#121214] text-xs font-semibold text-white"
                >
                  <span>{size}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSize(size)}
                    className="p-0.5 text-gray-500 hover:text-red-400 rounded transition-all"
                    style={{ cursor: "pointer" }}
                  >
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Mô tả chi tiết (Description Points) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-semibold text-gray-400 uppercase">Mô tả sản phẩm (Dòng mô tả)</label>
          <button
            type="button"
            onClick={handleAddDescPoint}
            className="flex items-center gap-1 text-[11px] text-[#D4AF37] hover:underline font-semibold"
          >
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Thêm dòng mô tả
          </button>
        </div>
        <div className="space-y-2">
          {descPoints.map((point, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={point}
                onChange={(e) => handleDescPointChange(idx, e.target.value)}
                placeholder="Ví dụ: Thiết kế chất liệu bền bỉ, mang phong cách hoàng gia..."
                className="flex-1 bg-[#1A1A1E] border border-[#2A2A30] rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#D4AF37] transition-all text-xs"
              />
              <button
                type="button"
                onClick={() => handleRemoveDescPoint(idx)}
                className="p-2 text-gray-500 hover:text-rose-400 bg-white/[0.01] hover:bg-rose-500/5 border border-[#2A2A30] rounded-xl transition-all"
              >
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Đặc tả kỹ thuật (Specification) */}
      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Đặc tả chi tiết / Ghi chú đặt hàng</label>
        <textarea
          value={spec}
          onChange={(e) => setSpec(e.target.value)}
          rows={3}
          placeholder="Thông tin giao hàng, thuế, kích thước người mẫu..."
          className="w-full bg-[#1A1A1E] border border-[#2A2A30] rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#D4AF37] transition-all text-xs"
        />
      </div>

      {/* Cần xác thực nút bấm hành động */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1C1C1E]">
        <button
          type="button"
          onClick={onCancel}
          className="border border-[#2A2A30] text-gray-400 hover:text-white hover:bg-white/[0.02] font-semibold text-xs transition-all"
          style={{
            padding: "12px 24px",
            borderRadius: "8px",
            lineHeight: "1.2",
            cursor: "pointer"
          }}
        >
          Hủy bỏ
        </button>
        <button
          type="submit"
          className="bg-[#D4AF37] hover:bg-[#C5A02E] text-black font-bold text-xs transition-all shadow-lg"
          style={{
            padding: "12px 24px",
            borderRadius: "8px",
            lineHeight: "1.2",
            cursor: "pointer"
          }}
        >
          {initialProduct ? "Lưu thay đổi" : "Đăng sản phẩm"}
        </button>
      </div>
    </form>
  );
}
