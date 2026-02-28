import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateMovieDTO } from './create-movie.dto';

export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {
  @IsString()
  readonly title?: string;

  @IsNumber()
  readonly year?: number;

  @IsOptional()
  @IsString({ each: true })
  readonly generes?: string[];
}
