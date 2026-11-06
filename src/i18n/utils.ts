// src/i18n/utils.ts

import { getRelativeLocaleUrl } from "astro:i18n";
import { ui, defaultLang, type UiLocale, type UiKey } from "./ui";

export function useTranslations(lang: string | undefined) {
  const locale: UiLocale = lang === "fr" ? "fr" : defaultLang;

  return function t(key: UiKey, vars?: Record<string, string>): string {
    let value: string = ui[locale][key] ?? ui[defaultLang][key];

    if (vars) {
      for (const [name, replacement] of Object.entries(vars)) {
        value = value.replace(`{${name}}`, replacement);
      }
    }

    return value;
  };
}

// build.format:'file' surfaces nested index routes (e.g. src/pages/fr/index.astro)
// as Astro.url.pathname === "/fr.html" rather than "/fr/" — normalize both cases.
export function cleanPathname(pathname: string): string {
  return pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "") || "/";
}

// Strips the /fr (or other non-default locale) prefix from a pathname,
// returning the locale-agnostic path (e.g. "/fr/about" -> "/about").
export function stripLocalePrefix(pathname: string, lang: UiLocale): string {
  const cleaned = cleanPathname(pathname);
  const prefix = lang === defaultLang ? "" : `/${lang}`;
  if (!prefix || !cleaned.startsWith(prefix)) return cleaned;
  return cleaned.slice(prefix.length) || "/";
}

// build.format:'file' never emits a directory index.html (e.g. src/pages/fr/index.astro
// builds to dist/fr.html, not dist/fr/index.html), so a trailing-slash locale-root URL
// like "/fr/" 404s on GitHub Pages — Astro's getRelativeLocaleUrl(locale, "/") always
// appends one. Strip it everywhere except the true site root ("/").
export function stripTrailingSlash(path: string): string {
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

// Routes whose slug differs per locale. Keys are the default-locale path, values the
// path inside the non-default locale (after its prefix). Add a route here AND its page.
const LOCALE_SLUGS: Partial<Record<UiLocale, Record<string, string>>> = {
  fr: { "/workshop": "/atelier" },
};

// Default-locale path -> the path used inside `lang` (identity for most routes).
export function toLocaleSlug(path: string, lang: UiLocale): string {
  return LOCALE_SLUGS[lang]?.[path] ?? path;
}

// Path inside `lang` -> the default-locale path (inverse of toLocaleSlug).
export function toDefaultSlug(path: string, lang: UiLocale): string {
  const map = LOCALE_SLUGS[lang];
  if (!map) return path;
  return Object.entries(map).find(([, localized]) => localized === path)?.[0] ?? path;
}

// Builds the equivalent path in another locale, preserving the current route.
export function getLocalizedPath(
  pathname: string,
  fromLang: UiLocale,
  toLang: UiLocale,
): string {
  const neutral = toDefaultSlug(stripLocalePrefix(pathname, fromLang), fromLang);
  return stripTrailingSlash(getRelativeLocaleUrl(toLang, toLocaleSlug(neutral, toLang)));
}

// Project titles carry raw numeric HTML entities (e.g. "&#8209;" for a
// non-breaking hyphen) meant for set:html rendering. Astro's text
// interpolation escapes the "&" itself in plain-text contexts (<title>,
// alt, JSON-LD), double-escaping the entity into literal text — decode it
// first wherever the title is used as plain text instead of set:html.
export function plainText(html: string): string {
  return html.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}
