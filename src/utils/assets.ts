const isExternalOrAbsolute = (src?: string) =>
  Boolean(src && (/^https?:\/\//i.test(src) || src.startsWith("/")));

const perfumeImageOverrides: Record<string, string> = {
  "lira.jpg": "/perfume-info/perfume/lira/xerjoff-lira.jpg",
  "valentino-born-in-roma-intense-donna.jpg": "/perfume-info/perfume/born-in-roma/valentino-born-in-roma-intense-donna.jpg",
  "eldo-perfume.webp": "/perfume-info/perfume/ELDO/eldo-perfume.webp",
};

const notaImageOverrides: Record<string, string> = {
  "naranja.jpg": "/perfume-info/notas/naranja-roja.jpg",
  "vainilla.jpg": "/perfume-info/notas/vainilla.jpeg",
};

const brandImageOverrides: Record<string, string> = {
  "xerjoff.jpg": "/brand/xerjoff-logo.png",
  "valentino.jpg": "/brand/valentino-logo.png",
  "eldo.jpg": "/brand/ELDO-logo.png",
};

const normalizeFileAsset = (
  src: string | undefined,
  basePath: string,
  overrides: Record<string, string> = {},
  fallback = "",
) => {
  if (!src) return fallback;
  if (isExternalOrAbsolute(src)) return src;

  const filename = src.split(/[\\/]/).pop() || src;
  return overrides[filename] || `${basePath}/${filename}`;
};

export const normalizePerfumeImage = (src?: string) =>
  normalizeFileAsset(src, "/perfume-info/perfume", perfumeImageOverrides);

export const normalizeNotaImage = (src?: string) =>
  normalizeFileAsset(src, "/perfume-info/notas", notaImageOverrides);

export const normalizeBrandImage = (src?: string) =>
  normalizeFileAsset(src, "/brand", brandImageOverrides, "/brand/xerjoff-logo.png");
