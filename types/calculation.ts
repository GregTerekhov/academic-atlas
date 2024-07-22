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

export interface ICalculationData {
  workType: WorkType;
  expertiseArea: ExpertiseArea;
  executionTime: ExecutionTime;
}
export interface IDropdownData {
  typeId: string;
  option: DropdownOption;
  uniquenessPercentage?: Uniqueness;
  basePrice?: BasePrice;
}
