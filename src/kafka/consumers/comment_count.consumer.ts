import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '../consumer.service';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CommentConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private prisma: PrismaService,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume({
      topic: { topic: 'new_comment' },
      config: { groupId: 'badge-consumer' },
      onMessage: async (message: any) => {
        const data = JSON.parse(message.value?.toString());
        await this.prisma.user.update({
          where: {
            user_id: data.user_id,
          },
          data: { comment_count: { increment: 1 } },
        });
        throw new Error('Une erreur est survenue !');
      },
    });
  }
}
