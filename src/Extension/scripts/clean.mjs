import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));

await Promise.all([
  rm(resolve(root, 'dist'), { force: true, recursive: true }),
  rm(resolve(root, 'build'), { force: true, recursive: true }),
  rm(resolve(root, 'artifacts'), { force: true, recursive: true })
]);
