'use client';

import { useCallback, useRef } from 'react';

import { getAdaptedLinks, getFooterLinks } from 'data';

export const useInitialiseSection = () => {
  const sections = useRef<{ id: string; path: string }[]>([]);
  const sectionRefs = useRef<Element[]>([]);
  //FIXME: add new logic in test

  const initialiseSections = useCallback(async () => {
    try {
      const nodeList = document.querySelectorAll('section[id]');
      if (nodeList.length === 0) {
        throw new Error('No sections found');
      }

      sectionRefs.current = [];
      sectionRefs.current = Array.from(nodeList);

      const adaptedLinks = getAdaptedLinks();
      const footerLinks = getFooterLinks();
      const allLinks = [...adaptedLinks, ...footerLinks];

      const uniqueLinks = allLinks.reduce(
        (acc, current) => {
          if (current !== undefined && !acc.some((link) => link.id === current.id)) {
            acc.push(current as { id: string; path: string });
          }
          return acc;
        },
        [] as { id: string; path: string }[],
      );

      sections.current = uniqueLinks.map(({ path, id }) => {
        return { id: id ?? '', path };
      });
    } catch (error) {
      console.error('Error during section initialization:', error);
      throw error;
    }
  }, []);

  return { sections, sectionRefs, initialiseSections };
};
