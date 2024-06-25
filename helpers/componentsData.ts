import {
  BenefitLabel,
  IBenefitsItem,
  IconName,
  IOrderStep,
  IServiceItem,
  Slide,
  WorkType,
  IPartnershipBenefits,
  IWorkflow,
  IRequirements,
  IAccession,
  IAboutUs,
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

export const getAboutUsData = (): IAboutUs[] => {
  return [
    {
      id: 1,
      header: 'Хто ми?',
      description:
        'Ми - платформа, що спеціалізується на виконанні наукових робіт на замовлення. Наша мета - надавати якісні та професійні послуги нашим клієнтам, допомагаючи їм досягти успіху в їхніх навчальних цілях',
      imageData: {
        src: '/images/partnership-who-we-are.webp',
        alt: 'a couple arm pointing on a laptop',
      },
    },
    {
      id: 2,
      header: 'Кого ми шукаємо?',
      description:
        'Ми запрошуємо талановитих та відповідальних виконавців, готових долучитися до нашої команди. Якщо ви експерт у вашій галузі, володієте високим рівнем професіоналізму та бажаєте працювати в команді, це місце для вас',
      imageData: {
        src: '/images/partnership-what-we-are-looking-for.webp',
        alt: 'people sitting at the desktop',
      },
    },
  ];
};

export const getPartnershipBenefits = (): IPartnershipBenefits[] => {
  return [
    {
      id: 1,
      title: 'Конкурентна винагорода',
      desc: 'Ми пропонуємо справедливу оплату за виконану роботу',
      iconId: IconName.BenefitPartnership1,
    },
    {
      id: 2,
      title: 'Гнучкий графік',
      desc: 'Обирайте час роботи, який буде для вас найзручнішим',
      iconId: IconName.BenefitPartnership2,
    },
    {
      id: 3,
      title: 'Ваш розвиток',
      desc: 'Розвивайтеся та вдосконалюйте навички з проектами',
      iconId: IconName.BenefitPartnership3,
    },
  ];
};

export const getWorkflowData = (): IWorkflow[] => {
  return [
    {
      count: '1',
      header: 'Реєстрація',
      desc: 'Приєднуйтесь до нашої платформи через Telegram, заповнивши профіль з вашим досвідом та спеціалізацією',
      gridMarkup: 'lg:row-start-1 lg:row-end-3',
    },
    {
      count: '2',
      header: 'Отримання завдань',
      desc: "Якщо замовлення відповідає вашій експертизі, наш менеджер зв'яжеться з вами для узгодження деталей",
      gridMarkup: 'lg:row-start-2 lg:row-end-4 lg:col-start-2',
    },
    {
      count: '3',
      header: 'Виконання замовлення',
      desc: 'Після прийняття замовлення, виконуйте його з відповідальністю та уважності до деталей',
      gridMarkup: 'lg:row-start-3 lg:row-end-5',
    },
    {
      count: '4',
      header: 'Отримання оплати',
      desc: 'Після успішного виконання замовлення, оплата буде здійснена відповідно до обговорених умов',
      gridMarkup: 'lg:row-start-4 lg:row-end-6 lg:col-start-2',
    },
    {
      count: '5',
      header: 'Комунікація та підтримка',
      desc: 'Забезпечуйте відкриту комунікацію з клієнтами та готовність вносити зміни, за потреби',
      gridMarkup: 'lg:row-start-5 lg:row-end-7',
    },
  ];
};

export const getRequirements = (): IRequirements[] => {
  return [
    {
      id: 1,
      title: 'Якість та терміни',
      desc: 'Ми надаємо високоякісні послуги. Виконавці повинні працювати вчасно та відповідально',
    },
    {
      id: 2,
      title: 'Фаховість',
      desc: 'Ми шукаємо фахівців з високим рівнем знань та досвідом. Вища освіта або значний досвід роботи – перевага',
    },
    {
      id: 3,
      title: 'Навички співпраці',
      desc: 'Командна робота та врахування потреб клієнтів – це ключовий аспект успішної співпраці',
    },
  ];
};

export const getAccession = (): IAccession[] => {
  return [
    {
      step: '1',
      desc: 'Відправте інформацію про ваш досвід та спеціалізацію нашому менеджеру через офіційний Telegram-бот',
    },
    {
      step: '2',
      desc: 'Наш менеджер зв`яжеться з вами для узгодження подальших інструкцій та деталей',
    },
    {
      step: '3',
      desc: 'Станьте частиною команди виконавців та допоможіть нашим клієнтам досягти цілей разом з нами',
    },
  ];
};
