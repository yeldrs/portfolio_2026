// tailwind.config.mjs
import colors from './src/styles/tokens-colors.json'; // Assurez-vous que vos tokens sont accessibles
import spacing from './src/styles/tokens-spacing.json'; 

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}', // 👈 Ligne critique à ajouter
    './pages/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}', // Optionnel, selon la structure
  ],
  theme: {
    extend: {
      // 1. COLORS
      colors: {
        // Couleurs sémantiques basées sur les tokens.json
        'background-primary': '#ffffff', // base.White
        'background-brand': '#367984',
        'text-body-primary': '#030712', // base.Black
        'text-body-tertiary': '#99a1af', // gray.400
        'button-background-primary': '#367984', // blue-chill.600
        'button-text-primary': '#ffffff', // base.White
         'button-hover-primary': '#2d6470',  // La couleur hexadécimale que vous avez définie pour le hover
        'button-active-primary': '#245159', // La couleur hexadécimale que vous avez définie pour l'état actif
        'stroke-secondary': '#59aeb7', // blue-chill.400
        'stroke-primary': '#367984', // blue-chill.600
        // ... ajoutez toutes vos couleurs sémantiques et primitives ici ...
      },

      // 2. FONT SIZES
      fontSize: {
        '5xl': '48px', // font.size.5xl
        'lg': '18px',  // font.size.lg
        'sm': '14px',  // font.size.sm
        'base': '16px', // font.size.base
        // ...
      },

      // 3. FONT WEIGHTS
      fontWeight: {
        'extrabold': '800', // font.weight.extrabold
        'semibold': '600',  // font.weight.semibold
        // ...
      },
      
      // 4. SPACING (pour padding, margin, gap)
      spacing: {
        'xxs': '2px', // Spacing.xxs
        'xs': '4px',  // Spacing.xs
        'sm-d': '12px', // Spacing.sm-d
        'md': '16px', // Spacing.md
        'lg': '24px', // Spacing.lg
        'xl': '32px', // Spacing.xl
        // ...
      },
      
      // 5. BORDER RADIUS
      borderRadius: {
        'md': '6px', // Border.Border-radius.rounded-md
        'xl': '12px', // Border.Border-radius.rounded-xl
        '2xl': '16px', // Border.Border-radius.rounded-2xl
        // ...
      },
    },
  },
  plugins: [],
}