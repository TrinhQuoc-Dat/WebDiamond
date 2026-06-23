import { Test } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';
import { CategoriesService } from './categories.service';
import { Category, CategorySchema } from './schemas/category.schema';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let mongod: MongoMemoryServer;
  let model: Model<any>;
  let moduleRef: any;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongod.getUri()),
        MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
      ],
      providers: [CategoriesService],
    }).compile();
    service = moduleRef.get(CategoriesService);
    model = moduleRef.get(getModelToken(Category.name));
  });

  afterAll(async () => {
    await moduleRef.close();
    await mongod.stop();
  });

  beforeEach(async () => {
    await model.deleteMany({});
  });

  it('tạo danh mục mới', async () => {
    const c = await service.create({ name: 'Necklace', slug: 'necklace', order: 1 });
    expect(c.name).toBe('Necklace');
    expect(c.slug).toBe('necklace');
  });

  it('findPublic chỉ trả về danh mục không ẩn', async () => {
    await service.create({ name: 'Ring', slug: 'ring', hidden: false });
    await service.create({ name: 'Earrings', slug: 'earrings', hidden: true });
    const res = await service.findPublic();
    expect(res.length).toBe(1);
    expect(res[0].slug).toBe('ring');
  });

  it('reorder thay đổi thứ tự sắp xếp', async () => {
    const c1 = await service.create({ name: 'A', slug: 'a', order: 1 });
    const c2 = await service.create({ name: 'B', slug: 'b', order: 2 });
    
    await service.reorder({
      items: [
        { id: c1.id, order: 2 },
        { id: c2.id, order: 1 }
      ]
    });

    const res = await service.findAll();
    expect(res[0].slug).toBe('b');
    expect(res[1].slug).toBe('a');
  });
});
