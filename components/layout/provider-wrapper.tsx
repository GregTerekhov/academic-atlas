import { MenuProvider, PopupProvider, ThemeProvider } from 'context';

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
      <MenuProvider>
        <PopupProvider>{children}</PopupProvider>
      </MenuProvider>
    </ThemeProvider>
  );
}
