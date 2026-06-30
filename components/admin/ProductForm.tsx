"use client";

import React, { useState, useEffect } from "react";
import { AdminProduct } from "@/context/AdminDataContext";
import {
  Tag, Link2, LayoutGrid, DollarSign, Bookmark,
  ImagePlus, Upload, X, Trash2, Plus,
  Palette, Ruler, FileText, Info, Loader2, Images,
  PenLine, Sparkles,
} from "lucide-react";

// PrimeReact components
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { ColorPicker } from "primereact/colorpicker";

interface ProductFormProps {
  initialProduct?: AdminProduct | null;
  onSubmit: (data: AdminProduct) => void;
  onCancel: () => void;
}

const CATEGORIES = [
  { label: "NECKLACE", value: "NECKLACE" },
  { label: "BRACELETS", value: "BRACELETS" },
  { label: "RINGS", value: "RINGS" },
  { label: "EARINGS", value: "EARINGS" },
];
const TAGS = [
  { label: "— Không có nhãn —", value: "" },
  { label: "Bestseller", value: "Bestseller" },
  { label: "New", value: "New" },
  { label: "Limited", value: "Limited" },
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
  const [isUploading, setIsUploading] = useState(false);

  const [customColorName, setCustomColorName] = useState("");
  const [customColorHex, setCustomColorHex] = useState("D4AF37");
  const [customSize, setCustomSize] = useState("");
  const [descPoints, setDescPoints] = useState<string[]>([""]);
  const [selectedColors, setSelectedColors] = useState<{ id: string; name: string; hex: string }[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

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
      setUploadedFileName("");
    } else {
      setName(""); setSlug(""); setCategory("NECKLACE"); setPrice("");
      setImage(""); setTag(""); setSpec(""); setDescPoints([""]);
      setSelectedColors([]); setSelectedSizes([]);
      setUploadedFileName(""); setAdditionalImages([]);
    }
  }, [initialProduct]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!initialProduct) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-"));
    }
  };

  const handleAddDescPoint = () => setDescPoints([...descPoints, ""]);
  const handleRemoveDescPoint = (index: number) => {
    const copy = [...descPoints]; copy.splice(index, 1);
    setDescPoints(copy.length === 0 ? [""] : copy);
  };
  const handleDescPointChange = (index: number, val: string) => {
    const copy = [...descPoints]; copy[index] = val; setDescPoints(copy);
  };

  const handleAddColor = () => {
    if (!customColorName.trim()) return alert("Vui lòng nhập tên màu");
    if (selectedColors.some(c => c.name.toLowerCase() === customColorName.trim().toLowerCase())) return alert("Màu đã tồn tại!");
    setSelectedColors([...selectedColors, { id: `color-${Date.now()}`, name: customColorName.trim(), hex: `#${customColorHex}` }]);
    setCustomColorName("");
  };
  const handleRemoveColor = (id: string) => setSelectedColors(selectedColors.filter(c => c.id !== id));
  const handleAddSize = () => {
    if (!customSize.trim()) return alert("Vui lòng nhập kích thước");
    const s = customSize.trim().toUpperCase();
    if (selectedSizes.includes(s)) return alert("Kích thước đã tồn tại!");
    setSelectedSizes([...selectedSizes, s]); setCustomSize("");
  };
  const handleRemoveSize = (size: string) => setSelectedSizes(selectedSizes.filter(s => s !== size));

  const uploadToServer = async (files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    const token = typeof window !== "undefined" ? localStorage.getItem("wd_access_token") : null;
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
    const res = await fetch(`${API_URL}/admin/uploads`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    if (!res.ok) throw new Error("Upload thất bại");
    const data = await res.json();
    return data.urls || [];
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
    setIsUploading(true);
    try {
      const urls = await uploadToServer([file]);
      if (urls.length > 0) setImage(urls[0]);
    } catch { alert("Lỗi upload ảnh. Vui lòng thử lại."); setUploadedFileName(""); }
    setIsUploading(false);
    e.target.value = "";
  };

  const handleMultipleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploading(true);
    try {
      const urls = await uploadToServer(Array.from(files));
      if (urls.length > 0) setAdditionalImages((prev) => [...prev, ...urls]);
    } catch { alert("Lỗi upload ảnh. Vui lòng thử lại."); }
    setIsUploading(false);
    e.target.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Vui lòng nhập tên sản phẩm");
    if (!slug.trim()) return alert("Vui lòng nhập slug");
    if (!price.trim()) return alert("Vui lòng nhập giá sản phẩm");
    if (!image.trim()) return alert("Vui lòng nhập/chọn ảnh sản phẩm");
    onSubmit({
      slug: slug.trim(), name: name.trim().toUpperCase(), category,
      price: price.trim(), image: image.trim(),
      images: additionalImages.length > 0 ? additionalImages : [image.trim()],
      tag: tag || null, description: descPoints.filter((pt) => pt.trim() !== ""),
      spec: spec.trim(), colors: selectedColors, sizes: selectedSizes,
      hidden: initialProduct ? initialProduct.hidden : false,
    });
  };

  /* ── Style constants ── */
  const sectionCls = "p-0";
  const labelCls = "flex items-center gap-2 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.15em]";

  const SectionHead = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
    <div className="flex items-center gap-3" style={{ marginBottom: '28px', paddingBottom: '16px', borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }}>
      <div style={{ width: 36, height: 36, borderRadius: 12, background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.05))', border: '1px solid rgba(212,175,55,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37', flexShrink: 0 }}>{icon}</div>
      <h3 style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</h3>
    </div>
  );

  // Custom dark styling for PrimeReact inputs - unified height 48px
  const primeInputStyle: React.CSSProperties = {
    width: '100%',
    height: 48,
    backgroundColor: '#0D0D0F',
    border: '1px solid #2A2A30',
    borderRadius: 12,
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    padding: '0 16px',
  };

  const primeDropdownStyle: React.CSSProperties = {
    width: '100%',
    height: 48,
    backgroundColor: '#0D0D0F',
    border: '1px solid #2A2A30',
    borderRadius: 12,
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
  };

  // Icon-only action button style (Thêm, Upload...)
  const iconBtnStyle: React.CSSProperties = {
    width: 48,
    height: 48,
    borderRadius: 12,
    background: '#D4AF37',
    color: '#000',
    border: 'none',
    flexShrink: 0,
    padding: 0,
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* ═══════ 1. THÔNG TIN SẢN PHẨM ═══════ */}
      <div className={sectionCls}>
        <SectionHead icon={<Tag size={16} />} title="Thông tin sản phẩm" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <label className={labelCls} style={{ marginBottom: 10, display: 'flex' }}><PenLine size={13} /> Tên sản phẩm <span style={{ color: '#D4AF37' }}>*</span></label>
              <InputText value={name} onChange={handleNameChange} placeholder="VD: Lắc tay Diamond Premium" style={primeInputStyle} required />
            </div>
            <div>
              <label className={labelCls} style={{ marginBottom: 10, display: 'flex' }}><Link2 size={13} /> Đường dẫn (Slug) <span style={{ color: '#D4AF37' }}>*</span></label>
              <InputText value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="vi-du-lac-tay-diamond" style={{ ...primeInputStyle, fontFamily: 'monospace', fontSize: 12 }} required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
            <div>
              <label className={labelCls} style={{ marginBottom: 10, display: 'flex' }}><LayoutGrid size={13} /> Danh mục <span style={{ color: '#D4AF37' }}>*</span></label>
              <Dropdown value={category} options={CATEGORIES} onChange={(e) => setCategory(e.value)} style={primeDropdownStyle} panelClassName="dark-dropdown-panel" />
            </div>
            <div>
              <label className={labelCls} style={{ marginBottom: 10, display: 'flex' }}><DollarSign size={13} /> Giá bán <span style={{ color: '#D4AF37' }}>*</span></label>
              <InputText value={price} onChange={(e) => setPrice(e.target.value)} placeholder="50.000.000 VNĐ" style={primeInputStyle} required />
            </div>
            <div>
              <label className={labelCls} style={{ marginBottom: 10, display: 'flex' }}><Bookmark size={13} /> Nhãn (Tag)</label>
              <Dropdown value={tag} options={TAGS} onChange={(e) => setTag(e.value)} style={primeDropdownStyle} panelClassName="dark-dropdown-panel" />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ 2. ẢNH CHÍNH ═══════ */}
      <div className={sectionCls}>
        <SectionHead icon={<ImagePlus size={16} />} title="Hình ảnh chính (Thumbnail)" />

        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          {/* Preview */}
          <div style={{ width: 72, height: 72, borderRadius: 12, overflow: 'hidden', border: '2px dashed #2A2A30', background: '#0D0D0F', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {image ? (
              <img src={image} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <ImagePlus size={24} color="#555" />
            )}
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {uploadedFileName ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0D0D0F', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 12, padding: '12px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  <i className="pi pi-check-circle" style={{ color: '#D4AF37' }} />
                  <span style={{ fontSize: 12, color: '#D4AF37', fontWeight: 500 }}>{uploadedFileName}</span>
                </div>
                <Button type="button" label="Xóa" icon="pi pi-times" severity="danger" size="small" text
                  onClick={() => { setUploadedFileName(""); setImage(""); }} />
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 12 }}>
                <InputText value={image} onChange={(e) => setImage(e.target.value)} placeholder="Dán URL ảnh hoặc upload từ máy →" style={{ ...primeInputStyle, flex: 1, fontFamily: 'monospace', fontSize: 12 }} />
                <Button type="button" icon="pi pi-upload"
                  onClick={() => document.getElementById("product-file-input")?.click()}
                  style={{ ...iconBtnStyle, background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37' }} />
              </div>
            )}
            <p style={{ fontSize: 10, color: '#555', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Info size={10} /> Ảnh thumbnail hiển thị trên danh sách sản phẩm và đầu gallery chi tiết
            </p>
          </div>
        </div>
        <input type="file" id="product-file-input" accept="image/*" onChange={handleFileChange} className="hidden" />
      </div>

      {/* ═══════ 3. ẢNH CHI TIẾT ═══════ */}
      <div className={sectionCls}>
        <SectionHead icon={<Images size={16} />} title="Ảnh chi tiết sản phẩm" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Upload button */}
          <Button type="button" label={isUploading ? "Đang tải lên..." : "Tải nhiều ảnh từ máy"}
            icon={isUploading ? "pi pi-spin pi-spinner" : "pi pi-upload"}
            onClick={() => document.getElementById("product-detail-files-input")?.click()}
            style={{ width: '100%', padding: '16px 24px', borderRadius: 16, border: '1.5px dashed rgba(212,175,55,0.35)', background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.02))', color: '#D4AF37', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', justifyContent: 'center' }}
            disabled={isUploading} />
          <input type="file" id="product-detail-files-input" accept="image/*" multiple onChange={handleMultipleFilesChange} className="hidden" />

          {/* URL input */}
          <div style={{ display: 'flex', gap: 12 }}>
            <InputText value={detailUrlInput} onChange={(e) => setDetailUrlInput(e.target.value)} placeholder="Dán URL ảnh phụ (https://...)" style={{ ...primeInputStyle, flex: 1, fontFamily: 'monospace', fontSize: 12 }} />
            <Button type="button" icon="pi pi-plus"
              onClick={() => { if (detailUrlInput.trim()) { setAdditionalImages((prev) => [...prev, detailUrlInput.trim()]); setDetailUrlInput(""); } }}
              style={iconBtnStyle} />
          </div>

          {/* Image grid */}
          {additionalImages.length > 0 && (
            <div style={{ background: '#0A0A0C', border: '1px solid #1C1C1E', borderRadius: 12, padding: 20 }}>
              <span style={{ fontSize: 10, color: '#666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 16 }}>
                Danh sách ảnh chi tiết ({additionalImages.length})
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
                {additionalImages.map((img, idx) => (
                  <div key={idx} className="group" style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 12, overflow: 'hidden', border: '1px solid #2A2A30', background: '#000' }}>
                    <img src={img} alt={`detail-${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                    {idx === 0 && (
                      <span style={{ position: 'absolute', top: 8, left: 8, padding: '2px 8px', background: '#D4AF37', color: '#000', fontSize: 8, fontWeight: 700, borderRadius: 6, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Sparkles size={8} /> Main
                      </span>
                    )}
                    <Button type="button" icon="pi pi-times" rounded text severity="danger" size="small"
                      onClick={() => setAdditionalImages(additionalImages.filter((_, i) => i !== idx))}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{ position: 'absolute', top: 8, right: 8, width: 28, height: 28, background: 'rgba(239,68,68,0.8)', color: 'white' }} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══════ 4. BIẾN THỂ ═══════ */}
      <div className={sectionCls}>
        <SectionHead icon={<Palette size={16} />} title="Màu sắc & Kích thước" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          {/* Colors */}
          <div>
            <label className={labelCls} style={{ marginBottom: 12, display: 'flex' }}><Palette size={13} /> Màu sắc khả dụng</label>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
              <InputText value={customColorName} onChange={(e) => setCustomColorName(e.target.value)} placeholder="VD: Gold, Rose Gold..." style={{ ...primeInputStyle, flex: 1, fontSize: 12 }} />
              <ColorPicker value={customColorHex} onChange={(e) => setCustomColorHex(e.value as string)} appendTo="self" style={{ flexShrink: 0 }} />
              <Button type="button" icon="pi pi-plus" size="small"
                onClick={handleAddColor}
                style={iconBtnStyle} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, padding: 16, background: '#0A0A0C', border: '1px solid #1C1C1E', borderRadius: 12, minHeight: 56, alignItems: 'center' }}>
              {selectedColors.length === 0 ? (
                <span style={{ fontSize: 12, color: '#555', fontStyle: 'italic' }}>Chưa có màu nào được thêm</span>
              ) : selectedColors.map((c) => (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 6px 8px 10px', borderRadius: 8, background: '#1A1A1E', border: '1px solid #2A2A30', fontSize: 12, color: 'white' }}>
                  <span style={{ width: 16, height: 16, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: c.hex, flexShrink: 0 }} />
                  <span style={{ fontWeight: 500 }}>{c.name}</span>
                  <Button type="button" icon="pi pi-times" rounded text size="small"
                    onClick={() => handleRemoveColor(c.id)}
                    style={{ width: 20, height: 20, background: 'rgba(255,255,255,0.05)', color: '#666', flexShrink: 0, padding: 0 }} />
                </div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className={labelCls} style={{ marginBottom: 12, display: 'flex' }}><Ruler size={13} /> Kích thước (Sizes)</label>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <InputText value={customSize} onChange={(e) => setCustomSize(e.target.value)} placeholder="VD: S, M, XL, 39, 40..." style={{ ...primeInputStyle, flex: 1, fontSize: 12 }} />
              <Button type="button" icon="pi pi-plus" size="small"
                onClick={handleAddSize}
                style={iconBtnStyle} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, padding: 16, background: '#0A0A0C', border: '1px solid #1C1C1E', borderRadius: 12, minHeight: 56, alignItems: 'center' }}>
              {selectedSizes.length === 0 ? (
                <span style={{ fontSize: 12, color: '#555', fontStyle: 'italic' }}>Chưa có kích thước nào</span>
              ) : selectedSizes.map((s) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 6px 8px 12px', borderRadius: 8, background: '#1A1A1E', border: '1px solid #2A2A30', fontSize: 12, fontWeight: 700, color: 'white' }}>
                  <span>{s}</span>
                  <Button type="button" icon="pi pi-times" rounded text size="small"
                    onClick={() => handleRemoveSize(s)}
                    style={{ width: 20, height: 20, background: 'rgba(255,255,255,0.05)', color: '#666', flexShrink: 0, padding: 0 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ 5. MÔ TẢ ═══════ */}
      <div className={sectionCls}>
        <SectionHead icon={<FileText size={16} />} title="Mô tả sản phẩm" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {descPoints.map((point, idx) => (
            <div key={idx} className="group" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{idx + 1}</span>
              <InputText value={point} onChange={(e) => handleDescPointChange(idx, e.target.value)}
                placeholder="VD: Thiết kế chất liệu bền bỉ, phong cách hoàng gia..."
                style={{ ...primeInputStyle, flex: 1, fontSize: 12 }} />
              <Button type="button" icon="pi pi-trash" rounded text severity="danger" size="small"
                onClick={() => handleRemoveDescPoint(idx)}
                className="opacity-0 group-hover:opacity-100 transition-all"
                style={{ width: 36, height: 36, borderRadius: 12, background: 'transparent', color: '#555', flexShrink: 0 }} />
            </div>
          ))}
          <Button type="button" label="Thêm dòng mô tả" icon="pi pi-plus" text
            onClick={handleAddDescPoint}
            style={{ width: '100%', padding: '12px', borderRadius: 12, border: '1px dashed #2A2A30', color: '#666', fontSize: 12, justifyContent: 'center' }} />
        </div>
      </div>

      {/* ═══════ 6. GHI CHÚ ═══════ */}
      <div className={sectionCls}>
        <label className={labelCls} style={{ marginBottom: 12, display: 'flex' }}><Info size={13} /> Đặc tả / Ghi chú đặt hàng</label>
        <InputTextarea value={spec} onChange={(e) => setSpec(e.target.value)} rows={5}
          placeholder="Thông tin giao hàng, thuế, kích thước người mẫu..."
          style={{ ...primeInputStyle, height: 'auto', padding: '14px 16px', resize: 'none', lineHeight: 1.7 }} />
      </div>

      {/* ═══════ ACTIONS ═══════ */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 16, paddingTop: 8 }}>
        <Button type="button" label="Hủy bỏ" severity="secondary" outlined
          onClick={onCancel}
          style={{ height: 48, paddingLeft: 28, paddingRight: 28, borderRadius: 12, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }} />
        <Button type="submit" label={initialProduct ? "Lưu thay đổi" : "Đăng sản phẩm"} icon="pi pi-check-circle"
          style={{ height: 48, paddingLeft: 32, paddingRight: 32, borderRadius: 12, background: 'linear-gradient(90deg, #D4AF37, #C5A02E)', color: '#000', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', border: 'none', boxShadow: '0 8px 24px rgba(212,175,55,0.2)' }} />
      </div>
    </form>
  );
}
