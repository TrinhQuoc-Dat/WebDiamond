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
  let moduleRef: any;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongod.getUri()),
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
      ],
      providers: [ProductsService],
    }).compile();
    service = moduleRef.get(ProductsService);
    model = ref => moduleRef.get(getModelToken(Product.name)); // wait, ref is not needed, let's just assign:
    model = moduleRef.get(getModelToken(Product.name));
  });

  afterAll(async () => {
    await moduleRef.close();
    await mongod.stop();
  });
  
  beforeEach(async () => {
    await model.deleteMany({});
  });

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
