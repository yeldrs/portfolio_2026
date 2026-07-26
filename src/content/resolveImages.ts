// src/content/resolveImages.ts
// Images (cardImage, projectImages) are authored once, in the en/ entry.
// Non-default locales omit them and inherit the en/ values here at build time,
// so a project's visuals are edited in exactly one file regardless of locale count.

import type { CollectionEntry } from "astro:content";

export function withResolvedImages(
  project: CollectionEntry<"projects">,
  allProjects: CollectionEntry<"projects">[],
): CollectionEntry<"projects"> {
  if (project.data.cardImage && project.data.projectImages) return project;

  const source = allProjects.find(
    (p) =>
      p.slug.startsWith("en/") &&
      p.data.semanticSlug === project.data.semanticSlug,
  );

  return {
    ...project,
    data: {
      ...project.data,
      cardImage: project.data.cardImage ?? source?.data.cardImage ?? "",
      projectImages: project.data.projectImages ?? source?.data.projectImages,
    },
  };
}
