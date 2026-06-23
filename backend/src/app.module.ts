import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { BannersModule } from './banners/banners.module';
import { ContactsModule } from './contacts/contacts.module';
import { CustomRequestsModule } from './custom-requests/custom-requests.module';
import { DesignSamplesModule } from './design-samples/design-samples.module';
import { PagesModule } from './pages/pages.module';
import { SettingsModule } from './settings/settings.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('mongoUri'),
      }),
    }),
    AuthModule,
    ProductsModule,
    CategoriesModule,
    BannersModule,
    ContactsModule,
    CustomRequestsModule,
    DesignSamplesModule,
    PagesModule,
    SettingsModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
