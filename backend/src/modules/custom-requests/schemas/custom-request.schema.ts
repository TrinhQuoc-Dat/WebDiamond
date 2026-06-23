import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomRequestDocument = HydratedDocument<CustomRequest>;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (_doc, ret: any) => { ret.id = ret._id; delete ret._id; delete ret.__v; },
  },
})
export class CustomRequest {
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) email: string;
  @Prop({ default: '' }) phone: string;
  @Prop({ required: true }) idea: string;
  @Prop({ default: '' }) budget: string;
  @Prop({ default: 'Mới', enum: ['Mới', 'Đang xử lý', 'Hoàn thành'] }) status: string;
}

export const CustomRequestSchema = SchemaFactory.createForClass(CustomRequest);
