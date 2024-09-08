'use client';

import { useCallback, useRef } from 'react';

import { getAdaptedLinks } from 'data';

export const useInitialiseSection = () => {
  const sections = useRef<{ id: string; path: string }[]>([]);
  const sectionRefs = useRef<Element[]>([]);
  //FIXME: add new logic in test

  const initialiseSections = useCallback(() => {
    try {
      const nodeList = document.querySelectorAll('section[id]');

      if (nodeList.length === 0) {
        throw new Error('No sections found');
      }

      sectionRefs.current = Array.from(nodeList);

      const adaptedLinks = getAdaptedLinks();

      sections.current = adaptedLinks.map(({ path, id }) => {
        return { id: id ?? '', path };
      });
    } catch (error) {
      console.error('Error during section initialization:', error);
      throw error;
    }
  }, []);

  return { sections, sectionRefs, initialiseSections };
};
