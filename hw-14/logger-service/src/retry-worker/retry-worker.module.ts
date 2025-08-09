import { Module } from '@nestjs/common';
import { RetryWorkerService } from './retry-worker.service';

@Module({
  controllers: [],
  providers: [RetryWorkerService],
  exports: [RetryWorkerService],
})
export class RetryWorkerModule {}
