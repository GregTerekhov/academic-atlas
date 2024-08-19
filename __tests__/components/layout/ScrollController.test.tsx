import { fireEvent, render, screen } from '@testing-library/react';

import { AriaLabel } from 'types';
import { useMenu } from 'context';
import { useScrollController } from 'hooks';
import { ScrollController } from 'components';

jest.mock('hooks', () => ({
  useScrollController: jest.fn(),
}));

jest.mock('context', () => ({
  useMenu: jest.fn(),
}));

describe('ScrollController Component', () => {
  const mockUseScrollController = useScrollController as jest.Mock;
  const mockUseMenu = useMenu as jest.Mock;
  const mockButtonRef = { current: document.createElement('div') };

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseScrollController.mockReturnValue({
      buttonRef: mockButtonRef,
      isVisible: false,
      scrollTop: jest.fn(),
    });

    mockUseMenu.mockReturnValue({
      isNavMenuOpen: false,
      isCalcMenuOpen: false,
    });
  });

  it('renders with default styles and is hidden initially', () => {
    render(<ScrollController />);

    const button = screen.getByLabelText(AriaLabel.ScrollUp);
    expect(button).toHaveClass('hidden opacity-0');
  });

  it('is visible when isVisible is true', () => {
    mockUseScrollController.mockReturnValue({
      buttonRef: mockButtonRef,
      isVisible: true,
      scrollToTop: jest.fn(),
    });

    render(<ScrollController />);

    const button = screen.getByLabelText(AriaLabel.ScrollUp);
    expect(button).toHaveClass('opacity-100 md:flex');
  });

  it('hides when a menu is open', () => {
    mockUseMenu.mockReturnValue({
      isNavMenuOpen: true,
      isCalcMenuOpen: false,
    });

    mockUseScrollController.mockReturnValue({
      buttonRef: mockButtonRef,
      isVisible: true,
      scrollToTop: jest.fn(),
    });

    render(<ScrollController />);

    const button = screen.getByLabelText(AriaLabel.ScrollUp);
    expect(button).toHaveClass('-z-10');
  });

  it('calls scrollToTop when clicked', () => {
    const scrollToTopMock = jest.fn();

    mockUseScrollController.mockReturnValue({
      buttonRef: mockButtonRef,
      isVisible: true,
      scrollToTop: scrollToTopMock,
    });

    render(<ScrollController />);

    const button = screen.getByLabelText(AriaLabel.ScrollUp);
    fireEvent.click(button);

    expect(scrollToTopMock).toHaveBeenCalled();
  });
});
