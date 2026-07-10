// Nhóm các chữ số của một chuỗi giá bằng dấu chấm ngăn cách nghìn (1.000.000),
// giữ nguyên phần đơn vị tiền tệ ở cuối (VD "VND", "VNĐ", "đ").
//
// Idempotent: format lại một chuỗi đã có dấu chấm vẫn ra kết quả như cũ, nên có
// thể dùng an toàn cả khi nhập (admin) lẫn khi hiển thị (khách hàng), kể cả với
// dữ liệu cũ chưa có dấu chấm.
//
// Ví dụ:
//   "50000000"          -> "50.000.000"
//   "50000000 VND"      -> "50.000.000 VND"
//   "50.000.000 VNĐ"    -> "50.000.000 VNĐ"
//   "Liên hệ"           -> "Liên hệ"   (không có chữ số → giữ nguyên)
export function formatThousands(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "";
  const str = String(value);

  const digits = str.replace(/\D/g, "");
  if (!digits) return str; // không có chữ số nào → giữ nguyên (vd "Liên hệ")

  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Giữ lại nhãn tiền tệ ở cuối nếu có (phần bắt đầu bằng ký tự không phải số/chấm/khoảng trắng)
  const suffixMatch = str.match(/[^\d.\s][^\d.]*$/);
  const suffix = suffixMatch ? suffixMatch[0].trim() : "";

  return suffix ? `${grouped} ${suffix}` : grouped;
}
