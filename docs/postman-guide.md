# Hướng dẫn Kiểm thử Toàn bộ API bằng Postman - WebDiamond

Tài liệu này chứa hướng dẫn chi tiết cách thiết lập và kiểm thử **tất cả 41 API** của hệ thống WebDiamond Backend bằng Postman.

---

## 1. Thiết lập Môi trường Postman (Environment)

Để không phải nhập lại địa chỉ máy chủ và mã token nhiều lần, bạn hãy tạo một **Environment** trong Postman và khai báo các biến sau:

| Tên biến (Variable) | Giá trị mặc định | Mô tả |
| :--- | :--- | :--- |
| `baseUrl` | `http://localhost:4000/api` | Đường dẫn gốc của API |
| `token` | *(Để trống)* | Mã JWT token của Admin hoặc User (sẽ tự động cập nhật khi đăng nhập hoặc đăng ký) |
| `categoryId` | *(Để trống)* | ID của danh mục test |
| `productId` | *(Để trống)* | ID của sản phẩm test |
| `productSlug` | `test-ring` | Slug của sản phẩm test |
| `bannerId` | *(Để trống)* | ID của banner test |
| `contactId` | *(Để trống)* | ID của liên hệ test |
| `customRequestId`| *(Để trống)* | ID của yêu cầu thiết kế test |
| `sampleId` | *(Để trống)* | ID của mẫu thiết kế test |

### Tự động thiết lập Token (Script tự động hóa)
Khi gọi API đăng nhập (`POST /auth/login`) hoặc đăng ký (`POST /auth/register`), bạn hãy dán đoạn mã sau vào tab **Tests** của Postman để tự động lưu token vào biến môi trường:
```javascript
const response = pm.response.json();
if (response.accessToken) {
    pm.environment.set("token", response.accessToken);
    console.log("✓ Đã lưu token tự động!");
}
```

### Cách đính kèm Token vào các request Admin
Đối với tất cả các request bắt đầu bằng `/admin/` (yêu cầu quyền Admin) hoặc các request /me cần xác thực, chọn tab **Authorization**:
* **Type**: `Bearer Token`
* **Token**: `{{token}}`

---

## 2. Hướng dẫn chi tiết 41 API Endpoints

### 2.1. Module Auth (Xác thực - 4 API)
1. **Đăng nhập lấy Token (POST)**:
   * **URL**: `{{baseUrl}}/auth/login` (Public)
   * **Body** (raw - JSON):
     ```json
     { "email": "admin@webdiamond.com", "password": "admin123" }
     ```
   * **Kỳ vọng**: `201 Created` trả về `accessToken` và thông tin `user`.
2. **Đăng ký tài khoản mới (POST)**:
   * **URL**: `{{baseUrl}}/auth/register` (Public)
   * **Body** (raw - JSON):
     ```json
     {
       "email": "user@webdiamond.com",
       "password": "password123",
       "name": "Nguyen Van A",
       "phone": "0987654321"
     }
     ```
   * **Kỳ vọng**: `201 Created` trả về `accessToken` và thông tin `user` mới tạo.
3. **Lấy thông tin tài khoản hiện tại (GET)**:
   * **URL**: `{{baseUrl}}/auth/me` (Yêu cầu Token)
   * **Kỳ vọng**: `200 OK` chứa thông tin cá nhân đầy đủ (`id`, `email`, `name`, `phone`, `role`, `createdAt`, `updatedAt`).
4. **Chỉnh sửa thông tin cá nhân (PUT)**:
   * **URL**: `{{baseUrl}}/auth/me` (Yêu cầu Token)
   * **Body** (raw - JSON):
     ```json
     {
       "name": "Nguyen Van B",
       "phone": "0912345678",
       "password": "newSecurePassword123"
     }
     ```
   * **Kỳ vọng**: `200 OK` chứa thông tin sau khi cập nhật.

### 2.2. Module Categories (Danh mục sản phẩm - 6 API)
3. **Lấy danh mục hiển thị (GET)**:
   * **URL**: `{{baseUrl}}/categories` (Public)
   * **Kỳ vọng**: `200 OK` chứa danh mục không ẩn (`hidden: false`) sắp xếp theo `order`.
4. **Lấy toàn bộ danh mục (GET - Admin)**:
   * **URL**: `{{baseUrl}}/admin/categories` (Admin)
   * **Kỳ vọng**: `200 OK` chứa tất cả danh mục kể cả bị ẩn.
5. **Tạo danh mục mới (POST)**:
   * **URL**: `{{baseUrl}}/admin/categories` (Admin)
   * **Body** (raw - JSON):
     ```json
     { "name": "Nhẫn cưới", "slug": "ring", "order": 1, "hidden": false }
     ```
   * **Kỳ vọng**: `201 Created` trả về danh mục kèm `id`. (Tab *Tests*: `pm.environment.set("categoryId", pm.response.json().id);`).
6. **Lấy chi tiết danh mục (GET - Admin)**:
   * **URL**: `{{baseUrl}}/admin/categories/{{categoryId}}` (Admin)
   * **Kỳ vọng**: `200 OK` thông tin chi tiết.
7. **Cập nhật danh mục (PUT)**:
   * **URL**: `{{baseUrl}}/admin/categories/{{categoryId}}` (Admin)
   * **Body** (raw - JSON):
     ```json
     { "name": "Nhẫn cưới vàng 18K", "slug": "ring-18k", "order": 1, "hidden": false }
     ```
   * **Kỳ vọng**: `200 OK`.
8. **Thay đổi thứ tự hiển thị danh mục (PATCH)**:
   * **URL**: `{{baseUrl}}/admin/categories/reorder` (Admin)
   * **Body** (raw - JSON):
     ```json
     {
       "items": [
         { "id": "{{categoryId}}", "order": 1 }
       ]
     }
     ```
   * **Kỳ vọng**: `200 OK`.
9. **Xóa danh mục (DELETE)**:
   * **URL**: `{{baseUrl}}/admin/categories/{{categoryId}}` (Admin)
   * **Kỳ vọng**: `200 OK` chứa `{"deleted": true}`.

### 2.3. Module Products (Sản phẩm - 7 API)
10. **Lấy danh sách sản phẩm công khai (GET)**:
    * **URL**: `{{baseUrl}}/products?page=1&limit=12&sort=priceAsc&category=ring&minPrice=10000000&maxPrice=100000000&search=ring` (Public)
    * **Kỳ vọng**: `200 OK` chứa mảng `data` và số lượng `total`.
11. **Lấy chi tiết sản phẩm theo slug (GET)**:
    * **URL**: `{{baseUrl}}/products/{{productSlug}}` (Public)
    * **Kỳ vọng**: `200 OK`.
12. **Lấy tất cả sản phẩm (GET - Admin)**:
    * **URL**: `{{baseUrl}}/admin/products` (Admin)
    * **Kỳ vọng**: `200 OK`.
13. **Lấy chi tiết sản phẩm theo ID (GET - Admin)**:
    * **URL**: `{{baseUrl}}/admin/products/{{productId}}` (Admin)
    * **Kỳ vọng**: `200 OK`.
14. **Thêm sản phẩm mới (POST)**:
    * **URL**: `{{baseUrl}}/admin/products` (Admin)
    * **Body** (raw - JSON):
      ```json
      {
        "slug": "test-ring",
        "name": "Test Diamond Ring",
        "category": "ring",
        "price": "50.000.000 VND",
        "priceValue": 50000000,
        "image": "/ring.png",
        "images": ["/ring.png"],
        "description": ["Mô tả sản phẩm"],
        "spec": "Vàng trắng 18K",
        "colors": [{"id": "silver", "name": "Silver", "hex": "#E5E5E5"}],
        "sizes": ["14", "15"],
        "featured": true,
        "hidden": false
      }
      ```
    * **Kỳ vọng**: `201 Created` trả về sản phẩm kèm `id`. (Tab *Tests*: `pm.environment.set("productId", pm.response.json().id);`).
15. **Cập nhật sản phẩm (PUT)**:
    * **URL**: `{{baseUrl}}/admin/products/{{productId}}` (Admin)
    * **Body** (raw - JSON): Cấu trúc giống như POST (sửa giá trị tùy ý).
    * **Kỳ vọng**: `200 OK`.
16. **Xóa sản phẩm (DELETE)**:
    * **URL**: `{{baseUrl}}/admin/products/{{productId}}` (Admin)
    * **Kỳ vọng**: `200 OK` chứa `{"deleted": true}`.

### 2.4. Module Banners (Banner quảng cáo - 7 API)
17. **Lấy danh sách banner công khai (GET)**:
    * **URL**: `{{baseUrl}}/banners` (Public)
    * **Kỳ vọng**: `200 OK` chứa các banner có `hidden: false` sắp xếp theo `order`.
18. **Lấy banner đang kích hoạt (GET)**:
    * **URL**: `{{baseUrl}}/banners/active` (Public)
    * **Kỳ vọng**: `200 OK` chứa duy nhất banner đang active.
19. **Lấy toàn bộ banner (GET - Admin)**:
    * **URL**: `{{baseUrl}}/admin/banners` (Admin)
    * **Kỳ vọng**: `200 OK`.
20. **Tạo banner mới (POST)**:
    * **URL**: `{{baseUrl}}/admin/banners` (Admin)
    * **Body** (raw - JSON):
      ```json
      { "title": "GODG1FT", "subtitle": "Shop All", "image": "/video.mp4", "type": "video", "link": "/shop", "active": true }
      ```
    * **Kỳ vọng**: `201 Created` trả về banner kèm `id`. (Tab *Tests*: `pm.environment.set("bannerId", pm.response.json().id);`).
21. **Lấy chi tiết banner (GET - Admin)**:
    * **URL**: `{{baseUrl}}/admin/banners/{{bannerId}}` (Admin)
    * **Kỳ vọng**: `200 OK`.
22. **Cập nhật banner (PUT)**:
    * **URL**: `{{baseUrl}}/admin/banners/{{bannerId}}` (Admin)
    * **Body** (raw - JSON): Sửa banner tùy ý.
    * **Kỳ vọng**: `200 OK`.
23. **Kích hoạt banner duy nhất (PATCH)**:
    * **URL**: `{{baseUrl}}/admin/banners/{{bannerId}}/activate` (Admin)
    * **Kỳ vọng**: `200 OK`. Banner này sẽ chuyển sang `active: true` và tất cả banner khác chuyển thành `false`.
24. **Xóa banner (DELETE)**:
    * **URL**: `{{baseUrl}}/admin/banners/{{bannerId}}` (Admin)
    * **Kỳ vọng**: `200 OK` chứa `{"deleted": true}`.

### 2.5. Module Contacts (Liên hệ khách hàng - 5 API)
25. **Gửi liên hệ từ Form công khai (POST)**:
    * **URL**: `{{baseUrl}}/contacts` (Public)
    * **Body** (raw - JSON):
      ```json
      { "name": "Khách hàng", "email": "client@example.com", "phone": "0987654321", "message": "Cần tư vấn nhẫn" }
      ```
    * **Kỳ vọng**: `201 Created` trả về liên hệ kèm `id`. (Tab *Tests*: `pm.environment.set("contactId", pm.response.json().id);`).
26. **Lấy danh sách liên hệ phân trang (GET - Admin)**:
    * **URL**: `{{baseUrl}}/admin/contacts?page=1&limit=10&status=Mới&search=Khách` (Admin)
    * **Kỳ vọng**: `200 OK` chứa `{ data: [...], total: X }`.
27. **Lấy chi tiết liên hệ (GET - Admin)**:
    * **URL**: `{{baseUrl}}/admin/contacts/{{contactId}}` (Admin)
    * **Kỳ vọng**: `200 OK`.
28. **Cập nhật trạng thái liên hệ (PATCH)**:
    * **URL**: `{{baseUrl}}/admin/contacts/{{contactId}}/status` (Admin)
    * **Body** (raw - JSON):
      ```json
      { "status": "Đang xử lý" } // Giá trị hợp lệ: Mới, Đang xử lý, Đã xử lý
      ```
    * **Kỳ vọng**: `200 OK`.
29. **Xóa liên hệ (DELETE)**:
    * **URL**: `{{baseUrl}}/admin/contacts/{{contactId}}` (Admin)
    * **Kỳ vọng**: `200 OK` chứa `{"deleted": true}`.

### 2.6. Module Custom Requests (Yêu cầu thiết kế riêng - 5 API)
30. **Gửi yêu cầu thiết kế riêng (POST)**:
    * **URL**: `{{baseUrl}}/custom-requests` (Public)
    * **Body** (raw - JSON):
      ```json
      { "name": "Khách hàng thiết kế", "email": "design@example.com", "phone": "0912345678", "idea": "Nhẫn cưới bản to đính ruby", "budget": "80.000.000 VND" }
      ```
    * **Kỳ vọng**: `201 Created` trả về yêu cầu kèm `id`. (Tab *Tests*: `pm.environment.set("customRequestId", pm.response.json().id);`).
31. **Lấy danh sách yêu cầu thiết kế (GET - Admin)**:
    * **URL**: `{{baseUrl}}/admin/custom-requests?page=1&limit=10&status=Mới&search=Khách` (Admin)
    * **Kỳ vọng**: `200 OK` chứa `{ data: [...], total: X }`.
32. **Lấy chi tiết yêu cầu thiết kế (GET - Admin)**:
    * **URL**: `{{baseUrl}}/admin/custom-requests/{{customRequestId}}` (Admin)
    * **Kỳ vọng**: `200 OK`.
33. **Cập nhật trạng thái yêu cầu thiết kế (PATCH)**:
    * **URL**: `{{baseUrl}}/admin/custom-requests/{{customRequestId}}/status` (Admin)
    * **Body** (raw - JSON):
      ```json
      { "status": "Đang xử lý" } // Giá trị hợp lệ: Mới, Đang xử lý, Hoàn thành
      ```
    * **Kỳ vọng**: `200 OK`.
34. **Xóa yêu cầu thiết kế (DELETE)**:
    * **URL**: `{{baseUrl}}/admin/custom-requests/{{customRequestId}}` (Admin)
    * **Kỳ vọng**: `200 OK` chứa `{"deleted": true}`.

### 2.7. Module Design Samples (Mẫu thiết kế trang sức - 5 API)
35. **Lấy mẫu thiết kế công khai (GET)**:
    * **URL**: `{{baseUrl}}/design-samples` (Public)
    * **Kỳ vọng**: `200 OK` chứa danh sách mẫu thiết kế không ẩn (`hidden: false`) sắp theo `order`.
36. **Lấy tất cả mẫu thiết kế (GET - Admin)**:
    * **URL**: `{{baseUrl}}/admin/design-samples` (Admin)
    * **Kỳ vọng**: `200 OK`.
37. **Tạo mẫu thiết kế mới (POST)**:
    * **URL**: `{{baseUrl}}/admin/design-samples` (Admin)
    * **Body** (raw - JSON):
      ```json
      { "title": "Bản phác thảo rồng vàng", "image": "/dragonsample.png", "description": "Thiết kế đính đá ruby đỏ", "order": 1, "hidden": false }
      ```
    * **Kỳ vọng**: `201 Created` trả về đối tượng mẫu kèm `id`. (Tab *Tests*: `pm.environment.set("sampleId", pm.response.json().id);`).
38. **Cập nhật mẫu thiết kế (PUT)**:
    * **URL**: `{{baseUrl}}/admin/design-samples/{{sampleId}}` (Admin)
    * **Body** (raw - JSON): Thay đổi dữ liệu tùy ý.
    * **Kỳ vọng**: `200 OK`.
39. **Xóa mẫu thiết kế (DELETE)**:
    * **URL**: `{{baseUrl}}/admin/design-samples/{{sampleId}}` (Admin)
    * **Kỳ vọng**: `200 OK` chứa `{"deleted": true}`.

### 2.8. Module Pages (Trang tĩnh CMS - 2 API)
40. **Lấy nội dung trang tĩnh (GET)**:
    * **URL**: `{{baseUrl}}/pages/about` (Public - Khóa hợp lệ: `about`, `size-guide`, `warranty`)
    * **Kỳ vọng**: `200 OK` (Nếu trang chưa được cấu tạo trong DB, hệ thống tự động upsert bản ghi rỗng thay vì báo lỗi 404).
41. **Cập nhật nội dung trang tĩnh (PUT)**:
    * **URL**: `{{baseUrl}}/admin/pages/about` (Admin)
    * **Body** (raw - JSON):
      ```json
      { "title": "Về Chúng Tôi", "content": "Nội dung giới thiệu thương hiệu...", "images": ["/img1.jpg"] }
      ```
    * **Kỳ vọng**: `200 OK`.

### 2.9. Module Settings (Cấu hình hệ thống - 2 API)
42. **Xem cấu hình hệ thống (GET)**:
    * **URL**: `{{baseUrl}}/settings` (Public)
    * **Kỳ vọng**: `200 OK` (Tự động khởi tạo cấu hình mặc định rỗng nếu chưa có).
43. **Cập nhật cấu hình hệ thống (PUT)**:
    * **URL**: `{{baseUrl}}/admin/settings` (Admin)
    * **Body** (raw - JSON):
      ```json
      { "gtmId": "GTM-XYZ", "trackingEnabled": true, "contactAddress": "Hà Nội", "contactHotline": "090", "contactEmail": "a@gmail.com", "googleMapUrl": "https://..." }
      ```
    * **Kỳ vọng**: `200 OK` trả về cấu hình mới nhất.

### 2.10. Module Uploads (Tải file - 1 API)
44. **Tải ảnh/video lên máy chủ (POST)**:
    * **URL**: `{{baseUrl}}/admin/uploads` (Admin)
    * **Body** (Chọn kiểu **form-data**):
      * Key: `files` (Chọn loại **File** thay vì Text ở góc phải trường nhập Key).
      * Value: Chọn một hoặc nhiều ảnh/video từ máy tính của bạn.
    * **Kỳ vọng**: `201 Created` trả về danh sách liên kết truy cập tĩnh. Ví dụ: `{"urls":["http://localhost:4000/uploads/...png"]}`.

### 2.11. Module Dashboard (Bảng quản trị - 2 API)
45. **Xem thống kê tổng quan (GET)**:
    * **URL**: `{{baseUrl}}/admin/dashboard/stats` (Admin)
    * **Kỳ vọng**: `200 OK` trả về `{ totalProducts: X, totalBanners: Y, totalContacts: Z, pendingContacts: W, resolutionRate: P }`.
46. **Dữ liệu vẽ biểu đồ liên hệ (GET)**:
    * **URL**: `{{baseUrl}}/admin/dashboard/contacts-chart?range=day` (Admin - Chấp nhận `day`, `month`, `year`)
    * **Kỳ vọng**: `200 OK` trả về mảng dữ liệu gom nhóm thời gian tăng dần `[{ "label": "2026-06-23", "count": 1 }]`.

---

## 3. Postman Collection JSON (Bao gồm đầy đủ 39 request)

Để import nhanh toàn bộ bộ API test này vào Postman:
1. Tạo một tệp tin trên máy tính có tên `WebDiamond_Complete.postman_collection.json`.
2. Copy toàn bộ nội dung JSON bên dưới dán vào tệp tin đó và lưu lại.
3. Mở Postman, nhấn nút **Import** ở góc trái màn hình, chọn tệp tin vừa lưu.

```json
{
	"info": {
		"_postman_id": "f8339f40-3ab6-47b1-ba2c-39ff1a2b3c4d",
		"name": "WebDiamond Complete API Test Suite",
		"description": "Bộ API test suite hoàn chỉnh gồm đầy đủ các endpoint công khai và quản trị cho WebDiamond",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "Auth (Xác thực)",
			"item": [
				{
					"name": "1. Đăng nhập (POST)",
					"event": [
						{
							"listen": "test",
							"script": {
								"exec": [
									"const response = pm.response.json();",
									"if (response.accessToken) {",
									"    pm.environment.set(\"token\", response.accessToken);",
									"    console.log(\"✓ Đã lưu token tự động!\");",
									"}"
								],
								"type": "text/javascript"
							}
						}
					],
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"email\": \"admin@webdiamond.com\",\n    \"password\": \"admin123\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{baseUrl}}/auth/login",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"auth",
								"login"
							]
						}
					},
					"response": []
				},
				{
					"name": "2. Lấy thông tin cá nhân (GET)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/auth/me",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"auth",
								"me"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Categories (Danh mục)",
			"item": [
				{
					"name": "1. Lấy danh mục hiển thị (GET)",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/categories",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"categories"
							]
						}
					},
					"response": []
				},
				{
					"name": "2. Lấy tất cả danh mục (GET - Admin)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/admin/categories",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"categories"
							]
						}
					},
					"response": []
				},
				{
					"name": "3. Tạo danh mục mới (POST)",
					"event": [
						{
							"listen": "test",
							"script": {
								"exec": [
									"const res = pm.response.json();",
									"if (res.id) {",
									"    pm.environment.set(\"categoryId\", res.id);",
									"}"
								],
								"type": "text/javascript"
							}
						}
					],
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"name\": \"Nhẫn cưới\",\n    \"slug\": \"ring\",\n    \"order\": 1,\n    \"hidden\": false\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{baseUrl}}/admin/categories",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"categories"
							]
						}
					},
					"response": []
				},
				{
					"name": "4. Chi tiết danh mục (GET - Admin)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/admin/categories/{{categoryId}}",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"categories",
								"{{categoryId}}"
							]
						}
					},
					"response": []
				},
				{
					"name": "5. Cập nhật danh mục (PUT)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"name\": \"Nhẫn cưới vàng 18K\",\n    \"slug\": \"ring-18k\",\n    \"order\": 1,\n    \"hidden\": false\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{baseUrl}}/admin/categories/{{categoryId}}",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"categories",
								"{{categoryId}}"
							]
						}
					},
					"response": []
				},
				{
					"name": "6. Sắp xếp danh mục (PATCH)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "PATCH",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"items\": [\n        {\n            \"id\": \"{{categoryId}}\",\n            \"order\": 1\n        }\n    ]\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{baseUrl}}/admin/categories/reorder",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"categories",
								"reorder"
							]
						}
					},
					"response": []
				},
				{
					"name": "7. Xóa danh mục (DELETE)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/admin/categories/{{categoryId}}",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"categories",
								"{{categoryId}}"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Products (Sản phẩm)",
			"item": [
				{
					"name": "1. Danh sách công khai (GET)",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/products?page=1&limit=12",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"products"
							],
							"query": [
								{
									"key": "page",
									"value": "1"
								},
								{
									"key": "limit",
									"value": "12"
								},
								{
									"key": "sort",
									"value": "priceAsc",
									"disabled": true
								},
								{
									"key": "category",
									"value": "ring",
									"disabled": true
								},
								{
									"key": "search",
									"value": "Diamond",
									"disabled": true
								}
							]
						}
					},
					"response": []
				},
				{
					"name": "2. Chi tiết theo slug (GET)",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/products/{{productSlug}}",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"products",
								"{{productSlug}}"
							]
						}
					},
					"response": []
				},
				{
					"name": "3. Lấy tất cả sản phẩm (GET - Admin)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/admin/products",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"products"
							]
						}
					},
					"response": []
				},
				{
					"name": "4. Chi tiết sản phẩm ID (GET - Admin)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/admin/products/{{productId}}",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"products",
								"{{productId}}"
							]
						}
					},
					"response": []
				},
				{
					"name": "5. Thêm sản phẩm mới (POST)",
					"event": [
						{
							"listen": "test",
							"script": {
								"exec": [
									"const res = pm.response.json();",
									"if (res.id) {",
									"    pm.environment.set(\"productId\", res.id);",
									"    pm.environment.set(\"productSlug\", res.slug);",
									"}"
								],
								"type": "text/javascript"
							}
						}
					],
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"slug\": \"test-ring\",\n    \"name\": \"Test Diamond Ring\",\n    \"category\": \"ring\",\n    \"price\": \"50.000.000 VND\",\n    \"priceValue\": 50000000,\n    \"image\": \"/ring.png\",\n    \"images\": [\"/ring.png\"],\n    \"description\": [\"Mô tả nhẫn kiểm thử\"],\n    \"spec\": \"Vàng 18K\",\n    \"colors\": [{\"id\":\"silver\", \"name\":\"Silver\", \"hex\":\"#E5E5E5\"}],\n    \"sizes\": [\"14\",\"15\"],\n    \"featured\": true,\n    \"hidden\": false\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{baseUrl}}/admin/products",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"products"
							]
						}
					},
					"response": []
				},
				{
					"name": "6. Cập nhật sản phẩm (PUT)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"slug\": \"test-ring\",\n    \"name\": \"Test Diamond Ring Updated\",\n    \"category\": \"ring\",\n    \"price\": \"60.000.000 VND\",\n    \"priceValue\": 60000000,\n    \"image\": \"/ring.png\",\n    \"images\": [\"/ring.png\"],\n    \"description\": [\"Mô tả nhẫn kiểm thử sửa đổi\"],\n    \"spec\": \"Vàng 18K\",\n    \"colors\": [{\"id\":\"silver\", \"name\":\"Silver\", \"hex\":\"#E5E5E5\"}],\n    \"sizes\": [\"14\",\"15\"],\n    \"featured\": true,\n    \"hidden\": false\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{baseUrl}}/admin/products/{{productId}}",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"products",
								"{{productId}}"
							]
						}
					},
					"response": []
				},
				{
					"name": "7. Xóa sản phẩm (DELETE)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/admin/products/{{productId}}",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"products",
								"{{productId}}"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Banners (Ảnh bìa quảng cáo)",
			"item": [
				{
					"name": "1. Lấy danh sách banners (GET)",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/banners",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"banners"
							]
						}
					},
					"response": []
				},
				{
					"name": "2. Lấy banner active chính (GET)",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/banners/active",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"banners",
								"active"
							]
						}
					},
					"response": []
				},
				{
					"name": "3. Lấy tất cả banners (GET - Admin)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/admin/banners",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"banners"
							]
						}
					},
					"response": []
				},
				{
					"name": "4. Tạo banner mới (POST)",
					"event": [
						{
							"listen": "test",
							"script": {
								"exec": [
									"const res = pm.response.json();",
									"if (res.id) {",
									"    pm.environment.set(\"bannerId\", res.id);",
									"}"
								],
								"type": "text/javascript"
							}
						}
					],
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"title\": \"GODG1FT Test Banner\",\n    \"subtitle\": \"Shop All Items\",\n    \"image\": \"/videobanner.mp4\",\n    \"type\": \"video\",\n    \"link\": \"/shop\",\n    \"active\": true\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{baseUrl}}/admin/banners",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"banners"
							]
						}
					},
					"response": []
				},
				{
					"name": "5. Chi tiết banner ID (GET - Admin)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/admin/banners/{{bannerId}}",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"banners",
								"{{bannerId}}"
							]
						}
					},
					"response": []
				},
				{
					"name": "6. Cập nhật banner (PUT)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"title\": \"GODG1FT Test Banner Sửa\",\n    \"subtitle\": \"Shop New Items\",\n    \"image\": \"/image.jpg\",\n    \"type\": \"image\",\n    \"link\": \"/shop\",\n    \"active\": false\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{baseUrl}}/admin/banners/{{bannerId}}",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"banners",
								"{{bannerId}}"
							]
						}
					},
					"response": []
				},
				{
					"name": "7. Kích hoạt banner duy nhất (PATCH)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "PATCH",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/admin/banners/{{bannerId}}/activate",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"banners",
								"{{bannerId}}",
								"activate"
							]
						}
					},
					"response": []
				},
				{
					"name": "8. Xóa banner (DELETE)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/admin/banners/{{bannerId}}",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"banners",
								"{{bannerId}}"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Contacts (Yêu cầu tư vấn)",
			"item": [
				{
					"name": "1. Gửi liên hệ mới (POST)",
					"event": [
						{
							"listen": "test",
							"script": {
								"exec": [
									"const res = pm.response.json();",
									"if (res.id) {",
									"    pm.environment.set(\"contactId\", res.id);",
									"}"
								],
								"type": "text/javascript"
							}
						}
					],
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"name\": \"Khách liên hệ\",\n    \"email\": \"test.contact@gmail.com\",\n    \"phone\": \"0909090909\",\n    \"message\": \"Nội dung tin nhắn tư vấn từ Postman\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{baseUrl}}/contacts",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"contacts"
							]
						}
					},
					"response": []
				},
				{
					"name": "2. Lấy liên hệ phân trang (GET - Admin)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/admin/contacts?page=1&limit=10&status=Mới",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"contacts"
							],
							"query": [
								{
									"key": "page",
									"value": "1"
								},
								{
									"key": "limit",
									"value": "10"
								},
								{
									"key": "status",
									"value": "Mới"
								}
							]
						}
					},
					"response": []
				},
				{
					"name": "3. Chi tiết liên hệ ID (GET - Admin)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/admin/contacts/{{contactId}}",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"contacts",
								"{{contactId}}"
							]
						}
					},
					"response": []
				},
				{
					"name": "4. Thay đổi trạng thái liên hệ (PATCH)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "PATCH",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"status\": \"Đang xử lý\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{baseUrl}}/admin/contacts/{{contactId}}/status",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"contacts",
								"{{contactId}}",
								"status"
							]
						}
					},
					"response": []
				},
				{
					"name": "5. Xóa liên hệ (DELETE)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/admin/contacts/{{contactId}}",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"contacts",
								"{{contactId}}"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Custom Requests (Thiết kế riêng)",
			"item": [
				{
					"name": "1. Gửi yêu cầu thiết kế mới (POST)",
					"event": [
						{
							"listen": "test",
							"script": {
								"exec": [
									"const res = pm.response.json();",
									"if (res.id) {",
									"    pm.environment.set(\"customRequestId\", res.id);",
									"}"
								],
								"type": "text/javascript"
							}
						}
					],
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"name\": \"Khách thiết kế\",\n    \"email\": \"designer@gmail.com\",\n    \"phone\": \"0888777666\",\n    \"idea\": \"Muốn vẽ mặt dây chuyền vương miện\",\n    \"budget\": \"120.000.000 VND\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{baseUrl}}/custom-requests",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"custom-requests"
							]
						}
					},
					"response": []
				},
				{
					"name": "2. Lấy danh sách yêu cầu (GET - Admin)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/admin/custom-requests?page=1&limit=10",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"custom-requests"
							],
							"query": [
								{
									"key": "page",
									"value": "1"
								},
								{
									"key": "limit",
									"value": "10"
								}
							]
						}
					},
					"response": []
				},
				{
					"name": "3. Chi tiết yêu cầu ID (GET - Admin)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/admin/custom-requests/{{customRequestId}}",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"custom-requests",
								"{{customRequestId}}"
							]
						}
					},
					"response": []
				},
				{
					"name": "4. Sửa trạng thái yêu cầu (PATCH)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "PATCH",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"status\": \"Đang xử lý\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{baseUrl}}/admin/custom-requests/{{customRequestId}}/status",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"custom-requests",
								"{{customRequestId}}",
								"status"
							]
						}
					},
					"response": []
				},
				{
					"name": "5. Xóa yêu cầu thiết kế (DELETE)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/admin/custom-requests/{{customRequestId}}",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"custom-requests",
								"{{customRequestId}}"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Design Samples (Mẫu thiết kế)",
			"item": [
				{
					"name": "1. Lấy mẫu công khai (GET)",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/design-samples",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"design-samples"
							]
						}
					},
					"response": []
				},
				{
					"name": "2. Lấy tất cả mẫu (GET - Admin)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/admin/design-samples",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"design-samples"
							]
						}
					},
					"response": []
				},
				{
					"name": "3. Tạo mẫu thiết kế mới (POST)",
					"event": [
						{
							"listen": "test",
							"script": {
								"exec": [
									"const res = pm.response.json();",
									"if (res.id) {",
									"    pm.environment.set(\"sampleId\", res.id);",
									"}"
								],
								"type": "text/javascript"
							}
						}
					],
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"title\": \"Vương miện công chúa\",\n    \"image\": \"/sample1.jpg\",\n    \"description\": \"Thiết kế tinh xảo đính ngọc trai\",\n    \"order\": 1,\n    \"hidden\": false\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{baseUrl}}/admin/design-samples",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"design-samples"
							]
						}
					},
					"response": []
				},
				{
					"name": "4. Cập nhật mẫu thiết kế (PUT)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"title\": \"Vương miện nữ hoàng\",\n    \"image\": \"/sample-edited.jpg\",\n    \"description\": \"Thiết kế sửa đổi đính đá quý\",\n    \"order\": 1,\n    \"hidden\": false\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{baseUrl}}/admin/design-samples/{{sampleId}}",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"design-samples",
								"{{sampleId}}"
							]
						}
					},
					"response": []
				},
				{
					"name": "5. Xóa mẫu thiết kế (DELETE)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/admin/design-samples/{{sampleId}}",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"design-samples",
								"{{sampleId}}"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Pages (Trang tĩnh CMS)",
			"item": [
				{
					"name": "1. Lấy trang tĩnh (GET)",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/pages/about",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"pages",
								"about"
							]
						}
					},
					"response": []
				},
				{
					"name": "2. Cập nhật trang tĩnh (PUT)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"title\": \"Về WebDiamond\",\n    \"content\": \"<p>Giới thiệu thương hiệu trang sức của chúng tôi.</p>\",\n    \"images\": [\"/banner-about.png\"]\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{baseUrl}}/admin/pages/about",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"pages",
								"about"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Settings (Cấu hình hệ thống)",
			"item": [
				{
					"name": "1. Xem cấu hình (GET)",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/settings",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"settings"
							]
						}
					},
					"response": []
				},
				{
					"name": "2. Cập nhật cấu hình (PUT)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"gtmId\": \"GTM-WD999\",\n    \"trackingEnabled\": true,\n    \"contactAddress\": \"123 Diamond Street, HCM\",\n    \"contactHotline\": \"1900 1234\",\n    \"contactEmail\": \"hello@webdiamond.com\",\n    \"googleMapUrl\": \"https://maps.google.com/...\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{baseUrl}}/admin/settings",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"settings"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Uploads (Tải file)",
			"item": [
				{
					"name": "1. Tải ảnh lên máy chủ (POST)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "files",
									"type": "file",
									"src": []
								}
							]
						},
						"url": {
							"raw": "{{baseUrl}}/admin/uploads",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"uploads"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Dashboard (CMS Thống kê)",
			"item": [
				{
					"name": "1. Thống kê tổng hợp (GET)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/admin/dashboard/stats",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"dashboard",
								"stats"
							]
						}
					},
					"response": []
				},
				{
					"name": "2. Dữ liệu biểu đồ (GET)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/admin/dashboard/contacts-chart?range=day",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin",
								"dashboard",
								"contacts-chart"
							],
							"query": [
								{
									"key": "range",
									"value": "day"
								}
							]
						}
					},
					"response": []
				}
			]
		}
	]
}
```
