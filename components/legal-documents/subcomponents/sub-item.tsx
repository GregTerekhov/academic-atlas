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
      <ol>
        {mapArray(subItems, ({ id, textField }) => (
          <li key={id}>{textField}</li>
        ))}
      </ol>
    </>
  );
}
