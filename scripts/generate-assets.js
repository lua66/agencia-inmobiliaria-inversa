import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve(process.cwd(), 'public');

async function generate() {
  console.log('Generating rasterized images from SVGs...');
  
  const faviconSvg = fs.readFileSync(path.join(publicDir, 'favicon.svg'));
  const ogSvg = fs.readFileSync(path.join(publicDir, 'og-image.svg'));

  // 1. OG Image (1200x630)
  await sharp(ogSvg)
    .resize(1200, 630)
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('Generated og-image.png (1200x630)');

  // 2. Apple Touch Icon (180x180)
  await sharp(faviconSvg)
    .resize(180, 180)
    .png({ quality: 95 })
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png (180x180)');

  // 3. PWA Icons (192x192 and 512x512)
  await sharp(faviconSvg)
    .resize(192, 192)
    .png({ quality: 95 })
    .toFile(path.join(publicDir, 'icon-192.png'));
  console.log('Generated icon-192.png');

  await sharp(faviconSvg)
    .resize(512, 512)
    .png({ quality: 95 })
    .toFile(path.join(publicDir, 'icon-512.png'));
  console.log('Generated icon-512.png');

  // 4. Favicon 32x32 PNG as fallback / ico
  await sharp(faviconSvg)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));

  await sharp(faviconSvg)
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));

  // Also write standard favicon.ico from 32x32 PNG buffer
  const ico32Buffer = await sharp(faviconSvg).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico32Buffer);
  console.log('Generated favicon.ico and PNG sizes');

  console.log('All image assets successfully generated!');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
