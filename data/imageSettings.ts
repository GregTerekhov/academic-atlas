import { ImageSize } from '../types';

export const slideImageSettings = {
  width: ImageSize.Little120,
  height: ImageSize.Little120,
};

export const serviceImageSettings = {
  width: ImageSize.Small152,
  height: ImageSize.Little80,
  className: 'absolute top-0 w-full object-cover max-sm:h-auto md:h-full',
};

export const partnershipAboutImageSettings = {
  width: ImageSize.Small180,
  height: ImageSize.Big327,
  className: 'w-auto object-cover md:h-[280px] md:w-[512px]',
};

export const heroMatrixImageSettings = {
  width: ImageSize.Little80,
  height: ImageSize.Little80,
  className: 'lg:size-44',
};

export const imageSettings = {
  faqHero: {
    src: '/images/faq-hero-girl.webp',
    alt: 'Girl with a book and question marks symbolizing frequently asked questions and answers',
    width: ImageSize.Medium200,
    height: ImageSize.Medium208,
    className:
      'max-md:mx-auto md:absolute md:right-10 md:top-1/2 md:h-[260px] md:w-[240px] md:-translate-y-1/2 lg:h-[584px] lg:w-[537px]',
  },
  slideMemberFirst: {
    src: '/images/customer-01.webp',
    alt: 'Anna Parfeniuk',
  },
  slideMemberSecond: {
    src: '/images/customer-02.webp',
    alt: 'Vladyslav Burkivskii',
  },
  slideMemberThird: {
    src: '/images/customer-03.webp',
    alt: 'Vadym Zosymenko',
  },
  slideMemberFourth: {
    src: '/images/customer-04.webp',
    alt: 'Iryna Sydorchuk',
  },
  slideMemberFifth: {
    src: '/images/customer-05.webp',
    alt: 'Volodymyr Shelest',
  },
  slideMemberSixth: {
    src: '/images/customer-06.webp',
    alt: 'Karolina Zubrytska',
  },
  slideMemberSeventh: {
    src: '/images/customer-07.webp',
    alt: 'Volodymyr Shkvarnytskii',
  },
  serviceOverview: {
    src: '/backgroundImage/service-overview.png',
    width: ImageSize.Medium200,
    height: ImageSize.Big334,
    className: 'md:w-[264px] md:h-auto lg:h-[512px] lg:w-[402px] h-auto w-auto',
  },
  promotions: {
    src: '/images/notes.png',
    alt: '',
    width: ImageSize.Medium216,
    height: ImageSize.Small144,
    className:
      'size-auto max-md:mx-auto max-md:mb-8 md:absolute md:right-10 md:top-1/2 md:h-auto md:w-[224px] md:-translate-y-1/2 lg:h-auto lg:w-[416px]',
  },
  serviceFirstItem: {
    src: '/images/services-001.webp',
    alt: 'Three notebooks',
    priority: true,
  },
  serviceSecondItem: {
    src: '/images/services-002.webp',
    alt: 'Glasses on a stack of books',
    priority: true,
  },
  serviceThirdItem: {
    src: '/images/services-003.webp',
    alt: 'A person writes with a pen on paper',
    priority: true,
  },
  serviceFourthItem: {
    src: '/images/services-004.webp',
    alt: 'A Phone and a notebook on the table against the background of a flower pot',
    priority: true,
  },
  serviceFifthItem: {
    src: '/images/services-005.webp',
    alt: 'A stack of notebooks with bookmarks',
    priority: true,
  },
  serviceSixthItem: {
    src: '/images/services-006.webp',
    alt: 'Glasses on an open notebook next to the laptop',
    priority: true,
  },
  serviceSeventhItem: {
    src: '/images/services-007.webp',
    alt: 'A person holding an open book on the background of a workbook',
  },
  serviceEighthItem: {
    src: '/images/services-008.webp',
    alt: 'Glasses on the book',
  },
  serviceNinthItem: {
    src: '/images/services-009.webp',
    alt: 'A pile of books',
  },
  partnershipAccession: {
    src: '/images/accession.webp',
    alt: 'People grabs each other wrist to holding up one another',
    width: ImageSize.Big327,
    height: ImageSize.Medium200,
    className:
      'rounded-xl object-cover object-center md:h-[220px] md:w-[292px] lg:h-[287px] lg:w-[516px]',
  },
  partnershipAboutUs1: {
    src: '/images/who-we-are.webp',
    alt: 'Working meeting at the table',
  },
  partnershipAboutUs2: {
    src: '/images/who-we-are-looking-for.webp',
    alt: 'People at the meeting write in notebooks',
  },
  heroMatrixTop: {
    src: '/images/top-left-matrix-grid.webp',
    alt: 'A person is typing on a laptop',
  },
  heroMatrixMiddle: {
    src: '/images/center-matrix-grid.webp',
    alt: 'A woman searches the bookshelves',
  },
  heroMatrixBottom: {
    src: '/images/bottom-right-matrix-grid.webp',
    alt: 'A woman holds a mug with her right hand and is about to write something in a notebook with her left',
  },
};
