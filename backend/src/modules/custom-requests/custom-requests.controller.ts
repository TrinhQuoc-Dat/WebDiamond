import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards,
} from '@nestjs/common';
import { CustomRequestsService } from './custom-requests.service';
import { CreateCustomRequestDto } from './dto/create-custom-request.dto';
import { UpdateCustomRequestStatusDto } from './dto/update-status.dto';
import { QueryCustomRequestDto } from './dto/query-custom-request.dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('custom-requests')
export class CustomRequestsPublicController {
  constructor(private service: CustomRequestsService) {}

  @Public()
  @Post()
  create(@Body() dto: CreateCustomRequestDto) {
    return this.service.create(dto);
  }
}

@UseGuards(JwtAuthGuard)
@Controller('admin/custom-requests')
export class CustomRequestsAdminController {
  constructor(private service: CustomRequestsService) {}

  @Get()
  list(@Query() q: QueryCustomRequestDto) {
    return this.service.findPaged(q);
  }

  @Get(':id')
  detail(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id/status')
  status(@Param('id') id: string, @Body() dto: UpdateCustomRequestStatusDto) {
    return this.service.updateStatus(id, dto.status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
