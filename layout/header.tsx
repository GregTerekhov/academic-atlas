import { ButtonType } from 'types';

import { Contacts, Logo, Menu, ThemeSwitcher } from 'components';
import { SvgIconUI } from 'ui';
import Container from './container';

export default function Header() {
  return (
    <header className='header bg-gradient-to-br from-darkBase to-darkBase-light'>
      <Container>
        <Logo />
        <div className='hidden lg:flex lg:gap-x-1'>
          <Menu />
          <ThemeSwitcher />
          <Contacts />
        </div>
        <div className='hidden gap-x-1 max-lg:flex'>
          <ThemeSwitcher />
          <button type={ButtonType.Button}>
            <SvgIconUI />
          </button>
        </div>
      </Container>
    </header>
  );
}
