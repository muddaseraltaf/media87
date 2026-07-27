import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, "..");
const sourcePath = path.resolve(projectDir, "../1.png");

const source = sharp(sourcePath).ensureAlpha();
const { data, info } = await source.raw().toBuffer({ resolveWithObject: true });

function findBounds(predicate) {
  let left = info.width;
  let top = info.height;
  let right = 0;
  let bottom = 0;

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const offset = (y * info.width + x) * info.channels;
      const red = data[offset];
      const green = data[offset + 1];
      const blue = data[offset + 2];

      if (!predicate(red, green, blue)) continue;
      left = Math.min(left, x);
      top = Math.min(top, y);
      right = Math.max(right, x);
      bottom = Math.max(bottom, y);
    }
  }

  return {
    left,
    top,
    width: right - left + 1,
    height: bottom - top + 1,
  };
}

function transparentCrop(bounds, padding) {
  const width = bounds.width + padding * 2;
  const height = bounds.height + padding * 2;
  const output = Buffer.alloc(width * height * 4);

  for (let y = 0; y < bounds.height; y += 1) {
    for (let x = 0; x < bounds.width; x += 1) {
      const sourceOffset =
        ((bounds.top + y) * info.width + bounds.left + x) * info.channels;
      const outputOffset = ((y + padding) * width + x + padding) * 4;
      const red = data[sourceOffset];
      const green = data[sourceOffset + 1];
      const blue = data[sourceOffset + 2];
      const distanceFromWhite = Math.max(
        255 - red,
        255 - green,
        255 - blue,
      );
      const alpha =
        distanceFromWhite <= 1
          ? 0
          : distanceFromWhite >= 145
            ? 255
            : Math.round(((distanceFromWhite - 1) / 144) * 255);
      const alphaRatio = alpha / 255;
      const removeWhiteMatte = (channel) =>
        alpha === 0
          ? 0
          : alpha === 255
            ? channel
            : Math.max(
                0,
                Math.min(
                  255,
                  Math.round((channel - 255 * (1 - alphaRatio)) / alphaRatio),
                ),
              );

      output[outputOffset] = removeWhiteMatte(red);
      output[outputOffset + 1] = removeWhiteMatte(green);
      output[outputOffset + 2] = removeWhiteMatte(blue);
      output[outputOffset + 3] = alpha;
    }
  }

  return sharp(output, {
    raw: { width, height, channels: 4 },
  }).png();
}

const logoBounds = findBounds(
  (red, green, blue) => Math.max(255 - red, 255 - green, 255 - blue) > 10,
);
const markBounds = findBounds(
  (red, green, blue) => red > 210 && green < 175 && blue < 145,
);

await transparentCrop(logoBounds, 24).toFile(
  path.resolve(projectDir, "public/logo-media87.png"),
);

const markBuffer = await transparentCrop(markBounds, 16).toBuffer();

await sharp(markBuffer)
  .resize(420, 420, {
    fit: "contain",
    background: { r: 255, g: 255, b: 255, alpha: 0 },
  })
  .extend({
    top: 46,
    right: 46,
    bottom: 46,
    left: 46,
    background: { r: 255, g: 255, b: 255, alpha: 0 },
  })
  .png()
  .toFile(path.resolve(projectDir, "public/brand-mark.png"));

await sharp(markBuffer)
  .resize(420, 420, {
    fit: "contain",
    background: { r: 255, g: 255, b: 255, alpha: 0 },
  })
  .extend({
    top: 46,
    right: 46,
    bottom: 46,
    left: 46,
    background: { r: 255, g: 255, b: 255, alpha: 0 },
  })
  .png()
  .toFile(path.resolve(projectDir, "app/icon.png"));

await sharp(markBuffer)
  .resize(420, 420, {
    fit: "contain",
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  })
  .extend({
    top: 46,
    right: 46,
    bottom: 46,
    left: 46,
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  })
  .png()
  .toFile(path.resolve(projectDir, "app/apple-icon.png"));

console.log({
  logoBounds,
  markBounds,
  files: [
    "public/logo-media87.png",
    "public/brand-mark.png",
    "app/icon.png",
    "app/apple-icon.png",
  ],
});
