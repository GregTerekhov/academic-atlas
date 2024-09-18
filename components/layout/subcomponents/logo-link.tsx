'use client';

import Link from 'next/link';

import { AriaDescription, AriaId, AriaLabel, IconName, IconSize, Paths } from 'types';
import { useHandleLogoClick } from 'hooks';

import { AriaDescriptionUI, SvgIconUI } from 'ui';

export default function LogoLink() {
  const handleClick = useHandleLogoClick();

  return (
    <>
      <Link
        href={Paths.Main}
        onClick={handleClick}
        className='inline-block'
        aria-describedby={AriaId.ComeHome}
      >
        <SvgIconUI
          id={IconName.Logo}
          size={{ width: IconSize.LogoSmallWidth, height: IconSize.XXL }}
          className='fill-accentPrimary-darker dark:fill-whiteBase lg:size-20'
          ariaHidden={false}
          ariaLabel={AriaLabel.Logo}
        />
      </Link>
      <AriaDescriptionUI
        id={AriaId.ComeHome}
        description={AriaDescription.ComeHome}
      />
    </>
  );
}
