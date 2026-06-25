import { IsIn } from 'class-validator';
export class UpdateContactStatusDto {
  @IsIn(['Mới', 'Đang xử lý', 'Đã xử lý']) status: string;
}
