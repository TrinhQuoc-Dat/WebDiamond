# Hướng dẫn Kiểm thử API bằng Postman - WebDiamond

Tài liệu này hướng dẫn chi tiết cách thiết lập Postman để gọi và kiểm thử từng API trong hệ thống WebDiamond Backend.

---

## 1. Thiết lập Môi trường Postman (Environment)

Để không phải nhập lại địa chỉ máy chủ và mã token nhiều lần, bạn nên tạo một **Environment** trong Postman với các biến sau:

| Tên biến (Variable) | Giá trị mặc định | Mô tả |
| :--- | :--- | :--- |
| `baseUrl` | `http://localhost:4000/api` | Đường dẫn gốc của API |
| `token` | *(Để trống)* | Sẽ tự động cập nhật sau khi đăng nhập |
| `categoryId` | *(Để trống)* | Lưu ID danh mục test |
| `productId` | *(Để trống)* | Lưu ID sản phẩm test |
| `contactId` | *(Để trống)* | Lưu ID liên hệ test |
| `bannerId` | *(Để trống)* | Lưu ID banner test |
| `sampleId` | *(Để trống)* | Lưu ID mẫu thiết kế test |
| `customRequestId`| *(Để trống)* | Lưu ID yêu cầu thiết kế test |

### Tự động thiết lập Token (Script tự động hóa)
Khi gọi API đăng nhập (`POST /auth/login`), bạn có thể thêm đoạn mã sau vào tab **Tests** của Postman để tự động lưu token vào biến môi trường:
```javascript
const response = pm.response.json();
if (response.accessToken) {
    pm.environment.set("token", response.accessToken);
    console.log("✓ Đã lưu token tự động!");
}
```

### Cách đính kèm Token vào các request Admin
Đối với tất cả các request trong thư mục Admin, bạn chọn tab **Authorization**:
* **Type**: `Bearer Token`
* **Token**: `{{token}}`

---

## 2. Hướng dẫn Test từng API một

### 2.1. Module Auth (Xác thực)

#### 1. Đăng nhập (POST)
* **URL**: `{{baseUrl}}/auth/login`
* **Method**: `POST`
* **Headers**: `Content-Type: application/json`
* **Body** (raw - JSON):
  ```json
  {
    "email": "admin@webdiamond.com",
    "password": "admin123"
  }
  ```
* **Kỳ vọng**: Trả về mã `201 Created` kèm theo đối tượng chứa `accessToken`. Mã token này sẽ tự động lưu nhờ script Test ở trên.

#### 2. Lấy thông tin cá nhân (GET)
* **URL**: `{{baseUrl}}/auth/me`
* **Method**: `GET`
* **Kỳ vọng**: Trả về `200 OK` kèm thông tin tài khoản admin. Nếu không gửi kèm Token (hoặc sai token), kỳ vọng trả lỗi `401 Unauthorized`.

---

### 2.2. Module Categories (Danh mục)

#### 1. Tạo danh mục mới (POST)
* **URL**: `{{baseUrl}}/admin/categories`
* **Method**: `POST`
* **Body** (raw - JSON):
  ```json
  {
    "name": "Nhẫn Cưới",
    "slug": "wedding-ring",
    "order": 1,
    "hidden": false
  }
  ```
* **Kỳ vọng**: Trả về `201 Created` kèm thông tin danh mục và `id`. 
* *Mẹo Postman*: Trong tab **Tests**, bạn có thể lưu lại ID danh mục để dùng cho các request sau bằng lệnh:
  ```javascript
  pm.environment.set("categoryId", pm.response.json().id);
  ```

#### 2. Lấy danh mục công khai (GET)
* **URL**: `{{baseUrl}}/categories`
* **Method**: `GET`
* **Kỳ vọng**: Trả về `200 OK` chứa mảng các danh mục đang hoạt động (`hidden: false`), sắp xếp theo thứ tự `order`.

#### 3. Lấy tất cả danh mục (GET - Admin)
* **URL**: `{{baseUrl}}/admin/categories`
* **Method**: `GET`
* **Kỳ vọng**: Trả về `200 OK` gồm toàn bộ danh mục (kể cả danh mục ẩn).

#### 4. Cập nhật danh mục (PUT)
* **URL**: `{{baseUrl}}/admin/categories/{{categoryId}}`
* **Method**: `PUT`
* **Body** (raw - JSON):
  ```json
  {
    "name": "Nhẫn Cưới Kim Cương",
    "slug": "wedding-diamond-ring",
    "order": 1,
    "hidden": false
  }
  ```
* **Kỳ vọng**: Trả về `200 OK` chứa thông tin danh mục sau khi sửa.

#### 5. Thay đổi thứ tự danh mục (PATCH)
* **URL**: `{{baseUrl}}/admin/categories/reorder`
* **Method**: `PATCH`
* **Body** (raw - JSON):
  ```json
  {
    "ids": ["{{categoryId}}"]
  }
  ```
* **Kỳ vọng**: Trả về `200 OK` kèm danh sách danh mục đã reorder.

#### 6. Xóa danh mục (DELETE)
* **URL**: `{{baseUrl}}/admin/categories/{{categoryId}}`
* **Method**: `DELETE`
* **Kỳ vọng**: Trả về `200 OK` chứa `{"deleted": true}`.

---

### 2.3. Module Products (Sản phẩm)

#### 1. Thêm sản phẩm mới (POST)
* **URL**: `{{baseUrl}}/admin/products`
* **Method**: `POST`
* **Body** (raw - JSON):
  ```json
  {
    "slug": "test-necklace",
    "name": "Test Diamond Necklace",
    "category": "necklace",
    "price": "35.000.000 VND",
    "priceValue": 35000000,
    "image": "/shop.png",
    "images": ["/shop.png"],
    "description": ["Sản phẩm dây chuyền cao cấp thiết kế giới hạn."],
    "spec": "Trọng lượng: 10g. Chất liệu: Vàng trắng 18K đính kim cương tự nhiên.",
    "colors": [
      { "id": "silver", "name": "Silver", "hex": "#E5E5E5" }
    ],
    "sizes": ["40", "45"],
    "featured": true,
    "hidden": false
  }
  ```
* **Kỳ vọng**: Trả về `201 Created` kèm thông tin sản phẩm và `id`.
* *Tests script*:
  ```javascript
  pm.environment.set("productId", pm.response.json().id);
  ```

#### 2. Lấy danh sách sản phẩm công khai (GET)
* **URL**: `{{baseUrl}}/products?page=1&limit=12&sort=priceAsc&search=Diamond`
* **Method**: `GET`
* **Kỳ vọng**: Trả về `200 OK` dạng đối tượng chứa `{ data: [...], total: X }` chứa các sản phẩm khớp với bộ lọc.

#### 3. Chi tiết sản phẩm theo slug (GET)
* **URL**: `{{baseUrl}}/products/test-necklace`
* **Method**: `GET`
* **Kỳ vọng**: Trả về `200 OK` chi tiết sản phẩm.

#### 4. Cập nhật sản phẩm (PUT - Admin)
* **URL**: `{{baseUrl}}/admin/products/{{productId}}`
* **Method**: `PUT`
* **Body** (raw - JSON): Sửa trường bất kỳ, ví dụ đổi `price` thành `40.000.000 VND`.
* **Kỳ vọng**: Trả về `200 OK` kèm dữ liệu mới cập nhật.

#### 5. Xóa sản phẩm (DELETE - Admin)
* **URL**: `{{baseUrl}}/admin/products/{{productId}}`
* **Method**: `DELETE`
* **Kỳ vọng**: Trả về `200 OK` dạng `{"deleted": true}`.

---

### 2.4. Module Banners (Banner quảng cáo)

#### 1. Tạo banner mới (POST)
* **URL**: `{{baseUrl}}/admin/banners`
* **Method**: `POST`
* **Body** (raw - JSON):
  ```json
  {
    "title": "Summer Sale",
    "subtitle": "Up to 20% Off",
    "image": "/banner-summer.jpg",
    "type": "image",
    "link": "/shop",
    "active": true
  }
  ```
* **Kỳ vọng**: Trả về `201 Created`. Vì `active: true`, tất cả các banner khác trong DB tự động cập nhật về `active: false`.
* *Tests script*:
  ```javascript
  pm.environment.set("bannerId", pm.response.json().id);
  ```

#### 2. Kích hoạt banner duy nhất (PATCH)
* **URL**: `{{baseUrl}}/admin/banners/{{bannerId}}/activate`
* **Method**: `PATCH`
* **Kỳ vọng**: Trả về `200 OK` kèm banner đã được kích hoạt làm banner chính duy nhất.

---

### 2.5. Module Contacts (Yêu cầu liên hệ)

#### 1. Gửi form liên hệ (POST - Public)
* **URL**: `{{baseUrl}}/contacts`
* **Method**: `POST`
* **Body** (raw - JSON):
  ```json
  {
    "name": "Nguyễn Khánh",
    "email": "khanh@gmail.com",
    "phone": "0909090909",
    "message": "Tôi cần tư vấn gấp nhẫn cưới!"
  }
  ```
* **Kỳ vọng**: Trả về `201 Created` kèm thông tin liên hệ được tạo.
* *Tests script*:
  ```javascript
  pm.environment.set("contactId", pm.response.json().id);
  ```

#### 2. Thay đổi trạng thái liên hệ (PATCH - Admin)
* **URL**: `{{baseUrl}}/admin/contacts/{{contactId}}/status`
* **Method**: `PATCH`
* **Body** (raw - JSON):
  ```json
  {
    "status": "Đang xử lý"
  }
  ```
* **Kỳ vọng**: Trả về `200 OK` với trạng thái mới.

---

### 2.6. Module Custom Requests (Yêu cầu thiết kế riêng)
* **POST** `{{baseUrl}}/custom-requests` - Gửi yêu cầu thiết kế mới (Public).
* **GET** `{{baseUrl}}/admin/custom-requests` - Lấy toàn bộ danh sách yêu cầu (Admin).
* **PATCH** `{{baseUrl}}/admin/custom-requests/{{customRequestId}}/status` - Đổi trạng thái (`Mới`, `Đang xử lý`, `Hoàn thành`).

---

### 2.7. Module Design Samples (Mẫu thiết kế)
* **GET** `{{baseUrl}}/design-samples` - Lấy danh sách mẫu công khai (Public).
* **POST** `{{baseUrl}}/admin/design-samples` - Tạo mẫu thiết kế mới (Admin).
* **PUT** `{{baseUrl}}/admin/design-samples/{{sampleId}}` - Cập nhật mẫu (Admin).
* **DELETE** `{{baseUrl}}/admin/design-samples/{{sampleId}}` - Xóa mẫu (Admin).

---

### 2.8. Module Pages (Trang tĩnh CMS)
#### 1. Lấy thông tin trang tĩnh (GET - Public)
* **URL**: `{{baseUrl}}/pages/about` (Các khóa hợp lệ: `about`, `size-guide`, `warranty`)
* **Method**: `GET`
* **Kỳ vọng**: Trả về `200 OK`. Nếu trang chưa có trong DB, hệ thống tự động sinh bản ghi rỗng (upsert) thay vì ném lỗi 404.

#### 2. Cập nhật bài viết trang tĩnh (PUT - Admin)
* **URL**: `{{baseUrl}}/admin/pages/about`
* **Method**: `PUT`
* **Body** (raw - JSON):
  ```json
  {
    "title": "Về WebDiamond",
    "content": "<p>Nội dung giới thiệu chi tiết về thương hiệu trang sức của chúng tôi.</p>",
    "images": ["/about-banner.jpg"]
  }
  ```
* **Kỳ vọng**: Trả về `200 OK` chứa nội dung trang tĩnh đã được lưu.

---

### 2.9. Module Settings (Cấu hình hệ thống)
#### 1. Xem cấu hình (GET - Public)
* **URL**: `{{baseUrl}}/settings`
* **Method**: `GET`
* **Kỳ vọng**: Trả về cấu hình hệ thống duy nhất (Singleton).

#### 2. Cập nhật cấu hình (PUT - Admin)
* **URL**: `{{baseUrl}}/admin/settings`
* **Method**: `PUT`
* **Body** (raw - JSON):
  ```json
  {
    "gtmId": "GTM-WD12345",
    "trackingEnabled": true,
    "contactAddress": "123 Đường Kim Cương, Quận 1, TP.HCM",
    "contactHotline": "1900-1234",
    "contactEmail": "contact@webdiamond.com",
    "googleMapUrl": "https://maps.google.com/..."
  }
  ```
* **Kỳ vọng**: Trả về cấu hình mới nhất.

---

### 2.10. Module Uploads (Tải lên file)
* **URL**: `{{baseUrl}}/admin/uploads`
* **Method**: `POST`
* **Headers**: Không đặt `Content-Type: application/json` vì Postman sẽ tự động tính toán tiêu đề Multipart.
* **Body** (form-data):
  - Chọn **Key**: `files`
  - Đổi kiểu dữ liệu từ **Text** thành **File** ở góc bên phải của dòng Key.
  - Chọn một hoặc nhiều file ảnh/video từ máy tính của bạn.
* **Kỳ vọng**: Trả về `201 Created` kèm mảng các liên kết tĩnh truy cập file. Ví dụ:
  ```json
  {
    "urls": ["http://localhost:4000/uploads/1782231622831-765410420.png"]
  }
  ```

---

### 2.11. Module Dashboard (Thống kê)
#### 1. Xem thống kê tổng hợp (GET - Admin)
* **URL**: `{{baseUrl}}/admin/dashboard/stats`
* **Method**: `GET`
* **Kỳ vọng**: Trả về `200 OK` tổng hợp số lượng sản phẩm, banner, liên hệ mới và tỷ lệ hoàn thành công việc.

#### 2. Dữ liệu biểu đồ liên hệ (GET - Admin)
* **URL**: `{{baseUrl}}/admin/dashboard/contacts-chart?range=day` (Chấp nhận: `day`, `month`, `year`)
* **Method**: `GET`
* **Kỳ vọng**: Trả về mảng dữ liệu phân nhóm theo khoảng thời gian tăng dần dạng `[{ "label": "2026-06-23", "count": 1 }]`.

---

## 3. Postman Collection JSON (Import nhanh)

Bạn có thể tạo một file có tên `WebDiamond.postman_collection.json` trên máy tính của bạn, sao chép toàn bộ nội dung JSON bên dưới dán vào, sau đó mở Postman và nhấn **Import** file này để có sẵn bộ các request kiểm thử:

```json
{
	"info": {
		"_postman_id": "f8339f40-3ab6-47b1-ba2c-39ff1a2b3c4d",
		"name": "WebDiamond API Test Suite",
		"description": "Bộ API test tự động dành cho dự án WebDiamond",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "Auth - Đăng nhập",
			"event": [
				{
					"listen": "test",
					"script": {
						"exec": [
							"const response = pm.response.json();",
							"if (response.accessToken) {",
							"    pm.environment.set(\"token\", response.accessToken);",
							"    console.log(\"✓ Đã lưu token!\");",
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
			"name": "Auth - Thông tin cá nhân",
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
		},
		{
			"name": "Category - Tạo danh mục mới",
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
					"raw": "{\n    \"name\": \"Nhẫn Cưới E2E\",\n    \"slug\": \"wedding-ring-e2e\",\n    \"order\": 1,\n    \"hidden\": false\n}",
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
			"name": "Categories - Lấy danh sách công khai",
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
			"name": "Product - Thêm sản phẩm mới",
			"event": [
				{
					"listen": "test",
					"script": {
						"exec": [
							"const res = pm.response.json();",
							"if (res.id) {",
							"    pm.environment.set(\"productId\", res.id);",
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
					"raw": "{\n    \"slug\": \"postman-ring\",\n    \"name\": \"Postman Pearl Ring\",\n    \"category\": \"ring\",\n    \"price\": \"20.000.000 VND\",\n    \"priceValue\": 20000000,\n    \"image\": \"/ring.png\",\n    \"images\": [\"/ring.png\"],\n    \"description\": [\"Mẫu nhẫn sang trọng đính ngọc trai thiên nhiên.\"],\n    \"spec\": \"Vàng 18K\",\n    \"colors\": [{\"id\":\"white\", \"name\":\"White\", \"hex\":\"#FFFFFF\"}],\n    \"sizes\": [\"15\", \"16\"],\n    \"featured\": true,\n    \"hidden\": false\n}",
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
			"name": "Products - Danh sách sản phẩm",
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
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "Contact - Gửi liên hệ mới",
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
					"raw": "{\n    \"name\": \"Khách hàng Postman\",\n    \"email\": \"postman.client@example.com\",\n    \"phone\": \"0888999888\",\n    \"message\": \"Yêu cầu tư vấn thiết kế qua Postman.\"\n}",
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
			"name": "Settings - Xem cấu hình hệ thống",
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
			"name": "Dashboard - Xem thống kê",
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
			"name": "Dashboard - Gom biểu đồ",
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
```
