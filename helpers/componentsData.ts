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
      memberImage: '/customer-2.webp',
    },
    {
      memberName: 'Андрій Білка',
      memberFeedback:
        'Дякую за відмінне обслуговування! Робота виконана на вищому рівні, співпраця була ефективною і комфортною. Рекомендую всім, хто шукає якісні послуги!',
      memberImage: '/customer-1.webp',
    },
    {
      memberName: 'Петро Вовк',
      memberFeedback:
        'Дуже задоволений якістю наданих послуг! Професійний підхід, оперативність і увага до деталей роблять співпрацю приємною і результативною. Рекомендую!',
      memberImage: '/customer-3.webp',
    },
    {
      memberName: 'Данило Ведмідь',
      memberFeedback:
        'Дуже задоволений якістю наданих послуг! Професійний підхід, оперативність і увага до деталей роблять співпрацю приємною і результативною. Рекомендую!',
      memberImage: '/customer-1.webp',
    },
    {
      memberName: 'Семен Лисиця',
      memberFeedback:
        'Дуже задоволений якістю наданих послуг! Професійний підхід, оперативність і увага до деталей роблять співпрацю приємною і результативною. Рекомендую!',
      memberImage: '/customer-3.webp',
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
      imageSrc: '/services-1.webp',
      imageAlt: 'Three notebooks',
      serviceTitle: WorkType.Diplomas,
    },
    {
      imageSrc: '/services-2.webp',
      imageAlt: 'Three notebooks, a pen and glasses',
      serviceTitle: WorkType.TeamPapers,
    },
    {
      imageSrc: '/services-3.webp',
      imageAlt: 'Open book and notebook',
      serviceTitle: WorkType.BachelorTheses,
    },
    {
      imageSrc: '/services-4.webp',
      imageAlt: 'A person draws diagrams',
      serviceTitle: WorkType.TestPapers,
    },
    {
      imageSrc: '/services-5.webp',
      imageAlt: 'A person moves a pen across the text of a book',
      serviceTitle: WorkType.Abstracts,
    },
    {
      imageSrc: '/services-6.webp',
      imageAlt: 'Geometric ruler, red marker and calculations',
      serviceTitle: WorkType.PracticalWorks,
    },
    {
      imageSrc: '/services-7.webp',
      imageAlt: 'A pile of books',
      serviceTitle: WorkType.Presentations,
    },
    {
      imageSrc: '/services-8.webp',
      imageAlt: 'Glasses on the book',
      serviceTitle: WorkType.CaseStudyReports,
    },
  ];
};
