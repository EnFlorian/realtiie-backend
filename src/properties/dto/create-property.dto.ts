import { Message } from '@prisma/client';

export class CreatePropertyDto {
  name: string;
  image: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  fireplace: boolean;
  garage: boolean;
  swimmingPool: boolean;
  price: number;
  messages: Message;
}
