import { AriaDescription, AriaId } from 'types';

interface IAriaDescription {
  description: AriaDescription;
  id: AriaId;
}

export default function AriaDescriptionText({ description, id }: IAriaDescription) {
  return (
    <span
      className='sr-only'
      id={id}
      data-testid='aria-description-text'
    >
      {description}
    </span>
  );
}
