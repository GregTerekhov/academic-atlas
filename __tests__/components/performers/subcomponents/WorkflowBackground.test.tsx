import { render } from '@testing-library/react';

import { IconName } from 'types';
import { WorkflowBackground } from 'components/performers/subcomponents';

jest.mock('styles', () => ({
  getWorkflowBackgroundTabletStyles: jest.fn(() => 'hidden md:max-lg:block'),
  getWorkflowBackgroundDesktopStyles: jest.fn(() => 'max-lg:hidden'),
}));

jest.mock('ui', () => ({
  SvgIconUI: jest.fn((props) => (
    <svg
      width={props.size.width}
      height={props.size.height}
      className={props.className}
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

  const testCases = [
    {
      description: 'tablet',
      iconHref: `/images/icons.svg#icon-${IconName.PartnershipStepMd}`,
      expectedClass: 'hidden md:max-lg:block',
    },
    {
      description: 'desktop',
      iconHref: `/images/icons.svg#icon-${IconName.PartnershipStepLg}`,
      expectedClass: 'max-lg:hidden',
    },
  ];

  it.each(testCases)(
    'should render $description icon with correct styles',
    ({ iconHref, expectedClass }) => {
      const { container } = render(<WorkflowBackground />);

      const icon = container.querySelector(`svg > use[href='${iconHref}']`);
      expect(icon).toBeInTheDocument();
      expect(icon?.closest('svg')).toHaveClass(expectedClass);
    },
  );
});
