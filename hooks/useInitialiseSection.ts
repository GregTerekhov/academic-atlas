'use client';

import { useCallback, useRef } from 'react';

import { getAdaptedLinks } from 'data';

export const useInitialiseSection = () => {
  const sections = useRef<{ id: string; path: string }[]>([]);
  const sectionRefs = useRef<Element[]>([]);

  const initialiseSections = useCallback(() => {
    const initialisationTimerId = setTimeout(() => {
      const nodeList = document.querySelectorAll('section[id]');
      sectionRefs.current = Array.from(nodeList);

      const adaptedLinks = getAdaptedLinks();
      sections.current = adaptedLinks.map(({ path, id }) => {
        return { id: id ?? '', path };
      });
    }, 500);

    return () => {
      clearTimeout(initialisationTimerId);
    };
  }, []);

  return { sections, sectionRefs, initialiseSections };
};
