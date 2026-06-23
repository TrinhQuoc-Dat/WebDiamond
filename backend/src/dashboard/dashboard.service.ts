import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../products/schemas/product.schema';
import { Banner } from '../banners/schemas/banner.schema';
import { Contact } from '../contacts/schemas/contact.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Product.name) private products: Model<any>,
    @InjectModel(Banner.name) private banners: Model<any>,
    @InjectModel(Contact.name) private contacts: Model<any>,
  ) {}

  async stats() {
    const [totalProducts, totalBanners, totalContacts, pendingContacts, resolvedContacts] =
      await Promise.all([
        this.products.countDocuments(),
        this.banners.countDocuments(),
        this.contacts.countDocuments(),
        this.contacts.countDocuments({ status: 'Mới' }),
        this.contacts.countDocuments({ status: 'Đã xử lý' }),
      ]);
    const resolutionRate = totalContacts ? Math.round((resolvedContacts / totalContacts) * 100) : 0;
    return { totalProducts, totalBanners, totalContacts, pendingContacts, resolutionRate };
  }

  async contactsChart(range: 'day' | 'month' | 'year') {
    const format = range === 'year' ? '%Y' : range === 'month' ? '%Y-%m' : '%Y-%m-%d';
    const rows = await this.contacts.aggregate([
      { $group: { _id: { $dateToString: { format, date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    return rows.map((r) => ({ label: r._id, count: r.count }));
  }
}
