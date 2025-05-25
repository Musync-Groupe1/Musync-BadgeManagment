import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BadgeService {
  constructor(private prisma: PrismaService) {}

  async getAllBadges() {
    return this.prisma.badge.findMany();
  }

  async getBadgeById(badgeId: number) {
    return this.prisma.badge.findUnique({
      where: {
        badge_id: badgeId,
      },
    });
  }

  //recupere les badges d'un user a partir de son id
  async getUserBadges(userId: number) {
    return this.prisma.userBadge.findMany({
      where: {
        user_id: userId,
      },
      include: { badge: true },
    });
  }

  // recupere tous les utilisateurs ayant un badge
  async getUserBadgesFromBadge(badgeId: number) {
    return this.prisma.userBadge.findMany({
      where: { badge_id: badgeId },
      include: { user: true },
    });
  }

  async createBadge(name: string) {
    return this.prisma.badge.create({
      data: {
        name,
      },
    });
  }

  //ajouter un badge a un user --- creer l'asso entre un badge et un user
  async addBadge(userId: number, badgeId: number) {
    return this.prisma.userBadge.create({
      data: {
        user: { connect: { user_id: userId } },
        badge: { connect: { badge_id: badgeId } },
      },
    });
  }

  async removeBadge(userId: number, badgeId: number) {
    return this.prisma.userBadge.delete({
      where: {
        user_id_badge_id: {
          user_id: userId,
          badge_id: badgeId,
        },
      },
    });
  }
}
