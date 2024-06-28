import {
  type ICalculationData,
  type IDropdownData,
  ExecutionTime,
  ExpertiseArea,
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
  workTypeData: IDropdownData,
  customUniqueness?: number,
): CalculationMultiplier => {
  if (!customUniqueness) return CalculationMultiplier.NoMultiplier;

  const { uniquenessPercentage: defaultUniqueness } = workTypeData;

  if (defaultUniqueness === Uniqueness.Higher && customUniqueness > Uniqueness.Higher) {
    return CalculationMultiplier.IncreasedStandard;
  }

  if (defaultUniqueness === Uniqueness.TeamPapers) {
    if (customUniqueness - Uniqueness.TeamPapers >= 40) {
      return CalculationMultiplier.IncreasedStandard;
    }
    if (customUniqueness - Uniqueness.TeamPapers >= 20) {
      return CalculationMultiplier.Standard;
    }
  }

  if (defaultUniqueness === Uniqueness.Standard) {
    if (customUniqueness - Uniqueness.Standard >= 40) {
      return CalculationMultiplier.IncreasedStandard;
    }
    if (customUniqueness - Uniqueness.Standard >= 30) {
      return CalculationMultiplier.Standard;
    }
  }

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
