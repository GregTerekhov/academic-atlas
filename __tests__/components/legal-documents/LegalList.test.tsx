import { render, screen } from '@testing-library/react';

import { ILegalInfoArticle } from 'types';
import { LegalList } from 'components';

jest.mock('components/legal-documents/subcomponents', () => ({
  LegalParagraph: jest.fn(() => <div data-testid='legal-paragraph'></div>),
  LegalSubItem: jest.fn(() => <div data-testid='legal-subitem'></div>),
  Requisites: jest.fn(() => <div data-testid='legal-requisites'></div>),
}));

describe('LegalList Component', () => {
  const mockList: ILegalInfoArticle[] = [
    {
      id: 1,
      article: 'Перша стаття',
      paragraph: {
        one: 'Перший параграф',
        two: 'Другий параграф',
      },
    },
    {
      id: 2,
      article: 'Друга стаття',
      paragraph: {
        one: 'Перший параграф',
        two: {
          title: 'Другий параграф',
          subItems: [
            {
              id: '1',
              textField: 'Перший підпункт',
            },
            {
              id: '2',
              textField: 'Другий підпункт',
            },
          ],
        },
      },
    },
    {
      id: 3,
      article: 'Реквізити Продавця',
      paragraph: {},
    },
  ];

  const substitute = 'email';

  beforeEach(() => {
    render(
      <LegalList
        list={mockList}
        substitute={substitute}
      />,
    );
  });

  it('renders the list of legal articles', () => {
    mockList.forEach((item) => {
      expect(screen.getByText(item.article)).toBeInTheDocument();
    });
  });

  it('renders LegalParagraph component for string paragraphs', () => {
    expect(screen.getAllByTestId('legal-paragraph')).toHaveLength(3);
  });

  it('renders LegalSubItem component for object paragraphs', () => {
    expect(screen.getByTestId('legal-subitem')).toBeInTheDocument();
  });

  it('renders Requisites component when article is "Реквізити Продавця"', () => {
    expect(screen.getByTestId('legal-requisites')).toBeInTheDocument();
  });
});
