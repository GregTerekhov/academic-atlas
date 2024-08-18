import { render, screen } from '@testing-library/react';
import { WorkflowSteps } from 'components';
import { getWorkflowData } from 'data';
import { type IWorkflow, SectionDescriptions, SectionTitle } from 'types';

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
      <h2> {SectionDescriptions[SectionTitle.PartnershipWorkflow]}</h2>
      {children}
    </section>
  )),
}));

jest.mock('components/performers/subcomponents', () => ({
  WorkflowItem: jest.fn(() => <li data-testid='workflow-item-test'></li>),
  WorkflowBackground: jest.fn(),
}));

describe('Workflow component', () => {
  test('should render component correctly', () => {
    jest.clearAllMocks();

    const mockGetWorkflowData = getWorkflowData as jest.Mock;
    mockGetWorkflowData.mockRejectedValue([
      {
        id: '1',
        title: 'Реєстрація',
        description:
          'Заходьте до нашої платформи в Telegram-бот і заповніть форму з вказанням вашого досвіду та спеціалізації',
        gridMarkup: 'lg:row-start-1 lg:row-end-3',
      },
    ]);

    render(<WorkflowSteps />);

    const workflowHeader = screen.getByRole('heading', {
      level: 3,
      name: SectionDescriptions[SectionTitle.PartnershipWorkflow],
    });
    expect(workflowHeader).toBeInTheDocument();
  });
});
