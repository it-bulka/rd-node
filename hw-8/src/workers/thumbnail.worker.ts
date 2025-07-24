import path from "path";
import sharp from 'sharp';
import { workerData, parentPort } from 'node:worker_threads';
import { config } from '@/config';

async function runThumbnailWorker(){
  const { filePath } = getWorkerData()

  try {
    await convertToThumbnail(filePath)
    parentPort?.postMessage({ status: 'processed' })
  } catch (e) {
    parentPort?.postMessage({ status: 'skipped' })
  }

}
runThumbnailWorker()

async function convertToThumbnail(filePath: string) {
  const filename = path.parse(filePath).name;

  const previewName = `${filename}-thumb.webp`;
  const previewPath = path.join('uploads/thumbs', previewName);

  await sharp(filePath)
    .resize(150, 150)
    .toFormat('webp')
    .toFile(previewPath);

  return previewPath;
}

// WORKAROUND for .ts ext for workers
function getWorkerData (){
  /*if(config.env === 'development') {
    return JSON.parse(process.argv[2]);
  }

  if(config.env === 'production') {
    return workerData
  }

  throw new Error('Workers extension Not supported');*/

  return workerData
}
