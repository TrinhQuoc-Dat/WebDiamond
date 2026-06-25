import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Page, PageSchema } from './schemas/page.schema';
import { PagesService } from './pages.service';
import { PagesPublicController, PagesAdminController } from './pages.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }])],
  controllers: [PagesPublicController, PagesAdminController],
  providers: [PagesService],
  exports: [MongooseModule],
})
export class PagesModule {}
