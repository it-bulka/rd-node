import { rmSync, mkdirSync } from 'node:fs'
import path from 'node:path'

import { build } from "esbuild"
import TsconfigPathsPlugin from '@esbuild-plugins/tsconfig-paths'

const outDir = path.resolve('dist')
rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

build({
  entryPoints: ['./src/server.ts'],
  tsconfig: './tsconfig.json',
  plugins: [TsconfigPathsPlugin({ tsconfig: './tsconfig.json' })],
  bundle      : true,
  format      : 'esm',
  platform    : 'node',
  target      : 'node20',
  minifySyntax: true,
  minifyWhitespace: true,
  minifyIdentifiers: false,   // needed for injectionMode: 'CLASSIC'
  treeShaking : true,
  legalComments: 'none',
  sourcemap: true,
  banner: {
    js: `
import { createRequire } from 'node:module';
// importing fileURLToPath and path is done in src/server.js, skip duplicates
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
`
  }
})
  .then(() => console.log('ESM bundle → dist/server.mjs'))
  .catch(err => {
    console.error('Build failed:', err.stack)
    process.exit(1)
  })