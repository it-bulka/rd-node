import { Module, Global } from '@nestjs/common';
import { Store } from '@/store/store.service';

@Global()
@Module({
  providers: [Store],
  exports: [Store]
})
export class StoreModule {}