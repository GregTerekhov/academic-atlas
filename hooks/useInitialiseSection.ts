'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { getAdaptedLinks } from 'data';

export const useInitialiseSection = () => {
  const sections = useRef<{ id: string; path: string }[]>([]);
  const sectionRefs = useRef<Element[]>([]);
  const [isInitialised, setIsInitialised] = useState(false);

  const initialiseSections = useCallback(() => {
    const nodeList = document.querySelectorAll('section[id]');
    sectionRefs.current = Array.from(nodeList);

    const adaptedLinks = getAdaptedLinks();
    sections.current = adaptedLinks.map(({ path, id }) => {
      return { id: id ?? '', path };
    });

    setIsInitialised(true);
  }, []);

  useEffect(() => {
    initialiseSections();
  }, [initialiseSections]);

  return { sections, sectionRefs, isInitialised };
};
