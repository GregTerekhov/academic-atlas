import { render, screen } from '@testing-library/react';

import { IconName, IconSize } from 'types';
import { RequirementsItem } from 'components/performers/subcomponents';

jest.mock('styles', () => ({
  getRequirementsItemStyles: jest.fn(() => 'mock-item-class'),
  getRequirementsTitleStyles: jest.fn(() => 'mock-title-class'),
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

const props = {
  title: 'requirement-item-title-test',
  desc: 'requirement-item-desc-test',
};

describe('Requirement performers subComponent', () => {
  beforeEach(() => {
    render(<RequirementsItem {...props} />);
  });

  it('should render title as an h3 element with correct class', () => {
    const title = screen.getByText(props.title);
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H3');
    expect(title).toHaveClass('mock-title-class');
  });

  it('should render description correctly', () => {
    const description = screen.getByText(props.desc);
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('generalText');
  });

  it('should render SVG icon with correct attributes', () => {
    const svgIcon = screen.getByRole('img');
    expect(svgIcon).toBeInTheDocument();
    expect(svgIcon).toHaveAttribute('width', IconSize.HalfM.toString());
    expect(svgIcon).toHaveAttribute('height', IconSize.HalfM.toString());
    expect(svgIcon).toHaveClass('fill-whiteBase dark:fill-accentSecondary md:size-8 lg:size-10');
    expect(svgIcon.querySelector('use')?.getAttribute('href')).toContain(IconName.Requirements);
  });

  it('should have correct class on list item', () => {
    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveClass('mock-item-class');
  });
});
