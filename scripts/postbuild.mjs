import { cp } from "node:fs/promises";
import { existsSync } from "node:fs";

async function copyIfExists(src, dest) {
  if (existsSync(src)) {
    await cp(src, dest, { recursive: true });
    console.log(`Copied ${src} -> ${dest}`);
  }
}

await copyIfExists("public", ".next/standalone/public");
await copyIfExists(".next/static", ".next/standalone/.next/static");
