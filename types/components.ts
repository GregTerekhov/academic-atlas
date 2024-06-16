import { IconName } from './ui';

export enum Example {
  'Ex1',
  'Ex2',
  'Ex3',
  'Ex4',
}

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

export interface IWorkType {
  typeId: string;
  option: WorkType;
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
  memberRating?: number;
  memberFeedbackDate?: Date;
}

export interface IOrderStep {
  id: string;
  step: string;
  iconName: IconName;
}
