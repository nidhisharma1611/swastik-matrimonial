import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const source = fileURLToPath(new URL("../assets/image/hero.jpg", import.meta.url));
const output = fileURLToPath(new URL("../public/media/", import.meta.url));

await mkdir(output, { recursive: true });

const variants = [
  [720, "hero-720"],
  [1080, "hero-1080"],
  [1440, "hero-1440"]
];

await Promise.all(
  variants.flatMap(([width, name]) => [
    sharp(source).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 78, effort: 6 }).toFile(`${output}${name}.webp`),
    sharp(source).rotate().resize({ width, withoutEnlargement: true }).avif({ quality: 52, effort: 4 }).toFile(`${output}${name}.avif`)
  ])
);

console.log("Optimized hero variants created in public/media.");
