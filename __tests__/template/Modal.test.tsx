import { act, fireEvent, render, screen } from '@testing-library/react';

import { PopupID } from 'types';
import { CalculationResultProvider } from 'context';

import { ModalTemplate } from 'template';

jest.mock('styles', () => ({
  getBackdropStyles: jest.fn(() => 'mock-backdrop-styles'),
  getModalContainerStyles: jest.fn(() => 'mock-container-styles'),
  getModalCloseIconStyles: jest.fn(() => 'group absolute right-6 top-6 size-[30px]'),
}));

jest.mock('ui', () => ({
  SvgIconUI: jest.fn(({ className }) => (
    <svg
      className={className}
      data-testid='close-icon'
    />
  )),
}));

jest.mock('components', () => ({
  BackButton: jest.fn(() => <div>Back Button</div>),
}));

describe('Modal template', () => {
  const mockCloseModal = jest.fn();
  const mockIsOpen = jest.fn(() => true);
  const mockModalRef = { current: document.createElement('div') };

  const renderModalTemplate = (props = {}) => {
    const defaultProps = {
      id: PopupID.CostSection,
      modalRef: mockModalRef,
      closeModal: mockCloseModal,
      isOpen: mockIsOpen,
      hasSubmitData: false,
      children: <div>Children Content</div>,
      ...props,
    };

    return render(
      <CalculationResultProvider>
        <ModalTemplate {...defaultProps} />
      </CalculationResultProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render modal with correct styles and children when open', () => {
    renderModalTemplate();

    const backdropElement = screen.getByRole('dialog').parentElement;
    const modalContainer = screen.getByRole('dialog');
    const closeButton = screen.getByLabelText('Кнопка закриття');

    expect(backdropElement).toHaveClass('mock-backdrop-styles');
    expect(modalContainer).toHaveClass('mock-container-styles');
    expect(closeButton).toHaveClass('group absolute right-6 top-6 size-[30px]');

    expect(screen.getByText('Children Content')).toBeInTheDocument();
    expect(screen.queryByText('Back Button')).toBeNull();
  });

  it('should not render modal when isOpen returns false', () => {
    mockIsOpen.mockReturnValue(false);

    renderModalTemplate();

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('should call closeModal function when close button is clicked', () => {
    mockIsOpen.mockReturnValue(true);

    renderModalTemplate();

    const closeButton = screen.getByLabelText('Кнопка закриття');
    fireEvent.click(closeButton);

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it('should render BackButton when hasSubmitData is true', () => {
    renderModalTemplate({ hasSubmitData: true });

    expect(screen.getByText('Back Button')).toBeInTheDocument();
  });

  it('should not render BackButton when hasSubmitData is false', () => {
    renderModalTemplate({ hasSubmitData: false });

    act(() => {
      expect(screen.queryByText('Back Button')).toBeNull();
    });
  });

  it('should render SvgIconUI with correct class when open', () => {
    renderModalTemplate();

    const svgIcon = screen.getByTestId('close-icon');
    expect(svgIcon).toHaveClass('group absolute right-6 top-6 size-[30px]');
  });

  it('should pass correct id to isOpen function', () => {
    renderModalTemplate({ id: PopupID.FooterMenu });

    expect(mockIsOpen).toHaveBeenCalledWith(PopupID.FooterMenu);
  });
});
