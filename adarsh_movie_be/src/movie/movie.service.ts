import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';

import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    private logger: Logger,
  ) {
    this.logger = new Logger(MovieService.name);
  }

  async getMovies(page: number, limit: number): Promise<Movie[]> {
    return await this.movieRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async addMovie(movieData: { title: string; year: string; posterUrl?: string }, poster: Express.Multer.File ): Promise<Movie> {
    try {
      this.logger.log(`movieData | ${JSON.stringify(movieData)}`);
      return await this.movieRepository.findOne({
        where: {
          title: movieData.title,
        },
      }).then(async (movie: Movie) => {
        this.logger.debug(`Movie Record | ${JSON.stringify(movie)}`);

        if(fs.existsSync(`/uploads/${poster.filename}`)) {
          fs.unlinkSync(movieData.posterUrl);
        }        if(movie) {
          throw new HttpException('Movie for provided title already exist!', HttpStatus.BAD_REQUEST);
        }
        movieData.posterUrl = Buffer.from(poster.buffer).toString('base64');
        return await this.movieRepository.save(movieData);
      })
    } catch (error) {
      this.logger.error(`Error creating movie | ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async getMovieDetails(id: string) {
    return await this.movieRepository.findOne({
      where: { id },
    });
  }

  async updateMovie(id: string, movieData: Partial<Movie>, file: Express.Multer.File) {
    try {
      this.logger.log(`id | ${id} || movieData | ${JSON.stringify(movieData)}`);
      return await this.movieRepository.findOne({
        where: { id },
      }).then(async (movie: Movie) => {
        this.logger.debug(`Movie Record | ${JSON.stringify(movie)}`);
        if(file.buffer) {
          movieData.posterUrl = Buffer.from(file.buffer).toString('base64');
        }

        if(fs.existsSync(`/uploads/${file.filename}`)) {
          fs.unlinkSync(movieData.posterUrl);
        }

        if(!movie) {
          throw new HttpException(`Movie for provided id doesn't exist!`, HttpStatus.BAD_REQUEST);
        }

        return await this.movieRepository.update({ id }, movieData);
      })
    } catch (error) {
      this.logger.error(`Error creating movie | ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async deleteMovieDetails(id: string) {
    return await this.movieRepository.findOne({
      where: { id },
    }).then(async (movie: Movie) => {
      this.logger.debug(`Movie Record | ${JSON.stringify(movie)}`);

      if(!movie) {
        throw new HttpException(`Movie for provided id doesn't exist!`, HttpStatus.BAD_REQUEST);
      }

      return await this.movieRepository.delete({ id });
    })
  }
}
