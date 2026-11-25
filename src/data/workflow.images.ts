// src/data/workflow.images.ts
//
// Screenshots of the workflow page live in src/assets/workflow/ (optimised by astro:assets).
// YAML refers to them by file name.

import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

const files = import.meta.glob<{ default: ImageMetadata }>("../assets/workflow/*.{webp,avif,png,jpg,jpeg}", {
  eager: true,
});

export function workflowImage(name?: string): ImageMetadata | undefined {
  return name ? files[`../assets/workflow/${name}`]?.default : undefined;
}

// Larger render opened by the site's preview modal (never upscaled past the source).
export async function zoomUrl(image: ImageMetadata, max = 1600): Promise<string> {
  return (await getImage({ src: image, width: Math.min(max, image.width), format: "webp" })).src;
}

// Case-study showcase screens live in src/assets/projects/<project>/ and are referred to as
// "<project>/<file>".
const projectFiles = import.meta.glob<{ default: ImageMetadata }>("../assets/projects/*/*.{webp,avif,png,jpg,jpeg}", {
  eager: true,
});

export function projectImage(name?: string): ImageMetadata | undefined {
  return name ? projectFiles[`../assets/projects/${name}`]?.default : undefined;
}
