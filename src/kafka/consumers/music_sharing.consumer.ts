import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '../kafka.service';
import { PrismaService } from 'prisma/prisma.service';
import { KafkaMessage } from 'kafkajs';

interface CommentMessage {
  user_id: number;
}

@Injectable()
export class MusicSharingConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private prisma: PrismaService,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume({
      topic: { topic: 'music_sharing' },
      config: { groupId: 'music-group' },
      onMessage: async (message: KafkaMessage) => {
        try {
          const data = JSON.parse(
            message.value?.toString() ?? '',
          ) as CommentMessage;
          await this.prisma.user.update({
            where: {
              user_id: data.user_id,
            },
            data: { music_sharing_count: { increment: 1 } },
          });
        } catch (error) {
          console.log('Une erreur est survenue !', error);
        }
      },
    });
  }
}
