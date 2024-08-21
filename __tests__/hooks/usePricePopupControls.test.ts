import { renderHook } from '@testing-library/react';
import React from 'react';

import { PopupID } from 'types';
import { usePopup } from 'context';
import { usePricePopupControls } from 'hooks/usePricePopupControls';
import { useHandleClickOutside } from 'hooks/useHandleClickOutside';

jest.mock('context', () => ({
  usePopup: jest.fn(),
}));

jest.mock('hooks/useHandleClickOutside', () => ({
  useHandleClickOutside: jest.fn(),
}));

describe('usePricePopupControls hook', () => {
  const mockUsePopup = usePopup as jest.Mock;
  const mockTogglePopup = jest.fn();
  const mockIsPopupOpen = jest.fn();
  const mockClosePopup = jest.fn();
  let mockPopupId = '';
  const mockPopupRefs: { current: Record<string, React.RefObject<HTMLDivElement>> } = {
    current: {},
  };
  const mockUseHandleClickOutside = useHandleClickOutside as jest.Mock;

  beforeEach(() => {
    mockUsePopup.mockReturnValue({
      isPopupOpen: (mockPopupId: string) => mockIsPopupOpen(mockPopupId),
      togglePopup: mockTogglePopup,
      closePopup: mockClosePopup,
      popupRefs: mockPopupRefs,
      openPopups: {},
    });
  });

  it('should return expected values from hook', () => {
    mockPopupId = PopupID.CostSection;
    const { result } = renderHook(() => usePricePopupControls());

    expect(result.current.popupId).toBe(mockPopupId);
    expect(result.current.popupRefs).toBe(mockPopupRefs);
    expect(result.current.isPopupOpen(mockPopupId)).toEqual(mockIsPopupOpen(mockPopupId));
    expect(result.current.togglePopup).toEqual(mockTogglePopup);
  });

  it('should create ref when it does not exist', () => {
    const createRefSpy = jest
      .spyOn(React, 'createRef')
      .mockReturnValue({ current: document.createElement('div') });

    mockPopupRefs.current = {};

    renderHook(() => usePricePopupControls());
    mockPopupId = PopupID.CostSection;

    expect(createRefSpy).toHaveBeenCalled();
    expect(mockPopupRefs.current?.[mockPopupId]).toBeDefined();
    expect(mockPopupRefs.current[mockPopupId]?.current).toBeInstanceOf(HTMLDivElement);

    createRefSpy.mockRestore();
  });

  it('should call useHandleClickOutside with correct arguments', () => {
    mockPopupRefs.current[mockPopupId] = { current: document.createElement('div') };
    mockIsPopupOpen.mockReturnValue(true);

    renderHook(() => usePricePopupControls());

    expect(useHandleClickOutside).toHaveBeenCalledWith(
      mockPopupRefs.current[mockPopupId],
      true,
      expect.any(Function),
    );

    const closePopupHandler = mockUseHandleClickOutside.mock.calls[0][2];
    closePopupHandler();
    expect(mockClosePopup).toHaveBeenCalledWith(mockPopupId);
  });
});
