import {
  BenefitLabel,
  IBenefitsItem,
  IconName,
  IOrderStep,
  IServiceItem,
  Slide,
  WorkType,
} from '../types';

export const getBenefits = (): IBenefitsItem[] => {
  return [
    {
      icon: IconName.Benefits1,
      label: BenefitLabel.Uniqueness,
    },
    {
      icon: IconName.Benefits2,
      label: BenefitLabel.Guarantee,
    },
    {
      icon: IconName.Benefits3,
      label: BenefitLabel.Correction,
    },
    {
      icon: IconName.Benefits4,
      label: BenefitLabel.Support,
    },
  ];
};

export const getFeedbackSlides = (): Slide[] => {
  return [
    {
      memberName: 'Дарина Заєць',
      memberFeedback:
        "Дякую за чудові послуги! Робота виконана якісно та вчасно, співпраця була дуже продуктивною. Ваш професіоналізм та увага до деталей вражають. Обов'язково звернусь ще раз і рекомендую іншим!",
      memberImage: '/images/customer-2.webp',
      memberAlt: 'Daryna Zaec',
      memberRating: 5,
    },
    {
      memberName: 'Андрій Білка',
      memberFeedback:
        'Дякую за відмінне обслуговування! Робота виконана на вищому рівні, співпраця була ефективною і комфортною. Рекомендую всім, хто шукає якісні послуги!',
      memberImage: '/images/customer-1.webp',
      memberAlt: 'Andrii Bilka',
      memberRating: 4,
    },
    {
      memberName: 'Петро Вовк',
      memberFeedback:
        'Дуже задоволений якістю наданих послуг! Професійний підхід, оперативність і увага до деталей роблять співпрацю приємною і результативною. Рекомендую!',
      memberImage: '/images/customer-3.webp',
      memberAlt: 'Petro Vovk',
      memberRating: 5,
    },
    {
      memberName: 'Данило Ведмідь',
      memberFeedback:
        'Дуже задоволений якістю наданих послуг! Професійний підхід, оперативність і увага до деталей роблять співпрацю приємною і результативною. Рекомендую!',
      memberImage: '/images/customer-1.webp',
      memberAlt: 'Danylo Wedmid',
      memberRating: 5,
    },
    {
      memberName: 'Семен Лисиця',
      memberFeedback:
        'Дуже задоволений якістю наданих послуг! Професійний підхід, оперативність і увага до деталей роблять співпрацю приємною і результативною. Рекомендую!',
      memberImage: '/images/customer-3.webp',
      memberAlt: 'Semen Lysytsia',
      memberRating: 4,
    },
  ];
};

export const getOrderSteps = (): IOrderStep[] => {
  return [
    {
      id: 'communication',
      step: 'Зв’яжіться з нами',
      iconName: IconName.Overview1,
    },
    {
      id: 'application process',
      step: 'Оформіть заявку',
      iconName: IconName.Overview2,
    },
    {
      id: 'prepayment',
      step: 'Після внесення 50% передоплати виконавець приступає до виконання завдання',
      iconName: IconName.Overview3,
    },
    {
      id: 'deal closing',
      step: 'По готовності сплачуєте решту суми і отримуєте готову роботу',
      iconName: IconName.Overview4,
    },
    {
      id: 'feedback',
      step: 'Залишаєте відгук',
      iconName: IconName.Overview5,
    },
  ];
};

export const getServices = (): IServiceItem[] => {
  return [
    {
      imageSrc: '/images/services-1.webp',
      imageAlt: 'Three notebooks',
      serviceTitle: WorkType.Diplomas,
    },
    {
      imageSrc: '/images/services-2.webp',
      imageAlt: 'Three notebooks, a pen and glasses',
      serviceTitle: WorkType.TeamPapers,
    },
    {
      imageSrc: '/images/services-3.webp',
      imageAlt: 'Open book and notebook',
      serviceTitle: WorkType.BachelorTheses,
    },
    {
      imageSrc: '/images/services-4.webp',
      imageAlt: 'A person draws diagrams',
      serviceTitle: WorkType.TestPapers,
    },
    {
      imageSrc: '/images/services-5.webp',
      imageAlt: 'A person moves a pen across the text of a book',
      serviceTitle: WorkType.Abstracts,
    },
    {
      imageSrc: '/images/services-6.webp',
      imageAlt: 'Geometric ruler, red marker and calculations',
      serviceTitle: WorkType.PracticalWorks,
    },
    {
      imageSrc: '/images/services-7.webp',
      imageAlt: 'A pile of books',
      serviceTitle: WorkType.Presentations,
    },
    {
      imageSrc: '/images/services-8.webp',
      imageAlt: 'Glasses on the book',
      serviceTitle: WorkType.CaseStudyReports,
    },
  ];
};
