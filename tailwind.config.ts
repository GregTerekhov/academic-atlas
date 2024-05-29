import type { Config } from 'tailwindcss';
import { headerStyles, hocusFunction } from './helpers';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layout/**/*.{js,ts,jsx,tsx,mdx}',
    './template/**/*.{js,ts,jsx,tsx,mdx}',
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1440px',
    },
    container: {
      center: true,
    },
    extend: {
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        medium: '18px',
        big: '20px',
        lg: '22px',
        xl: '24px',
        '1.5xl': '26px',
        '2xl': '28px',
        '3xl': '32px',
        '4xl': '36px',
        '5xl': '40px',
        giant: '55px',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        whiteBase: '#fefefe',
        darkBase: {
          light: '#1b254c',
          DEFAULT: '#1b1b1b',
        },
        disabled: {
          foreground: '#959595',
          background: '#2f2f2f',
        },
        accentPrimary: {
          DEFAULT: '#f8a401',
          darker: '#d12600',
        },
        accentSecondary: {
          DEFAULT: '#2091f9',
          darker: '#3048a5',
        },
      },
      backgroundImage: {
        // 'hero': ,
        // 'price': ,
        serviceOverview: "url('/service-overview.webp')",
        // 'promotions': ,
        // 'performers': ,

        //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        //   'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [hocusFunction, headerStyles],
};
export default config;
