import {
  type IBenefitsItem,
  type IOrderStep,
  type IServiceItem,
  type ISlide,
  type IPartnershipBenefits,
  type IWorkflow,
  type IRequirements,
  type IAccession,
  type IAboutUs,
  type IQuestions,
  type IHeroGrid,
  type ILegalInfoArticle,
  type IStatisticItem,
  BenefitLabel,
  IconName,
  QuestionAnswer,
  QuestionTitle,
  WorkType,
  StatisticCount,
  StatisticLabel,
} from '../types';
import { imageSettings } from './imageSettings';

export const getBenefits = (): IBenefitsItem[] => {
  return [
    {
      id: 'uniqueness-item',
      iconName: IconName.Benefits1,
      label: BenefitLabel.Uniqueness,
    },
    {
      id: 'guarantee-item',
      iconName: IconName.Benefits2,
      label: BenefitLabel.Guarantee,
    },
    {
      id: 'corrections-item',
      iconName: IconName.Benefits3,
      label: BenefitLabel.Correction,
    },
    {
      id: 'support-item',
      iconName: IconName.Benefits4,
      label: BenefitLabel.Support,
    },
  ];
};

export const getFeedbackSlides = (): ISlide[] => {
  const {
    slideMemberFirst,
    slideMemberSecond,
    slideMemberThird,
    slideMemberFourth,
    slideMemberFifth,
    slideMemberSixth,
    slideMemberSeventh,
  } = imageSettings;
  return [
    {
      id: '1',
      title: 'Анна Парфенюк',
      description:
        'Замовляла магістерську роботу по програмній інженерії. Дуже задоволена сервісом. Все зроблено на найвищому рівні',
      imageSrc: slideMemberFirst.src,
      imageAlt: slideMemberFirst.alt,
      memberRating: 5,
    },
    {
      id: '2',
      title: 'Владислав Бурківський',
      description: 'Замовляв курсову роботу по кібербезпеці, все зроблено вчасно і якісно ',
      imageSrc: slideMemberSecond.src,
      imageAlt: slideMemberSecond.alt,
      memberRating: 4,
    },
    {
      id: '3',
      title: 'Вадим Зосименко',
      description: 'Потрібна була курсова за короткий термін. Впоралися чудово! Дякую!',
      imageSrc: slideMemberThird.src,
      imageAlt: slideMemberThird.alt,
      memberRating: 5,
    },
    {
      id: '4',
      title: 'Ірина Сидорчук',
      description:
        'Замовляла магістерську роботу по психології на цьому сайті, і результат перевершив всі мої очікування! Виконавці дійсно професіонали своєї справи: робота була виконана вчасно, з урахуванням усіх моїх побажань і вимог. Рекомендую на всі 100',
      imageSrc: slideMemberFourth.src,
      imageAlt: slideMemberFourth.alt,
      memberRating: 5,
    },
    {
      id: '5',
      title: 'Володимир Шелест',
      description:
        'Дуже задоволений сервісом цього сайту! Замовляв курсову роботу з досить складною темою по філології, і команда виконавців впоралась чудово. Рекомендую всім, хто шукає якісні послуги з написання навчальних робіт',
      imageSrc: slideMemberFifth.src,
      imageAlt: slideMemberFifth.alt,
      memberRating: 5,
    },
    {
      id: '6',
      title: 'Кароліна Зубрицька',
      description: 'Сервіс просто супер! Задоволена на всі 100%',
      imageSrc: slideMemberSixth.src,
      imageAlt: slideMemberSixth.alt,
      memberRating: 5,
    },
    {
      id: '7',
      title: 'Володимир Шкварницький',
      description:
        'Дипломна робота по галузевому машинобудуванні написана бездоганно. Дуже задоволений результатом',
      imageSrc: slideMemberSeventh.src,
      imageAlt: slideMemberSeventh.alt,
      memberRating: 5,
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
  const {
    serviceFirstItem,
    serviceSecondItem,
    serviceThirdItem,
    serviceFourthItem,
    serviceFifthItem,
    serviceSixthItem,
    serviceSeventhItem,
    serviceEighthItem,
    serviceNinthItem,
  } = imageSettings;
  return [
    {
      id: 'diplomas',
      imageSrc: serviceFirstItem.src,
      imageAlt: serviceFirstItem.alt,
      serviceTitle: WorkType.Diplomas,
    },
    {
      id: 'bachelorTheses',
      imageSrc: serviceSecondItem.src,
      imageAlt: serviceSecondItem.alt,
      serviceTitle: WorkType.BachelorTheses,
    },
    {
      id: 'masterTheses',
      imageSrc: serviceThirdItem.src,
      imageAlt: serviceThirdItem.alt,
      serviceTitle: WorkType.MasterTheses,
    },
    {
      id: 'teamPapers',
      imageSrc: serviceFourthItem.src,
      imageAlt: serviceFourthItem.alt,
      serviceTitle: WorkType.TeamPapers,
    },
    {
      id: 'testPapers',
      imageSrc: serviceFifthItem.src,
      imageAlt: serviceFifthItem.alt,
      serviceTitle: WorkType.TestPapers,
    },
    {
      id: 'practicalWorks',
      imageSrc: serviceSixthItem.src,
      imageAlt: serviceSixthItem.alt,
      serviceTitle: WorkType.PracticalWorks,
    },
    {
      id: 'abstracts',
      imageSrc: serviceSeventhItem.src,
      imageAlt: serviceSeventhItem.alt,
      serviceTitle: WorkType.Abstracts,
    },
    {
      id: 'caseStudyReports',
      imageSrc: serviceEighthItem.src,
      imageAlt: serviceEighthItem.alt,
      serviceTitle: WorkType.CaseStudyReports,
    },
    {
      id: 'presentations',
      imageSrc: serviceNinthItem.src,
      imageAlt: serviceNinthItem.alt,
      serviceTitle: WorkType.Presentations,
    },
  ];
};

export const getAboutUsData = (): IAboutUs[] => {
  const { partnershipAboutUs1, partnershipAboutUs2 } = imageSettings;
  return [
    {
      id: '1',
      title: 'Хто ми?',
      description:
        'Ми - платформа, що спеціалізується на виконанні наукових робіт на замовлення. Наша мета - надавати якісні та професійні послуги нашим клієнтам, допомагаючи їм досягти успіху в їхніх навчальних цілях',
      imageSrc: partnershipAboutUs1.src,
      imageAlt: partnershipAboutUs1.alt,
    },
    {
      id: '2',
      title: 'Кого ми шукаємо?',
      description:
        'Ми запрошуємо талановитих та відповідальних виконавців, готових долучитися до нашої команди. Якщо ви експерт у вашій галузі, володієте високим рівнем професіоналізму та бажаєте працювати в команді, це місце для вас',
      imageSrc: partnershipAboutUs2.src,
      imageAlt: partnershipAboutUs2.alt,
    },
  ];
};

export const getPartnershipBenefits = (): IPartnershipBenefits[] => {
  return [
    {
      id: '1',
      title: 'Конкурентна винагорода',
      description: 'Ми пропонуємо справедливу оплату за виконану роботу',
      iconName: IconName.BenefitPartnership1,
    },
    {
      id: '2',
      title: 'Гнучкий графік',
      description: 'Обирайте час роботи, який буде для вас найзручнішим',
      iconName: IconName.BenefitPartnership2,
    },
    {
      id: '3',
      title: 'Ваш розвиток',
      description: 'Розвивайтеся та вдосконалюйте навички з проектами',
      iconName: IconName.BenefitPartnership3,
    },
  ];
};

export const getWorkflowData = (): IWorkflow[] => {
  return [
    {
      id: '1',
      title: 'Реєстрація',
      description:
        'Приєднуйтесь до нашої платформи через Telegram, заповнивши профіль з вашим досвідом та спеціалізацією',
      gridMarkup: 'lg:row-start-1 lg:row-end-3',
    },
    {
      id: '2',
      title: 'Отримання завдань',
      description:
        "Якщо замовлення відповідає вашій експертизі, наш менеджер зв'яжеться з вами для узгодження деталей",
      gridMarkup: 'lg:row-start-2 lg:row-end-4 lg:col-start-2',
    },
    {
      id: '3',
      title: 'Виконання замовлення',
      description:
        'Після прийняття замовлення виконуйте його з відповідальністю та уважністю до деталей',
      gridMarkup: 'lg:row-start-3 lg:row-end-5',
    },
    {
      id: '4',
      title: 'Отримання оплати',
      description:
        'Після успішного виконання замовлення оплата буде здійснена відповідно до обговорених умов',
      gridMarkup: 'lg:row-start-4 lg:row-end-6 lg:col-start-2',
    },
    {
      id: '5',
      title: 'Комунікація та підтримка',
      description:
        'Забезпечуйте відкриту комунікацію з клієнтами та готовність вносити зміни за потреби',
      gridMarkup: 'lg:row-start-5 lg:row-end-7',
    },
  ];
};

export const getRequirements = (): IRequirements[] => {
  return [
    {
      id: '1',
      title: 'Якість та терміни',
      description:
        'Ми надаємо високоякісні послуги. Виконавці повинні працювати вчасно та відповідально',
    },
    {
      id: '2',
      title: 'Фаховість',
      description:
        'Шукаємо фахівців з високим рівнем знань та досвідом. Вища освіта або значний досвід роботи – перевага',
    },
    {
      id: '3',
      title: 'Навички співпраці',
      description:
        'Командна робота та врахування потреб клієнтів – це ключовий аспект успішної співпраці',
    },
  ];
};

export const getAccession = (): IAccession[] => {
  return [
    {
      id: '1',
      desc: 'Відправте інформацію про ваш досвід та спеціалізацію нашому менеджеру через наш Telegram-бот',
    },
    {
      id: '2',
      desc: 'Наш менеджер зв`яжеться з вами для узгодження подальших інструкцій та деталей',
    },
    {
      id: '3',
      desc: 'Станьте частиною команди виконавців та допоможіть нашим клієнтам досягти цілей разом з нами',
    },
  ];
};

export const getFAQQuestions = (): IQuestions[] => {
  return [
    {
      id: 'Question 1',
      title: QuestionTitle.Issue1,
      answer: QuestionAnswer.Answer1,
    },
    {
      id: 'Question 2',
      title: QuestionTitle.Issue2,
      answer: QuestionAnswer.Answer2,
    },
    {
      id: 'Question 3',
      title: QuestionTitle.Issue3,
      answer: QuestionAnswer.Answer3,
    },
    {
      id: 'Question 4',
      title: QuestionTitle.Issue4,
      answer: QuestionAnswer.Answer4,
    },
    {
      id: 'Question 5',
      title: QuestionTitle.Issue5,
      answer: QuestionAnswer.Answer5,
    },
    {
      id: 'Question 6',
      title: QuestionTitle.Issue6,
      answer: QuestionAnswer.Answer6,
    },
    {
      id: 'Question 7',
      title: QuestionTitle.Issue7,
      answer: QuestionAnswer.Answer7,
    },
    {
      id: 'Question 8',
      title: QuestionTitle.Issue8,
      answer: QuestionAnswer.Answer8,
    },
    {
      id: 'Question 9',
      title: QuestionTitle.Issue9,
      answer: QuestionAnswer.Answer9,
    },
    {
      id: 'Question 10',
      title: QuestionTitle.Issue10,
      answer: QuestionAnswer.Answer10,
    },
  ];
};

export const getHeroGrid = (): IHeroGrid[] => {
  const { heroMatrixTop, heroMatrixMiddle, heroMatrixBottom } = imageSettings;
  return [
    {
      id: 'top-left',
      className:
        'overflow-hidden rounded-bl-[30px] rounded-tr-[30px] bg-whiteBase/20 lg:rounded-bl-[60px] lg:rounded-tr-[60px]',
      imageSrc: heroMatrixTop.src,
      imageAlt: heroMatrixTop.alt,
    },
    {
      id: 'top-right',
      className: 'col-start-3 rounded-t-[30px] bg-accentPrimary-darker/20 lg:rounded-t-[60px]',
    },
    {
      id: 'middle-left',
      className: 'row-start-2 rounded-ss-[50px] bg-accentPrimary/20 lg:rounded-ss-[100px]',
    },
    {
      id: 'middle-center',
      className: 'bg-whiteBase/20',
      imageSrc: heroMatrixMiddle.src,
      imageAlt: heroMatrixMiddle.alt,
    },
    {
      id: 'middle-right',
      className: 'rounded-ee-[50px] bg-accentSecondary/20 lg:rounded-ee-[100px]',
    },
    {
      id: 'bottom-left',
      className:
        'rounded-b-[30px] bg-disabled-background/10 dark:bg-whiteBase/20 lg:rounded-b-[60px]',
    },
    {
      id: 'bottom-right',
      className:
        'col-start-3 overflow-hidden rounded-bl-[30px] rounded-tr-[30px] bg-whiteBase/20  lg:rounded-bl-[60px] lg:rounded-tr-[60px]',
      imageSrc: heroMatrixBottom.src,
      imageAlt: heroMatrixBottom.alt,
    },
  ];
};

export const getLegalInfoArticles = (): ILegalInfoArticle[] => {
  return [
    {
      id: 1,
      article: 'Загальні положення',
      paragraph: {
        one: 'Дана Політика конфіденційності визначає порядок отримання, зберігання, обробки, використання та розкриття персональних даних користувачів. Персональні дані користувача ми отримуємо від користувача при оформленні замовлення за телефонами, які вказані на сайті, через Telegram-бот, або при написанні на електронну пошту. Обов’язкова для надання послуги інформація позначена спеціальним чином. Інша інформація надається Користувачем на його розсуд.',
        two: 'Конфіденційність персональних даних – це обовʼязкова умова, яку ми дотримуємося для забезпечення безпеки та захисту інформації наших користувачів.',
        three:
          'Використання користувачем сайту означає згоду з цією Політикою конфіденційності та умовами обробки персональних даних користувача.',
        four: 'У випадку незгоди з умовами Політики, користувач повинен припинити використання сайту.',
        five: 'Ця Політика застосовується тільки до сайту your-website.com. Ми не несемо відповідальності за сайти третіх осіб, на які користувач може перейти за посиланнями, доступними на нашому сайті.',
        six: 'Адміністрація сайту не перевіряє правдивість персональних даних, що надаються Користувачем сайту.',
      },
    },
    {
      id: 2,
      article: 'Персональні дані',
      paragraph: {
        one: 'Веб-сайт не збирає і не зберігає персональні дані користувачів. Персональні дані користувачів, такі як ім’я, прізвище, контактний телефон, адреса електронної пошти тощо, отримані в Telegram, використовуються виключно для виконання замовлення і не зберігаються на веб-сайті.',
        two: 'Інша інформація може бути надана користувачем на його розсуд.',
        three: 'Веб-сайт не збирає IP-адреси користувачів.',
      },
    },
    {
      id: 3,
      article: 'Цілі збору і обробки персональних даних користувачів',
      paragraph: {
        one: 'Інформація, введена Користувачем у Telegram-боті, використовується для зв’язку з користувачем і передачі замовлення менеджеру. Дані користувачів використовуються виключно для виконання замовлення.',
        two: 'Обробка персональних даних Користувача здійснюється без обмеження терміну, будь-яким законним способом.',
      },
    },
    {
      id: 4,
      article: 'Умови передачі персональних даних третім особам',
      paragraph: {
        one: 'Ми не передаємо персональні дані Користувача третім особам крім випадків визначених законодавством України.',
        two: 'Передача інформації про користувача третім особам можлива виключно з метою виконання замовлення користувача. Зокрема, користувач погоджується з тим, що менеджер має право передавати персональні дані кур’єрським службам, організаціям поштового зв’язку, операторам зв’язку, виключно з метою виконання замовлення користувача, включаючи доставку товару.',
        three:
          'У разі втрати або розголошення персональних даних, ми інформуємо користувача про втрату або розголошення таких даних.',
        four: 'Ми приймаємо необхідні організаційні та технічні заходи для захисту інформації користувача від неправомірного або випадкового доступу, знищення, перекручення, блокування, копіювання, поширення, а також від інших неправомірних дій третіх осіб.',
      },
    },
    {
      id: 5,
      article: 'Зміна користувачем персональної інформації',
      paragraph: {
        one: 'Користувач може змінити або видалити надану ним персональну інформацію, звернувшись до нашого менеджера за допомогою контактних даних, зазначених на сайті або в Telegram-боті.',
      },
    },
    {
      id: 6,
      article: 'Зміна Політики конфіденційності',
      paragraph: {
        one: 'Ми маємо право змінити умови Політики конфіденційності. У такому випадку ми оновимо версію документа на сторінці «Політика конфіденційності». Будь ласка, періодично переглядайте ці умови, щоб бути поінформованими про те, як ми захищаємо інформацію наших користувачів.',
      },
    },
    {
      id: 7,
      article: 'Зворотний зв’язок. Питання та пропозиції',
      paragraph: {
        one: 'Всі пропозиції або питання щодо цієї Політики слід повідомляти до нашої служби підтримки користувачів за електронною поштою AcademicAtlas@ukr.net.',
      },
    },
  ];
};

export const getDesktopStatistics = (): IStatisticItem[] => {
  return [
    { id: '1', count: StatisticCount.Year, label: StatisticLabel.Year },
    {
      id: '2',
      count: StatisticCount.Expert,
      label: StatisticLabel.Expert,
      showOnLargeScreen: true,
    },
    { id: '3', count: StatisticCount.Service, label: StatisticLabel.Service },
    {
      id: '4',
      count: StatisticCount.Speciality,
      label: StatisticLabel.Speciality,
      showOnLargeScreen: true,
    },
    { id: '5', count: StatisticCount.Work, label: StatisticLabel.Work, hideOnSmallScreen: true },
  ];
};
