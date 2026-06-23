"use client";

import React, { useState } from "react";
import { useAdminData, Contact } from "@/context/AdminDataContext";
import Modal from "@/components/admin/Modal";

export default function ContactsPage() {
  const { contacts, updateContactStatus } = useAdminData();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenDetail = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleUpdateStatus = (id: string, newStatus: Contact["status"]) => {
    updateContactStatus(id, newStatus);
    
    // Đồng bộ lại trạng thái hiển thị của liên hệ đang xem trong modal
    if (selectedContact && selectedContact.id === id) {
      setSelectedContact({
        ...selectedContact,
        status: newStatus
      });
    }
  };

  // Lọc và tìm kiếm
  const filteredContacts = contacts.filter((c) => {
    const matchesStatus = filterStatus === "Tất cả" || c.status === filterStatus;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-12 animate-fade-in text-sm">
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-[#1C1C1E] pb-8 pt-2">
        <div>
          <h1 className="text-3xl font-bold tracking-wider text-white uppercase">
            Quản lý Liên hệ khách hàng
          </h1>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            Xem danh sách khách hàng gửi thông tin liên hệ, phản hồi và cập nhật trạng thái xử lý.
          </p>
        </div>
      </div>

      {/* Filter and Search Panel */}
      <div 
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#121214] border border-[#1C1C1E] rounded-xl shadow-lg"
        style={{ padding: "14px 20px" }}
      >
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
          {["Tất cả", "Mới", "Đang xử lý", "Đã xử lý"].map((status) => {
            const count = status === "Tất cả" 
              ? contacts.length 
              : contacts.filter(c => c.status === status).length;
            
            const isActive = filterStatus === status;

            // Xác định màu sắc khi được chọn (Active) tương ứng từng trạng thái
            let activeClasses = "bg-[#D4AF37] border-[#D4AF37] text-black"; // Tất cả (vàng thương hiệu)
            if (status === "Mới") activeClasses = "bg-[#52BE80] border-[#52BE80] text-black"; // Mới (xanh lá pastel đậm)
            if (status === "Đang xử lý") activeClasses = "bg-[#F5B041] border-[#F5B041] text-black"; // Đang xử lý (vàng pastel đậm)
            if (status === "Đã xử lý") activeClasses = "bg-[#5DADE2] border-[#5DADE2] text-black"; // Đã xử lý (xanh biển pastel đậm)

            return (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`rounded-lg font-semibold border transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? activeClasses
                    : "bg-white/[0.01] border-[#1C1C1E] text-gray-400 hover:text-white hover:bg-white/[0.02]"
                }`}
                style={{
                  padding: "7px 14px",
                  fontSize: "12.5px",
                  lineHeight: "1.2",
                  cursor: "pointer"
                }}
              >
                {status} <span className={`ml-1 text-[10px] ${isActive ? "text-black/70" : "text-gray-500"}`}>({count})</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div 
          className="flex items-center gap-2.5 bg-white/[0.02] border border-[#1C1C1E] rounded-xl w-full md:w-72 focus-within:border-[#D4AF37]/50 focus-within:bg-white/[0.04] transition-all duration-300"
          style={{ padding: "9px 14px" }}
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên, email, sđt..."
            className="bg-transparent text-gray-200 outline-none w-full placeholder-gray-500"
            style={{ fontSize: "12.5px", lineHeight: "1.2" }}
          />
        </div>
      </div>

      {/* Contacts List / Table */}
      <div className="bg-[#121214] border border-[#1C1C1E] rounded-xl overflow-hidden shadow-lg">
        {filteredContacts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#D4AF37]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Không tìm thấy yêu cầu liên hệ nào phù hợp.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1C1C1E] bg-white/[0.01]">
                  <th className="px-8 py-6 text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em]">Khách hàng</th>
                  <th className="px-8 py-6 text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em]">Nội dung tin nhắn</th>
                  <th className="px-8 py-6 text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em]">Thời gian gửi</th>
                  <th className="px-8 py-6 text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em]">Trạng thái</th>
                  <th className="px-8 py-6 text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1C1E]/50">
                {filteredContacts.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-white/[0.01] transition-colors cursor-pointer group"
                    onClick={() => handleOpenDetail(c)}
                  >
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="font-semibold text-white group-hover:text-[#D4AF37] transition-colors text-sm">
                        {c.name}
                      </div>
                      <div className="text-xs text-gray-500 font-mono mt-1">{c.phone}</div>
                    </td>
                    <td className="px-8 py-6 max-w-xs truncate text-gray-400 text-xs leading-relaxed">
                      {c.message}
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-xs text-gray-500 font-mono">
                      {new Date(c.createdAt).toLocaleDateString("vi-VN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                          c.status === "Mới"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : c.status === "Đang xử lý"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-right text-xs" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleOpenDetail(c)}
                        className="bg-white/[0.02] hover:bg-[#D4AF37] hover:text-black border border-[#1C1C1E] font-bold text-gray-300 transition-all duration-300 uppercase tracking-widest"
                        style={{
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          lineHeight: "1.2",
                          cursor: "pointer"
                        }}
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details Contact Modal */}
      <Modal
        isOpen={selectedContact !== null}
        onClose={() => setSelectedContact(null)}
        title="Thông tin chi tiết Liên hệ"
      >
        {selectedContact && (
          <div className="space-y-6 text-sm text-gray-300">
            {/* Customer Basic Info Grid */}
            <div 
              className="grid grid-cols-2 gap-4 bg-[#1A1A1E] border border-[#2A2A30] rounded-xl"
              style={{ padding: '16px' }}
            >
              <div>
                <span className="text-[10px] text-gray-500 font-semibold uppercase block">Họ và tên</span>
                <span className="text-white font-bold">{selectedContact.name}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 font-semibold uppercase block">Số điện thoại</span>
                <span className="text-white font-mono">{selectedContact.phone}</span>
              </div>
              <div className="col-span-2 border-t border-[#2A2A30]/50 pt-2 mt-2">
                <span className="text-[10px] text-gray-500 font-semibold uppercase block">Email</span>
                <span className="text-[#D4AF37] font-mono">{selectedContact.email}</span>
              </div>
              <div className="col-span-2 border-t border-[#2A2A30]/50 pt-2">
                <span className="text-[10px] text-gray-500 font-semibold uppercase block">Thời gian gửi</span>
                <span className="text-gray-400 font-mono">
                  {new Date(selectedContact.createdAt).toLocaleString("vi-VN")}
                </span>
              </div>
            </div>

            {/* Message Content */}
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase block mb-2">Nội dung tin nhắn liên hệ</span>
              <div 
                className="bg-[#1A1A1E]/80 border border-[#2A2A30] rounded-xl text-white whitespace-pre-wrap leading-relaxed"
                style={{ padding: '16px' }}
              >
                {selectedContact.message}
              </div>
            </div>

            {/* Change Status Action */}
            <div className="space-y-3 pt-4 border-t border-[#1C1C1E]">
              <span className="text-xs font-semibold text-gray-400 uppercase block">Cập nhật trạng thái xử lý</span>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => handleUpdateStatus(selectedContact.id, "Mới")}
                  className={`flex-1 min-w-[100px] py-2.5 rounded-xl text-xs font-bold border transition-all uppercase tracking-wider ${
                    selectedContact.status === "Mới"
                      ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
                      : "bg-white/[0.01] border-[#2A2A30] text-gray-400 hover:text-white"
                  }`}
                >
                  Yêu cầu mới
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedContact.id, "Đang xử lý")}
                  className={`flex-1 min-w-[100px] py-2.5 rounded-xl text-xs font-bold border transition-all uppercase tracking-wider ${
                    selectedContact.status === "Đang xử lý"
                      ? "bg-amber-500/10 border-amber-500/50 text-amber-400"
                      : "bg-white/[0.01] border-[#2A2A30] text-gray-400 hover:text-white"
                  }`}
                >
                  Đang xử lý
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedContact.id, "Đã xử lý")}
                  className={`flex-1 min-w-[100px] py-2.5 rounded-xl text-xs font-bold border transition-all uppercase tracking-wider ${
                    selectedContact.status === "Đã xử lý"
                      ? "bg-blue-500/10 border-blue-500/50 text-blue-400"
                      : "bg-white/[0.01] border-[#2A2A30] text-gray-400 hover:text-white"
                  }`}
                >
                  Đã giải quyết xong
                </button>
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-end pt-4 border-t border-[#1C1C1E]">
              <button
                onClick={() => setSelectedContact(null)}
                className="px-16 py-4 bg-[#1C1C1E] border border-[#2A2A30] rounded-md text-base font-bold text-white hover:bg-white/[0.08] transition-all cursor-pointer whitespace-nowrap"
              >
                Đóng hộp thoại
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
