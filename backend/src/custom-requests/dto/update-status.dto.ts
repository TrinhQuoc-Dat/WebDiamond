import { IsIn } from 'class-validator';

export class UpdateCustomRequestStatusDto {
  @IsIn(['Mới', 'Đang xử lý', 'Hoàn thành'])
  status: string;
}
