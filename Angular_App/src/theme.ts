import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
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
    colorScheme: {
      light: {
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
    },
  },
});
