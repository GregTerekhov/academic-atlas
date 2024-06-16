import { UrlObject } from 'url';
import { IconName, IconSize } from './ui';

export enum MenuLinks {
  Main = 'Головна',
  Services = 'Наші послуги',
  Cost = 'Розрахувати вартість',
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

export interface IContactLink {
  href: string;
  iconName: IconName;
  defaultSize: IconSize;
  iconSize: string;
  labelClass: string;
  label: string;
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
  NotFound = 'notFound',
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
  [SectionTitle.NotFound]: '404',
} as const;

export type SectionTitleType = keyof typeof SectionDescriptions;
