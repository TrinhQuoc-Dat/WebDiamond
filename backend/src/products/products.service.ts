import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private model: Model<ProductDocument>) {}

  private buildFilter(q: QueryProductDto, publicOnly: boolean) {
    const filter: any = {};
    if (publicOnly) filter.hidden = false;
    else if (q.visibility === 'visible') filter.hidden = false;
    else if (q.visibility === 'hidden') filter.hidden = true;
    if (q.category) filter.category = q.category;
    if (q.featured === 'true') filter.featured = true;
    if (q.search) {
      filter.$or = [
        { name: { $regex: q.search, $options: 'i' } },
        { slug: { $regex: q.search, $options: 'i' } },
      ];
    }
    return filter;
  }

  async findPaged(q: QueryProductDto, publicOnly: boolean) {
    const page = q.page ?? 1;
    const limit = q.limit ?? 12;
    const filter = this.buildFilter(q, publicOnly);
    const [data, total] = await Promise.all([
      this.model.find(filter).sort(q.sort ?? '-createdAt').skip((page - 1) * limit).limit(limit),
      this.model.countDocuments(filter),
    ]);
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findBySlug(slug: string, publicOnly = true) {
    const filter: any = { slug };
    if (publicOnly) filter.hidden = false;
    const product = await this.model.findOne(filter);
    if (!product) throw new NotFoundException('Không tìm thấy sản phẩm');
    return product;
  }

  async findRelated(slug: string) {
    const product = await this.findBySlug(slug, true);
    return this.model.find({ category: product.category, slug: { $ne: slug }, hidden: false }).limit(4);
  }

  create(dto: CreateProductDto) {
    return this.model.create(dto as any);
  }

  async update(id: string, dto: UpdateProductDto) {
    const updated = await this.model.findByIdAndUpdate(id, dto as any, { returnDocument: 'after' });
    if (!updated) throw new NotFoundException('Không tìm thấy sản phẩm');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.model.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Không tìm thấy sản phẩm');
    return { deleted: true };
  }

  async toggleVisibility(id: string) {
    const p = await this.model.findById(id);
    if (!p) throw new NotFoundException('Không tìm thấy sản phẩm');
    p.hidden = !p.hidden;
    return p.save();
  }

  async toggleFeatured(id: string) {
    const p = await this.model.findById(id);
    if (!p) throw new NotFoundException('Không tìm thấy sản phẩm');
    p.featured = !p.featured;
    return p.save();
  }
}
