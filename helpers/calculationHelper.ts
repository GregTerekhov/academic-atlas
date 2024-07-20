import {
  type ICalculationData,
  type IDropdownData,
  ExecutionTime,
  ExpertiseArea,
  Uniqueness,
  WorkType,
} from '../types';
import { getWorkType } from '../data';

enum CalculationMultiplier {
  NoMultiplier = 1,
  Standard = 1.1,
  IncreasedStandard = 1.2,
  Urgent = 1.5,
  IT = 1.8,
}

enum RoundingValue {
  ZeroBreakpoint = 0,
  TwentyFiveBreakpoint = 25,
  FiftyBreakpoint = 50,
  SeventyFiveBreakpoint = 75,
  HundredBreakpoint = 100,
}

const humanitiesAndEconomics = new Set([
  ExpertiseArea.Education,
  ExpertiseArea.CultureAndArt,
  ExpertiseArea.Humanities,
  ExpertiseArea.Theology,
  ExpertiseArea.SocialSciences,
  ExpertiseArea.Journalism,
  ExpertiseArea.Management,
  ExpertiseArea.Law,
  ExpertiseArea.Biology,
  ExpertiseArea.NaturalSciences,
  ExpertiseArea.FormalSciences,
  ExpertiseArea.AgriculturalSciences,
  ExpertiseArea.VeterinaryMedicine,
  ExpertiseArea.Healthcare,
  ExpertiseArea.SocialWork,
  ExpertiseArea.ServiceSector,
]);

const technicalSciences = new Set([
  ExpertiseArea.MechanicalEngineering,
  ExpertiseArea.ElectricalEngineering,
  ExpertiseArea.AutomationAndInstrumentation,
  ExpertiseArea.ChemicalAndBioengineering,
  ExpertiseArea.ElectronicsAndTelecommunications,
  ExpertiseArea.ProductionAndTechnology,
  ExpertiseArea.ArchitectureAndConstruction,
  ExpertiseArea.MilitarySciences,
  ExpertiseArea.CivilSecurity,
  ExpertiseArea.Transport,
]);

const thresholds: { [key in Uniqueness]: { increased: number; standard: number } } = {
  [Uniqueness.Zero]: { increased: 0, standard: 0 },
  [Uniqueness.TeamPapers]: { increased: 40, standard: 20 },
  [Uniqueness.Standard]: { increased: 40, standard: 30 },
  [Uniqueness.Higher]: { increased: 0, standard: 0 },
  [Uniqueness.Highest]: { increased: 0, standard: 0 },
};

const expertiseMultiplier = (selectedExpertiseArea: ExpertiseArea): CalculationMultiplier => {
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

const executionTimeMultiplier = (selectedExecutionTime: ExecutionTime): CalculationMultiplier => {
  switch (true) {
    case selectedExecutionTime === ExecutionTime.MediumTerm:
      return CalculationMultiplier.IncreasedStandard;
    case selectedExecutionTime === ExecutionTime.Urgent:
      return CalculationMultiplier.Urgent;

    default:
      return CalculationMultiplier.NoMultiplier;
  }
};

const uniquenessMultiplier = (
  workTypeData: IDropdownData,
  customUniqueness?: number,
): CalculationMultiplier => {
  if (!customUniqueness) return CalculationMultiplier.NoMultiplier;

  const { uniquenessPercentage: defaultUniqueness } = workTypeData;

  if (defaultUniqueness === undefined) {
    return CalculationMultiplier.NoMultiplier;
  }

  const threshold = thresholds[defaultUniqueness];

  if (!threshold) return CalculationMultiplier.NoMultiplier;

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
  const lastTwoDigits = priceToRound % RoundingValue.HundredBreakpoint;

  let renderedPrice: number = RoundingValue.ZeroBreakpoint;

  if (lastTwoDigits <= RoundingValue.TwentyFiveBreakpoint) {
    renderedPrice = priceToRound - lastTwoDigits;
  } else if (lastTwoDigits <= RoundingValue.SeventyFiveBreakpoint) {
    renderedPrice = priceToRound + (RoundingValue.FiftyBreakpoint - lastTwoDigits);
  } else {
    renderedPrice = priceToRound + (RoundingValue.HundredBreakpoint - lastTwoDigits);
  }

  return renderedPrice;
};

export const findSelectedObject = (selectedWorkType: WorkType) => {
  return getWorkType().find((workType) => workType.option === selectedWorkType);
};

export const calculatePrice = (
  selectedWorkType: WorkType,
  selectedExpertiseArea: ExpertiseArea,
  selectedExecutionTime: ExecutionTime,
  customUniqueness?: number,
): number => {
  const workTypeData = findSelectedObject(selectedWorkType);

  if (!workTypeData || !workTypeData.basePrice) {
    throw new Error('Invalid work type selected');
  }
  let basePrice = workTypeData.basePrice;

  basePrice *= expertiseMultiplier(selectedExpertiseArea);
  basePrice *= executionTimeMultiplier(selectedExecutionTime);
  basePrice *= uniquenessMultiplier(workTypeData, customUniqueness);

  return basePrice;
};
