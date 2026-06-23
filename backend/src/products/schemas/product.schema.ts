import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ _id: false })
export class ProductColor {
  @Prop({ required: true }) id: string;
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) hex: string;
}
const ProductColorSchema = SchemaFactory.createForClass(ProductColor);

@Schema({
  timestamps: true,
  suppressReservedKeysWarning: true,
  toJSON: {
    virtuals: true,
    transform: (_doc, ret: any) => { ret.id = ret._id; delete ret._id; delete ret.__v; },
  },
})
export class Product {
  @Prop({ required: true, unique: true, index: true, trim: true }) slug: string;
  @Prop({ required: true }) name: string;
  @Prop({ required: true, index: true }) category: string;
  @Prop({ required: true }) price: string;
  @Prop({ default: 0 }) priceValue: number;
  @Prop({ required: true }) image: string;
  @Prop({ type: [String], default: [] }) images: string[];
  @Prop({ type: String, default: null }) tag: string | null;
  @Prop({ type: [String], default: [] }) description: string[];
  @Prop({ default: '' }) spec: string;
  @Prop({ type: [ProductColorSchema], default: [] }) colors: ProductColor[];
  @Prop({ type: [String], default: [] }) sizes: string[];
  @Prop({ default: '' }) style: string;
  @Prop({ default: '' }) collection: string;
  @Prop({ default: false, index: true }) featured: boolean;
  @Prop({ default: false, index: true }) hidden: boolean;
  @Prop({ default: 0 }) order: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
