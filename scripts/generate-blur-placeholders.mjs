#!/usr/bin/env node
/* eslint-disable no-console */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_IMG = path.join(process.cwd(), "public", "img");
const OUT_FILE = path.join(process.cwd(), "src", "data", "blur-placeholders.json");

function listImageFiles(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      listImageFiles(full, acc);
    } else if (/\.(png|jpe?g|webp)$/i.test(entry.name)) {
      acc.push(full);
    }
  }
  return acc;
}

async function generate() {
  if (!fs.existsSync(PUBLIC_IMG)) {
    console.log("No public/img/ — skipping blur generation.");
    fs.writeFileSync(OUT_FILE, "{}\n");
    return;
  }
  const files = listImageFiles(PUBLIC_IMG);
  const out = {};
  for (const abs of files) {
    const rel = "/" + path.relative(path.join(process.cwd(), "public"), abs).split(path.sep).join("/");
    const buf = await sharp(abs)
      .resize(16, null, { fit: "inside" })
      .blur(1.5)
      .webp({ quality: 40 })
      .toBuffer();
    out[rel] = `data:image/webp;base64,${buf.toString("base64")}`;
  }
  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2) + "\n");
  console.log(`Generated ${files.length} blur placeholders → ${path.relative(process.cwd(), OUT_FILE)}`);
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
