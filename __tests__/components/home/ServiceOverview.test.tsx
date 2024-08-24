import { render, screen } from '@testing-library/react';

import { IconName, SectionDescriptions, SectionTitle } from 'types';
import { getOrderSteps, getSectionProps } from 'data';

import { ServiceOverview } from 'components';
import { ImageUI } from 'ui';

jest.mock('ui', () => ({
  ImageUI: jest.fn((props) => (
    <div
      {...props}
      role='img'
    />
  )),
}));

jest.mock('data', () => ({
  getOrderSteps: jest.fn(),
  getSectionProps: jest.fn(),
  getOverviewImageStyles: jest.fn(() => 'mocked-class'),
  imageSettings: {
    serviceOverview: {
      src: '/backgroundImage/service-overview.webp',
      width: 100,
      height: 100,
      className: 'mocked-class',
    },
  },
}));

jest.mock('components/home/subcomponents', () => ({
  OverviewItem: jest.fn(() => <li data-testid='overview-item'></li>),
}));

describe('ServiceOverview Component', () => {
  const mockOrderSteps = [
    {
      id: 'communication',
      step: 'Зв’яжіться з нами',
      iconName: IconName.Overview1,
    },
    {
      id: 'application process',
      step: 'Оформіть заявку',
      iconName: IconName.Overview2,
    },
    {
      id: 'prepayment',
      step: 'Після внесення 50% передоплати виконавець приступає до виконання завдання',
      iconName: IconName.Overview3,
    },
    {
      id: 'deal closing',
      step: 'По готовності сплачуєте решту суми і отримуєте готову роботу',
      iconName: IconName.Overview4,
    },
    {
      id: 'feedback',
      step: 'Залишаєте відгук',
      iconName: IconName.Overview5,
    },
  ];

  const mockGetOrderSteps = getOrderSteps as jest.Mock;
  const mockGetSectionProps = getSectionProps as jest.Mock;

  const setupMocks = () => {
    mockGetOrderSteps.mockReturnValue(mockOrderSteps);
    mockGetSectionProps.mockReturnValue({
      homeOverview: {
        title: SectionTitle.HowItWorks,
        id: 'overview',
      },
    });
  };

  const renderComponent = () => render(<ServiceOverview />);

  beforeEach(() => {
    jest.clearAllMocks();
    setupMocks();
    renderComponent();
  });

  it('should render the SectionTemplate with correct props', () => {
    const sectionElement = screen.getByText(SectionDescriptions[SectionTitle.HowItWorks]);
    expect(sectionElement).toBeInTheDocument();
    expect(sectionElement.closest('section')).toHaveAttribute('id', 'overview');
  });

  it('should render the background image div with the correct class', () => {
    const backgroundImageDiv = screen.getByRole('img', { hidden: true });
    expect(backgroundImageDiv).toHaveClass('mocked-class');
  });

  it('should render ImageUI component with correct props', () => {
    expect(ImageUI).toHaveBeenCalledWith(
      expect.objectContaining({
        src: '/backgroundImage/service-overview.webp',
        width: 100,
        height: 100,
        className: 'mocked-class',
      }),
      {},
    );
  });

  it('should render MappedListTemplate with OverviewItem components', () => {
    const overviewItems = screen.getAllByTestId('overview-item');
    expect(overviewItems).toHaveLength(mockOrderSteps.length);
  });
});
