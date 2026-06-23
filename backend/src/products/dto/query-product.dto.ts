import { Type } from 'class-transformer';
import { IsBooleanString, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class QueryProductDto {
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsBooleanString() featured?: string;
  @IsOptional() @IsString() visibility?: string; // 'visible' | 'hidden' | undefined (admin)
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page?: number = 1;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) limit?: number = 12;
  @IsOptional() @IsString() sort?: string; // ví dụ '-createdAt'
}
