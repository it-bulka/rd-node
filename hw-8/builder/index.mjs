import path from "node:path";
import { mkdirSync, rmSync } from "node:fs";
import { buildServer, buildWorkers } from "./build.mjs";

const outDir = path.resolve('dist')
rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

function runBuilder() {
  if(process.env.NODE_ENV === 'production') {
    buildServer()
  }

  buildWorkers()
}

runBuilder()