import { Module } from '@nestjs/common';
import { TeaService } from './tea.service';
import { TeaController } from './tea.controller';
import { TeaEntity } from './entities/tea.entity';
import { ConsoleLogger } from '@nestjs/common';

@Module({
  controllers: [TeaController],
  providers: [TeaEntity, ConsoleLogger, TeaService],
})
export class TeaModule {}
