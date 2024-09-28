import { renderHook, act } from '@testing-library/react';
import { useAccordion } from 'hooks';

describe('useAccordion hook', () => {
  it('returns default state when isOpen is false', () => {
    const { result } = renderHook(() => useAccordion());

    expect(result.current.isOpen).toBe(false);
  });

  it('should toggle isOpen state when handleToggle is called', () => {
    const { result } = renderHook(() => useAccordion());

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.handleToggle({ type: 'click' } as React.MouseEvent);
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.handleToggle({ type: 'click' } as React.MouseEvent);
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('should toggle isOpen when the Enter key press', () => {
    const { result } = renderHook(() => useAccordion());

    act(() => {
      result.current.handleToggle({
        type: 'keydown',
        key: 'Enter',
      } as React.KeyboardEvent);
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.handleToggle({
        type: 'keydown',
        key: 'Enter',
      } as React.KeyboardEvent);
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('should close when Escape key is pressed', () => {
    const { result } = renderHook(() => useAccordion());

    act(() => {
      result.current.handleToggle({ type: 'click' } as React.MouseEvent);
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.handleKeyDown({ key: 'Escape' } as React.KeyboardEvent);
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('should return ref to content element', () => {
    const { result } = renderHook(() => useAccordion());

    expect(result.current.contentRef.current).toBeNull();
  });
});
