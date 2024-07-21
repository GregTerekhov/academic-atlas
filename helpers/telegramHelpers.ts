import { ExecutionTime, ExpertiseArea, TelegramScenario, WorkType } from '../types';

interface IEncryptedData {
  command: TelegramScenario;
  workType?: string;
  expertiseArea?: string;
  executionTime?: string;
  uniqueness?: number;
}

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

const encodeData = (data: IEncryptedData): string => {
  const encDataString = JSON.stringify(data);
  // const urlEncodedString = encodeURIComponent(encDataString); //FIXME: --- add encodeURIComponent on front and decodeURIComponent on back
  return btoa(encDataString);
};

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

const handleDefaultScenario = (command: TelegramScenario): string => {
  const dataToBot = createServiceObject({ command });
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
