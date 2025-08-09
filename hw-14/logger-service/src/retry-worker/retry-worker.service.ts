import { Injectable,  OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Worker } from 'node:worker_threads';
import { join } from 'path';

@Injectable()
export class RetryWorkerService implements OnModuleInit, OnModuleDestroy {
  private worker: Worker;

  onModuleInit() {
    console.log('[Main] Starting Retry Worker...');
    this.worker = new Worker(join(__dirname, 'retry.worker.js'));
    this.worker.on('message', (msg) => {
      console.log('[Main] Worker message:', msg);
    });
    this.worker.on('error', (err) => {
      console.error('[Main] Worker error:', err);
    });
    this.worker.on('exit', (code) => {
      console.log('[Main] Worker stopped with code', code);
    });
  }

  onModuleDestroy() {
    if (this.worker) {
      console.log('[Main] Stopping worker...');
      this.worker.terminate();
    }
  }
}
