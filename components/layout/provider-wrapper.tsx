import { CalculationProvider, MenuProvider, PopupProvider, ThemeProvider } from 'context';

export default function ProviderWrapper({
  children,
  theme,
  storageKey,
}: Readonly<{
  children: React.ReactNode;
  theme: string | undefined;
  storageKey: string;
}>) {
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
