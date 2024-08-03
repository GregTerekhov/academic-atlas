'use client';

import { AriaDescription, AriaId, PrimaryButtonLabel, TelegramScenario } from 'types';
import { getAndEncodeDataObject } from 'helpers';

import { AriaDescriptionUI } from 'ui';

import { getPrimaryButtonStyles } from 'styles';

interface ITelegramButtonProps {
  command: TelegramScenario;
  label: PrimaryButtonLabel;
  ariaId: AriaId;
  ariaDescription: AriaDescription;
  isOnLightBackground?: boolean;
}

export default function TelegramButton({
  command,
  label,
  ariaId,
  ariaDescription,
  isOnLightBackground = false,
}: ITelegramButtonProps) {
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    const base64String = getAndEncodeDataObject(command);

    if (!base64String) {
      e.preventDefault();
      return;
    }

    e.currentTarget.href = `https://t.me/AcademicAtlasBot?start=${base64String}`;
  };

  const linkClass = getPrimaryButtonStyles(isOnLightBackground);

  return (
    <>
      <a
        aria-describedby={ariaId}
        href='#'
        target='_blank'
        rel='noopener noreferrer'
        onClick={handleClick}
        className={`${linkClass} py-[17px]`}
      >
        {label}
      </a>
      <AriaDescriptionUI
        id={ariaId}
        description={ariaDescription}
      />
    </>
  );
}
