import {
  Body, Controller, Get, Param, Put, UseGuards, BadRequestException,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { UpdatePageDto } from './dto/update-page.dto';
import { Public } from '../common/decorators/public.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

const VALID_KEYS = ['about', 'size-guide', 'warranty'];

function validateKey(key: string) {
  if (!VALID_KEYS.includes(key)) {
    throw new BadRequestException('Khóa trang không hợp lệ');
  }
}

@Controller('pages')
export class PagesPublicController {
  constructor(private service: PagesService) {}

  @Public()
  @Get(':key')
  get(@Param('key') key: string) {
    validateKey(key);
    return this.service.getByKey(key);
  }
}

@UseGuards(JwtAuthGuard)
@Controller('admin/pages')
export class PagesAdminController {
  constructor(private service: PagesService) {}

  @Put(':key')
  update(@Param('key') key: string, @Body() dto: UpdatePageDto) {
    validateKey(key);
    return this.service.updateByKey(key, dto);
  }
}
