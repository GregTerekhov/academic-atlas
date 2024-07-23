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
  CompanyContacts,
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
        'Приєднуйтесь до нашої платформи в Telegram і заповніть форму з вказанням вашого досвіду та спеціалізації',
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

export const getPolicyArticles = (): ILegalInfoArticle[] => {
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
        four: 'Дані, такі як імʼя та прізвище, збираються і використовуються виключно для публікації відгуків користувачів на нашому веб-сайті.',
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
        one: `Всі пропозиції або питання щодо цієї Політики слід повідомляти до нашої служби підтримки користувачів за електронною поштою ${CompanyContacts.Email}.`,
      },
    },
  ];
};

export const getOfferArticles = (): ILegalInfoArticle[] => {
  return [
    {
      id: 1,
      article: 'Загальні положення',
      paragraph: {
        one: 'Цей договір є офіційною та публічною пропозицією Продавця укласти договір купівлі-продажу Товару, представленого на сайті AcademicAtlas.com.ua (далі – «Інтернет-сайт»). Даний договір є публічним, тобто відповідно до статті 633 Цивільного кодексу України, його умови є однаковими для всіх покупців без надання переваги одному покупцю перед іншим. Шляхом укладення цього Договору Покупець в повному обсязі приймає умови та порядок оформлення замовлення, оплати товару, доставки товару, повернення товару, відповідальності за недобросовісне замовлення та усі інші умови договору. Договір вважається укладеним з моменту внесення авансового платежу і отримання Покупцем від Продавця підтвердження замовлення в електронному вигляді.',
        two: 'Згідно зі статтею 642 Цивільного Кодексу України повним і беззастережним прийняттям умов даної пропозиції (оферти), що підтверджує укладення Договору купівлі-продажу товарів на запропонованих нижче умовах, є факт оформлення та підтвердження замовлення.',
        three:
          'Оформленням Замовлення Покупець підтверджує узгодження і безумовне прийняття ним умов цієї пропозиції (оферти).',
        four: {
          title:
            'Укладаючи Договір (тобто акцептуючи умови справжнього Пропозиції (Пропоновані можливості) шляхом оформлення Замовлення), Покупець підтверджує наступне:',
          subItems: [
            {
              id: 'first-article-01',
              textField:
                'Покупець цілком і повністю ознайомлений, і згоден з умовами цієї пропозиції (оферти);',
            },
            {
              id: 'first-article-02',
              textField:
                'Він дає дозвіл на збір, обробку та передачу персональних даних на умовах, визначених нижче в Застереженні щодо збору, обробки та передачі персональних даних. Дозвіл на обробку персональних даних діє протягом усього терміну дії Договору, а також протягом необмеженого терміну після закінчення його дії. Крім цього, укладенням Договору Покупець підтверджує, що він повідомлений (без додаткового повідомлення) про права, встановлені Законом України "Про захист персональних даних", про цілі збору даних, а також про те, що його персональні дані передаються Продавцю з метою можливості виконання умов цього Договору, можливості проведення взаєморозрахунків, а також для отримання рахунків, актів та інших документів. Покупець також погоджується з тим, що Продавець має право надавати доступ та передавати його персональні дані третім особам без будь-яких додаткових повідомлень Покупця, не змінюючи при цьому мету обробки персональних даних. Обсяг прав Продавця, як суб`єкта персональних даних, відповідно до Закону України "Про захист персональних даних" йому відомий і зрозумілий.',
            },
          ],
        },
      },
    },
    {
      id: 2,
      article: 'Поняття і визначення',
      paragraph: {
        one: 'Публічна оферта (далі – «Оферта») - публічна пропозиція Продавця, адресована невизначеному колу осіб, укласти з Продавцем договір купівлі-продажу товару дистанційним способом (далі – «Договір») на умовах, що містяться в цій Оферті.',
        two: 'Товар або Послуга – об`єкт угоди сторін, який був обраний Покупцем та замовлений у Продавця дистанційним способом.',
        three:
          'Продавець – інтернет-магазин за адресою https://AcademicAtlas.com.ua створений для укладення угоди на підставі ознайомлення Покупця із запропонованим Продавцем описом Товару за допомогою мережі Інтернет.',
        four: 'Покупець – дієздатна фізична особа, яка досягла 18 років, отримує інформацію від Продавця, розміщує замовлення щодо купівлі товару, що представлений на сайті Інтернет-магазину для цілей, що не повʼязані зі здійсненням підприємницької діяльності.',
        five: 'Замовлення – вибір окремих позицій з переліку товарів, зазначених Покупцем при розміщенні замовлення і проведенні оплати.',
      },
    },
    {
      id: 3,
      article: 'Предмет договору',
      paragraph: {
        one: 'Компанія надає Замовнику послуги з пошуку джерел і матеріалів під точковий пошуковий запит, допомагає правильно структурувати і оформити цю інформацію (далі – «Послуги»).',
        two: 'Компанія не надає жодних освітніх послуг і не продає жодних документів.',
      },
    },
    {
      id: 4,
      article: 'Порядок оформлення замовлення',
      paragraph: {
        one: 'Покупець самостійно оформлює замовлення електронною поштою, у мессенджері Telegram або за номером телефону, вказаним в розділі контактів Інтернет-магазину.',
        two: ' Продавець має право відмовитися від передання замовлення Покупцеві у випадку, якщо відомості, вказані Покупцем під час оформлення замовлення, є неповними або викликають підозру щодо їх дійсності.',
        three: {
          title:
            'При оформленні замовлення на сайті Інтернет-магазину Покупець зобов`язується надати наступну обов’язкову інформацію, необхідну Продавцю для виконання замовлення:',
          subItems: [
            { id: 'fourth-article-01', textField: 'прізвище, ім`я Покупця;' },
            { id: 'fourth-article-02', textField: 'номер телефону або Telegram-нік;' },
            { id: 'fourth-article-03', textField: 'вид товару;' },
            { id: 'fourth-article-04', textField: 'тема проекту.' },
          ],
        },
        four: 'Якщо будь-якій із Сторін договору необхідна додаткова інформація, вона має право запросити її у іншої Сторони. У разі ненадання необхідної інформації Покупцем, Продавець не несе відповідальності за надання якісної послуги Покупцю при покупці товару в Інтернет-магазині.',
      },
    },
    {
      id: 5,
      article: 'Порядок оплати замовлення',
      paragraph: {
        one: 'Вартість Послуг визначається на основі тарифів, встановлених в Компанії, і може бути змінена Компанією в односторонньому порядку.',
        two: 'Оплата послуги здійснюється шляхом внесення авансового платежу в розмірі 50% від вартості послуги перед початком її виконання. Якщо вартість послуги складає менше 2500 грн, оплата здійснюється у повному обсязі перед початком виконання послуги.',
        three:
          'Повернення авансового платежу можливе протягом 12 годин після його внесення за вирахуванням 300 грн сервіс-збору.',
        four: 'Повернення авансового платежу відбувається протягом 48 годин з моменту надання клієнтом платіжних відомостей для повернення.',
        five: 'Повернення 30% від вартості Послуги можливе у разі неможливості виконати доопрацювання, яке у письмовому вигляді Покупець отримав від викладача.',
        six: 'Замовник втрачає право на повернення авансового платежу після початку виконання замовлення та готовності його хоча б на одну третину.',
        seven:
          'Відправка виконаного замовлення здійснюється тільки після повної сплати його вартості, погодженої перед початком виконання.',
      },
    },
    {
      id: 6,
      article: 'Права та обовʼязки сторін',
      paragraph: {
        one: {
          title: 'Продавець має право:',
          subItems: [
            {
              id: 'sixth-article-01',
              textField:
                'в односторонньому порядку припинити надання послуг за цим Договором у разі порушення Покупцем умов цього договору;',
            },
            {
              id: 'sixth-article-02',
              textField:
                'змінювати умови цього Договору, а також ціни на Товари та послуги, в односторонньому порядку;',
            },
            {
              id: 'sixth-article-03',
              textField: 'відповідати Покупцю протягом 24 годин в робочий час.',
            },
          ],
        },
        two: {
          title: 'Продавець зобовʼязаний:',
          subItems: [
            {
              id: 'sixth-article-04',
              textField:
                'передати Покупцеві товар у відповідності до умов цього Договору та замовлення Покупця;',
            },
            {
              id: 'sixth-article-05',
              textField:
                'не розголошувати будь-яку приватну інформацію про Покупця і не надавати доступ до цієї інформації третім особам, за винятком випадків, передбачених законодавством та під час виконання Замовлення Покупця.',
            },
          ],
        },
        three: {
          title: 'Покупець зобовʼязаний:',
          subItems: [
            {
              id: 'sixth-article-06',
              textField: 'своєчасно оплатити та отримати замовлення на умовах цього договору;',
            },
            {
              id: 'sixth-article-07',
              textField:
                'до моменту укладення Договору ознайомитися зі змістом Договору, умовами Договору;',
            },
            {
              id: 'sixth-article-08',
              textField:
                'на виконання Продавцем своїх зобовʼязань перед Покупцем, останній повинен повідомити всі необхідні дані, що однозначно ідентифікують його як Покупця, і достатні для доставки Покупцеві замовленого Товару.',
            },
          ],
        },
        four: {
          title: 'Покупець має право:',
          subItems: [
            {
              id: 'sixth-article-09',
              textField:
                'претензії щодо якості роботи приймаються лише, якщо є письмова рецензія від наукового керівника чи викладача, який цю роботу перевіряє;',
            },
            {
              id: 'sixth-article-10',
              textField: 'відправити замовлення на доопрацювання 2 рази;',
            },
            {
              id: 'sixth-article-11',
              textField: 'вимагати від Продавця виконання умов цього Договору.',
            },
          ],
        },
      },
    },
    {
      id: 7,
      article: 'Відповідальність сторін',
      paragraph: {
        one: 'Сторони несуть відповідальність за невиконання або неналежне виконання умов цього договору в порядку, передбаченому цим договором та чинним законодавством України.',
        two: {
          title: 'Продавець не несе відповідальності за:',
          subItems: [
            {
              id: 'seventh-article-01',
              textField: 'зміну завдання на стороні Покупця;',
            },
            {
              id: 'seventh-article-02',
              textField:
                'за зміст і правдивість інформації, наданої Покупцем при оформленні замовлення;',
            },
            {
              id: 'seventh-article-03',
              textField:
                'за затримку і перебої в наданні Послуг (обробки замовлення та виконання послуг), які відбуваються з причин, що знаходяться поза сферою його контролю;',
            },
            {
              id: 'seventh-article-04',
              textField:
                'за протиправні незаконні дії, здійснені Покупцем за допомогою даного доступу до мережі Інтернет;',
            },
            {
              id: 'seventh-article-05',
              textField:
                'за передачу Покупцем своїх мережевих ідентифікаторів (IP, MAC-адреси) третім особам.',
            },
          ],
        },
        three:
          'Покупець, використовуючи наданий йому доступ до мережі Інтернет, самостійно несе відповідальність за шкоду, заподіяну його діями, особам або їх майну, юридичним особам, державі чи моральним принципам моральності.',
        four: 'Покупець несе відповідальність за розповсюдження недостовірної інформації. Якщо Покупець відмовляється її спростувати та компенсувати матеріальну та/або моральну шкоду, Продавець має право на захист своїх прав та інтересів шляхом звернення до суду',
        five: 'У разі настання обставин непереборної сили, які можуть утворитися в результаті непередбачених і виняткових за характером подій: повінь, пожежа, землетрус або інші стихійні біди, відключення електроенергії, страйки, оголошена або фактична війна і інші подібні події, сторони звільняються від виконання умов цього договору. Під обставинами непереборної сили для цілей цього договору розуміються події, що мають надзвичайний, непередбачений характер, які виключають або об`єктивно заважають виконанню цього договору, настання яких Сторони не могли передбачити і запобігти розумними засобами.',
        six: 'Сторони прикладають максимум зусиль для вирішення будь-яких розбіжностей виключно шляхом переговорів.',
      },
    },
    {
      id: 8,
      article: 'Конфіденційність і захист персональних даних',
      paragraph: {
        one: 'Надаючи свої персональні дані при оформленні Замовлення, Покупець надає Продавцеві свою добровільну згоду на обробку, використання (у тому числі і передачу) своїх персональних даних, а також вчинення інших дій, передбачених Законом України «Про захист персональних даних», без обмеження терміну дії такої згоди.',
        two: 'Продавець зобовʼязується не розголошувати отриману від Покупця інформацію. Не вважається порушенням надання Продавцем інформації контрагентам і третім особам, що діють на підставі договору з Продавцем, в тому числі і для виконання зобовʼязань перед Покупцем, а також у випадках, коли розкриття такої інформації встановлено вимогами чинного законодавства України.',
        three:
          'Покупець несе відповідальність за підтримання своїх персональних даних в актуальному стані. Продавець не несе відповідальності за неякісне виконання або невиконання своїх зобовʼязань у звʼязку з неактуальністю інформації про Покупця або невідповідністю її дійсності.',
      },
    },
    {
      id: 9,
      article: 'Інші умови',
      paragraph: {
        one: 'Інтернет-магазин залишає за собою право в односторонньому порядку вносити зміни до цього договору за умови попередньої публікації його на сайті https://AcademicAtlas.com.ua.',
        two: 'Інтернет-магазин створений для організації дистанційного способу продажу послуг через Інтернет.',
        three:
          'Покупець несе відповідальність за достовірність інформації, зазначеної при оформленні замовлення. При цьому, при здійсненні акцепту (оформленні замовлення і подальшої оплати послуги) Покупець надає Продавцю свою беззастережну згоду на збір, обробку, зберігання, використання своїх персональних даних, в розумінні Закону України «Про захист персональних даних».',
        four: 'Оплата Покупцем оформленого замовлення означає повну згоду Покупця з умовами договору публічної оферти.',
        five: 'Фактичною датою електронного угоди між сторонами є дата прийняття умов, відповідно до ст. 11 Закону України «Про електронну комерцію».',
        six: 'Інформація, яку надає Покупець, є конфіденційною. Інтернет-магазин використовує інформацію про Покупця виключно в цілях обробки замовлення.',
      },
    },
    {
      id: 10,
      article: 'Загальні положення',
      paragraph: {
        one: 'Електронний договір вважається укладеним з моменту одержання особою, яка направила пропозицію укласти такий договір, відповіді про прийняття цієї пропозиції в порядку, визначеному частиною шостою статті 11 Закону України “Про електронну комерцію”.',
        two: 'До закінчення терміну дії цей Договір може бути розірваний за взаємною згодою сторін до моменту фактичного виконання послуги, шляхом повернення грошових коштів у випадках, передбачених цим договором.',
        three:
          'Сторони мають право розірвати цей договір в односторонньому порядку у разі невиконання однією із сторін умов цього Договору та у випадках, передбачених чинним законодавством України',
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
