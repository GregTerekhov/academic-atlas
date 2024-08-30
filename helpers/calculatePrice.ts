import { ExecutionTime, ExpertiseArea, WorkType } from 'types';
import {
  executionTimeMultiplier,
  expertiseMultiplier,
  findSelectedObject,
  getBasePrice,
  uniquenessMultiplier,
} from './calculationHelper';

export const calculatePrice = (
  type: WorkType,
  area: ExpertiseArea,
  time: ExecutionTime,
  uniqueness?: number,
): number => {
  const workTypeData = findSelectedObject(type);

  if (!workTypeData) {
    throw new Error('Invalid work type selected');
  }

  let basePrice = getBasePrice(type);

  basePrice *= expertiseMultiplier(area);
  basePrice *= executionTimeMultiplier(time);
  basePrice *= uniquenessMultiplier(workTypeData, uniqueness);

  return basePrice;
};
