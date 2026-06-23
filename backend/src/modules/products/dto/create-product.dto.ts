import { Type } from 'class-transformer';
import {
  IsArray, IsBoolean, IsNumber, IsOptional, IsString, ValidateNested,
} from 'class-validator';

class ColorDto {
  @IsString() id: string;
  @IsString() name: string;
  @IsString() hex: string;
}

export class CreateProductDto {
  @IsString() slug: string;
  @IsString() name: string;
  @IsString() category: string;
  @IsString() price: string;
  @IsOptional() @IsNumber() priceValue?: number;
  @IsString() image: string;
  @IsOptional() @IsArray() @IsString({ each: true }) images?: string[];
  @IsOptional() @IsString() tag?: string | null;
  @IsOptional() @IsArray() @IsString({ each: true }) description?: string[];
  @IsOptional() @IsString() spec?: string;
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => ColorDto) colors?: ColorDto[];
  @IsOptional() @IsArray() @IsString({ each: true }) sizes?: string[];
  @IsOptional() @IsString() style?: string;
  @IsOptional() @IsString() collection?: string;
  @IsOptional() @IsBoolean() featured?: boolean;
  @IsOptional() @IsBoolean() hidden?: boolean;
  @IsOptional() @IsNumber() order?: number;
}
