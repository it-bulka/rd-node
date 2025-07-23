import { rmSync, mkdirSync } from 'node:fs'
import path from 'node:path'

import { build } from "esbuild"
import pkg from '@esbuild-plugins/tsconfig-paths'
const TsconfigPathsPlugin = pkg.default || pkg

const outDir = path.resolve('dist')
rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

build({
  entryPoints: ['./src/server.ts'],
  outfile: 'dist/server.mjs',
  write: true,
  tsconfig: './tsconfig.json',
  plugins: [TsconfigPathsPlugin({ tsconfig: './tsconfig.json' })],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  },
  bundle      : true,
  format      : 'esm',
  platform    : 'node',
  target      : 'node20',
  minifySyntax: true,
  minifyWhitespace: true,
  minifyIdentifiers: false,   // needed for injectionMode: 'CLASSIC'
  treeShaking : true,
  legalComments: 'none',
  sourcemap: false,
  banner: {
    js: `
import { createRequire } from 'node:module';
// importing path is done in src/server.js, skip duplicates
import { fileURLToPath } from 'node:url'
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