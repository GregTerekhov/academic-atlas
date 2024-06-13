export enum Example {
  'Ex1',
  'Ex2',
  'Ex3',
  'Ex4',
}

export enum WorkType {
  Default = 'Оберіть тип роботи',
  Diplomas = 'Дипломні роботи',
  TeamPapers = 'Курсові роботи та проєкти',
  BachelorTheses = 'Бакалаврські та магістерські роботи',
  TestPapers = 'Контрольні роботи',
  Abstracts = 'Наукові статті та тези',
  PracticalWorks = 'Практичні та лабораторні роботи',
}

export interface IWorkType {
  typeId: string;
  option: WorkType;
}

export enum ThemeVariants {
  DARK = 'dark',
  LIGHT = 'light',
}
