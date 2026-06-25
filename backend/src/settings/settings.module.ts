import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Setting, SettingSchema } from './schemas/setting.schema';
import { SettingsService } from './settings.service';
import { SettingsPublicController, SettingsAdminController } from './settings.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Setting.name, schema: SettingSchema }])],
  controllers: [SettingsPublicController, SettingsAdminController],
  providers: [SettingsService],
  exports: [MongooseModule],
})
export class SettingsModule {}
