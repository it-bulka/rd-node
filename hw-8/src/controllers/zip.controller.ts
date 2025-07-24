import { Request, Response} from 'express';
import path from 'path';
import * as crypto from 'node:crypto';
import { unzip, removeDir } from '@/utils';
import { traverseFiles } from '@/utils';
import { runMainWorker } from '@/utils/runWorker';

class ZipController {
  async post(req: Request, res: Response) {
    const files = req.files as Express.Multer.File[];
    if (!files) return res.status(400).json({ error: 'No file uploaded' });

    const requestId = crypto.randomUUID();
    const tempDir = path.join('uploads/temp', requestId);

    for (const file of files) {
      const originalPath = file.path;
      unzip(originalPath, tempDir);
      await removeDir(originalPath);
    }

    const filesPaths = await traverseFiles(tempDir)
    try {
      const t0 = performance.now()
      const state = await runMainWorker(filesPaths)
      await removeDir(tempDir); console.log('tempDir', tempDir)
      return res.json({
        processed: state.processed,
        skipped: state.skipped,
        durationMs: performance.now() - t0 });
    } catch(err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

  }
}

export const zipController = new ZipController()

