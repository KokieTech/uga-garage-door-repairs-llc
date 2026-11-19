import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { crawlFiles, landingPages, renderHomepage } from './pages.mjs';

const destination = new URL('./dist/', import.meta.url);
await mkdir(destination, { recursive: true });

const homepage = await readFile(new URL('./index.html', import.meta.url), 'utf8');
await writeFile(new URL('index.html', destination), renderHomepage(homepage));
for (const [path, content] of crawlFiles) {
  await writeFile(new URL(path.slice(1), destination), content);
}
for (const file of ['styles.css', 'script.js', 'assets']) {
  await cp(new URL(file, import.meta.url), new URL(file, destination), { recursive: true });
}

const redirects = [];
for (const [route, html] of landingPages) {
  const directory = new URL(route.slice(1) + '/', destination);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL('index.html', directory), html);
  redirects.push(`${route} ${route}/index.html 200`);
}
await writeFile(new URL('_redirects', destination), redirects.join('\n') + '\n');
