import { render, screen } from '@testing-library/react';
import { WorkflowItem } from 'components/performers/subcomponents';

jest.mock('components', () => ({
  TextWithLink: jest.fn(),
}));

describe('WorkflowItem subComponent', () => {
  test('should render subComponent correctly', () => {
    const mockIWorkflowItemProps = {
      count: 'workflow-item-count',
      header: 'workflow-item-header',
      desc: 'workflow-item-desc',
      gridMarkup: 'workflow-item-grid-markup',
    };

    render(<WorkflowItem {...mockIWorkflowItemProps} />);

    const workflowItemHeader = screen.getByRole('heading', {
      level: 3,
      name: 'workflow-item-header',
    });
    expect(workflowItemHeader).toBeInTheDocument();

    const workflowItemCount = screen.getByText('workflow-item-count');
    expect(workflowItemCount).toBeInTheDocument();

    const workflowItemDesc = screen.getByText('workflow-item-desc');
    expect(workflowItemDesc).toBeInTheDocument();
  });
});
