import { Controller, Get } from '@nestjs/common';
import { badgeService } from '../services/badgeService';

@Controller()
export class badgeController {
  constructor(private readonly badgeService: badgeService) {}

  @Get()
  getHello(): string {
    return this.badgeService.getHello();
  }
}
