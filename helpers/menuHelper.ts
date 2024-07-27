export const getMobileMenuContainerStyles = (isOpen: boolean) => {
  const openState = isOpen ? 'left-0' : '-left-full';

  return `${openState} fixed top-20 z-50 h-full w-screen overflow-auto bg-whiteBase bg-background-light-gradient pb-52 pt-10 transition-[left] duration-500 before:fixed before:left-0 before:top-0 before:w-full before:content-[""] dark:bg-background-dark-gradient md:top-24 max-h-mobileMenu md:max-h-tabletMenu`;
};
