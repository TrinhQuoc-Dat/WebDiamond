import { Test } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';
import { SettingsService } from '../src/settings/settings.service';
import { Setting, SettingSchema } from '../src/settings/schemas/setting.schema';

describe('SettingsService', () => {
  let service: SettingsService;
  let mongod: MongoMemoryServer;
  let model: Model<any>;
  let moduleRef: any;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongod.getUri()),
        MongooseModule.forFeature([{ name: Setting.name, schema: SettingSchema }]),
      ],
      providers: [SettingsService],
    }).compile();
    service = moduleRef.get(SettingsService);
    model = moduleRef.get(getModelToken(Setting.name));
  });

  afterAll(async () => {
    await moduleRef.close();
    await mongod.stop();
  });

  beforeEach(async () => {
    await model.deleteMany({});
  });

  it('get tự động tạo cấu hình mặc định (upsert) khi chưa tồn tại', async () => {
    const config = await service.get();
    expect(config.gtmId).toBe('');
    expect(config.trackingEnabled).toBe(false);
    expect(config.contactAddress).toBe('');
    expect(config.id).toBeDefined();

    const count = await model.countDocuments();
    expect(count).toBe(1);
  });

  it('get lấy cấu hình đã tồn tại và không nhân bản', async () => {
    await model.create({ gtmId: 'GTM-XXXX', trackingEnabled: true });

    const config = await service.get();
    expect(config.gtmId).toBe('GTM-XXXX');
    expect(config.trackingEnabled).toBe(true);

    const count = await model.countDocuments();
    expect(count).toBe(1);
  });

  it('update cập nhật thành công cấu hình duy nhất và không nhân bản', async () => {
    await model.create({ gtmId: 'GTM-OLD', trackingEnabled: false });

    const config = await service.update({ gtmId: 'GTM-NEW', contactEmail: 'info@webdiamond.com' });
    expect(config.gtmId).toBe('GTM-NEW');
    expect(config.contactEmail).toBe('info@webdiamond.com');

    const count = await model.countDocuments();
    expect(count).toBe(1);
  });
});
