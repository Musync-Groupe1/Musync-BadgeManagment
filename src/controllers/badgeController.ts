import { Controller, Delete, Get, Post, Body, Param } from '@nestjs/common';
import { BadgeService } from '../services/badgeService';

import { Roles } from 'nest-keycloak-connect';

@Controller('badges')
//@UseGuards(AuthGuard)
export class BadgeController {
  constructor(private badgeService: BadgeService) {}

  @Get()
  @Roles({ roles: ['realm:admin'] })
  //@Roles({ roles: ['admin', 'realm:sysadmin'], mode: RoleMatchingMode.ALL })
  getAllBadges() {
    return this.badgeService.getAllBadges();
  }

  // recupere un badge a partir de son id
  @Get(':id')
  @Roles({ roles: ['admin'] })
  getBadge(@Param('id') badgeId: number) {
    return this.badgeService.getBadgeById(badgeId);
  }

  @Get('users/:id')
  @Roles({ roles: ['admin'] })
  getUserBadges(@Param('id') userId: number) {
    return this.badgeService.getUserBadges(userId);
  }

  // recupere les utilisateurs ayant le badge a partir d'un badge
  // a partir d'un query param: ex /badges/users?badgeId=2
  @Get('users')
  @Roles({ roles: ['admin'] })
  getUserBadgesFromBadge(@Body('badgeId') badgeId: number) {
    return this.badgeService.getUserBadgesFromBadge(badgeId);
  }

  //Creer un Badge
  @Post('/create')
  @Roles({ roles: ['admin'] })
  createBadge(@Body('name') name: string) {
    return this.badgeService.createBadge(name);
  }

  @Post('assign')
  @Roles({ roles: ['admin'] })
  addBadge(@Body() body: { userId: number; badgeId: number }) {
    return this.badgeService.addBadge(body.userId, body.badgeId);
  }

  @Delete('badge')
  @Roles({ roles: ['admin'] })
  removeUserBadge(@Body() body: { userId: number; badgeId: number }) {
    return this.badgeService.removeBadge(body.userId, body.badgeId);
  }
}
