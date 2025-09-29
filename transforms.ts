import Bun from 'bun';
import { readdirSync } from 'fs';
import { join } from 'path';

const cssDir = './public/assets/css';
const cssFiles = readdirSync(cssDir)
  .filter(file => file.endsWith('.css'))
  .map(file => join(cssDir, file));

console.log(cssFiles);

await Bun.build({
  entrypoints: cssFiles,
  outdir: './build',
  minify: true,
  splitting: true,
  sourcemap: 'none',
  format: 'esm',
  target: 'browser',
  // loader: {
  //   ".css": "css",
  // },
  // --css-chunking
});
