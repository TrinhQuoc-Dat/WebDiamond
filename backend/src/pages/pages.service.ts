import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page, PageDocument } from './schemas/page.schema';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {
  constructor(
    @InjectModel(Page.name) private model: Model<PageDocument>,
  ) {}

  async getByKey(key: string) {
    return this.model.findOneAndUpdate(
      { key },
      { $setOnInsert: { key } },
      { returnDocument: 'after', upsert: true },
    );
  }

  async updateByKey(key: string, dto: UpdatePageDto) {
    return this.model.findOneAndUpdate(
      { key },
      { $set: dto },
      { returnDocument: 'after', upsert: true },
    );
  }
}
