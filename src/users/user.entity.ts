// src/users/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Article } from '../article/article.entity';
import { UserFollower } from './user-follower.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // Additional fields if needed
  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];

  // Followers: Users who follow this user
  @OneToMany(() => UserFollower, (uf) => uf.following)
  followers: UserFollower[];

  // Following: Users that this user follows
  @OneToMany(() => UserFollower, (uf) => uf.follower)
  following: UserFollower[];
}
