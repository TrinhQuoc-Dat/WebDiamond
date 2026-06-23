import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';
import { QueryContactDto } from './dto/query-contact.dto';

@Injectable()
export class ContactsService {
  constructor(@InjectModel(Contact.name) private model: Model<ContactDocument>) {}

  create(dto: CreateContactDto) {
    return this.model.create(dto);
  }

  async findPaged(q: QueryContactDto) {
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
      ];
    }

    const [data, total] = await Promise.all([
      this.model.find(filter).sort('-createdAt').skip((page - 1) * limit).limit(limit),
      this.model.countDocuments(filter),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string) {
    const contact = await this.model.findById(id);
    if (!contact) throw new NotFoundException('Không tìm thấy thông tin liên hệ');
    return contact;
  }

  async updateStatus(id: string, status: string) {
    const contact = await this.model.findByIdAndUpdate(id, { status }, { new: true });
    if (!contact) throw new NotFoundException('Không tìm thấy thông tin liên hệ');
    return contact;
  }

  async remove(id: string) {
    const contact = await this.model.findByIdAndDelete(id);
    if (!contact) throw new NotFoundException('Không tìm thấy thông tin liên hệ');
    return { deleted: true };
  }
}
