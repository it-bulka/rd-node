import { build  } from "esbuild"
import * as glob from 'glob'
import { commonBuildOptions } from "./options.js";

export function buildServer(){
  // MAIN
  build({
    ...commonBuildOptions,
    entryPoints: ['./src/server.ts'],
    outfile: 'dist/server.mjs',
    bundle      : true,
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
}

export function buildWorkers() {
  // WORKERS
  const workerEntry = glob.sync('src/workers/**/*.ts')
  build({
    ...commonBuildOptions,
    entryPoints: workerEntry,
    outdir: 'dist/workers',
    entryNames: '[dir]/[name]',
    outExtension: { '.js': '.mjs' },
    bundle      : true,
  })
    .then(() => console.log('ESM workers bundle → dist/worker/*'))
    .catch(err => {
      console.error('Build workers failed:', err.stack)
      process.exit(1)
    })
}





