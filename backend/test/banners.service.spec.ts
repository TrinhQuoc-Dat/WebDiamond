import { Test } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';
import { BannersService } from '../src/banners/banners.service';
import { Banner, BannerSchema } from '../src/banners/schemas/banner.schema';

describe('BannersService', () => {
  let service: BannersService;
  let mongod: MongoMemoryServer;
  let model: Model<any>;
  let moduleRef: any;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongod.getUri()),
        MongooseModule.forFeature([{ name: Banner.name, schema: BannerSchema }]),
      ],
      providers: [BannersService],
    }).compile();
    service = moduleRef.get(BannersService);
    model = moduleRef.get(getModelToken(Banner.name));
  });

  afterAll(async () => {
    await moduleRef.close();
    await mongod.stop();
  });

  beforeEach(async () => {
    await model.deleteMany({});
  });

  const base = { subtitle: 'Sub', image: '/img.png' };

  it('tạo banner active=true thì banner cũ thành active=false', async () => {
    const b1 = await service.create({ ...base, active: true });
    const b2 = await service.create({ ...base, active: true });
    
    const foundB1 = await model.findById(b1.id);
    expect(foundB1.active).toBe(false);
    expect(b2.active).toBe(true);
  });

  it('activate đặt active=true và tắt các banner khác', async () => {
    const b1 = await service.create({ ...base, active: true });
    const b2 = await service.create({ ...base, active: false });
    
    await service.activate(b2.id);
    
    const foundB1 = await model.findById(b1.id);
    const foundB2 = await model.findById(b2.id);
    expect(foundB1.active).toBe(false);
    expect(foundB2.active).toBe(true);
  });

  it('xóa banner đang active tự kích hoạt banner đầu tiên theo order', async () => {
    const b1 = await service.create({ ...base, active: true, order: 1 });
    const b2 = await service.create({ ...base, active: false, order: 2 });
    
    await service.remove(b1.id);
    
    const foundB2 = await model.findById(b2.id);
    expect(foundB2.active).toBe(true);
  });
});
