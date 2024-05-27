import { MobileMenuTemplate } from 'template';

export default function Menu() {
  return (
    <>
      <MobileMenuTemplate>
        <nav>Menu</nav>
      </MobileMenuTemplate>
      <nav className='hidden lg:flex'>Menu</nav>
    </>
  );
}
