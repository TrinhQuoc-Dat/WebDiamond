import { Test } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';
import { DashboardService } from '../src/dashboard/dashboard.service';
import { Product, ProductSchema } from '../src/products/schemas/product.schema';
import { Banner, BannerSchema } from '../src/banners/schemas/banner.schema';
import { Contact, ContactSchema } from '../src/contacts/schemas/contact.schema';

describe('DashboardService', () => {
  let service: DashboardService;
  let mongod: MongoMemoryServer;
  let productModel: Model<any>;
  let bannerModel: Model<any>;
  let contactModel: Model<any>;
  let moduleRef: any;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongod.getUri()),
        MongooseModule.forFeature([
          { name: Product.name, schema: ProductSchema },
          { name: Banner.name, schema: BannerSchema },
          { name: Contact.name, schema: ContactSchema },
        ]),
      ],
      providers: [DashboardService],
    }).compile();
    service = moduleRef.get(DashboardService);
    productModel = moduleRef.get(getModelToken(Product.name));
    bannerModel = moduleRef.get(getModelToken(Banner.name));
    contactModel = moduleRef.get(getModelToken(Contact.name));
  });

  afterAll(async () => {
    await moduleRef.close();
    await mongod.stop();
  });

  beforeEach(async () => {
    await productModel.deleteMany({});
    await bannerModel.deleteMany({});
    await contactModel.deleteMany({});
  });

  it('stats() trả về thống kê rỗng nếu không có dữ liệu', async () => {
    const stats = await service.stats();
    expect(stats).toEqual({
      totalProducts: 0,
      totalBanners: 0,
      totalContacts: 0,
      pendingContacts: 0,
      resolutionRate: 0,
    });
  });

  it('stats() tính toán chính xác số lượng và tỷ lệ xử lý', async () => {
    await productModel.create([
      { slug: 'p1', name: 'Product 1', category: 'ring', price: '100', priceValue: 100, image: 'img1.png' },
      { slug: 'p2', name: 'Product 2', category: 'ring', price: '200', priceValue: 200, image: 'img2.png' },
    ]);
    await bannerModel.create([
      { subtitle: 'Sub 1', image: 'img1.png' },
    ]);

    await contactModel.create([
      { name: 'User 1', email: 'u1@gmail.com', phone: '111', message: 'Msg 1', status: 'Mới' },
      { name: 'User 2', email: 'u2@gmail.com', phone: '222', message: 'Msg 2', status: 'Đang xử lý' },
      { name: 'User 3', email: 'u3@gmail.com', phone: '333', message: 'Msg 3', status: 'Đã xử lý' },
      { name: 'User 4', email: 'u4@gmail.com', phone: '444', message: 'Msg 4', status: 'Đã xử lý' },
    ]);

    const stats = await service.stats();
    expect(stats.totalProducts).toBe(2);
    expect(stats.totalBanners).toBe(1);
    expect(stats.totalContacts).toBe(4);
    expect(stats.pendingContacts).toBe(1);
    expect(stats.resolutionRate).toBe(50);
  });

  it('contactsChart() gom nhóm và đếm đúng số lượng liên hệ theo ngày', async () => {
    await contactModel.create([
      {
        name: 'User 1', email: 'u1@gmail.com', phone: '111', message: 'Msg 1',
        createdAt: new Date('2026-06-21T10:00:00Z'),
      },
      {
        name: 'User 2', email: 'u2@gmail.com', phone: '222', message: 'Msg 2',
        createdAt: new Date('2026-06-21T15:00:00Z'),
      },
      {
        name: 'User 3', email: 'u3@gmail.com', phone: '333', message: 'Msg 3',
        createdAt: new Date('2026-06-23T10:00:00Z'),
      },
    ]);

    const chart = await service.contactsChart('day');
    expect(chart).toHaveLength(2);
    expect(chart[0]).toEqual({ label: '2026-06-21', count: 2 });
    expect(chart[1]).toEqual({ label: '2026-06-23', count: 1 });
  });

  it('contactsChart() gom nhóm theo tháng và năm', async () => {
    await contactModel.create([
      {
        name: 'User 1', email: 'u1@gmail.com', phone: '111', message: 'Msg 1',
        createdAt: new Date('2025-06-21T10:00:00Z'),
      },
      {
        name: 'User 2', email: 'u2@gmail.com', phone: '222', message: 'Msg 2',
        createdAt: new Date('2026-05-21T15:00:00Z'),
      },
      {
        name: 'User 3', email: 'u3@gmail.com', phone: '333', message: 'Msg 3',
        createdAt: new Date('2026-06-23T10:00:00Z'),
      },
    ]);

    const chartMonth = await service.contactsChart('month');
    expect(chartMonth).toHaveLength(3);
    expect(chartMonth[0]).toEqual({ label: '2025-06', count: 1 });
    expect(chartMonth[1]).toEqual({ label: '2026-05', count: 1 });
    expect(chartMonth[2]).toEqual({ label: '2026-06', count: 1 });

    const chartYear = await service.contactsChart('year');
    expect(chartYear).toHaveLength(2);
    expect(chartYear[0]).toEqual({ label: '2025', count: 1 });
    expect(chartYear[1]).toEqual({ label: '2026', count: 2 });
  });
});
