import {
  ExecutionTime,
  ExpertiseArea,
  type IEncryptedData,
  keyAbbreviations,
  TelegramScenario,
  valueAbbreviations,
  WorkType,
} from '../types';

const getKeyByValue = <T extends { [key: string]: string }>(
  enumObject: T,
  value: T[keyof T],
): string | undefined => {
  return Object.keys(enumObject).find((key) => enumObject[key as keyof T] === value);
};

const createServiceObject = (data: IEncryptedData): IEncryptedData => {
  const { uniqueness, workType, executionTime, expertiseArea, command } = data;

  return {
    command,
    ...(workType && { workType }),
    ...(expertiseArea && { expertiseArea }),
    ...(executionTime && { executionTime }),
    ...(uniqueness && { uniqueness }),
  };
};

const encodeData = (data: IEncryptedData | Record<string, string>): string => {
  const encDataString = JSON.stringify(data);
  return btoa(encDataString);
};

const handleSimpleScenario = (
  command: TelegramScenario,
  workType: WorkType,
): string | undefined => {
  const workTypeKey = getKeyByValue(WorkType, workType);

  if (!workTypeKey) {
    console.error(`Invalid service title: ${workType}`);
    return;
  }

  const dataToBot = createServiceObject({ command, workType: workTypeKey });

  return encodeData(dataToBot);
};

const abbreviate = (entry: string): string =>
  entry
    .split(' ')
    .map((word) => word.slice(0, 3).toLocaleLowerCase())
    .join('');

export const abbreviateObjectKeysAndValues = (data: IEncryptedData): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(data).flatMap(([key, value]) => {
      if (key === undefined || value === null) {
        return [];
      }

      const abbreviatedKey = keyAbbreviations[key as keyof IEncryptedData];
      const abbreviatedValue =
        valueAbbreviations[value as keyof typeof valueAbbreviations] ?? abbreviate(String(value));

      return [[abbreviatedKey, abbreviatedValue]];
    }),
  );
};

const handleComplexScenario = (
  command: TelegramScenario,
  workType: WorkType,
  expertiseArea: ExpertiseArea,
  executionTime: ExecutionTime,
  uniqueness: string,
): string | undefined => {
  const workTypeKey = getKeyByValue(WorkType, workType);
  const expertiseAreaKey = getKeyByValue(ExpertiseArea, expertiseArea);
  const executionTimeKey = getKeyByValue(ExecutionTime, executionTime);

  if (!workTypeKey || !expertiseAreaKey || !executionTimeKey) {
    console.error('Invalid value');
    return;
  }

  const dataToBot = createServiceObject({
    command,
    workType: workTypeKey,
    expertiseArea: expertiseAreaKey,
    executionTime: executionTimeKey,
    uniqueness,
  });

  const abbreviatedObject = abbreviateObjectKeysAndValues(dataToBot);

  return encodeData(abbreviatedObject);
};

const handleDefaultScenario = (command: TelegramScenario): string => {
  const dataToBot = createServiceObject({ command });

  return encodeData(dataToBot);
};

export const getAndEncodeDataObject = (
  command: TelegramScenario,
  workType?: WorkType,
  expertiseArea?: ExpertiseArea,
  executionTime?: ExecutionTime,
  uniqueness?: string,
) => {
  if (workType && !uniqueness) {
    return handleSimpleScenario(command, workType);
  } else if (uniqueness && workType && expertiseArea && executionTime) {
    return handleComplexScenario(command, workType, expertiseArea, executionTime, uniqueness);
  } else {
    return handleDefaultScenario(command);
  }
};
