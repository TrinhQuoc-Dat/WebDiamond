import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banner, BannerDocument } from './schemas/banner.schema';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Injectable()
export class BannersService {
  constructor(@InjectModel(Banner.name) private model: Model<BannerDocument>) {}

  findPublic() {
    return this.model.find({ hidden: false }).sort('order');
  }

  findActive() {
    return this.model.findOne({ active: true, hidden: false });
  }

  findAll() {
    return this.model.find().sort('order');
  }

  async create(dto: CreateBannerDto) {
    if (dto.active) {
      await this.model.updateMany({}, { active: false });
    }
    return this.model.create(dto);
  }

  async update(id: string, dto: UpdateBannerDto) {
    if (dto.active) {
      await this.model.updateMany({ _id: { $ne: id } }, { active: false });
    }
    const b = await this.model.findByIdAndUpdate(id, dto, { returnDocument: 'after' });
    if (!b) throw new NotFoundException('Không tìm thấy banner');
    return b;
  }

  async activate(id: string) {
    await this.model.updateMany({ _id: { $ne: id } }, { active: false });
    const b = await this.model.findByIdAndUpdate(id, { active: true }, { returnDocument: 'after' });
    if (!b) throw new NotFoundException('Không tìm thấy banner');
    return b;
  }

  async remove(id: string) {
    const b = await this.model.findByIdAndDelete(id);
    if (!b) throw new NotFoundException('Không tìm thấy banner');
    if (b.active) {
      let fallback = await this.model.findOne({ hidden: false }).sort('order');
      if (!fallback) {
        fallback = await this.model.findOne().sort('order');
      }
      if (fallback) {
        fallback.active = true;
        await fallback.save();
      }
    }
    return { deleted: true };
  }
}
