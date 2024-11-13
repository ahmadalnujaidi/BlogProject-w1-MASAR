// src/scripts/generate-articles.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ArticleService } from '../article/article.service';
import { UsersService } from '../users/users.service';
import { faker } from '@faker-js/faker';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const articleService = app.get(ArticleService);
  const usersService = app.get(UsersService);

  // const faker = Faker; // Remove this line

  // Get a list of all users
  const users = await usersService.findAll(); // You may need to implement this method

  for (let i = 0; i < 1000; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    await articleService.createArticle(
      {
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(),
      },
      randomUser.id,
    );
  }

  await app.close();
}

bootstrap();
