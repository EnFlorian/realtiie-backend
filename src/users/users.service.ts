import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const { name, email, password } = registerUserDto;
    //check if user already exists
    const user = await this.findByEmail(email);
    if (user) {
      throw new Error('User already exists');
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //create user
    await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    //login user
    return this.login({ email, password });
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    //check if user exists
    const user = await this.findByEmail(email);
    if (!user) {
      throw new Error('User does not exist');
    }
    //check if password is correct
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid password');
    }
    //create token
    const payload = { email, userId: user.id };
    const token = this.jwtService.sign(payload);
    return { token };
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findByEmail(email: string) {
    const user = this.prismaService.user.findUnique({ where: { email } });
    return user;
  }

  findOne(id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({ data: updateUserDto, where: { id } });
  }

  remove(id: number) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
