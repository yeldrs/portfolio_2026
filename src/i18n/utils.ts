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

// Builds the equivalent path in another locale, preserving the current route.
export function getLocalizedPath(
  pathname: string,
  fromLang: UiLocale,
  toLang: UiLocale,
): string {
  return stripTrailingSlash(getRelativeLocaleUrl(toLang, stripLocalePrefix(pathname, fromLang)));
}

// Project titles carry raw numeric HTML entities (e.g. "&#8209;" for a
// non-breaking hyphen) meant for set:html rendering. Astro's text
// interpolation escapes the "&" itself in plain-text contexts (<title>,
// alt, JSON-LD), double-escaping the entity into literal text — decode it
// first wherever the title is used as plain text instead of set:html.
export function plainText(html: string): string {
  return html.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}
