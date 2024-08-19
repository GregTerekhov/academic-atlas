import { render, screen } from '@testing-library/react';
import { WorkflowItem } from 'components/performers/subcomponents';

jest.mock('components', () => ({
  TextWithLink: jest.fn(() => <span data-testid='workflow-item-span'></span>),
}));

describe('WorkflowItem subComponent', () => {
  test('should render subComponent with TextWithLink component', () => {
    const mockIWorkflowItemProps = {
      count: 'workflow-item-count',
      header: 'Реєстрація',
      desc: 'workflow-item-desc',
      gridMarkup: 'workflow-item-grid-markup',
    };

    render(<WorkflowItem {...mockIWorkflowItemProps} />);

    const workflowItemHeader = screen.getByRole('heading', {
      level: 3,
      name: 'Реєстрація',
    });
    expect(workflowItemHeader).toBeInTheDocument();

    const workflowItemCount = screen.getByText('workflow-item-count');
    expect(workflowItemCount).toBeInTheDocument();

    const workflowItemTextLink = screen.getByTestId('workflow-item-span');
    expect(workflowItemTextLink).toBeInTheDocument();
  });

  test('should render subComponent without TextWithLink component', () => {
    const mockIWorkflowItemProps = {
      count: 'workflow-item-count',
      header: 'workflow-item-header',
      desc: 'workflow-item-desc',
      gridMarkup: 'workflow-item-grid-markup',
    };

    render(<WorkflowItem {...mockIWorkflowItemProps} />);

    const workflowItemDesc = screen.getByText('workflow-item-desc');
    expect(workflowItemDesc).toBeInTheDocument();
  });
});
