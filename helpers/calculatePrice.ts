import { WorkType, ExpertiseArea, ExecutionTime } from '../types';

import { getWorkType } from './calculationData';
import {
  executionTimeMultiplier,
  expertiseMultiplier,
  uniquenessMultiplier,
} from './calculationHelper';

export const calculatePrice = (
  selectedWorkType: WorkType,
  selectedExpertiseArea: ExpertiseArea,
  selectedExecutionTime: ExecutionTime,
  customUniqueness?: number,
): number => {
  const workTypeData = getWorkType().find((workType) => workType.option === selectedWorkType);
  if (!workTypeData || !workTypeData.basePrice) {
    throw new Error('Invalid work type selected');
  }
  let basePrice = workTypeData.basePrice;

  basePrice *= expertiseMultiplier(selectedExpertiseArea);
  basePrice *= executionTimeMultiplier(selectedExecutionTime);
  basePrice *= uniquenessMultiplier(workTypeData, customUniqueness);

  return basePrice;
};
