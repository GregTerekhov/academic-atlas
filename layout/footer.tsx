import { Logo } from 'components';
import Container from './container';

export default function Footer() {
  return (
    <footer className='bg-disabled-background w-full'>
      <Container>
        <Logo />
        <p>Footer</p>
      </Container>
    </footer>
  );
}
