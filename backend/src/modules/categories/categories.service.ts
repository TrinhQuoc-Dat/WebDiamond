import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ReorderDto } from './dto/reorder.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private model: Model<CategoryDocument>) {}

  findPublic() {
    return this.model.find({ hidden: false }).sort('order');
  }

  findAll() {
    return this.model.find().sort('order');
  }

  create(dto: CreateCategoryDto) {
    return this.model.create(dto);
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const c = await this.model.findByIdAndUpdate(id, dto, { new: true });
    if (!c) throw new NotFoundException('Không tìm thấy danh mục');
    return c;
  }

  async remove(id: string) {
    const c = await this.model.findByIdAndDelete(id);
    if (!c) throw new NotFoundException('Không tìm thấy danh mục');
    return { deleted: true };
  }

  async reorder(dto: ReorderDto) {
    await Promise.all(dto.items.map((i) => this.model.findByIdAndUpdate(i.id, { order: i.order })));
    return this.findAll();
  }
}
