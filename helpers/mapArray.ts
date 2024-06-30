export const mapArray = <T>(
  arrayData: T[] | undefined,
  mapFunction: (item: T) => React.ReactNode,
): React.ReactNode[] | null => {
  if (!Array.isArray(arrayData)) return null;

  return arrayData.map(mapFunction);
};
