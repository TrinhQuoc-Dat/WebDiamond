# Kế hoạch xây dựng Backend WebDiamond

> **Dành cho người thực thi (kể cả AI agent):** Dùng kèm skill `superpowers:subagent-driven-development` hoặc `superpowers:executing-plans` để chạy từng task. Các bước dùng checkbox (`- [ ]`) để theo dõi tiến độ.

**Mục tiêu:** Xây toàn bộ backend (REST API + CMS API) cho WebDiamond trong một folder `backend/` riêng, dùng chung 1 server / 1 port, thay thế lớp dữ liệu `localStorage` hiện tại của frontend.

**Kiến trúc:** Modular monolith (kiểu "microservices nội bộ"). Mỗi model = 1 **feature module** NestJS độc lập, gom chung vào `AppModule` và chạy trên cùng 1 cổng. Trong mỗi module chia tầng rõ ràng: `schema` (model) → `dto` → `service` (business) → `controller` → `module` (router/đăng ký route).

**Tech Stack:**
- **Runtime/Framework:** Node.js + NestJS 10 + TypeScript
- **Database:** MongoDB + Mongoose (`@nestjs/mongoose`)
- **Auth:** JWT (`@nestjs/jwt`, `@nestjs/passport`, `passport-jwt`) + bcrypt
- **Upload ảnh/video:** Multer (lưu disk local `backend/uploads`, phục vụ tĩnh qua `/uploads/...`)
- **Validation:** `class-validator` + `class-transformer`
- **Config:** `@nestjs/config` (.env)
- **Test:** Jest + `mongodb-memory-server` (test service với DB thật trong RAM) + Supertest (e2e)

---

## 0. Tổng quan ánh xạ Frontend → Backend

| Frontend (hiện tại) | Backend Module | Ghi chú |
|---|---|---|
| `data/products.ts` + `ProductForm` + admin/products | `products` | Sản phẩm + lọc/tìm/phân trang/ẩn-hiện/nổi bật |
| Danh mục (NECKLACE, BRACELETS, Nhẫn, Bông tai...) | `categories` | Thêm/sửa/xóa/sắp xếp |
| `admin/banners` + `Banner` interface | `banners` | Hero homepage, image/video, active/ẩn-hiện/sắp xếp |
| Contact form + `admin/contacts` | `contacts` | Form public + quản lý trạng thái |
| `custom/CustomForm` (Thiết kế riêng) | `custom-requests` | Form public + quản lý trạng thái |
| `custom/CustomShowcase` (mẫu thiết kế) | `design-samples` | Gallery mẫu thiết kế do admin quản lý |
| Trang Giới thiệu / Hướng dẫn đo nhẫn / Bảo hành | `pages` | Nội dung CMS sửa được (key-based) |
| GTM ID + thông tin liên hệ (địa chỉ/hotline/email/map) | `settings` | Singleton cấu hình site |
| Login hardcoded `admin@webdiamond.com/admin123` | `auth` + `users` | JWT thật, mật khẩu hash |
| `admin/dashboard` thống kê + biểu đồ | `dashboard` | Aggregation số liệu + biểu đồ liên hệ theo ngày/tháng/năm |
| Upload ảnh base64/URL | `uploads` | Multer disk, trả URL thật |

---

## 1. Cây thư mục backend

```
backend/
├── .env                          # Biến môi trường (không commit)
├── .env.example                  # Mẫu biến môi trường (commit)
├── .gitignore
├── nest-cli.json
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── jest.config.ts
├── uploads/                      # Nơi Multer lưu file (gitignore, giữ .gitkeep)
│   └── .gitkeep
└── src/
    ├── main.ts                   # Bootstrap: CORS, ValidationPipe, static /uploads, listen PORT
    ├── app.module.ts             # ROUTER GỐC: import config, Mongoose, tất cả feature module
    │
    ├── config/
    │   └── configuration.ts      # Đọc & gom biến môi trường
    │
    ├── common/                   # Dùng chung cho mọi module
    │   ├── guards/
    │   │   └── jwt-auth.guard.ts
    │   ├── decorators/
    │   │   └── public.decorator.ts      # Đánh dấu route public (bỏ qua JWT)
    │   ├── filters/
    │   │   └── http-exception.filter.ts # Chuẩn hóa format lỗi
    │   └── dto/
    │       └── pagination-query.dto.ts  # page/limit dùng lại
    │
    ├── database/
    │   └── seed.ts               # Seed admin mặc định + dữ liệu mẫu (chạy 1 lần)
    │
    └── modules/
        ├── auth/
        │   ├── schemas/user.schema.ts        # MODEL: tài khoản admin
        │   ├── dto/login.dto.ts
        │   ├── strategies/jwt.strategy.ts
        │   ├── auth.service.ts               # BUSINESS
        │   ├── auth.controller.ts            # CONTROLLER
        │   └── auth.module.ts                # ROUTER
        │
        ├── products/
        │   ├── schemas/product.schema.ts     # MODEL
        │   ├── dto/create-product.dto.ts
        │   ├── dto/update-product.dto.ts
        │   ├── dto/query-product.dto.ts
        │   ├── products.service.ts           # BUSINESS
        │   ├── products.controller.ts        # CONTROLLER
        │   └── products.module.ts            # ROUTER
        │
        ├── categories/
        │   ├── schemas/category.schema.ts
        │   ├── dto/create-category.dto.ts
        │   ├── dto/update-category.dto.ts
        │   ├── dto/reorder.dto.ts
        │   ├── categories.service.ts
        │   ├── categories.controller.ts
        │   └── categories.module.ts
        │
        ├── banners/
        │   ├── schemas/banner.schema.ts
        │   ├── dto/create-banner.dto.ts
        │   ├── dto/update-banner.dto.ts
        │   ├── banners.service.ts
        │   ├── banners.controller.ts
        │   └── banners.module.ts
        │
        ├── contacts/
        │   ├── schemas/contact.schema.ts
        │   ├── dto/create-contact.dto.ts
        │   ├── dto/update-status.dto.ts
        │   ├── dto/query-contact.dto.ts
        │   ├── contacts.service.ts
        │   ├── contacts.controller.ts
        │   └── contacts.module.ts
        │
        ├── custom-requests/
        │   ├── schemas/custom-request.schema.ts
        │   ├── dto/create-custom-request.dto.ts
        │   ├── dto/update-status.dto.ts
        │   ├── custom-requests.service.ts
        │   ├── custom-requests.controller.ts
        │   └── custom-requests.module.ts
        │
        ├── design-samples/
        │   ├── schemas/design-sample.schema.ts
        │   ├── dto/create-design-sample.dto.ts
        │   ├── dto/update-design-sample.dto.ts
        │   ├── design-samples.service.ts
        │   ├── design-samples.controller.ts
        │   └── design-samples.module.ts
        │
        ├── pages/
        │   ├── schemas/page.schema.ts
        │   ├── dto/update-page.dto.ts
        │   ├── pages.service.ts
        │   ├── pages.controller.ts
        │   └── pages.module.ts
        │
        ├── settings/
        │   ├── schemas/setting.schema.ts
        │   ├── dto/update-setting.dto.ts
        │   ├── settings.service.ts
        │   ├── settings.controller.ts
        │   └── settings.module.ts
        │
        ├── uploads/
        │   ├── uploads.controller.ts
        │   └── uploads.module.ts
        │
        └── dashboard/
            ├── dashboard.service.ts
            ├── dashboard.controller.ts
            └── dashboard.module.ts
```

---

## 2. Đặc tả Models (Mongoose Schemas) — đầy đủ trường

> Tất cả schema bật `{ timestamps: true }` (tự có `createdAt`, `updatedAt`) và `toJSON` chuyển `_id` → `id`, bỏ `__v`.

### 2.1. User (auth) — `modules/auth/schemas/user.schema.ts`
| Trường | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| email | string | required, unique, lowercase | Đăng nhập |
| passwordHash | string | required, `select: false` | bcrypt hash, không trả ra API |
| name | string | optional | Tên hiển thị |
| role | string | enum `['admin']`, default `'admin'` | Mở rộng sau |

### 2.2. Product — `modules/products/schemas/product.schema.ts`
| Trường | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| slug | string | required, unique, index | Định danh URL |
| name | string | required | Tên sản phẩm |
| category | string | required, index | Slug danh mục (ví dụ `necklace`) |
| price | string | required | Giữ dạng chuỗi `"50.000.000 VND"` khớp frontend |
| priceValue | number | default 0 | Số thuần để sort/lọc (parse từ price) |
| image | string | required | Ảnh chính (URL hoặc `/uploads/...`) |
| images | string[] | default `[]` | Ảnh phụ |
| tag | string \| null | default null | `Bestseller`/`New`/`Limited` |
| description | string[] | default `[]` | Các dòng mô tả |
| spec | string | default `''` | Ghi chú đặt hàng |
| colors | `{ id, name, hex }[]` | default `[]` | Subdocument màu |
| sizes | string[] | default `[]` | Kích thước |
| style | string | default `''` | Phong cách (trang chi tiết) |
| collection | string | default `''` | Bộ sưu tập (nếu có) |
| featured | boolean | default false, index | "Sản phẩm nổi bật" (trang chủ) |
| hidden | boolean | default false, index | Ẩn/hiện trên shop |
| order | number | default 0 | Sắp xếp thủ công |

### 2.3. Category — `modules/categories/schemas/category.schema.ts`
| Trường | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| name | string | required | "Nhẫn", "Vòng tay"... |
| slug | string | required, unique, index | "ring", "bracelet"... |
| order | number | default 0 | Sắp xếp |
| hidden | boolean | default false | Ẩn/hiện |

### 2.4. Banner — `modules/banners/schemas/banner.schema.ts`
| Trường | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| title | string | default `'WebDiamond'` | Tiêu đề chính |
| subtitle | string | required | Chữ nút bấm |
| image | string | required | URL ảnh / link video (mp4/youtube/drive) |
| type | string | enum `['image','video']`, default `'image'` | Loại banner |
| link | string | default `'/shop'` | Link nút bấm |
| active | boolean | default false, index | Hero đang dùng (chỉ 1 active) |
| muted | boolean | default true | Cho video |
| hidden | boolean | default false | Ẩn/hiện |
| order | number | default 0 | Sắp xếp |

### 2.5. Contact — `modules/contacts/schemas/contact.schema.ts`
| Trường | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| name | string | required | Họ tên |
| email | string | required | Email |
| phone | string | required | SĐT |
| message | string | required | Nội dung |
| status | string | enum `['Mới','Đang xử lý','Đã xử lý']`, default `'Mới'` | Trạng thái |

### 2.6. CustomRequest — `modules/custom-requests/schemas/custom-request.schema.ts`
| Trường | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| name | string | required | Họ tên |
| email | string | required | Email |
| phone | string | default `''` | SĐT |
| idea | string | required | Mô tả ý tưởng |
| budget | string | default `''` | Ngân sách ước tính |
| status | string | enum `['Mới','Đang xử lý','Hoàn thành']`, default `'Mới'` | Trạng thái |

### 2.7. DesignSample — `modules/design-samples/schemas/design-sample.schema.ts`
| Trường | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| title | string | required | Tên mẫu |
| image | string | required | Ảnh mẫu |
| description | string | default `''` | Mô tả ngắn |
| order | number | default 0 | Sắp xếp |
| hidden | boolean | default false | Ẩn/hiện |

### 2.8. Page — `modules/pages/schemas/page.schema.ts`
| Trường | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| key | string | required, unique, enum `['about','size-guide','warranty']` | Khóa trang |
| title | string | default `''` | Tiêu đề |
| content | string | default `''` | HTML/Markdown nội dung |
| images | string[] | default `[]` | Chứng chỉ / hình chứng nhận (trang bảo hành) |

### 2.9. Setting — `modules/settings/schemas/setting.schema.ts` (singleton, 1 document)
| Trường | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| gtmId | string | default `''` | Google Tag Manager ID |
| trackingEnabled | boolean | default false | Bật/tắt tracking |
| contactAddress | string | default `''` | Địa chỉ (trang Liên hệ) |
| contactHotline | string | default `''` | Hotline |
| contactEmail | string | default `''` | Email |
| googleMapUrl | string | default `''` | Link/embed Google Map |

---

## 3. Đặc tả API Endpoints

**Base URL:** `/api`. **Static:** `/uploads/<filename>`.
**Public** = frontend gọi không cần token. **🔒 Admin** = cần header `Authorization: Bearer <JWT>`.

### Auth
| Method | Path | Quyền | Mô tả |
|---|---|---|---|
| POST | `/api/auth/login` | Public | Body `{email,password}` → `{accessToken, user}` |
| GET | `/api/auth/me` | 🔒 | Thông tin admin hiện tại |

### Products
| Method | Path | Quyền | Mô tả |
|---|---|---|---|
| GET | `/api/products` | Public | Query: `category, search, featured, page, limit, sort`. Chỉ trả `hidden:false`. Phân trang. |
| GET | `/api/products/:slug` | Public | Chi tiết 1 sản phẩm (404 nếu hidden) |
| GET | `/api/products/:slug/related` | Public | Sản phẩm liên quan (cùng category, khác slug, limit 4) |
| GET | `/api/admin/products` | 🔒 | Tất cả (kể cả hidden) + filter `search,category,visibility` + phân trang |
| POST | `/api/admin/products` | 🔒 | Tạo mới (slug unique) |
| PUT | `/api/admin/products/:id` | 🔒 | Cập nhật |
| DELETE | `/api/admin/products/:id` | 🔒 | Xóa |
| PATCH | `/api/admin/products/:id/visibility` | 🔒 | Toggle ẩn/hiện |
| PATCH | `/api/admin/products/:id/featured` | 🔒 | Toggle nổi bật |

### Categories
| Method | Path | Quyền | Mô tả |
|---|---|---|---|
| GET | `/api/categories` | Public | Chỉ `hidden:false`, sắp theo `order` |
| GET | `/api/admin/categories` | 🔒 | Tất cả |
| POST | `/api/admin/categories` | 🔒 | Tạo (slug unique) |
| PUT | `/api/admin/categories/:id` | 🔒 | Cập nhật |
| DELETE | `/api/admin/categories/:id` | 🔒 | Xóa |
| PATCH | `/api/admin/categories/reorder` | 🔒 | Body `{ items: [{id, order}] }` |

### Banners
| Method | Path | Quyền | Mô tả |
|---|---|---|---|
| GET | `/api/banners` | Public | `hidden:false`, sắp theo `order` |
| GET | `/api/banners/active` | Public | Banner đang `active:true` |
| GET | `/api/admin/banners` | 🔒 | Tất cả |
| POST | `/api/admin/banners` | 🔒 | Tạo |
| PUT | `/api/admin/banners/:id` | 🔒 | Cập nhật |
| DELETE | `/api/admin/banners/:id` | 🔒 | Xóa (tự active banner đầu nếu xóa cái đang active) |
| PATCH | `/api/admin/banners/:id/activate` | 🔒 | Đặt active, tự tắt active các banner khác |

### Contacts
| Method | Path | Quyền | Mô tả |
|---|---|---|---|
| POST | `/api/contacts` | Public | Khách gửi form liên hệ |
| GET | `/api/admin/contacts` | 🔒 | Filter `status,search` + phân trang |
| GET | `/api/admin/contacts/:id` | 🔒 | Chi tiết |
| PATCH | `/api/admin/contacts/:id/status` | 🔒 | Đổi trạng thái |
| DELETE | `/api/admin/contacts/:id` | 🔒 | Xóa |

### Custom Requests (Thiết kế riêng)
| Method | Path | Quyền | Mô tả |
|---|---|---|---|
| POST | `/api/custom-requests` | Public | Khách gửi yêu cầu thiết kế |
| GET | `/api/admin/custom-requests` | 🔒 | Filter `status` + phân trang |
| GET | `/api/admin/custom-requests/:id` | 🔒 | Chi tiết |
| PATCH | `/api/admin/custom-requests/:id/status` | 🔒 | Đổi trạng thái |
| DELETE | `/api/admin/custom-requests/:id` | 🔒 | Xóa |

### Design Samples
| Method | Path | Quyền | Mô tả |
|---|---|---|---|
| GET | `/api/design-samples` | Public | `hidden:false`, sắp theo `order` |
| GET | `/api/admin/design-samples` | 🔒 | Tất cả |
| POST/PUT/DELETE | `/api/admin/design-samples[/:id]` | 🔒 | CRUD |

### Pages
| Method | Path | Quyền | Mô tả |
|---|---|---|---|
| GET | `/api/pages/:key` | Public | Lấy nội dung trang (`about`/`size-guide`/`warranty`) |
| PUT | `/api/admin/pages/:key` | 🔒 | Cập nhật (upsert) |

### Settings
| Method | Path | Quyền | Mô tả |
|---|---|---|---|
| GET | `/api/settings` | Public | Cấu hình site (GTM, liên hệ, map) |
| PUT | `/api/admin/settings` | 🔒 | Cập nhật (upsert singleton) |

### Uploads
| Method | Path | Quyền | Mô tả |
|---|---|---|---|
| POST | `/api/admin/uploads` | 🔒 | `multipart/form-data` field `files` (tối đa 10) → `{ urls: string[] }` |

### Dashboard
| Method | Path | Quyền | Mô tả |
|---|---|---|---|
| GET | `/api/admin/dashboard/stats` | 🔒 | `{ totalProducts, totalBanners, totalContacts, pendingContacts, resolutionRate }` |
| GET | `/api/admin/dashboard/contacts-chart?range=day\|month\|year` | 🔒 | Mảng `{ label, count }` cho biểu đồ |

---

## 4. Quy ước & Pattern dùng lại

**CRUD Service pattern (lặp lại cho mọi module):** inject model qua `@InjectModel`, các method `findAll/findOne/create/update/remove` trả document; controller chỉ điều phối, validate qua DTO. Mọi DTO dùng `class-validator`. Mọi route admin gắn `@UseGuards(JwtAuthGuard)`; route public gắn decorator `@Public()`.

**Response chuẩn:** trả thẳng object/array (Nest tự serialize). Lỗi → `HttpExceptionFilter` format `{ statusCode, message, error, path, timestamp }`.

**Phân trang chuẩn:** `{ data: T[], total, page, limit, totalPages }`.

---

# PHẦN II — CÁC TASK THỰC THI (TDD, bite-sized)

> Quy ước commit: dùng prefix `feat/test/chore`. Chạy lệnh trong thư mục `backend/`.

---

## Task 1: Khởi tạo dự án NestJS

**Files:** tạo toàn bộ scaffold trong `backend/`.

- [x] **Bước 1.1: Tạo project Nest**

```bash
cd g:/DTTeck/WebDiamond
npx -y @nestjs/cli new backend --package-manager npm --skip-git
```
Khi hỏi package manager chọn `npm`. Kết quả: có `backend/src/main.ts`, `app.module.ts`, `app.controller.ts`, `app.service.ts`.

- [x] **Bước 1.2: Xóa file mẫu thừa**

```bash
cd g:/DTTeck/WebDiamond/backend
rm src/app.controller.ts src/app.controller.spec.ts src/app.service.ts
```

- [x] **Bước 1.3: Cài dependencies**

```bash
npm install @nestjs/config @nestjs/mongoose mongoose @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt class-validator class-transformer
npm install -D @types/passport-jwt @types/bcrypt @types/multer mongodb-memory-server
```

- [x] **Bước 1.4: Tạo `backend/.env.example`**

```
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/webdiamond
JWT_SECRET=change-me-to-a-long-random-string
JWT_EXPIRES=7d
ADMIN_EMAIL=admin@webdiamond.com
ADMIN_PASSWORD=admin123
CORS_ORIGIN=http://localhost:3000
UPLOAD_DIR=uploads
PUBLIC_URL=http://localhost:4000
```

- [x] **Bước 1.5: Tạo `backend/.env`** (copy từ `.env.example`, đổi `JWT_SECRET`).

- [x] **Bước 1.6: Cập nhật `backend/.gitignore`** thêm dòng:

```
.env
/uploads/*
!/uploads/.gitkeep
```

- [x] **Bước 1.7: Tạo `backend/uploads/.gitkeep`** (file rỗng).

- [x] **Bước 1.8: Commit**

```bash
git add backend
git commit -m "chore(backend): khởi tạo NestJS + cấu hình env"
```

---

## Task 2: Config + Bootstrap (main.ts, app.module.ts)

**Files:** Create `src/config/configuration.ts`, Modify `src/main.ts`, `src/app.module.ts`.

- [x] **Bước 2.1: Tạo `src/config/configuration.ts`**

```typescript
export default () => ({
  port: parseInt(process.env.PORT ?? '4000', 10),
  mongoUri: process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/webdiamond',
  jwtSecret: process.env.JWT_SECRET ?? 'dev-secret',
  jwtExpires: process.env.JWT_EXPIRES ?? '7d',
  adminEmail: process.env.ADMIN_EMAIL ?? 'admin@webdiamond.com',
  adminPassword: process.env.ADMIN_PASSWORD ?? 'admin123',
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
  uploadDir: process.env.UPLOAD_DIR ?? 'uploads',
  publicUrl: process.env.PUBLIC_URL ?? 'http://localhost:4000',
});
```

- [x] **Bước 2.2: Ghi `src/app.module.ts`** (router gốc — sẽ thêm dần các feature module ở các task sau)

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('mongoUri'),
      }),
    }),
    // ⬇️ Các feature module sẽ được thêm vào đây ở Task 4..13
  ],
})
export class AppModule {}
```

- [x] **Bước 2.3: Ghi `src/main.ts`** (CORS, ValidationPipe, static /uploads, prefix /api)

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000', credentials: true });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: false }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useStaticAssets(join(process.cwd(), process.env.UPLOAD_DIR ?? 'uploads'), {
    prefix: '/uploads/',
  });
  await app.listen(process.env.PORT ?? 4000);
  console.log(`Backend chạy tại http://localhost:${process.env.PORT ?? 4000}/api`);
}
bootstrap();
```

- [x] **Bước 2.4: Tạo `src/common/filters/http-exception.filter.ts`**

```typescript
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const payload =
      exception instanceof HttpException ? exception.getResponse() : 'Internal server error';
    res.status(status).json({
      statusCode: status,
      message: typeof payload === 'string' ? payload : (payload as any).message,
      error: typeof payload === 'object' ? (payload as any).error : undefined,
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}
```

- [x] **Bước 2.5: Chạy thử server**

Run: `npm run start:dev`
Expected: Log "Backend chạy tại http://localhost:4000/api", không lỗi (cần MongoDB đang chạy local hoặc Atlas URI hợp lệ).

- [x] **Bước 2.6: Commit**

```bash
git add backend/src
git commit -m "feat(backend): bootstrap app, config, CORS, static uploads, exception filter"
```

---

## Task 3: Module Auth (JWT) + Seed admin

**Files:** Create `src/modules/auth/*`, `src/common/guards/jwt-auth.guard.ts`, `src/common/decorators/public.decorator.ts`, `src/database/seed.ts`.

- [x] **Bước 3.1: Tạo `src/modules/auth/schemas/user.schema.ts`**

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, select: false })
  passwordHash: string;

  @Prop({ default: '' })
  name: string;

  @Prop({ default: 'admin', enum: ['admin'] })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
```

- [x] **Bước 3.2: Tạo `src/modules/auth/dto/login.dto.ts`**

```typescript
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  password: string;
}
```

- [x] **Bước 3.3: Tạo `src/common/decorators/public.decorator.ts`**

```typescript
import { SetMetadata } from '@nestjs/common';
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
```

- [x] **Bước 3.4: Tạo `src/modules/auth/strategies/jwt.strategy.ts`**

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('jwtSecret'),
    });
  }
  async validate(payload: { sub: string; email: string; role: string }) {
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
```

- [x] **Bước 3.5: Tạo `src/common/guards/jwt-auth.guard.ts`** (tôn trọng `@Public()`)

```typescript
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    return super.canActivate(context);
  }
}
```

- [x] **Bước 3.6: Tạo `src/modules/auth/auth.service.ts`**

```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwt: JwtService,
  ) {}

  async validate(email: string, password: string) {
    const user = await this.userModel.findOne({ email: email.toLowerCase() }).select('+passwordHash');
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.passwordHash);
    return ok ? user : null;
  }

  async login(dto: LoginDto) {
    const user = await this.validate(dto.email, dto.password);
    if (!user) throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    const token = await this.jwt.signAsync({ sub: user.id, email: user.email, role: user.role });
    return { accessToken: token, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
  }
}
```

- [x] **Bước 3.7: Tạo `src/modules/auth/auth.controller.ts`**

```typescript
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: any) {
    return req.user;
  }
}
```

- [x] **Bước 3.8: Tạo `src/modules/auth/auth.module.ts`**

```typescript
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwtSecret'),
        signOptions: { expiresIn: config.get<string>('jwtExpires') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [MongooseModule],
})
export class AuthModule {}
```

- [x] **Bước 3.9: Tạo test `src/modules/auth/auth.service.spec.ts`** (viết test TRƯỚC khi tin tưởng logic)

```typescript
import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { User, UserSchema } from './schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('AuthService', () => {
  let service: AuthService;
  let mongod: MongoMemoryServer;
  let userModel: Model<any>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongod.getUri()),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({ secret: 'test', signOptions: { expiresIn: '1h' } }),
      ],
      providers: [AuthService],
    }).compile();
    service = moduleRef.get(AuthService);
    userModel = moduleRef.get(getModelToken(User.name));
    await userModel.create({ email: 'admin@webdiamond.com', passwordHash: await bcrypt.hash('admin123', 10) });
  });

  afterAll(async () => {
    await mongod.stop();
  });

  it('login đúng trả accessToken', async () => {
    const res = await service.login({ email: 'admin@webdiamond.com', password: 'admin123' });
    expect(res.accessToken).toBeDefined();
    expect(res.user.email).toBe('admin@webdiamond.com');
  });

  it('login sai mật khẩu báo lỗi', async () => {
    await expect(service.login({ email: 'admin@webdiamond.com', password: 'wrong' })).rejects.toThrow();
  });
});
```

- [x] **Bước 3.10: Chạy test**

Run: `npm test -- auth.service`
Expected: 2 test PASS.

- [x] **Bước 3.11: Tạo `src/database/seed.ts`** (tạo admin mặc định nếu chưa có)

```typescript
import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '../app.module';
import { User } from '../modules/auth/schemas/user.schema';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const config = app.get(ConfigService);
  const userModel = app.get<Model<any>>(getModelToken(User.name));
  const email = config.get<string>('adminEmail')!;
  const exists = await userModel.findOne({ email });
  if (!exists) {
    await userModel.create({
      email,
      passwordHash: await bcrypt.hash(config.get<string>('adminPassword')!, 10),
      name: 'Administrator',
    });
    console.log(`✓ Đã tạo admin: ${email}`);
  } else {
    console.log('Admin đã tồn tại, bỏ qua.');
  }
  await app.close();
}
seed();
```

- [x] **Bước 3.12: Thêm script seed vào `backend/package.json`** mục `scripts`:

```json
"seed": "ts-node src/database/seed.ts"
```

- [x] **Bước 3.13: Đăng ký `AuthModule` vào `app.module.ts`** — thêm `import { AuthModule } from './modules/auth/auth.module';` và đưa `AuthModule` vào mảng `imports`.

- [x] **Bước 3.14: Seed + test thủ công**

```bash
npm run seed
npm run start:dev
# Ở terminal khác:
curl -X POST http://localhost:4000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@webdiamond.com\",\"password\":\"admin123\"}"
```
Expected: JSON có `accessToken`.

- [x] **Bước 3.15: Commit**

```bash
git add backend/src backend/package.json
git commit -m "feat(backend): module auth JWT + guard + seed admin"
```

---

## Task 4: Module Products (MODULE MẪU CHUẨN — làm kỹ, các module sau lặp theo)

**Files:** Create `src/modules/products/*`.

- [x] **Bước 4.1: Tạo `src/modules/products/schemas/product.schema.ts`**

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ _id: false })
export class ProductColor {
  @Prop({ required: true }) id: string;
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) hex: string;
}
const ProductColorSchema = SchemaFactory.createForClass(ProductColor);

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_doc, ret) => { ret.id = ret._id; delete ret._id; delete ret.__v; },
  },
})
export class Product {
  @Prop({ required: true, unique: true, index: true, trim: true }) slug: string;
  @Prop({ required: true }) name: string;
  @Prop({ required: true, index: true }) category: string;
  @Prop({ required: true }) price: string;
  @Prop({ default: 0 }) priceValue: number;
  @Prop({ required: true }) image: string;
  @Prop({ type: [String], default: [] }) images: string[];
  @Prop({ type: String, default: null }) tag: string | null;
  @Prop({ type: [String], default: [] }) description: string[];
  @Prop({ default: '' }) spec: string;
  @Prop({ type: [ProductColorSchema], default: [] }) colors: ProductColor[];
  @Prop({ type: [String], default: [] }) sizes: string[];
  @Prop({ default: '' }) style: string;
  @Prop({ default: '' }) collection: string;
  @Prop({ default: false, index: true }) featured: boolean;
  @Prop({ default: false, index: true }) hidden: boolean;
  @Prop({ default: 0 }) order: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
```

- [x] **Bước 4.2: Tạo `src/modules/products/dto/create-product.dto.ts`**

```typescript
import { Type } from 'class-transformer';
import {
  IsArray, IsBoolean, IsNumber, IsOptional, IsString, ValidateNested,
} from 'class-validator';

class ColorDto {
  @IsString() id: string;
  @IsString() name: string;
  @IsString() hex: string;
}

export class CreateProductDto {
  @IsString() slug: string;
  @IsString() name: string;
  @IsString() category: string;
  @IsString() price: string;
  @IsOptional() @IsNumber() priceValue?: number;
  @IsString() image: string;
  @IsOptional() @IsArray() @IsString({ each: true }) images?: string[];
  @IsOptional() @IsString() tag?: string | null;
  @IsOptional() @IsArray() @IsString({ each: true }) description?: string[];
  @IsOptional() @IsString() spec?: string;
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => ColorDto) colors?: ColorDto[];
  @IsOptional() @IsArray() @IsString({ each: true }) sizes?: string[];
  @IsOptional() @IsString() style?: string;
  @IsOptional() @IsString() collection?: string;
  @IsOptional() @IsBoolean() featured?: boolean;
  @IsOptional() @IsBoolean() hidden?: boolean;
  @IsOptional() @IsNumber() order?: number;
}
```

- [x] **Bước 4.3: Tạo `src/modules/products/dto/update-product.dto.ts`**

```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
export class UpdateProductDto extends PartialType(CreateProductDto) {}
```
> Lưu ý: cần `npm install @nestjs/mapped-types` (thường đã có sẵn theo Nest).

- [x] **Bước 4.4: Tạo `src/modules/products/dto/query-product.dto.ts`**

```typescript
import { Type } from 'class-transformer';
import { IsBooleanString, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class QueryProductDto {
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsBooleanString() featured?: string;
  @IsOptional() @IsString() visibility?: string; // 'visible' | 'hidden' | undefined (admin)
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page?: number = 1;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) limit?: number = 12;
  @IsOptional() @IsString() sort?: string; // ví dụ '-createdAt'
}
```

- [x] **Bước 4.5: Tạo `src/modules/products/products.service.ts`**

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private model: Model<ProductDocument>) {}

  private buildFilter(q: QueryProductDto, publicOnly: boolean) {
    const filter: any = {};
    if (publicOnly) filter.hidden = false;
    else if (q.visibility === 'visible') filter.hidden = false;
    else if (q.visibility === 'hidden') filter.hidden = true;
    if (q.category) filter.category = q.category;
    if (q.featured === 'true') filter.featured = true;
    if (q.search) {
      filter.$or = [
        { name: { $regex: q.search, $options: 'i' } },
        { slug: { $regex: q.search, $options: 'i' } },
      ];
    }
    return filter;
  }

  async findPaged(q: QueryProductDto, publicOnly: boolean) {
    const page = q.page ?? 1;
    const limit = q.limit ?? 12;
    const filter = this.buildFilter(q, publicOnly);
    const [data, total] = await Promise.all([
      this.model.find(filter).sort(q.sort ?? '-createdAt').skip((page - 1) * limit).limit(limit),
      this.model.countDocuments(filter),
    ]);
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findBySlug(slug: string, publicOnly = true) {
    const filter: any = { slug };
    if (publicOnly) filter.hidden = false;
    const product = await this.model.findOne(filter);
    if (!product) throw new NotFoundException('Không tìm thấy sản phẩm');
    return product;
  }

  async findRelated(slug: string) {
    const product = await this.findBySlug(slug);
    return this.model.find({ category: product.category, slug: { $ne: slug }, hidden: false }).limit(4);
  }

  create(dto: CreateProductDto) {
    return this.model.create(dto);
  }

  async update(id: string, dto: UpdateProductDto) {
    const updated = await this.model.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException('Không tìm thấy sản phẩm');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.model.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Không tìm thấy sản phẩm');
    return { deleted: true };
  }

  async toggleVisibility(id: string) {
    const p = await this.model.findById(id);
    if (!p) throw new NotFoundException('Không tìm thấy sản phẩm');
    p.hidden = !p.hidden;
    return p.save();
  }

  async toggleFeatured(id: string) {
    const p = await this.model.findById(id);
    if (!p) throw new NotFoundException('Không tìm thấy sản phẩm');
    p.featured = !p.featured;
    return p.save();
  }
}
```

- [x] **Bước 4.6: Tạo `src/modules/products/products.controller.ts`**

```typescript
import {
  Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

// ---- ROUTES PUBLIC ----
@Controller('products')
export class ProductsPublicController {
  constructor(private service: ProductsService) {}

  @Public() @Get()
  list(@Query() q: QueryProductDto) {
    return this.service.findPaged(q, true);
  }

  @Public() @Get(':slug')
  detail(@Param('slug') slug: string) {
    return this.service.findBySlug(slug, true);
  }

  @Public() @Get(':slug/related')
  related(@Param('slug') slug: string) {
    return this.service.findRelated(slug);
  }
}

// ---- ROUTES ADMIN ----
@UseGuards(JwtAuthGuard)
@Controller('admin/products')
export class ProductsAdminController {
  constructor(private service: ProductsService) {}

  @Get()
  list(@Query() q: QueryProductDto) {
    return this.service.findPaged(q, false);
  }

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Patch(':id/visibility')
  visibility(@Param('id') id: string) {
    return this.service.toggleVisibility(id);
  }

  @Patch(':id/featured')
  featured(@Param('id') id: string) {
    return this.service.toggleFeatured(id);
  }
}
```

- [x] **Bước 4.7: Tạo `src/modules/products/products.module.ts`**

```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductsService } from './products.service';
import { ProductsPublicController, ProductsAdminController } from './products.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
  controllers: [ProductsPublicController, ProductsAdminController],
  providers: [ProductsService],
})
export class ProductsModule {}
```

- [x] **Bước 4.8: Viết test `src/modules/products/products.service.spec.ts`** (TDD)

```typescript
import { Test } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schemas/product.schema';

describe('ProductsService', () => {
  let service: ProductsService;
  let mongod: MongoMemoryServer;
  let model: Model<any>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const ref = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongod.getUri()),
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
      ],
      providers: [ProductsService],
    }).compile();
    service = ref.get(ProductsService);
    model = ref.get(getModelToken(Product.name));
  });

  afterAll(async () => { await mongod.stop(); });
  beforeEach(async () => { await model.deleteMany({}); });

  const base = { name: 'Ring A', category: 'ring', price: '1.000 VND', image: '/x.png' };

  it('tạo và lấy theo slug', async () => {
    await service.create({ ...base, slug: 'ring-a' } as any);
    const found = await service.findBySlug('ring-a');
    expect(found.name).toBe('Ring A');
  });

  it('findPaged public chỉ trả sản phẩm không ẩn', async () => {
    await service.create({ ...base, slug: 'visible' } as any);
    await service.create({ ...base, slug: 'hidden', hidden: true } as any);
    const res = await service.findPaged({ page: 1, limit: 10 } as any, true);
    expect(res.total).toBe(1);
    expect(res.data[0].slug).toBe('visible');
  });

  it('toggleVisibility đảo trạng thái', async () => {
    const p = await service.create({ ...base, slug: 'tog' } as any);
    const after = await service.toggleVisibility(p.id);
    expect(after.hidden).toBe(true);
  });

  it('findRelated trả cùng category khác slug', async () => {
    await service.create({ ...base, slug: 'r1' } as any);
    await service.create({ ...base, slug: 'r2' } as any);
    const rel = await service.findRelated('r1');
    expect(rel.length).toBe(1);
    expect(rel[0].slug).toBe('r2');
  });
});
```

- [x] **Bước 4.9: Chạy test**

Run: `npm test -- products.service`
Expected: 4 test PASS.

- [x] **Bước 4.10: Đăng ký `ProductsModule` vào `app.module.ts`** (thêm import + vào mảng `imports`).

- [x] **Bước 4.11: Test thủ công qua curl**

```bash
npm run start:dev
curl http://localhost:4000/api/products
```
Expected: `{ "data": [], "total": 0, ... }`.

- [x] **Bước 4.12: Commit**

```bash
git add backend/src
git commit -m "feat(backend): module products (public + admin) với test"
```

---

## Task 5: Module Categories

**Files:** Create `src/modules/categories/*`. Lặp đúng pattern Task 4.

- [x] **Bước 5.1: Schema `category.schema.ts`** — trường theo mục 2.3:

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true, toJSON: { transform: (_d, r) => { r.id = r._id; delete r._id; delete r.__v; } } })
export class Category {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, unique: true, index: true, trim: true }) slug: string;
  @Prop({ default: 0 }) order: number;
  @Prop({ default: false }) hidden: boolean;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
```

- [x] **Bước 5.2: DTOs**

`dto/create-category.dto.ts`:
```typescript
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateCategoryDto {
  @IsString() name: string;
  @IsString() slug: string;
  @IsOptional() @IsNumber() order?: number;
  @IsOptional() @IsBoolean() hidden?: boolean;
}
```
`dto/update-category.dto.ts`:
```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
```
`dto/reorder.dto.ts`:
```typescript
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
class ReorderItem { @IsString() id: string; @IsNumber() order: number; }
export class ReorderDto {
  @IsArray() @ValidateNested({ each: true }) @Type(() => ReorderItem) items: ReorderItem[];
}
```

- [x] **Bước 5.3: Service `categories.service.ts`**

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ReorderDto } from './dto/reorder.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private model: Model<CategoryDocument>) {}
  findPublic() { return this.model.find({ hidden: false }).sort('order'); }
  findAll() { return this.model.find().sort('order'); }
  create(dto: CreateCategoryDto) { return this.model.create(dto); }
  async update(id: string, dto: UpdateCategoryDto) {
    const c = await this.model.findByIdAndUpdate(id, dto, { new: true });
    if (!c) throw new NotFoundException('Không tìm thấy danh mục');
    return c;
  }
  async remove(id: string) {
    const c = await this.model.findByIdAndDelete(id);
    if (!c) throw new NotFoundException('Không tìm thấy danh mục');
    return { deleted: true };
  }
  async reorder(dto: ReorderDto) {
    await Promise.all(dto.items.map((i) => this.model.findByIdAndUpdate(i.id, { order: i.order })));
    return this.findAll();
  }
}
```

- [x] **Bước 5.4: Controller `categories.controller.ts`** — 1 public controller (`@Controller('categories')` với `findPublic`) + 1 admin controller (`@Controller('admin/categories')` gắn `@UseGuards(JwtAuthGuard)`) có `GET / POST / PUT :id / DELETE :id / PATCH reorder`. (Lặp khung Task 4.6.)

- [x] **Bước 5.5: Module `categories.module.ts`** — `MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])`, khai báo 2 controller + service.

- [x] **Bước 5.6: Test `categories.service.spec.ts`** — test: tạo, `findPublic` bỏ hidden, `reorder` đổi order. (Lặp khung Task 4.8.)

- [x] **Bước 5.7: Chạy test** — `npm test -- categories.service` → PASS.

- [x] **Bước 5.8: Đăng ký `CategoriesModule` vào `app.module.ts`.**

- [x] **Bước 5.9: Commit** — `feat(backend): module categories + reorder`.

---

## Task 6: Module Banners

**Files:** Create `src/modules/banners/*`.

- [x] **Bước 6.1: Schema** theo mục 2.4 (đủ trường: title, subtitle, image, type, link, active, muted, hidden, order).

- [x] **Bước 6.2: DTOs** `create-banner.dto.ts` (subtitle & image required; type enum image/video; còn lại optional) + `update-banner.dto.ts` (PartialType).

- [x] **Bước 6.3: Service `banners.service.ts`** với business rule "chỉ 1 banner active":

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banner, BannerDocument } from './schemas/banner.schema';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Injectable()
export class BannersService {
  constructor(@InjectModel(Banner.name) private model: Model<BannerDocument>) {}
  findPublic() { return this.model.find({ hidden: false }).sort('order'); }
  findActive() { return this.model.findOne({ active: true, hidden: false }); }
  findAll() { return this.model.find().sort('order'); }

  async create(dto: CreateBannerDto) {
    if (dto.active) await this.model.updateMany({}, { active: false });
    return this.model.create(dto);
  }
  async update(id: string, dto: UpdateBannerDto) {
    if (dto.active) await this.model.updateMany({ _id: { $ne: id } }, { active: false });
    const b = await this.model.findByIdAndUpdate(id, dto, { new: true });
    if (!b) throw new NotFoundException('Không tìm thấy banner');
    return b;
  }
  async activate(id: string) {
    await this.model.updateMany({ _id: { $ne: id } }, { active: false });
    const b = await this.model.findByIdAndUpdate(id, { active: true }, { new: true });
    if (!b) throw new NotFoundException('Không tìm thấy banner');
    return b;
  }
  async remove(id: string) {
    const b = await this.model.findByIdAndDelete(id);
    if (!b) throw new NotFoundException('Không tìm thấy banner');
    if (b.active) {
      const first = await this.model.findOne().sort('order');
      if (first) { first.active = true; await first.save(); }
    }
    return { deleted: true };
  }
}
```

- [x] **Bước 6.4: Controller** — public `@Controller('banners')` có `GET /` (findPublic) + `GET /active`; admin `@Controller('admin/banners')` có `GET / POST / PUT :id / DELETE :id / PATCH :id/activate`.

- [x] **Bước 6.5: Module** đăng ký schema + controllers + service.

- [x] **Bước 6.6: Test `banners.service.spec.ts`** — quan trọng: test "tạo banner active=true thì các banner cũ thành active=false", "activate đảm bảo duy nhất 1 active".

- [x] **Bước 6.7: Chạy test** → PASS. **Đăng ký module. Commit** — `feat(backend): module banners + single-active rule`.

---

## Task 7: Module Contacts

**Files:** Create `src/modules/contacts/*`.

- [x] **Bước 7.1: Schema** theo mục 2.5.

- [x] **Bước 7.2: DTOs**

`create-contact.dto.ts`:
```typescript
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateContactDto {
  @IsString() @IsNotEmpty() name: string;
  @IsEmail() email: string;
  @IsString() @IsNotEmpty() phone: string;
  @IsString() @IsNotEmpty() message: string;
}
```
`update-status.dto.ts`:
```typescript
import { IsIn } from 'class-validator';
export class UpdateContactStatusDto {
  @IsIn(['Mới', 'Đang xử lý', 'Đã xử lý']) status: string;
}
```
`query-contact.dto.ts`: `status?`, `search?`, `page?`, `limit?` (lặp khung Task 4.4).

- [x] **Bước 7.3: Service** — `create(dto)` (public), `findPaged(query)` (filter status + search theo name/email/phone), `findOne(id)`, `updateStatus(id, status)`, `remove(id)`.

- [x] **Bước 7.4: Controller** — public `@Controller('contacts')` chỉ `POST /`; admin `@Controller('admin/contacts')` có `GET / GET :id / PATCH :id/status / DELETE :id`.

- [x] **Bước 7.5: Module + Test** — test: tạo từ form public; `findPaged` lọc theo status; `updateStatus` đổi đúng. **Đăng ký module. Commit.**

---

## Task 8: Module Custom Requests (Thiết kế riêng)

**Files:** Create `src/modules/custom-requests/*`. Giống Task 7 nhưng schema theo mục 2.6.

- [x] **Bước 8.1: Schema** mục 2.6 (name, email, phone, idea, budget, status enum `Mới/Đang xử lý/Hoàn thành`).

- [x] **Bước 8.2: DTO `create-custom-request.dto.ts`** — `name`(req), `email`(IsEmail), `idea`(req), `phone?`, `budget?`. `update-status.dto.ts` với `@IsIn(['Mới','Đang xử lý','Hoàn thành'])`.

- [x] **Bước 8.3: Service + Controller + Module** — public `POST /custom-requests`; admin `GET/GET :id/PATCH :id/status/DELETE :id` dưới `admin/custom-requests`.

- [x] **Bước 8.4: Test + đăng ký module + Commit.**

---

## Task 9: Module Design Samples (mẫu thiết kế)

**Files:** Create `src/modules/design-samples/*`.

- [x] **Bước 9.1: Schema** mục 2.7 (title, image, description, order, hidden).
- [x] **Bước 9.2: DTO** create (title & image required) + update (PartialType).
- [x] **Bước 9.3: Service** — `findPublic()` (`hidden:false` sort order), `findAll()`, `create/update/remove`.
- [x] **Bước 9.4: Controller** — public `GET /design-samples`; admin CRUD `admin/design-samples`.
- [x] **Bước 9.5: Module + Test + đăng ký + Commit.**

---

## Task 10: Module Pages (Giới thiệu / Hướng dẫn đo nhẫn / Bảo hành)

**Files:** Create `src/modules/pages/*`.

- [x] **Bước 10.1: Schema** mục 2.8 (key enum, title, content, images).

- [x] **Bước 10.2: DTO `update-page.dto.ts`**

```typescript
import { IsArray, IsOptional, IsString } from 'class-validator';
export class UpdatePageDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() content?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) images?: string[];
}
```

- [x] **Bước 10.3: Service** — dùng upsert theo `key`:

```typescript
async getByKey(key: string) {
  return this.model.findOneAndUpdate({ key }, { $setOnInsert: { key } }, { new: true, upsert: true });
}
async updateByKey(key: string, dto: UpdatePageDto) {
  return this.model.findOneAndUpdate({ key }, { $set: dto }, { new: true, upsert: true });
}
```

- [x] **Bước 10.4: Controller** — public `GET /pages/:key`; admin `PUT /admin/pages/:key`. Validate `key ∈ ['about','size-guide','warranty']` (ném `BadRequestException` nếu sai).

- [x] **Bước 10.5: Module + Test (upsert tạo mới khi chưa có) + đăng ký + Commit.**

---

## Task 11: Module Settings (GTM + thông tin liên hệ)

**Files:** Create `src/modules/settings/*`.

- [x] **Bước 11.1: Schema** mục 2.9.

- [x] **Bước 11.2: DTO `update-setting.dto.ts`** — tất cả optional: `gtmId?`, `trackingEnabled?(boolean)`, `contactAddress?`, `contactHotline?`, `contactEmail?`, `googleMapUrl?`.

- [x] **Bước 11.3: Service singleton** — luôn thao tác trên 1 document:

```typescript
async get() {
  return this.model.findOneAndUpdate({}, { $setOnInsert: {} }, { new: true, upsert: true });
}
async update(dto: UpdateSettingDto) {
  return this.model.findOneAndUpdate({}, { $set: dto }, { new: true, upsert: true });
}
```

- [x] **Bước 11.4: Controller** — public `GET /settings`; admin `PUT /admin/settings`.

- [x] **Bước 11.5: Module + Test + đăng ký + Commit.**

---

## Task 12: Module Uploads (Multer disk)

**Files:** Create `src/modules/uploads/*`.

- [x] **Bước 12.1: Tạo `src/modules/uploads/uploads.controller.ts`**

```typescript
import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('admin/uploads')
export class UploadsController {
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: process.env.UPLOAD_DIR ?? 'uploads',
        filename: (_req, file, cb) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 25 * 1024 * 1024 }, // 25MB cho cả video banner
    }),
  )
  upload(@UploadedFiles() files: Express.Multer.File[]) {
    const base = process.env.PUBLIC_URL ?? 'http://localhost:4000';
    const urls = (files ?? []).map((f) => `${base}/uploads/${f.filename}`);
    return { urls };
  }
}
```
> Lưu ý: `Math.random()` ở đây chạy trong code thực thi của backend (không phải trong môi trường harness) nên hợp lệ.

- [x] **Bước 12.2: Tạo `src/modules/uploads/uploads.module.ts`** — chỉ khai báo `controllers: [UploadsController]`.

- [x] **Bước 12.3: Đăng ký `UploadsModule` vào `app.module.ts`.**

- [x] **Bước 12.4: Test thủ công**

```bash
# Lấy token trước (đăng nhập), rồi:
curl -X POST http://localhost:4000/api/admin/uploads \
  -H "Authorization: Bearer <TOKEN>" \
  -F "files=@C:/path/to/anh.jpg"
```
Expected: `{ "urls": ["http://localhost:4000/uploads/....jpg"] }`, và mở URL đó thấy ảnh.

- [x] **Bước 12.5: Commit** — `feat(backend): module uploads (multer disk)`.

---

## Task 13: Module Dashboard (thống kê + biểu đồ)

**Files:** Create `src/modules/dashboard/*`.

- [x] **Bước 13.1: Tạo `src/modules/dashboard/dashboard.service.ts`**

```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../products/schemas/product.schema';
import { Banner } from '../banners/schemas/banner.schema';
import { Contact } from '../contacts/schemas/contact.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Product.name) private products: Model<any>,
    @InjectModel(Banner.name) private banners: Model<any>,
    @InjectModel(Contact.name) private contacts: Model<any>,
  ) {}

  async stats() {
    const [totalProducts, totalBanners, totalContacts, pendingContacts, resolvedContacts] =
      await Promise.all([
        this.products.countDocuments(),
        this.banners.countDocuments(),
        this.contacts.countDocuments(),
        this.contacts.countDocuments({ status: 'Mới' }),
        this.contacts.countDocuments({ status: 'Đã xử lý' }),
      ]);
    const resolutionRate = totalContacts ? Math.round((resolvedContacts / totalContacts) * 100) : 0;
    return { totalProducts, totalBanners, totalContacts, pendingContacts, resolutionRate };
  }

  async contactsChart(range: 'day' | 'month' | 'year') {
    const format = range === 'year' ? '%Y' : range === 'month' ? '%Y-%m' : '%Y-%m-%d';
    const rows = await this.contacts.aggregate([
      { $group: { _id: { $dateToString: { format, date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    return rows.map((r) => ({ label: r._id, count: r.count }));
  }
}
```

- [x] **Bước 13.2: Tạo `src/modules/dashboard/dashboard.controller.ts`**

```typescript
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('admin/dashboard')
export class DashboardController {
  constructor(private service: DashboardService) {}

  @Get('stats')
  stats() {
    return this.service.stats();
  }

  @Get('contacts-chart')
  chart(@Query('range') range: 'day' | 'month' | 'year' = 'day') {
    return this.service.contactsChart(range);
  }
}
```

- [x] **Bước 13.3: Tạo `src/modules/dashboard/dashboard.module.ts`** — import `MongooseModule.forFeature` cho Product, Banner, Contact schema; khai báo controller + service.

- [x] **Bước 13.4: Test `dashboard.service.spec.ts`** — seed vài product/contact, kiểm tra `stats()` và `contactsChart('day')` gom đúng theo ngày.

- [x] **Bước 13.5: Chạy test → PASS. Đăng ký module. Commit.**

---

## Task 14: Seed dữ liệu mẫu (migrate từ frontend)

**Files:** Modify `src/database/seed.ts`.

- [x] **Bước 14.1: Bổ sung seed** — sau khi tạo admin, thêm: tạo 4 Category (`ring`/Nhẫn, `bracelet`/Vòng tay, `necklace`/Dây chuyền, `earring`/Bông tai), 2 Banner mặc định (lấy từ `defaultBanners` trong `AdminDataContext.tsx`), vài Product mẫu (lấy từ `data/products.ts`), 4 Contact mẫu (từ `defaultContacts`). Chỉ seed khi collection rỗng (idempotent).

- [x] **Bước 14.2: Chạy `npm run seed`** → log số bản ghi đã tạo.

- [x] **Bước 14.3: Commit** — `chore(backend): seed dữ liệu mẫu ban đầu`.

---

## Task 15: Kiểm thử tổng thể (e2e smoke) + tài liệu API

**Files:** Create `backend/test/app.e2e-spec.ts`, `backend/README.md`.

- [ ] **Bước 15.1: Viết e2e smoke** — boot app với `mongodb-memory-server`, kiểm tra: `GET /api/products` trả 200; `POST /api/contacts` tạo được; route admin không token trả 401; login → có token → `GET /api/admin/products` trả 200.

- [ ] **Bước 15.2: Chạy** `npm run test:e2e` → PASS.

- [ ] **Bước 15.3: Viết `backend/README.md`** — hướng dẫn: cài đặt, `.env`, `npm run seed`, `npm run start:dev`, bảng tóm tắt endpoints (copy mục 3).

- [ ] **Bước 15.4: Commit** — `test(backend): e2e smoke + README`.

---

## Task 16: (Tùy chọn) Tích hợp Frontend gọi API thật

> Có thể làm sau, ở một plan riêng. Tóm tắt định hướng:

- [ ] Thêm `NEXT_PUBLIC_API_URL=http://localhost:4000/api` vào `.env.local` của Next.js.
- [ ] Tạo `lib/api.ts` (fetch wrapper, gắn token từ `localStorage` cho route admin).
- [ ] Thay `AdminDataContext` từ thao tác `localStorage` → gọi API (`login`, `products`, `banners`, `contacts`...).
- [ ] Thay `data/products.ts` (trang shop) bằng `GET /api/products`.
- [ ] Nối `CustomForm` → `POST /api/custom-requests`, form Liên hệ → `POST /api/contacts`.
- [ ] Inject GTM theo `GET /api/settings` (nếu `trackingEnabled`).

---

## Phụ lục A — Thứ tự thực thi đề xuất

1. Task 1 → 2 → 3 (nền tảng: project, bootstrap, auth) — **bắt buộc trước**.
2. Task 4 (products) — module mẫu, làm kỹ nhất.
3. Task 5–11 (categories, banners, contacts, custom-requests, design-samples, pages, settings) — lặp pattern, có thể làm song song nếu nhiều người.
4. Task 12 (uploads) → 13 (dashboard) — phụ thuộc các schema đã có.
5. Task 14 (seed) → 15 (e2e + docs).
6. Task 16 (tích hợp frontend) — plan riêng.

## Phụ lục B — Checklist phủ yêu cầu CMS đề bài

| Yêu cầu đề bài | Task |
|---|---|
| Dashboard: tổng liên hệ/sản phẩm/banner, biểu đồ ngày/tháng/năm | 13 |
| Banner: thêm/sửa/xóa/ẩn-hiện/sắp xếp | 6 |
| Sản phẩm: CRUD/ẩn-hiện/upload nhiều ảnh/chọn danh mục-màu-phong cách/nổi bật | 4 + 12 |
| Danh mục: thêm/sửa/xóa/sắp xếp | 5 |
| Liên hệ: danh sách/chi tiết/trạng thái | 7 |
| Thiết kế riêng: danh sách yêu cầu/thông tin khách/trạng thái | 8 |
| Trang giới thiệu/hướng dẫn đo nhẫn/bảo hành: sửa nội dung | 10 |
| Tracking: GTM ID + bật/tắt | 11 |
| Đăng nhập admin | 3 |
| Frontend: sản phẩm/chi tiết/liên quan/danh mục/tìm kiếm/phân trang | 4 |
| Frontend: banner, thông tin liên hệ + map | 6 + 11 |
| Frontend: mẫu thiết kế | 9 |
```
