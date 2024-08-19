import { render, screen } from '@testing-library/react';

import { type IServiceItem, SectionDescriptions, SectionTitle, WorkType } from 'types';
import { getServices, getSectionProps } from 'data';
import { Services } from 'components';

jest.mock('data', () => ({
  getServices: jest.fn(),
  getSectionProps: jest.fn(),
}));

jest.mock('template', () => ({
  MappedListTemplate: jest.fn(({ children, items }) => (
    <ul>{items.map((item: IServiceItem) => children(item))}</ul>
  )),
  SectionTemplate: jest.fn(({ children, title }) => {
    return (
      <section id={title}>
        <h2>{SectionDescriptions[SectionTitle.OurServices]}</h2>
        {children}
      </section>
    );
  }),
}));

jest.mock('components/home/subcomponents', () => ({
  ServiceItem: jest.fn((props) => {
    const { imageSrc, imageAlt, serviceTitle, priority, ...restProps } = props;
    return (
      <li
        data-testid='service-item'
        data-image-src={imageSrc}
        data-image-alt={imageAlt}
        data-service-title={serviceTitle}
        data-priority={priority}
        {...restProps}
      ></li>
    );
  }),
}));

describe('Services Component', () => {
  const mockGetServices = getServices as jest.Mock;
  const mockGetSectionProps = getSectionProps as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockGetServices.mockReturnValue([
      {
        id: 'test-id',
        imageSrc: '/images/services-002.webp',
        imageAlt: 'test-image-alt',
        serviceTitle: WorkType.BachelorTheses,
        priority: true,
      },
    ]);

    mockGetSectionProps.mockReturnValue({
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
    expect(screen.getByTestId('service-item')).toBeInTheDocument();
  });
});
