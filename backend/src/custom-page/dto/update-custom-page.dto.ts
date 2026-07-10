import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

export class SlideDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsString()
  year?: string;

  @IsOptional()
  @IsString()
  image?: string;
}

export class UpdateCustomPageDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SlideDto)
  showcase?: SlideDto[];
}
