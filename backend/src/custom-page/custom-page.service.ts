import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomPage, CustomPageDocument } from './schemas/custom-page.schema';
import { UpdateCustomPageDto } from './dto/update-custom-page.dto';

@Injectable()
export class CustomPageService {
  constructor(
    @InjectModel(CustomPage.name) private model: Model<CustomPageDocument>,
  ) {}

  async get() {
    return this.model.findOneAndUpdate(
      {},
      { $setOnInsert: {} },
      { returnDocument: 'after', upsert: true },
    );
  }

  async update(dto: UpdateCustomPageDto) {
    return this.model.findOneAndUpdate(
      {},
      { $set: dto },
      { returnDocument: 'after', upsert: true },
    );
  }
}
