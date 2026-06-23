import { PartialType } from '@nestjs/mapped-types';
import { CreateDesignSampleDto } from './create-design-sample.dto';

export class UpdateDesignSampleDto extends PartialType(CreateDesignSampleDto) {}
