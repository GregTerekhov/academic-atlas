import { Container } from 'layout';

export default function MobileMenu({
  children,
  isOpen,
}: Readonly<{
  children: React.ReactNode;
  isOpen: boolean;
}>) {
  return (
    <div
      className={`fixed top-20 z-50 h-screen max-h-mobileMenu w-screen overflow-auto bg-whiteBase py-10 transition-[left] duration-500 before:fixed before:left-0 before:top-0 before:z-40 before:w-full before:content-[""] dark:bg-background-gradient md:top-24 md:max-h-tabletMenu ${
        isOpen ? 'left-0' : '-left-full'
      }`}
    >
      <Container>{children}</Container>
    </div>
  );
}
