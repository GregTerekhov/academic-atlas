import { PositionInLayout } from 'types';

import { Contacts, Logo, Menu, ThemeSwitcher, ToggleMenuTrigger } from 'components';
import Container from './container';

export default function Header() {
  return (
    <header className='header bg-whiteBase dark:bg-background-gradient'>
      <Container>
        <div className='flex items-center justify-between'>
          <Logo position={PositionInLayout.Header} />
          <div className='hidden lg:flex lg:gap-x-1'>
            <Menu />
            <ThemeSwitcher />
            <Contacts variant={PositionInLayout.Header} />
          </div>
          <div className='hidden items-center gap-x-8 max-lg:flex'>
            <ThemeSwitcher />
            <ToggleMenuTrigger />
          </div>
        </div>
      </Container>
    </header>
  );
}

