import { Injectable } from '@nestjs/common';

@Injectable()
export class badgeService {
  getHello(): string {
    return 'Hello World!';
  }
}
