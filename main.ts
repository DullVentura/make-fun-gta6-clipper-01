// gta6-clipper-01 entry: the video itself is the entry, and this program only
// hands its address to the grader. It copies VIDEO.json from the repository
// root into the output directory, where the house reads it and then reads the
// video's views through the YouTube Data API. Nothing else written here is
// scored. Run the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Fail fast when VIDEO.json is missing, malformed, or does not name a
// YouTube Shorts URL, instead of handing the grader a bad address.
const videoPath = join(BOT_DIR, 'VIDEO.json');
let videoUrl: string;
try {
  const parsed = JSON.parse(readFileSync(videoPath, 'utf8')) as { url?: unknown };
  if (typeof parsed.url !== 'string' || !/^https:\/\/(www\.)?youtube\.com\/shorts\/[A-Za-z0-9_-]+$/.test(parsed.url)) {
    throw new Error('VIDEO.json must contain a youtube.com/shorts/ url string');
  }
  videoUrl = parsed.url;
} catch (err) {
  console.error(`VIDEO.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });

try {
  copyFileSync(videoPath, join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// Read the copy back and confirm it still names the same video, so a
// silent or partial copy can never hand the grader a wrong address.
try {
  const copied = JSON.parse(readFileSync(join(OUTPUT_DIR, 'VIDEO.json'), 'utf8')) as { url?: unknown };
  if (copied.url !== videoUrl) {
    throw new Error(`copied VIDEO.json names ${String(copied.url)}, expected ${videoUrl}`);
  }
} catch (err) {
  console.error(`VIDEO.json copy failed verification: ${(err as Error).message}`);
  process.exit(1);
}

console.log(`Entry video: ${videoUrl}`);
