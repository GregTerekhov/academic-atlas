import Link from 'next/link';

import { Paths, PositionInLayout } from 'types';

import { Contacts, FooterMenu, Logo } from 'components';
import Container from './container';

export default function Footer() {
  return (
    <footer className='w-full bg-disabled-foreground/50 py-6 dark:bg-disabled-background lg:py-12'>
      <Container>
        <div className='mb-6 flex justify-between max-md:items-center lg:mb-8 lg:items-center'>
          <div className='grid h-full max-md:content-evenly max-md:gap-y-[38px] md:content-between md:gap-y-4'>
            <Logo position={PositionInLayout.Footer} />
            <div className='hidden max-lg:block'>
              <Contacts variant={PositionInLayout.Footer} />
            </div>
          </div>
          <div className='lg:flex'>
            <FooterMenu />
            <div className='hidden lg:block'>
              <Contacts variant={PositionInLayout.Footer} />
            </div>
          </div>
        </div>
        <Link
          href={Paths.LegalInfo}
          className='mx-auto block text-center text-xs text-whiteBase hocus:text-accentSecondary md:text-sm lg:text-base'
        >
          Політіка конфіденційності та умови використання
        </Link>
      </Container>
    </footer>
  );
}
