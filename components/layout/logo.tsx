'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { PositionInLayout, IconName, IconSize, Paths } from 'types';

import { SvgIconUI } from 'ui';

interface ISvgIconProps {
  position: PositionInLayout;
}

export default function Logo({ position }: ISvgIconProps) {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === Paths.Main) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Link
      href={Paths.Main}
      onClick={handleClick}
      className='inline-block'
    >
      <SvgIconUI
        id={IconName.Logo}
        size={{ width: IconSize.LogoSmallWidth, height: IconSize.XXL }}
        className={`${
          position === PositionInLayout.Header ? `lg:size-20` : `max-md:size-20 lg:size-28`
        } max-md:mx-auto`} //FIXME: --- colour at the light theme
      />
    </Link>
  );
}
