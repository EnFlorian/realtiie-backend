import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET })],
  providers: [UserService],
})
export class UserModule {}
