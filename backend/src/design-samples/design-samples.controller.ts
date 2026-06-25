import {
  Body, Controller, Delete, Get, Param, Post, Put, UseGuards,
} from '@nestjs/common';
import { DesignSamplesService } from './design-samples.service';
import { CreateDesignSampleDto } from './dto/create-design-sample.dto';
import { UpdateDesignSampleDto } from './dto/update-design-sample.dto';
import { Public } from '../common/decorators/public.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('design-samples')
export class DesignSamplesPublicController {
  constructor(private service: DesignSamplesService) {}

  @Public()
  @Get()
  list() {
    return this.service.findPublic();
  }
}

@UseGuards(JwtAuthGuard)
@Controller('admin/design-samples')
export class DesignSamplesAdminController {
  constructor(private service: DesignSamplesService) {}

  @Get()
  list() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() dto: CreateDesignSampleDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDesignSampleDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
