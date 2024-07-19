interface IAriaDescription {
  description?: string | undefined;
  id?: string | undefined;
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
