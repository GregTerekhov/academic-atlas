import { PositionInLayout } from 'types';

import Contacts from './contacts';
import { Navigation } from './subcomponents';

export default function Menu() {
  return (
    <>
      <div className='mx-auto hidden space-y-12 max-lg:block max-md:max-w-fit md:max-lg:pl-[120px]'>
        <Navigation />
        <Contacts variant={PositionInLayout.Header} />
      </div>
      <div className='hidden lg:block'>
        <Navigation isDesktop />
      </div>
    </>
  );
}
