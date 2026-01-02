import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

function isObject(value: Json): value is { [key: string]: Json } {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function loadJson(filePath: string): Json {
  const raw = readFileSync(filePath, "utf8");
  return JSON.parse(raw) as Json;
}

function saveJson(filePath: string, value: Json) {
  writeFileSync(filePath, JSON.stringify(value, null, 2) + "\n", "utf8");
}

/**
 * Fills missing keys/items in `target` using `base`.
 * - Objects: missing keys are copied from base.
 * - Arrays: if target shorter than base, append base's tail.
 * - Primitives: unchanged.
 */
function fillFromBase(base: Json, target: Json): Json {
  if (isObject(base)) {
    const result: { [key: string]: Json } = isObject(target)
      ? { ...target }
      : {};

    for (const key of Object.keys(base)) {
      if (!(key in result)) {
        result[key] = base[key];
        continue;
      }

      result[key] = fillFromBase(base[key], result[key]);
    }

    return result;
  }

  if (Array.isArray(base)) {
    const tgt = Array.isArray(target) ? [...target] : [];

    if (tgt.length < base.length) {
      tgt.push(...base.slice(tgt.length));
    }

    // Optionally recurse on existing indices for object arrays
    for (let i = 0; i < Math.min(tgt.length, base.length); i++) {
      tgt[i] = fillFromBase(base[i] ?? null, tgt[i] ?? null);
    }

    return tgt;
  }

  // primitives
  return target;
}

function main() {
  const repoRoot = process.cwd();
  const dataDir = path.join(repoRoot, "src", "data");

  const basePath = path.join(dataDir, "resume-en.json");
  const base = loadJson(basePath);

  const locales = ["it", "fr", "es", "ar"] as const;

  for (const locale of locales) {
    const localePath = path.join(dataDir, `resume-${locale}.json`);
    const localeJson = loadJson(localePath);

    const merged = fillFromBase(base, localeJson);
    saveJson(localePath, merged);

    console.log(`Synced: resume-${locale}.json`);
  }
}

main();
