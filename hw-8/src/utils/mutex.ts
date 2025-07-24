import { Mutex } from 'async-mutex';

const mutex = new Mutex();

export async function withMutex(fn: () => Promise<void> | void): Promise<void> {
  const release = await mutex.acquire();
  try {
    await fn();
  } finally {
    release();
  }
}