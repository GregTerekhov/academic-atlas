'use client';

import { useState } from 'react';

import { type ITelegramButtonProps } from 'types';
import { getAndEncodeDataObject } from 'helpers';

import { AriaDescriptionUI } from 'ui';

import { getPrimaryButtonStyles } from 'styles';

export default function TelegramButton({
  command,
  label,
  ariaId,
  ariaDescription,
  isOnLightBackground = false,
}: ITelegramButtonProps) {
  const [href, setHref] = useState('#');

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    const base64String = getAndEncodeDataObject(command);

    if (!base64String) {
      e.preventDefault();
      return;
    }

    setHref(`https://t.me/AcademicAtlasBot?start=${base64String}`);
  };

  const linkClass = getPrimaryButtonStyles(isOnLightBackground);

  return (
    <>
      <a
        aria-describedby={ariaId}
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        onClick={handleClick}
        className={`${linkClass} py-[17px]`}
      >
        {label}
      </a>
      {ariaId && ariaDescription && (
        <AriaDescriptionUI
          id={ariaId}
          description={ariaDescription}
        />
      )}
    </>
  );
}
