// src/styles/tokens.js
//
// SINGLE SOURCE OF TRUTH of the design system.
//   primitives  → raw values (hex, px…)
//   semantic    → role names that REFERENCE the primitives (real values, not placeholders)
// tailwind.config.mjs consumes `tokens.semantic.colors` directly: there is no longer a
// hand-duplicated mapping, so no possible divergence.

const primitives = {
  color: {
    base: {
      white: "#ffffff",
      black: "#030712",
    },
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5dc",
      400: "#99a1af",
      500: "#6a7282",
      600: "#4a5565",
      700: "#364153",
      800: "#1e2939",
      900: "#101828",
      950: "#030712",
    },

    surface: {
      page: "#f4f7f8",
    },

    // Accent / brand color — action (violet)
    "accent-action": {
      50: "#eef1ff",
      100: "#dfe5ff",
      200: "#becbff",
      300: "#a3b5fe",
      400: "#7f98fa",
      500: "#607ef4",
      600: "#4364e8",
      700: "#3553cd",
      800: "#2e46a5",
      900: "#2c3d83",
      950: "#1a244c",
    },
  },

  fontSize: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "60px",
  },

  fontWeight: {
    thin: 100,
    normal: 400,
    thick: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  leading: {
    normal: "1.5",
    relaxed: "1.625",
  },

  spacing: {
    xxs: "2px",
    xs: "4px",
    sm: "8px",
    "sm-d": "12px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
    "3xl": "64px",
    "4xl": "80px",
    "5xl": "96px",
    "6xl": "112px",
  },

  borderRadius: {
    md: "6px",
    xl: "12px",
    "2xl": "16px",
  },
};

const semantic = {
  // Color roles — consumed as-is by tailwind.config.mjs (theme.extend.colors)
  colors: {
    // Backgrounds
    "background-primary": primitives.color.base.white,
    "background-brand": primitives.color["accent-action"][600],
    "background-page": primitives.color.surface.page,
    "background-accent-primary": primitives.color["accent-action"][500],
    "background-disabled": primitives.color.gray[300],

    // Text
    "text-body-primary": primitives.color.base.black,
    "text-body-secondary": primitives.color.gray[600],
    "text-body-tertiary": primitives.color.gray[400],
    "text-body-accent": primitives.color["accent-action"][600],
    "text-heading-accent": primitives.color["accent-action"][600],

    // Buttons
    "button-background-primary": primitives.color["accent-action"][600],
    "button-text-primary": primitives.color.base.white,
    "button-hover-primary": primitives.color["accent-action"][400],
    "button-active-primary": primitives.color["accent-action"][500],
    "button-background-secondary": primitives.color.gray[950],
    "button-hover-secondary": primitives.color.gray[800],
    "button-active-secondary": primitives.color.gray[800],

    // Borders / strokes
    "stroke-primary": primitives.color["accent-action"][400],
    "stroke-primary-hover": primitives.color["accent-action"][200],
    "stroke-primary-dark": primitives.color["accent-action"][500],
    "stroke-secondary": primitives.color.gray[200], // subtle separators (Footer, about)
    "stroke-neutral-primary": primitives.color.gray[300],
    "stroke-tertiary": primitives.color.gray[50],
    "stroke-tertiary-hover": primitives.color.gray[200],
    "stroke-disabled": primitives.color.gray[300],
  },

  layout: {
    container: {
      maxWidth: "1200px",
    },
    image: {
      aspectRatio: "4/3",
    },
    grid: {
      gap: {
        base: "16px",
        large: "32px",
      },
    },
  },

  border: {
    radius: {
      card: "12px",
    },
  },
};

export const tokens = { primitives, semantic };
