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
      // console.log("nodeList", nodeList);

      // const mainElement = document.querySelector('#main');
      
      if (nodeList.length === 0) {
        throw new Error('No sections found');
      }

      // sectionRefs.current = [];
      sectionRefs.current = Array.from(nodeList);

      const adaptedLinks = getAdaptedLinks();

      // const uniqueLinks = adaptedLinks.reduce(
      //   (acc, current) => {
      //     if (current !== undefined && !acc.some((link) => link.id === current.id)) {
      //       acc.push(current as { id: string; path: string });
      //     }
      //     return acc;
      //   },
      //   [] as { id: string; path: string }[],
      // );

        sections.current = adaptedLinks.map(({ path, id }) => {
          return { id: id ?? '', path };
        });

      //  console.log('sections.current', sections.current);
    } catch (error) {
      console.error('Error during section initialization:', error);
      throw error;
    }
  }, []);

  return { sections, sectionRefs, initialiseSections };
};
