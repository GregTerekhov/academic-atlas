import { PositionInLayout } from 'types';

import { Contacts, FooterMenu, Logo } from 'components';
import Container from './container';

export default function Footer() {
  return (
    <footer className='w-full bg-disabled-foreground/50 dark:bg-disabled-background'>
      <Container>
        <div className='flex'>
          <div>
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
      </Container>
    </footer>
  );
}
