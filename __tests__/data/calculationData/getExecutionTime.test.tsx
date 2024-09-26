import { getExecutionTime } from 'data';
import { ExecutionTime } from 'types';

describe('getExecutionTime', () => {
  test('should return an array of execution time with the correct structure', () => {
    const executionTime = getExecutionTime();

    expect(executionTime).toBeDefined();
    expect(Array.isArray(executionTime)).toBe(true);
    expect(executionTime).toHaveLength(3);

    executionTime.forEach((time) => {
      expect(time).toEqual(
        expect.objectContaining({
          typeId: expect.any(String),
          option: expect.any(String),
        }),
      );

      expect(Object.values(ExecutionTime)).toContain(time.option);
    });
  });
});
