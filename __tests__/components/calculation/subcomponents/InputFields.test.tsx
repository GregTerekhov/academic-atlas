import { render, screen } from '@testing-library/react';
import { InputFields } from 'components/calculation/subcomponents';
import { useDropdownList } from 'hooks';
import { DropdownAriaId } from 'types';

jest.mock('hooks', () => ({
  useDropdownList: jest.fn(),
}));

jest.mock('helpers', () => ({
  mapArray: jest.fn((arrayData, mapFunction) => arrayData.map(mapFunction)),
}));

jest.mock('ui', () => ({
  DropdownUI: jest.fn(({ label }) => <div data-testid='dropdown-ui'>{label}</div>),
}));

jest.mock('components/calculation/subcomponents/theme-input', () =>
  jest.fn(() => <div data-testid='theme-input'></div>),
);

describe('InputFields subComponent', () => {
  const mockUseDropdownList = useDropdownList as jest.Mock;
  const mockDropDownList = [
    {
      id: 1,
      label: 'work type',
      options: ['Option1', 'Option2'],
      onOptionSelect: jest.fn(),
      ariaId: DropdownAriaId.WORK_TYPE,
    },
    {
      id: 2,
      label: 'expertise area',
      options: ['Option3', 'Option4'],
      onOptionSelect: jest.fn(),
      ariaId: DropdownAriaId.EXPERTISE_AREA,
    },
    {
      id: 3,
      label: 'execution time',
      options: ['Option5', 'Option6'],
      onOptionSelect: jest.fn(),
      ariaId: DropdownAriaId.EXECUTION_TIME,
    },
  ];

  const renderComponent = (shouldPlagiarismCheck = false) =>
    render(<InputFields shouldPlagiarismCheck={shouldPlagiarismCheck} />);

  beforeEach(() => {
    mockUseDropdownList.mockReturnValue(mockDropDownList);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the correct number of DropdownUI components', () => {
    renderComponent();

    const dropdowns = screen.getAllByTestId('dropdown-ui');
    expect(dropdowns).toHaveLength(mockDropDownList.length);

    mockDropDownList.forEach((item, idx) => {
      expect(dropdowns[idx]).toHaveTextContent(item.label);
    });
  });

  test('renders the correct number of list items', () => {
    renderComponent();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockDropDownList.length + 1);
  });

  test('renders correct class based on shouldPlagiarismCheck prop', () => {
    const { rerender } = renderComponent(true);

    expect(screen.getByRole('list')).toHaveClass('md:mb-10');

    rerender(<InputFields shouldPlagiarismCheck={false} />);

    expect(screen.getByRole('list')).toHaveClass('md:mb-20');
  });

  test('renders ThemeInput correctly', () => {
    renderComponent();

    expect(screen.getByTestId('theme-input')).toBeInTheDocument();
  });
});
