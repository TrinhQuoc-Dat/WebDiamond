import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type CategoryDocument = HydratedDocument<Category>;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (_d, r: any) => { r.id = r._id; delete r._id; delete r.__v; }
  }
})
export class Category {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, unique: true, index: true, trim: true }) slug: string;
  @Prop({ default: 0 }) order: number;
  @Prop({ default: false }) hidden: boolean;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
