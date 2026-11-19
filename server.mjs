import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { crawlFiles, landingPages, renderHomepage } from './pages.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.webp': 'image/webp',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.otf': 'font/otf',
  '.mp4': 'video/mp4', '.webm': 'video/webm',
  '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8'
};
const server = createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const parts = pathname.split(/[\\/]/);
    if (parts.some(part => part.startsWith('.'))) {
      response.writeHead(403).end('Forbidden');
      return;
    }
    const landing = landingPages.get(pathname.replace(/\/$/, ''));
    const crawlFile = crawlFiles.get(pathname);
    const homepage = pathname === '/' || pathname === '/index.html';
    const filename = resolve(root, '.' + (homepage ? '/index.html' : pathname));
    const type = landing ? types['.html'] : types[extname(filename)];
    if (!filename.startsWith(root + sep) || !type) {
      response.writeHead(404).end('Not found');
      return;
    }
    let content;
    if (landing) {
      content = Buffer.from(landing);
    } else if (crawlFile) {
      content = Buffer.from(crawlFile);
    } else if (homepage) {
      content = Buffer.from(renderHomepage(await readFile(filename, 'utf8')));
    } else {
      content = await readFile(filename);
    }
    response.writeHead(200, {
      'Content-Type': type,
      'Content-Length': content.length,
      'Cache-Control': 'no-store'
    });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch (error) {
    response.writeHead(error.code === 'ENOENT' || error.code === 'EISDIR' ? 404 : 400).end('Unable to serve file');
  }
});
server.listen(Number(process.env.PORT || 3000), '127.0.0.1', () => {
  console.log(`UGA website: http://localhost:${server.address().port}`);
});
