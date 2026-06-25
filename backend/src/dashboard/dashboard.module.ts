import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Product, ProductSchema } from '../products/schemas/product.schema';
import { Banner, BannerSchema } from '../banners/schemas/banner.schema';
import { Contact, ContactSchema } from '../contacts/schemas/contact.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Banner.name, schema: BannerSchema },
      { name: Contact.name, schema: ContactSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
