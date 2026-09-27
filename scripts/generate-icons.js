import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const outputDir = path.resolve('public/icons');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const svgPath = path.resolve('public/cloudshoe-logo.svg');
const svgBuffer = fs.readFileSync(svgPath);

// Helper to create an icon on a dark #0a0a0a background
async function generateIcon({ size, paddingRatio, outputPath }) {
  // Inner logo size
  const innerSize = Math.round(size * (1 - paddingRatio * 2));
  const resizedSvg = await sharp(svgBuffer)
    .resize(innerSize, innerSize, { fit: 'contain' })
    .toBuffer();

  const left = Math.round((size - innerSize) / 2);
  const top = Math.round((size - innerSize) / 2);

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 10, g: 10, b: 10, alpha: 1 }
    }
  })
    .composite([
      {
        input: resizedSvg,
        top,
        left
      }
    ])
    .png()
    .toFile(outputPath);

  console.log(`Generated: ${outputPath} (${size}x${size})`);
}

async function main() {
  // 1. Standard icons (purpose: any)
  await generateIcon({
    size: 192,
    paddingRatio: 0.15,
    outputPath: path.join(outputDir, 'icon-192.png')
  });

  await generateIcon({
    size: 512,
    paddingRatio: 0.15,
    outputPath: path.join(outputDir, 'icon-512.png')
  });

  // 2. Maskable icons (purpose: maskable - needs ~20% safe zone padding)
  await generateIcon({
    size: 192,
    paddingRatio: 0.22,
    outputPath: path.join(outputDir, 'icon-maskable-192.png')
  });

  await generateIcon({
    size: 512,
    paddingRatio: 0.22,
    outputPath: path.join(outputDir, 'icon-maskable-512.png')
  });

  // 3. Apple Touch Icon (180x180)
  await generateIcon({
    size: 180,
    paddingRatio: 0.15,
    outputPath: path.join(outputDir, 'apple-touch-icon-180.png')
  });

  console.log('All icons generated successfully!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
