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
  LegalInfo = 'Політика конфіденційності',
  FAQ = 'Часті запитання',
}

export enum PositionInLayout {
  Header = 'header',
  Footer = 'footer',
}

export enum PopupID {
  CostSection = 'cost-section',
  FooterMenu = 'footer-menu-link',
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
  LegalInfo = 'legal-info',
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
  [SectionTitle.LegalInfo]: 'Політика конфіденційності',
} as const;

export type SectionTitleType = keyof typeof SectionDescriptions;

export enum CtaText {
  NoText = '',
  MainHero = 'Розпочніть шлях до успіху з нами — оформіть замовлення вже сьогодні',
  MainPerformers = 'Пиши, розвивайся, заробляй та ставай нашим виконавцем!',
  MainPromotions = 'Замовте готовий підшитий диплом у нас і отримайте його зі зручністю "Новою поштою"',
  PartnershipHero = 'Станьте частиною спільноти професіоналів, що допомагають студентам досягати успіху',
  FAQHero = 'Тут ви знайдете відповіді на основні питання про наші послуги. ',
  FAQOrder = 'Наша команда готова допомогти вам виконати роботу, що відповідатиме вашим вимогам',
}

export enum CalculationTitle {
  CalculationForm = 'Дізнатися орієнтовну вартість',
  CalculationResult = 'Орієнтовна вартість',
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

export interface IChildrenProps {
  children: React.ReactNode;
}

export const MetadataTexts = {
  home: {
    title: 'AcademicAtlas | Виконання студентських робіт на замовлення',
    description:
      'Найкращі послуги з виконання курсових, дипломних, магістерських робіт, наукових статей та інших студентських завдань. Швидко, якісно, надійно.',
    keywords:
      'курсові роботи, дипломні роботи, магістерські роботи, наукові статті, лабораторні роботи, контрольні роботи, презентації, звіти з практики',
  },
  faq: {
    title: 'AcademicAtlas | Часті запитання',
    description:
      'Відповіді на часті запитання про наші послуги з виконання студентських робіт. Дізнайтеся більше про процес замовлення, терміни виконання та інші деталі.',
    keywords: 'Часті запитання, виконання студентських робіт, AcademicAtlas',
  },
  partnership: {
    title: 'AcademicAtlas | Виконавцям',
    description:
      'Дізнайтеся про вимоги та переваги приєднання до нашої команди фахівців з виконання студентських робіт. Ми шукаємо талановитих та мотивованих професіоналів.',
    keywords: 'Приєднання до команди, вакансії, AcademicAtlas',
  },
  legal: {
    title: 'AcademicAtlas | Політика конфіденційності',
    description:
      'Прочитайте нашу політику конфіденційності, щоб дізнатися, як ми обробляємо ваші персональні дані. Ми забезпечуємо захист ваших особистих даних.',
    keywords: 'Політика конфіденційності, захист даних, AcademicAtlas',
  },
  notFound: {
    title: 'AcademicAtlas | Сторінка не знайдена',
    description:
      'На жаль, сторінка, яку ви шукаєте, не знайдена. Можливо, ви ввели неправильну адресу або сторінка була видалена.',
    keywords: '404, сторінка не знайдена, AcademicAtlas',
  },
};
