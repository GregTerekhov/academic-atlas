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

describe('Workflow component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockGetWorkflowData = getWorkflowData as jest.Mock;
  mockGetWorkflowData.mockReturnValue([
    {
      id: '1',
      title: 'Реєстрація',
      description:
        'Заходьте до нашої платформи в Telegram-бот і заповніть форму з вказанням вашого досвіду та спеціалізації',
      gridMarkup: 'lg:row-start-1 lg:row-end-3',
    },
  ]);

  test('should render component correctly', () => {
    render(<WorkflowSteps />);

    const workflowHeader = screen.getByRole('heading', {
      level: 2,
      name: SectionDescriptions[SectionTitle.PartnershipWorkflow],
    });

    expect(workflowHeader).toBeInTheDocument();
    expect(workflowHeader.closest('section')).toHaveAttribute(
      'id',
      SectionTitle.PartnershipWorkflow,
    );
  });
});
