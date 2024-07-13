import { ExecutionTime, ExpertiseArea, WorkType } from '../types';

interface IEncryptedData {
  command: 'order' | 'join';
  workType?: string | WorkType;
  expertiseArea?: string | ExpertiseArea;
  executionTime?: string | ExecutionTime;
  uniqueness?: number;
}

export const getWorkTypeKey = (serviceTitle: WorkType): string | undefined => {
  return Object.keys(WorkType).find(
    (key) => WorkType[key as keyof typeof WorkType] === serviceTitle,
  );
};
export const getExpertiseAreaKey = (expertiseArea: ExpertiseArea): string | undefined => {
  return Object.keys(ExpertiseArea).find(
    (key) => ExpertiseArea[key as keyof typeof ExpertiseArea] === expertiseArea,
  );
};
export const getExecutionTimeKey = (executionTime: ExecutionTime): string | undefined => {
  return Object.keys(ExecutionTime).find(
    (key) => ExecutionTime[key as keyof typeof ExecutionTime] === executionTime,
  );
};

export const createServiceObject = (data: IEncryptedData): IEncryptedData => {
  const { uniqueness, workType, executionTime, expertiseArea, command } = data;

  if (uniqueness && expertiseArea && executionTime && workType) {
    return { command, workType, expertiseArea, executionTime, uniqueness };
  } else if (!uniqueness && workType) {
    return { command, workType };
  } else {
    return { command };
  }
};

export const encodeData = (data: IEncryptedData): string => {
  const encDataString = JSON.stringify(data);
  const urlEncodedString = encodeURIComponent(encDataString);
  return btoa(urlEncodedString);
};

export const getAndEncodeDataObject = (
  command: 'order' | 'join',
  workType?: WorkType,
  expertiseArea?: ExpertiseArea,
  executionTime?: ExecutionTime,
  uniqueness?: number,
) => {
  if (workType && !uniqueness) {
    const workTypeKey = getWorkTypeKey(workType);

    if (!workTypeKey) {
      console.error(`Invalid service title: ${workType}`);
      return;
    }

    const dataToBot = createServiceObject({ command, workType: workTypeKey });
    return encodeData(dataToBot);
  } else if (uniqueness && workType && expertiseArea && executionTime) {
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
  } else {
    const dataToBot = createServiceObject({ command });
    return encodeData(dataToBot);
  }
};
