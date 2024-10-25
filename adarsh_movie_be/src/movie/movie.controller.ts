import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  UseInterceptors,
  UploadedFile,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

import { MovieService } from './movie.service';

@ApiTags('Movie')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new movie' })
  @ApiBody({
    description: 'Movie data with optional poster image file',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        year: { type: 'string' },
        poster: {
          type: 'string',
          format: 'binary',
          description: 'Poster image file',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'The movie has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @UseInterceptors(
    FileInterceptor('poster', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async addMovie(
    @Body() body: { title: string; year: string },
    @UploadedFile() poster: Express.Multer.File,
  ) {
    return this.movieService.addMovie(body, poster );
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a paginated list of movies' })
  @ApiQuery({ name: 'page', required: false, type: 'number', description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number', description: 'Items per page' })
  @ApiResponse({ status: 200, description: 'List of movies retrieved successfully.' })
  async getMovies(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.movieService.getMovies(Number(page), Number(limit));
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get details of a specific movie by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Movie ID' })
  @ApiResponse({ status: 200, description: 'Movie details retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  async getMovieDetails(@Param('id') id: string) {
    return this.movieService.getMovieDetails(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update an existing movie' })
  @ApiParam({ name: 'id', required: true, description: 'Movie ID' })
  @ApiBody({
    description: 'Updated movie data with optional poster image file',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        year: { type: 'string' },
        poster: {
          type: 'string',
          format: 'binary',
          description: 'Poster image file',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'The movie has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  @UseInterceptors(
    FileInterceptor('poster', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async updateMovie(
    @Param('id') id: string,
    @Body() body: { title: string; year: string },
    @UploadedFile() poster: Express.Multer.File,
  ) {
    return this.movieService.updateMovie(id, body, poster);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a movie by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Movie ID' })
  @ApiResponse({ status: 200, description: 'Movie successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  async deleteMovieDetails(@Param('id') id: string) {
    return this.movieService.deleteMovieDetails(id);
  }
}
