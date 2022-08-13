import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';

@Injectable()
export class PropertiesService {
  constructor(private prismaService: PrismaService) {}

  create(createPropertyDto: CreatePropertyDto) {
    return this.prismaService.property.create({
      data: {
        ...createPropertyDto,
      },
    });
  }

  findAll() {
    return this.prismaService.property.findMany();
  }

  async delete(propertyId: number) {
    await this.prismaService.message.deleteMany({
      where: {
        propertyId: propertyId,
      },
    });

    return this.prismaService.property.delete({
      where: {
        id: propertyId,
      },
    });
  }
}
