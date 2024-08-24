import { fireEvent, render, screen } from '@testing-library/react';
import { CalculationProvider, CalculationResultProvider, MenuProvider, useMenu } from 'context';

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

const testCases = [
  {
    description: 'should toggle navigation menu state',
    initialText: 'Nav Menu Open: No',
    button: 'Toggle Nav Menu',
    toggledText: 'Nav Menu Open: Yes',
    resetText: 'Nav Menu Open: No',
  },
  {
    description: 'should toggle calculation menu state',
    initialText: 'Calc Menu Open: No',
    button: 'Toggle Calc Menu',
    toggledText: 'Calc Menu Open: Yes',
    resetText: 'Calc Menu Open: No',
  },
  {
    description: 'should handle toggle nav menu logic',
    initialText: 'Nav Menu Open: No',
    button: 'Handle Toggle Menu',
    toggledText: 'Nav Menu Open: Yes',
    resetText: 'Nav Menu Open: No',
  },
  {
    description: 'should handle toggle calc menu logic and close it',
    setupActions: ['Toggle Calc Menu'],
    initialText: 'Calc Menu Open: Yes',
    button: 'Handle Toggle Menu',
    toggledText: 'Calc Menu Open: No',
    resetText: 'Calc Menu Open: No',
  },
  {
    description: 'should handle toggle nav menu content and close all menus',
    setupActions: ['Toggle Nav Menu', 'Change Menu Content'],
    initialText: 'Show Calc Menu: Yes',
    button: 'Handle Toggle Menu',
    toggledText: 'Nav Menu Open: No',
    resetText: 'Calc Menu Open: No',
  },
];

describe('MenuProvider', () => {
  beforeEach(() => {
    render(
      <CalculationProvider>
        <CalculationResultProvider>
          <MenuProvider>
            <MenuTestComponent />
          </MenuProvider>
        </CalculationResultProvider>
      </CalculationProvider>,
    );
  });

  it.each(testCases)(
    '$description',
    ({ initialText, button, toggledText, resetText, setupActions = [] }) => {
      setupActions.forEach((action) => fireEvent.click(screen.getByText(action)));
      expect(screen.getByText(initialText)).toBeInTheDocument();

      fireEvent.click(screen.getByText(button));
      expect(screen.getByText(toggledText)).toBeInTheDocument();

      fireEvent.click(screen.getByText(button));
      expect(screen.getByText(resetText)).toBeInTheDocument();
    },
  );

  it('should handle change menu content logic', () => {
    expect(screen.getByText('Show Calc Menu: No')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Change Menu Content'));

    expect(screen.getByText('Show Calc Menu: Yes')).toBeInTheDocument();
  });
});

describe('useMenu hook', () => {
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
