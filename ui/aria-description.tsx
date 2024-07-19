interface IAriaDescription {
  description: string;
  id: string;
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
