import { ApiProperty } from '@nestjs/swagger';
import { CreateTeaDtoSwagger } from './create-dto.swagger';

export class TeaDtoSwagger extends CreateTeaDtoSwagger {
  @ApiProperty({
    description: 'ID of the tea',
    minLength: 32,
    maxLength: 32,
    example: 'klhjyuiokll-jkghfgrtfgvhjklkijuh',
  })
  id: string;
}
