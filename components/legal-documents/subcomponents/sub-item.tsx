import { SubItem } from 'types';
import { mapArray } from 'helpers';

interface ISubItemProps {
  item: string;
  subItems: SubItem[];
}

export default function LegalSubItem({ item, subItems }: ISubItemProps) {
  return (
    <>
      {item}
      <ol className='list-disc'>
        {mapArray(subItems, ({ id, textField }) => (
          <li key={id}>{textField}</li>
        ))}
      </ol>
    </>
  );
}
