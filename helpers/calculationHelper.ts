import {
  type ICalculation,
  type ICalculationData,
  type IDropdownData,
  BasePrice,
  CalculationMultiplier,
  ExecutionTime,
  ExpertiseArea,
  humanitiesAndEconomics,
  ROUNDING_VALUES,
  technicalSciences,
  THRESHOLDS,
  Uniqueness,
  WorkType,
} from '../types';
import { getWorkType } from '../data';

const { ZERO, QUARTER, HALF, THREE_QUARTERS, WHOLE } = ROUNDING_VALUES;
const {
  TEAM_PAPERS_INCREASED_THRESHOLD,
  TEAM_PAPERS_STANDARD_THRESHOLD,
  MEDIUM_INCREASED_THRESHOLD,
  MEDIUM_STANDARD_THRESHOLD,
  HIGHER_INCREASED_THRESHOLD,
  HIGHER_STANDARD_THRESHOLD,
  ZERO_THRESHOLD,
} = THRESHOLDS;

const thresholds: { [key in Uniqueness]: { increased: number; standard: number } } = {
  [Uniqueness.Zero]: { increased: ZERO_THRESHOLD, standard: ZERO_THRESHOLD },
  [Uniqueness.TeamPapers]: {
    increased: TEAM_PAPERS_INCREASED_THRESHOLD,
    standard: TEAM_PAPERS_STANDARD_THRESHOLD,
  },
  [Uniqueness.Standard]: {
    increased: MEDIUM_INCREASED_THRESHOLD,
    standard: MEDIUM_STANDARD_THRESHOLD,
  },
  [Uniqueness.Higher]: {
    increased: HIGHER_INCREASED_THRESHOLD,
    standard: HIGHER_STANDARD_THRESHOLD,
  },
  [Uniqueness.Highest]: { increased: ZERO_THRESHOLD, standard: ZERO_THRESHOLD },
};

export const expertiseMultiplier = (
  selectedExpertiseArea: ExpertiseArea,
): CalculationMultiplier => {
  switch (true) {
    case humanitiesAndEconomics.has(selectedExpertiseArea):
      return CalculationMultiplier.Standard;
    case technicalSciences.has(selectedExpertiseArea):
      return CalculationMultiplier.IncreasedStandard;
    case selectedExpertiseArea === ExpertiseArea.IT:
      return CalculationMultiplier.IT;

    default:
      return CalculationMultiplier.NoMultiplier;
  }
};

export const executionTimeMultiplier = (
  selectedExecutionTime: ExecutionTime,
): CalculationMultiplier => {
  switch (true) {
    case selectedExecutionTime === ExecutionTime.MediumTerm:
      return CalculationMultiplier.IncreasedStandard;
    case selectedExecutionTime === ExecutionTime.Urgent:
      return CalculationMultiplier.Urgent;

    default:
      return CalculationMultiplier.NoMultiplier;
  }
};

export const uniquenessMultiplier = (
  workTypeData: Partial<IDropdownData>,
  customUniqueness?: number,
): CalculationMultiplier => {
  if (!customUniqueness) return CalculationMultiplier.NoMultiplier;

  const { uniquenessPercentage: defaultUniqueness } = workTypeData;

  if (defaultUniqueness === undefined) {
    return CalculationMultiplier.NoMultiplier;
  }

  const threshold = thresholds[defaultUniqueness];

  if (!threshold) return CalculationMultiplier.NoMultiplier; //cover with tests

  const difference = customUniqueness - defaultUniqueness;

  if (difference >= threshold.increased) return CalculationMultiplier.IncreasedStandard;
  if (difference >= threshold.standard) return CalculationMultiplier.Standard;

  return CalculationMultiplier.NoMultiplier;
};

export const checkCalculationField = (data: ICalculationData): boolean => {
  return (
    data.workType !== WorkType.Default &&
    data.expertiseArea !== ExpertiseArea.Default &&
    data.executionTime !== ExecutionTime.Default
  );
};

export const shouldResetValues = (data: ICalculation) => {
  return (
    data.workType !== WorkType.Default ||
    data.expertiseArea !== ExpertiseArea.Default ||
    data.executionTime !== ExecutionTime.Default ||
    data.uniqueness !== Uniqueness.Zero ||
    data.theme !== ''
  );
};

export const checkValidWorkType = (workType: WorkType) => {
  const necessaryWorkType = [
    WorkType.Diplomas,
    WorkType.TeamPapers,
    WorkType.BachelorTheses,
    WorkType.MasterTheses,
    WorkType.Abstracts,
  ];

  return necessaryWorkType.includes(workType);
};

export const couldChooseUniqueness = (workType: WorkType): boolean => {
  return [
    WorkType.BachelorTheses,
    WorkType.MasterTheses,
    WorkType.Diplomas,
    WorkType.Abstracts,
    WorkType.TeamPapers,
  ].includes(workType);
};

export const getMinimalUniqueness = (workType: WorkType): number => {
  switch (workType) {
    case WorkType.TeamPapers:
      return Uniqueness.TeamPapers;
    case WorkType.Diplomas:
    case WorkType.BachelorTheses:
      return Uniqueness.Standard;
    case WorkType.MasterTheses:
      return Uniqueness.Higher;
    case WorkType.Abstracts:
      return Uniqueness.Highest;
    default:
      return Uniqueness.Zero;
  }
};

export const roundPriceToInterval = (calculatedPrice: number) => {
  const priceToRound = Math.round(calculatedPrice);
  const lastTwoDigits = priceToRound % WHOLE;

  let renderedPrice: number = ZERO;

  if (lastTwoDigits <= QUARTER) {
    renderedPrice = priceToRound - lastTwoDigits;
  } else if (lastTwoDigits <= THREE_QUARTERS) {
    renderedPrice = priceToRound + (HALF - lastTwoDigits);
  } else {
    renderedPrice = priceToRound + (WHOLE - lastTwoDigits);
  }

  return renderedPrice;
};

export const findSelectedObject = (selectedWorkType: WorkType): IDropdownData | undefined => {
  return getWorkType().find((workType) => workType.option === selectedWorkType);
};

export const getBasePrice = (type: WorkType): BasePrice => {
  const workTypeData = findSelectedObject(type);

  if (!workTypeData || !workTypeData.basePrice) {
    throw new Error('Invalid work type selected');
  }

  return workTypeData.basePrice;
};

export const uniquenessMapping = {
  [Uniqueness.TeamPapers]: Uniqueness.TeamPapers,
  [Uniqueness.Standard]: Uniqueness.Standard,
  [Uniqueness.Higher]: Uniqueness.Higher,
  [Uniqueness.Highest]: Uniqueness.Highest,
};
