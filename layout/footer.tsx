import { Contacts, FooterMenu, Logo } from 'components';
import Container from './container';

export default function Footer() {
  return (
    <footer className='w-full bg-disabled-background'>
      <Container>
        <Logo />
        <FooterMenu />
        <Contacts />
      </Container>
    </footer>
  );
}
