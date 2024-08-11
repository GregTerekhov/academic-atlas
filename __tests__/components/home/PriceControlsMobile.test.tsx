import { fireEvent, render, screen } from '@testing-library/react';

import {
  AriaDescription,
  AriaId,
  CalculationTitle,
  IWithChildren,
  PrimaryButtonLabel,
} from 'types';
import { MenuProvider, useMenu } from 'context';

import { PriceControlsMobile } from 'components/home/subcomponents';

interface IPrimaryButtonProps extends IWithChildren {
  ariaDescription: AriaDescription;
  ariaId: AriaId;
  handleClick?: () => void;
  isDisabled?: boolean;
  isOnLightBackground?: boolean;
}

jest.mock('context', () => ({
  useMenu: jest.fn(),
}));

jest.mock('template', () => ({
  MobileMenuTemplate: ({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) =>
    isOpen ? <div>{children}</div> : null,
}));

jest.mock('ui', () => ({
  PrimaryButtonUI: ({ handleClick, ariaId, ariaDescription, children }: IPrimaryButtonProps) => (
    <>
      <button
        onClick={handleClick}
        aria-describedby={ariaId}
      >
        {children}
      </button>
      <span className='sr-only'>{ariaDescription}</span>
    </>
  ),
}));

describe('PriceControlsMobile Component', () => {
  it('renders the PrimaryButtonUI with correct props', () => {
    const toggleCalcMenuMock = jest.fn();
    (useMenu as jest.Mock).mockReturnValue({
      isCalcMenuOpen: false,
      toggleCalcMenu: jest.fn(),
    });

    render(
      <MenuProvider>
        <PriceControlsMobile />
      </MenuProvider>,
    );

    const button = screen.getByRole('button', { name: PrimaryButtonLabel.CostCalculation });
    fireEvent.click(button);

    expect(toggleCalcMenuMock).toHaveBeenCalled();
  });

  it('renders the PriceCalculator when the menu is open', () => {
    (useMenu as jest.Mock).mockReturnValue({
      isCalcMenuOpen: true,
      toggleCalcMenu: jest.fn(),
    });

    render(
      <MenuProvider>
        <PriceControlsMobile />
      </MenuProvider>,
    );

    const calculator = screen.getByText(CalculationTitle.CalculationForm);
    expect(calculator).toBeInTheDocument();
  });

  it('does not render the PriceCalculator when the menu is closed', () => {
    (useMenu as jest.Mock).mockReturnValue({
      isCalcMenuOpen: false,
      toggleCalcMenu: jest.fn(),
    });

    render(
      <MenuProvider>
        <PriceControlsMobile />
      </MenuProvider>,
    );

    const calculator = screen.queryByText(CalculationTitle.CalculationForm);

    expect(calculator).not.toBeInTheDocument();
  });
});
