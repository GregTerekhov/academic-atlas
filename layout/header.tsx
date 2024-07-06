import { PositionInLayout } from 'types';

import { Contacts, Logo, Menu, ThemeSwitcher, ToggleMenuTrigger } from 'components';
import Container from './container';

export default function Header() {
  const commonWrapperStyles = 'hidden items-center gap-x-8';

  return (
    <header className='fixed left-0 top-0 z-20 max-h-20 w-full border-b-[0.5px] border-accentPrimary bg-whiteBase bg-background-light-gradient py-2 dark:bg-background-dark-gradient md:max-h-24 md:py-4 lg:max-h-28'>
      <Container>
        <div className='flex items-center justify-between'>
          <Logo position={PositionInLayout.Header} />
          <div className='hidden lg:flex'>
            <Menu />
          </div>
          <div className={`${commonWrapperStyles} lg:flex`}>
            <ThemeSwitcher />
            <Contacts variant={PositionInLayout.Header} />
          </div>
          <div className={`${commonWrapperStyles} max-lg:flex`}>
            <ThemeSwitcher />
            <ToggleMenuTrigger />
          </div>
        </div>
      </Container>
    </header>
  );
}
