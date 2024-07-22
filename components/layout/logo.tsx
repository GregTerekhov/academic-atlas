'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  PositionInLayout,
  IconName,
  IconSize,
  Paths,
  AriaId,
  AriaDescription,
  AriaLabel,
} from 'types';
import { useMenu } from 'context';

import { AriaDescriptionUI, SvgIconUI } from 'ui';

interface ISvgIconProps {
  position: PositionInLayout;
}

export default function Logo({ position }: ISvgIconProps) {
  const pathname = usePathname();
  const { isNavMenuOpen, isCalcMenuOpen, closeMenu } = useMenu();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isScroll = pathname === Paths.Main && (!isNavMenuOpen || !isCalcMenuOpen);
    const isOpenMenuOnMainPage = isCalcMenuOpen || isNavMenuOpen;

    if (isScroll) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
    }
    if (isOpenMenuOnMainPage) {
      closeMenu();
    }
  };

  const renderLogoLink = () => (
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

  const renderLogoIcon = () => (
    <SvgIconUI
      id={IconName.Logo}
      size={{ width: IconSize.LogoSmallWidth, height: IconSize.XXL }}
      className='fill-accentPrimary-darker dark:fill-whiteBase max-md:mx-auto max-md:size-20 lg:size-28'
      ariaHidden={false}
      ariaLabel={AriaLabel.Logo}
    />
  );

  return position === PositionInLayout.Header ? renderLogoLink() : renderLogoIcon();
}
