import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Article } from './entities/article.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly dataSource: DataSource) {}

  // create a new article
  @Post()
  async create(@Body() body: any) {
    // acccess the articles repo
    const articlesRepo = this.dataSource.getRepository(Article);
    // create a article instance
    const newArticle = new Article();
    // destruct the title and content from the request body
    const { title, content } = body;
    // set the title and content
    newArticle.title = title;
    newArticle.content = content;
    // make sure the title and content are not empty
    if (!title || !content) {
      return { message: 'Title and content are required' };
    }
    // save the article
    await articlesRepo.save(newArticle);
    // return the new article and a success message
    return { article: newArticle, message: 'Article created successfully' };
  }

  // get all articles
  @Get()
  async findAll() {
    // access the articles repo
    const articlesRepo = this.dataSource.getRepository(Article);
    // get all articles
    const articles = await articlesRepo.find();
    // return the articles
    return articles;
  }

  // get a single article
  @Get(':id')
  async findOne(@Param('id') id: number) {
    // access the articles repo
    const articlesRepo = this.dataSource.getRepository(Article);
    // get the article by id
    const article = await articlesRepo.findOne({ where: { id } });
    // return the article
    return article;
  }

  // update a single article
  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: any) {
    // access the articles repo
    const articlesRepo = this.dataSource.getRepository(Article);
    // get the article by id
    const article = await articlesRepo.findOne({ where: { id } });
    // make sure the article exists
    if (!article) {
      return { message: 'Article not found' };
    }
    // destruct the title and content from the request body
    const { title, content } = body;
    // set the title and content
    article.title = title;
    article.content = content;
    // make sure the title and content are not empty
    if (!title || !content) {
      return { message: 'Title and content are required' };
    }
    // save the article
    await articlesRepo.save(article);
    // return the updated article and a success message
    return { article, message: 'Article updated successfully' };
  }

  // delete a single article
  @Delete(':id')
  async remove(@Param('id') id: number) {
    // access the articles repo
    const articlesRepo = this.dataSource.getRepository(Article);
    // get the article by id
    const article = await articlesRepo.findOne({ where: { id } });
    // make sure the article exists
    if (!article) {
      return { message: 'Article not found' };
    }
    // remove the article
    await articlesRepo.remove(article);
    // return a success message
    return { message: 'Article deleted successfully' };
  }
}
