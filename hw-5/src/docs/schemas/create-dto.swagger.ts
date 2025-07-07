import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTeaDtoSwagger {
  @ApiProperty({
    description: 'Name of the tea',
    minLength: 3,
    maxLength: 40,
    example: 'Green Tea',
  })
  name: string;

  @ApiProperty({
    description: 'Origin of the tea',
    minLength: 3,
    maxLength: 30,
    example: 'China',
  })
  origin: string;

  @ApiPropertyOptional({
    description: 'Rating of the tea',
    minimum: 1,
    maximum: 20,
    example: 15,
  })
  rating?: number;

  @ApiPropertyOptional({
    description: 'Brewing temperature in Celsius',
    minimum: 60,
    maximum: 100,
    example: 85,
  })
  brewTemp?: number;

  @ApiPropertyOptional({
    description: 'Additional notes',
    maxLength: 150,
    example: 'Light and floral flavor',
  })
  notes?: string;
}
