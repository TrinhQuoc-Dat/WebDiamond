"use client";
import React, { useState } from "react";
import { useAdminData, Banner } from "@/context/AdminDataContext";
import Modal from "@/components/admin/Modal";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";

// Helper functions for external video link parsing (YouTube & Google Drive)
export const getYouTubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export const getGoogleDriveDirectLink = (url: string) => {
  if (!url) return null;
  const match = url.match(/\/file\/d\/([^\/]+)/) || url.match(/[?&]id=([^&]+)/);
  if (match && match[1]) {
    return `https://docs.google.com/uc?export=download&id=${match[1]}`;
  }
  return null;
};

// Gỡ bỏ hoàn toàn presets chọn nhanh để tránh hiển thị thừa trên giao diện

export default function BannersPage() {
  const { banners, addBanner, updateBanner, deleteBanner } = useAdminData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState<"image" | "video">("image");
  const [link, setLink] = useState("/shop");
  const [active, setActive] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [previewError, setPreviewError] = useState(false);
  const [muted, setMuted] = useState(true);
  const previewVideoRef = React.useRef<HTMLVideoElement>(null);

  // Tự động đồng bộ âm thanh của video Live Preview theo trạng thái checkbox
  React.useEffect(() => {
    if (previewVideoRef.current) {
      previewVideoRef.current.muted = muted;
      if (!muted) {
        previewVideoRef.current.play().catch(() => {
          // Trình duyệt chặn autoplay unmuted
          if (previewVideoRef.current) previewVideoRef.current.muted = true;
        });
      }
    }
  }, [muted]);

  // Tự động reset trạng thái lỗi xem thử khi thay đổi liên kết hoặc loại banner
  React.useEffect(() => {
    setPreviewError(false);
  }, [image, type]);

  const openAddModal = () => {
    setEditingBanner(null);
    setTitle("");
    setSubtitle("");
    setImage("");
    setType("image");
    setLink("/shop"); // Giữ liên kết mặc định hữu ích /shop
    setActive(banners.length === 0); // Active mặc định nếu là banner duy nhất
    setUploadedFileName("");
    setMuted(true);
    setModalOpen(true);
  };

  const openEditModal = (banner: Banner) => {
    setEditingBanner(banner);
    setTitle(banner.title);
    setSubtitle(banner.subtitle);
    setImage(banner.image);
    setType(banner.type || "image");
    setLink(banner.link);
    setActive(banner.active);
    setMuted(banner.muted !== false);

    // Kiểm tra xem hình ảnh/video của banner có phải là tệp tin đã tải lên từ máy tính trước đó
    if (banner.image.startsWith("data:") || banner.image.startsWith("blob:")) {
      setUploadedFileName("Tệp tin cục bộ đã lưu");
    } else {
      setUploadedFileName("");
    }

    setModalOpen(true);
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
        `Banner sẽ hoạt động tốt trong phiên làm việc này, nhưng có thể bị mất hiển thị khi bạn tải lại trang (F5).`
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

    // Reset file input value để có thể chọn lại cùng một file
    e.target.value = "";
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image.trim()) return alert("Vui lòng nhập/chọn liên kết hình ảnh hoặc video");
    if (!subtitle.trim()) return alert("Vui lòng nhập chữ hiển thị nút bấm");

    const data = {
      title: title.trim() || "WebDiamond",
      subtitle: subtitle.trim(),
      image: image.trim(),
      type,
      link: link.trim() || "/shop",
      active,
      muted: type === "video" ? muted : undefined,
    };

    if (editingBanner) {
      try {
        await updateBanner(editingBanner.id, data);
        setModalOpen(false);
      } catch (err: any) {
        alert(err.message || "Cập nhật banner thất bại");
      }
    } else {
      try {
        await addBanner(data);
        setModalOpen(false);
      } catch (err: any) {
        alert(err.message || "Tạo banner thất bại");
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa banner này không?")) {
      try {
        await deleteBanner(id);
      } catch (err: any) {
        alert(err.message || "Xóa banner thất bại");
      }
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      await updateBanner(id, { active: true });
    } catch (err: any) {
      alert(err.message || "Kích hoạt banner thất bại");
    }
  };

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-[#1C1C1E] pb-8 pt-2">
        <div>
          <h1 className="text-3xl font-bold tracking-wider text-white uppercase">
            Quản lý Banner Homepage
          </h1>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            Quản lý hình nền hoặc video Hero và chữ nút bấm chính giữa trang chủ đầu tiên.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#C5A02E] text-black font-bold uppercase transition-all duration-300 shadow-lg hover:shadow-[#D4AF37]/20 hover:-translate-y-0.5 active:translate-y-0"
          style={{
            padding: "10px 18px",
            borderRadius: "8px",
            fontSize: "11px",
            letterSpacing: "0.05em",
          }}
        >
          <i className="pi pi-plus" style={{ fontSize: '10px', fontWeight: 'bold' }}></i>
          <span>Thêm Banner mới</span>
        </button>
      </div>

      {/* Banner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {banners.map((b) => (
          <div
            key={b.id}
            className={`bg-[#121214] border rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${b.active ? "border-[#D4AF37]" : "border-[#1C1C1E] hover:border-[#1C1C1E]/80"
              }`}
          >
            {/* Image/Video Preview Area */}
            <div className="relative h-56 bg-black flex items-center justify-center overflow-hidden group">
              {b.type === "video" ? (
                (() => {
                  const youtubeId = getYouTubeId(b.image);
                  const driveDirectLink = getGoogleDriveDirectLink(b.image);

                  if (youtubeId) {
                    return (
                      <div className="w-full h-full relative overflow-hidden pointer-events-none">
                        <iframe
                          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] min-w-full min-h-full aspect-video object-cover"
                          allow="autoplay; encrypted-media"
                          frameBorder="0"
                        />
                      </div>
                    );
                  }

                  return (
                    <video
                      src={driveDirectLink || b.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  );
                })()
              ) : (
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center">
                <div className="text-center p-6">
                  <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-widest">{b.title}</span>
                  <div className="text-white text-lg font-bold uppercase mt-2 tracking-wider border-b border-white/20 pb-2">
                    {b.subtitle}
                  </div>
                  <span className="text-[10px] text-gray-400 block mt-2">
                    Loại: {b.type === "video" ? "Video" : "Hình ảnh"} | Liên kết: {b.link}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span
                  className="px-3 py-1.5 rounded-xl text-[10px] font-bold shadow-md uppercase tracking-wider bg-black/60 text-gray-400 border border-[#1C1C1E]"
                >
                  {b.active ? "Đang hoạt động" : "Đang tắt"}
                </span>
                <span
                  className="px-3 py-1.5 rounded-xl text-[10px] font-bold shadow-md uppercase tracking-wider bg-black/60 text-[#D4AF37] border border-[#D4AF37]/30"
                >
                  {b.type === "video" ? "Video" : "Hình ảnh"}
                </span>
              </div>
            </div>

            {/* Actions Footer */}
            <div
              className="border-t border-[#1C1C1E]/50 flex items-center justify-between bg-white/[0.01]"
              style={{ padding: '24px' }}
            >
              <div className="flex gap-2">
                {b.active ? (
                  <button
                    disabled
                    className="px-4 py-2 bg-[#D4AF37]/10 text-xs font-bold text-[#D4AF37] border border-[#D4AF37]/20 rounded-xl uppercase tracking-wider cursor-default opacity-80"
                  >
                    Đang kích hoạt
                  </button>
                ) : (
                  <button
                    onClick={() => handleToggleActive(b.id)}
                    className="px-4 py-2 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-bold text-white border border-[#1C1C1E] hover:border-[#D4AF37]/30 rounded-xl transition-all uppercase tracking-wider"
                    style={{ cursor: "pointer" }}
                  >
                    Bật Banner này
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(b)}
                  className="p-2 bg-white/[0.02] hover:bg-white/[0.06] text-gray-400 hover:text-white border border-[#1C1C1E] rounded-lg transition-all"
                  title="Sửa banner"
                >
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="p-2 bg-white/[0.02] hover:bg-red-500/5 text-gray-400 hover:text-red-400 border border-[#1C1C1E] hover:border-red-500/20 rounded-lg transition-all"
                  title="Xóa banner"
                >
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Add Banner Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingBanner ? "Chỉnh sửa cấu hình Banner" : "Thêm mới Banner"}
      >
        <form onSubmit={handleSave} className="flex flex-col gap-6 text-sm text-gray-300">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Tiêu đề chính (Title)</label>
            <InputText
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="WebDiamond"
              style={{
                width: "100%", height: 48, backgroundColor: "#1A1A1E", border: "1px solid #2A2A30", borderRadius: 12, color: "white", fontSize: 13, padding: "0 16px"
              }}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Chữ nút bấm hiển thị (Button Text) *</label>
            <InputText
              required
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Shop All"
              style={{
                width: "100%", height: 48, backgroundColor: "#1A1A1E", border: "1px solid #2A2A30", borderRadius: 12, color: "white", fontSize: 13, padding: "0 16px"
              }}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Đường dẫn liên kết nút bấm</label>
            <InputText
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="/shop"
              style={{
                width: "100%", height: 48, backgroundColor: "#1A1A1E", border: "1px solid #2A2A30", borderRadius: 12, color: "white", fontSize: 13, padding: "0 16px", fontFamily: "monospace"
              }}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Loại Banner</label>
            <div className="flex gap-6 mt-1">
              <div className="flex items-center gap-2">
                <RadioButton
                  inputId="type-image"
                  name="banner-type"
                  value="image"
                  onChange={() => setType("image")}
                  checked={type === "image"}
                />
                <label htmlFor="type-image" className="cursor-pointer text-xs font-semibold text-white">Hình ảnh (Image)</label>
              </div>
              <div className="flex items-center gap-2">
                <RadioButton
                  inputId="type-video"
                  name="banner-type"
                  value="video"
                  onChange={() => setType("video")}
                  checked={type === "video"}
                />
                <label htmlFor="type-video" className="cursor-pointer text-xs font-semibold text-white">Video</label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">
              {type === "video" ? "Đường dẫn liên kết Video (URL / MP4) *" : "Đường dẫn liên kết hình ảnh (URL) *"}
            </label>

            {uploadedFileName ? (
              <div className="flex items-center justify-between bg-[#1A1A1E] border border-[#D4AF37]/40 rounded-xl px-4 py-2.5 text-white animate-fade-in">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 bg-[#D4AF37]/10 text-[#D4AF37] rounded-xl shrink-0">
                    <i className={`pi ${type === "video" ? "pi-video" : "pi-image"}`} style={{ fontSize: '1.25rem' }}></i>
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
              <div className="flex gap-2">
                <InputText
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder={type === "video" ? "https://example.com/video.mp4" : "https://images.unsplash.com/..."}
                  style={{
                    flex: 1, height: 48, backgroundColor: "#1A1A1E", border: "1px solid #2A2A30", borderRadius: 12, color: "white", fontSize: 13, padding: "0 16px", fontFamily: "monospace"
                  }}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("banner-file-input")?.click()}
                  className="p-2.5 bg-white/[0.03] hover:bg-white/[0.08] text-gray-400 hover:text-white border border-[#2A2A30] hover:border-[#D4AF37]/50 rounded-xl transition-all flex items-center justify-center shrink-0 w-12 h-12"
                  style={{ cursor: "pointer" }}
                  title="Chọn tệp từ máy tính"
                >
                  <i className="pi pi-upload" style={{ fontSize: '1.25rem' }}></i>
                </button>
              </div>
            )}

            <input
              type="file"
              id="banner-file-input"
              accept={type === "video" ? "video/*" : "image/*"}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Live Preview Area inside Modal */}
          {(image.trim() || uploadedFileName) && (
            <div>
              <span className="block text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-2">
                Xem thử trực tiếp (Live Preview):
              </span>
              <div className="relative h-44 bg-black rounded-lg overflow-hidden flex items-center justify-center">
                {previewError ? (
                  <div className="absolute inset-0 bg-red-950/20 flex flex-col items-center justify-center p-4 text-center">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-red-500 mb-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                    </svg>
                    <span className="text-xs text-red-400 font-semibold leading-relaxed">
                      Lỗi: Không thể tải hình ảnh hoặc video từ liên kết này.
                    </span>
                    <span className="text-[10px] text-gray-500 mt-1 max-w-[280px]">
                      Vui lòng kiểm tra quyền chia sẻ công khai (Anyone with link) của Drive hoặc tính hợp lệ của link YouTube/URL.
                    </span>
                  </div>
                ) : type === "video" ? (
                  (() => {
                    const youtubeId = getYouTubeId(image);
                    const driveDirectLink = getGoogleDriveDirectLink(image);

                    if (youtubeId) {
                      return (
                        <iframe
                          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                          className="w-full h-full object-cover pointer-events-none"
                          allow="autoplay; encrypted-media"
                          frameBorder="0"
                        />
                      );
                    }

                    return (
                      <video
                        ref={previewVideoRef}
                        key={driveDirectLink || image}
                        src={driveDirectLink || image}
                        autoPlay
                        loop
                        muted={muted}
                        playsInline
                        className="w-full h-full object-cover"
                        onError={() => setPreviewError(true)}
                      />
                    );
                  })()
                ) : (
                  <img
                    src={image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={() => setPreviewError(true)}
                  />
                )}
              </div>
            </div>
          )}

          {/* Active Checkbox */}
          <div className="flex items-center gap-3">
            <Checkbox
              inputId="banner-active-checkbox"
              checked={active}
              onChange={(e) => setActive(e.checked ?? false)}
            />
            <label htmlFor="banner-active-checkbox" className="text-xs text-gray-300 font-semibold cursor-pointer select-none">
              Đặt làm banner hoạt động chính của website
            </label>
          </div>

          {/* Muted Checkbox (Only for Video type) */}
          {type === "video" && (
            <div className="flex flex-col gap-1 animate-fade-in">
              <div className="flex items-center gap-3">
                <Checkbox
                  inputId="banner-muted-checkbox"
                  checked={muted}
                  onChange={(e) => setMuted(e.checked ?? false)}
                />
                <label htmlFor="banner-muted-checkbox" className="text-xs text-gray-300 font-semibold cursor-pointer select-none">
                  Tắt âm thanh video (Mute)
                </label>
              </div>
              <span className="text-[10px] text-gray-500 pl-8 leading-relaxed">
                Bật tùy chọn này để tắt âm thanh của video khi khách hàng xem trang chủ; tắt đi để cho phép phát âm thanh.
              </span>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-6 mt-2">
            <Button
              type="button"
              label="Hủy bỏ"
              text
              className="justify-center"
              onClick={() => setModalOpen(false)}
              style={{
                width: "140px",
                color: "#9CA3AF",
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: "600",
              }}
            />
            <Button
              type="submit"
              label="Lưu cấu hình"
              className="justify-center"
              style={{
                width: "140px",
                backgroundColor: "#D4AF37",
                color: "black",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: "bold",
                boxShadow: "0 4px 14px rgba(212, 175, 55, 0.2)",
              }}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
