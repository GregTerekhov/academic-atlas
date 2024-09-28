import { getRequisites } from 'data';

describe('getRequisites', () => {
  it('should return an array of requisites with the correct structure', () => {
    const requisites = getRequisites();

    expect(Array.isArray(requisites)).toBe(true);
    expect(requisites).toHaveLength(4);

    expect(requisites).toEqual([
      {
        id: 'company-name',
        fieldName: 'Academic Atlas',
      },
      {
        id: 'address',
        fieldName: 'Адреса: вул. Трипільська 13а, Житомир, Україна',
      },
      {
        id: 'phone',
        fieldName: 'Телефон: +380 (63) 20-761-20',
      },
      {
        id: 'email',
        fieldName: 'Email: AcademicAtlas@ukr.net',
      },
    ]);
  });
});
