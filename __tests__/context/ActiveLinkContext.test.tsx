import { act, fireEvent, render, screen } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';

import { Paths } from 'types';
import {
  ActiveLinkProvider,
  CalculationProvider,
  CalculationResultProvider,
  MenuProvider,
  useActiveLink,
} from 'context';
import { useInitialiseSection } from 'hooks';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('hooks', () => ({
  useHandleClickOutside: jest.fn(),
  useInitialiseSection: jest.fn(),
}));

const TestComponent = () => {
  const { activatedLink, isScrollingWithButton, handleActivateLink, updateScrollWithButtonState } =
    useActiveLink();

  return (
    <div>
      <p>Active Link: {activatedLink}</p>
      <p>Scroll: {isScrollingWithButton ? 'Yes' : 'No'}</p>
      <button onClick={() => handleActivateLink(Paths.Main)}>Activate Link</button>
      <button onClick={() => updateScrollWithButtonState(!isScrollingWithButton)}>
        Update Scroll
      </button>
    </div>
  );
};

describe('ActiveLinkProvider', () => {
  const mockPush = jest.fn();
  const mockUsePathname = usePathname as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;
  const mockUseInitialiseSection = useInitialiseSection as jest.Mock;

  let observerInstance: { observe: jest.Mock; unobserve: jest.Mock; disconnect: jest.Mock };

  const renderTestComponent = () => {
    return render(
      <CalculationProvider>
        <CalculationResultProvider>
          <MenuProvider>
            <ActiveLinkProvider>
              <TestComponent />
            </ActiveLinkProvider>
          </MenuProvider>
        </CalculationResultProvider>
      </CalculationProvider>,
    );
  };

  const clickOnButton = (name: string) => {
    fireEvent.click(screen.getByText(name));
  };

  const setupDocumentBodyWithSections = (sections: string) => {
    document.body.innerHTML = sections;
  };

  beforeEach(() => {
    mockUsePathname.mockReturnValue(Paths.Main);
    mockUseRouter.mockReturnValue({
      push: mockPush,
    });
    mockUseInitialiseSection.mockReturnValue({
      sections: { current: [{ id: 'section1', path: '/#section1' }] },
      initialiseSections: jest.fn(),
    });

    observerInstance = {
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    };

    global.IntersectionObserver = jest.fn(() => observerInstance) as unknown as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering and Initialisation', () => {
    it('renders the provider and initialises with the current pathname', () => {
      renderTestComponent();

      expect(screen.getByText(/Active Link:/)).toHaveTextContent(Paths.Main);
    });

    it('initialises sections correctly when sections are found in the DOM', async () => {
      setupDocumentBodyWithSections(`
        <section id='section1'></section>
        <section id='section2'></section>
      `);

      renderTestComponent();

      expect(mockUseInitialiseSection).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ id: 'section1' }),
          expect.objectContaining({ id: 'section2' }),
        ]),
        true,
      );
    });
  });

  describe('Handling Link Activation', () => {
    it('updates the activated link when handleActivateLink is called', () => {
      renderTestComponent();

      clickOnButton('Activate Link');

      expect(screen.getByText(/Active Link:/)).toHaveTextContent(Paths.Main);
    });

    it('activates the section when it intersects', () => {
      renderTestComponent();

      const entryMock = {
        target: mockUseInitialiseSection().sections.current[0],
        isIntersecting: true,
        intersectionRatio: 0.6,
      };

      entryMock.target.getAttribute = jest.fn().mockReturnValue('section1');

      const intersectionCallback = (window.IntersectionObserver as jest.Mock).mock.calls[0][0];

      act(() => {
        intersectionCallback([entryMock]);
      });

      expect(mockPush).toHaveBeenCalledWith('#section1', { scroll: false });
      expect(screen.getByText(/Active Link:/)).toHaveTextContent('/#section1');
    });

    it('updates scroll state when updateScrollWithButtonState is called', () => {
      renderTestComponent();

      clickOnButton('Update Scroll');

      expect(screen.getByText(/Scroll:/)).toHaveTextContent('Yes');
    });

    it('unobserves sections on component unmount', () => {
      const { unmount } = renderTestComponent();

      unmount();

      expect(observerInstance.unobserve.mock.calls.length).toBeGreaterThanOrEqual(
        mockUseInitialiseSection().sections.current.length,
      );
      expect(observerInstance.disconnect).toHaveBeenCalled();
    });
  });

  describe('Working with Section Initialisation', () => {
    it('calls initialiseSections when handling link activation with hash', async () => {
      renderTestComponent();

      clickOnButton('Activate Link');

      await act(async () => {
        expect(mockUseInitialiseSection().initialiseSections).toHaveBeenCalled();
      });
    });

    it('calls initialiseSections when handling link activation with hash or Paths.Main', async () => {
      mockUsePathname.mockReturnValue('/some-other-path');
      renderTestComponent();

      clickOnButton('Activate Link');

      await act(async () => {
        expect(mockUseInitialiseSection().initialiseSections).toHaveBeenCalled();
      });

      mockUsePathname.mockReturnValue('/some-other-path');
      clickOnButton('Activate Link');

      await act(async () => {
        expect(mockUseInitialiseSection().initialiseSections).toHaveBeenCalled();
      });
    });

    it('initialises sections when the main path is activated', async () => {
      renderTestComponent();

      clickOnButton('Activate Link');

      expect(mockUseInitialiseSection().initialiseSections).toHaveBeenCalled();
    });
  });

  describe('Work with timers', () => {
    let setTimeoutSpy: jest.SpyInstance;
    let clearTimeoutSpy: jest.SpyInstance;

    beforeEach(() => {
      jest.useFakeTimers();

      setTimeoutSpy = jest.spyOn(global, 'setTimeout');
      clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    });

    afterEach(() => {
      setTimeoutSpy.mockRestore();
      clearTimeoutSpy.mockRestore();
      jest.useRealTimers();
    });

    it('sets navigation timer and clears it correctly', async () => {
      renderTestComponent();

      clickOnButton('Activate Link');

      await act(async () => {
        jest.runAllTimers();
      });

      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 1500);
    });

    it('clears the previous navigation timer before setting a new one', () => {
      renderTestComponent();

      clickOnButton('Activate Link');
      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 1500);

      act(() => {
        jest.advanceTimersByTime(500);
        clickOnButton('Activate Link');
      });

      expect(clearTimeoutSpy).toHaveBeenCalled();
    });
  });

  describe('useActiveLink context hook', () => {
    it('throws error when useActiveLink is used outside of ActiveLinkProvider', () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => render(<TestComponent />)).toThrow(
        'useActiveLink must be used within an ActiveLinkProvider',
      );

      consoleError.mockRestore();
    });
  });
});
