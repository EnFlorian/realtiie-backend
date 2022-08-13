import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { GetUserMiddleware } from './middlewares/user.middleware';
import { JwtModule } from '@nestjs/jwt';

import { PropertiesModule } from './properties/properties.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [UserModule, PrismaModule, JwtModule, PropertiesModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GetUserMiddleware).forRoutes('*');
  }
}
