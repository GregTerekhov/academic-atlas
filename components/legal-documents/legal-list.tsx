import { AriaLabel, type ILegalInfoArticle } from 'types';

import { mapArray } from 'helpers';

interface ILegalList {
  list: ILegalInfoArticle[];
}

export default function LegalList({ list }: ILegalList) {
  return (
    <ol className='list-decimal'>
      {mapArray(list, ({ id, article, paragraph }) => (
        <li key={id}>
          {article}
          <ol>
            {mapArray(Object.entries(paragraph), ([key, value]) => (
              <li
                key={key}
                className='list-decimal'
              >
                {value.includes('AcademicAtlas@ukr.net') ? (
                  <>
                    {value.split('AcademicAtlas@ukr.net')[0]}
                    <a
                      aria-label={AriaLabel.Email}
                      href='mailto:AcademicAtlas@ukr.net'
                      rel='noopener nofollow noreferrer'
                    >
                      AcademicAtlas@ukr.net
                    </a>
                    {value.split('AcademicAtlas@ukr.net')[1]}
                  </>
                ) : (
                  value
                )}
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
