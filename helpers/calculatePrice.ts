import { WorkType, ExpertiseArea, ExecutionTime, Uniqueness } from '../types';
import { getWorkType } from './calculationData';

export const calculatePrice = (
  selectedWorkType: WorkType,
  selectedExpertiseArea: ExpertiseArea,
  selectedExecutionTime: ExecutionTime,
  customUniqueness?: number,
): number => {
  const workTypeData = getWorkType().find((workType) => workType.option === selectedWorkType);
  if (!workTypeData || !workTypeData.basePrice) {
    throw new Error('Invalid work type selected');
  }
  let basePrice = workTypeData.basePrice;

  const humanitiesAndEconomics = [
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
  ];

  const technicalSciences = [
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
  ];

  if (humanitiesAndEconomics.includes(selectedExpertiseArea)) {
    basePrice *= 1.1;
  } else if (technicalSciences.includes(selectedExpertiseArea)) {
    basePrice *= 1.2;
  } else if (selectedExpertiseArea === ExpertiseArea.IT) {
    basePrice *= 1.8;
  }

  if (selectedExecutionTime === ExecutionTime.MediumTerm) {
    basePrice *= 1.2;
  } else if (selectedExecutionTime === ExecutionTime.Urgent) {
    basePrice *= 1.5;
  }

  const defaultUniqueness = workTypeData.uniquenessPercentage;
  if (defaultUniqueness === Uniqueness.Higher) {
    if (customUniqueness && customUniqueness - Uniqueness.Higher > 0) {
      basePrice *= 1.2;
    }
  } else if (defaultUniqueness === Uniqueness.Standard) {
    if (customUniqueness && customUniqueness - Uniqueness.Standard >= 30) {
      basePrice *= 1.2;
    } else if (
      customUniqueness &&
      customUniqueness - Uniqueness.Standard > 0 &&
      customUniqueness - Uniqueness.Standard <= 20
    ) {
      basePrice *= 1.1;
    }
  }

  return basePrice;
};
