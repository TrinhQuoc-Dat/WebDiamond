import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BannerDocument = HydratedDocument<Banner>;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (_doc, ret: any) => { ret.id = ret._id; delete ret._id; delete ret.__v; },
  },
})
export class Banner {
  @Prop({ default: 'WebDiamond' }) title: string;
  @Prop({ required: true }) subtitle: string;
  @Prop({ required: true }) image: string;
  @Prop({ default: 'image', enum: ['image', 'video'] }) type: string;
  @Prop({ default: '/shop' }) link: string;
  @Prop({ default: false, index: true }) active: boolean;
  @Prop({ default: true }) muted: boolean;
  @Prop({ default: false }) hidden: boolean;
  @Prop({ default: 0 }) order: number;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
