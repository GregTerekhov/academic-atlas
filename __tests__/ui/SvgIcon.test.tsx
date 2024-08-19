import { render } from '@testing-library/react';

import { AriaLabel, IconName, IconSize, SvgSizes } from 'types';

import { SvgIconUI } from 'ui';

describe('SvgIconUI Component', () => {
  const mockIconName: IconName = IconName.Burger;
  const mockIconSize: SvgSizes = { width: IconSize.L, height: IconSize.L };
  const mockIconClass = 'fill-darkBase/75 dark:fill-whiteBase lg:group-hover:fill-accentSecondary';
  const mockAriaLabel: AriaLabel = AriaLabel.Burger;

  const renderSvgIcon = (props = {}) => {
    return render(
      <SvgIconUI
        id={mockIconName}
        size={mockIconSize}
        className={mockIconClass}
        {...props}
      />,
    );
  };

  it('renders the SVG element with the correct attributes', () => {
    const { container } = renderSvgIcon();

    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('width', `${mockIconSize.width}`);
    expect(svgElement).toHaveAttribute('height', `${mockIconSize.height}`);
    expect(svgElement).toHaveAttribute('class', mockIconClass);
    expect(svgElement).toHaveAttribute('aria-hidden', 'true');
    expect(svgElement).not.toHaveAttribute('aria-label');
    expect(svgElement).toHaveAttribute('role', 'img');
  });

  it('sets aria-label and removes aria-hidden when ariaHidden is false', () => {
    const { getByLabelText } = renderSvgIcon({
      ariaLabel: mockAriaLabel,
      ariaHidden: false,
    });

    const svgElement = getByLabelText(mockAriaLabel);
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('aria-label', mockAriaLabel);
    expect(svgElement).toHaveAttribute('aria-hidden', 'false');
  });

  it('renders <use> element with correct href', () => {
    const { container } = renderSvgIcon();

    const useElement = container.querySelector('use');
    expect(useElement).toBeInTheDocument();
    expect(useElement).toHaveAttribute('href', `/images/icons.svg#icon-${mockIconName}`);
  });

  it('aaplies the correct className to the SVG element', () => {
    const { container } = renderSvgIcon();

    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('class', mockIconClass);
  });

  it('renders the correct href for different icon IDs', () => {
    const { container } = renderSvgIcon({ id: IconName.Close });

    const useElement = container.querySelector('use');
    expect(useElement).toHaveAttribute('href', `/images/icons.svg#icon-${IconName.Close}`);
  });
});
