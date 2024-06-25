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
  LegalInfo = 'Політика конфіденційності та умови використання',
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
  PartnershipHero = 'partnership-hero',
  PartnershipBenefits = 'partnership-benefits',
  PartnershipWorkflow = 'partnership-workflow',
  PartnershipRequirements = 'partnership-requirements',
  PartnershipAccession = 'partnership-accession',
  FAQHero = 'faq-hero',
  FAQOrder = 'faq-order',
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
  [SectionTitle.PartnershipHero]: 'Ласкаво просимо до нашої команди виконавців!',
  [SectionTitle.PartnershipBenefits]: 'Вигоди співпраці з нами',
  [SectionTitle.PartnershipWorkflow]: 'Як це працює',
  [SectionTitle.PartnershipRequirements]: 'Основні вимоги',
  [SectionTitle.PartnershipAccession]: 'Як приєднатися до нашої команди',
  [SectionTitle.FAQHero]: 'Найпоширеніші запитання та відповіді',
  [SectionTitle.FAQOrder]: 'Замовте дипломну роботу прямо зараз!',
} as const;

export type SectionTitleType = keyof typeof SectionDescriptions;

export enum CtaText {
  NoText = '',
  MainHero = 'Розпочніть шлях до успіху з нами — оформіть замовлення вже сьогодні',
  MainPerformers = 'Пиши, розвивайся, заробляй та ставай нашим виконавцем!',
  MainPromotions = 'Замовте готовий підшитий диплом у нас і отримайте його зі зручністю "Новою поштою"',
  PartnershipHero = 'Станьте частиною спільноти професіоналів, що допомагають студентам досягати успіху',
  FAQHero = 'Тут ви знайдете відповіді на основні питання про наші послуги. ',
  FAQOrder = 'Наша команда готова допомогти вам з виконанням роботи, яка відповідатиме вашим вимогам',
}

export enum CalculationTitle {
  CalculationForm = 'Дізнатися орієнтовну вартість',
  CalculationResult = 'Орієнтовна вартість',
}
