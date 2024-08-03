import { SwiperOptions } from 'swiper/types';
import { DropdownOption } from './calculation';
import { DropdownAriaId } from './aria';

export enum ButtonType {
  Button = 'button',
}

export type SvgSizes = {
  width: IconSize;
  height: IconSize;
};

export enum IconSize {
  XXS = 14,
  XS = 16,
  HalfS = 18,
  S = 20,
  HalfM = 24,
  M = 30,
  BG = 32,
  HalfL = 36,
  L = 40,
  XL = 56,
  XXL = 64,
  LogoSmallWidth = 77,
  XXXL = 80,
  Giant = 112,
  WorkflowMdHeight = 640,
  WorkflowMdWidth = 264,
  WorkflowLgHeight = 480,
  WorkflowLgWidth = 616,
}

export enum IconName {
  Arrow = 'arrow-up',
  Benefits1 = 'uniqueness',
  Benefits2 = 'guarantee',
  Benefits3 = 'corrections',
  Benefits4 = 'support',
  BenefitPartnership1 = 'reward',
  BenefitPartnership2 = 'schedule',
  BenefitPartnership3 = 'progress',
  Burger = 'burger',
  Call = 'call',
  Check = 'checkmark',
  Close = 'close',
  Email = 'email',
  Expand = 'expand',
  Fire = 'fire',
  Logo = 'logo',
  Moon = 'moon',
  Overview1 = 'speaking',
  Overview2 = 'complete-form',
  Overview3 = 'prepayment',
  Overview4 = 'deal-closing',
  Overview5 = 'feedback',
  PartnershipStepMd = 'partnership-steps-tablet',
  PartnershipStepLg = 'partnership-steps-desktop',
  Question = 'question',
  RatingDown = 'star',
  RatingUp = 'star-full',
  Requirements = 'requirements',
  Sun = 'sun',
  Telegram = 'telegram',
}

export interface IBreakpoints {
  [width: number]: SwiperOptions;
  [ratio: string]: SwiperOptions;
}

export enum PrimaryButtonLabel {
  Ordering = 'Замовити',
  CostCalculation = 'Розрахувати вартість',
  Accession = 'Приєднатися',
  SwitchToTelegram = 'Перейти в Телеграм',
  ToPreviousPage = 'Перейти на попередню',
  ToMainPage = 'Перейти на головну',
}

export enum ImageSize {
  Little80 = 80,
  Little120 = 120,
  Small144 = 144,
  Small152 = 152,
  Small180 = 180,
  Medium192 = 192,
  Medium200 = 200,
  Medium208 = 208,
  Medium216 = 216,
  Big327 = 327,
  Big334 = 334,
  Big402 = 402,
  Big512 = 512,
}

export enum BackgroundImageSizes {
  ExtraLargeWidth = 2000,
  DesktopWidth = 1440,
  TabletWidth = 768,
  MobileWidth = 375,
  MobileHeight = 1080,
  TabletHeight = 1600,
  DesktopHeight = 1800,
  ExtraLargeHeight = 4000,
}

export interface IOption {
  typeId: string;
  option: DropdownOption;
}

export interface IDropdownProps {
  label: DropdownOption;
  options: IOption[];
  onOptionSelect: (option: DropdownOption) => void;
  ariaId: DropdownAriaId;
}
