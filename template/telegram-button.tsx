'use client';

import { PrimaryButtonLabel, TelegramScenario } from 'types';
import { getAndEncodeDataObject, getPrimaryButtonStyles } from 'helpers';
import { AriaDescriptionUI } from 'ui/index';

interface ITelegramButtonProps {
  command: TelegramScenario;
  label: PrimaryButtonLabel;
  ariaId?: string; //FIXME: --- remove the optionality
  ariaDescription?: string; //FIXME: --- remove the optionality
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
