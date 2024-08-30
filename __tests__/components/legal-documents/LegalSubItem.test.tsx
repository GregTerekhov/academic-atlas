import { render, screen } from '@testing-library/react';

import { type ISubItem } from 'types';
import { LegalSubItem } from 'components/legal-documents/subcomponents';

describe('LegalSubItem Component', () => {
  const mockSubItems: ISubItem[] = [
    { id: '1', textField: 'Перший підпункт' },
    { id: '2', textField: 'Другий підпункт' },
    { id: '3', textField: 'Третій підпункт' },
  ];

  const itemText = 'Заголовок';

  beforeEach(() => {
    render(
      <LegalSubItem
        item={itemText}
        subItems={mockSubItems}
      />,
    );
  });

  it('renders the main item text', () => {
    expect(screen.getByText(itemText)).toBeInTheDocument();
  });

  it('renders the list of sub items', () => {
    mockSubItems.forEach((subItem) => {
      expect(screen.getByText(subItem.textField)).toBeInTheDocument();
    });
  });

  it('renders the correct number of sub items', () => {
    expect(screen.getAllByRole('listitem')).toHaveLength(mockSubItems.length);
  });
});
