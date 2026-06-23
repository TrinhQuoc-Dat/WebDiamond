import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('admin/dashboard')
export class DashboardController {
  constructor(private service: DashboardService) {}

  @Get('stats')
  stats() {
    return this.service.stats();
  }

  @Get('contacts-chart')
  chart(@Query('range') range: 'day' | 'month' | 'year' = 'day') {
    return this.service.contactsChart(range);
  }
}
