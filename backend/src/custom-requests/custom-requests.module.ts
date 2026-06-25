import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomRequest, CustomRequestSchema } from './schemas/custom-request.schema';
import { CustomRequestsService } from './custom-requests.service';
import { CustomRequestsPublicController, CustomRequestsAdminController } from './custom-requests.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: CustomRequest.name, schema: CustomRequestSchema }])],
  controllers: [CustomRequestsPublicController, CustomRequestsAdminController],
  providers: [CustomRequestsService],
  exports: [MongooseModule],
})
export class CustomRequestsModule {}
