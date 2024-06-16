import plugin from 'tailwindcss/plugin';

export const hocusFunction = plugin(function ({ addVariant }) {
  addVariant('hocus', ['&:hover', '&:focus']);
});
