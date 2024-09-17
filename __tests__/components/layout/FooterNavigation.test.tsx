// import { render, screen, fireEvent } from '@testing-library/react';
// import { FooterMenu } from 'components';

// import { useActiveLink } from 'context';
// import { getFooterLinks } from 'data';
// import { Paths } from 'types';

// jest.mock('context', () => ({
//   useActiveLink: jest.fn(),
// }));

// jest.mock('data', () => ({
//   getFooterLinks: jest.fn(),
// }));

// jest.mock('next/navigation', () => ({
//   usePathname: jest.fn(),
// }));

// jest.mock('components/layout/subcomponents/calculation-link-mobile', () => ({
//   CalculationLinkDesktop: jest.fn(() => <div>CalculationLinkDesktop</div>),
//   CalculationLinkMobile: jest.fn(() => <div>CalculationLinkMobile</div>),
// }));

// describe('FooterMenu component', () => {
//   const handleActivateLinkMock = jest.fn();
//   const useActiveLinkMock = useActiveLink as jest.Mock;
//   const getFooterLinksMock = getFooterLinks as jest.Mock;
//   const usePathnameMock = jest.fn();

//   beforeEach(() => {
//     useActiveLinkMock.mockReturnValue({
//       handleActivateLink: handleActivateLinkMock,
//     });

//     getFooterLinksMock.mockReturnValue([
//       { path: Paths.Main, label: 'Home' },
//       { path: Paths.AboutUs, label: 'AboutUs' },
//     ]);

//     usePathnameMock.mockReturnValue(Paths.Main);
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders footer links with correct aria-current', () => {
//     render(<FooterMenu />);

//     // Перевіряємо рендер двох посилань
//     const links = screen.getAllByRole('link');
//     expect(links).toHaveLength(2);

//     // Перевіряємо перше посилання
//     expect(links[0]).toHaveAttribute('href', Paths.Main);
//     expect(links[0]).toHaveAttribute('aria-current', 'page');

//     // Перевіряємо друге посилання
//     expect(links[1]).toHaveAttribute('href', Paths.AboutUs);
//     expect(links[1]).toHaveAttribute('aria-current', 'false');
//   });

// //   it('calls handleActivateLink when a link is clicked', () => {
// //     render(<FooterMenu />);

// //     const aboutLink = screen.getByRole('link', { name: 'AboutUs' });
// //     fireEvent.click(aboutLink);

// //     // Перевіряємо, що handleActivateLink викликається з правильним шляхом
// //     expect(handleActivateLinkMock).toHaveBeenCalledWith(Paths.AboutUs);
// //   });

// //   it('renders both CalculationLinkDesktop and CalculationLinkMobile', () => {
// //     render(<FooterMenu />);

// //     // Перевірка рендерингу десктопної та мобільної версії CalculationLink
// //     expect(screen.getByText('CalculationLinkDesktop')).toBeInTheDocument();
// //     expect(screen.getByText('CalculationLinkMobile')).toBeInTheDocument();
// //   });
// });
