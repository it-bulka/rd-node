import path from "path";
import sharp from 'sharp';
import { workerData, parentPort } from 'node:worker_threads';
import fs from 'node:fs'

async function runThumbnailWorker(){
  const { filePath } = workerData

  try {
    await convertToThumbnail(filePath)
    parentPort?.postMessage({ status: 'processed' })
  } catch (e) {
    console.error('[Worker error]', e)
    parentPort?.postMessage({ status: 'skipped' })
  }

}
runThumbnailWorker()

async function convertToThumbnail(filePath: string) {
  const filename = path.parse(filePath).name;

  const previewName = `${filename}-thumb.webp`;
  const previewPath = path.join('uploads/thumbs', previewName);

  const dir = path.dirname(previewPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await sharp(filePath)
    .resize(150, 150)
    .toFormat('webp')
    .toFile(previewPath);

  return previewPath;
}
