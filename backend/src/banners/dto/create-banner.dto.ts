import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBannerDto {
  @IsOptional() @IsString() title?: string;
  @IsString() subtitle: string;
  @IsString() image: string;
  @IsOptional() @IsEnum(['image', 'video']) type?: string;
  @IsOptional() @IsString() link?: string;
  @IsOptional() @IsBoolean() active?: boolean;
  @IsOptional() @IsBoolean() muted?: boolean;
  @IsOptional() @IsBoolean() hidden?: boolean;
  @IsOptional() @IsNumber() order?: number;
}
