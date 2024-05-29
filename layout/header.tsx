import { Contacts, Logo, Menu, ThemeSwitcher, ToggleMenuTrigger } from 'components';
import Container from './container';

export default function Header() {
  return (
    <header className='header bg-whiteBase dark:bg-gradient-to-br dark:from-darkBase dark:to-darkBase-light'>
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
