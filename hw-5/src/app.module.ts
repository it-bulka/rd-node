import { Module, ConsoleLogger } from '@nestjs/common';
import { TeaModule } from './tea/tea.module';
import { LoggingInterceptor } from '@interceptors/logging.interceptor';

@Module({
  imports: [TeaModule],
  controllers: [],
  providers: [LoggingInterceptor, ConsoleLogger],
})
export class AppModule {}
