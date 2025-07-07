import { Module } from '@nestjs/common';
import { TeaService } from './tea.service';
import { TeaController } from './tea.controller';
import { TeaEntity } from './entities/tea.entity';

@Module({
  controllers: [TeaController],
  providers: [TeaEntity, TeaService],
})
export class TeaModule {}
