'use client';

import { useCallback, useRef } from 'react';

import { getAdaptedLinks } from 'data';

export const useInitialiseSection = (isDesktop: boolean) => {
  const sections = useRef<{ id: string; path: string }[]>([]);
  const sectionRefs = useRef<Element[]>([]);

  const initialiseSections = useCallback(() => {
    const nodeList = document.querySelectorAll('section[id]');
    sectionRefs.current = Array.from(nodeList);

    const adaptedLinks = getAdaptedLinks(isDesktop);
    sections.current = adaptedLinks.map(({ path, id }) => {
      return { id: id ?? '', path };
    });
  }, [isDesktop]);

  return { sections, sectionRefs, initialiseSections };
};
