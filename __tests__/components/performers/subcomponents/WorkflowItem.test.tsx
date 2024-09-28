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
const renderComponent = (props = defaultProps) => render(<WorkflowItem {...props} />);

const defaultProps = {
  count: 'workflow-item-count',
  header: 'other-title',
  desc: 'workflow-item-desc',
  gridMarkup: 'workflow-item-grid-markup',
};

describe('WorkflowItem subComponent', () => {
  it('renders TextWithLink component when header is "Реєстрація"', () => {
    renderComponent({ ...defaultProps, header: 'Реєстрація' });

    const textWithLink = screen.getByTestId('text-with-link');
    expect(textWithLink).toBeInTheDocument();
    expect(textWithLink).toHaveAttribute('order', `${TelegramScenario.Join}`);
    expect(textWithLink).toHaveAttribute('text', defaultProps.desc);
  });

  it('renders <p> element when header is not "Реєстрація"', () => {
    renderComponent();

    const descriptionElement = screen.getByText(defaultProps.desc);
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement.tagName).toBe('P');
  });

  it('renders correct count and header', () => {
    renderComponent();

    const workflowItemHeader = screen.getByRole('heading', {
      level: 3,
      name: defaultProps.header,
    });
    expect(workflowItemHeader).toBeInTheDocument();
    expect(screen.getByText(defaultProps.count)).toBeInTheDocument();
  });

  it('applies the correct classes to the list item', () => {
    const { container } = renderComponent();

    const listItem = container.querySelector('li');
    expect(listItem).toHaveClass(
      `${defaultProps.gridMarkup} lg:span-3 max-md:flex max-md:items-center max-md:gap-x-4 md:w-[456px] md:space-y-4 md:max-lg:even:ml-auto lg:w-[568px]`,
    );
  });

  it('applies the correct classes to the count wrapper', () => {
    const { container } = renderComponent();

    const countWrapper = container.querySelector('div.w-max');
    expect(countWrapper).toHaveClass(
      'rounded-full bg-accentPrimary dark:bg-accentSecondary md:mx-auto',
    );
  });

  it('renders different TextWithLink and <p> for smaller header values', () => {
    renderComponent({ ...defaultProps, header: 'Реєстрація' });

    expect(screen.getByTestId('text-with-link')).toBeInTheDocument();

    const alternativeProps = {
      count: 'workflow-item-count',
      header: 'реєстрація',
      desc: 'workflow-item-desc',
      gridMarkup: 'workflow-item-grid-markup',
    };

    renderComponent({ ...defaultProps, header: 'реєстрація' });

    expect(screen.getByText(alternativeProps.desc).tagName).toBe('P');
  });
});
