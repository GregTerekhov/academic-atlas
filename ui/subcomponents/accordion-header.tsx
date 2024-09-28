'use client';

import { AriaLabel, IconName, IconSize } from 'types';

import SvgIcon from '../svg-icon';

import { getAccordionExpandIconStyles, getAccordionTitleStyles } from 'styles';

type AccordionHeaderProps = Readonly<{
  title: string;
  isOpen: boolean;
  onToggle: (e: React.MouseEvent | React.KeyboardEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  id: string;
}>;

export default function AccordionHeader({
  title,
  isOpen,
  onToggle,
  onKeyDown,
  id,
}: AccordionHeaderProps) {
  const titleClass = getAccordionTitleStyles(isOpen);
  const expandIconClass = getAccordionExpandIconStyles(isOpen);

  return (
    <div
      aria-labelledby={`accordion-header-${id}`}
      role='button'
      onClick={onToggle}
      className='group mb-2 flex w-full cursor-pointer items-center justify-between'
      tabIndex={0}
      aria-expanded={isOpen}
      aria-controls={`accordion-content-${id}`}
      onKeyDown={(e) => {
        onToggle(e);
        onKeyDown(e);
      }}
    >
      <div className='mr-4 size-9 md:mr-5 md:size-10'>
        <SvgIcon
          id={IconName.Question}
          className='mx-auto fill-accentPrimary dark:fill-accentSecondary md:size-10'
          size={{ width: IconSize.HalfL, height: IconSize.HalfL }}
        />
      </div>
      <h2
        id={`accordion-header-${id}`}
        className={titleClass}
      >
        {title}
      </h2>
      <div className='size-6 md:size-8'>
        <SvgIcon
          id={IconName.Expand}
          className={expandIconClass}
          size={{ width: IconSize.HalfM, height: IconSize.HalfM }}
          ariaLabel={isOpen ? AriaLabel.Collapse : AriaLabel.Expand}
          ariaHidden={false}
        />
      </div>
    </div>
  );
}
