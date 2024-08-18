import { render, screen } from '@testing-library/react';
import { RequirementsItem } from 'components/performers/subcomponents';

jest.mock('styles', () => ({
  getRequirementsItemStyles: jest.fn(),
  getRequirementsTitleStyles: jest.fn(),
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

describe('Requirement performers subComponent', () => {
  test('should render subComponent correctly', () => {
    const testIRequirementsItemProps = {
      key: 'string',
      title: 'requirement-item-title-test',
      desc: 'requirement-item-desc-test',
    };

    const { container } = render(<RequirementsItem {...testIRequirementsItemProps} />);

    const requirementItemTitle = screen.getByText('requirement-item-title-test');
    expect(requirementItemTitle).toBeInTheDocument();

    const requirementItemDesc = screen.getByText('requirement-item-desc-test');
    expect(requirementItemDesc).toBeInTheDocument();

    const requirementItemSVG = container.querySelector('svg');
    expect(requirementItemSVG).toBeInTheDocument();
  });
});
