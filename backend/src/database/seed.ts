import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '../app.module';
import { User } from '../modules/auth/schemas/user.schema';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const config = app.get(ConfigService);
  const userModel = app.get<Model<any>>(getModelToken(User.name));
  const email = config.get<string>('adminEmail')!;
  const exists = await userModel.findOne({ email });
  if (!exists) {
    await userModel.create({
      email,
      passwordHash: await bcrypt.hash(config.get<string>('adminPassword')!, 10),
      name: 'Administrator',
    });
    console.log(`✓ Đã tạo admin: ${email}`);
  } else {
    console.log('Admin đã tồn tại, bỏ qua.');
  }
  await app.close();
}
seed();
