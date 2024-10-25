// src/movie/movie.module.ts
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MovieController } from './movie.controller';
import { Movie } from './entities/movie.entity';
import { MovieService } from './movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [MovieService, Logger],
  controllers: [MovieController],
  exports: [MovieService],
})
export class MovieModule {}
