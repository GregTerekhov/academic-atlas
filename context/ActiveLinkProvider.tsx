'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { Paths, type IWithChildren } from '../types';

interface IActiveLinkContext {
  activatedLink: string;
  handleActivateLink: (path: string) => void;
  clearActiveLink: () => void;
}

const ActiveLinkContext = createContext<IActiveLinkContext | undefined>(undefined);

export const ActiveLinkProvider = ({ children }: IWithChildren) => {
  const pathname = usePathname();

  const [activatedLink, setActivatedLink] = useState<string>(pathname);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0 && pathname === Paths.Main) {
        setActivatedLink(pathname as Paths);
        window.history.pushState(null, '', pathname);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  const handleActivateLink = (path: string) => {
    setActivatedLink(path);
  };

  const clearActiveLink = () => {
    setActivatedLink('');
  };

  return (
    <ActiveLinkContext.Provider
      value={{
        activatedLink,
        handleActivateLink,
        clearActiveLink,
      }}
    >
      {children}
    </ActiveLinkContext.Provider>
  );
};

export const useActiveLink = () => {
  const context = useContext(ActiveLinkContext);
  if (context === undefined) {
    throw new Error('useActiveLink must be used within a ActiveLinkProvider');
  }
  return context;
};
