import { type IWithChildren } from 'types';
import {
  ActiveLinkProvider,
  CalculationProvider,
  MenuProvider,
  PopupProvider,
  ThemeProvider,
} from 'context';

interface IProviderWrapperProps extends IWithChildren {
  theme: string | undefined;
  storageKey: string;
}

export default function ProviderWrapper({
  children,
  theme,
  storageKey,
}: Readonly<IProviderWrapperProps>) {
  return (
    <ThemeProvider
      storageKey={storageKey}
      startTheme={theme}
    >
      <ActiveLinkProvider>
        <CalculationProvider>
          <MenuProvider>
            <PopupProvider>{children}</PopupProvider>
          </MenuProvider>
        </CalculationProvider>
      </ActiveLinkProvider>
    </ThemeProvider>
  );
}
