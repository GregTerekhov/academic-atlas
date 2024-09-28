import { render, screen, fireEvent } from '@testing-library/react';

import { AriaId, PrimaryButtonLabel, WorkType } from 'types';
import { getAndEncodeDataObject } from 'helpers';

import ServiceItem from 'components/home/subcomponents/service-item';

jest.mock('helpers', () => ({
  getAndEncodeDataObject: jest.fn(),
}));

jest.mock('ui/aria-description', () =>
  jest.fn(({ id, description }) => <span id={id}>{description}</span>),
);

jest.mock('ui/image', () =>
  jest.fn((props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={props.alt}
      src={props.src}
      width={props.width}
      height={props.height}
      className={props.className}
      priority={props.priority ? 'true' : undefined}
    />
  )),
);

describe('ServiceItem Component', () => {
  const defaultMockData = {
    imageSrc: '/public/images/services-001.webp',
    imageAlt: 'test-image-alt',
    serviceTitle: WorkType.BachelorTheses,
    priority: true,
  };

  const mockEncodeData = 'encodedData';

  const mockGetAndEncodeDataObject = getAndEncodeDataObject as jest.Mock;

  const renderServiceItem = (props = defaultMockData) => render(<ServiceItem {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();

    mockGetAndEncodeDataObject.mockReturnValue(mockEncodeData);
  });

  it('should render ServiceItem with correct props', () => {
    renderServiceItem();

    expect(screen.getByAltText('test-image-alt')).toBeInTheDocument();
    expect(screen.getByText(WorkType.BachelorTheses)).toBeInTheDocument();
    expect(screen.getByText(PrimaryButtonLabel.Ordering)).toBeInTheDocument();
  });

  it('renders correct heading', () => {
    renderServiceItem();

    const workTypeTitle = screen.getByRole('heading', { level: 3 });
    expect(workTypeTitle).toBeInTheDocument();
  });

  it('renders correct heading with additional text when serviceTitle is Diplomas', () => {
    const diplomasData = { ...defaultMockData, serviceTitle: WorkType.Diplomas };

    renderServiceItem(diplomasData);

    expect(screen.getByText(`${WorkType.Diplomas} та коледжів`)).toBeInTheDocument();
  });

  it('renders correct heading without additional text for other service titles', () => {
    renderServiceItem();

    expect(screen.getByText(WorkType.BachelorTheses)).toBeInTheDocument();
  });

  it('should handle link click correctly when getAndEncodeDataObject returns a value', () => {
    renderServiceItem();

    const link = screen.getByRole('link');
    fireEvent.click(link);

    expect(link).toHaveAttribute('href', 'https://t.me/AcademicAtlasBot?start=encodedData');
  });

  it('should prevent link navigation and set href to "#" when getAndEncodeDataObject returns undefined', async () => {
    mockGetAndEncodeDataObject.mockReturnValue(undefined);

    renderServiceItem();

    const link = screen.getByRole('link');
    fireEvent.click(link);

    expect(link).toHaveAttribute('href', '#');
  });

  it('should have the correct aria-describedby attribute', () => {
    renderServiceItem();

    expect(screen.getByRole('link')).toHaveAttribute('aria-describedby', AriaId.Service);
  });
});
