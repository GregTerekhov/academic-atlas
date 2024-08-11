import { render, screen } from '@testing-library/react';

import { SectionDescriptions, SectionTitle, WorkType } from 'types';
import { getServices, getSectionProps } from 'data';
import { Services } from 'components';

jest.mock('data', () => ({
  getServices: jest.fn(),
  getSectionProps: jest.fn(),
}));

jest.mock('template', () => ({
  MappedListTemplate: jest.fn(({ children }) => <ul>{children}</ul>),
  SectionTemplate: jest.fn(({ children }) => <section>{children}</section>),
}));

jest.mock('../../../components/home/subcomponents/service-item', () => ({
  ServiceItem: jest.fn(() => <li data-testid='overview-item'></li>),
}));

describe('Services Component', () => {
  beforeEach(() => {
    (getServices as jest.Mock).mockReturnValue([
      {
        id: 'test-id',
        imageSrc: 'test-image-src',
        imageAlt: 'test-image-alt',
        serviceTitle: WorkType.Diplomas,
      },
    ]);

    (getSectionProps as jest.Mock).mockReturnValue({
      homeServices: {
        title: SectionTitle.OurServices,
        id: 'our-services',
      },
    });
  });

  it('should render SectionTemplate and MappedListTemplate with ServiceItem', () => {
    render(<Services />);

    const sectionElement = screen.getByRole('heading', {
      level: 2,
      name: SectionDescriptions[SectionTitle.OurServices],
    });
    expect(sectionElement).toBeInTheDocument();
    expect(sectionElement.closest('section')).toHaveAttribute('id', 'our-services');
  });
});
