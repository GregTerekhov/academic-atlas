import { AriaDescription, AriaId, MenuLinks, Paths } from 'types';

import { LinkItem } from './subcomponents';

export default function LegalLink() {
  return (
    <p className='text-center text-xs md:text-sm lg:text-base'>
      <LinkItem
        href={Paths.Policy}
        ariaId={AriaId.Policy}
        ariaDescription={AriaDescription.Policy}
        linkLabel={MenuLinks.Policy}
      />
      {' та '}
      <LinkItem
        href={Paths.Offer}
        ariaId={AriaId.Offer}
        ariaDescription={AriaDescription.Offer}
        linkLabel={MenuLinks.Offer}
      />
    </p>
  );
}
