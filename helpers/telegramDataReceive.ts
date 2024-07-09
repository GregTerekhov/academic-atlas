'use client';

import { useState } from 'react';
import { ExecutionTime, ExpertiseArea, WorkType } from '../types';

interface IAccumulatedData {
  workType?: string;
  expertiseArea?: string;
  executionTime?: string;
  uniqueness?: number | undefined;
}

interface IEncryptedData extends IAccumulatedData {
  command: 'order' | 'join';
}

export const encodeTelegramData = () => {
  const [telegramData, setTelegramData] = useState<IEncryptedData | null>();

  const accumulateUserData = (data?: IAccumulatedData) => {
    const getWorkTypeData = Object.entries(WorkType);
    const getExpertiseAreaData = Object.entries(ExpertiseArea);
    const getExecutionTimeData = Object.entries(ExecutionTime);

    if (data && data.hasOwnProperty('workType') && !data.hasOwnProperty('uniqueness')) {
      const workData = getWorkTypeData.find((vals) => vals[1] === data.workType);
      if (workData) {
        setTelegramData({ command: 'order', workType: workData[0] });
      }
    } else if (data && data.hasOwnProperty('workType') && data.hasOwnProperty('expertiseArea')) {
      const workData = getWorkTypeData.find((vals) => vals[1] === data.workType);
      const areaData = getExpertiseAreaData.find((vals) => vals[1] === data.expertiseArea);
      const timeData = getExecutionTimeData.find((vals) => vals[1] === data.executionTime);

      if (workData && areaData && timeData) {
        setTelegramData({
          command: 'order',
          workType: workData[0],
          expertiseArea: areaData[0],
          executionTime: timeData[0],
          uniqueness: data.uniqueness,
        });
      }
    } else {
      setTelegramData({ command: 'order' });
    }
  };

  const dataToString = JSON.stringify(telegramData);
  const base64String = btoa(dataToString);

  return { accumulateUserData, base64String };
};
