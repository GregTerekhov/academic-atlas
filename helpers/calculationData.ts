import {
  type IDropdownData,
  BasePrice,
  ExecutionTime,
  ExpertiseArea,
  Uniqueness,
  WorkType,
} from '../types';

export const getWorkType = (): IDropdownData[] => {
  return [
    {
      typeId: 'teamWork1',
      option: WorkType.Diplomas,
      uniquenessPercentage: Uniqueness.Higher,
      basePrice: BasePrice.Diplomas,
    },
    {
      typeId: 'teamWork2',
      option: WorkType.TeamPapers,
      uniquenessPercentage: Uniqueness.Standard,
      basePrice: BasePrice.TeamPapers,
    },
    {
      typeId: 'teamWork3',
      option: WorkType.BachelorTheses,
      uniquenessPercentage: Uniqueness.Higher,
      basePrice: BasePrice.BachelorTheses,
    },
    {
      typeId: 'teamWork4',
      option: WorkType.TestPapers,
      uniquenessPercentage: Uniqueness.Zero,
      basePrice: BasePrice.TestPapersAndAbstracts,
    },
    {
      typeId: 'teamWork5',
      option: WorkType.Abstracts,
      uniquenessPercentage: Uniqueness.Higher,
      basePrice: BasePrice.TestPapersAndAbstracts,
    },
    {
      typeId: 'teamWork6',
      option: WorkType.PracticalWorks,
      uniquenessPercentage: Uniqueness.Zero,
      basePrice: BasePrice.PracticalWorks,
    },
    {
      typeId: 'teamWork7',
      option: WorkType.Presentations,
      uniquenessPercentage: Uniqueness.Zero,
      basePrice: BasePrice.Presentations,
    },
    {
      typeId: 'teamWork8',
      option: WorkType.CaseStudyReports,
      uniquenessPercentage: Uniqueness.Zero,
      basePrice: BasePrice.CaseStudyReports,
    },
  ];
};

export const getExpertiseArea = (): IDropdownData[] => {
  return [
    {
      typeId: 'area1',
      option: ExpertiseArea.Education,
    },
    {
      typeId: 'area2',
      option: ExpertiseArea.CultureAndArt,
    },
    {
      typeId: 'area3',
      option: ExpertiseArea.Humanities,
    },
    {
      typeId: 'area4',
      option: ExpertiseArea.Theology,
    },
    {
      typeId: 'area5',
      option: ExpertiseArea.SocialSciences,
    },
    {
      typeId: 'area7',
      option: ExpertiseArea.Journalism,
    },
    {
      typeId: 'area8',
      option: ExpertiseArea.Management,
    },
    {
      typeId: 'area9',
      option: ExpertiseArea.Law,
    },
    {
      typeId: 'area10',
      option: ExpertiseArea.Biology,
    },
    {
      typeId: 'area11',
      option: ExpertiseArea.NaturalSciences,
    },
    {
      typeId: 'area12',
      option: ExpertiseArea.FormalSciences,
    },
    {
      typeId: 'area13',
      option: ExpertiseArea.IT,
    },
    {
      typeId: 'area14',
      option: ExpertiseArea.MechanicalEngineering,
    },
    {
      typeId: 'area15',
      option: ExpertiseArea.ElectricalEngineering,
    },
    {
      typeId: 'area16',
      option: ExpertiseArea.AutomationAndInstrumentation,
    },
    {
      typeId: 'area17',
      option: ExpertiseArea.ChemicalAndBioengineering,
    },
    {
      typeId: 'area18',
      option: ExpertiseArea.ElectronicsAndTelecommunications,
    },
    {
      typeId: 'area19',
      option: ExpertiseArea.ProductionAndTechnology,
    },
    {
      typeId: 'area20',
      option: ExpertiseArea.ArchitectureAndConstruction,
    },
    {
      typeId: 'area21',
      option: ExpertiseArea.AgriculturalSciences,
    },
    {
      typeId: 'area22',
      option: ExpertiseArea.VeterinaryMedicine,
    },
    {
      typeId: 'area23',
      option: ExpertiseArea.Healthcare,
    },
    {
      typeId: 'area24',
      option: ExpertiseArea.SocialWork,
    },
    {
      typeId: 'area25',
      option: ExpertiseArea.ServiceSector,
    },
    {
      typeId: 'area26',
      option: ExpertiseArea.MilitarySciences,
    },
    {
      typeId: 'area27',
      option: ExpertiseArea.CivilSecurity,
    },
    {
      typeId: 'area28',
      option: ExpertiseArea.Transport,
    },
  ];
};

export const getExecutionTime = (): IDropdownData[] => {
  return [
    {
      typeId: 'time1',
      option: ExecutionTime.LongTerm,
    },
    {
      typeId: 'time2',
      option: ExecutionTime.MediumTerm,
    },
    {
      typeId: 'time3',
      option: ExecutionTime.Urgent,
    },
  ];
};
