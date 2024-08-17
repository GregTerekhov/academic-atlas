import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AccordionUI } from 'ui';
import { useAccordion } from 'hooks';

jest.mock('hooks', () => ({
  useAccordion: jest.fn(),
}));

const mockHandleToggle = jest.fn();
const mockHandleKeyDown = jest.fn();
const mockContentRef = { current: { scrollHeight: 100 } };

beforeEach(() => {
  (useAccordion as jest.Mock).mockReturnValue({
    isOpen: false,
    contentRef: mockContentRef,
    handleToggle: mockHandleToggle,
    handleKeyDown: mockHandleKeyDown,
  });

  render(
    <AccordionUI
      title='Accordion Title'
      id='accordion-id'
    >
      Accordion Content
    </AccordionUI>,
  );
});

describe('AccordionUI Component', () => {
  it('renders AccordionHeader with correct props', () => {
    const header = screen.getByRole('heading', { level: 2, name: /Accordion Title/i });

    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute('id', 'accordion-header-accordion-id');
  });

  it('renders button with correct aria attributes and styles', () => {
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-labelledby', 'accordion-header-accordion-id');
    expect(button).toHaveAttribute('aria-controls', 'accordion-content-accordion-id');

    expect(button).toHaveClass(
      'group mb-2 flex w-full cursor-pointer items-center justify-between',
    );
  });

  it('calls handleKeyDown when key is pressed', () => {
    const header = screen.getByRole('button', { name: /Accordion Title/i });

    fireEvent.keyDown(header, { key: 'Enter' });
    expect(mockHandleKeyDown).toHaveBeenCalled();
  });

  it('updates content visibility when isOpen changes', async () => {
    let content = screen.queryByRole('region');
    expect(content).toBeNull();

    const buttons = screen.queryAllByRole('button', { name: /Accordion Title/i });
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    (useAccordion as jest.Mock).mockReturnValue({
      isOpen: true,
      contentRef: mockContentRef,
      handleToggle: mockHandleToggle,
      handleKeyDown: mockHandleKeyDown,
    });

    const { rerender } = render(
      <AccordionUI
        title='Accordion Title'
        id='accordion-id'
      >
        Accordion Content
      </AccordionUI>,
    );

    rerender(
      <AccordionUI
        title='Accordion Title'
        id='accordion-id'
      >
        Accordion Content
      </AccordionUI>,
    );

    await waitFor(() => {
      content = screen.queryByRole('region');
      expect(content).toHaveTextContent('Accordion Content');
      expect(content).toHaveStyle(`max-height: ${mockContentRef.current.scrollHeight}px`);
    });
  });

  it('updates aria-attributes correctly when isOpen changes', async () => {
    let buttons = screen.queryAllByRole('button', { name: /Accordion Title/i });
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    (useAccordion as jest.Mock).mockReturnValue({
      isOpen: true,
      contentRef: mockContentRef,
      handleToggle: mockHandleToggle,
      handleKeyDown: mockHandleKeyDown,
    });

    const { rerender } = render(
      <AccordionUI
        title='Accordion Title'
        id='accordion-id'
      >
        Accordion Content
      </AccordionUI>,
    );

    rerender(
      <AccordionUI
        title='Accordion Title'
        id='accordion-id'
      >
        Accordion Content
      </AccordionUI>,
    );

    await waitFor(() => {
      buttons = screen.queryAllByRole('button', { name: /Accordion Title/i });
      const expandedButtons = buttons.filter(
        (button) => button.getAttribute('aria-expanded') === 'true',
      );
      expect(expandedButtons).toHaveLength(1);
    });
  });

  it('calls handleToggle when AccordionHeader is clicked', () => {
    const button = screen.getByRole('button', { name: /Accordion Title/i });

    fireEvent.click(button);
    expect(mockHandleToggle).toHaveBeenCalled();
  });
});
