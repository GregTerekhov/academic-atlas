import { WorkType } from './calculation';
import { IconName } from './ui';

export enum ThemeVariants {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface IServiceItem {
  imageSrc: string;
  imageAlt: string;
  serviceTitle: WorkType;
  gridPosition: string;
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
  id: number;
  title: string;
  desc: string;
}

export interface IAccession {
  step: string;
  desc: string;
}

export interface IHeroGrid {
  id: string;
  className: string;
  imageSrc?: string;
  imageAlt?: string;
}
