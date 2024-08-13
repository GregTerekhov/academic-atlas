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

    expect(button.parentElement).toHaveStyle('display: list-item;');
  });

  // it('calls handleToggle when AccordionHeader is clicked', () => {
  //   const header = screen.getByRole('button', { name: /Accordion Title/i });

  //   fireEvent.click(header);

  //   expect(mockHandleToggle).toHaveBeenCalled();

  //   expect(header).toHaveAttribute('aria-expanded', 'true');
  // });

  it('calls handleKeyDown when key is pressed', () => {
    const header = screen.getByRole('button', { name: /Accordion Title/i });

    fireEvent.keyDown(header, { key: 'Enter' });
    expect(mockHandleKeyDown).toHaveBeenCalled();
  });

  it('updates content visibility when isOpen changes', async () => {
    let content = screen.queryByRole('region');
    expect(content).toBeNull();

    (useAccordion as jest.Mock).mockReturnValue({
      isOpen: true,
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

    await waitFor(() => {
      content = screen.queryByRole('region');
      expect(content).toHaveTextContent('Accordion Content');
    });
  });
});
