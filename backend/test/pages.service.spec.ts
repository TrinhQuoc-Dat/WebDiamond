import { Test } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';
import { PagesService } from '../src/pages/pages.service';
import { Page, PageSchema } from '../src/pages/schemas/page.schema';

describe('PagesService', () => {
  let service: PagesService;
  let mongod: MongoMemoryServer;
  let model: Model<any>;
  let moduleRef: any;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongod.getUri()),
        MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
      ],
      providers: [PagesService],
    }).compile();
    service = moduleRef.get(PagesService);
    model = moduleRef.get(getModelToken(Page.name));
  });

  afterAll(async () => {
    await moduleRef.close();
    await mongod.stop();
  });

  beforeEach(async () => {
    await model.deleteMany({});
  });

  it('getByKey tự động tạo trang tĩnh rỗng (upsert) khi chưa tồn tại', async () => {
    const page = await service.getByKey('about');
    expect(page.key).toBe('about');
    expect(page.title).toBe('');
    expect(page.content).toBe('');
    expect(page.images).toEqual([]);
    expect(page.id).toBeDefined();

    const count = await model.countDocuments();
    expect(count).toBe(1);
  });

  it('getByKey lấy trang đã tồn tại từ trước', async () => {
    await model.create({ key: 'about', title: 'Giới thiệu', content: 'WebDiamond' });

    const page = await service.getByKey('about');
    expect(page.title).toBe('Giới thiệu');
    expect(page.content).toBe('WebDiamond');

    const count = await model.countDocuments();
    expect(count).toBe(1);
  });

  it('updateByKey cập nhật (hoặc tự tạo mới) dữ liệu trang tĩnh', async () => {
    const page = await service.updateByKey('about', { title: 'Giới thiệu 2', content: 'Kim Cương' });
    expect(page.key).toBe('about');
    expect(page.title).toBe('Giới thiệu 2');
    expect(page.content).toBe('Kim Cương');

    const count = await model.countDocuments();
    expect(count).toBe(1);
  });
});
