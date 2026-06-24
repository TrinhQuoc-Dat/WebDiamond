import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '../app.module';
import { User } from '../auth/schemas/user.schema';
import { Category } from '../categories/schemas/category.schema';
import { Banner } from '../banners/schemas/banner.schema';
import { Contact } from '../contacts/schemas/contact.schema';
import { Product } from '../products/schemas/product.schema';

const defaultCategories = [
  { slug: 'ring', name: 'Nhẫn', order: 1, hidden: false },
  { slug: 'bracelet', name: 'Vòng tay', order: 2, hidden: false },
  { slug: 'necklace', name: 'Dây chuyền', order: 3, hidden: false },
  { slug: 'earring', name: 'Bông tai', order: 4, hidden: false },
];

const defaultBanners = [
  {
    title: 'GODG1FT',
    subtitle: 'Shop All',
    image: '/videobanner.mp4',
    type: 'video',
    link: '/shop',
    active: true,
    muted: true,
    hidden: false,
    order: 1,
  },
  {
    title: 'Luxury Collection',
    subtitle: 'New Arrival',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=1600&q=80&auto=format&fit=crop',
    type: 'image',
    link: '/shop',
    active: false,
    muted: true,
    hidden: false,
    order: 2,
  },
];

const defaultContacts = [
  {
    name: 'Nguyễn Văn An',
    email: 'an.nguyen@gmail.com',
    phone: '0912345678',
    message: 'Tôi muốn nhận thông tin tư vấn thiết kế nhẫn cưới kim cương 18K bản giới hạn. Xin cám ơn!',
    createdAt: new Date('2026-06-20T10:30:00.000Z'),
    status: 'Mới',
  },
  {
    name: 'Trần Thị Bình',
    email: 'binh.tran@yahoo.com',
    phone: '0987654321',
    message: 'Sản phẩm dây chuyền \'NECKLACE LIGHTNING III\' hiện tại cửa hàng ở TP.HCM còn hàng trưng bày không ạ? Tôi muốn qua xem trực tiếp.',
    createdAt: new Date('2026-06-19T14:15:00.000Z'),
    status: 'Đang xử lý',
  },
  {
    name: 'Lê Hoàng Nam',
    email: 'nam.le@outlook.com',
    phone: '0905556677',
    message: 'Hỗ trợ xuất hóa đơn VAT cho doanh nghiệp khi mua sản phẩm lắc tay vàng trắng đính kim cương không?',
    createdAt: new Date('2026-06-18T09:00:00.000Z'),
    status: 'Đã xử lý',
  },
  {
    name: 'Phạm Minh Hoàng',
    email: 'hoang.pham@gmail.com',
    phone: '0934112233',
    message: 'Tôi ở Hà Nội, đặt giao hàng hỏa tốc trong ngày thì phí ship và thời gian nhận hàng như thế nào?',
    createdAt: new Date('2026-06-20T16:45:00.000Z'),
    status: 'Mới',
  },
];

const SPEC = "PLEASE NOTE: IT WILL TAKE FROM 1 TO 3 WORKING DAYS TO SHIP THIS ITEM. ORDERS OUTSIDE VIETNAM: TAXES AND DUTIES WILL BE PAID BY THE CUSTOMER UPON DELIVERY.";
const DESC = [
  "Handcrafted with precision and intention.",
  "Signature GODG1FT aesthetic — bold, refined, luminous.",
  "Premium materials with a sleek, technical finish.",
  "Designed for those who wear purpose.",
  "True to size. We recommend your standard size for the perfect fit.",
];
const COLORS = [
  { id: "silver", name: "Silver", hex: "#E5E5E5" },
  { id: "gold", name: "Gold", hex: "#D4AF37" },
];

const baseNecklace = {
  name: "NECKLACE LIGHTNING",
  category: "necklace",
  price: "50.000.000 VND",
  priceValue: 50000000,
  image: "/shop.png",
  images: ["/shop.png", "/shop.png", "/shop.png", "/shop.png", "/shop.png"],
  tag: null,
  description: DESC,
  spec: SPEC,
  colors: COLORS,
  sizes: ["40", "45", "50", "55"],
  style: "",
  collection: "",
  featured: false,
  hidden: false,
};

const baseBracelet = {
  name: "BRACELETS LIGHTNING",
  category: "bracelet",
  price: "50.000.000 VND",
  priceValue: 50000000,
  image: "/shop.png",
  images: ["/shop.png", "/shop.png", "/shop.png", "/shop.png", "/shop.png"],
  tag: null,
  description: DESC,
  spec: SPEC,
  colors: COLORS,
  sizes: ["16", "17", "18", "19"],
  style: "",
  collection: "",
  featured: false,
  hidden: false,
};

const defaultProducts: any[] = [];
for (let i = 1; i <= 15; i++) {
  defaultProducts.push({
    ...baseNecklace,
    slug: `necklace-lightning-${i}`,
    name: `NECKLACE LIGHTNING ${i}`,
    order: i,
  });
}
for (let i = 1; i <= 15; i++) {
  defaultProducts.push({
    ...baseBracelet,
    slug: `bracelets-shining-${i}`,
    name: `BRACELETS SHINING ${i}`,
    order: i + 15,
  });
}

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const config = app.get(ConfigService);

  // Seed Admin User
  const userModel = app.get<Model<any>>(getModelToken(User.name));
  const email = config.get<string>('adminEmail')!;
  const exists = await userModel.findOne({ email });
  if (!exists) {
    await userModel.create({
      email,
      passwordHash: await bcrypt.hash(config.get<string>('adminPassword')!, 10),
      name: 'Administrator',
      role: 'admin',
    });
    console.log(`✓ Đã tạo admin: ${email}`);
  } else {
    console.log('Admin đã tồn tại, bỏ qua.');
  }

  // Seed Categories
  const categoryModel = app.get<Model<any>>(getModelToken(Category.name));
  const categoryCount = await categoryModel.countDocuments();
  if (categoryCount === 0) {
    await categoryModel.create(defaultCategories);
    console.log('✓ Seeded categories');
  } else {
    console.log('Categories đã tồn tại, bỏ qua.');
  }

  // Seed Banners
  const bannerModel = app.get<Model<any>>(getModelToken(Banner.name));
  const bannerCount = await bannerModel.countDocuments();
  if (bannerCount === 0) {
    await bannerModel.create(defaultBanners);
    console.log('✓ Seeded banners');
  } else {
    console.log('Banners đã tồn tại, bỏ qua.');
  }

  // Seed Contacts
  const contactModel = app.get<Model<any>>(getModelToken(Contact.name));
  const contactCount = await contactModel.countDocuments();
  if (contactCount === 0) {
    await contactModel.create(defaultContacts);
    console.log('✓ Seeded contacts');
  } else {
    console.log('Contacts đã tồn tại, bỏ qua.');
  }

  // Seed Products
  const productModel = app.get<Model<any>>(getModelToken(Product.name));
  const productCount = await productModel.countDocuments();
  if (productCount === 0) {
    await productModel.create(defaultProducts);
    console.log('✓ Seeded products');
  } else {
    console.log('Products đã tồn tại, bỏ qua.');
  }

  await app.close();
}
seed();
