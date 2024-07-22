import { AriaLabel } from './aria';
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
  path: Paths;
  id?: string | undefined;
}

export interface IContactLink {
  href: string;
  iconName: IconName;
  defaultSize: IconSize;
  iconSize: string;
  labelClass: string;
  label: string;
  iconAriaLabel: AriaLabel;
}

export interface IChildrenProps {
  children: React.ReactNode;
}

export enum MetadataTitle {
  HOME = 'AcademicAtlas | Professional Student Writing Services',
  FAQ = 'AcademicAtlas | FAQ',
  PARTNERSHIP = 'AcademicAtlas | Partnership',
  POLICY = 'AcademicAtlas | Privacy Policy',
  NOT_FOUND = 'AcademicAtlas | Page Not Found',
}

export enum MetadataDescription {
  HOME = "Professional writing services for master's theses, course papers, lab reports, and scientific articles. Get instant cost estimates based on type, specialty, deadline, and uniqueness percentage. High-quality, original work tailored to your academic needs.",
  FAQ = 'Answers to frequently asked questions about our custom academic work services. Learn more about the ordering process, deadlines, and other details.',
  PARTNERSHIP = 'Learn about the requirements and benefits of joining our team of academic work specialists. We are looking for talented and motivated professionals.',
  POLICY = 'Read our privacy policy to learn how we handle your personal data. We ensure the protection of your personal information.',
  NOT_FOUND = 'Unfortunately, the page you are looking for was not found. You might have entered an incorrect address or the page has been removed.',
}

export enum MetadataKeywords {
  HOME = "course papers, theses, master's theses, scientific articles, lab reports, control works, presentations, practice reports",
  FAQ = 'frequently asked questions, custom academic work, AcademicAtlas',
  PARTNERSHIP = 'Join team, vacancies, AcademicAtlas',
  POLICY = 'Privacy policy, data protection, AcademicAtlas',
  NOT_FOUND = '404, page not found, AcademicAtlas',
}

export enum OpenGraphType {
  Website = 'website',
  Article = 'article',
}

export enum OpenGraphURL {
  HOME = 'https://AcademicAtlas.com', //FIXME: --- add real path
  FAQ = 'https://AcademicAtlas.com/faq', //FIXME: --- add real path,
  PARTNERSHIP = 'https://AcademicAtlas.com/partnership', //FIXME: --- add real path,
  POLICY = 'https://AcademicAtlas.com/legal', //FIXME: --- add real path,
  NOT_FOUND = 'https://AcademicAtlas.com/', //FIXME: --- add real path,
}

export enum OpenGraphImageURL {
  HOME = 'https://AcademicAtlas.com/images/og-image.jpg', //FIXME: --- add image,
  FAQ = 'https://AcademicAtlas.com/images/faq-og-image.jpg', //FIXME: --- add image,
  PARTNERSHIP = 'https://AcademicAtlas.com/images/partnership-og-image.jpg', //FIXME: --- add image,
  POLICY = 'https://AcademicAtlas.com/images/legal-og-image.jpg', //FIXME: --- add image,
  NOT_FOUND = 'https://AcademicAtlas.com/images/404-og-image.jpg', //FIXME: --- add image,
}

export enum OpenGraphImageAlt {
  HOME = 'AcademicAtlas',
  FAQ = 'FAQ - AcademicAtlas',
  PARTNERSHIP = 'Partnership - AcademicAtlas',
  POLICY = 'Legal - AcademicAtlas',
  NOT_FOUND = '404 - Page Not Found',
}
