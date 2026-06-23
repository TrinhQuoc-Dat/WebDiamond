import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DesignSample, DesignSampleDocument } from './schemas/design-sample.schema';
import { CreateDesignSampleDto } from './dto/create-design-sample.dto';
import { UpdateDesignSampleDto } from './dto/update-design-sample.dto';

@Injectable()
export class DesignSamplesService {
  constructor(
    @InjectModel(DesignSample.name) private model: Model<DesignSampleDocument>,
  ) {}

  findPublic() {
    return this.model.find({ hidden: false }).sort('order');
  }

  findAll() {
    return this.model.find().sort('order');
  }

  create(dto: CreateDesignSampleDto) {
    return this.model.create(dto);
  }

  async update(id: string, dto: UpdateDesignSampleDto) {
    const sample = await this.model.findByIdAndUpdate(id, dto, { returnDocument: 'after' });
    if (!sample) throw new NotFoundException('Không tìm thấy mẫu thiết kế');
    return sample;
  }

  async remove(id: string) {
    const sample = await this.model.findByIdAndDelete(id);
    if (!sample) throw new NotFoundException('Không tìm thấy mẫu thiết kế');
    return { deleted: true };
  }
}
