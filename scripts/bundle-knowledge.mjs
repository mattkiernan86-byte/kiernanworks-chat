// Builds data/knowledge.json from knowledge/*.md, so the Worker can import
// its memory as JSON without a build step at deploy time. The JSON is
// committed; run this after editing anything in knowledge/ and commit both.
//
// Run: node scripts/bundle-knowledge.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(here, '..', 'knowledge');
const out = path.join(here, '..', 'data', 'knowledge.json');

const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort();
const docs = files.map((file) => ({
  file,
  body: fs.readFileSync(path.join(dir, file), 'utf8').trim()
}));

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify({ built: new Date().toISOString(), docs }, null, 2) + '\n');

const words = docs.reduce((n, d) => n + d.body.split(/\s+/).length, 0);
console.log(`${files.length} file(s), about ${words} words, written to data/knowledge.json`);
