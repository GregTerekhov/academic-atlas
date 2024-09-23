'use client';

import { useCallback, useEffect, useRef } from 'react';

import { getAdaptedLinks } from 'data';

export const useInitialiseSection = (sectionsFromProps: Element[], areSectionsReady: boolean) => {
  const sections = useRef<{ id: string; path: string }[]>([]);

  const initialiseSections = useCallback(async () => {
    if (!areSectionsReady || sectionsFromProps.length < 1) return;

    try {
      const adaptedLinks = getAdaptedLinks();

      sections.current = adaptedLinks.map(({ path, id }) => {
        return { id: id ?? '', path };
      });
    } catch (error) {
      console.error('Error during section initialisation:', error);
    }
  }, [sectionsFromProps, areSectionsReady]);

  useEffect(() => {
    if (areSectionsReady) initialiseSections();
  }, [areSectionsReady, initialiseSections]);

  return { sections, initialiseSections };
};
