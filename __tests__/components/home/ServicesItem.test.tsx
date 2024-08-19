import { render, screen, fireEvent } from '@testing-library/react';

import { PrimaryButtonLabel, WorkType } from 'types';
import { getAndEncodeDataObject } from 'helpers';

import ServiceItem from 'components/home/subcomponents/service-item';

jest.mock('helpers', () => ({
  getAndEncodeDataObject: jest.fn(),
}));

describe('ServiceItem Component', () => {
  const mockData = {
    imageSrc: '/public/images/services-001.webp',
    imageAlt: 'test-image-alt',
    serviceTitle: WorkType.BachelorTheses,
    priority: true,
  };

  const mockGetAndEncodeDataObject = getAndEncodeDataObject as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockGetAndEncodeDataObject.mockReturnValue('encodedData');
  });

  it('should render ServiceItem with correct props', () => {
    render(<ServiceItem {...mockData} />);

    expect(screen.getByAltText('test-image-alt')).toBeInTheDocument();
    expect(screen.getByText(WorkType.BachelorTheses)).toBeInTheDocument();
    expect(screen.getByText(PrimaryButtonLabel.Ordering)).toBeInTheDocument();
  });

  it('renders correct heading', () => {
    render(<ServiceItem {...mockData} />);

    const workTypeTitle = screen.getByRole('heading', { level: 3 });
    expect(workTypeTitle).toBeInTheDocument();
  });

  it('renders correct heading with additional text when serviceTitle is Diplomas', () => {
    const diplomasData = { ...mockData, serviceTitle: WorkType.Diplomas };

    render(<ServiceItem {...diplomasData} />);

    expect(screen.getByText(`${WorkType.Diplomas} та коледжів`)).toBeInTheDocument();
  });

  it('renders correct heading without additional text for other service titles', () => {
    render(<ServiceItem {...mockData} />);

    expect(screen.getByText(WorkType.BachelorTheses)).toBeInTheDocument();
  });

  it('should handle link click correctly when getAndEncodeDataObject returns a value', () => {
    render(<ServiceItem {...mockData} />);

    const link = screen.getByRole('link');
    fireEvent.click(link);

    expect(link).toHaveAttribute('href', 'https://t.me/AcademicAtlasBot?start=encodedData');
  });

  it('should prevent link navigation and set href to "#" when getAndEncodeDataObject returns undefined', async () => {
    mockGetAndEncodeDataObject.mockReturnValue(undefined);

    render(<ServiceItem {...mockData} />);

    const link = screen.getByRole('link');
    fireEvent.click(link);

    expect(link).toHaveAttribute('href', '#');
  });
});
