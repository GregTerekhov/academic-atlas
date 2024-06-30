import plugin from 'tailwindcss/plugin';

export const hocusFunction = plugin(function ({ addVariant }) {
  addVariant('hocus', ['&:hover', '&:focus']);
});

export const commonComponents = plugin(function ({ addComponents, theme }) {
  addComponents({
    '.generalText': {
      fontSize: theme('fontSize.sm'),
      lineHeight: theme('lineHeight.130'),

      '@media (min-width: 768px)': {
        fontSize: theme('fontSize.base'),
        lineHeight: '1.5',
      },

      '@media (min-width: 1440px)': {
        fontSize: theme('fontSize.big'),
      },
    },
    '.gradientText': {
      backgroundImage: theme('backgroundImage.accent-gradient'),
      fontSize: theme('fontSize[6xl]'),
      lineHeight: theme('lineHeight.130'),
      letterSpacing: '2px',
      color: theme('colors.transparent'),
      backgroundClip: 'text',

      '@media (min-width: 768px)': {
        fontSize: theme('fontSize[7xl]'),
      },

      '@media (min-width: 1440px)': {
        fontSize: theme('fontSize[8xl]'),
      },
    },
    '.backgroundSection': {
      position: 'relative',
      width: '100vw',
      maxWidth: '4000px',
      margin: '0 auto',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      color: theme('colors.whiteBase'),

      '&::before': {
        position: 'absolute',
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
        content: '',
      },
    },
  });
});
