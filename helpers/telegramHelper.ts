// import pako from 'pako'; TODO: Import the Pako library for data compression

import { ExecutionTime, ExpertiseArea, TelegramScenario, WorkType } from '../types';

interface IEncryptedData {
  command: TelegramScenario;
  workType?: string;
  expertiseArea?: string;
  executionTime?: string;
  uniqueness?: number;
}

// TODO:  The abbreviations are used to reduce the overall size of the data object, which helps in minimizing the final encoded string length.
// interface IEncryptedData {
//   c: TelegramScenario;
//   wt?: string;
//   ea?: string;
//   et?: string;
//   u?: number;
// }

const getWorkTypeKey = (serviceTitle: WorkType): string | undefined => {
  return Object.keys(WorkType).find(
    (key) => WorkType[key as keyof typeof WorkType] === serviceTitle,
  );
};
const getExpertiseAreaKey = (expertiseArea: ExpertiseArea): string | undefined => {
  return Object.keys(ExpertiseArea).find(
    (key) => ExpertiseArea[key as keyof typeof ExpertiseArea] === expertiseArea,
  );
};
const getExecutionTimeKey = (executionTime: ExecutionTime): string | undefined => {
  return Object.keys(ExecutionTime).find(
    (key) => ExecutionTime[key as keyof typeof ExecutionTime] === executionTime,
  );
};

const createServiceObject = (data: IEncryptedData): IEncryptedData => {
  const { uniqueness, workType, executionTime, expertiseArea, command } = data;

  if (uniqueness && expertiseArea && executionTime && workType) {
    return { command, workType, expertiseArea, executionTime, uniqueness };
  } else if (!uniqueness && workType) {
    return { command, workType };
  } else {
    return { command };
  }
};

//   const { u, wt, et, ea, c } = data;

//   if (u && ea && et && wt) {
//     return { c, wt, ea, et, u };
//   } else if (!u && wt) {
//     return { c, wt };
//   } else {
//     return { c };
//   }
// };

const encodeData = (data: IEncryptedData): string => {
  const encDataString = JSON.stringify(data);
  // const urlEncodedString = encodeURIComponent(encDataString); //FIXME: --- add encodeURIComponent on front and decodeURIComponent on back
  return btoa(encDataString);
};

//TODO: This function encodes the data object by first converting it to a JSON string without spaces,
// then compressing it using the Pako library with maximum compression level (level 9),
// and finally encoding the compressed data into a Base64 string.

// const encodeData = (data: IEncryptedData): string => {
//   const encDataString = JSON.stringify(data).replace(/\s+/g, '');
//   console.log('JSON String:', encDataString);
//   const compressed = pako.deflate(encDataString, { level: 9 });
//   console.log('Compressed Data:', compressed);
//   const encodedData = btoa(String.fromCharCode.apply(null, Array.from(compressed)));
//   console.log('Base64 Encoded Data:', encodedData);

//   return encodedData;
// };

const handleSimpleScenario = (
  command: TelegramScenario,
  workType: WorkType,
): string | undefined => {
  const workTypeKey = getWorkTypeKey(workType);

  if (!workTypeKey) {
    console.error(`Invalid service title: ${workType}`);
    return;
  }

  const dataToBot = createServiceObject({ command, workType: workTypeKey });
  // const dataToBot = createServiceObject({ c: command, wt: workTypeKey });
  return encodeData(dataToBot);
};

const handleComplexScenario = (
  command: TelegramScenario,
  workType: WorkType,
  expertiseArea: ExpertiseArea,
  executionTime: ExecutionTime,
  uniqueness: number,
): string | undefined => {
  const workTypeKey = getWorkTypeKey(workType);
  const expertiseAreaKey = getExpertiseAreaKey(expertiseArea);
  const executionTimeKey = getExecutionTimeKey(executionTime);

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
  return encodeData(dataToBot);
};
//   const dataToBot = createServiceObject({
//     c: command,
//     wt: workTypeKey,
//     ea: expertiseAreaKey,
//     et: executionTimeKey,
//     u: uniqueness,
//   });
//   return encodeData(dataToBot);
// };

const handleDefaultScenario = (command: TelegramScenario): string => {
  const dataToBot = createServiceObject({ command });
  // const dataToBot = createServiceObject({ c: command });
  return encodeData(dataToBot);
};

export const getAndEncodeDataObject = (
  command: TelegramScenario,
  workType?: WorkType,
  expertiseArea?: ExpertiseArea,
  executionTime?: ExecutionTime,
  uniqueness?: number,
) => {
  if (workType && !uniqueness) {
    return handleSimpleScenario(command, workType);
  } else if (uniqueness && workType && expertiseArea && executionTime) {
    return handleComplexScenario(command, workType, expertiseArea, executionTime, uniqueness);
  } else {
    return handleDefaultScenario(command);
  }
};
