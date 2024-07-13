'use client';

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface ActiveLinkContextProps {
  activeLink: string;
  setActiveLink: (link: string) => void;
}

const ActiveLinkContext = createContext<ActiveLinkContextProps>({
  activeLink: '',
  setActiveLink: () => {},
});

export const useActiveLink = () => useContext(ActiveLinkContext);

export const ActiveLinkProvider = ({ children }: { children: ReactNode }) => {
  const [activeLink, setActiveLink] = useState<string>('');

  useEffect(() => {
    const updateActiveLink = () => {
      setActiveLink(window.location.pathname + window.location.hash);
    };

    updateActiveLink();

    const handleHashChange = () => {
      setActiveLink(window.location.pathname + window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  return (
    <ActiveLinkContext.Provider value={{ activeLink, setActiveLink }}>
      {children}
    </ActiveLinkContext.Provider>
  );
};
