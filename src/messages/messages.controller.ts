import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { User, UserInfo } from 'src/decorators/user.decorator';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  create(@Body() createMessageDto: CreateMessageDto, @User() user: UserInfo) {
    return this.messagesService.create(createMessageDto, user);
  }

  @UseGuards(AdminGuard)
  @Get(':propertyId')
  findAllByPropertyId(@Param('propertyId') propertyId: number) {
    return this.messagesService.findAllByPropertyId(+propertyId);
  }

  @UseGuards(AdminGuard)
  @Delete(':messageId')
  delete(@Param('messageId') messageId: number) {
    return this.messagesService.delete(+messageId);
  }
}
