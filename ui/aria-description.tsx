interface IAriaDescription {
  description?: string | undefined; //FIXME: --- remove the optionality and undefined type
  id?: string | undefined; //FIXME: --- remove the optionality and undefined type
}

export default function AriaDescription({ description, id }: IAriaDescription) {
  return (
    <span
      className='sr-only'
      id={id}
    >
      {description}
    </span>
  );
}
