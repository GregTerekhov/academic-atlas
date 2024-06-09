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
      padding: '8px 0',

      '@media (min-width: 768px)': {
        maxHeight: '96px',
        padding: '16px 0',
      },
      '@media (min-width: 1440px)': {
        maxHeight: '112px',
      },
    },
  });
});

export const customBackgroundImages = plugin(function ({ addUtilities }) {
  const newUtilities: Record<string, { backgroundImage: string }> = {};
  const titles = ['hero', 'find-out-cost', 'performers', 'promotions', 'service-overview'];

  titles.forEach((title) => {
    newUtilities[`.bg-${title}`] = {
      backgroundImage: `url('/backgroundImage/${title}.webp')`,
    };
  });

  addUtilities(newUtilities);
});