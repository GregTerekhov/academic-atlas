import { fireEvent, render, screen } from '@testing-library/react';
import { TelegramSubmitButton } from 'components/calculation/subcomponents';
import { useCalculation } from 'context';
import { getAndEncodeDataObject } from 'helpers';
import { getPrimaryButtonStyles } from 'styles';
import {
  AriaDescription,
  AriaId,
  ExecutionTime,
  ExpertiseArea,
  type ICalculation,
  PrimaryButtonLabel,
  TelegramScenario,
  Uniqueness,
  WorkType,
} from 'types';

jest.mock('context', () => ({
  useCalculation: jest.fn(),
}));

jest.mock('helpers', () => ({
  getAndEncodeDataObject: jest.fn(),
}));

jest.mock('styles', () => ({
  getPrimaryButtonStyles: jest.fn(),
}));

jest.mock('ui', () => ({
  SvgIconUI: jest.fn(({ id, ariaLabel, ariaHidden }) => (
    <svg
      data-testid='icon-test'
      id={id}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    />
  )),
  AriaDescriptionUI: jest.fn(({ id, description }) => (
    <span
      id={id}
      data-testid='aria-desc'
    >
      {description}
    </span>
  )),
}));

describe('TelegramSubmitButton subComponent', () => {
  const mockUseCalculation = useCalculation as jest.Mock;
  const mockGetAndEncodeDataObject = getAndEncodeDataObject as jest.Mock;
  const mockGetPrimaryButtonStyles = getPrimaryButtonStyles as jest.Mock;

  const setup = (calculationData: Partial<ICalculation>) => {
    mockUseCalculation.mockReturnValue({ calculationData });

    render(<TelegramSubmitButton />);
    return screen.getByRole('link', { name: new RegExp(PrimaryButtonLabel.SwitchToTelegram, 'i') });
  };

  const testCases = [
    {
      calculationData: {
        workType: WorkType.Default,
        expertiseArea: ExpertiseArea.Default,
        executionTime: ExecutionTime.Default,
        uniqueness: Uniqueness.Zero,
      },
      expectedHref: '#',
      encodedData: undefined,
    },
    {
      calculationData: {
        workType: WorkType.Abstracts,
        expertiseArea: ExpertiseArea.AgriculturalSciences,
        executionTime: ExecutionTime.LongTerm,
        uniqueness: Uniqueness.Highest,
      },
      expectedHref: 'https://t.me/AcademicAtlasBot?start=encodedDataString',
      encodedData: 'encodedDataString',
    },
  ];

  beforeEach(() => {
    mockGetAndEncodeDataObject.mockReset();
  });

  test('should render the button with correct initial attribute', () => {
    const linkElement = setup({
      workType: WorkType.Default,
      expertiseArea: ExpertiseArea.Default,
      executionTime: ExecutionTime.Default,
      uniqueness: Uniqueness.Zero,
    });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '#');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
    expect(linkElement).toHaveAttribute('aria-describedby', 'price-button');

    const ariaDescription = screen.getByTestId('aria-desc');
    expect(ariaDescription).toBeInTheDocument();
    expect(ariaDescription).toHaveAttribute('id', AriaId.ComplexOrdering);
    expect(ariaDescription).toHaveTextContent(AriaDescription.ComplexOrdering);
  });

  test('applies correct styles based on prop', () => {
    mockGetPrimaryButtonStyles.mockReturnValue('mock-light-class-active');

    const linkElement = setup({
      workType: WorkType.Default,
      expertiseArea: ExpertiseArea.Default,
      executionTime: ExecutionTime.Default,
      uniqueness: Uniqueness.Zero,
    });

    expect(mockGetPrimaryButtonStyles).toHaveBeenCalledWith(true);
    expect(linkElement).toHaveClass('mock-light-class-active');
  });

  test.each(testCases)(
    'updates the href correctly based on calculation data',
    ({ calculationData, expectedHref, encodedData }) => {
      mockGetAndEncodeDataObject.mockReturnValue(encodedData);

      const linkElement = setup(calculationData);

      fireEvent.click(linkElement);

      expect(getAndEncodeDataObject).toHaveBeenCalledWith(
        TelegramScenario.Order,
        calculationData.workType,
        calculationData.expertiseArea,
        calculationData.executionTime,
        calculationData.uniqueness,
      );
      expect(linkElement).toHaveAttribute('href', expectedHref);
    },
  );
});
