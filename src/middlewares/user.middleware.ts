import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GetUserMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: () => void) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      next();
      return;
    }

    try {
      const user = this.jwtService.decode(token);
      if (user) {
        req['user'] = user;
      }
    } catch (err) {
      console.log('Error: ', err);
    }
    next();
  }
}
