import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { useAccordion } from 'hooks';
import { AccordionUI } from 'ui';

jest.mock('hooks', () => ({
  useAccordion: jest.fn(),
}));

const mockHandleToggle = jest.fn();
const mockHandleKeyDown = jest.fn();
const mockUseAccordion = useAccordion as jest.Mock;
const mockContentRef = { current: { scrollHeight: 100 } };

const renderAccordion = (isOpen: boolean, props = {}) => {
  mockUseAccordion.mockReturnValue({
    isOpen,
    contentRef: mockContentRef,
    handleToggle: mockHandleToggle,
    handleKeyDown: mockHandleKeyDown,
  });

  return render(
    <AccordionUI
      title='Accordion Title'
      id='accordion-id'
      {...props}
    >
      Accordion Content
    </AccordionUI>,
  );
};

describe('AccordionUI Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockContentRef.current = { scrollHeight: 100 };
  });

  describe('Rendering and Attributes', () => {
    it('renders AccordionHeader with correct props', () => {
      renderAccordion(false);

      const header = screen.getByRole('heading', { level: 2, name: /Accordion Title/i });

      expect(header).toBeInTheDocument();
      expect(header).toHaveAttribute('id', 'accordion-header-accordion-id');
    });

    it('renders button with correct aria attributes and styles', () => {
      renderAccordion(false);

      const button = screen.getByRole('button');

      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-labelledby', 'accordion-header-accordion-id');
      expect(button).toHaveAttribute('aria-controls', 'accordion-content-accordion-id');

      expect(button).toHaveClass(
        'group mb-2 flex w-full cursor-pointer items-center justify-between',
      );
    });
  });

  describe('Interaction Events', () => {
    it('calls handleToggle when AccordionHeader is clicked', () => {
      renderAccordion(false);

      const button = screen.getByRole('button', { name: /Accordion Title/i });

      fireEvent.click(button);
      expect(mockHandleToggle).toHaveBeenCalled();
    });

    it.each([['Enter'], ['Escape'], ['ArrowDown'], ['ArrowUp']])(
      'calls handleKeyDown when key %s is pressed',
      (key) => {
        renderAccordion(false);

        const header = screen.getByRole('button', { name: /Accordion Title/i });

        fireEvent.keyDown(header, { key });
        expect(mockHandleKeyDown).toHaveBeenCalledWith(expect.any(Object));
      },
    );
  });

  describe('Behavior on isOpen state changes', () => {
    it('updates content visibility when isOpen changes', async () => {
      const { rerender } = renderAccordion(false);

      let content = screen.queryByRole('region');
      expect(content).toBeNull();

      const buttons = screen.queryAllByRole('button', { name: /Accordion Title/i });
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('aria-expanded', 'false');
      });

      mockUseAccordion.mockReturnValue({
        isOpen: true,
        contentRef: mockContentRef,
        handleToggle: mockHandleToggle,
        handleKeyDown: mockHandleKeyDown,
      });

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
      const { rerender } = renderAccordion(false);

      let buttons = screen.queryAllByRole('button', { name: /Accordion Title/i });
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('aria-expanded', 'false');
      });

      mockUseAccordion.mockReturnValue({
        isOpen: true,
        contentRef: mockContentRef,
        handleToggle: mockHandleToggle,
        handleKeyDown: mockHandleKeyDown,
      });

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
      buttons.forEach((button) => {
        expect(button).toHaveAttribute(
          'aria-expanded',
          button.getAttribute('aria-expanded') === 'true' ? 'true' : 'false',
        );
      });
    });

    it('handles varying scrollHeight values correctly', async () => {
      mockContentRef.current.scrollHeight = 500;

      const { rerender } = renderAccordion(false);

      mockUseAccordion.mockReturnValue({
        isOpen: true,
        contentRef: mockContentRef,
        handleToggle: mockHandleToggle,
        handleKeyDown: mockHandleKeyDown,
      });

      rerender(
        <AccordionUI
          title='Accordion Title'
          id='accordion-id'
        >
          Accordion Content
        </AccordionUI>,
      );

      await waitFor(() => {
        const content = screen.getByRole('region');
        expect(content).toHaveStyle(`max-height: ${mockContentRef.current.scrollHeight}px`);
      });
    });
  });

  describe('Edge cases', () => {
    it('handles empty or missing title and id', () => {
      renderAccordion(false, { title: '', id: '' });

      const header = screen.queryByRole('heading', { level: 2 });

      expect(header).toBeInTheDocument();
      expect(header).toHaveAttribute('id', 'accordion-header-');
      expect(header).toHaveTextContent('');

      const content = screen.queryByRole('region');
      expect(content).not.toBeInTheDocument();
    });

    it('handles empty children', () => {
      renderAccordion(false, { children: null });

      const content = screen.queryByRole('region');
      expect(content).not.toBeInTheDocument();
    });

    it('can toggle open and close', async () => {
      renderAccordion(false);

      const button = screen.getByRole('button', { name: /Accordion Title/i });

      fireEvent.click(button);
      expect(mockHandleToggle).toHaveBeenCalledTimes(1);

      mockUseAccordion.mockReturnValue({
        isOpen: true,
        contentRef: mockContentRef,
        handleToggle: mockHandleToggle,
        handleKeyDown: mockHandleKeyDown,
      });

      fireEvent.click(button);
      expect(mockHandleToggle).toHaveBeenCalledTimes(2);
    });

    it('correctly removes or updates DOM elements', async () => {
      const { unmount } = renderAccordion(true);

      let content = screen.getByRole('region');
      expect(content).toBeInTheDocument();

      unmount();
      expect(screen.queryByRole('region')).toBeNull();

      render(
        <AccordionUI
          title='Accordion Title'
          id='accordion-id'
        >
          Accordion Content
        </AccordionUI>,
      );

      content = screen.getByRole('region');
      expect(content).toBeInTheDocument();
    });
  });
});
