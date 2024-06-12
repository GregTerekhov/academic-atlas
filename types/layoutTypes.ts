import { UrlObject } from 'url';

export enum MenuLinks {
  Main = 'Головна',
  Services = 'Наші послуги',
  Cost = 'Дізнатися вартість',
  Overview = 'Як працює сервіс',
  AboutUs = 'Про нас',
  Feedback = 'Відгуки',
  Promotions = 'Акції',
  Partnership = 'Виконавцям',
  FAQ = 'Часті запитання',
}

export enum PositionInLayout {
  Header = 'header',
  Footer = 'footer',
}

export enum Paths {
  Main = '/',
  Services = '/#services',
  Cost = '/#cost',
  Overview = '/#overview',
  AboutUs = '/#about-us',
  Promotions = '/#promotions',
  Feedback = '/#feedback',
  FAQ = '/FAQ',
  LegalInfo = '/legal-info',
  Partnership = '/partnership',
}

export interface ILinks {
  label: MenuLinks;
  path: UrlObject | Paths;
}

export enum SectionTitle {
  Hero = 'hero',
  OurServices = 'our-services',
  FindOutCost = 'find-out-cost',
  HowItWorks = 'service-overview',
  Performers = 'performers',
  AboutUs = 'about-us',
  Promotions = 'promotions',
  CustomerReviews = 'customer-reviews',
}

export const SectionDescriptions = {
  [SectionTitle.Hero]: 'Ваш партнер у світі професійної освіти',
  [SectionTitle.OurServices]: 'Наші послуги',
  [SectionTitle.FindOutCost]: 'Дізнайтесь вартість своєї роботи',
  [SectionTitle.HowItWorks]: 'Як працює сервіс',
  [SectionTitle.Performers]: 'Запрошуємо стати частиною нашої команди',
  [SectionTitle.AboutUs]: 'Про нас',
  [SectionTitle.Promotions]: 'Акція - Диплом під ключ',
  [SectionTitle.CustomerReviews]: 'Відгуки наших клієнтів',
} as const;

export type SectionTitleType = keyof typeof SectionDescriptions;
