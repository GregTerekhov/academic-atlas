import {
  CalculationProvider,
  MenuProvider,
  PopupProvider,
  ThemeProvider,
  ActiveLinkProvider,
} from 'context';

interface IProviderWrapperProps {
  children: React.ReactNode;
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
          <PopupProvider>
            <ActiveLinkProvider>{children}</ActiveLinkProvider>
          </PopupProvider>
        </MenuProvider>
      </CalculationProvider>
    </ThemeProvider>
  );
}
