import { getRequisites } from 'data';

describe('getRequisites', () => {
  it('should return an array of requisites with the correct structure', () => {
    const requisites = getRequisites();

    expect(Array.isArray(requisites)).toBe(true);
    expect(requisites).toHaveLength(4);

    expect(requisites[0]).toEqual({
      id: 'company-name',
      fieldName: 'Academic Atlas',
    });
    expect(requisites[1]).toEqual({
      id: 'address',
      fieldName: 'Адреса: вул. Трипільська 13а, Житомир, Україна',
    });
    expect(requisites[2]).toEqual({
      id: 'phone',
      fieldName: 'Телефон: +380 (63) 20-761-20',
    });
    expect(requisites[3]).toEqual({
      id: 'email',
      fieldName: 'Email: AcademicAtlas@ukr.net',
    });
  });
});
