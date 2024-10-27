import { fireEvent, render, screen } from '@testing-library/react';

import { AriaDescription, AriaId, Paths, PrimaryButtonLabel } from 'types';
import { useActiveLink } from 'context';
import { JoinButton } from 'components/home/subcomponents';

jest.mock('context', () => ({
  useActiveLink: jest.fn(),
}));

jest.mock('ui', () => ({
  AriaDescriptionUI: jest.fn(({ id, description }) => <span id={id}>{description}</span>),
}));

jest.mock('styles', () => ({
  getPrimaryButtonStyles: jest.fn(() => 'primary-button-styles'),
}));

describe('JoinButton Component', () => {
  const mockUseActiveLink = useActiveLink as jest.Mock;
  const handleActivateLink = jest.fn();

  beforeEach(() => {
    mockUseActiveLink.mockReturnValue({ handleActivateLink });

    render(<JoinButton />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders component with correct link and description', () => {
    const link = screen.getByRole('link', { name: PrimaryButtonLabel.Accession });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', Paths.Partnership);

    expect(link).toHaveAttribute('aria-describedby', AriaId.Performers);
    expect(link).toHaveClass('primary-button-styles py-[17px]');

    const ariaDescription = screen.getByText(AriaDescription.Performers);
    expect(ariaDescription).toBeInTheDocument();
  });

  it('calls handleActiveLink on link click', () => {
    const link = screen.getByRole('link', { name: PrimaryButtonLabel.Accession });
    fireEvent.click(link);

    expect(handleActivateLink).toHaveBeenCalledWith(Paths.Partnership);
  });
});
