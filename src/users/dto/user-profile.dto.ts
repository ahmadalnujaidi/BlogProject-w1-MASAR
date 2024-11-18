// src/users/dto/user-profile.dto.ts
import { User } from '../user.entity';

export class UserProfileDto {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
  // Add other fields you want to expose, but exclude sensitive fields like 'password'

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.createdAt = user.createdAt;
    // Map other fields if necessary
  }
}
