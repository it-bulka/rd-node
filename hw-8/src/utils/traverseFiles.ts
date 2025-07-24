import fs from 'node:fs/promises';
import path from 'path';

export const traverseFiles = async (dir: string): Promise<string[]> => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(entry => {
      const fullPath = path.join(dir, entry.name);
      return entry.isDirectory() ? traverseFiles(fullPath) : fullPath;
    })
  )

  return files.flat().filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
}