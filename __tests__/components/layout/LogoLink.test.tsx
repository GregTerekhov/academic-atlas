import { fireEvent, render, screen } from '@testing-library/react';

import { AriaDescription, AriaId, AriaLabel, IconName, Paths } from 'types';
import { useHandleLogoClick } from 'hooks';
import { LogoLink } from 'components/layout/subcomponents';

jest.mock('hooks', () => ({
  useHandleLogoClick: jest.fn(),
}));

jest.mock('ui', () => ({
  SvgIconUI: jest.fn(({ id, ariaLabel, ariaHidden }) => (
    <svg
      data-testid='icon-logo'
      id={id}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    />
  )),
  AriaDescriptionUI: jest.fn(({ id, description }) => (
    <span
      id={id}
      data-testid='aria-description'
    >
      {description}
    </span>
  )),
}));

describe('LogoLink Component', () => {
  const mockUseHandleLogoClick = useHandleLogoClick as jest.Mock;
  const mockHandleClick = jest.fn();

  const renderComponent = () => render(<LogoLink />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders link with correct props', () => {
    renderComponent();

    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', Paths.Main);
    expect(linkElement).toHaveAttribute('aria-describedby', AriaId.ComeHome);
  });

  it('renders link with correct class', () => {
    renderComponent();

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveClass('inline-block');
  });

  it('renders icon with props correctly', () => {
    renderComponent();

    const iconElement = screen.getByTestId('icon-logo');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute('id', IconName.Logo);
    expect(iconElement).toHaveAttribute('aria-hidden', 'false');
    expect(iconElement).toHaveAttribute('aria-label', AriaLabel.Logo);
  });

  it('renders description component with correct props', () => {
    renderComponent();

    const descriptionElement = screen.getByTestId('aria-description');
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveAttribute('id', AriaId.ComeHome);
    expect(descriptionElement).toHaveTextContent(AriaDescription.ComeHome);
  });

  it('calls handleClick function when the link is clicked', () => {
    mockUseHandleLogoClick.mockReturnValue(mockHandleClick);

    renderComponent();

    const linkElement = screen.getByRole('link');
    fireEvent.click(linkElement);

    expect(mockHandleClick).toHaveBeenCalled();
  });
});
