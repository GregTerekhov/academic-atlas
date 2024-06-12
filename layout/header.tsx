import { PositionInLayout } from 'types';

import { Contacts, Logo, Menu, ThemeSwitcher, ToggleMenuTrigger } from 'components';
import Container from './container';

export default function Header() {
  return (
    <header className='header bg-whiteBase dark:bg-background-gradient'>
      <Container>
        <div className='flex'>
          <Logo position={PositionInLayout.Header} />
          <div className='hidden lg:flex lg:gap-x-1'>
            <Menu />
            <ThemeSwitcher />
            <Contacts variant={PositionInLayout.Header} />
          </div>
          <div className='hidden gap-x-1 max-lg:flex'>
            <ThemeSwitcher />
            <ToggleMenuTrigger />
          </div>
        </div>
      </Container>
    </header>
  );
}
