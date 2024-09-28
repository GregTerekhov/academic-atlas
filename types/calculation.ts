export enum WorkType {
  Default = 'Оберіть тип роботи',
  Diplomas = 'Дипломні роботи для технікумів',
  TeamPapers = 'Курсові роботи та проєкти',
  BachelorTheses = 'Бакалаврські роботи',
  MasterTheses = 'Магістерські роботи',
  TestPapers = 'Контрольні роботи',
  Abstracts = 'Наукові статті та тези',
  PracticalWorks = 'Практичні та лабораторні роботи',
  Presentations = 'Презентації',
  CaseStudyReports = 'Звіти з практики',
}

export enum ExpertiseArea {
  Default = 'Оберіть спеціальність',
  Education = 'Освіта',
  CultureAndArt = 'Культура і мистецтво',
  Humanities = 'Гуманітарні науки',
  Theology = 'Богослов’я',
  SocialSciences = 'Соціальні та поведінкові науки',
  Journalism = 'Журналістика',
  Management = 'Управління та адміністрування',
  Law = 'Право',
  Biology = 'Біологія',
  NaturalSciences = 'Природничі науки',
  FormalSciences = 'Математика та статистика',
  IT = 'Інформаційні технології',
  MechanicalEngineering = 'Механічна інженерія',
  ElectricalEngineering = 'Електрична інженерія',
  AutomationAndInstrumentation = 'Автоматизація та приладобудування',
  ChemicalAndBioengineering = 'Хімічна та біоінженерія',
  ElectronicsAndTelecommunications = 'Електроніка та телекомунікації',
  ProductionAndTechnology = 'Виробництво та технології',
  ArchitectureAndConstruction = 'Архітектура та будівництво',
  AgriculturalSciences = 'Аграрні науки та продовольство',
  VeterinaryMedicine = 'Ветеринарна медицина',
  Healthcare = 'Охорона здоров’я',
  SocialWork = 'Соціальна робота',
  ServiceSector = 'Сфера обслуговування',
  MilitarySciences = 'Воєнні науки, національна безпека, безпека державного кордону',
  CivilSecurity = 'Цивільна безпека',
  Transport = 'Транспорт',
}

export enum ExecutionTime {
  Default = 'Оберіть термін виконання',
  LongTerm = 'Довготривалий: від 14 днів і довше',
  MediumTerm = 'Середньотривалий: 4-14 днів',
  Urgent = 'Терміновий: 1-3 дні',
}

export type DropdownOption = WorkType | ExpertiseArea | ExecutionTime;

export enum Uniqueness {
  Zero = 0,
  TeamPapers = 40,
  Standard = 50,
  Higher = 70,
  Highest = 100,
}

export enum BasePrice {
  Diplomas = 7000,
  TeamPapers = 2800,
  BachelorAndMasterTheses = 8000,
  TestPapersAndAbstracts = 400,
  PracticalWorks = 150,
  Presentations = 500,
  CaseStudyReports = 1400,
}

export enum TelegramScenario {
  Order = 'order',
  Join = 'join',
}

export enum RangeValue {
  MIN = 0,
  MAX = 100,
  STEP = 10,
  PENULTIMATE = 90,
}

export const THRESHOLDS = {
  TEAM_PAPERS_INCREASED_THRESHOLD: 40,
  TEAM_PAPERS_STANDARD_THRESHOLD: 20,
  MEDIUM_INCREASED_THRESHOLD: 40,
  MEDIUM_STANDARD_THRESHOLD: 30,
  HIGHER_INCREASED_THRESHOLD: 30,
  HIGHER_STANDARD_THRESHOLD: 20,
  ZERO_THRESHOLD: 0,
} as const;

export const ROUNDING_VALUES = {
  ZERO: 0,
  QUARTER: 25,
  HALF: 50,
  THREE_QUARTERS: 75,
  WHOLE: 100,
} as const;

export enum CalculationMultiplier {
  NoMultiplier = 1,
  Standard = 1.1,
  IncreasedStandard = 1.2,
  Urgent = 1.5,
  IT = 1.8,
}

export interface IEncryptedData {
  command: TelegramScenario;
  workType?: string;
  expertiseArea?: string;
  executionTime?: string;
  uniqueness?: string;
}

type ExcludeDefault<T> = T extends 'Default' ? never : T;

export const keyAbbreviations: Record<keyof IEncryptedData, string> = {
  command: 'c',
  workType: 'w',
  expertiseArea: 'a',
  executionTime: 't',
  uniqueness: 'u',
};

export const valueAbbreviations: Record<
  | ExcludeDefault<keyof typeof WorkType>
  | ExcludeDefault<keyof typeof ExpertiseArea>
  | ExcludeDefault<keyof typeof ExecutionTime>,
  string
> = {
  Abstracts: 'ab',
  ArchitectureAndConstruction: 'ac',
  AutomationAndInstrumentation: 'ai',
  AgriculturalSciences: 'as',
  Biology: 'bl',
  BachelorTheses: 'bt',
  CultureAndArt: 'ca',
  ChemicalAndBioengineering: 'cb',
  CaseStudyReports: 'cs',
  CivilSecurity: 'cv',
  Diplomas: 'di',
  Education: 'ed',
  ElectricalEngineering: 'ee',
  ElectronicsAndTelecommunications: 'et',
  FormalSciences: 'fs',
  Healthcare: 'hc',
  Humanities: 'hu',
  IT: 'it',
  Journalism: 'jo',
  LongTerm: 'lg',
  Law: 'lw',
  Management: 'ma',
  MediumTerm: 'md',
  MechanicalEngineering: 'me',
  MilitarySciences: 'ml',
  MasterTheses: 'mt',
  NaturalSciences: 'ns',
  Presentations: 'pr',
  ProductionAndTechnology: 'pt',
  PracticalWorks: 'pw',
  SocialSciences: 'ss',
  ServiceSector: 'sv',
  SocialWork: 'sw',
  Theology: 'tl',
  TeamPapers: 'tm',
  TestPapers: 'ts',
  Transport: 'tt',
  Urgent: 'ur',
  VeterinaryMedicine: 'vm',
};

export const humanitiesAndEconomics = new Set([
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

export const technicalSciences = new Set([
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

export interface ICalculationData {
  workType: WorkType;
  expertiseArea: ExpertiseArea;
  executionTime: ExecutionTime;
}

export interface ICalculation extends ICalculationData {
  uniqueness: number;
  theme: string;
}
export interface IDropdownData {
  typeId: string;
  option: DropdownOption;
  uniquenessPercentage?: Uniqueness;
  basePrice?: BasePrice;
}
