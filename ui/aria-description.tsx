import { AriaDescription, AriaId } from 'types';

interface IAriaDescription {
  description?: AriaDescription | undefined; //FIXME: --- remove the optionality and undefined type
  id?: AriaId | undefined; //FIXME: --- remove the optionality and undefined type
}

export default function AriaDescriptionText({ description, id }: IAriaDescription) {
  return (
    <span
      className='sr-only'
      id={id}
    >
      {description}
    </span>
  );
}
