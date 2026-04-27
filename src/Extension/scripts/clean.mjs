import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);

await Promise.all([
  rm(resolve(root, 'dist'), { force: true, recursive: true }),
  rm(resolve(root, 'build'), { force: true, recursive: true }),
  rm(resolve(root, 'artifacts'), { force: true, recursive: true })
]);
