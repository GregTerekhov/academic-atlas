import { fireEvent, render, screen } from '@testing-library/react';

import { AriaDescription, AriaId } from 'types';
import { useCalculation } from 'context';
import { ThemeInput } from 'components/calculation/subcomponents';
import { getThemeInputStyles } from 'styles';

jest.mock('context', () => ({
  useCalculation: jest.fn(),
}));

jest.mock('ui', () => ({
  AriaDescriptionUI: jest.fn(({ id, description }) => <span id={id}>{description}</span>),
}));

jest.mock('styles', () => ({ getThemeInputStyles: jest.fn() }));

describe('ThemeInput Component', () => {
  const mockUseCalculation = useCalculation as jest.Mock;
  const mockGetThemeInputStyles = getThemeInputStyles as jest.Mock;
  const mockHandleThemeInputChange = jest.fn();

  const setupMocks = (newTheme: string = '') => {
    mockUseCalculation.mockReturnValue({
      calculationData: { theme: newTheme },
      handleThemeInputChange: mockHandleThemeInputChange,
    });
  };

  mockGetThemeInputStyles.mockImplementation((hasBackground: boolean) =>
    hasBackground ? 'blurred-class' : 'mocked-class',
  );

  const renderComponent = () => render(<ThemeInput />);

  beforeEach(() => {
    setupMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders the input with correct attributes', () => {
      renderComponent();

      const inputElement = screen.getByPlaceholderText('Введіть тему (не обов`язково)');
      expect(inputElement).toBeInTheDocument();
      expect(inputElement).toHaveAttribute('type', 'text');
      expect(inputElement).toHaveAttribute('autocomplete', 'off');
      expect(inputElement).toHaveAttribute('aria-describedby', AriaId.ThemeInput);
    });

    test('renders the aria description props correctly', () => {
      renderComponent();

      const descriptionElement = screen.getByText(AriaDescription.ThemeInput);

      expect(descriptionElement).toBeInTheDocument();
      expect(descriptionElement).toHaveAttribute('id', AriaId.ThemeInput);
    });
  });

  describe('Styles and States', () => {
    test.each`
      themeValue     | action     | expectedClass      | hasBackground
      ${''}          | ${'blur'}  | ${'mocked-class'}  | ${false}
      ${'New Theme'} | ${'blur'}  | ${'blurred-class'} | ${true}
      ${''}          | ${'focus'} | ${'mocked-class'}  | ${false}
    `(
      'changes input class correctly when theme is "$themeValue" and action is "$action"',
      ({ themeValue, action, expectedClass, hasBackground }) => {
        setupMocks(themeValue);

        renderComponent();

        const inputElement = screen.getByPlaceholderText('Введіть тему (не обов`язково)');

        if (action === 'focus') {
          fireEvent.focus(inputElement);
        } else {
          fireEvent.blur(inputElement);
        }

        expect(mockGetThemeInputStyles).toHaveBeenCalledWith(hasBackground);

        expect(inputElement).toHaveClass(expectedClass);
      },
    );
  });

  describe('Interaction', () => {
    test('changes input value correctly', () => {
      renderComponent();

      const inputElement = screen.getByPlaceholderText('Введіть тему (не обов`язково)');

      fireEvent.change(inputElement, { target: { value: 'New Theme' } });

      expect(mockHandleThemeInputChange).toHaveBeenCalledWith(expect.any(Object));
    });
  });
});
