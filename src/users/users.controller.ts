// src/users/users.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Request,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserProfileDto } from './dto/user-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Register a new user
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.usersService.register(registerUserDto);
  }

  // Follow a user
  @UseGuards(JwtAuthGuard)
  @Post(':id/follow')
  @HttpCode(HttpStatus.NO_CONTENT)
  async followUser(@Param('id') id: string, @Request() req): Promise<void> {
    await this.usersService.followUser(req.user.userId, Number(id));
  }

  // Unfollow a user
  @UseGuards(JwtAuthGuard)
  @Delete(':id/follow')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unfollowUser(@Param('id') id: string, @Request() req): Promise<void> {
    await this.usersService.unfollowUser(req.user.userId, Number(id));
  }

  // Get followers of a user
  @Get(':id/followers')
  async getFollowers(@Param('id') id: string): Promise<User[]> {
    return this.usersService.getFollowers(Number(id));
  }

  // Get following of a user
  @Get(':id/following')
  async getFollowing(@Param('id') id: string): Promise<User[]> {
    return this.usersService.getFollowing(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Get('/myProfile')
  async getMyProfile(@Request() req): Promise<UserProfileDto> {
    return this.usersService.getMyProfile(req.user.userId);
  }
}
