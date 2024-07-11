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
  Object.keys(ExpertiseArea).find(
    (key) => ExpertiseArea[key as keyof typeof ExpertiseArea] === val,
  );

export const getExecutionTimeKeys = (val: ExecutionTime): string | undefined =>
  Object.keys(ExecutionTime).find(
    (key) => ExecutionTime[key as keyof typeof ExecutionTime] === val,
  );

//GENERATE UNIVERSAL DATA OBJECT
export const createServiceObject = (objectData: IEncryptedData | undefined) => {
  if (objectData) {
    const { command, workType, expertiseArea, executionTime, uniqueness } = objectData;

    if (uniqueness && workType && expertiseArea && executionTime) {
      return { command, workType, expertiseArea, executionTime, uniqueness };
    } else if (!expertiseArea && workType) {
      return { command, workType };
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
    const base64String = btoa(dataToString);
    return base64String;
  }
  return;
};
