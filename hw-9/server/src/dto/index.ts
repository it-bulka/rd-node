import { IsNumber, IsString, IsUUID, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class UserDTO {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  iconUrl?: string;
}

export class ChatDTO {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID('all', { each: true })
  @IsNotEmpty()
  members: string[];

  @IsDateString()
  @IsNotEmpty()
  updatedAt: string;
}

export class MessageDTO {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  chatId: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsDateString()
  @IsNotEmpty()
  sentAt: string;
}

export class EnvDto {
  @IsNumber()
  @IsNotEmpty()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  BASE_URL: string;
}