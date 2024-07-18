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
}

export interface IChildrenProps {
  children: React.ReactNode;
}

export const MetadataTexts = {
  home: {
    title: 'AcademicAtlas | Professional Student Writing Services',
    description:
      "Professional writing services for master's theses, course papers, lab reports, and scientific articles. Get instant cost estimates based on type, specialty, deadline, and uniqueness percentage. High-quality, original work tailored to your academic needs.",
    keywords:
      "course papers, theses, master's theses, scientific articles, lab reports, control works, presentations, practice reports",
    openGraph: {
      title: 'AcademicAtlas | Professional Student Writing Services',
      description:
        'Professional writing services for masters theses, course papers, lab reports, and scientific articles. Get instant cost estimates based on type, specialty, deadline, and uniqueness percentage. High-quality, original work tailored to your academic needs.',
      // url: 'https://AcademicAtlas.com',   //FIXME: --- add real path
      type: 'website',
      images: [
        {
          // url: 'https://AcademicAtlas.com/images/og-image.jpg',  //FIXME: --- add image
          width: 1200,
          height: 630,
          alt: 'AcademicAtlas',
        },
      ],
    },
  },
  faq: {
    title: 'AcademicAtlas | FAQ',
    description:
      'Answers to frequently asked questions about our custom academic work services. Learn more about the ordering process, deadlines, and other details.',
    keywords: 'frequently asked questions, custom academic work, AcademicAtlas',
    openGraph: {
      title: 'AcademicAtlas | FAQ',
      description:
        'Answers to frequently asked questions about our custom academic work services. Learn more about the ordering process, deadlines, and other details.',
      // url: 'https://AcademicAtlas.com/faq',   //FIXME: --- add real path
      type: 'article',
      images: [
        {
          // url: 'https://AcademicAtlas.com/images/faq-og-image.jpg',   //FIXME: --- add image
          width: 1200,
          height: 630,
          alt: 'FAQ - AcademicAtlas',
        },
      ],
    },
  },
  partnership: {
    title: 'AcademicAtlas | Partnership',
    description:
      'Learn about the requirements and benefits of joining our team of academic work specialists. We are looking for talented and motivated professionals.',
    keywords: 'Join team, vacancies, AcademicAtlas',
    openGraph: {
      title: 'AcademicAtlas | Partnership',
      description:
        'Learn about the requirements and benefits of joining our team of academic work specialists. We are looking for talented and motivated professionals.',
      // url: 'https://AcademicAtlas.com/partnership',  //FIXME: --- add real path
      type: 'article',
      images: [
        {
          // url: 'https://AcademicAtlas.com/images/partnership-og-image.jpg',  //FIXME: --- add image
          width: 1200,
          height: 630,
          alt: 'Partnership - AcademicAtlas',
        },
      ],
    },
  },
  legal: {
    title: 'AcademicAtlas | Privacy Policy',
    description:
      'Read our privacy policy to learn how we handle your personal data. We ensure the protection of your personal information.',
    keywords: 'Privacy policy, data protection, AcademicAtlas',
    openGraph: {
      title: 'AcademicAtlas | Privacy Policy',
      description:
        'Read our privacy policy to learn how we handle your personal data. We ensure the protection of your personal information.',
      // url: 'https://AcademicAtlas.com/legal',   //FIXME: --- add real path
      type: 'article',
      images: [
        {
          // url: 'https://AcademicAtlas.com/images/legal-og-image.jpg',   //FIXME: --- add image
          width: 1200,
          height: 630,
          alt: 'Legal - AcademicAtlas',
        },
      ],
    },
  },
  notFound: {
    title: 'AcademicAtlas | Page Not Found',
    description:
      'Unfortunately, the page you are looking for was not found. You might have entered an incorrect address or the page has been removed.',
    keywords: '404, page not found, AcademicAtlas',
    openGraph: {
      title: 'AcademicAtlas | Page Not Found',
      description:
        'Unfortunately, the page you are looking for was not found. You might have entered an incorrect address or the page has been removed.',
      // url: 'https://AcademicAtlas.com/',   //FIXME: --- add real path
      type: 'article',
      images: [
        {
          // url: 'https://AcademicAtlas.com/images/404-og-image.jpg',    //FIXME: --- add image
          width: 1200,
          height: 630,
          alt: '404 - Page Not Found',
        },
      ],
    },
  },
};
