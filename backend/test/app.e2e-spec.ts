import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../src/categories/schemas/category.schema';
import { Product } from '../src/products/schemas/product.schema';
import { Contact } from '../src/contacts/schemas/contact.schema';
import { User } from '../src/auth/schemas/user.schema';
import * as bcrypt from 'bcrypt';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let categoryModel: Model<any>;
  let productModel: Model<any>;
  let contactModel: Model<any>;
  let userModel: Model<any>;

  let accessToken: string;
  let createdCategoryId: string;
  let createdProductId: string;
  let createdContactId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();

    categoryModel = moduleFixture.get(getModelToken(Category.name));
    productModel = moduleFixture.get(getModelToken(Product.name));
    contactModel = moduleFixture.get(getModelToken(Contact.name));
    userModel = moduleFixture.get(getModelToken(User.name));

    // Ensure admin user exists
    const email = 'admin@webdiamond.com';
    const exists = await userModel.findOne({ email });
    if (!exists) {
      await userModel.create({
        email,
        passwordHash: await bcrypt.hash('admin123', 10),
        name: 'Administrator',
      });
    }
  });

  afterAll(async () => {
    // Dọn dẹp dữ liệu test E2E để tránh rác DB
    if (createdProductId) {
      await productModel.findByIdAndDelete(createdProductId);
    }
    if (createdCategoryId) {
      await categoryModel.findByIdAndDelete(createdCategoryId);
    }
    if (createdContactId) {
      await contactModel.findByIdAndDelete(createdContactId);
    }
    await userModel.deleteMany({ email: 'member@webdiamond.com' });
    await app.close();
  });

  it('/api/auth/login (POST) - Đăng nhập lấy token', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: 'admin@webdiamond.com', password: 'admin123' })
      .expect(201);

    expect(res.body).toHaveProperty('accessToken');
    accessToken = res.body.accessToken;
  });

  it('/api/auth/me (GET) - Xác thực thông tin admin', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(res.body.email).toBe('admin@webdiamond.com');
    expect(res.body.name).toBe('Administrator');
    expect(res.body.role).toBe('admin');
  });

  let memberToken: string;

  it('/api/auth/register (POST) - Đăng ký tài khoản mới', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        email: 'member@webdiamond.com',
        password: 'password123',
        name: 'Member User',
        phone: '0981112223',
      })
      .expect(201);

    expect(res.body).toHaveProperty('accessToken');
    expect(res.body.user.email).toBe('member@webdiamond.com');
    expect(res.body.user.name).toBe('Member User');
    expect(res.body.user.phone).toBe('0981112223');
    expect(res.body.user.role).toBe('user');
    memberToken = res.body.accessToken;
  });

  it('/api/auth/register (POST) - Đăng ký trùng email báo lỗi 400', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        email: 'member@webdiamond.com',
        password: 'password123',
      })
      .expect(400);
  });

  it('/api/auth/me (GET) - Lấy thông tin user vừa đăng ký', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${memberToken}`)
      .expect(200);

    expect(res.body.email).toBe('member@webdiamond.com');
    expect(res.body.name).toBe('Member User');
    expect(res.body.phone).toBe('0981112223');
    expect(res.body.role).toBe('user');
  });

  it('/api/auth/me (PUT) - Chỉnh sửa thông tin user', async () => {
    const res = await request(app.getHttpServer())
      .put('/api/auth/me')
      .set('Authorization', `Bearer ${memberToken}`)
      .send({
        name: 'Member Updated',
        phone: '0999888777',
      })
      .expect(200);

    expect(res.body.name).toBe('Member Updated');
    expect(res.body.phone).toBe('0999888777');

    // Kiểm tra lại bằng GET
    const getRes = await request(app.getHttpServer())
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${memberToken}`)
      .expect(200);

    expect(getRes.body.name).toBe('Member Updated');
    expect(getRes.body.phone).toBe('0999888777');
  });

  it('/api/admin/categories (POST) - Tạo danh mục sản phẩm mới', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/admin/categories')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: 'E2E Test Ring', slug: 'e2e-test-ring', order: 100 })
      .expect(201);

    expect(res.body.slug).toBe('e2e-test-ring');
    createdCategoryId = res.body.id;
  });

  it('/api/admin/products (POST) - Tạo sản phẩm kiểm thử mới', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/admin/products')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        slug: 'e2e-product-ring',
        name: 'E2E Diamond Ring',
        category: 'e2e-test-ring',
        price: '15.000.000 VND',
        priceValue: 15000000,
        image: '/img-test.png',
        images: ['/img-test.png'],
        description: ['A beautiful ring for E2E testing.'],
        spec: 'Weight: 5g',
        colors: [{ id: 'white', name: 'White', hex: '#FFFFFF' }],
        sizes: ['15', '16'],
      })
      .expect(201);

    expect(res.body.slug).toBe('e2e-product-ring');
    createdProductId = res.body.id;
  });

  it('/api/products (GET) - Xem sản phẩm công khai', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/products')
      .expect(200);

    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('total');
    const items = res.body.data;
    const found = items.find((p: any) => p.slug === 'e2e-product-ring');
    expect(found).toBeDefined();
    expect(found.name).toBe('E2E Diamond Ring');
  });

  it('/api/contacts (POST) - Gửi liên hệ công khai từ khách hàng', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/contacts')
      .send({
        name: 'E2E Guest',
        email: 'e2e-guest@example.com',
        phone: '0123456789',
        message: 'Tôi muốn tư vấn về sản phẩm E2E Diamond Ring.',
      })
      .expect(201);

    expect(res.body.name).toBe('E2E Guest');
    createdContactId = res.body.id;
  });

  it('/api/admin/dashboard/stats (GET) - Thống kê Dashboard nhận diện sản phẩm và liên hệ mới', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/admin/dashboard/stats')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(res.body.totalProducts).toBeGreaterThanOrEqual(1);
    expect(res.body.totalContacts).toBeGreaterThanOrEqual(1);
  });
});
