import { PositionInLayout } from 'types';

import Contacts from './contacts';
import { Navigation } from './subcomponents';
// import { Suspense } from 'react';

export default function Menu() {
  return (
    <>
      <div className='mx-auto hidden space-y-12 max-lg:block max-md:max-w-fit md:max-lg:pl-[120px]'>
        {/* <Suspense fallback={null}> */}
        <Navigation />
        {/* </Suspense> */}
        <Contacts variant={PositionInLayout.Header} />
      </div>
      <div className='hidden lg:block'>
        <Navigation />
        {/* <Navigation isDesktop /> */}
      </div>
    </>
  );
}
