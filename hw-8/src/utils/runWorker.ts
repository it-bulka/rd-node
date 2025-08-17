import { Worker } from 'node:worker_threads';
import { withMutex } from '@/utils/index';
import { SharedState, WorkerMsgState } from '@/types';
import { config } from '@/config';
import os from 'node:os';
import pLimit from 'p-limit'

const maxWorkers = (os.availableParallelism?.() ?? os.cpus().length) || 1;
const limit = pLimit(maxWorkers);

export async function runMainWorker(filePaths: string[], dirForConvertedFiles: string): Promise<SharedState>{
  const state: SharedState = { processed: 0, skipped: 0 };

  const workerPromises = filePaths.map((filePath) => {
    return limit(() => runOneWorker(filePath))
  });

  function runOneWorker(filePath: string) {
    return new Promise((resolve, reject) => {
      const worker = getWorker({ filePath, dirForConvertedFiles });
      worker.on('message', async (msg: { status: WorkerMsgState}) => {
        await withMutex(() => {
          if (msg.status === 'processed') state.processed++;
          else if (msg.status === 'skipped') state.skipped++;
        })
      });
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
        else resolve(null);
      });
    })
  }

  return Promise.all(workerPromises).then(() => state);
}

// WORKAROUND for .ts ext for workers. Prebuilding workers into dist
function getWorker(arg: any) {
  const workerPath = config.env === 'production' ? './workers/thumbnail.worker.mjs' : '../../dist/workers/thumbnail.worker.mjs'
  return new Worker(new URL(workerPath, import.meta.url), {
    workerData: arg
  });
}