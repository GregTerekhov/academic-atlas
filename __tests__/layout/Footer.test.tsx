import { render, screen } from '@testing-library/react';
import { Footer } from 'layout';

jest.mock('components', () => ({
  Logo: jest.fn(({ position }) => <div>Logo - {position}</div>),
  Contacts: jest.fn(({ variant }) => <div>Contacts - {variant}</div>),
  FooterMenu: jest.fn(() => <div>FooterMenu</div>),
  LegalLink: jest.fn(() => <div>LegalLink</div>),
}));

describe('Footer Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all components with correct styles', () => {
    render(<Footer />);

    const footerElement = screen.getByRole('contentinfo');

    expect(footerElement).toHaveClass(
      'w-full bg-disabled-background/10 pb-6 pt-16 dark:bg-disabled-background md:py-6 lg:py-12',
    );

    expect(screen.getByText('Logo - footer')).toBeInTheDocument();
    expect(screen.getByText('FooterMenu')).toBeInTheDocument();
    expect(screen.getByText('LegalLink')).toBeInTheDocument();
    expect(screen.getAllByText('Contacts - footer')).toHaveLength(2);
  });
});
