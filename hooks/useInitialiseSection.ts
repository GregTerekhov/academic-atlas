'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { getAdaptedLinks } from 'data';

export const useInitialiseSection = () => {
  const sections = useRef<{ id: string; path: string }[]>([]);
  const sectionRefs = useRef<Element[]>([]);
  const [isInitialised, setIsInitialised] = useState(false);

  const initialiseSections = useCallback(() => {
    
    setTimeout(() => {
      const nodeList = document.querySelectorAll('section[id]');
      console.log('nodeList: ', nodeList);

      if (nodeList.length === 0) {
        console.warn('No sections found in the DOM');
        return;
      }

      sectionRefs.current = Array.from(nodeList);
      console.log('Initialised sections:', sections.current);

      const adaptedLinks = getAdaptedLinks();
      console.log('Adapted links:', adaptedLinks);

      sections.current = adaptedLinks.map(({ path, id }) => {
        return { id: id ?? '', path };
      });

      console.log('Initialised sectionRefs:', sectionRefs.current);

      setIsInitialised(true);
    }, 500); 
  }, []);

  useEffect(() => {
    initialiseSections();
  }, [initialiseSections]);

  return { sections, sectionRefs, isInitialised, initialiseSections };
};
