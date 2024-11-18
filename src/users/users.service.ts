// src/users/users.service.ts
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { UserFollower } from './user-follower.entity';
import { UserProfileDto } from './dto/user-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserFollower)
    private userFollowerRepository: Repository<UserFollower>,
  ) {}

  // Register a new user
  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { username, password, email } = registerUserDto;

    // Check if username already exists
    const existingUser = await this.usersRepository.findOneBy({ username });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      email,
    });

    return this.usersRepository.save(user);
  }

  // Find a user by username
  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }

  // Follow a user
  async followUser(followerId: number, followingId: number): Promise<void> {
    if (followerId === followingId) {
      throw new ConflictException('You cannot follow yourself');
    }

    const follower = await this.usersRepository.findOneBy({ id: followerId });
    const following = await this.usersRepository.findOneBy({ id: followingId });

    if (!following) {
      throw new NotFoundException(`User with ID ${followingId} not found`);
    }

    const existingFollow = await this.userFollowerRepository.findOne({
      where: { follower: { id: followerId }, following: { id: followingId } },
    });

    if (existingFollow) {
      throw new ConflictException('You are already following this user');
    }

    const userFollower = this.userFollowerRepository.create({
      follower,
      following,
    });

    await this.userFollowerRepository.save(userFollower);
  }

  // Unfollow a user
  async unfollowUser(followerId: number, followingId: number): Promise<void> {
    const follow = await this.userFollowerRepository.findOne({
      where: { follower: { id: followerId }, following: { id: followingId } },
    });

    if (!follow) {
      throw new NotFoundException('Follow relationship not found');
    }

    await this.userFollowerRepository.remove(follow);
  }

  // Get followers of a user
  async getFollowers(userId: number): Promise<User[]> {
    const userWithFollowers = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['followers', 'followers.follower'],
    });

    if (!userWithFollowers) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return userWithFollowers.followers.map((uf) => uf.follower);
  }

  // Get users that a user is following
  async getFollowing(userId: number): Promise<User[]> {
    const userWithFollowing = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['following', 'following.following'],
    });

    if (!userWithFollowing) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return userWithFollowing.following.map((uf) => uf.following);
  }

  // Get current user's profile
  async getMyProfile(userId: number): Promise<UserProfileDto> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return new UserProfileDto(user);
  }
  // Other methods as needed...
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
