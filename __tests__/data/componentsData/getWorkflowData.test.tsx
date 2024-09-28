import { getWorkflowData } from 'data';

describe('getWorkflowData', () => {
  it('should return an array of workflow data with the correct structure', () => {
    const workflowData = getWorkflowData();

    expect(workflowData).toBeDefined();
    expect(Array.isArray(workflowData)).toBe(true);
    expect(workflowData).toHaveLength(5);

    workflowData.forEach((item) => {
      expect(item).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          description: expect.any(String),
          gridMarkup: expect.any(String),
        }),
      );
    });
  });
});
