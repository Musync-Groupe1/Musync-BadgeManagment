import { Module } from '@nestjs/common';
import { BadgeModule } from './badge.module';
import { PrismaModule } from 'prisma/prisma.module';
@Module({
  imports: [BadgeModule, PrismaModule],
})
export class AppModule {}
