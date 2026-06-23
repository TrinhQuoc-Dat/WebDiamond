import { Test } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';
import { CustomRequestsService } from './custom-requests.service';
import { CustomRequest, CustomRequestSchema } from './schemas/custom-request.schema';

describe('CustomRequestsService', () => {
  let service: CustomRequestsService;
  let mongod: MongoMemoryServer;
  let model: Model<any>;
  let moduleRef: any;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongod.getUri()),
        MongooseModule.forFeature([{ name: CustomRequest.name, schema: CustomRequestSchema }]),
      ],
      providers: [CustomRequestsService],
    }).compile();
    service = moduleRef.get(CustomRequestsService);
    model = moduleRef.get(getModelToken(CustomRequest.name));
  });

  afterAll(async () => {
    await moduleRef.close();
    await mongod.stop();
  });

  beforeEach(async () => {
    await model.deleteMany({});
  });

  const base = {
    name: 'Nguyen Van B',
    email: 'designer@gmail.com',
    phone: '0912345678',
    idea: 'Nhẫn cưới hình trái tim kim cương',
    budget: '50 triệu VND',
  };

  it('tạo yêu cầu thiết kế mới với status mặc định là Mới', async () => {
    const r = await service.create(base);
    expect(r.name).toBe('Nguyen Van B');
    expect(r.status).toBe('Mới');
    expect(r.idea).toBe('Nhẫn cưới hình trái tim kim cương');
  });

  it('findPaged lọc theo status và tìm kiếm regex', async () => {
    await service.create({ ...base, name: 'Client X', status: 'Mới' });
    await service.create({ ...base, name: 'Client Y', status: 'Đang xử lý' });

    const resStatus = await service.findPaged({ status: 'Mới' });
    expect(resStatus.total).toBe(1);
    expect(resStatus.data[0].name).toBe('Client X');

    const resSearch = await service.findPaged({ search: 'Client Y' });
    expect(resSearch.total).toBe(1);
    expect(resSearch.data[0].name).toBe('Client Y');

    const resSearchIdea = await service.findPaged({ search: 'trái tim' });
    expect(resSearchIdea.total).toBe(2);
  });

  it('updateStatus cập nhật trạng thái yêu cầu thiết kế', async () => {
    const r = await service.create(base);
    const updated = await service.updateStatus(r.id, 'Hoàn thành');
    expect(updated.status).toBe('Hoàn thành');
  });

  it('remove xóa yêu cầu thiết kế', async () => {
    const r = await service.create(base);
    const result = await service.remove(r.id);
    expect(result.deleted).toBe(true);

    await expect(service.findOne(r.id)).rejects.toThrow();
  });
});
