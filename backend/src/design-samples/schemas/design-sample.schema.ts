import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DesignSampleDocument = HydratedDocument<DesignSample>;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (_doc, ret: any) => { ret.id = ret._id; delete ret._id; delete ret.__v; },
  },
})
export class DesignSample {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  image: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: false })
  hidden: boolean;
}

export const DesignSampleSchema = SchemaFactory.createForClass(DesignSample);
