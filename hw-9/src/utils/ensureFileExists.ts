import * as fs from 'fs/promises';
import { InternalServerErrorException } from '@nestjs/common';

export async function ensureFileExists(filePath: string, defaultContent = '') {
  try {
    await fs.access(filePath);
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      await fs.writeFile(filePath, defaultContent);
    } else {
      console.error('Error writing file:', err);
      throw new InternalServerErrorException();
    }
  }
}
