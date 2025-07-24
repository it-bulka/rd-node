import fs from 'node:fs/promises'

export const removeDir = async (dir: string) => {
  await fs.rm(dir, { recursive: true, force: true });
}