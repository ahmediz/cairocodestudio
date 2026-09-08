import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1b1b1f',
        primary: {
          DEFAULT: '#E80863',
          50: '#FFECEF',
          100: '#FFD9DF',
          200: '#FEB2C0',
          300: '#FE86A0',
          400: '#FE4E80',
          500: '#E80863',
          600: '#BB054E',
          700: '#8F033A',
          800: '#660127',
          900: '#3F0015',
          950: '#2B000C',
        },
        surface: {
          50: '#E5E5E5',
          100: '#C9C9C9',
          200: '#969696',
          300: '#666666',
          400: '#393939',
          500: '#111111',
          600: '#0E0E0E',
          700: '#0B0B0B',
          800: '#070707',
          900: '#040404',
          950: '#040404',
        },
      },
      fontFamily: {
        antonio: ['var(--font-antonio)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
