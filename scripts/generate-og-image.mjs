#!/usr/bin/env node
/* eslint-disable no-console */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const CONFIG_PATH = path.join(process.cwd(), "src", "data", "config.json");
const AVATAR_PATH = path.join(process.cwd(), "public", "img", "profile.jpg");
const OUT_PATH = path.join(process.cwd(), "public", "og.png");

const W = 1200;
const H = 630;
const AVATAR_SIZE = 280;

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
const name = config.name ?? "Personal site";
// Prefer meta.tagline (short, OG-specific). Fall back to truncated description.
const fallback = (config.meta?.description ?? "").split(/\.\s+/)[0] ?? "";
const rawSubtitle = config.meta?.tagline ?? fallback;
const subtitle = rawSubtitle.length > 56 ? rawSubtitle.slice(0, 53) + "..." : rawSubtitle;
const url = (config.siteUrl ?? "").replace(/^https?:\/\//, "").replace(/\/+$/, "");

// Theme tokens, mirrored from globals.css light theme.
const BG = "#fbfaf7";
const FG = "#1a1a1a";
const MUTED = "#6b7280";
const ACCENT = "#3e5c3a";
const ACCENT_SOFT = "#d4ddd0";
const BORDER = "#e3e0d8";

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <style>
      .label { font: 600 20px Georgia, 'Times New Roman', serif; fill: ${ACCENT}; letter-spacing: 4px; text-transform: uppercase; }
      .name  { font: 700 76px Georgia, 'Times New Roman', serif; fill: ${FG}; letter-spacing: -1px; }
      .sub   { font: 400 26px -apple-system, 'Segoe UI', sans-serif; fill: ${MUTED}; }
      .url   { font: 500 20px -apple-system, 'Segoe UI', sans-serif; fill: ${MUTED}; }
    </style>
  </defs>
  <rect width="${W}" height="${H}" fill="${BG}" />
  <rect x="0" y="0" width="6" height="${H}" fill="${ACCENT}" />
  <text x="80" y="200" class="label">${esc("Software developer · Culinary artist")}</text>
  <text x="80" y="320" class="name">${esc(name)}</text>
  <text x="80" y="380" class="sub">${esc(subtitle)}</text>
  <text x="80" y="${H - 60}" class="url">${esc(url)}</text>
</svg>`;

async function generate() {
  if (!fs.existsSync(AVATAR_PATH)) {
    console.log("No profile.jpg — skipping OG image generation.");
    return;
  }

  // Round-masked avatar
  const avatarMask = Buffer.from(
    `<svg width="${AVATAR_SIZE}" height="${AVATAR_SIZE}"><circle cx="${AVATAR_SIZE / 2}" cy="${AVATAR_SIZE / 2}" r="${AVATAR_SIZE / 2}" fill="white"/></svg>`,
  );
  const avatar = await sharp(AVATAR_PATH)
    .resize(AVATAR_SIZE, AVATAR_SIZE, { fit: "cover" })
    .composite([{ input: avatarMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  // Subtle ring around the avatar
  const ringPad = 12;
  const ringSize = AVATAR_SIZE + ringPad * 2;
  const ring = Buffer.from(
    `<svg width="${ringSize}" height="${ringSize}">
       <circle cx="${ringSize / 2}" cy="${ringSize / 2}" r="${ringSize / 2 - 1}" fill="${ACCENT_SOFT}" stroke="${BORDER}" stroke-width="1"/>
     </svg>`,
  );

  const svgBuf = Buffer.from(svg);

  await sharp({
    create: { width: W, height: H, channels: 4, background: BG },
  })
    .composite([
      { input: svgBuf, top: 0, left: 0 },
      { input: ring, top: (H - ringSize) / 2, left: W - ringSize - 90 },
      { input: avatar, top: (H - AVATAR_SIZE) / 2, left: W - AVATAR_SIZE - 90 - ringPad },
    ])
    .png({ compressionLevel: 9 })
    .toFile(OUT_PATH);

  const size = fs.statSync(OUT_PATH).size;
  console.log(`Generated ${path.relative(process.cwd(), OUT_PATH)} (${(size / 1024).toFixed(0)}KB)`);
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
