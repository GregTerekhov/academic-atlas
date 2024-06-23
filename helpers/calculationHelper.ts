import {
  ExecutionTime,
  ExpertiseArea,
  ICalculationData,
  IDropdownData,
  Uniqueness,
  WorkType,
} from '../types';

enum CalculationMultiplier {
  NoMultiplier = 1,
  Standard = 1.1,
  IncreasedStandard = 1.2,
  Urgent = 1.5,
  IT = 1.8,
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
  workTypeData: IDropdownData<WorkType>,
  customUniqueness?: number,
) => {
  if (!customUniqueness) return CalculationMultiplier.NoMultiplier;

  const defaultUniqueness = workTypeData.uniquenessPercentage;

  switch (true) {
    case defaultUniqueness === Uniqueness.Higher && customUniqueness > Uniqueness.Higher:
      return CalculationMultiplier.IncreasedStandard;
    case defaultUniqueness === Uniqueness.Standard && customUniqueness - Uniqueness.Standard >= 30:
      return CalculationMultiplier.IncreasedStandard;
    case defaultUniqueness === Uniqueness.Standard && customUniqueness - Uniqueness.Standard >= 10:
      return CalculationMultiplier.Standard;

    default:
      return CalculationMultiplier.NoMultiplier;
  }
};

export const isCalculationDataValid = (data: ICalculationData): boolean => {
  return (
    data.workType &&
    data.workType !== WorkType.Default &&
    data.expertiseArea &&
    data.expertiseArea !== ExpertiseArea.Default &&
    data.executionTime &&
    data.executionTime !== ExecutionTime.Default
  );
};
