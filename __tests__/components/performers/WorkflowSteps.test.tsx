import { render, screen } from '@testing-library/react';

import { type IWorkflow, SectionDescriptions, SectionTitle } from 'types';
import { getWorkflowData } from 'data';
import { WorkflowSteps } from 'components';

jest.mock('data', () => ({
  getSectionProps: jest.fn(() => ({
    performersWorkflow: {
      title: SectionTitle.PartnershipWorkflow,
    },
  })),
  getWorkflowData: jest.fn(),
}));

jest.mock('template', () => ({
  MappedListTemplate: jest.fn(({ children, items }) => (
    <ul data-testid='workflow-list-test'>{items.map((item: IWorkflow) => children(item))}</ul>
  )),
  SectionTemplate: jest.fn(({ title, children }) => (
    <section id={title}>
      <h2>{SectionDescriptions[SectionTitle.PartnershipWorkflow]}</h2>
      {children}
    </section>
  )),
}));

jest.mock('components/performers/subcomponents', () => ({
  WorkflowItem: jest.fn(() => <li data-testid='workflow-item-test'></li>),
  WorkflowBackground: jest.fn(),
}));

const mockGetWorkflowData = getWorkflowData as jest.Mock;

const setup = (data: IWorkflow[] | undefined = []) => {
  mockGetWorkflowData.mockReturnValue(data);

  return render(<WorkflowSteps />);
};

describe('Workflow component', () => {
  const mockData = [
    {
      id: '1',
      title: 'Реєстрація',
      description:
        'Заходьте до нашої платформи в Telegram-бот і заповніть форму з вказанням вашого досвіду та спеціалізації',
      gridMarkup: 'lg:row-start-1 lg:row-end-3',
    },
  ];

  const invalidData = [
    { data: [], description: 'should handle empty workflow steps data gracefully' },
    { data: undefined, description: 'should handle missing workflow steps data scenario' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render component with correct props and data ', () => {
    setup(mockData);

    const workflowHeader = screen.getByRole('heading', {
      level: 2,
      name: SectionDescriptions[SectionTitle.PartnershipWorkflow],
    });

    expect(workflowHeader).toBeInTheDocument();
    expect(workflowHeader.closest('section')).toHaveAttribute(
      'id',
      SectionTitle.PartnershipWorkflow,
    );

    const listElement = screen.getByTestId('workflow-list-test');
    expect(listElement).toBeInTheDocument();

    const listItemElement = screen.getByTestId('workflow-item-test');
    expect(listItemElement).toBeInTheDocument();
  });

  it.each(invalidData)('$description', ({ data }) => {
    setup(data);

    const listElement = screen.getByTestId('workflow-list-test');
    expect(listElement).toBeEmptyDOMElement();
  });
});
