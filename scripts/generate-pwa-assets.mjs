import { mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const brandDir = join(root, "public/brand");
const outDir = join(root, "public/pwa");

const logoSvg = readFileSync(join(brandDir, "namly-logo.svg"));
const logotypeSvg = readFileSync(join(brandDir, "namly-logotype.svg"));

const iconBackground = { r: 255, g: 255, b: 255 };
const screenBackground = { r: 253, g: 252, b: 245 }; // #FDFCF5

mkdirSync(outDir, { recursive: true });

async function writeIcon(size, filename, paddingRatio = 0.12) {
  const inset = Math.round(size * paddingRatio);
  const inner = size - inset * 2;

  const logo = await sharp(logoSvg)
    .resize(inner, inner, {
      fit: "contain",
      background: iconBackground,
    })
    .flatten({ background: iconBackground })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 3,
      background: iconBackground,
    },
  })
    .composite([{ input: logo, gravity: "center" }])
    .flatten({ background: iconBackground })
    .removeAlpha()
    .png()
    .toFile(join(outDir, filename));
}

async function writeScreenshot({
  width,
  height,
  filename,
  logoSize,
  logotypeWidth,
}) {
  const logo = await sharp(logoSvg)
    .resize(logoSize, logoSize, {
      fit: "contain",
      background: screenBackground,
    })
    .flatten({ background: screenBackground })
    .png()
    .toBuffer();

  const logotype = await sharp(logotypeSvg)
    .resize(logotypeWidth, Math.round(logotypeWidth * 0.34), {
      fit: "contain",
      background: screenBackground,
    })
    .flatten({ background: screenBackground })
    .png()
    .toBuffer();

  const logoMeta = await sharp(logo).metadata();
  const logotypeMeta = await sharp(logotype).metadata();
  const stackHeight =
    (logoMeta.height ?? logoSize) + 24 + (logotypeMeta.height ?? 0);
  const top = Math.round((height - stackHeight) / 2);

  await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: screenBackground,
    },
  })
    .composite([
      {
        input: logo,
        top,
        left: Math.round((width - (logoMeta.width ?? logoSize)) / 2),
      },
      {
        input: logotype,
        top: top + (logoMeta.height ?? logoSize) + 24,
        left: Math.round((width - (logotypeMeta.width ?? logotypeWidth)) / 2),
      },
    ])
    .flatten({ background: screenBackground })
    .removeAlpha()
    .png()
    .toFile(join(outDir, filename));
}

await writeIcon(192, "icon-192.png");
await writeIcon(512, "icon-512.png");
await writeIcon(512, "icon-512-maskable.png", 0.2);

await writeScreenshot({
  width: 390,
  height: 844,
  filename: "screenshot-mobile.png",
  logoSize: 112,
  logotypeWidth: 220,
});

await writeScreenshot({
  width: 1280,
  height: 720,
  filename: "screenshot-wide.png",
  logoSize: 128,
  logotypeWidth: 280,
});

console.log("PWA assets written to public/pwa/");
