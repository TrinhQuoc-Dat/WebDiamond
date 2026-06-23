import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PageDocument = HydratedDocument<Page>;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (_doc, ret: any) => { ret.id = ret._id; delete ret._id; delete ret.__v; },
  },
})
export class Page {
  @Prop({ required: true, unique: true, index: true, enum: ['about', 'size-guide', 'warranty'] })
  key: string;

  @Prop({ default: '' })
  title: string;

  @Prop({ default: '' })
  content: string;

  @Prop({ type: [String], default: [] })
  images: string[];
}

export const PageSchema = SchemaFactory.createForClass(Page);
