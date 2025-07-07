import { PartialType } from '@nestjs/swagger';
import { CreateTeaDtoSwagger } from './create-dto.swagger';

export class UpdateTeaDtoSwagger extends PartialType(CreateTeaDtoSwagger) {}
