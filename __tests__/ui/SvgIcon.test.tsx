import { render } from '@testing-library/react';

import { AriaLabel, IconName, IconSize, SvgSizes } from 'types';

import { SvgIconUI } from 'ui';

describe('SvgIcon', () => {
  const iconName: IconName = IconName.Burger;
  const iconSize: SvgSizes = { width: IconSize.L, height: IconSize.L };
  const iconClass = 'fill-darkBase/75 dark:fill-whiteBase lg:group-hover:fill-accentSecondary';
  const ariaLabel: AriaLabel = AriaLabel.Burger;

  it('renders the SVG element with the correct attributes', () => {
    const { container } = render(
      <SvgIconUI
        id={iconName}
        size={iconSize}
        className={iconClass}
      />,
    );

    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('width', `${iconSize.width}`);
    expect(svgElement).toHaveAttribute('height', `${iconSize.height}`);
    expect(svgElement).toHaveAttribute('class', iconClass);
    expect(svgElement).toHaveAttribute('aria-hidden', 'true');
    expect(svgElement).not.toHaveAttribute('aria-label');
    // expect(svgElement).toHaveAttribute('aria-label', ariaLabel);
  });

  it('sets aria-label and removes aria-hidden when ariaHidden is false', () => {
    const { getByLabelText } = render(
      <SvgIconUI
        id={iconName}
        size={iconSize}
        className={iconClass}
        ariaLabel={ariaLabel}
        ariaHidden={false}
      />,
    );

    const svgElement = getByLabelText(ariaLabel);
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('aria-label', ariaLabel);
    expect(svgElement).toHaveAttribute('aria-hidden', 'false');
  });

  it('renders <use> element with correct href', () => {
    const { container } = render(
      <SvgIconUI
        id={iconName}
        size={iconSize}
        className={iconClass}
      />,
    );

    const useElement = container.querySelector('use');
    expect(useElement).toBeInTheDocument();
    expect(useElement).toHaveAttribute('href', `/images/icons.svg#icon-${iconName}`);
  });
});
