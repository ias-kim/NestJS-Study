import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMovieDTO {
  @IsString()
  readonly title?: string;

  @IsNumber()
  readonly year?: number;

  @IsOptional()
  @IsString({ each: true })
  readonly generes?: string[];
}
