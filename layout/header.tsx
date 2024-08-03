import { PositionInLayout } from 'types';

import { Contacts, Logo, Menu, ThemeSwitcher, ToggleMenuTrigger } from 'components';
import Container from './container';

import { getHeaderStyles } from 'styles';

export default function Header() {
  const commonWrapperStyles = 'hidden items-center gap-x-8';
  const headerClass = getHeaderStyles();

  return (
    <header className={headerClass}>
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
