# WebDiamond Backend (NestJS + MongoDB)

Hệ thống quản lý nội dung (CMS) và dịch vụ API cho cửa hàng trang sức cao cấp WebDiamond.

---

## 1. Cài đặt Dự án

### Yêu cầu hệ thống:
* **Node.js**: Phiên bản 18+ hoặc 20+
* **MongoDB**: Chạy cục bộ ở cổng mặc định `27017`

### Cài đặt thư viện:
```bash
cd backend
npm install
```

---

## 2. Cấu hình Môi trường (`.env`)
Tạo tệp `.env` trong thư mục `backend/` dựa trên mẫu của `.env.example`:
```ini
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/webdiamond
JWT_SECRET=db86b8eaec34df9dfc29eb24a9a0890bf2bb8579ad46174a72d38ffb6cfcd84b
JWT_EXPIRES=7d
ADMIN_EMAIL=admin@webdiamond.com
ADMIN_PASSWORD=admin123
CORS_ORIGIN=http://localhost:3000
UPLOAD_DIR=uploads
PUBLIC_URL=http://localhost:4000
```

---

## 3. Khởi tạo Dữ liệu (Seed Data)
Hệ thống đi kèm script tự động tạo tài khoản quản trị viên và nạp dữ liệu mẫu ban đầu (danh mục, banner, sản phẩm, liên hệ mẫu).
Để chạy seed dữ liệu (Idempotent - không bị trùng lặp dữ liệu khi chạy lại nhiều lần):
```bash
npm run seed
```

---

## 4. Chạy Máy chủ Phát triển (Dev Server)
Để khởi chạy máy chủ NestJS ở chế độ phát triển (watch mode):
```bash
npm run start:dev
```
Máy chủ sẽ lắng nghe tại địa chỉ: `http://localhost:4000/api`

---

## 5. Chạy Kiểm thử (Tests)

### Kiểm thử đơn vị (Unit Tests):
Các bài kiểm thử đơn vị cho service và controller chạy trên cơ sở dữ liệu in-memory tự dựng (`mongodb-memory-server`):
```bash
# Chạy toàn bộ unit tests
npm run test

# Chạy riêng cho từng module cụ thể (ví dụ: products.service)
npm test -- products.service
```

### Kiểm thử tích hợp tổng thể (E2E Smoke Tests):
Kịch bản kiểm thử giả lập toàn bộ quy trình: Đăng nhập → Tạo danh mục → Tạo sản phẩm → Xem sản phẩm công khai → Gửi liên hệ → Xem thống kê Dashboard:
```bash
npm run test:e2e
```

---

## 6. Danh sách API Endpoints rút gọn

Tài liệu hướng dẫn gọi API đầy đủ kèm tham số và payload mẫu chi tiết tại: [api-endpoints.md](api-endpoints.md).

| Phương thức | Đường dẫn API | Xác thực | Mô tả chức năng |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/login` | Công khai | Đăng nhập tài khoản Admin |
| **GET** | `/api/auth/me` | Admin | Lấy thông tin tài khoản hiện tại |
| **GET** | `/api/categories` | Công khai | Lấy danh mục hiển thị (Sắp xếp theo thứ tự) |
| **GET** | `/api/admin/categories` | Admin | Lấy toàn bộ danh mục cho CMS |
| **POST** | `/api/admin/categories` | Admin | Tạo danh mục mới |
| **PATCH**| `/api/admin/categories/reorder` | Admin | Đổi thứ tự hiển thị danh mục |
| **GET** | `/api/products` | Công khai | Lấy danh sách sản phẩm phân trang & bộ lọc |
| **GET** | `/api/products/:slug` | Công khai | Chi tiết sản phẩm theo slug |
| **POST** | `/api/admin/products` | Admin | Thêm sản phẩm mới |
| **GET** | `/api/banners` | Công khai | Lấy banner hiển thị |
| **GET** | `/api/banners/active` | Công khai | Lấy banner kích hoạt chạy chính |
| **PATCH**| `/api/admin/banners/:id/activate`| Admin | Kích hoạt banner duy nhất |
| **POST** | `/api/contacts` | Công khai | Khách hàng gửi liên hệ tư vấn |
| **PATCH**| `/api/admin/contacts/:id/status` | Admin | Cập nhật trạng thái xử lý liên hệ |
| **POST** | `/api/custom-requests` | Công khai | Gửi yêu cầu thiết kế riêng |
| **GET** | `/api/pages/:key` | Công khai | Lấy trang tĩnh CMS (`about`, `size-guide`, `warranty`) |
| **GET** | `/api/settings` | Công khai | Lấy cấu hình hệ thống (GTM, hotline, email...) |
| **POST** | `/api/admin/uploads` | Admin | Tải ảnh/video lên đĩa (Multer) |
| **GET** | `/api/admin/dashboard/stats` | Admin | Xem số liệu thống kê tổng hợp CMS |
| **GET** | `/api/admin/dashboard/contacts-chart` | Admin | Dữ liệu vẽ biểu đồ liên hệ theo thời gian |
