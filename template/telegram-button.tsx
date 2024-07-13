'use client';

import { PrimaryButtonLabel } from 'types';
import { getAndEncodeDataObject } from 'helpers';

import { PrimaryButtonUI } from 'ui';

interface ITelegramButtonProps {
  command: 'order' | 'join';
  label: PrimaryButtonLabel;
}

export default function TelegramButton({ command, label }: ITelegramButtonProps) {
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    const base64String = getAndEncodeDataObject(command);

    if (!base64String) {
      e.preventDefault();
      return;
    }

    e.currentTarget.href = `https://t.me/AcademicAtlasBot?start=${base64String}`;
  };
  return (
    <PrimaryButtonUI>
      <a
        href='#'
        target='_blank'
        rel='noopener noreferrer'
        onClick={handleClick}
        className='flex h-full w-full items-center justify-center'
      >
        {label}
      </a>
    </PrimaryButtonUI>
  );
}
