import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { User, UserInfo } from 'src/decorators/user.decorator';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@UseGuards(AuthenticationGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto, @User() user: UserInfo) {
    return this.messagesService.create(createMessageDto, user);
  }

  @Get(':propertyId')
  findAllByPropertyId(@Param('propertyId') propertyId: number) {
    return this.messagesService.findAllByPropertyId(+propertyId);
  }

  @Delete(':messageId')
  delete(@Param('messageId') messageId: number) {
    return this.messagesService.delete(+messageId);
  }
}
