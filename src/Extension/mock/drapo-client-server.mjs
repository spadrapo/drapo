import { createServer } from 'node:http';
import { readFile, readdir } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(scriptDirectory, '../../..');
const port = Number(process.env.PORT || 6335);

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png'
};

async function createDrapoBundle() {
  const middleware = resolve(root, 'src/Middleware/Drapo');
  const scriptsDirectory = resolve(middleware, 'js');
  const dependencies = [
    resolve(middleware, 'node_modules/es6-promise/dist/es6-promise.auto.min.js'),
    resolve(middleware, 'node_modules/@microsoft/signalr/dist/browser/signalr.min.js')
  ];
  const scripts = (await readdir(scriptsDirectory))
    .filter((file) => file.endsWith('.js'))
    .sort((left, right) => {
      if (left === 'DrapoApplication.js')
        return 1;
      if (right === 'DrapoApplication.js')
        return -1;
      return left.localeCompare(right);
    })
    .map((file) => resolve(scriptsDirectory, file));
  const parts = [];
  for (const file of dependencies.concat(scripts))
    parts.push(await readFile(file, 'utf8'));
  return parts.join('\n;\n');
}

async function respond(response, status, contentType, body) {
  response.writeHead(status, { 'content-type': contentType });
  response.end(body);
}

createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://localhost:${port}`);
    if (url.pathname === '/') {
      response.writeHead(302, { location: '/src/Extension/mock/drapo-client.html' });
      response.end();
      return;
    }
    if (url.pathname === '/drapo.js') {
      await respond(response, 200, 'text/javascript; charset=utf-8', await createDrapoBundle());
      return;
    }
    if (url.pathname === '/drapo.json') {
      await respond(response, 200, 'application/json; charset=utf-8', JSON.stringify({
        Packs: [],
        Routes: [],
        Views: []
      }));
      return;
    }
    if (url.pathname === '/favicon.ico') {
      response.writeHead(204);
      response.end();
      return;
    }
    const filePath = resolve(root, url.pathname.replace(/^\/+/, ''));
    if (!filePath.startsWith(root)) {
      await respond(response, 403, 'text/plain; charset=utf-8', 'Forbidden');
      return;
    }
    await respond(response, 200, contentTypes[extname(filePath)] || 'application/octet-stream', await readFile(filePath));
  } catch (e) {
    await respond(response, 404, 'text/plain; charset=utf-8', e instanceof Error ? e.message : 'Not found');
  }
}).listen(port, () => {
  console.log(`Drapo Bridge client test page: http://localhost:${port}/src/Extension/mock/drapo-client.html`);
});
