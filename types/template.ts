import { AriaDescription, AriaId } from './aria';
import { TelegramScenario } from './calculation';
import { PrimaryButtonLabel } from './ui';

export interface ITelegramButtonProps {
  command: TelegramScenario;
  label: PrimaryButtonLabel;
  ariaId: AriaId;
  ariaDescription: AriaDescription;
  isOnLightBackground?: boolean;
}
