// tailwind.config.mjs
import { tokens } from './src/styles/tokens.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
    './pages/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Colors: map a few semantic names to primitive values
      colors: {
        'background-primary': tokens.primitives.color.base.white,
        'background-brand': tokens.primitives.color['blue-chill'][600],
        'text-body-primary': tokens.primitives.color.base.black,
        'text-body-tertiary': tokens.primitives.color.gray[400],
        'text-body-secondary': tokens.primitives.color.gray[600],
        'button-background-primary': tokens.primitives.color['blue-chill'][600],
        'button-text-primary': tokens.primitives.color.base.white,
        'stroke-secondary': tokens.primitives.color['blue-chill'][400],
        'stroke-primary': tokens.primitives.color['blue-chill'][600],
      },

      // Font sizes (you can expand)
      fontSize: {
        '6xl': tokens.primitives.fontSize['6xl'],
        '4xl': tokens.primitives.fontSize['4xl'],
        'base': tokens.primitives.fontSize.base,
        'lg': tokens.primitives.fontSize.lg,
        'sm': tokens.primitives.fontSize.sm,
      },

      // Font weights
      fontWeight: {
        extrabold: tokens.primitives.fontWeight.extrabold,
        semibold: tokens.primitives.fontWeight.semibold,
        normal: tokens.primitives.fontWeight.normal,
      },

      // Spacing scale
      spacing: {
        'xxs': tokens.primitives.spacing.xxs,
        'xs': tokens.primitives.spacing.xs,
        'sm-d': tokens.primitives.spacing['sm-d'],
        'md': tokens.primitives.spacing.md,
        'lg': tokens.primitives.spacing.lg,
        'xl': tokens.primitives.spacing.xl,
        '2-xl': tokens.primitives.spacing['2-xl'],
        '3-xl': tokens.primitives.spacing['3-xl'],
      },

      // Border radius
      borderRadius: {
        md: tokens.primitives.borderRadius.md,
        xl: tokens.primitives.borderRadius.xl,
        '2xl': tokens.primitives.borderRadius['2xl'],
        card: tokens.semantic.border.radius.card,
      },

      // Max width (container)
      maxWidth: {
        content: tokens.semantic.layout.container.maxWidth,
      },

      // Aspect ratio token
      aspectRatio: {
        card: tokens.semantic.layout.image.aspectRatio,
      },

      // Gap tokens for grids
      gap: {
        grid: tokens.semantic.layout.grid.gap.base,
        'grid-lg': tokens.semantic.layout.grid.gap.large,
      },

      // Line-height
      lineHeight: {
        relaxed: tokens.primitives.leading.relaxed,
        normal: tokens.primitives.leading.normal,
      },

      // 4. SPACING (pour padding, margin, gap)
      spacing: {
        'xxs': tokens.primitives.spacing.xxs,
        'xs': tokens.primitives.spacing.xs,
        'sm-d': tokens.primitives.spacing['sm-d'],
        'md': tokens.primitives.spacing.md,
        'lg': tokens.primitives.spacing.lg,
        'xl': tokens.primitives.spacing.xl,
        '2xl': tokens.primitives.spacing['2xl'], // 48px
        '3xl': tokens.primitives.spacing['3xl'] ?? '64px', // 64px — ensure present
      },
    },
  },
  plugins: [],
};