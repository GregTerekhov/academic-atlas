import { fireEvent, render, screen } from '@testing-library/react';
import { CalculationProvider, MenuProvider, useMenu } from 'context';

const MenuTestComponent = () => {
  const {
    isNavMenuOpen,
    isCalcMenuOpen,
    showCalculationMenu,
    toggleNavMenu,
    toggleCalcMenu,
    closeMenu,
    changeMenuContent,
    handleToggleMenu,
  } = useMenu();

  return (
    <div>
      <button onClick={toggleNavMenu}>Toggle Nav Menu</button>
      <button onClick={toggleCalcMenu}>Toggle Calc Menu</button>
      <button onClick={closeMenu}>Close Menu</button>
      <button onClick={changeMenuContent}>Change Menu Content</button>
      <button onClick={handleToggleMenu}>Handle Toggle Menu</button>
      <div>Nav Menu Open: {isNavMenuOpen ? 'Yes' : 'No'}</div>
      <div>Calc Menu Open: {isCalcMenuOpen ? 'Yes' : 'No'}</div>
      <div>Show Calc Menu: {showCalculationMenu ? 'Yes' : 'No'}</div>
    </div>
  );
};

describe('MenuProvider', () => {
  it('should toggle navigation menu state', () => {
    render(
      <CalculationProvider>
        <MenuProvider>
          <MenuTestComponent />
        </MenuProvider>
      </CalculationProvider>,
    );

    expect(screen.getByText('Nav Menu Open: No')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Toggle Nav Menu'));
    expect(screen.getByText('Nav Menu Open: Yes')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Toggle Nav Menu'));
    expect(screen.getByText('Nav Menu Open: No')).toBeInTheDocument();
  });

  it('should toggle calculation menu state and reset values', () => {
    render(
      <CalculationProvider>
        <MenuProvider>
          <MenuTestComponent />
        </MenuProvider>
      </CalculationProvider>,
    );

    expect(screen.getByText('Calc Menu Open: No')).toBeInTheDocument();
    expect(screen.getByText('Show Calc Menu: No')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Toggle Calc Menu'));
    expect(screen.getByText('Calc Menu Open: Yes')).toBeInTheDocument();
    expect(screen.getByText('Show Calc Menu: No')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Toggle Calc Menu'));
    expect(screen.getByText('Calc Menu Open: No')).toBeInTheDocument();
    expect(screen.getByText('Show Calc Menu: No')).toBeInTheDocument();
  });

  it('should close all menus and reset values', () => {
    render(
      <CalculationProvider>
        <MenuProvider>
          <MenuTestComponent />
        </MenuProvider>
      </CalculationProvider>,
    );

    fireEvent.click(screen.getByText('Toggle Nav Menu'));
    fireEvent.click(screen.getByText('Toggle Calc Menu'));
    fireEvent.click(screen.getByText('Change Menu Content'));

    expect(screen.getByText('Nav Menu Open: Yes')).toBeInTheDocument();
    expect(screen.getByText('Calc Menu Open: Yes')).toBeInTheDocument();
    expect(screen.getByText('Show Calc Menu: Yes')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close Menu'));

    expect(screen.getByText('Nav Menu Open: No')).toBeInTheDocument();
    expect(screen.getByText('Calc Menu Open: No')).toBeInTheDocument();
    expect(screen.getByText('Show Calc Menu: No')).toBeInTheDocument();
  });

  it('should handle toggle menu logic', () => {
    render(
      <CalculationProvider>
        <MenuProvider>
          <MenuTestComponent />
        </MenuProvider>
      </CalculationProvider>,
    );

    expect(screen.getByText('Show Calc Menu: No')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Change Menu Content'));

    expect(screen.getByText('Show Calc Menu: Yes')).toBeInTheDocument();
  });

  it('should throw error when useMenu is used outside of MenuProvider', () => {
    const TestMenuComponent = () => {
      const menu = useMenu();
      return <div>{menu.isNavMenuOpen ? 'Yes' : 'No'}</div>;
    };

    expect(() => render(<TestMenuComponent />)).toThrow(
      'useMenu must be used within a MenuProvider',
    );
  });
});
