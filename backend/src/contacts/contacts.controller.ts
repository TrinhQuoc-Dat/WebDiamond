import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactStatusDto } from './dto/update-status.dto';
import { QueryContactDto } from './dto/query-contact.dto';
import { Public } from '../common/decorators/public.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('contacts')
export class ContactsPublicController {
  constructor(private service: ContactsService) {}

  @Public()
  @Post()
  create(@Body() dto: CreateContactDto) {
    return this.service.create(dto);
  }
}

@UseGuards(JwtAuthGuard)
@Controller('admin/contacts')
export class ContactsAdminController {
  constructor(private service: ContactsService) {}

  @Get()
  list(@Query() q: QueryContactDto) {
    return this.service.findPaged(q);
  }

  @Get(':id')
  detail(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id/status')
  status(@Param('id') id: string, @Body() dto: UpdateContactStatusDto) {
    return this.service.updateStatus(id, dto.status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
