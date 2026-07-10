import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomPage, CustomPageSchema } from './schemas/custom-page.schema';
import { CustomPageService } from './custom-page.service';
import { CustomPagePublicController, CustomPageAdminController } from './custom-page.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: CustomPage.name, schema: CustomPageSchema }])],
  controllers: [CustomPagePublicController, CustomPageAdminController],
  providers: [CustomPageService],
  exports: [MongooseModule],
})
export class CustomPageModule {}
