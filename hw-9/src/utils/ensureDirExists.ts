import * as fs from 'fs/promises';

export const ensureDirExists = async (dirPath: string) => {
  await fs.mkdir(dirPath, { recursive: true });
}