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
import { useActivateLink } from 'hooks';

import { AriaDescriptionUI, SvgIconUI } from 'ui';

interface ISvgIconProps {
  position: PositionInLayout;
}

export default function Logo({ position }: ISvgIconProps) {
  const pathname = usePathname();
  const { isNavMenuOpen, isCalcMenuOpen, closeMenu } = useMenu();
  const { handleActivateLink } = useActivateLink();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const doesNeedScroll = pathname === Paths.Main && (!isNavMenuOpen || !isCalcMenuOpen);
    const isOpenMenu = isCalcMenuOpen || isNavMenuOpen;

    if (doesNeedScroll) {
      e.preventDefault();
      window.history.pushState(null, '', '/');

      if (window.scrollY !== 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    if (isOpenMenu) {
      closeMenu();
    }
    if (pathname !== Paths.Main) {
      handleActivateLink(Paths.Main);
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
      className='fill-accentPrimary-darker dark:fill-whiteBase max-sm:size-16 sm:max-md:size-20 lg:size-28'
      ariaHidden={false}
      ariaLabel={AriaLabel.Logo}
    />
  );

  return position === PositionInLayout.Header ? renderLogoLink() : renderLogoIcon();
}
