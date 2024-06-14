import { ButtonType, IconName, IconSize } from 'types';

import { SvgIconUI } from 'ui';

export default function ScrollController() {
  return (
    <button
      type={ButtonType.Button}
      className='fixed bottom-4 right-10 z-40 hidden size-10 items-center justify-center rounded-full border border-accentPrimary bg-whiteBase/10 md:flex lg:right-20 lg:size-16'
    >
      <SvgIconUI
        id={IconName.Arrow}
        size={{ width: IconSize.HalfM, height: IconSize.HalfM }}
        className='fill-accentPrimary lg:size-9'
      />
    </button>
  );
}
