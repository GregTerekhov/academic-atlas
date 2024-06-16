import { PositionInLayout } from 'types';

import Contacts from './contacts';
import { Navigation } from './subcomponents';

export default function Menu() {
  return (
    <>
      <div className='hidden space-y-12 py-10 max-lg:block'>
        <Navigation />
        <Contacts variant={PositionInLayout.Header} />
      </div>
      <div className='hidden lg:block'>
        <Navigation isDesktop />
      </div>
    </>
  );
}
