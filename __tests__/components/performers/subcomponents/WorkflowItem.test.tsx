import { render, screen } from '@testing-library/react';

import { TelegramScenario } from 'types';
import { WorkflowItem } from 'components/performers/subcomponents';

jest.mock('components/telegram-text-link', () =>
  jest.fn((props) => (
    <span
      data-testid='text-with-link'
      {...props}
    ></span>
  )),
);

describe('WorkflowItem subComponent', () => {
  test('renders TextWithLink component when header is "Реєстрація"', () => {
    const mockIWorkflowItemProps = {
      count: 'workflow-item-count',
      header: 'Реєстрація',
      desc: 'workflow-item-desc',
      gridMarkup: 'workflow-item-grid-markup',
    };
    render(<WorkflowItem {...mockIWorkflowItemProps} />);

    const textWithLink = screen.getByTestId('text-with-link');
    expect(textWithLink).toBeInTheDocument();
    expect(textWithLink).toHaveAttribute('order', `${TelegramScenario.Join}`);
    expect(textWithLink).toHaveAttribute('textWithLink', mockIWorkflowItemProps.desc);
  });

  it('renders <p> element when header is not "Реєстрація"', () => {
    const mockIWorkflowItemProps = {
      count: 'workflow-item-count',
      header: 'other-title',
      desc: 'workflow-item-desc',
      gridMarkup: 'workflow-item-grid-markup',
    };

    render(<WorkflowItem {...mockIWorkflowItemProps} />);

    const descriptionElement = screen.getByText(mockIWorkflowItemProps.desc);
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement.tagName).toBe('P');
  });

  test('renders correct count and header', () => {
    const mockIWorkflowItemProps = {
      count: 'workflow-item-count',
      header: 'other-title',
      desc: 'workflow-item-desc',
      gridMarkup: 'workflow-item-grid-markup',
    };

    render(<WorkflowItem {...mockIWorkflowItemProps} />);

    const workflowItemHeader = screen.getByRole('heading', {
      level: 3,
      name: mockIWorkflowItemProps.header,
    });
    expect(workflowItemHeader).toBeInTheDocument();
    expect(screen.getByText(mockIWorkflowItemProps.count)).toBeInTheDocument();
  });
});
