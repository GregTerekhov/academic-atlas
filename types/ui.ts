import { SwiperOptions } from 'swiper/types';

export enum ButtonType {
  Button = 'button',
  Submit = 'submit',
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
}

export enum IconName {
  Arrow = 'arrow-up',
  Benefits1 = 'uniqueness',
  Benefits2 = 'guarantee',
  Benefits3 = 'corrections',
  Benefits4 = 'support',
  Burger = 'burger',
  Call = 'call',
  Check = 'checkmark',
  Close = 'close',
  Email = 'email',
  Fire = 'fire',
  Expand = 'expand',
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
  Sun = 'sun',
  Telegram = 'telegram',
  Requirements = 'requirements',
}

export interface Breakpoints {
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
