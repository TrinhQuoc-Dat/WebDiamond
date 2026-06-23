import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Setting, SettingDocument } from './schemas/setting.schema';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Setting.name) private model: Model<SettingDocument>,
  ) {}

  async get() {
    return this.model.findOneAndUpdate(
      {},
      { $setOnInsert: {} },
      { returnDocument: 'after', upsert: true },
    );
  }

  async update(dto: UpdateSettingDto) {
    return this.model.findOneAndUpdate(
      {},
      { $set: dto },
      { returnDocument: 'after', upsert: true },
    );
  }
}
