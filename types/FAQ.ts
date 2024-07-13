import { IBaseId } from './components';

export enum QuestionTitle {
  Issue1 = 'Чому варто замовляти роботи у нас?',
  Issue2 = 'Як можна замовити роботу у нас?',
  Issue3 = 'Як вибрати тему для моєї роботи?',
  Issue4 = 'Чи можна погодити план роботи перед виконанням?',
  Issue5 = 'Чи гарантуєте ви унікальність та приватність моєї роботи?',
  Issue6 = 'Як дізнатись вартість?',
  Issue7 = 'Як швидко ви можете виконати роботу?',
  Issue8 = 'Чи входять доопрацювання у вартість?',
  Issue9 = 'Чи можна надати матеріали та рекомендації від наукового керівника?',
  Issue10 = 'Як отримати замовлення?',
}

export enum QuestionAnswer {
  Answer1 = 'Наша команда має багаторічний досвід у написанні наукових робіт, ми гарантуємо високу якість, індивідуальний підхід та дотримання усіх вимог та термінів.',
  Answer2 = 'Перейдіть в наш Telegram-бот, надайте інформацію щодо вашого замовлення, методичні рекомендації або вимоги до виконання. Після цього менеджер звяжеться з вами. Вам необхідно внести передоплату у розмірі 50% від загальної вартості. Одразу після отримання передоплати закріплений за вами автор розпочинає виконання.',
  Answer3 = 'Ви можете надати конкретну тему, яку бажаєте досліджувати, або обрати з переліку тем, які ми можемо запропонувати відповідно до вашої спеціалізації та інтересів.',
  Answer4 = 'Так, якщо у вас є затверджений план, ви можете його надати. Якщо ні, ми розробимо план після замовлення і подамо його для погодження з вашим науковим керівником.',
  Answer5 = 'Так, ми гарантуємо повну унікальність кожної роботи та дотримуємося строгих правил конфіденційності, не розголошуючи інформацію про наших клієнтів.',
  Answer6 = 'Для того, щоб дізнатись приблизну вартість замовлення – заповніть форму Розрахунку вартості на головній сторінці або для того щоб дізнатися точну вартість перейдіть в телеграм і надайте більш повну інформацію, завантажте методичні рекомендації. Менеджер опрацює Ваш запит, узгодить всі деталі замовлення та призначить вартість.',
  Answer7 = 'Стандартний термін написання магістерської, дипломної та бакалаврської роботи у нас складає 14 днів. Проте, якщо у вас обмежений час, ми можемо запропонувати оперативний варіант - завершення роботи протягом 3 днів без втрати якості.Стандартний термін виконання курсових робіт - 5 днів. У разі термінової необхідності ми можемо завершити роботу протягом 1 дня без втрати якості.Ми завжди ставимося з розумінням до ваших термінів та готові адаптуватися під ваші потреби, щоб забезпечити своєчасне виконання замовлення.',
  Answer8 = 'Якщо будуть потрібні виправлення, що не суперечать початковим вимогам, наші фахівці виконають їх абсолютно безкоштовно. Зауваження щодо виправлень приймаються протягом 10 календарних днів з моменту отримання виконаного замовлення або в інші терміни, зазначені при його оформленні. Виконання виправлень займає від 48 годин.',
  Answer9 = 'Так, ви можете надати всі необхідні матеріали та рекомендації, що допоможе нам забезпечити точне виконання роботи.',
  Answer10 = 'По завершенню виконання – менеджер звяжеться. Після оплати залишку – відправляємо матеріали замовлення в повному обсязі на Email або в Telegram.',
}

export interface IQuestions extends IBaseId {
  title: QuestionTitle;
  answer: QuestionAnswer;
}
