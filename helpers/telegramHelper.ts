import {
  ExecutionTime,
  ExpertiseArea,
  type IEncryptedData,
  keyAbbreviations,
  TelegramScenario,
  valueAbbreviations,
  WorkType,
} from '../types';

// interface IEncryptedData {
//   command: TelegramScenario;
//   workType?: string;
//   expertiseArea?: string;
//   executionTime?: string;
//   uniqueness?: string;
// }

// type ExcludeDefault<T> = T extends 'Default' ? never : T;

const getKeyByValue = <T extends { [key: string]: string }>(
  enumObject: T,
  value: T[keyof T],
): string | undefined => {
  return Object.keys(enumObject).find((key) => enumObject[key as keyof T] === value);
};

// const getWorkTypeKey = (serviceTitle: WorkType): string | undefined => {
//   return Object.keys(WorkType).find(
//     (key) => WorkType[key as keyof typeof WorkType] === serviceTitle,
//   );
// };
// const getExpertiseAreaKey = (expertiseArea: ExpertiseArea): string | undefined => {
//   return Object.keys(ExpertiseArea).find(
//     (key) => ExpertiseArea[key as keyof typeof ExpertiseArea] === expertiseArea,
//   );
// };
// const getExecutionTimeKey = (executionTime: ExecutionTime): string | undefined => {
//   return Object.keys(ExecutionTime).find(
//     (key) => ExecutionTime[key as keyof typeof ExecutionTime] === executionTime,
//   );
// };

const createServiceObject = (data: IEncryptedData): IEncryptedData => {
  const { uniqueness, workType, executionTime, expertiseArea, command } = data;

  return {
    command,
    ...(workType && { workType }),
    ...(expertiseArea && { expertiseArea }),
    ...(executionTime && { executionTime }),
    ...(uniqueness && { uniqueness }),
  };

  // if (uniqueness && expertiseArea && executionTime && workType) {
  //   return { command, workType, expertiseArea, executionTime, uniqueness };
  // } else if (!uniqueness && workType) {
  //   return { command, workType };
  // } else {
  //   return { command };
  // }
};

const encodeData = (data: IEncryptedData | Record<string, string>): string => {
  const encDataString = JSON.stringify(data);
  // const urlEncodedString = encodeURIComponent(encDataString); //FIXME: --- add encodeURIComponent on front and decodeURIComponent on back
  return btoa(encDataString);
};

const handleSimpleScenario = (
  command: TelegramScenario,
  workType: WorkType,
): string | undefined => {
  const workTypeKey = getKeyByValue(WorkType, workType);
  // const workTypeKey = getWorkTypeKey(workType);

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

const abbreviateObjectKeysAndValues = (data: IEncryptedData): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(data).flatMap(([key, value]) => {
      if (key === undefined && value === null) {
        return [];
      }

      const abbreviatedKey = keyAbbreviations[key as keyof IEncryptedData];
      const abbreviatedValue =
        valueAbbreviations[value as keyof typeof valueAbbreviations] ?? abbreviate(String(value));
      // let abbreviatedValue;

      // if (
      //   valueAbbreviations[
      //     value as
      //       | ExcludeDefault<keyof typeof WorkType>
      //       | ExcludeDefault<keyof typeof ExpertiseArea>
      //       | ExcludeDefault<keyof typeof ExecutionTime>
      //   ]
      // ) {
      //   abbreviatedValue =
      //     valueAbbreviations[
      //       value as
      //         | ExcludeDefault<keyof typeof WorkType>
      //         | ExcludeDefault<keyof typeof ExpertiseArea>
      //         | ExcludeDefault<keyof typeof ExecutionTime>
      //     ];
      // } else {
      //   abbreviatedValue = abbreviate(String(value));
      // }
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
  // const workTypeKey = getWorkTypeKey(workType);
  // const expertiseAreaKey = getExpertiseAreaKey(expertiseArea);
  // const executionTimeKey = getExecutionTimeKey(executionTime);

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

  // console.log('dataToBot: ', dataToBot);
  // console.log('abbreviatedObject: ', abbreviatedObject);
  return encodeData(abbreviatedObject);
  // return encodeData(dataToBot);
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
