"use client";

import React, { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { apiFetch } from "@/utils/api";
import { uploadImage } from "@/utils/uploadImage";
import { Slide, DEFAULT_SHOWCASE } from "@/utils/customPage";

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 44,
  backgroundColor: "#1A1A1E",
  border: "1px solid #2A2A30",
  borderRadius: 10,
  color: "white",
  fontSize: 13,
  padding: "0 14px",
};

const labelClass = "block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2";

const emptySlide: Slide = { title: "", subtitle: "", year: "", image: "" };

export default function AdminCustomPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const targetIndexRef = useRef<number | null>(null);

  // Tải dữ liệu showcase hiện tại từ backend.
  useEffect(() => {
    apiFetch<{ showcase?: Slide[] }>("/custom-page")
      .then((res) => {
        setSlides(Array.isArray(res?.showcase) && res.showcase.length > 0 ? res.showcase : DEFAULT_SHOWCASE);
      })
      .catch(() => setSlides(DEFAULT_SHOWCASE))
      .finally(() => setLoading(false));
  }, []);

  const updateSlide = (index: number, field: keyof Slide, value: string) => {
    setSlides((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const addSlide = () => setSlides((prev) => [...prev, { ...emptySlide }]);

  const removeSlide = (index: number) => {
    if (!confirm("Xóa slide này khỏi slider?")) return;
    setSlides((prev) => prev.filter((_, i) => i !== index));
  };

  const moveSlide = (index: number, dir: -1 | 1) => {
    setSlides((prev) => {
      const target = index + dir;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  // Mở hộp thoại chọn file cho slide cụ thể.
  const triggerUpload = (index: number) => {
    targetIndexRef.current = index;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const index = targetIndexRef.current;
    e.target.value = ""; // cho phép chọn lại cùng file
    if (!file || index === null) return;

    setUploadingIndex(index);
    try {
      const url = await uploadImage(file);
      updateSlide(index, "image", url);
    } catch (err: any) {
      alert(err.message || "Tải ảnh lên thất bại");
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiFetch("/admin/custom-page", {
        method: "PUT",
        body: JSON.stringify({ showcase: slides }),
      });
      alert("Đã lưu nội dung trang Custom thành công.");
    } catch (err: any) {
      alert(err.message || "Lưu thất bại");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-gray-500 text-xs uppercase tracking-widest animate-pulse py-20 text-center">
        Đang tải dữ liệu…
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-[#1C1C1E] pb-8 pt-2">
        <div>
          <h1 className="text-3xl font-bold tracking-wider text-white uppercase">
            Quản lý Trang Custom
          </h1>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            Chỉnh sửa slider phần đầu trang <span className="text-[#D4AF37] font-mono">/custom</span> — mỗi slide gồm tên, dòng mô tả, năm và ảnh.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={addSlide}
            className="flex items-center justify-center gap-2 bg-white/[0.03] hover:bg-white/[0.08] text-white border border-[#1C1C1E] hover:border-[#D4AF37]/40 font-bold uppercase transition-all duration-300"
            style={{ padding: "10px 18px", borderRadius: 8, fontSize: 11, letterSpacing: "0.05em" }}
          >
            <i className="pi pi-plus" style={{ fontSize: 10 }}></i>
            <span>Thêm slide</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#C5A02E] text-black font-bold uppercase transition-all duration-300 shadow-lg hover:shadow-[#D4AF37]/20 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0"
            style={{ padding: "10px 22px", borderRadius: 8, fontSize: 11, letterSpacing: "0.05em" }}
          >
            <i className={`pi ${saving ? "pi-spin pi-spinner" : "pi-save"}`} style={{ fontSize: 12 }}></i>
            <span>{saving ? "Đang lưu…" : "Lưu thay đổi"}</span>
          </button>
        </div>
      </div>

      {/* Empty state */}
      {slides.length === 0 && (
        <div className="text-center py-16 border border-dashed border-[#1C1C1E] rounded-2xl">
          <p className="text-gray-500 text-sm mb-4">Chưa có slide nào. Trang /custom sẽ dùng nội dung mặc định.</p>
          <button
            onClick={addSlide}
            className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider hover:underline"
          >
            + Thêm slide đầu tiên
          </button>
        </div>
      )}

      {/* Slide list */}
      <div className="space-y-8">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="bg-[#121214] border border-[#1C1C1E] rounded-2xl overflow-hidden"
          >
            {/* Card header */}
            <div className="flex items-center justify-between border-b border-[#1C1C1E] bg-white/[0.01]" style={{ padding: "14px 24px" }}>
              <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest">
                Slide #{index + 1}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => moveSlide(index, -1)}
                  disabled={index === 0}
                  title="Di chuyển lên"
                  className="p-2 bg-white/[0.02] hover:bg-white/[0.06] text-gray-400 hover:text-white border border-[#1C1C1E] rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                  </svg>
                </button>
                <button
                  onClick={() => moveSlide(index, 1)}
                  disabled={index === slides.length - 1}
                  title="Di chuyển xuống"
                  className="p-2 bg-white/[0.02] hover:bg-white/[0.06] text-gray-400 hover:text-white border border-[#1C1C1E] rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <button
                  onClick={() => removeSlide(index)}
                  title="Xóa slide"
                  className="p-2 bg-white/[0.02] hover:bg-red-500/10 text-gray-400 hover:text-red-400 border border-[#1C1C1E] hover:border-red-500/20 rounded-lg transition-all"
                >
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Card body */}
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8" style={{ padding: 24 }}>
              {/* Image preview + upload */}
              <div>
                <label className={labelClass}>Ảnh slide</label>
                <div className="relative w-full aspect-[3/4] bg-black rounded-xl overflow-hidden border border-[#1C1C1E] flex items-center justify-center mb-3">
                  {slide.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={slide.image} alt={slide.title} className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-gray-600 text-[10px] uppercase tracking-wider">Chưa có ảnh</span>
                  )}
                  {uploadingIndex === index && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <i className="pi pi-spin pi-spinner text-[#D4AF37]" style={{ fontSize: 22 }}></i>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => triggerUpload(index)}
                  disabled={uploadingIndex === index}
                  className="w-full flex items-center justify-center gap-2 bg-white/[0.03] hover:bg-white/[0.08] text-gray-300 hover:text-white border border-[#2A2A30] hover:border-[#D4AF37]/50 rounded-lg transition-all py-2.5 text-xs font-semibold uppercase tracking-wider disabled:opacity-50"
                >
                  <i className="pi pi-upload" style={{ fontSize: 12 }}></i>
                  Tải ảnh lên
                </button>
              </div>

              {/* Text fields */}
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Tên (Title)</label>
                  <InputText
                    value={slide.title}
                    onChange={(e) => updateSlide(index, "title", e.target.value)}
                    placeholder="YOUNG THUG"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className={labelClass}>Dòng mô tả (Subtitle)</label>
                  <InputText
                    value={slide.subtitle}
                    onChange={(e) => updateSlide(index, "subtitle", e.target.value)}
                    placeholder="NECKLACE LIGHTNING"
                    style={inputStyle}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Năm (Year)</label>
                    <InputText
                      value={slide.year}
                      onChange={(e) => updateSlide(index, "year", e.target.value)}
                      placeholder="2026"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Liên kết ảnh (URL)</label>
                    <InputText
                      value={slide.image}
                      onChange={(e) => updateSlide(index, "image", e.target.value)}
                      placeholder="/shop.png hoặc link Unsplash"
                      style={{ ...inputStyle, fontFamily: "monospace", fontSize: 12 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hidden shared file input for uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Bottom save (tiện khi danh sách dài) */}
      {slides.length > 0 && (
        <div className="flex justify-end pt-4 border-t border-[#1C1C1E]">
          <Button
            label={saving ? "Đang lưu…" : "Lưu thay đổi"}
            onClick={handleSave}
            disabled={saving}
            className="justify-center"
            style={{
              backgroundColor: "#D4AF37",
              color: "black",
              border: "none",
              padding: "12px 28px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: "bold",
            }}
          />
        </div>
      )}
    </div>
  );
}
