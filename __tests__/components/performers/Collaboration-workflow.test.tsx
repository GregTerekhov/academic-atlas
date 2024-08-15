import { render, screen } from '@testing-library/react';
import WorkflowSteps from 'components/performers/collaboration-workflow';
import { getWorkflowData } from 'data/componentsData';
import { SectionTitle } from 'types/layoutTypes';

jest.mock('data', () => ({
  getSectionProps: jest.fn(() => ({
    homeAbout: {
      title: SectionTitle.PartnershipWorkflow,
    },
  })),
}));

jest.mock('template', () => ({
  MappedListTemplate: jest.fn(({ children }) => (
    <ul>{getWorkflowData().map((item) => children(item))}</ul>
  )),
}));

jest.mock('../../../components/performers/subcomponents/workflow-item.tsx', () => {
  type IWorkflowItemProps = {
    count: string;
    header: string;
    desc: string;
  };
  const MockWorkflowItem = ({ count, header, desc }: IWorkflowItemProps) => (
    <li data-testid='WorkflowItem'>
      <p>{count}</p>
      <div>
        <h3>{header}</h3>
        {header === 'Реєстрація' ? (
          <a
            href='#'
            target='_blank'
            rel='noopener noreferrer'
            className='text-accentPrimary hocus:underline dark:text-accentSecondary'
          >
            Telegram-бот
          </a>
        ) : (
          <p className='generalText'>{desc}</p>
        )}
      </div>
    </li>
  );
  MockWorkflowItem.displayName = 'WorkflowItem';
  return MockWorkflowItem;
});

describe('Workflow component', () => {
  it('should render a list of working flows', () => {
    render(<WorkflowSteps />);

    const benefitsItems = screen.getAllByTestId('WorkflowItem');
    expect(benefitsItems).toHaveLength(getWorkflowData().length);
  });
});
