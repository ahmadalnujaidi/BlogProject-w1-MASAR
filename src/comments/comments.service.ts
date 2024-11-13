// src/comments/comments.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    userId: number,
    articleId: number,
  ): Promise<Comment> {
    const comment = this.commentsRepository.create({
      ...createCommentDto,
      user: { id: userId },
      article: { id: articleId },
    });
    return this.commentsRepository.save(comment);
  }

  // Other methods as needed
}
