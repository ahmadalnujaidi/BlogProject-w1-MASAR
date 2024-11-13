import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './article.entity';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // create article
  // Only logged-in users can create articles
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createArticleDto: CreateArticleDto,
    @Request() req,
  ): Promise<Article> {
    return this.articleService.createArticle(createArticleDto, req.user.userId);
  }
  // get all articles
  @Get()
  async findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  // Get an article by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Article> {
    return this.articleService.findOne(Number(id));
  }

  // Update an article
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    return this.articleService.updateArticle(Number(id), updateArticleDto);
  }

  // Delete an article
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.articleService.deleteArticle(Number(id));
  }
}
