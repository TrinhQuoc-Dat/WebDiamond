import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DesignSample, DesignSampleSchema } from './schemas/design-sample.schema';
import { DesignSamplesService } from './design-samples.service';
import { DesignSamplesPublicController, DesignSamplesAdminController } from './design-samples.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: DesignSample.name, schema: DesignSampleSchema }])],
  controllers: [DesignSamplesPublicController, DesignSamplesAdminController],
  providers: [DesignSamplesService],
  exports: [MongooseModule],
})
export class DesignSamplesModule {}
