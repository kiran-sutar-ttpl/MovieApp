import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import *as dotenv from 'dotenv';
dotenv.config();

import { Movie } from './movie/entities/movie.entity';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      entities: [Movie]
    }),
    MovieModule,
  ],
})
export class AppModule {}
