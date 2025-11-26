// src/styles/tokens.js

export const tokens = {
  primitives: {
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
      "blue-chill": {
        50: "#f1f9fa",
        100: "#dcf0f1",
        200: "#bde2e4",
        300: "#8fcdd1",
        400: "#59aeb7",
        500: "#3b8c95",
        600: "#367984",
        700: "#31636d",
        800: "#2f525b",
        900: "#2b474e",
        950: "#182d34",
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
      semibold: 600,
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
  },

  semantic: {
    colors: {
      "background-primary": "{primitives.color.base.white}",
      "background-brand": "{primitives.color.blue-chill.600}",
      "text-body-primary": "{primitives.color.base.black}",
      "text-body-secondary": "{primitives.color.gray.600}",
      "text-body-tertiary": "{primitives.color.gray.400}",
      "text-body-accent": "{primitives.color.blue-chill.600}",
      "button-background-primary": "{primitives.color.blue-chill.600}",
      "button-text-primary": "{primitives.color.base.white}",
      "stroke-neutral-primary": "{primitives.color.gray.400}",
      "stroke-primary": "{primitives.color.blue-chill.400}",
      "stroke-primary-dark": "{primitives.color.blue-chill.500}",
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
  },
};
