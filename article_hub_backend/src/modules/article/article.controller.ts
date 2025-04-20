import { Controller, Get, Post, Body, Query, UseInterceptors, UploadedFile, Patch, Param, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FindArticleByAuthorDto } from './dto/find-article-by-author.dto';
import { FindArticleDto } from './dto/find-article.dto';
import { ArticleIdDto } from './dto/article-id.dto';
import { FindArticleByCategoryDto } from './dto/find-article-by-category.dto';

@Controller({
  path: 'article',
  version: '1',
})
export class ArticleController {

  constructor(private readonly articleService: ArticleService) { }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/articles',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    createArticleDto.imageUrl = file.path;
    return this.articleService.create(createArticleDto,);
  }

  @Get('findOne/:id')
  findOne(@Param() param: ArticleIdDto) {
    return this.articleService.findOne(param.id);
  }

  @Get()
  findAll(@Query() param: FindArticleDto) {
    const { page, limit } = param;
    return this.articleService.findAll(page, limit);
  }

  @Get('findByCategory')
  findByCategory(@Query() param: FindArticleByCategoryDto) {
    return this.articleService.findByCategory(param.category);
  }

  @Get('findByAuthor')
  findByAuthor(@Query() query: FindArticleByAuthorDto) {
    const { authorId, page, limit } = query;
    return this.articleService.findByAuthor(authorId, page, limit);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/articles',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async update(
    @Param() param: ArticleIdDto,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    if (file) {
      updateArticleDto.imageUrl = file.path;
    }

    return this.articleService.update(param.id, updateArticleDto);
  }

  @Delete(':id')
  delete(@Param() param: ArticleIdDto) {
    return this.articleService.delete(param.id);
  }
}
