// tailwind.config.mjs
import {
  tokens
} from './src/styles/tokens.js';
// 🚨 CORRECTION : Importez defaultTheme pour pouvoir l'utiliser
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
    './pages/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Cette ligne définit Manrope comme la nouvelle police 'sans' par défaut
        // 🚨 CORRECTION : defaultTheme est maintenant défini
        sans: ['Manrope', ...defaultTheme.fontFamily.sans],
      },
      // Colors: map a few semantic names to primitive values
      colors: {
        'background-primary': tokens.primitives.color.base.white,
        'background-brand': tokens.primitives.color['blue-chill'][600],
        'text-body-primary': tokens.primitives.color.base.black,
        'text-body-tertiary': tokens.primitives.color.gray[400],
        'text-body-secondary': tokens.primitives.color.gray[600],
        'text-body-accent': tokens.primitives.color['blue-chill'][600],
        'button-background-primary': tokens.primitives.color['blue-chill'][600],
        'button-text-primary': tokens.primitives.color.base.white,
        'stroke-primary': tokens.primitives.color['blue-chill'][400],
        'stroke-primary-dark': tokens.primitives.color['blue-chill'][500],
      },

      // Font sizes (Styles Composés: [font-size, {lineHeight: ratio}])
      fontSize: {
        // Corps de texte
        'sm': [tokens.primitives.fontSize.sm, {
          lineHeight: '1.143'
        }], // 14px / 16px
        'base': [tokens.primitives.fontSize.base, {
          lineHeight: '1.25'
        }], // 16px / 20px

        // 🚨 H3 (text-lg): 18px / 24px
        'lg': [tokens.primitives.fontSize.lg, {
          lineHeight: '1.333'
        }], 

        // Reste des tailles pour complétude
        '2xl': [tokens.primitives.fontSize['2xl'], {
          lineHeight: '1.167'
        }], // 24px / 28px

        // 🚨 H2 (text-3xl): 30px / 36px
        '3xl': [tokens.primitives.fontSize['3xl'], {
          lineHeight: '1.2'
        }], 

        // 🚨 H1 (text-4xl): 36px / 40px
        '4xl': [tokens.primitives.fontSize['4xl'], {
          lineHeight: '1.111'
        }],

        // Titres restants
        '5xl': [tokens.primitives.fontSize['5xl'], {
          lineHeight: '1'
        }], 
        '6xl': [tokens.primitives.fontSize['6xl'], {
          lineHeight: '1'
        }],
      },

      // Font weights (Reste inchangé)
      fontWeight: {
        extrabold: tokens.primitives.fontWeight.extrabold,
        semibold: tokens.primitives.fontWeight.semibold,
        normal: tokens.primitives.fontWeight.normal,
      },

      // Spacing scale (Reste inchangé)
      spacing: {
        'xxs': tokens.primitives.spacing.xxs,
        'xs': tokens.primitives.spacing.xs,
        'sm': tokens.primitives.spacing.sm,
        'sm-d': tokens.primitives.spacing['sm-d'],
        'md': tokens.primitives.spacing.md,
        'lg': tokens.primitives.spacing.lg,
        'xl': tokens.primitives.spacing.xl,
        '2xl': tokens.primitives.spacing['2xl'],
        '3xl': tokens.primitives.spacing['3xl'],
        '4xl': tokens.primitives.spacing['4xl'],
        '5xl': tokens.primitives.spacing['5xl'],
        '6xl': tokens.primitives.spacing['6xl'],
      },

      // Border radius (Reste inchangé)
      borderRadius: {
        md: tokens.primitives.borderRadius.md,
        xl: tokens.primitives.borderRadius.xl,
        '2xl': tokens.primitives.borderRadius['2xl'],
        card: tokens.semantic.border.radius.card,
      },

      // Max width (container) (Reste inchangé)
      maxWidth: {
        content: tokens.semantic.layout.container.maxWidth,
      },

      // Aspect ratio token (Reste inchangé)
      aspectRatio: {
        card: tokens.semantic.layout.image.aspectRatio,
      },

      // Gap tokens for grids (Reste inchangé)
      gap: {
        grid: tokens.semantic.layout.grid.gap.base,
        'grid-lg': tokens.semantic.layout.grid.gap.large,
      },

      // Scale (Reste inchangé)
      scale: {
        '120': '1.20',
        '130': '1.30',
      },
    },
  },
  plugins: [],
};