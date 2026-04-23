const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');

const configs = [
  // Heavy textures used as CSS backgrounds — aggressive compression (displayed at 5-22% opacity)
  { input: 'dark-marble.png',       output: 'dark-marble.webp',       width: 1920, quality: 65 },
  { input: 'ivory-paper.png',       output: 'ivory-paper.webp',       width: 1920, quality: 65 },
  { input: 'green-fabric.png',      output: 'green-fabric.webp',      width: 1920, quality: 65 },
  { input: 'green-textile.png',     output: 'green-textile.webp',     width: 1920, quality: 70 },

  // Content images — used in next/image, displayed at real sizes
  { input: 'dubai-skyline.png',     output: 'dubai-skyline.webp',     width: 1920, quality: 82 },
  { input: 'fingerprint-paper.png', output: 'fingerprint-paper.webp', width: 1200, quality: 82 },
  { input: 'leather-notebook.png',  output: 'leather-notebook.webp',  width: 1200, quality: 82 },
  { input: 'luxury-corridor.png',   output: 'luxury-corridor.webp',   width: 1200, quality: 82 },
  { input: 'premium-building.png',  output: 'premium-building.webp',  width: 1000, quality: 82 },
  { input: 'premium-table.png',     output: 'premium-table.webp',     width: 1000, quality: 82 },

  // Decorative / seal images — used small or at very low opacity
  { input: 'gold-seal.png',         output: 'gold-seal.webp',         width: 800,  quality: 80 },
  { input: 'wax-seal.png',          output: 'wax-seal.webp',          width: 700,  quality: 75 },
];

async function convert() {
  let totalBefore = 0;
  let totalAfter = 0;

  for (const cfg of configs) {
    const inPath  = path.join(imagesDir, cfg.input);
    const outPath = path.join(imagesDir, cfg.output);

    const beforeBytes = fs.statSync(inPath).size;
    totalBefore += beforeBytes;

    await sharp(inPath)
      .resize({ width: cfg.width, withoutEnlargement: true })
      .webp({ quality: cfg.quality })
      .toFile(outPath);

    const afterBytes = fs.statSync(outPath).size;
    totalAfter += afterBytes;

    const pct = Math.round((1 - afterBytes / beforeBytes) * 100);
    console.log(
      `${cfg.input.padEnd(26)} ${(beforeBytes/1024/1024).toFixed(2).padStart(6)}MB  →  ` +
      `${cfg.output.padEnd(27)} ${(afterBytes/1024).toFixed(0).padStart(5)}KB  (-${pct}%)`
    );
  }

  console.log('\n' + '─'.repeat(80));
  console.log(
    `TOTAL: ${(totalBefore/1024/1024).toFixed(1)}MB  →  ${(totalAfter/1024/1024).toFixed(1)}MB  ` +
    `(saved ${((totalBefore-totalAfter)/1024/1024).toFixed(1)}MB, -${Math.round((1-totalAfter/totalBefore)*100)}%)`
  );
}

convert().catch(console.error);