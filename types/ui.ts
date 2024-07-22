import { SwiperOptions } from 'swiper/types';

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

export enum DropdownAriaId {
  WORK_TYPE = 'work-type',
  EXPERTISE_AREA = 'expertise-area',
  EXECUTION_TIME = 'execution-time',
}

export enum AriaId {
  Accession = 'accession',
  AccessionProcedure = 'accession-procedure',
  CalculationModule = 'calculation-module',
  ComeBack404 = 'come-back-page',
  ComplexOrdering = 'complex-ordering',
  CostOutput = 'cost-output-button',
  DefaultOrdering = 'default-ordering',
  DefaultPromotionsOrdering = 'default-promotions-ordering',
  ThemeInput = 'theme-description',
}

export enum AriaDescription {
  Accession = 'Це посилання з ознайомчої секції на офіційний Telegram-бот, де ви зможете заповнити необхідні поля і приєднатися до команди виконавців.',
  AccessionProcedure = 'Це посилання на офіційний Telegram-бот, де ви зможете заповнити необхідні поля і приєднатися до команди виконавців.',
  CalculationModule = 'Кнопка відкриття модулю калькуляції вартості роботи',
  ComeBack404 = 'Ця кнопка поверне вас на попередню сторінку',
  ComplexOrdering = 'Перехід в телеграм-бот зі збереженням введених попередньо даними в модулі розрахунку вартості',
  CostOutput = 'Кнопка виведення результатів розрахунку вартості роботи згідно з введеними даними',
  DefaultOrdering = 'Кнопка переходу  з ознайомчої секції до Telegram-боту для оформленння замовлення',
  DefaultPromotionsOrdering = 'Кнопка переходу з секції Акції до Telegram-боту для оформленння замовлення',
  ThemeInput = 'В цьому полі ви можете ввести тему вашої роботи. Зверніть увагу, що це поле не є обов`язковим для розрахунку вартості вашої роботи',
}
