import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomRequest, CustomRequestDocument } from './schemas/custom-request.schema';
import { CreateCustomRequestDto } from './dto/create-custom-request.dto';
import { QueryCustomRequestDto } from './dto/query-custom-request.dto';

@Injectable()
export class CustomRequestsService {
  constructor(
    @InjectModel(CustomRequest.name) private model: Model<CustomRequestDocument>,
  ) {}

  create(dto: CreateCustomRequestDto) {
    return this.model.create(dto);
  }

  async findPaged(q: QueryCustomRequestDto) {
    const page = q.page ?? 1;
    const limit = q.limit ?? 12;
    const filter: any = {};

    if (q.status) {
      filter.status = q.status;
    }

    if (q.search) {
      filter.$or = [
        { name: { $regex: q.search, $options: 'i' } },
        { email: { $regex: q.search, $options: 'i' } },
        { phone: { $regex: q.search, $options: 'i' } },
        { idea: { $regex: q.search, $options: 'i' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.model.find(filter).sort('-createdAt').skip((page - 1) * limit).limit(limit),
      this.model.countDocuments(filter),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string) {
    const request = await this.model.findById(id);
    if (!request) throw new NotFoundException('Không tìm thấy yêu cầu thiết kế');
    return request;
  }

  async updateStatus(id: string, status: string) {
    const request = await this.model.findByIdAndUpdate(id, { status }, { new: true });
    if (!request) throw new NotFoundException('Không tìm thấy yêu cầu thiết kế');
    return request;
  }

  async remove(id: string) {
    const request = await this.model.findByIdAndDelete(id);
    if (!request) throw new NotFoundException('Không tìm thấy yêu cầu thiết kế');
    return { deleted: true };
  }
}
