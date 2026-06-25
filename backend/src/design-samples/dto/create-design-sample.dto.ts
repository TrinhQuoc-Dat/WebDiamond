import { IsBoolean, IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateDesignSampleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsBoolean()
  hidden?: boolean;
}
