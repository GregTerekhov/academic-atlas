import { PositionInLayout } from 'types';

// import { MobileMenuTemplate } from 'template';
import Contacts from './contacts';
import Navigation from './header-navigation';
import ThemeSwitcher from './theme-switcher';

export default function Menu() {
  return (
    <>
      {/* <MobileMenuTemplate> */}
      <div className='hidden space-y-12 max-lg:block'>
        <Navigation />
        <Contacts variant={PositionInLayout.Header} />
      </div>
      {/* </MobileMenuTemplate> */}
      <div className='hidden lg:block'>
        <Navigation isDesktop />
      </div>
    </>
  );
}
