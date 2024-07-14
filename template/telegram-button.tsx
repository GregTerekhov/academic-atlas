'use client';

import { PrimaryButtonLabel, TelegramScenario } from 'types';
import { getAndEncodeDataObject, getPrimaryButtonStyles } from 'helpers';

interface ITelegramButtonProps {
  command: TelegramScenario;
  label: PrimaryButtonLabel;
  isOnLightBackground?: boolean;
}

export default function TelegramButton({
  command,
  label,
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
    <a
      href='#'
      target='_blank'
      rel='noopener noreferrer'
      onClick={handleClick}
      className={`${linkClass} py-[17px]`}
    >
      {label}
    </a>
  );
}
