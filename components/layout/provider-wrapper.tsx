import { type IWithChildren } from 'types';
import {
  ActiveLinkProvider,
  CalculationProvider,
  CalculationResultProvider,
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
  //FIXME: add new logic in test
  return (
    <ThemeProvider
      storageKey={storageKey}
      startTheme={theme}
    >
      <ActiveLinkProvider>
        <CalculationProvider>
          <CalculationResultProvider>
            <MenuProvider>
              <PopupProvider>{children}</PopupProvider>
            </MenuProvider>
          </CalculationResultProvider>
        </CalculationProvider>
      </ActiveLinkProvider>
    </ThemeProvider>
  );
}
