import { MobileMenuTemplate } from 'template';
import Contacts from './contacts';

export default function Menu() {
  return (
    <>
      <MobileMenuTemplate>
        <nav>Menu</nav>
        <Contacts />
      </MobileMenuTemplate>
      <nav className='hidden lg:flex'>Menu</nav>
    </>
  );
}
