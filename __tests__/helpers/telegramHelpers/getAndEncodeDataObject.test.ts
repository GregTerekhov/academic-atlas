import { getAndEncodeDataObject } from 'helpers';
import {
  ExecutionTime,
  ExpertiseArea,
  TelegramScenario,
  Uniqueness,
  WorkType,
} from 'types/calculation';

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
      workType: 'Presentations', //FIXME: change after the cyrillic data implementation
    };

    const expectedString = JSON.stringify(expectedData);
    // const expectedUrlEncodedString = encodeURIComponent(expectedString); //FIXME: change after the cyrillic data implementation
    const expectedBase64 = btoa(expectedString);
    expect(result).toBe(expectedBase64);
  });

  it('should handle complex scenario', () => {
    const result = getAndEncodeDataObject(
      TelegramScenario.Order,
      WorkType.BachelorTheses,
      ExpertiseArea.CultureAndArt,
      ExecutionTime.LongTerm,
      Uniqueness.Standard,
    );
    const expectedData = {
      command: TelegramScenario.Order,
      workType: 'BachelorTheses', //FIXME: change after the cyrillic data implementation
      expertiseArea: 'CultureAndArt', //FIXME: change after the cyrillic data implementation
      executionTime: 'LongTerm', //FIXME: change after the cyrillic data implementation
      uniqueness: Uniqueness.Standard,
    };

    const expectedString = JSON.stringify(expectedData);
    // const expectedUrlEncodedString = encodeURIComponent(expectedString); //FIXME: change after the cyrillic data implementation
    const expectedBase64 = btoa(expectedString);
    expect(result).toBe(expectedBase64);
  });

  it('should handle default scenario', () => {
    const result = getAndEncodeDataObject(TelegramScenario.Join);
    const expectedData = {
      command: TelegramScenario.Join,
    };

    const expectedString = JSON.stringify(expectedData);
    // const expectedUrlEncodedString = encodeURIComponent(expectedString); //FIXME: change after the cyrillic data implementation
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
      Uniqueness.Standard,
    );

    expect(result).toBeUndefined();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid value');
  });
});
