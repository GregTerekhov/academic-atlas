import { render, screen } from '@testing-library/react';
import { AboutUsItem } from 'components/performers/subcomponents';

jest.mock('styles', () => ({
  getAboutUsImageStyles: jest.fn(),
}));

jest.mock('data', () => ({
  partnershipAboutImageSettings: {
    width: 180,
    height: 327,
    className: 'w-auto object-cover md:h-[280px] md:w-[512px]',
  },
}));

jest.mock('ui', () => ({
  ImageUI: jest.fn((props) => (
    <img
      data-testid='img-about-us-performers-item'
      src={props.src}
      alt={props.alt}
    />
  )),
}));

describe('AboutUsItem subComponent', () => {
  test('should render subComponent correctly', () => {
    const mockIAboutUsItemProps = {
      header: 'about-us-item-header',
      description: 'about-us-item-description',
      src: 'about-us-item-src',
      alt: 'about-us-item-alt',
    };

    render(<AboutUsItem {...mockIAboutUsItemProps} />);

    const aboutUsItemHeader = screen.getByRole('heading', {
      level: 2,
      name: 'about-us-item-header',
    });
    expect(aboutUsItemHeader).toBeInTheDocument();

    const aboutUsItemDesc = screen.getByText('about-us-item-description');
    expect(aboutUsItemDesc).toBeInTheDocument();

    const aboutUsItemImg = screen.getByTestId('img-about-us-performers-item');
    expect(aboutUsItemImg).toBeInTheDocument();
  });
});
