import { UrlObject } from 'url';

export enum MenuLinks {
  Main = 'Головна',
  Services = 'Наші послуги',
  Cost = 'Дізнатися вартість',
  Overview = 'Як працює сервіс',
  AboutUs = 'Про нас',
  Feedback = 'Відгуки',
  Promotions = 'Акції',
  Partnership = 'Виконавцям',
  FAQ = 'Часті запитання',
}

export enum PositionInLayout {
  Header = 'header',
  Footer = 'footer',
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

export interface ILinks {
  label: MenuLinks;
  path: UrlObject | Paths;
}
