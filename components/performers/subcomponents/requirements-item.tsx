import { IconName, IconSize } from 'types';

import { SvgIconUI } from 'ui';

import { getRequirementsItemStyles, getRequirementsTitleStyles } from 'styles';

interface IRequirementsItemProps {
  key?: string;
  title: string;
  desc: string;
}

export default function RequirementsItem({ title, desc }: IRequirementsItemProps) {
  const itemClass = getRequirementsItemStyles();
  const titleClass = getRequirementsTitleStyles();
  return (
    <li className={itemClass}>
      <div className='flex items-center gap-x-2'>
        <div className='max-md:size-6'>
          <SvgIconUI
            id={IconName.Requirements}
            size={{ width: IconSize.HalfM, height: IconSize.HalfM }}
            className='fill-whiteBase dark:fill-accentSecondary md:size-8 lg:size-10'
          />
        </div>
        <h3 className={titleClass}>{title}</h3>
      </div>
      <p className='generalText'>{desc}</p>
    </li>
  );
}
