import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { User, UserSchema } from './schemas/user.schema';
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
    await userModel.create({ email: 'admin@webdiamond.com', passwordHash: await bcrypt.hash('admin123', 10) });
  });

  afterAll(async () => {
    await moduleRef.close();
    await mongod.stop();
  });

  it('login đúng trả accessToken', async () => {
    const res = await service.login({ email: 'admin@webdiamond.com', password: 'admin123' });
    expect(res.accessToken).toBeDefined();
    expect(res.user.email).toBe('admin@webdiamond.com');
  });

  it('login sai mật khẩu báo lỗi', async () => {
    await expect(service.login({ email: 'admin@webdiamond.com', password: 'wrong' })).rejects.toThrow();
  });
});
