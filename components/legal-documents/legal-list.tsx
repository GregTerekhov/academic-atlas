import { type ILegalInfoArticle } from 'types';
import { mapArray } from 'helpers';

import { LegalParagraph, LegalSubItem } from './subcomponents';

interface ILegalList {
  list: ILegalInfoArticle[];
}

export default function LegalList({ list }: ILegalList) {
  return (
    <ol>
      {mapArray(list, ({ id, article, paragraph }) => (
        <li key={id}>
          {article}
          <ol>
            {mapArray(Object.entries(paragraph), ([key, value]) => (
              <li key={key}>
                {typeof value === 'string' ? (
                  <LegalParagraph value={value} />
                ) : (
                  <LegalSubItem
                    item={value.title}
                    subItems={value.subItems}
                  />
                )}
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
