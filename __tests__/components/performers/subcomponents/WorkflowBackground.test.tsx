import { render, screen } from '@testing-library/react';

import { IconName } from 'types';
import { WorkflowBackground } from 'components/performers/subcomponents';

jest.mock('styles', () => ({
  getWorkflowBackgroundTabletStyles: jest.fn(() => 'hidden md:max-lg:block'),
  getWorkflowBackgroundDesktopStyles: jest.fn(() => 'max-lg:hidden'),
}));

jest.mock('ui', () => ({
  SvgIconUI: jest.fn((props) => (
    <svg
      width={props.width}
      height={props.height}
      className={props.className}
      aria-hidden={props.ariaHidden}
      aria-label={!props.ariaHidden ? props.ariaLabel : undefined}
      role='img'
    >
      <use href={`/images/icons.svg#icon-${props.id}`}></use>
    </svg>
  )),
}));

describe('WorkflowBackground subComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the icon with its styles for different screens', () => {
    const { container } = render(<WorkflowBackground />);

    const tabletIconUse = container.querySelector(
      `use[href='/images/icons.svg#icon-${IconName.PartnershipStepMd}']`,
    );
    expect(tabletIconUse).toBeInTheDocument();
    screen.debug();
    if (tabletIconUse) {
      const tabletIconSvg = tabletIconUse.closest('svg');
      // eslint-disable-next-line jest/no-conditional-expect
      expect(tabletIconSvg).toHaveClass('hidden md:max-lg:block');
    }

    const desktopIconUse = container.querySelector(
      `use[href='/images/icons.svg#icon-${IconName.PartnershipStepLg}']`,
    );
    expect(desktopIconUse).toBeInTheDocument();

    if (desktopIconUse) {
      const desktopIconSvg = desktopIconUse.closest('svg');
      // eslint-disable-next-line jest/no-conditional-expect
      expect(desktopIconSvg).toHaveClass('max-lg:hidden');
    }
  });
});
