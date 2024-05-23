import plugin from 'tailwindcss/plugin';

export const hocusFunction = plugin(function ({ addVariant }) {
  addVariant('hocus', ['&:hover', '&:focus']);
});

export const headerStyles = plugin(function ({ addComponents }) {
  addComponents({
    '.header': {
      position: 'fixed',
      left: '0',
      top: '0',
      zIndex: '10',
      maxHeight: '80px',
      width: '100%',

      '@media (min-width: 768px)': {
        maxHeight: '96px',
      },
      '@media (min-width: 1440px)': {
        maxHeight: '112px',
      },
    },
  });
});
