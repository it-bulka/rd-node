import { Controller, Post, Body } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferDto } from './dto/transfer.dto';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post('/')
  async transfer(@Body() dto: TransferDto) {
      return await this.transferService.transfer(dto.from, dto.to, dto.amount)
  }
}
