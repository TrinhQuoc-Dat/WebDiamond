import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Public } from '../common/decorators/public.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('settings')
export class SettingsPublicController {
  constructor(private service: SettingsService) {}

  @Public()
  @Get()
  get() {
    return this.service.get();
  }
}

@UseGuards(JwtAuthGuard)
@Controller('admin/settings')
export class SettingsAdminController {
  constructor(private service: SettingsService) {}

  @Put()
  update(@Body() dto: UpdateSettingDto) {
    return this.service.update(dto);
  }
}
