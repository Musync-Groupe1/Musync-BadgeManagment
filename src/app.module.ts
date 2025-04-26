import { Module } from '@nestjs/common';
import { BadgeModule } from './badge.module';
import { PrismaModule } from 'prisma/prisma.module';
import { KafkaModule } from './kafka/kafka.module';
@Module({
  imports: [BadgeModule, PrismaModule, KafkaModule],
})
export class AppModule {}
