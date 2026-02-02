import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, env } from 'prisma/config';

const envPath = path.resolve(process.cwd(), '.env');
if (!process.env.DATABASE_URL && fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#') || !line.includes('=')) continue;
    const [key, ...rest] = line.split('=');
    const value = rest.join('=').trim().replace(/^"|"$/g, '');
    if (key && !(key in process.env)) {
      process.env[key] = value;
    }
  }
}

export default defineConfig({
  schema: './schema.prisma',
  migrations: {
    path: './migrations',
    seed: 'ts-node ./prisma/seed.ts',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
