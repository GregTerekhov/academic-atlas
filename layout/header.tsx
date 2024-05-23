import { Contacts, Logo, Menu, ThemeSwitcher } from 'components';
import Container from './container';

export default function Header() {
  return (
    <header className='header bg-gradient-to-br from-darkBase to-accentSecondary-darker'>
      <Container>
        <Logo />
        <p>Header</p>
        <div className='hidden lg:flex lg:gap-x-1'>
          <Menu />
          <ThemeSwitcher />
          <Contacts />
        </div>
      </Container>
    </header>
  );
}
