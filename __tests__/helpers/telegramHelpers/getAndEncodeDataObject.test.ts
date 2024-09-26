import { abbreviateObjectKeysAndValues, getAndEncodeDataObject } from 'helpers';
import {
  ExecutionTime,
  ExpertiseArea,
  type IEncryptedData,
  TelegramScenario,
  Uniqueness,
  WorkType,
} from 'types';

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('getAndEncodeDataObject', () => {
  it('should handle simple scenario', () => {
    const result = getAndEncodeDataObject(TelegramScenario.Order, WorkType.Presentations);
    const expectedData = {
      command: TelegramScenario.Order,
      workType: 'Presentations',
    };

    const expectedString = JSON.stringify(expectedData);
    const expectedBase64 = btoa(expectedString);
    expect(result).toBe(expectedBase64);
  });

  it('should handle complex scenario', () => {
    const result = getAndEncodeDataObject(
      TelegramScenario.Order,
      WorkType.BachelorTheses,
      ExpertiseArea.CultureAndArt,
      ExecutionTime.LongTerm,
      Uniqueness.Standard.toString(),
    );
    const expectedData = {
      c: 'ord',
      w: 'bt',
      a: 'ca',
      t: 'lg',
      u: Uniqueness.Standard.toString(),
    };

    const expectedString = JSON.stringify(expectedData);
    const expectedBase64 = btoa(expectedString);
    expect(result).toBe(expectedBase64);
  });

  it('should handle default scenario', () => {
    const result = getAndEncodeDataObject(TelegramScenario.Join);
    const expectedData = {
      command: TelegramScenario.Join,
    };

    const expectedString = JSON.stringify(expectedData);
    const expectedBase64 = btoa(expectedString);
    expect(result).toBe(expectedBase64);
  });

  it('should log error and return undefined for invalid workType in simple scenario', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');
    const result = getAndEncodeDataObject(TelegramScenario.Order, 'InvalidWorkType' as WorkType);
    expect(result).toBeUndefined();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid service title: InvalidWorkType');
  });

  it('should log error and return undefined for invalid values in complex scenario', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');
    const result = getAndEncodeDataObject(
      TelegramScenario.Order,
      WorkType.BachelorTheses,
      'InvalidExpertiseArea' as ExpertiseArea,
      ExecutionTime.LongTerm,
      Uniqueness.Standard.toString(),
    );

    expect(result).toBeUndefined();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid value');
  });

  it('should return an empty array when value is null', () => {
    const mockData = {
      uniqueness: null,
    };

    const result = abbreviateObjectKeysAndValues(mockData as unknown as IEncryptedData);

    expect(result).toEqual({});
  });
});
