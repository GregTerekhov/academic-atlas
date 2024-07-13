import { ExecutionTime, ExpertiseArea, WorkType } from '../types';

export interface IEncryptedData {
  command: 'order' | 'join';
  workType?: string | undefined;
  expertiseArea?: string | undefined;
  executionTime?: string | undefined;
  uniqueness?: number | undefined;
}

//DATA GATHERING FUNCTION GROUP
export const getWorkTypeKeys = (val: WorkType): string | undefined =>
  Object.keys(WorkType).find((key) => WorkType[key as keyof typeof WorkType] === val);

export const getExpertiseAreaKeys = (val: ExpertiseArea): string | undefined =>
  Object.keys(ExpertiseArea).find((key) => {
    if (key === 'Default') {
      return undefined;
    }
    return ExpertiseArea[key as keyof typeof ExpertiseArea] === val;
  });

export const getExecutionTimeKeys = (val: ExecutionTime): string | undefined =>
  Object.keys(ExecutionTime).find((key) => {
    if (key === 'Default') {
      return undefined;
    }
    return ExecutionTime[key as keyof typeof ExecutionTime] === val;
  });

//GENERATE UNIVERSAL DATA OBJECT
export const createServiceObject = (objectData: IEncryptedData | undefined) => {
  if (objectData) {
    const { command, workType, expertiseArea, executionTime, uniqueness } = objectData;

    //Три варианта объекта: если есть только workType, если есть workType и либо executionTime, либо expertiseArea, если только одна команда. uniqueness как условие отсутствует ввиду "не до конца кореектного понимая точной работы параметра uniqueness"
    if (workType && !executionTime && !expertiseArea) {
      return { command, workType };
    } else if (workType && (executionTime || expertiseArea)) {
      return { command, workType, expertiseArea, executionTime, uniqueness };
    } else {
      return { command };
    }
  }
  return;
};

//ENCODE UNIVERSAL DATA OBJECT
export const encodeTelegramData = (telegramData: IEncryptedData | undefined) => {
  if (telegramData) {
    const dataToString = JSON.stringify(telegramData);
    //encodeURIComponent временно убран из функции, до более точных тестов с бека. При первых тестах зашифрованные данные с base64String через encodeURIComponent приходили некоректными, и телеграмм-бот не мог их дешифровать
    const base64String = btoa(dataToString);
    return base64String;
  }
  return;
};
