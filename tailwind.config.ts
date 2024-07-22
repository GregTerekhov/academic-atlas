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
      fontFamily: {
        philosopher: ['var(--font-philosopher)'],
      },
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
      minHeight: {
        mobileScreen: 'calc(100vh - 482px)',
        tabletScreen: 'calc(100vh - 418px)',
        desktopScreen: 'calc(100vh - 432px)',
      },
      maxHeight: {
        mobileMenu: 'calc(100vh - 80px)',
        tabletMenu: 'calc(100vh - 96px)',
        scroll: 'calc(100% - 32px)',
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
          DEFAULT: '#007cee',
          darker: '#3048a5',
        },
        accentSecondary: {
          DEFAULT: '#f8a401',
          darker: '#d12600',
        },
      },
      backgroundImage: {
        'accent-darkGradient': 'linear-gradient(to right, #f8a401, #d12600)',
        'accent-lightGradient': 'linear-gradient(to right, #007cee, #3048a5)',
        'section-overlay-dark': 'linear-gradient(to left, #1b1b1b4d, #1b1b1b)',
        'section-overlay-light': 'linear-gradient(to left, #1b1b1b33, #1b1b1ba6)',
        'background-light-gradient': 'linear-gradient(to bottom right, #007cee26, #fefefe)',
        'background-dark-gradient': 'linear-gradient(to bottom right, #1b1b1b, #1b254c)',
        'service-overview': "url('/backgroundImage/service-overview.png')",
        'partnership-hero': "url('/backgroundImage/partnership-hero.webp')",
      },
    },
  },
  plugins: [hocusFunction, commonComponents, require('@tailwindcss/typography')],
};
export default config;
