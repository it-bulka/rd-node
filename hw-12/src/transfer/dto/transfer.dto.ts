import { IsUUID, IsNumber, Min } from 'class-validator';

export class TransferDto {
  @IsUUID()
  from: string;

  @IsUUID()
  to: string;

  @IsNumber()
  @Min(0.01)
  amount: number;
}