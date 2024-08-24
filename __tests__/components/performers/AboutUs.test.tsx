import { render, screen } from '@testing-library/react';

import { IAboutUs } from 'types';
import { getAboutUsData } from 'data';
import { AboutCompany } from 'components';

jest.mock('template', () => ({
  MappedListTemplate: jest.fn(({ children, items }) => (
    <ul data-testid='about-us-list'>{items.map((item: IAboutUs) => children(item))}</ul>
  )),
}));

jest.mock('components/performers/subcomponents', () => ({
  AboutUsItem: jest.fn(({ header, description, src, alt }) => (
    <li
      data-testid='about-us-item'
      data-header={header}
      data-description={description}
      data-src={src}
      data-alt={alt}
    ></li>
  )),
}));

jest.mock('data', () => ({
  getAboutUsData: jest.fn(),
}));

describe('AboutUs performers component', () => {
  const mockGetAboutUsData = getAboutUsData as jest.Mock;

  beforeEach(() => {
    mockGetAboutUsData.mockReturnValue([
      {
        id: 'test-id-1',
        title: 'Test Title 1',
        description: 'Test Description 1',
        imageSrc: 'test-src-1',
        imageAlt: 'test-alt-1',
      },
      {
        id: 'test-id-2',
        title: 'Test Title 2',
        description: 'Test Description 2',
        imageSrc: 'test-src-2',
        imageAlt: 'test-alt-2',
      },
    ]);

    render(<AboutCompany />);
  });

  it('should render the AboutUs list', () => {
    const aboutUsList = screen.getByTestId('about-us-list');
    expect(aboutUsList).toBeInTheDocument();
  });

  it('should render the correct number of AboutUs items', () => {
    const aboutUsItems = screen.getAllByTestId('about-us-item');
    expect(aboutUsItems).toHaveLength(2);
  });

  it('should render each AboutUs item with correct props', () => {
    const aboutUsItems = screen.getAllByTestId('about-us-item');

    aboutUsItems.forEach((item, index) => {
      expect(item).toHaveAttribute('data-header', `Test Title ${index + 1}`);
      expect(item).toHaveAttribute('data-description', `Test Description ${index + 1}`);
      expect(item).toHaveAttribute('data-src', `test-src-${index + 1}`);
      expect(item).toHaveAttribute('data-alt', `test-alt-${index + 1}`);
    });
  });

  it('should call getAboutUsData function once', () => {
    expect(mockGetAboutUsData).toHaveBeenCalledTimes(1);
  });
});
