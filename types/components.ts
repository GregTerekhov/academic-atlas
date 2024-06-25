import { IconName } from './ui';

export enum WorkType {
  Default = 'Оберіть тип роботи',
  Diplomas = 'Дипломні роботи',
  TeamPapers = 'Курсові роботи та проєкти',
  BachelorTheses = 'Бакалаврські та магістерські роботи',
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

export enum Uniqueness {
  Zero = 0,
  Standard = 50,
  Higher = 70,
}

type DropdownCalculationOption = WorkType | ExpertiseArea | ExecutionTime;

export interface IDropdownData {
  typeId: string;
  option: DropdownCalculationOption;
  uniquenessPercentage?: Uniqueness;
  basePrice?: number;
}

export enum ThemeVariants {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface IServiceItem {
  imageSrc: string;
  imageAlt: string;
  serviceTitle: WorkType;
}

export enum StatisticCount {
  Year = '15+',
  Service = '40+',
  Speciality = '50+',
  Work = '2850+',
  Expert = '25+',
}

export enum StatisticLabel {
  Year = 'років діяльності',
  Service = 'видів послуг',
  Speciality = 'спеціальностей',
  Work = 'якісно виконаних робіт',
  Expert = 'експертна команда',
}

export enum BenefitLabel {
  Uniqueness = 'Високий рівень унікальності',
  Guarantee = 'Гарантія якості та результатів',
  Correction = 'Можливість внесення правок',
  Support = 'Підтримка до захисту',
}

export interface IBenefitsItem {
  icon: IconName;
  label: BenefitLabel;
}

export interface Slide {
  memberName: string;
  memberFeedback: string;
  memberImage: string;
  memberAlt: string;
  memberRating: number;
  memberFeedbackDate?: Date;
}

export interface IOrderStep {
  id: string;
  step: string;
  iconName: IconName;
}

export enum AriaLabelTrigger {
  Default = 'Open navigation Menu',
  CloseNavigation = 'Close navigation menu',
  CloseCalculation = 'Close calculation menu',
}

export interface IAboutUs {
  id: number;
  header: string;
  description: string;
  imageData: {
    src: string;
    alt: string;
  };
}

export interface IPartnershipBenefits {
  id: number;
  title: string;
  desc: string;
  iconId: IconName;
}

export interface IWorkflow {
  count: string;
  header: string;
  desc: string;
  gridMarkup: string;
}

export interface IRequirements {
  title: string;
  desc: string;
}

export interface IAccession {
  step: string;
  desc: string;
}
