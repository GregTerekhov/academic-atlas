import { AriaLabel } from './aria';
import { WorkType } from './calculation';
import { CompanyContacts } from './layoutTypes';
import { IconName } from './ui';

export enum ThemeVariants {
  DARK = 'dark',
  LIGHT = 'light',
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

export enum AriaLabelTrigger {
  Default = 'Кнопка відкриття навігаційного бургер-меню',
  CloseNavigation = 'Кнопка закриття навігаційного бургер-меню',
  CloseCalculation = 'Кнопка закриття меню калькуляції',
}

export interface IBaseId {
  id: string;
}

interface IBaseTitleDescription {
  title: string;
  description: string;
}

interface IBaseIcon {
  iconName: IconName;
}

interface IBaseImageData {
  imageSrc: string;
  imageAlt: string;
}

export interface IServiceItem extends IBaseId, IBaseImageData {
  serviceTitle: WorkType;
  priority?: boolean | undefined;
}

export interface IBenefitsItem extends IBaseId, IBaseIcon {
  label: BenefitLabel;
}

export interface ISlide extends IBaseId, IBaseTitleDescription, IBaseImageData {
  memberRating: number;
}

export interface IOrderStep extends IBaseId, IBaseIcon {
  step: string;
}

export interface IAboutUs extends IBaseId, IBaseTitleDescription, IBaseImageData {}
export interface IPartnershipBenefits extends IBaseId, IBaseIcon, IBaseTitleDescription {}
export interface IRequirements extends IBaseId, IBaseTitleDescription {}

export interface IWorkflow extends IBaseId, IBaseTitleDescription {
  gridMarkup: string;
}

export interface IAccession extends IBaseId {
  desc: string;
}

export interface IHeroGrid extends IBaseId {
  className: string;
  imageSrc?: string;
  imageAlt?: string;
}

export interface ISubItem {
  id: string;
  textField: string;
}

export interface ILegalInfoArticle {
  id: number;
  article: string;
  paragraph: Record<string, string | { title: string; subItems: ISubItem[] }>;
}

export interface ISubstituteProps {
  value: string;
  substitute: CompanyContacts | string;
  ariaLabel: AriaLabel;
  isInternalLink: boolean;
}

export interface IRequisites {
  id: string;
  fieldName: string;
}

export interface IStatisticItem {
  id: string;
  count: StatisticCount;
  label: StatisticLabel;
  hideOnSmallScreen?: boolean;
  hideOnLargeScreen?: boolean;
  showOnLargeScreen?: boolean;
}
