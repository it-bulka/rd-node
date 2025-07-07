import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryGetAllDtoSwagger {
  @ApiPropertyOptional({
    description: 'Minimum rating filter',
    type: Number,
    minimum: 1,
    example: 3,
  })
  minRating?: number;

  @ApiPropertyOptional({
    description: 'Page size',
    type: Number,
    minimum: 1,
    example: 10,
  })
  pageSize?: number;

  @ApiPropertyOptional({
    description: 'Page number',
    type: Number,
    minimum: 1,
    example: 1,
  })
  page?: number;
}
