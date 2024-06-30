import type { Config } from 'tailwindcss';
import { hocusFunction, commonComponents } from './helpers';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
    './helpers/**/*.{js,ts,jsx,tsx,mdx}',
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
        '4xl': '40px',
        '5xl': '48px',
        '6xl': '52px',
        '7xl': '60px',
        '8xl': '90px',
        monstrousSm: '120px',
        monstrousMd: '200px',
        monstrousLg: '260px',
      },
      lineHeight: {
        130: '1.3',
      },
      maxHeight: {
        mobileMenu: 'calc(100vh - 80px)',
        tabletMenu: 'calc(100vh - 96px)',
        mobileSkeleton: 'calc(100vh - 482px)',
        tabletSkeleton: 'calc(100vh - 418px)',
        desktopSkeleton: 'calc(100vh - 432px)',
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
        hero: "url('/backgroundImage/hero.webp')",
        'find-out-cost': "url('/backgroundImage/find-out-cost.webp')",
        performers: "url('/backgroundImage/performers.webp')",
        promotions: "url('/backgroundImage/promotions.webp')",
        'service-overview': "url('/backgroundImage/service-overview.webp')",
        'faq-order': "url('/backgroundImage/faq-order.webp')",
        'accent-gradient': 'linear-gradient(to right, #f8a401, #d12600)',
        'background-gradient': 'linear-gradient(to bottom right, #1b1b1b, #1b254c )',
        notFound: "url('/backgroundImage/404.webp')",
        'partnership-hero': "url('/backgroundImage/partnership-hero.webp')",
        'partnership-benefits': "url('/backgroundImage/partnership-benefits.webp')",
        'partnership-requirements': "url('/backgroundImage/partnership-requirements.webp')",
      },
    },
  },
  plugins: [hocusFunction, commonComponents, require('@tailwindcss/typography')],
};
export default config;
