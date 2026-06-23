import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SettingDocument = HydratedDocument<Setting>;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (_doc, ret: any) => { ret.id = ret._id; delete ret._id; delete ret.__v; },
  },
})
export class Setting {
  @Prop({ default: '' })
  gtmId: string;

  @Prop({ default: false })
  trackingEnabled: boolean;

  @Prop({ default: '' })
  contactAddress: string;

  @Prop({ default: '' })
  contactHotline: string;

  @Prop({ default: '' })
  contactEmail: string;

  @Prop({ default: '' })
  googleMapUrl: string;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
