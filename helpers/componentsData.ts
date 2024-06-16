import {
  BenefitLabel,
  IBenefitsItem,
  IconName,
  IOrderStep,
  IServiceItem,
  Slide,
  WorkType,
} from '../types';

import customer1 from '../customer-1.webp';
import customer2 from '../customer-2.webp';
import customer3 from '../customer-3.webp';
import diplomas from '../services-1.webp';
import teamPapers from '../services-2.webp';
import bachelorTheses from '../services-3.webp';
import testPapers from '../services-4.webp';
import abstracts from '../services-5.webp';
import practicalWorks from '../services-6.webp';
import presentations from '../services-7.webp';
import caseStudyReports from '../services-8.webp';

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
      memberImage: customer2,
    },
    {
      memberName: 'Андрій Білка',
      memberFeedback:
        'Дякую за відмінне обслуговування! Робота виконана на вищому рівні, співпраця була ефективною і комфортною. Рекомендую всім, хто шукає якісні послуги!',
      memberImage: customer1,
    },
    {
      memberName: 'Петро Вовк',
      memberFeedback:
        'Дуже задоволений якістю наданих послуг! Професійний підхід, оперативність і увага до деталей роблять співпрацю приємною і результативною. Рекомендую!',
      memberImage: customer3,
    },
    {
      memberName: 'Данило Ведмідь',
      memberFeedback:
        'Дуже задоволений якістю наданих послуг! Професійний підхід, оперативність і увага до деталей роблять співпрацю приємною і результативною. Рекомендую!',
      memberImage: customer1,
    },
    {
      memberName: 'Семен Лисиця',
      memberFeedback:
        'Дуже задоволений якістю наданих послуг! Професійний підхід, оперативність і увага до деталей роблять співпрацю приємною і результативною. Рекомендую!',
      memberImage: customer3,
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
      imageSrc: diplomas,
      imageAlt: 'Three notebooks',
      serviceTitle: WorkType.Diplomas,
    },
    {
      imageSrc: teamPapers,
      imageAlt: 'Three notebooks, a pen and glasses',
      serviceTitle: WorkType.TeamPapers,
    },
    {
      imageSrc: bachelorTheses,
      imageAlt: 'Open book and notebook',
      serviceTitle: WorkType.BachelorTheses,
    },
    {
      imageSrc: testPapers,
      imageAlt: 'A person draws diagrams',
      serviceTitle: WorkType.TestPapers,
    },
    {
      imageSrc: abstracts,
      imageAlt: 'A person moves a pen across the text of a book',
      serviceTitle: WorkType.Abstracts,
    },
    {
      imageSrc: practicalWorks,
      imageAlt: 'Geometric ruler, red marker and calculations',
      serviceTitle: WorkType.PracticalWorks,
    },
    {
      imageSrc: presentations,
      imageAlt: 'A pile of books',
      serviceTitle: WorkType.Presentations,
    },
    {
      imageSrc: caseStudyReports,
      imageAlt: 'Glasses on the book',
      serviceTitle: WorkType.CaseStudyReports,
    },
  ];
};
