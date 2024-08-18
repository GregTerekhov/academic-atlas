import { render, screen } from '@testing-library/react';
import { AboutCompany } from 'components';
import { getAboutUsData } from 'data';
import { IAboutUs } from 'types';

jest.mock('template', () => ({
  MappedListTemplate: jest.fn(({ children, items }) => (
    <ul data-testid='test-about-us-list'>{items.map((item: IAboutUs) => children(item))}</ul>
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
        id: 'test-id',
        title: '-test-title',
        description: 'test-description',
        imageSrc: 'test.scr',
        imageAlt: 'test.alt',
      },
    ]);

    render(<AboutCompany />);
  });

  it('should render a list of us', () => {
    const aboutUsList = screen.getByTestId('test-about-us-list');
    expect(aboutUsList).toBeInTheDocument();

    const aboutUsItem = screen.getByTestId('about-us-item');
    expect(aboutUsItem).toBeInTheDocument();
  });
});
