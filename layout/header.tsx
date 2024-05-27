import { Contacts, Logo, Menu, ThemeSwitcher, ToggleMenuTrigger } from 'components';
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
          <ToggleMenuTrigger />
        </div>
      </Container>
    </header>
  );
}
