import { Container } from 'layout';

export default function MobileMenu({
  children,
  isOpen,
}: Readonly<{
  children: React.ReactNode;
  isOpen: boolean;
}>) {
  return (
    isOpen && (
      <div
        className={`max-h-mobileMenu md:max-h-tabletMenu fixed top-20 z-40 h-screen w-screen overflow-auto bg-whiteBase transition-[left] duration-500 before:fixed before:left-0 before:top-0 before:z-40 before:w-full before:content-[""] dark:bg-background-gradient md:top-24 ${
          isOpen ? 'left-0' : '-left-full'
        }`}
      >
        <Container>{children}</Container>
      </div>
    )
  );
}
