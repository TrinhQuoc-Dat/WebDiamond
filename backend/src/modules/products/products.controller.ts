import {
  Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

// ---- ROUTES PUBLIC ----
@Controller('products')
export class ProductsPublicController {
  constructor(private service: ProductsService) {}

  @Public() @Get()
  list(@Query() q: QueryProductDto) {
    return this.service.findPaged(q, true);
  }

  @Public() @Get(':slug')
  detail(@Param('slug') slug: string) {
    return this.service.findBySlug(slug, true);
  }

  @Public() @Get(':slug/related')
  related(@Param('slug') slug: string) {
    return this.service.findRelated(slug);
  }
}

// ---- ROUTES ADMIN ----
@UseGuards(JwtAuthGuard)
@Controller('admin/products')
export class ProductsAdminController {
  constructor(private service: ProductsService) {}

  @Get()
  list(@Query() q: QueryProductDto) {
    return this.service.findPaged(q, false);
  }

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Patch(':id/visibility')
  visibility(@Param('id') id: string) {
    return this.service.toggleVisibility(id);
  }

  @Patch(':id/featured')
  featured(@Param('id') id: string) {
    return this.service.toggleFeatured(id);
  }
}
