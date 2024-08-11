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
  Offer = 'Договір публічної оферти',
  Policy = 'Політика конфіденційності',
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
  Offer = '/offer',
  Policy = '/policy',
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
  Offer = 'offer',
  Policy = 'policy',
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
  [SectionTitle.Offer]: 'Договір публічної оферти',
  [SectionTitle.Policy]: 'Політика конфіденційності',
} as const;

export const BACKGROUNDS: Partial<Record<SectionTitle, string>> = {
  [SectionTitle.Hero]: 'hero',
  [SectionTitle.FindOutCost]: 'find-out-cost',
  [SectionTitle.Performers]: 'performers',
  [SectionTitle.Promotions]: 'promotions',
  [SectionTitle.NotFound]: 'notFound',
  [SectionTitle.PartnershipHero]: 'performers-hero',
  [SectionTitle.PartnershipBenefits]: 'partnership-benefits',
  [SectionTitle.PartnershipRequirements]: 'partnership-requirements',
  [SectionTitle.FAQOrder]: 'faq-order',
};

export type SectionTitleType = keyof typeof SectionDescriptions;

export enum CtaText {
  NoText = '',
  MainHero = 'Розпочніть шлях до успіху з нами — оформіть замовлення вже сьогодні',
  MainPerformers = 'Пиши, розвивайся, заробляй та ставай нашим виконавцем!',
  MainPromotions = 'Замовте готовий підшитий диплом у нас і отримайте його зі зручністю "Новою поштою"',
  PartnershipHero = 'Станьте частиною спільноти професіоналів, що допомагають студентам досягати успіху',
  FAQHero = 'Тут ви знайдете відповіді на основні питання про наші послуги',
  FAQOrder = 'Наша команда готова допомогти вам виконати роботу, що відповідатиме вашим вимогам',
}

export enum CalculationTitle {
  CalculationForm = 'Дізнатися орієнтовну вартість',
  CalculationResult = 'Орієнтовна вартість',
}

export interface ILinks {
  label: MenuLinks;
  path: Paths;
  activeLink: string;
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

export interface IWithChildren {
  children: React.ReactNode;
}

export enum MetadataTitle {
  HOME = 'AcademicAtlas | Professional Student Writing Services',
  FAQ = 'AcademicAtlas | FAQ',
  PARTNERSHIP = 'AcademicAtlas | Partnership',
  POLICY = 'AcademicAtlas | Privacy Policy',
  NOT_FOUND = 'AcademicAtlas | Page Not Found',
  OFFER = 'AcademicAtlas | Public Offer Agreement',
}

export enum MetadataDescription {
  HOME = 'Професійні послуги з написання магістерських робіт, курсових робіт, лабораторних робіт і наукових статей. Отримайте миттєві оцінки вартості. Високоякісні, оригінальні академічні роботи для ваших потреб.',
  FAQ = 'Відповіді на часті запитання щодо наших послуг з написання академічних робіт. Дізнайтеся про процес замовлення, дедлайни і інші деталі.',
  PARTNERSHIP = 'Приєднуйтесь до нашої команди спеціалістів з написання стдентських робіт. Дізнайтеся про вимоги і переваги співпраці з нами.',
  POLICY = 'Політика конфіденційності: дізнайтеся, як ми обробляємо і захищаємо ваші персональні дані.',
  NOT_FOUND = 'Сторінка не знайдена. Можливо, ви ввели неправильну адресу або сторінка була видалена.',
  OFFER = 'Прочитайте наш договір публічної оферти, щоб дізнатися умови та положення надання наших послуг.',
}

export enum MetadataKeywords {
  HOME = 'AcademicAtlas, курсові роботи, дипломні роботи, магістерські роботи, наукові статті, тези, лабораторні роботи, контрольні роботи, презентації, звіти з практики',
  FAQ = 'Часті запитання, студентські роботи на замовлення, AcademicAtlas, як замовити курсову роботу',
  PARTNERSHIP = 'Приєднатися до команди, вакансії, AcademicAtlas, робота для студентів, фріланс',
  POLICY = 'Політика конфіденційності, захист даних, AcademicAtlas, обробка персональних даних',
  NOT_FOUND = '404, сторінку не знайдено, AcademicAtlas, помилка 404',
  OFFER = 'Договір публічної оферти, умови використання, AcademicAtlas',
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
  OFFER = 'https://AcademicAtlas.com/offer', //FIXME: --- add real path,
}

export enum OpenGraphImageURL {
  HOME = 'https://AcademicAtlas.com/images/og-image.jpg', //FIXME: --- add image,
  FAQ = 'https://AcademicAtlas.com/images/faq-og-image.jpg', //FIXME: --- add image,
  PARTNERSHIP = 'https://AcademicAtlas.com/images/partnership-og-image.jpg', //FIXME: --- add image,
  POLICY = 'https://AcademicAtlas.com/images/legal-og-image.jpg', //FIXME: --- add image,
  NOT_FOUND = 'https://AcademicAtlas.com/images/404-og-image.jpg', //FIXME: --- add image,
  OFFER = 'https://AcademicAtlas.com/images/offer-og-image.jpg', //FIXME: --- add image,
}

export enum OpenGraphImageAlt {
  HOME = 'Main page Academic Atlas',
  FAQ = 'FAQ page - Academic Atlas',
  PARTNERSHIP = 'Partnership page - Academic Atlas',
  POLICY = 'Privacy policy - Academic Atlas',
  NOT_FOUND = '404 - Page Not Found',
  OFFER = 'Public Offer Agreement - Academic Atlas',
}

export enum CompanyContacts {
  Telegram = 'AcademicAtlas_Official',
  Email = 'AcademicAtlas@ukr.net',
  Phone = '+380632076120',
  PhoneToPrint = '+380 63 20 761 20',
}

export interface ISectionProps {
  title: SectionTitle;
  titleStyle?: string;
  ctaStyle?: string;
  ctaText?: CtaText;
  sectionStyle?: string;
  noAlignment?: string;
  hasCtaText?: boolean;
  isBigTitle?: boolean;
  priority?: boolean;
  id?: string;
}
