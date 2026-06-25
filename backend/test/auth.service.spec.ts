import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../src/auth/auth.service';
import { User, UserSchema } from '../src/auth/schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('AuthService', () => {
  let service: AuthService;
  let mongod: MongoMemoryServer;
  let userModel: Model<any>;
  let moduleRef: any;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongod.getUri()),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({ secret: 'test', signOptions: { expiresIn: '1h' } }),
      ],
      providers: [AuthService],
    }).compile();
    service = moduleRef.get(AuthService);
    userModel = moduleRef.get(getModelToken(User.name));
    await userModel.create({
      email: 'admin@webdiamond.com',
      passwordHash: await bcrypt.hash('admin123', 10),
      name: 'Administrator',
      role: 'admin',
    });
  });

  afterAll(async () => {
    await moduleRef.close();
    await mongod.stop();
  });

  it('login đúng trả accessToken', async () => {
    const res = await service.login({ email: 'admin@webdiamond.com', password: 'admin123' });
    expect(res.accessToken).toBeDefined();
    expect(res.user.email).toBe('admin@webdiamond.com');
    expect(res.user.name).toBe('Administrator');
  });

  it('login sai mật khẩu báo lỗi', async () => {
    await expect(service.login({ email: 'admin@webdiamond.com', password: 'wrong' })).rejects.toThrow();
  });

  it('đăng ký thành công trả accessToken và user', async () => {
    const res = await service.register({
      email: 'newuser@webdiamond.com',
      password: 'password123',
      name: 'New User',
      phone: '0987654321',
    });
    expect(res.accessToken).toBeDefined();
    expect(res.user.email).toBe('newuser@webdiamond.com');
    expect(res.user.name).toBe('New User');
    expect(res.user.phone).toBe('0987654321');
    expect(res.user.role).toBe('user');

    const inDb = await userModel.findOne({ email: 'newuser@webdiamond.com' });
    expect(inDb).toBeDefined();
    expect(inDb.name).toBe('New User');
  });

  it('đăng ký email đã tồn tại báo lỗi', async () => {
    await expect(
      service.register({
        email: 'admin@webdiamond.com',
        password: 'password123',
      }),
    ).rejects.toThrow('Email đã được sử dụng');
  });

  it('lấy profile chính xác', async () => {
    const admin = await userModel.findOne({ email: 'admin@webdiamond.com' });
    const profile = await service.getProfile(admin._id.toString());
    expect(profile.email).toBe('admin@webdiamond.com');
    expect(profile.name).toBe('Administrator');
    expect(profile.role).toBe('admin');
  });

  it('cập nhật profile thành công', async () => {
    const admin = await userModel.findOne({ email: 'admin@webdiamond.com' });
    const updated = await service.updateProfile(admin._id.toString(), {
      name: 'Super Admin',
      phone: '0112233445',
    });
    expect(updated.name).toBe('Super Admin');
    expect(updated.phone).toBe('0112233445');

    const fresh = await userModel.findOne({ email: 'admin@webdiamond.com' });
    expect(fresh.name).toBe('Super Admin');
    expect(fresh.phone).toBe('0112233445');
  });
});
