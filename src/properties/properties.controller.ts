import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get()
  findAll() {
    return this.propertiesService.findAll();
  }

  @UseGuards(AdminGuard)
  @Delete(':propertyId')
  delete(@Param('propertyId') propertyId: number) {
    return this.propertiesService.delete(+propertyId);
  }
}
