import { Module } from '@nestjs/common';

import { BadgeController } from './controllers/badgeController';
import { BadgeService } from './services/badgeService';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { UserService } from './services/userService';
import { UserController } from './controllers/userController';

@Module({
  imports: [HttpModule, ConfigModule.forRoot(), PrismaModule],
  controllers: [BadgeController, UserController],
  providers: [BadgeService, UserService],
})
export class BadgeModule {}
