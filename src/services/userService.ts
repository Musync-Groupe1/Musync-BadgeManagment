import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async addUser(user: {
    is_certified: boolean;
    music_sharing_count: number;
    playlist_sharing_count: number;
    comment_count: number;
  }) {
    return this.prisma.user.create({
      data: {
        is_certified: user.is_certified,
        music_sharing_count: user.music_sharing_count,
        playlist_sharing_count: user.playlist_sharing_count,
        comment_count: user.comment_count,
      },
    });
  }

  async updateUserStats(
    userId: number,
    stats: {
      music_sharing_count?: number;
      playlist_sharing_count?: number;
      comment_count?: number;
    },
  ) {
    return this.prisma.user.update({
      where: { user_id: userId },
      data: {
        ...stats,
      },
    });
  }
}
