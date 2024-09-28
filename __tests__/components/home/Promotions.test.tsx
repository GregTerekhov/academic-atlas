import { render, screen } from '@testing-library/react';

import {
  PrimaryButtonLabel,
  AriaDescription,
  SectionTitle,
  CtaText,
  TelegramScenario,
  AriaId,
  ImageSize,
} from 'types';
import { getSectionProps } from 'data';
import { getIdValues } from 'helpers';

import { SectionTemplate, TelegramButton } from 'template';
import { Promotions } from 'components';
import { ImageUI } from 'ui';

jest.mock('template', () => ({
  SectionTemplate: jest.fn(({ children }) => <div data-testid='section-template'>{children}</div>),

  TelegramButton: jest.fn(({ props, ariaId }) => {
    return (
      <button
        {...props}
        data-testid='telegram-button'
        aria-describedby={ariaId}
      >
        Telegram Button
      </button>
    );
  }),
}));

jest.mock('ui', () => ({
  ImageUI: jest.fn((props) => {
    const { alt, priority, ...restProps } = props;

    return (
      <div
        {...restProps}
        alt={alt}
        priority={priority}
        data-testid='image-ui'
      />
    );
  }),
}));

jest.mock('data', () => ({
  getSectionProps: jest.fn(),
  imageSettings: {
    promotions: {
      src: '/images/notes.png',
      alt: '',
      width: ImageSize.Medium216,
      height: ImageSize.Small144,
      className:
        'size-auto max-md:mx-auto max-md:mb-8 md:absolute md:right-10 md:top-1/2 md:h-auto md:w-[224px] md:-translate-y-1/2 lg:h-auto lg:w-[416px]',
    },
  },
}));

jest.mock('helpers', () => ({
  getIdValues: jest.fn(() => ({
    Promotions: SectionTitle.Promotions,
  })),
}));

describe('Promotions Component', () => {
  const mockGetSectionProps = getSectionProps as jest.Mock;
  const mockGetIdValues = getIdValues as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockGetSectionProps.mockReturnValue({
      homePromotions: {
        title: SectionTitle.Promotions,
        ctaText: CtaText.MainPromotions,
        id: SectionTitle.Promotions,
        ctaStyle: 'md:w-[421px] lg:w-[644px]',
        noAlignment: 'text-start',
        hasCtaText: true,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and passes the correct props to child components', () => {
    const mockSectionProps = {
      homePromotions: {
        title: SectionTitle.Promotions,
        id: 'promotions',
      },
    };
    const mockIdValues = {
      Promotions: 'promotions',
    };

    mockGetSectionProps.mockReturnValue(mockSectionProps);
    mockGetIdValues.mockReturnValue(mockIdValues);

    render(<Promotions />);

    expect(screen.getByTestId('section-template')).toBeInTheDocument();
    expect(SectionTemplate).toHaveBeenCalledWith(
      expect.objectContaining(mockSectionProps.homePromotions),
      {},
    );

    const image = screen.getByTestId('image-ui');
    expect(image).toBeInTheDocument();
    expect(ImageUI).toHaveBeenCalledWith(
      expect.objectContaining({
        src: '/images/notes.png',
        alt: '',
        width: 216,
        height: 144,
        className:
          'size-auto max-md:mx-auto max-md:mb-8 md:absolute md:right-10 md:top-1/2 md:h-auto md:w-[224px] md:-translate-y-1/2 lg:h-auto lg:w-[416px]',
      }),
      {},
    );

    expect(screen.getByTestId('telegram-button')).toBeInTheDocument();
    expect(TelegramButton).toHaveBeenCalledWith(
      expect.objectContaining({
        command: TelegramScenario.Order,
        label: PrimaryButtonLabel.Ordering,
        ariaId: AriaId.DefaultPromotionsOrdering,
        ariaDescription: AriaDescription.DefaultPromotionsOrdering,
      }),
      {},
    );
  });
});
