import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get()
  findAll() {
    return this.propertiesService.findAll();
  }

  @Delete(':propertyId')
  delete(@Param('propertyId') propertyId: number) {
    return this.propertiesService.delete(propertyId);
  }
}
