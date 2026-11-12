// Resizes originals from assets-src/raw → public/images and writes attribution files.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const RAW = 'assets-src/raw';
const OUT = 'public/images';
fs.mkdirSync(OUT, { recursive: true });

const credits = JSON.parse(fs.readFileSync(path.join(RAW, 'credits.json'), 'utf8'));
const files = fs.readdirSync(RAW).filter((f) => f.endsWith('.jpg'));
const used = {};

for (const f of files) {
  const slug = f.replace(/\.jpg$/, '');
  await sharp(path.join(RAW, f))
    .rotate()
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true, progressive: true })
    .toFile(path.join(OUT, f));
  if (credits[slug]) used[slug] = credits[slug];
}

fs.writeFileSync('src/data/credits.json', JSON.stringify(used, null, 2));

const md = ['# Фото / Photo credits', '', 'Все фотографии — Wikimedia Commons, свободные лицензии.', ''];
for (const [slug, c] of Object.entries(used).sort()) {
  md.push(`- **${slug}.jpg** — ${c.author || 'unknown'}, ${c.license}. [${c.title}](${c.page})`);
}
fs.writeFileSync(path.join(OUT, 'CREDITS.md'), md.join('\n') + '\n');
console.log(`optimized ${files.length} images`);
