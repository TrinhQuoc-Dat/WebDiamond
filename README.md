# WebDiamond — Luxury Jewelry Store & Admin Portal

Dự án website cửa hàng bán lẻ trang sức cao cấp **WebDiamond** tích hợp giao diện quản trị Admin Panel chuyên nghiệp và đồng bộ.

---

## 1. Hướng dẫn khởi chạy dự án (Dual-Terminal Setup)

Dự án gồm 2 phần độc lập: **Frontend (Next.js)** ở thư mục gốc và **Backend (NestJS)** ở thư mục con `backend/`. Bạn cần mở **2 Terminal** riêng biệt để khởi chạy dự án:

### Terminal 1: Khởi chạy NestJS Backend (Cơ sở dữ liệu & API)
1. Di chuyển vào thư mục backend:
   ```bash
   cd backend
   ```
2. Cài đặt các gói thư viện (nếu chạy lần đầu):
   ```bash
   npm install
   ```
3. Tạo dữ liệu mẫu (Seeding Admin, Categories, Banners, Products cho Rings, Earrings, Necklaces, Bracelets):
   ```bash
   npm run seed
   ```
4. Khởi chạy server backend ở chế độ phát triển:
   ```bash
   npm run start:dev
   ```
   *Backend sẽ chạy tại địa chỉ:* [http://localhost:4000](http://localhost:4000) (API URL: `http://localhost:4000/api`)

### Terminal 2: Khởi chạy Next.js Frontend (Giao diện người dùng & Admin)
1. Ở thư mục gốc của dự án, cài đặt thư viện (nếu chạy lần đầu):
   ```bash
   npm install
   ```
2. Khởi chạy frontend ở chế độ phát triển:
   ```bash
   npm run dev
   ```
   *Frontend sẽ chạy tại địa chỉ:* [http://localhost:3000](http://localhost:3000)

---

## 2. Thông tin tài khoản quản trị (Admin Panel)

Để vào trang quản trị, truy cập đường dẫn: [http://localhost:3000/admin](http://localhost:3000/admin) (Hệ thống tự động bảo vệ route và chuyển hướng về trang đăng nhập nếu chưa authenticate).

*   **Đường dẫn trang đăng nhập**: `/admin/login`
*   **Tài khoản quản trị mặc định**:
    *   **Email**: `admin@webdiamond.com`
    *   **Mật khẩu**: `admin123`

---

## 3. Các chức năng của trang Admin Panel

*   **Dashboard (Tổng quan)**: Thống kê nhanh số lượng sản phẩm, yêu cầu liên hệ, các biểu đồ SVG tương tác mượt mà theo dõi số lượt liên hệ trong tuần và hiệu quả vận hành xử lý liên hệ.
*   **Quản lý Banner Homepage**: Xem danh sách, thêm mới, chỉnh sửa tiêu đề/phụ đề, đổi ảnh và bật/tắt banner hoạt động chính của trang chủ.
*   **Quản lý Liên hệ**: Danh sách khách gửi liên hệ dạng bảng, bộ lọc nhanh theo trạng thái (`Mới`, `Đang xử lý`, `Đã xử lý`) và Modal xem nội dung chi tiết tin nhắn cùng nút bấm chuyển đổi trạng thái xử lý nhanh.
*   **Quản lý Sản phẩm**: Bảng danh mục sản phẩm, bộ lọc phân loại, chức năng Bật/Tắt ẩn hiện trực quan (sản phẩm ẩn sẽ biến mất khỏi trang cửa hàng khách hàng), biểu mẫu Modal đăng sản phẩm mới hoặc cập nhật thông tin sản phẩm có sẵn (slug, ảnh mẫu, giá bán VNĐ, kích thước, màu sắc, mô tả nhiều dòng,...).
