'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { PositionInLayout, IconName, IconSize, Paths } from 'types';

import { useMenu } from 'context';

import { SvgIconUI } from 'ui';

interface ISvgIconProps {
  position: PositionInLayout;
}

export default function Logo({ position }: ISvgIconProps) {
  const pathname = usePathname();
  const { isNavMenuOpen, isCalcMenuOpen, closeMenu } = useMenu();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isScroll = !isNavMenuOpen || !isCalcMenuOpen;
    const isOpenMenuOnMainPage = pathname === Paths.Main && (isCalcMenuOpen || isNavMenuOpen);

    if (isScroll) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (isOpenMenuOnMainPage) {
      closeMenu();
    }
  };

  return position === PositionInLayout.Header ? (
    <Link
      href={Paths.Main}
      onClick={handleClick}
      className='inline-block'
    >
      <SvgIconUI
        id={IconName.Logo}
        size={{ width: IconSize.LogoSmallWidth, height: IconSize.XXL }}
        className='lg:size-20' //FIXME: --- colour at the light theme
      />
    </Link>
  ) : (
    <SvgIconUI
      id={IconName.Logo}
      size={{ width: IconSize.LogoSmallWidth, height: IconSize.XXL }}
      className='max-md:mx-auto max-md:size-20 lg:size-28' //FIXME: --- colour at the light theme
    />
  );
}
