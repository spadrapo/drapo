import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const targetFramework = process.argv[2];

if (!targetFramework) {
  console.error('Usage: node scripts/create-lib.mjs <target-framework>');
  process.exit(1);
}

const outputDirectory = resolve(root, 'lib', targetFramework);
await mkdir(outputDirectory, { recursive: true });

const dependencies = [
  resolve(root, 'node_modules/es6-promise/dist/es6-promise.auto.min.js'),
  resolve(root, 'node_modules/@microsoft/signalr/dist/browser/signalr.min.js')
];
const jsDirectory = resolve(root, 'js');
const jsFiles = (await readdir(jsDirectory))
  .filter((file) => file.endsWith('.js'))
  .sort()
  .map((file) => resolve(jsDirectory, file));
const declarationFiles = (await readdir(jsDirectory))
  .filter((file) => file.endsWith('.d.ts'))
  .sort()
  .map((file) => resolve(jsDirectory, file));

const scriptParts = [];
for (const file of dependencies.concat(jsFiles))
  scriptParts.push(await readFile(file, 'utf8'));
scriptParts.push('//# sourceMappingURL=drapo.js.map');
await writeFile(resolve(outputDirectory, 'drapo.js'), scriptParts.join('\n'), 'utf8');

const declarationParts = [];
for (const file of declarationFiles)
  declarationParts.push(await readFile(file, 'utf8'));
await writeFile(resolve(outputDirectory, 'index.d.ts'), declarationParts.join('\n'), 'utf8');
