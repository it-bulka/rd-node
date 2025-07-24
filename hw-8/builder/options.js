import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

import pkg from '@esbuild-plugins/tsconfig-paths'
const TsconfigPathsPlugin = pkg.default || pkg

export const commonBuildOptions = {
  write: true,
  tsconfig: './tsconfig.json',
  plugins: [TsconfigPathsPlugin({ tsconfig: '../tsconfig.json' })],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  format      : 'esm',
  platform    : 'node',
  target      : 'node20',
  minifySyntax: true,
  minifyWhitespace: true,
  minifyIdentifiers: false,
  treeShaking : true,
  legalComments: 'none',
  sourcemap: false,
  external: [
    ...Object.keys(require('../package.json').dependencies || {})
  ]
}
