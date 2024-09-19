'use client';

import { useCallback, useEffect, useRef } from 'react';

import { getAdaptedLinks } from 'data';

export const useInitialiseSection = (sectionsFromProps: Element[], areSectionsReady: boolean) => {
  const sections = useRef<{ id: string; path: string }[]>([]);
  const sectionRefs = useRef<Element[]>([]);

  const initialiseSections = useCallback(async () => {
    try {
      if (!areSectionsReady || sectionsFromProps.length < 2) {
        console.warn('No sections found');
        return;
      }

      sectionRefs.current = sectionsFromProps;

      const adaptedLinks = getAdaptedLinks();

      sections.current = adaptedLinks.map(({ path, id }) => {
        return { id: id ?? '', path };
      });
    } catch (error) {
      console.error('Error during section initialization:', error);
    }
  }, [sectionsFromProps, areSectionsReady]);

  useEffect(() => {
    if (areSectionsReady) {
      initialiseSections();
    }
  }, [areSectionsReady, initialiseSections]);

  return { sections, sectionRefs, initialiseSections };
};
