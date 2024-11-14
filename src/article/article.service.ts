import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  // Modify createArticle to include userId
  async createArticle(
    createArticleDto: CreateArticleDto,
    userId: number,
  ): Promise<Article> {
    const article = this.articleRepository.create({
      ...createArticleDto,
      user: { id: userId },
    });
    return this.articleRepository.save(article);
  }

  // Get all articles
  async findAll(paginationQuery: PaginationQueryDto): Promise<Article[]> {
    const { limit, page, search } = paginationQuery;

    const query = this.articleRepository.createQueryBuilder('article');

    if (search) {
      query.where('article.title LIKE :search OR article.body LIKE :search', {
        search: `%${search}%`,
      });
    }

    if (limit) {
      query.take(limit);
    }

    if (page) {
      const skip = page * (limit || 10); // Default limit if not provided
      query.skip(skip);
    }

    return query.getMany();
  }

  // Get an article by ID
  async findOne(id: number): Promise<Article> {
    const article = await this.articleRepository.findOneBy({ id });
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  }

  // Update an article
  async updateArticle(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    await this.articleRepository.update(id, updateArticleDto);
    return this.findOne(id);
  }

  // Delete an article
  async deleteArticle(id: number): Promise<void> {
    const deleteResult = await this.articleRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
  }
}
