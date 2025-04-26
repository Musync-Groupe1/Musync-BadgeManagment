import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '../kafka.service';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PlaylistSharingConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private prisma: PrismaService,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume({
      topic: { topic: 'playlist_sharing' },
      config: { groupId: 'playlist-group' },
      onMessage: async (message: any) => {
        try {
          const data = JSON.parse(message.value?.toString());
          await this.prisma.user.update({
            where: {
              user_id: data.user_id,
            },
            data: { playlist_sharing_count: { increment: 1 } },
          });
        } catch (error) {
          console.log('Une erreur est survenue !');
        }
      },
    });
  }
}
