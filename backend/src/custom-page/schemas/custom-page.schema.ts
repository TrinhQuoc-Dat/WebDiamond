import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomPageDocument = HydratedDocument<CustomPage>;

// ── Sub-schema: 1 slide của slider showcase (phần trên trang /custom) ──
@Schema({ _id: false })
export class Slide {
  @Prop({ default: '' }) title: string;
  @Prop({ default: '' }) subtitle: string;
  @Prop({ default: '' }) year: string;
  @Prop({ default: '' }) image: string;
}
export const SlideSchema = SchemaFactory.createForClass(Slide);

// Dữ liệu mặc định = đúng nội dung đang gán cứng trong CustomShowcase.tsx
const DEFAULT_SHOWCASE = [
  { title: 'YOUNG THUG', subtitle: 'NECKLACE LIGHTNING', year: '2026', image: '/shop.png' },
  { title: 'TRAVIS SCOTT', subtitle: 'DIAMOND CHAIN', year: '2025', image: '/hero.png' },
  { title: 'DRAKE', subtitle: 'LUXURY PENDANT', year: '2024', image: '/shop.png' },
  { title: 'LIL BABY', subtitle: 'ICE CHOKER', year: '2024', image: '/hero.png' },
  { title: '21 SAVAGE', subtitle: 'SKULL RING', year: '2023', image: '/shop.png' },
  { title: 'FUTURE', subtitle: 'CUBAN LINK', year: '2023', image: '/hero.png' },
  { title: 'GUNNA', subtitle: 'EMERALD BRACELET', year: '2022', image: '/shop.png' },
];

@Schema({
  timestamps: true,
  toJSON: {
    transform: (_doc, ret: any) => { ret.id = ret._id; delete ret._id; delete ret.__v; },
  },
})
export class CustomPage {
  @Prop({ type: [SlideSchema], default: () => DEFAULT_SHOWCASE })
  showcase: Slide[];
}

export const CustomPageSchema = SchemaFactory.createForClass(CustomPage);
