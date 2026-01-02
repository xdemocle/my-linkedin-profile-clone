import { readFileSync } from "node:fs";
import path from "node:path";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

function isObject(value: Json): value is { [key: string]: Json } {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function loadJson(filePath: string): Json {
  const raw = readFileSync(filePath, "utf8");
  return JSON.parse(raw) as Json;
}

function collectMissingPaths(
  base: Json,
  other: Json,
  currentPath: string
): string[] {
  // If base is object, ensure all keys exist
  if (isObject(base)) {
    const otherObj = isObject(other) ? other : null;
    const missing: string[] = [];

    for (const key of Object.keys(base)) {
      const nextPath = currentPath ? `${currentPath}.${key}` : key;

      if (!otherObj || !(key in otherObj)) {
        missing.push(nextPath);
        continue;
      }

      missing.push(...collectMissingPaths(base[key], otherObj[key], nextPath));
    }

    return missing;
  }

  // If base is array, ensure other is array and not shorter
  if (Array.isArray(base)) {
    if (!Array.isArray(other)) {
      return [currentPath || "<root>"];
    }

    if (other.length < base.length) {
      return [
        `${currentPath || "<root>"} (array length ${other.length} < ${base.length})`,
      ];
    }

    return [];
  }

  // Primitives: nothing to check
  return [];
}

function main() {
  const repoRoot = process.cwd();
  const dataDir = path.join(repoRoot, "src", "data");

  const basePath = path.join(dataDir, "resume-en.json");
  const base = loadJson(basePath);

  const locales = ["it", "fr", "es", "ar"] as const;

  let hasDiff = false;

  for (const locale of locales) {
    const otherPath = path.join(dataDir, `resume-${locale}.json`);
    const other = loadJson(otherPath);

    const missing = collectMissingPaths(base, other, "");

    if (missing.length > 0) {
      hasDiff = true;
      console.log(`\n=== Missing vs EN: ${locale} ===`);
      for (const m of missing) {
        console.log(`- ${m}`);
      }
    } else {
      console.log(`\n=== ${locale} is in sync with EN (keys) ===`);
    }
  }

  process.exitCode = hasDiff ? 1 : 0;
}

main();
