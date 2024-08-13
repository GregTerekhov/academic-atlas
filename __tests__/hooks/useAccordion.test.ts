import { renderHook, act } from '@testing-library/react';
import { useAccordion } from 'hooks';

describe('useAccordion hook', () => {
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
});
