import { render, screen } from '@testing-library/react';

import { AboutUsItem } from 'components/performers/subcomponents';

jest.mock('styles', () => ({
  getAboutUsImageStyles: jest.fn(),
}));

jest.mock('data', () => ({
  imageSettings: {
    partnershipAboutUs1: {
      src: '/images/who-we-are.webp',
      alt: 'Working meeting at the table',
    },
    partnershipAboutUs2: {
      src: '/images/who-we-are-looking-for.webp',
      alt: 'People at the meeting write in notebooks',
    },
  },
  partnershipAboutImageSettings: {
    width: 180,
    height: 327,
    className: 'w-auto object-cover md:h-[280px] md:w-[512px]',
  },
}));

jest.mock('ui', () => ({
  ImageUI: jest.fn((props) => (
    <div
      data-testid='img-about-us-performers-item'
      {...props}
    />
  )),
}));

describe('AboutUsItem subComponent', () => {
  const mockIAboutUsItemProps = {
    header: 'about-us-item-header',
    description: 'about-us-item-description',
    src: 'about-us-item-src',
    alt: 'about-us-item-alt',
  };

  test('should render subComponent correctly', () => {
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
    expect(aboutUsItemImg).toHaveAttribute('src', 'about-us-item-src');
    expect(aboutUsItemImg).toHaveAttribute('alt', 'about-us-item-alt');
  });
});
