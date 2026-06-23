# Tài liệu API Endpoints - Hệ thống WebDiamond Backend

Tài liệu này liệt kê chi tiết danh sách tất cả các điểm cuối (endpoints) của hệ thống backend phục vụ cho việc tích hợp Frontend.

## 1. Hướng dẫn chung khi gọi API
* **Base URL**: `http://localhost:4000/api`
* **Content-Type**: `application/json`
* **Xác thực (Authentication)**: Các endpoint bắt đầu bằng `/admin/` (trừ `/auth/login`) yêu cầu gửi kèm mã JWT token trong tiêu đề (Header):
  ```http
  Authorization: Bearer <JWT_ACCESS_TOKEN>
  ```
* **Quy chuẩn phản hồi lỗi (JSON Exception Payload)**:
  Tất cả các lỗi đều trả về theo định dạng chuẩn:
  ```json
  {
    "statusCode": 400,
    "message": "Thông tin lỗi chi tiết",
    "error": "Bad Request",
    "path": "/api/...",
    "timestamp": "2026-06-23T23:35:00.000Z"
  }
  ```

---

## 2. Danh sách Endpoint chi tiết

### 2.1. Module Auth (Xác thực)
#### Đăng nhập lấy Token
* **Endpoint**: `POST /auth/login`
* **Quyền truy cập**: Public (Công khai)
* **Payload yêu cầu**:
  ```json
  {
    "email": "admin@webdiamond.com",
    "password": "admin123"
  }
  ```
* **Phản hồi thành công (201 Created)**:
  ```json
  {
    "accessToken": "eyJhbGciOi..."
  }
  ```

#### Lấy thông tin tài khoản hiện tại
* **Endpoint**: `GET /auth/me`
* **Quyền truy cập**: Yêu cầu Token Admin
* **Phản hồi thành công (200 OK)**:
  ```json
  {
    "email": "admin@webdiamond.com",
    "name": "Administrator",
    "id": "6a3ab1..."
  }
  ```

---

### 2.2. Module Categories (Danh mục sản phẩm)
#### Lấy danh sách danh mục hiển thị
* **Endpoint**: `GET /categories`
* **Quyền truy cập**: Public (Chỉ trả về các danh mục không bị ẩn `hidden: false` sắp xếp theo `order`)
* **Phản hồi thành công (200 OK)**:
  ```json
  [
    {
      "id": "6a3ab4f8a6ff65affca70713",
      "name": "Nhẫn",
      "slug": "ring",
      "order": 1,
      "hidden": false
    }
  ]
  ```

#### Lấy tất cả danh mục (CMS Admin)
* **Endpoint**: `GET /admin/categories`
* **Quyền truy cập**: Yêu cầu Token Admin
* **Phản hồi thành công (200 OK)**: Trả về toàn bộ danh mục kể cả bị ẩn.

#### Tạo danh mục mới
* **Endpoint**: `POST /admin/categories`
* **Quyền truy cập**: Yêu cầu Token Admin
* **Payload yêu cầu**:
  ```json
  {
    "name": "Bông tai Luxury",
    "slug": "luxury-earring",
    "order": 5,
    "hidden": false
  }
  ```
* **Phản hồi thành công (201 Created)**: Trả về đối tượng danh mục vừa tạo kèm theo `id`.

#### Cập nhật danh mục
* **Endpoint**: `PUT /admin/categories/:id`
* **Quyền truy cập**: Yêu cầu Token Admin
* **Payload yêu cầu**: Cấu trúc như khi tạo (các trường tùy chọn).
* **Phản hồi thành công (200 OK)**: Trả về đối tượng danh mục sau khi cập nhật.

#### Xóa danh mục
* **Endpoint**: `DELETE /admin/categories/:id`
* **Quyền truy cập**: Yêu cầu Token Admin
* **Phản hồi thành công (200 OK)**: `{"deleted": true}`.

#### Sắp xếp lại thứ tự danh mục
* **Endpoint**: `PATCH /admin/categories/reorder`
* **Quyền truy cập**: Yêu cầu Token Admin
* **Payload yêu cầu**:
  ```json
  {
    "ids": ["id-1", "id-2", "id-3"]
  }
  ```
* **Phản hồi thành công (200 OK)**: Trả về danh sách danh mục đã cập nhật đúng theo thứ tự `order` mới.

---

### 2.3. Module Products (Sản phẩm)
#### Lấy danh sách sản phẩm phân trang công khai
* **Endpoint**: `GET /products`
* **Quyền truy cập**: Public
* **Tham số Query (Tùy chọn)**:
  - `page`: Số trang hiển thị (mặc định: `1`).
  - `limit`: Số lượng sản phẩm trên trang (mặc định: `12`).
  - `search`: Từ khóa tìm kiếm theo tên sản phẩm (không phân biệt dấu thời gian/tiếng Việt).
  - `category`: Lọc theo slug danh mục.
  - `featured`: Lọc sản phẩm nổi bật (`true`/`false`).
  - `minPrice` & `maxPrice`: Lọc theo khoảng giá của sản phẩm (`priceValue`).
  - `sort`: Tiêu chí sắp xếp (`priceAsc`, `priceDesc`, `orderAsc`, `dateDesc`).
* **Phản hồi thành công (200 OK)**:
  ```json
  {
    "data": [
      {
        "id": "prod-1",
        "slug": "necklace-lightning-1",
        "name": "NECKLACE LIGHTNING 1",
        "category": "necklace",
        "price": "50.000.000 VND",
        "priceValue": 50000000,
        "image": "/shop.png",
        "images": ["/shop.png"],
        "colors": [{"id": "gold", "name": "Gold", "hex": "#D4AF37"}],
        "sizes": ["40", "45"],
        "description": ["..."],
        "spec": "...",
        "featured": false,
        "hidden": false
      }
    ],
    "total": 30
  }
  ```

#### Chi tiết sản phẩm công khai
* **Endpoint**: `GET /products/:slug`
* **Quyền truy cập**: Public
* **Phản hồi thành công (200 OK)**: Trả về chi tiết đối tượng sản phẩm. Trả lỗi 404 nếu không tìm thấy.

#### Thêm sản phẩm mới (Admin)
* **Endpoint**: `POST /admin/products`
* **Payload yêu cầu**:
  ```json
  {
    "slug": "new-ring",
    "name": "New Diamond Ring",
    "category": "ring",
    "price": "100.000.000 VND",
    "priceValue": 100000000,
    "image": "/img.png",
    "images": ["/img.png"],
    "description": ["Mô tả sản phẩm"],
    "spec": "Thông số kỹ thuật",
    "colors": [{"id": "gold", "name": "Gold", "hex": "#D4AF37"}],
    "sizes": ["15", "16"],
    "style": "",
    "collection": "",
    "featured": true,
    "hidden": false,
    "order": 1
  }
  ```

---

### 2.4. Module Banners (Banner quảng cáo)
#### Lấy banner nổi bật
* **Endpoint**: `GET /banners` (Tất cả banner hiển thị) hoặc `GET /banners/active` (Lấy duy nhất 1 banner đang kích hoạt chạy chính)
* **Quy tắc nghiệp vụ**: Hệ thống luôn duy trì duy nhất một banner có trạng thái `active: true`. Khi kích hoạt banner mới, các banner khác tự động chuyển về `false`.
* **API Admin**:
  - `POST /admin/banners`: Tạo banner.
  - `PUT /admin/banners/:id`: Sửa banner.
  - `DELETE /admin/banners/:id`: Xóa banner (Nếu xóa banner active, hệ thống tự động đưa banner nhỏ nhất kế tiếp làm active).
  - `PATCH /admin/banners/:id/activate`: Kích hoạt banner cụ thể làm active duy nhất.

---

### 2.5. Module Contacts (Liên hệ khách hàng)
#### Gửi yêu cầu liên hệ từ Form công khai
* **Endpoint**: `POST /contacts`
* **Payload**:
  ```json
  {
    "name": "Nguyễn Văn An",
    "email": "an.nguyen@gmail.com",
    "phone": "0912345678",
    "message": "Tôi muốn tư vấn về sản phẩm"
  }
  ```
* **API Admin**:
  - `GET /admin/contacts?status=Mới&search=An&page=1&limit=10`: Phân trang, tìm kiếm và lọc liên hệ.
  - `PATCH /admin/contacts/:id/status`: Cập nhật trạng thái xử lý (`Mới`, `Đang xử lý`, `Đã xử lý`).
  - `DELETE /admin/contacts/:id`: Xóa liên hệ.

---

### 2.6. Module Custom Requests (Yêu cầu thiết kế riêng)
* **Endpoint công khai**: `POST /custom-requests`
* **Payload**:
  ```json
  {
    "name": "Nguyễn Văn An",
    "email": "an.nguyen@gmail.com",
    "phone": "0912345678",
    "idea": "Bản vẽ phác thảo nhẫn cưới 18K",
    "budget": "50.000.000 VND"
  }
  ```
* **API Admin**:
  - `GET /admin/custom-requests`
  - `PATCH /admin/custom-requests/:id/status` (Trạng thái: `Mới`, `Đang xử lý`, `Hoàn thành`).
  - `DELETE /admin/custom-requests/:id`

---

### 2.7. Module Design Samples (Mẫu thiết kế)
* **GET /design-samples**: Lấy mẫu thiết kế hiển thị (`hidden: false` sắp xếp theo `order`).
* **API Admin**:
  - `POST /admin/design-samples`: Tạo mẫu mới.
  - `PUT /admin/design-samples/:id`: Sửa mẫu.
  - `DELETE /admin/design-samples/:id`: Xóa mẫu.

---

### 2.8. Module Pages (Trang tĩnh CMS)
* **Endpoint công khai**: `GET /pages/:key` (Với `key` thuộc enum: `['about', 'size-guide', 'warranty']`).
  - *Lưu ý*: Tự động khởi tạo cấu hình rỗng ban đầu nếu trang đó chưa từng tồn tại trong Database thay vì báo lỗi 404.
* **API Admin**:
  - `PUT /admin/pages/:key`: Cập nhật nội dung (tiêu đề, bài viết, danh sách ảnh).

---

### 2.9. Module Settings (Cấu hình hệ thống)
* **GET /settings**: Lấy cấu hình duy nhất của hệ thống (Google Tag Manager ID, kích hoạt theo dõi, hotline, email liên hệ, bản đồ Google Map). Tự khởi tạo rỗng ban đầu nếu chưa có.
* **PUT /admin/settings**: Admin cập nhật cấu hình hệ thống duy nhất.

---

### 2.10. Module Uploads (Tải lên file)
* **Endpoint**: `POST /admin/uploads`
* **Quyền truy cập**: Yêu cầu Token Admin
* **Định dạng dữ liệu**: `multipart/form-data` chứa trường `files` (cho phép tối đa 10 tệp cùng lúc).
* **Phản hồi thành công (201 Created)**:
  ```json
  {
    "urls": [
      "http://localhost:4000/uploads/1782231622831-765410420.txt"
    ]
  }
  ```

---

### 2.11. Module Dashboard (Bảng điều khiển Admin)
#### Thống kê tổng số lượng các thực thể
* **Endpoint**: `GET /admin/dashboard/stats`
* **Quyền truy cập**: Yêu cầu Token Admin
* **Phản hồi thành công (200 OK)**:
  ```json
  {
    "totalProducts": 30,
    "totalBanners": 2,
    "totalContacts": 5,
    "pendingContacts": 2,
    "resolutionRate": 60
  }
  ```

#### Dữ liệu vẽ biểu đồ yêu cầu liên hệ theo thời gian
* **Endpoint**: `GET /admin/dashboard/contacts-chart?range=day|month|year` (Mặc định `range` là `day`).
* **Phản hồi thành công (200 OK)**:
  ```json
  [
    {
      "label": "2026-06-21",
      "count": 2
    },
    {
      "label": "2026-06-23",
      "count": 1
    }
  ]
  ```
