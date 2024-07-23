import { PositionInLayout } from 'types';

import { Contacts, FooterMenu, Logo, LegalLink } from 'components';
import Container from './container';

export default function Footer() {
  return (
    <footer className='w-full bg-disabled-background/10 pb-6 pt-16 dark:bg-disabled-background md:py-6 lg:py-12'>
      <Container>
        <div className='mb-6 flex justify-between max-md:mb-16 max-md:items-center lg:mb-8 lg:items-center'>
          <div className='grid h-full max-md:flex max-md:w-full max-md:content-evenly max-md:justify-between max-md:gap-y-[38px] md:content-between md:gap-y-4'>
            <Logo position={PositionInLayout.Footer} />
            <div className='hidden max-lg:block'>
              <Contacts variant={PositionInLayout.Footer} />
            </div>
          </div>
          <div className='max-md:hidden lg:flex'>
            <FooterMenu />
            <div className='hidden lg:block'>
              <Contacts variant={PositionInLayout.Footer} />
            </div>
          </div>
        </div>
        <LegalLink />
      </Container>
    </footer>
  );
}
