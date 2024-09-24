import { act, renderHook } from '@testing-library/react';

import { getAdaptedLinks } from 'data';
import { useInitialiseSection } from 'hooks';

jest.mock('data', () => ({
  getAdaptedLinks: jest.fn(),
}));

describe('useInitialiseSection hook', () => {
  const mockGetAdaptedLinks = getAdaptedLinks as jest.Mock;

  type Section = {
    id: string;
    path: string;
  };

  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  const runHookAndAssert = async (
    sectionsFromProps: Element[],
    areSectionsReady: boolean,
    expectedSections: Section[],
  ) => {
    const { result } = renderHook(() => useInitialiseSection(sectionsFromProps, areSectionsReady));
    await act(async () => {
      result.current.initialiseSections();
    });

    expect(result.current.sections.current).toEqual(expectedSections);
  };

  // eslint-disable-next-line jest/expect-expect
  it('should initialise sections correctly', async () => {
    const mockLinks = [
      { id: 'services', path: '/#services' },
      { id: 'about-us', path: '/#about-us' },
    ];

    const sectionsFromProps = [
      document.createElement('section'),
      document.createElement('section'),
    ];

    sectionsFromProps[0].id = 'services';
    sectionsFromProps[1].id = 'about-us';

    mockGetAdaptedLinks.mockReturnValue(mockLinks);

    await runHookAndAssert(sectionsFromProps, true, mockLinks);
  });

  // eslint-disable-next-line jest/expect-expect
  it('should handle cases where sections are not ready', async () => {
    const sectionsFromProps: Element[] = [];

    await runHookAndAssert(sectionsFromProps, false, []);
  });

  // eslint-disable-next-line jest/expect-expect
  it('should handle cases where id is null or undefined', async () => {
    const mockLinks = [
      { id: null, path: '/#services' },
      { id: undefined, path: '/#about-us' },
    ];

    const sectionsFromProps = [
      document.createElement('section'),
      document.createElement('section'),
    ];

    sectionsFromProps[0].id = 'services';
    sectionsFromProps[1].id = 'about-us';

    mockGetAdaptedLinks.mockReturnValue(mockLinks);

    const expectedSections = [
      { id: '', path: '/#services' },
      { id: '', path: '/#about-us' },
    ];

    await runHookAndAssert(sectionsFromProps, true, expectedSections);
  });

  it('logs error when an error occurs during initialisation', async () => {
    mockGetAdaptedLinks.mockImplementation(() => {
      throw new Error('Test error');
    });

    const sectionsFromProps = [
      document.createElement('section'),
      document.createElement('section'),
    ];

    sectionsFromProps[0].id = 'services';
    sectionsFromProps[1].id = 'about-us';

    await runHookAndAssert(sectionsFromProps, true, []);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error during section initialisation:',
      expect.any(Error),
    );
  });
});
