import { Test } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';
import { ContactsService } from '../src/contacts/contacts.service';
import { Contact, ContactSchema } from '../src/contacts/schemas/contact.schema';

describe('ContactsService', () => {
  let service: ContactsService;
  let mongod: MongoMemoryServer;
  let model: Model<any>;
  let moduleRef: any;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongod.getUri()),
        MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
      ],
      providers: [ContactsService],
    }).compile();
    service = moduleRef.get(ContactsService);
    model = moduleRef.get(getModelToken(Contact.name));
  });

  afterAll(async () => {
    await moduleRef.close();
    await mongod.stop();
  });

  beforeEach(async () => {
    await model.deleteMany({});
  });

  const base = { name: 'Nguyen Van A', email: 'a@gmail.com', phone: '0987654321', message: 'Hello' };

  it('tạo liên hệ mới với status mặc định là Mới', async () => {
    const c = await service.create(base);
    expect(c.name).toBe('Nguyen Van A');
    expect(c.status).toBe('Mới');
  });

  it('findPaged lọc theo status và tìm kiếm regex', async () => {
    await service.create({ ...base, name: 'Customer X', status: 'Mới' });
    await service.create({ ...base, name: 'Customer Y', status: 'Đang xử lý' });
    
    const resStatus = await service.findPaged({ status: 'Mới' });
    expect(resStatus.total).toBe(1);
    expect(resStatus.data[0].name).toBe('Customer X');

    const resSearch = await service.findPaged({ search: 'Customer Y' });
    expect(resSearch.total).toBe(1);
    expect(resSearch.data[0].name).toBe('Customer Y');
  });

  it('updateStatus cập nhật trạng thái liên hệ', async () => {
    const c = await service.create(base);
    const updated = await service.updateStatus(c.id, 'Đã xử lý');
    expect(updated.status).toBe('Đã xử lý');
  });
});
