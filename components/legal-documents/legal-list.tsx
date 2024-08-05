import { type ILegalInfoArticle } from 'types';
import { getSubstituteProps, mapArray } from 'helpers';

import { LegalParagraph, LegalSubItem, Requisites } from './subcomponents';

interface ILegalList {
  list: ILegalInfoArticle[];
  substitute: string;
}

export default function LegalList({ list, substitute }: ILegalList) {
  return (
    <ol>
      {mapArray(list, ({ id, article, paragraph }) => (
        <li key={id}>
          {article}
          {article === 'Реквізити Продавця' && <Requisites />}
          <ol>
            {mapArray(Object.entries(paragraph), ([key, value]) => (
              <li key={key}>
                {typeof value === 'string' ? (
                  <LegalParagraph {...getSubstituteProps(value, substitute)} />
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
