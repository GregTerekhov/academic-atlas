import { getRequisites } from 'data';
import { mapArray } from 'helpers';

export default function Requisites() {
  const requisites = getRequisites();

  return (
    <>
      {mapArray(requisites, ({ id, fieldName }) => (
        <p
          key={id}
          className='italic'
        >
          {fieldName}
        </p>
      ))}
    </>
  );
}
