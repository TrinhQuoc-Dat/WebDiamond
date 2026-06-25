import { Test } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';
import { DesignSamplesService } from '../src/design-samples/design-samples.service';
import { DesignSample, DesignSampleSchema } from '../src/design-samples/schemas/design-sample.schema';

describe('DesignSamplesService', () => {
  let service: DesignSamplesService;
  let mongod: MongoMemoryServer;
  let model: Model<any>;
  let moduleRef: any;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongod.getUri()),
        MongooseModule.forFeature([{ name: DesignSample.name, schema: DesignSampleSchema }]),
      ],
      providers: [DesignSamplesService],
    }).compile();
    service = moduleRef.get(DesignSamplesService);
    model = moduleRef.get(getModelToken(DesignSample.name));
  });

  afterAll(async () => {
    await moduleRef.close();
    await mongod.stop();
  });

  beforeEach(async () => {
    await model.deleteMany({});
  });

  const base = {
    title: 'Mẫu Nhẫn Kim Cương Vàng Trắng',
    image: '/uploads/sample1.png',
    description: 'Thiết kế nhẫn ổ kim cương sang trọng',
    order: 0,
    hidden: false,
  };

  it('tạo mẫu thiết kế mới thành công', async () => {
    const s = await service.create(base);
    expect(s.title).toBe('Mẫu Nhẫn Kim Cương Vàng Trắng');
    expect(s.hidden).toBe(false);
  });

  it('findPublic chỉ trả về các mẫu thiết kế không bị ẩn và sắp xếp theo order', async () => {
    await service.create({ ...base, title: 'Sample A', order: 2 });
    await service.create({ ...base, title: 'Sample B', order: 1 });
    await service.create({ ...base, title: 'Sample C', hidden: true });

    const res = await service.findPublic();
    expect(res.length).toBe(2);
    expect(res[0].title).toBe('Sample B');
    expect(res[1].title).toBe('Sample A');
  });

  it('findAll trả về toàn bộ mẫu thiết kế kể cả bị ẩn và sắp xếp theo order', async () => {
    await service.create({ ...base, title: 'Sample A', order: 2 });
    await service.create({ ...base, title: 'Sample B', order: 1 });
    await service.create({ ...base, title: 'Sample C', hidden: true, order: 3 });

    const res = await service.findAll();
    expect(res.length).toBe(3);
    expect(res[0].title).toBe('Sample B');
    expect(res[1].title).toBe('Sample A');
    expect(res[2].title).toBe('Sample C');
  });

  it('update cập nhật thành công và trả về dữ liệu mới', async () => {
    const s = await service.create(base);
    const updated = await service.update(s.id, { title: 'Mẫu Nhẫn Cưới Tình Yêu' });
    expect(updated.title).toBe('Mẫu Nhẫn Cưới Tình Yêu');
  });

  it('remove xóa mẫu thiết kế thành công', async () => {
    const s = await service.create(base);
    const res = await service.remove(s.id);
    expect(res.deleted).toBe(true);

    const check = await model.findById(s.id);
    expect(check).toBeNull();
  });
});
