import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateCategoryDto {
  @IsString() name: string;
  @IsString() slug: string;
  @IsOptional() @IsNumber() order?: number;
  @IsOptional() @IsBoolean() hidden?: boolean;
}
