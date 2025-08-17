import path from "path";
import sharp from 'sharp';
import { workerData, parentPort } from 'node:worker_threads';
import fs from 'node:fs'

async function runThumbnailWorker(){
  const { filePath, dirForConvertedFiles } = workerData

  try {
    await convertToThumbnail(filePath, dirForConvertedFiles)
    parentPort?.postMessage({ status: 'processed' })
  } catch (e) {
    parentPort?.postMessage({ status: 'skipped' })
  }

}
runThumbnailWorker()

async function convertToThumbnail(filePath: string, dirForConvertedFiles: string) {
  const filename = path.parse(filePath).name;

  const previewName = `${filename}.webp`;
  const previewPath = path.join(dirForConvertedFiles, previewName);

  const dir = path.dirname(previewPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await sharp(filePath)
    .resize(150, 150)
    .toFormat('webp')
    .toFile(previewPath);

  return previewPath;
}
