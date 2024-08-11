import { render, screen, fireEvent } from '@testing-library/react';

import { WorkType } from 'types';
import { getAndEncodeDataObject } from 'helpers';

import ServiceItem from 'components/home/subcomponents/service-item';

jest.mock('helpers', () => ({
  getAndEncodeDataObject: jest.fn(),
}));

describe('ServiceItem Component', () => {
  const mockData = {
    imageSrc: 'test-image-src',
    imageAlt: 'test-image-alt',
    serviceTitle: WorkType.BachelorTheses,
    priority: true,
  };

  beforeEach(() => {
    (getAndEncodeDataObject as jest.Mock).mockReturnValue('encodedData');
  });

  it('should render ServiceItem with correct props', () => {
    render(<ServiceItem {...mockData} />);

    expect(screen.getByAltText('test-image-alt')).toBeInTheDocument();
    expect(screen.getByText(WorkType.BachelorTheses)).toBeInTheDocument();
    expect(screen.getByText('Замовити')).toBeInTheDocument();
  });

  it('should handle link click correctly', () => {
    render(<ServiceItem {...mockData} />);

    const link = screen.getByRole('link');
    fireEvent.click(link);

    expect(link).toHaveAttribute('href', 'https://t.me/AcademicAtlasBot?start=encodedData');
  });

  it('should prevent default behavior if encoding fails', () => {
    (getAndEncodeDataObject as jest.Mock).mockReturnValue(null);

    render(<ServiceItem {...mockData} />);

    const link = screen.getByRole('link');
    const preventDefault = jest.fn();
    fireEvent.click(link, { preventDefault });

    expect(preventDefault).toHaveBeenCalled();
    expect(link).toHaveAttribute('href', '#');
  });
});
