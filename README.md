# WebDiamond — Luxury Jewelry Store & Admin Portal

Dự án website cửa hàng bán lẻ trang sức cao cấp **WebDiamond** tích hợp giao diện quản trị Admin Panel chuyên nghiệp và đồng bộ.

---

## 1. Hướng dẫn khởi chạy dự án

Cài đặt các gói thư viện (nếu chạy lần đầu):
```bash
npm install
```

Khởi chạy ứng dụng ở chế độ phát triển (Development Mode):
```bash
npm run dev
```

Truy cập ứng dụng tại địa chỉ mặc định của Next.js: [http://localhost:3000](http://localhost:3000)

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
