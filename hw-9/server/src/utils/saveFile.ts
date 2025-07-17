import * as fs from 'fs/promises';
import * as path from 'path';

export async function saveFile(dir: string, filename: string, content: Buffer | string) {
  const filePath = path.join(dir, filename);
  await fs.writeFile(filePath, content);

  return filePath;
}

export async function saveFileWithDir(dir: string, filename: string, content: Buffer | string) {
  await fs.mkdir(dir, { recursive: true });

  const filePath = path.join(dir, filename);
  await fs.writeFile(filePath, content);

  return filePath;
}
