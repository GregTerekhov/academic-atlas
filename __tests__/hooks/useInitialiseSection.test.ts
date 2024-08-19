import { renderHook } from '@testing-library/react';

import { getAdaptedLinks } from 'data';
import { useInitialiseSection } from 'hooks';

jest.mock('data', () => ({
  getAdaptedLinks: jest.fn(),
}));

describe('useInitialiseSection hook', () => {
  const mockGetAdaptedLinks = getAdaptedLinks as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('should initialise sections correctly', () => {
    const mockLinks = [
      { id: 'services', path: '/#services' },
      { id: 'about-us', path: '/#about-us' },
    ];

    mockGetAdaptedLinks.mockReturnValue(mockLinks);

    document.body.innerHTML = `
    <section id='services'></section>
    <section id='about-us'></section>
    `;

    const { result } = renderHook(() => useInitialiseSection());

    expect(result.current.sections.current).toEqual(mockLinks);
    expect(result.current.sectionRefs.current).toHaveLength(2);
    expect(result.current.sectionRefs.current[0]?.id).toBe('services');
    expect(result.current.sectionRefs.current[1]?.id).toBe('about-us');
    expect(result.current.isInitialised).toBe(true);
  });

  it('should call initialiseSections on mount', () => {
    mockGetAdaptedLinks.mockReturnValue([]);

    const { result } = renderHook(() => useInitialiseSection());

    expect(result.current.isInitialised).toBe(true);
    expect(result.current.sections.current).toEqual([]);
    expect(result.current.sectionRefs.current).toHaveLength(0);
  });

  it('should set isInitialised to true after initialisation', () => {
    mockGetAdaptedLinks.mockReturnValue([]);

    const { result } = renderHook(() => useInitialiseSection());

    expect(result.current.isInitialised).toBe(true);
  });

  it('should handle cases where id is null or undefined', () => {
    const mockLinks = [
      { id: null, path: '/#services' },
      { id: undefined, path: '/#about-us' },
    ];

    mockGetAdaptedLinks.mockReturnValue(mockLinks);

    const expectedSections = [
      { id: '', path: '/#services' },
      { id: '', path: '/#about-us' },
    ];

    const { result } = renderHook(() => useInitialiseSection());

    expect(result.current.sections.current).toEqual(expectedSections);
    expect(result.current.isInitialised).toBe(true);
  });
});
