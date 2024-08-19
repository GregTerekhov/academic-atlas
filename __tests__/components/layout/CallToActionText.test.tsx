import { render, screen } from '@testing-library/react';

import { CtaText } from 'types';
import { CallToActionText } from 'components';

describe('CallToActionText Component', () => {
  const renderTextComponent = (props = {}) => {
    return render(<CallToActionText {...props} />);
  };

  it('should render with default text style and content', () => {
    renderTextComponent();

    const paragraph = screen.getByText(CtaText.NoText, { selector: 'p' });

    expect(paragraph).toBeInTheDocument();
  });

  it('should render with provided text', () => {
    renderTextComponent({ ctaText: CtaText.MainPerformers });

    const paragraph = screen.getByText(CtaText.MainPerformers);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass('mb-6 md:mb-8 lg:mb-16');
    expect(paragraph).toHaveClass('text-medium md:text-xl lg:text-2xl');
  });
});
