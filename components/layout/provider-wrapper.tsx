import { type IWithChildren } from 'types';
import { CalculationProvider, MenuProvider, PopupProvider, ThemeProvider } from 'context';

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
      <CalculationProvider>
        <MenuProvider>
          <PopupProvider>{children}</PopupProvider>
        </MenuProvider>
      </CalculationProvider>
    </ThemeProvider>
  );
}
