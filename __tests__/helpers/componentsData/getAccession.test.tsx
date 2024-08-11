import { getAccession } from 'data';

describe('getAccession', () => {
  it('should return an array of accession steps with the correct structure', () => {
    const accession = getAccession();

    expect(accession).toBeDefined();
    expect(Array.isArray(accession)).toBe(true);
    expect(accession).toHaveLength(3);

    accession.forEach((item) => {
      expect(item).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          desc: expect.any(String),
        }),
      );
    });
  });
});
