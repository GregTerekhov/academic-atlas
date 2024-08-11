import { render, screen } from '@testing-library/react';

import { IconName, IconSize } from 'types';

import { OverviewItem } from 'components/home/subcomponents';
import { SvgIconUI } from 'ui';

jest.mock('ui', () => ({
  SvgIconUI: jest.fn(() => <svg data-testid='overview-icon' />),
}));

describe('OverviewItem Component', () => {
  const iconName: IconName = IconName.Overview3;
  const step = 'Після внесення 50% передоплати виконавець приступає до виконання завдання';

  beforeEach(() => {
    render(
      <OverviewItem
        iconName={iconName}
        step={step}
      />,
    );
  });

  it('should render correctly with provided props', () => {
    const stepElement = screen.getByText(step);
    expect(stepElement).toBeInTheDocument();

    expect(SvgIconUI).toHaveBeenCalledWith(
      expect.objectContaining({
        id: iconName,
        size: { width: IconSize.L, height: IconSize.L },
        className: 'fill-accentPrimary-darker lg:size-16',
      }),
      {},
    );

    const listItem = stepElement.closest('li');
    expect(listItem).toHaveClass('flex items-center gap-x-2 lg:gap-x-4');
  });

  it('should render the circle and inner dot correctly', () => {
    const outerCircle = screen
      .getByRole('listitem')
      .querySelector('.relative.flex.items-center.justify-center.rounded-full.bg-whiteBase\\/10');
    expect(outerCircle).toHaveClass('size-[28px] lg:size-10');
    expect(outerCircle).toBeInTheDocument();

    const innerDot = outerCircle?.querySelector('.rounded-full.bg-accentPrimary');
    expect(innerDot).toHaveClass('size-4');
    expect(innerDot).toBeInTheDocument();
  });
});
