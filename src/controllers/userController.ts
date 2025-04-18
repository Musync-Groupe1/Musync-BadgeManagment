import {
  Controller,
  Delete,
  Get,
  Put,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from '../services/userService';
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post('create')
  createUser(
    @Body()
    user: {
      is_certified: boolean;
      music_sharing_count: number;
      playlist_sharing_count: number;
      comment_count: number;
    },
  ) {
    return this.userService.addUser(user);
  }

  @Put('update/:id')
  updateUserStates(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      is_certified;
      music_sharing_count;
      playlist_sharing_count;
      comment_count;
    },
  ) {
    return this.userService.updateUserStats(id, body);
  }
}
