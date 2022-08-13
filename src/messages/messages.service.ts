import { Injectable } from '@nestjs/common';
import { UserInfo } from 'src/decorators/user.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(private prismaService: PrismaService) {}

  create(createMessageDto: CreateMessageDto, user: UserInfo) {
    return this.prismaService.message.create({
      data: {
        content: createMessageDto.content,
        id: createMessageDto.id,
        email: user.email,
        propertyId: createMessageDto.propertyId,
      },
    });
  }

  findAllByPropertyId(propertyId: number) {
    return this.prismaService.message.findMany({
      where: {
        propertyId: propertyId,
      },
    });
  }

  delete(messageId: number) {
    return this.prismaService.message.delete({
      where: {
        id: messageId,
      },
    });
  }
}
