'use client';

import Link from 'next/link';

import { AriaDescription, AriaId, Paths, PrimaryButtonLabel } from 'types';
import { useActiveLink } from 'context';

import { AriaDescriptionUI } from 'ui';
import { getPrimaryButtonStyles } from 'styles';

export default function JoinButton() {
  const { handleActivateLink } = useActiveLink();
  const linkClass = getPrimaryButtonStyles();

  return (
    <div className='md:flex md:items-center md:justify-center'>
      <Link
        href={Paths.Partnership}
        className={`${linkClass} py-[17px]`}
        aria-describedby={AriaId.Performers}
        onClick={() => handleActivateLink(Paths.Partnership)}
      >
        {PrimaryButtonLabel.Accession}
      </Link>
      <AriaDescriptionUI
        id={AriaId.Performers}
        description={AriaDescription.Performers}
      />
    </div>
  );
}
