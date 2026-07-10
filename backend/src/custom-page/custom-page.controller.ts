import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { CustomPageService } from './custom-page.service';
import { UpdateCustomPageDto } from './dto/update-custom-page.dto';
import { Public } from '../common/decorators/public.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('custom-page')
export class CustomPagePublicController {
  constructor(private service: CustomPageService) {}

  @Public()
  @Get()
  get() {
    return this.service.get();
  }
}

@UseGuards(JwtAuthGuard)
@Controller('admin/custom-page')
export class CustomPageAdminController {
  constructor(private service: CustomPageService) {}

  @Put()
  update(@Body() dto: UpdateCustomPageDto) {
    return this.service.update(dto);
  }
}
