import { Controller, Delete, Get, Post, Body, Param } from '@nestjs/common';
import { BadgeService } from '../services/badgeService';

@Controller('badges')
export class BadgeController {
  constructor(private badgeService: BadgeService) {}

  @Get()
  getAllBadges() {
    return this.badgeService.getAllBadges();
  }

  // recupere un badge a partir de son id
  @Get(':id')
  getBadge(@Param('id') badgeId: number) {
    return this.badgeService.getBadgeById(badgeId);
  }

  @Get('users/:id')
  getUserBadges(@Param('id') userId: number) {
    return this.badgeService.getUserBadges(userId);
  }

  // recupere les utilisateurs ayant le badge a partir d'un badge
  // a partir d'un query param: ex /badges/users?badgeId=2
  @Get('users')
  getUserBadgesFromBadge(@Body('badgeId') badgeId: number) {
    return this.badgeService.getUserBadgesFromBadge(badgeId);
  }

  //Creer un Badge
  @Post('/create')
  createBadge(@Body('name') name: string) {
    return this.badgeService.createBadge(name);
  }

  @Post('assign')
  addBadge(@Body() body: { userId: number; badgeId: number }) {
    return this.badgeService.addBadge(body.userId, body.badgeId);
  }

  @Delete('badge')
  removeUserBadge(@Body() body: { userId: number; badgeId: number }) {
    return this.badgeService.removeBadge(body.userId, body.badgeId);
  }
}
