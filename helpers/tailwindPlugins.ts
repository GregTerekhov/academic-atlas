import plugin from 'tailwindcss/plugin';

export const hocusFunction = plugin(function ({ addVariant }) {
  addVariant('hocus', ['&:hover', '&:focus']);
});

export const generalText = plugin(function ({ addComponents, theme }) {
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
  });
});
