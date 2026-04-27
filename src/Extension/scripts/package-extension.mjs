import { spawnSync } from 'node:child_process';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDirectory, '..');
const target = process.argv[2];

if (!['chrome', 'edge', 'dev', 'customer'].includes(target)) {
  console.error('Usage: node scripts/package-extension.mjs <chrome|edge|dev|customer>');
  process.exit(1);
}

const packageJson = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
const buildDirectory = resolve(root, 'build', target);
const artifactDirectory = resolve(root, 'artifacts');
const artifactPath = resolve(artifactDirectory, `drapo-bridge-${target}.zip`);
const includeSourceMaps = target === 'dev';

await rm(buildDirectory, { force: true, recursive: true });
await mkdir(resolve(buildDirectory, 'dist'), { recursive: true });
await mkdir(resolve(buildDirectory, 'icons'), { recursive: true });
await mkdir(artifactDirectory, { recursive: true });

const distFiles = includeSourceMaps
  ? ['protocol.js', 'protocol.js.map', 'content.js', 'content.js.map', 'background.js', 'background.js.map']
  : ['protocol.js', 'content.js', 'background.js'];

for (const file of distFiles)
  await cp(resolve(root, 'dist', file), resolve(buildDirectory, 'dist', file));

for (const size of [16, 32, 48, 128])
  await cp(resolve(root, 'icons', `icon-${size}.png`), resolve(buildDirectory, 'icons', `icon-${size}.png`));

function resolveHostPermissions() {
  if (target === 'dev')
    return ['https://*.tech6cloud.com/*', 'http://localhost/*', 'http://127.0.0.1/*'];
  if (target === 'customer') {
    const hosts = (process.env.DRAPO_BRIDGE_HOSTS ?? '')
      .split(',')
      .map((host) => host.trim())
      .filter((host) => host.length > 0);
    if (hosts.length === 0) {
      console.error('DRAPO_BRIDGE_HOSTS is required for customer builds, for example: DRAPO_BRIDGE_HOSTS=https://drapo.customer.com/* npm run build:customer');
      process.exit(1);
    }
    return hosts;
  }
  return ['https://*.tech6cloud.com/*'];
}

const hostPermissions = resolveHostPermissions();

const manifest = {
  manifest_version: 3,
  name: target === 'dev' ? 'Drapo Bridge Dev' : 'Drapo Bridge',
  version: packageJson.version,
  description: packageJson.description,
  permissions: ['activeTab'],
  host_permissions: hostPermissions,
  background: {
    service_worker: 'dist/background.js'
  },
  content_scripts: [
    {
      matches: hostPermissions,
      js: ['dist/protocol.js', 'dist/content.js'],
      run_at: 'document_start'
    }
  ],
  icons: {
    16: 'icons/icon-16.png',
    32: 'icons/icon-32.png',
    48: 'icons/icon-48.png',
    128: 'icons/icon-128.png'
  }
};

await writeFile(resolve(buildDirectory, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
await rm(artifactPath, { force: true });

const zipCheck = spawnSync('zip', ['-v'], { stdio: 'ignore' });
if (zipCheck.error || zipCheck.status !== 0) {
  console.error('The extension package step requires the system "zip" command in PATH. Install zip or run this build in an environment that provides it.');
  process.exit(zipCheck.status ?? 1);
}

const zip = spawnSync('zip', ['-qr', artifactPath, '.'], { cwd: buildDirectory, stdio: 'inherit' });
if (zip.status !== 0)
  process.exit(zip.status ?? 1);

console.log(`Created ${artifactPath}`);
