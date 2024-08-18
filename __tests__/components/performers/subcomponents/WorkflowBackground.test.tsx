import { render } from '@testing-library/react';
import { WorkflowBackground } from 'components/performers/subcomponents';

jest.mock('styles', () => ({
  getWorkflowBackgroundTabletStyles: jest.fn(),
  getWorkflowBackgroundDesktopStyles: jest.fn(),
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
  test('should render subComponent correctly', () => {
    const { container } = render(<WorkflowBackground />);

    const workflowBackgroundSVG = container.querySelector('svg');
    expect(workflowBackgroundSVG).toBeInTheDocument();
  });
});
